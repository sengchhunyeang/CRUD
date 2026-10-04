export interface Item {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateItemInput = Pick<Item, "name" | "description">;
export type UpdateItemInput = Partial<CreateItemInput>;
