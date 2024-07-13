import type { PartialDeep } from "type-fest";
import { notion } from "@/utils/notion/notion-client";

export const prepareForNotion = (inviteData: PartialDeep<Guest>) => {
  let properties = {};

  // Update attendees
  if (inviteData.guestCount?.claimed) {
    properties["Accepted"] = { number: inviteData.guestCount.claimed };
  }
  if (inviteData.plusOnes?.claimed) {
    properties["Accepted: +1"] = { number: inviteData.plusOnes.claimed };
  }
  if (inviteData.children?.claimed) {
    properties["Accepted: Children"] = { number: inviteData.children.claimed };
  }
  if (inviteData.plusOnes?.name) {
    properties["+1 Name"] = {
      type: "text",
      text: {
        content: inviteData.plusOnes?.name,
        link: null,
      },
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      plain_text: inviteData.plusOnes?.name,
      href: null,
    };
  }

  // Update dinners
  if (inviteData.dinnerPicks?.beefDinnerCount) {
    properties["Dinner:Beef"] = {
      number: inviteData.dinnerPicks.beefDinnerCount,
    };
  }
  if (inviteData.dinnerPicks?.salmonDinnerCount) {
    properties["Dinner:Salmon"] = {
      number: inviteData.dinnerPicks.salmonDinnerCount,
    };
  }
  if (inviteData.dinnerPicks?.childDinnerCount) {
    properties["Dinner:Child"] = {
      number: inviteData.dinnerPicks.childDinnerCount,
    };
  }
  if (inviteData.dinnerPicks?.veganDinnerCount) {
    properties["Dinner:Vegan"] = {
      number: inviteData.dinnerPicks.veganDinnerCount,
    };
  }

  // Update Extras
  if (inviteData.attendingBreakfast) {
    properties["Breakfast"] = {
      checkbox: inviteData.attendingBreakfast,
    };
  }
  if (inviteData.attendingRehersalDinner) {
    properties["Rehearsal Dinner"] = {
      checkbox: inviteData.attendingRehersalDinner,
    };
  }

  // Update Contact info
  if (inviteData.email) {
    properties["Email"] = {
      email: inviteData.email,
    };
  }
  if (inviteData.phone) {
    properties["Phone"] = {
      phone_number: inviteData.phone,
    };
  }
  if (inviteData.SMSUpdates) {
    properties["SMS Updates"] = {
      checkbox: inviteData.SMSUpdates,
    };
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
