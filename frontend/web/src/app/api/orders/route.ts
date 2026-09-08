import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";
import type { Order } from "@/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const order = await apiFetch<Order>("/orders", { method: "POST", body });
    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
