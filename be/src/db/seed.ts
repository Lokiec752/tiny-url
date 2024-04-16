import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { users } from "./schema";
dotenv.config();

const connectionPromise = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const testUser = {
  id: "test",
  name: "test",
  email: "test@gmail.com",
  created_at: new Date().toISOString(),
};

connectionPromise
  .then(async (connection) => {
    const db = drizzle(connection);
    await db.insert(users).values(testUser);
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  })
  .finally(() => {
    connectionPromise.then((connection) => connection.end());
  });
