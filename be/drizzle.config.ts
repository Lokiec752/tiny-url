import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export default defineConfig({
  dbCredentials: {
    connectionString: `mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:3306`,
  },
  schema: "./src/db/schema.ts",
  out: "./drizzle",
});
