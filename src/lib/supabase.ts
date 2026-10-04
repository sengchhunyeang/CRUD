import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-side client used by the data layer (API routes and server components).
let client: SupabaseClient | undefined;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (set them in .env.local locally, or in Vercel → Project Settings → Environment Variables)",
    );
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
