import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  created_at: text("created_at"),
});

export const links = sqliteTable("links", {
  id: text("id").primaryKey(),
  user_id: text("user_id").references(() => users.id),
  original_url: text("original_url"),
  short_url: text("short_url"),
  created_at: text("created_at"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;