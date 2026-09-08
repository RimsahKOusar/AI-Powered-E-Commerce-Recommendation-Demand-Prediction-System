import { apiFetch } from "@/lib/api";
import type { Customer, Order, Paginated } from "@/types";

export type OrderAdminQuery = {
  q?: string;
  status?: string;
  page?: number;
  page_size?: number;
};

function toSearchParams(query: Record<string, string | number | undefined>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function listOrdersAdmin(query: OrderAdminQuery = {}): Promise<Paginated<Order>> {
  return apiFetch<Paginated<Order>>(`/admin/orders${toSearchParams(query)}`);
}

export async function listCustomersAdmin(
  query: { q?: string; page?: number; page_size?: number } = {},
): Promise<Paginated<Customer>> {
  return apiFetch<Paginated<Customer>>(`/admin/customers${toSearchParams(query)}`);
}
