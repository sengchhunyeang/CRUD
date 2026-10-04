import * as db from "@/data/items";

export async function GET() {
  return Response.json(await db.getAll());
}

export async function POST(request: Request) {
  const { name, description } = await request.json();
  if (!name) return Response.json({ error: "Name is required" }, { status: 400 });
  return Response.json(await db.create({ name, description: description ?? "" }), { status: 201 });
}
