"use client";

import Link from "next/link";
import { useItems } from "@/hooks/useItems";
import { itemService } from "@/services/item.service";
import { Button } from "@/components/ui/Button";

export function ItemList() {
  const { items, loading, error, refresh } = useItems();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (items.length === 0) return <p className="text-gray-500">No items yet.</p>;

  return (
    <ul className="divide-y rounded border">
      {items.map((item) => (
        <li key={item.id} className="flex items-center justify-between p-4">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/items/${item.id}/edit`}
              className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300"
            >
              Edit
            </Link>
            <Button
              variant="danger"
              onClick={async () => {
                await itemService.remove(item.id);
                refresh();
              }}
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
