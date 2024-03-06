import db from "../db";
import { Link, NewLink, links } from "../db/schema";
import { eq } from "drizzle-orm";

export const getAllLinks = async () => {
  const allLinks = await db.select().from(links);
  return allLinks;
};

export const getLinkById = async (id: Link["id"]) => {
  const link = await db.select().from(links).where(eq(links.id, id));
  return link;
};

export const createLink = async (newLink: Omit<NewLink, "id">) => {
  const newLinkId = crypto.randomUUID();
  await db.insert(links).values({ ...newLink, id: newLinkId });
  return newLink;
};

export const updateLink = async (updatedLink: NewLink) => {
  await db.update(links).set(updatedLink).where(eq(links.id, updatedLink.id));
  return updatedLink;
};

export const deleteLink = async (id: Link["id"]) => {
  await db.delete(links).where(eq(links.id, id));
  return { message: "Link deleted successfully" };
};
