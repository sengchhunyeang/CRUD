// Creates the database schema by running supabase/schema.sql against DATABASE_URL.
// Usage: npm run db:setup   (reads .env.local)
import { readFile } from "node:fs/promises";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url || url.includes("[YOUR-PASSWORD]")) {
  console.error("Set DATABASE_URL in .env.local (Supabase dashboard -> Connect -> Session pooler).");
  process.exit(1);
}

const sql = await readFile(new URL("../supabase/schema.sql", import.meta.url), "utf8");
const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  await client.query(sql);
  // Tell the Supabase API to pick up the new table immediately.
  await client.query("notify pgrst, 'reload schema'");
  console.log("Schema applied: public.items is ready.");
} catch (e) {
  console.error("Failed to apply schema:", e.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
