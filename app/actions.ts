"use server";
import type { PartialDeep } from "type-fest";
import { prepareForNotion, updateNotionPage } from "@/utils/notion/update";
import { notion } from "@/utils/notion/notion-client";
import { processNotionResponse } from "@/utils/notion/process";
import { auth } from "@/auth";

export const updateInvite = async (
  pageId: string,
  inviteData: PartialDeep<Guest>
) => {
  const session = await auth();
  if (session?.user.inviteId !== pageId)
    throw new Error("Invalid permissions to access resource");

  const notionFormattedData = await prepareForNotion(inviteData);

  const res = await updateNotionPage({
    //@ts-ignore
    pageId,
    //@ts-ignore
    properties: { ...notionFormattedData },
  }).catch((error) => {
    return error;
  });

  const resObject: Guest = processNotionResponse(res);
  return resObject;
};

export const getInvite = async (notionResourceId: string) => {
  const session = await auth();
  if (session?.user.inviteId !== notionResourceId)
    throw new Error("Invalid permissions to access resource");

  const response = await notion.pages.retrieve({ page_id: notionResourceId });
  // @ts-ignore
  const properties: Guest = processNotionResponse(response);
  // @ts-ignore
  return properties;
};
