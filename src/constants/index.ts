export const APP_NAME = "CRUD App";

export const API_ROUTES = {
  items: "/api/items",
  item: (id: string) => `/api/items/${id}`,
  health: "/api/health",
} as const;
