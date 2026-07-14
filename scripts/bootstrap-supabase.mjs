import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dns from "node:dns";
import pg from "pg";

const { Client } = pg;
dns.setDefaultResultOrder("ipv4first");

async function main() {
  const dbUrl = process.env.SUPABASE_DB_URL;

  if (!dbUrl) {
    console.error("Missing SUPABASE_DB_URL in environment.");
    process.exit(1);
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sqlPath = path.resolve(__dirname, "../supabase/init.sql");
  const sql = await fs.readFile(sqlPath, "utf8");

  const client = new Client({
    connectionString: dbUrl,
    family: 4,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(sql);
    console.log("Supabase bootstrap completed: schema + seed applied.");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Supabase bootstrap failed.");
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);

  if (message.includes("ENETUNREACH")) {
    console.error(
      "Hint: your current DB host resolves to IPv6 only. Use the Supabase Pooler connection string (IPv4) in SUPABASE_DB_URL and retry.",
    );
  }

  process.exit(1);
});
