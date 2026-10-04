"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { itemService } from "@/services/item.service";
import { Button } from "@/components/ui/Button";
import type { Item } from "@/types/item";

export function ItemForm({ item }: { item?: Item }) {
  const router = useRouter();
  const [name, setName] = useState(item?.name ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (item) await itemService.update(item.id, { name, description });
      else await itemService.create({ name, description });
      router.push("/items");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="rounded border p-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        className="rounded border p-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" disabled={saving}>
        {item ? "Update" : "Create"}
      </Button>
    </form>
  );
}
