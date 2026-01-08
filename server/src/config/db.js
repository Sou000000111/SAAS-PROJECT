import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",      // ✅ correct
  user: "root",
  password: "Babai@1422",
  database: "saas_db",
  waitForConnections: true,
  connectionLimit: 10
});
