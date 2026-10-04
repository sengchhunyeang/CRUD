import { getSupabase } from "@/lib/supabase";
import type { CreateItemInput, Item, UpdateItemInput } from "@/types/item";

const TABLE = "items";

interface ItemRow {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

function toItem(row: ItemRow): Item {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getAll(): Promise<Item[]> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(toItem);
}

export async function getById(id: string): Promise<Item | undefined> {
  const { data, error } = await getSupabase().from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? toItem(data) : undefined;
}

export async function create(input: CreateItemInput): Promise<Item> {
  const { data, error } = await getSupabase().from(TABLE).insert(input).select().single();
  if (error) throw error;
  return toItem(data);
}

export async function update(id: string, input: UpdateItemInput): Promise<Item | undefined> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .update(input)
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data ? toItem(data) : undefined;
}

export async function remove(id: string): Promise<boolean> {
  const { data, error } = await getSupabase().from(TABLE).delete().eq("id", id).select("id");
  if (error) throw error;
  return data.length > 0;
}

// Lightweight connectivity check used by /api/health.
// Not a HEAD request: HEAD responses have no body, so errors like a missing table go unreported.
export async function ping(): Promise<number> {
  const { count, error } = await getSupabase()
    .from(TABLE)
    .select("id", { count: "exact" })
    .limit(1);
  if (error) throw error;
  return count ?? 0;
}
