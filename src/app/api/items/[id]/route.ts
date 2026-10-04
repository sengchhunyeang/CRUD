import type { NextRequest } from "next/server";
import * as db from "@/data/items";

const notFound = () => Response.json({ error: "Item not found" }, { status: 404 });

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/items/[id]">) {
  const { id } = await ctx.params;
  const item = await db.getById(id);
  return item ? Response.json(item) : notFound();
}

export async function PUT(req: NextRequest, ctx: RouteContext<"/api/items/[id]">) {
  const { id } = await ctx.params;
  const { name, description } = await req.json();
  const item = await db.update(id, { name, description });
  return item ? Response.json(item) : notFound();
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/items/[id]">) {
  const { id } = await ctx.params;
  return (await db.remove(id)) ? new Response(null, { status: 204 }) : notFound();
}
