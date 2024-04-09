import { createUser } from "../service/user.service";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connectionPromise = mysql.createConnection({
  host: process.env["DATABASE_HOST"],
  user: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
  database: "tiny-url-db",
});

const testUser = {
  name: "test",
  email: "test@gmail.com",
  created_at: new Date().toISOString(),
};

const seed = async () => {
  await createUser(testUser);
};

connectionPromise
  .then(async (connection) => {
    const db = await drizzle(connection);
    seed();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  })
  .finally(() => {
    connectionPromise.then((connection) => connection.end());
  });
