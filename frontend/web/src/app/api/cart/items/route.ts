import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";
import type { Cart } from "@/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const cart = await apiFetch<Cart>("/cart/items", { method: "POST", body });
    return NextResponse.json(cart);
  } catch (err) {
    return apiErrorResponse(err);
  }
}
