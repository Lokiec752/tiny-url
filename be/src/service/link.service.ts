import { nanoid } from "nanoid";
import db from "../db";
import { Link, NewLink, links } from "../db/schema";
import { and, eq, like } from "drizzle-orm";

export const getAllLinks = async () => {
  const allLinks = await db.select().from(links);
  return allLinks;
};

export const getAllLinksByUserId = async (userId: string) => {
  const allLinks = await db.select().from(links).where(eq(links.user_id, userId));
  return allLinks;
};

export const getLinkById = async (id: Link["id"]) => {
  const link = await db.select().from(links).where(eq(links.id, id));
  return link;
};

export const getOriginalUrl = async (shortUrl: string) => {
  const link = await db.select().from(links).where(like(links.short_url, `%${shortUrl}`));
  return link[0];
};

export const createLink = async (userId: string, longUrl: string) => {
  const existingLink = await db
    .select()
    .from(links)
    .where(and(eq(links.user_id, userId), eq(links.original_url, longUrl)));

  if (existingLink.length > 0) {
    return existingLink[0];
  }
  const BE_ORIGIN = process.env.BE_ORIGIN;
  const newLinkId = crypto.randomUUID();
  const shortUrl = nanoid(6);
  const createdAt = new Date().toISOString();
  const newLink = await db
    .insert(links)
    .values({
      id: newLinkId,
      user_id: userId,
      original_url: longUrl,
      short_url: `${BE_ORIGIN}/short/${shortUrl}`,
      created_at: createdAt,
    })
    .returning();
  return newLink[0];
};

export const updateLink = async (updatedLink: NewLink) => {
  await db.update(links).set(updatedLink).where(eq(links.id, updatedLink.id));
  return updatedLink;
};

export const deleteLink = async (id: Link["id"]) => {
  await db.delete(links).where(eq(links.id, id));
  return { message: "Link deleted successfully" };
};
