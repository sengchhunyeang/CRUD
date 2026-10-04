import { notFound } from "next/navigation";
import { ItemForm } from "@/components/items/ItemForm";
import * as db from "@/data/items";

export default async function EditItemPage({ params }: PageProps<"/items/[id]/edit">) {
  const { id } = await params;
  const item = await db.getById(id);
  if (!item) notFound();

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold">Edit Item</h1>
      <ItemForm item={item} />
    </section>
  );
}
