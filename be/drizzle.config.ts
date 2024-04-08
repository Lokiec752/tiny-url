import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    connectionString: "mysql://myuser:mypassword@localhost:3306",
  },
  schema: "./src/db/schema.ts",
  out: "./drizzle",
});
