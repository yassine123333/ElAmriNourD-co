import { Pool, type QueryResultRow } from "pg";
import dns from "node:dns";

const dbUrl = process.env.SUPABASE_DB_URL;

dns.setDefaultResultOrder("ipv4first");

export const isDatabaseConfigured =
  typeof dbUrl === "string" && dbUrl.trim().length > 0;

let pool: Pool | null = null;

function getPool() {
  if (!isDatabaseConfigured) {
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }

  return pool;
}

export async function query<T extends QueryResultRow>(text: string, values: unknown[] = []) {
  const activePool = getPool();

  if (!activePool) {
    throw new Error("Base de donnees non configuree. Ajoutez SUPABASE_DB_URL.");
  }

  return activePool.query<T>(text, values);
}
