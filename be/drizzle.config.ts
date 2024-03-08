import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    url: "./sqlite.db",
  },
  driver: "better-sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
});
