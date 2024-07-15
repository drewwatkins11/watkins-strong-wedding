import { notion } from "@/utils/notion/notion-client";
import { processNotionResponse } from "./process";

const guestListDb = process.env.NOTION_DB;

export const constructFilter = ({
  inviteId,
  surname,
  guestName,
  includeUninvited = false, // By default, don't include uninvited guests
}: GuestFilter) => {
  // PropertyFilter is not exported from @notionhq/client. Cheap stub of a type.
  let filters: { property: string; [x: "formula" | "select" | string]: any }[] =
    [];

  filters.push({
    property: "inviteId",
    formula: {
      string: {
        equals: inviteId,
      },
    },
  });
  if (guestName) {
    filters.push({
      property: "Guest Name",
      formula: {
        string: {
          contains: guestName,
        },
      },
    });
  }

  if (surname) {
    filters.push({
      property: "Guest Name",
      formula: {
        string: {
          contains: surname,
        },
      },
    });
  }

  includeUninvited === false &&
    filters.push({
      property: "Status",
      select: {
        does_not_equal: "Not Invited",
      },
    });

  return { and: [...filters] };
};

export const getGuests = async ({
  inviteId,
  surname,
  guestName,
  includeUninvited,
}: GuestFilter) => {
  const invites: Guest[] = [];
  const response = await notion.databases.query({
    // @ts-expect-error
    database_id: guestListDb,
    //@ts-ignore
    filter: constructFilter({ inviteId, surname, guestName, includeUninvited }),
  });

  response.results.forEach((invite) => {
    invites.push(processNotionResponse(invite));
  });

  return invites;
};

export interface GuestFilter {
  inviteId: String;
  surname: String;
  guestName?: String;
  includeUninvited?: Boolean;
}
