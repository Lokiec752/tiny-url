import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";

const connectionPromise = mysql.createConnection({
  host: "localhost",
  user: "myuser",
  password: "mypassword",
  database: "tiny-url-db",
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
