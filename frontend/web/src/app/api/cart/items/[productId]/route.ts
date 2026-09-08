import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";
import type { Cart } from "@/types";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const { productId } = await params;
  const body = await request.json().catch(() => null);
  try {
    const cart = await apiFetch<Cart>(`/cart/items/${productId}`, { method: "PATCH", body });
    return NextResponse.json(cart);
  } catch (err) {
    return apiErrorResponse(err);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const { productId } = await params;
  try {
    const cart = await apiFetch<Cart>(`/cart/items/${productId}`, { method: "DELETE" });
    return NextResponse.json(cart);
  } catch (err) {
    return apiErrorResponse(err);
  }
}
