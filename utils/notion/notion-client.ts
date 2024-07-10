import { Client } from "@notionhq/client";

// Create a new Notion client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
