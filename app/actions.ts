"use server";
import type { PartialDeep } from "type-fest";
import { prepareForNotion, updateNotionPage } from "@/utils/notion/update";

export const updateInvite = async (
  pageId: string,
  inviteData: PartialDeep<Guest>
) => {
  const notionFormattedData = prepareForNotion(inviteData);

  try {
    await updateNotionPage({
      //@ts-ignore
      pageId,
      //@ts-ignore
      properties: { ...notionFormattedData },
    });
  } catch (error) {
    return error;
  }
};
