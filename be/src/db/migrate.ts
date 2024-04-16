import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const connectionPromise = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connectionPromise
  .then(async (connection) => {
    const db = drizzle(connection);
    return await migrate(db, { migrationsFolder: "drizzle" });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  })
  .finally(() => {
    connectionPromise.then((connection) => connection.end());
  });
