import { apiFetch } from "@/lib/api";
import type { Category, Paginated, Product } from "@/types";

export type ProductQuery = {
  q?: string;
  category_id?: string;
  brand?: string;
  is_active?: boolean;
  min_price?: number;
  max_price?: number;
  low_stock?: boolean;
  sort?: string;
  page?: number;
  page_size?: number;
};

function toSearchParams(query: Record<string, string | number | boolean | undefined>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function listProducts(query: ProductQuery = {}): Promise<Paginated<Product>> {
  return apiFetch<Paginated<Product>>(`/products${toSearchParams(query)}`);
}

export async function getProduct(id: string): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`);
}

export async function listCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}
