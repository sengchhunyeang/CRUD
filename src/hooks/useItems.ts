"use client";

import { useCallback, useEffect, useState } from "react";
import { itemService } from "@/services/item.service";
import type { Item } from "@/types/item";

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let ignore = false;
    itemService
      .getAll()
      .then((data) => {
        if (ignore) return;
        setItems(data);
        setError(null);
      })
      .catch((e: Error) => !ignore && setError(e.message))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [version]);

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  return { items, loading, error, refresh };
}
