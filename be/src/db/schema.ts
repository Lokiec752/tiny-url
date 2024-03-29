import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  created_at: text("created_at"),
});

export const links = sqliteTable("links", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .references(() => users.id)
    .notNull(),
  original_url: text("original_url").notNull(),
  short_url: text("short_url").notNull(),
  created_at: text("created_at"),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  user_id: text("user_id").references(() => users.id),
  valid: integer("valid", { mode: "boolean" }),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;

export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;

export const InsertUserSchema = createInsertSchema(users);
export const SelectUserSchema = createSelectSchema(users);

export const InsertLinkSchema = createInsertSchema(links, {
  original_url: z.string().url(),
});
export const UrlLinkSchema = z.object({
  url: z.string().url(),
});
export const SelectLinkSchema = createSelectSchema(links);

export const InsertSessionSchema = createInsertSchema(session);
export const SelectSessionSchema = createSelectSchema(session);
