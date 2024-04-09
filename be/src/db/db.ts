import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  host: "db",
  user: "myuser",
  password: "mypassword",
  database: "tiny-url-db",
});

const db = drizzle(poolConnection);

export default db;
