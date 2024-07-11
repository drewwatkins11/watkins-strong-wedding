import type { PartialDeep } from "type-fest";
import { notion } from "@/utils/notion/notion-client";

export const prepareForNotion = (inviteData: PartialDeep<Guest>) => {
  let properties = {};

  if (inviteData.guestCount?.claimed) {
    properties["Accepted"] = { number: inviteData.guestCount.claimed };
  }
  if (inviteData.plusOnes?.claimed) {
    properties["Accepted: +1"] = { number: inviteData.plusOnes.claimed };
  }
  if (inviteData.children?.claimed) {
    properties["Accepted: Children"] = { number: inviteData.children.claimed };
  }

  return properties;
};

export const updateNotionPage = async ({
  pageId,
  properties,
}: {
  pageId: string;
  properties: { [x: string]: any };
}) => {
  const response = await notion.pages.update({
    page_id: pageId,
    properties,
  });

  console.log(response);

  return response;
};
