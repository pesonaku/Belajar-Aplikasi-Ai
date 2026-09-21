import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionUri =
  process.env.DATABASE_URL || "mysql://root:@localhost:3306/belajar_ai";

export const poolConnection = mysql.createPool({
  uri: connectionUri,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle(poolConnection, { mode: "default", schema });

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const connection = await poolConnection.getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error) {
    return false;
  }
}
