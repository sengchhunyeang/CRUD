import { API_ROUTES } from "@/constants";
import type { CreateItemInput, Item, UpdateItemInput } from "@/types/item";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.status === 204 ? (undefined as T) : res.json();
}

export const itemService = {
  getAll: () => request<Item[]>(API_ROUTES.items),
  getById: (id: string) => request<Item>(API_ROUTES.item(id)),
  create: (data: CreateItemInput) =>
    request<Item>(API_ROUTES.items, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: UpdateItemInput) =>
    request<Item>(API_ROUTES.item(id), { method: "PUT", body: JSON.stringify(data) }),
  remove: (id: string) => request<void>(API_ROUTES.item(id), { method: "DELETE" }),
};
