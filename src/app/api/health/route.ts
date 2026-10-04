import * as db from "@/data/items";

// Reports database connectivity by running a lightweight count query against Supabase.
export async function GET() {
  try {
    const count = await db.ping();
    return Response.json({ status: "connected", database: "Supabase", count });
  } catch (e) {
    return Response.json(
      { status: "disconnected", database: "Supabase", error: (e as Error).message },
      { status: 503 },
    );
  }
}
