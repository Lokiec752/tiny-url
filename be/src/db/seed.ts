import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { NewUser, users } from "./schema";
import { createUser } from "../service/user.service";

const betterSqlite = new Database(process.env.DB_URI || "sqlite.db");
const db = drizzle(betterSqlite);

const testUser = {
  name: "test",
  email: "test@gmail.com",
  created_at: new Date().toISOString(),
};

const seed = async () => {
  await createUser(testUser);
};

seed();
