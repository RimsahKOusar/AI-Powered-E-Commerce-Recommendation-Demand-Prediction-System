import { apiFetch, ApiError } from "@/lib/api";
import type { Cart } from "@/types";

const EMPTY_CART: Cart = { id: "", items: [], item_count: 0, subtotal: 0, currency: "PKR" };

/** Server-side cart read for a logged-in user; empty cart for anonymous visitors. */
export async function getCart(): Promise<Cart> {
  try {
    return await apiFetch<Cart>("/cart");
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) return EMPTY_CART;
    throw err;
  }
}
