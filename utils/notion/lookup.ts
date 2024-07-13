import { notion } from "@/utils/notion/notion-client";

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
  filters.push({
    property: "Guest Name",
    formula: {
      string: {
        contains: guestName ? guestName : surname,
      },
    },
  });
  includeUninvited === false &&
    filters.push({
      property: "Status",
      select: {
        does_not_equal: "Not Invited",
      },
    });

  return { and: [...filters] };
};

const processNotionResponse = (notionRes: any) => {
  const { id, url } = notionRes;
  const notionResponse = notionRes.properties;

  const guest: Guest = {} as Guest;

  guest.resourceId = id;
  guest.resourceURL = url;
  guest.name = notionResponse.Name.title[0].plain_text;
  guest.guestStatus = notionResponse.Status.select.name;
  guest.phone =
    notionResponse.Phone.phone_number === null
      ? undefined
      : notionResponse.Phone.phone_number;
  guest.inviteId = notionResponse.inviteId.formula.string;
  guest.address = notionResponse.Address.rich_text.length
    ? notionResponse.Address.rich_text[0].plain_text
    : undefined;
  guest.SMSUpdates = notionResponse["SMS Updates"].checkbox;
  guest.inviteCode = notionResponse["Invite Code"].rich_text.length
    ? notionResponse["Invite Code"].rich_text[0].plain_text
    : undefined;
  guest.createdAt = notionResponse["Created time"].created_time;
  // guest.guestOf: ,
  guest.addressVerified = notionResponse["Address Verified"].checkbox;
  guest.email =
    notionResponse.Email.email === null
      ? undefined
      : notionResponse.Email.email;
  guest.guestNote = notionResponse["Guest Note"].rich_text.length
    ? notionResponse["Guest Note"].rich_text[0].plain_text
    : undefined;
  guest.saveDateWave = notionResponse["Save the Date: Wave"].number;
  guest.attendingRehersalDinner = notionResponse["Rehearsal Dinner"].checkbox;
  guest.attendingBreakfast = notionResponse["Breakfast"].checkbox;
  guest.totalInvites = notionResponse["Total People"].formula.number;
  guest.totalAttendees = notionResponse["Total Attendees"].formula.number;
  guest.guestCount = {
    offered: notionResponse["Total People"].formula.number,
    claimed: notionResponse["Accepted"].number,
  };
  guest.plusOnes = {
    offered: notionResponse["+1's"].number,
    claimed: notionResponse["+1's"].number,
    name: notionResponse["+1 Name"].rich_text.length
      ? notionResponse["+1 Name"].rich_text[0].plain_text
      : undefined,
  };
  guest.children = {
    offered: notionResponse["+1's (Kids)"].number,
    claimed: notionResponse["Accepted: Children"].number,
  };
  guest.dinnerPicks = {
    beefDinnerCount: notionResponse["Dinner:Beef"].number,
    salmonDinnerCount: notionResponse["Dinner:Salmon"].number,
    childDinnerCount: notionResponse["Dinner:Child"].number,
    veganDinnerCount: notionResponse["Dinner:Vegan"].number,
  };
  guest.tags = (() => {
    const tags = [];
    notionResponse.Tags.multi_select.length
      ? notionResponse.Tags.multi_select.forEach((tag) => {
          // @ts-ignore
          tags.push(tag.name);
        })
      : null;
    return tags;
  })();

  return guest;
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
