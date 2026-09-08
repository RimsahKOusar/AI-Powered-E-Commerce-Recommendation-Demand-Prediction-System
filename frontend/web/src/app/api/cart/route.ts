import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";
import type { Cart } from "@/types";

export async function GET() {
  try {
    const cart = await apiFetch<Cart>("/cart");
    return NextResponse.json(cart);
  } catch (err) {
    return apiErrorResponse(err);
  }
}

export async function DELETE() {
  try {
    await apiFetch("/cart", { method: "DELETE" });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
