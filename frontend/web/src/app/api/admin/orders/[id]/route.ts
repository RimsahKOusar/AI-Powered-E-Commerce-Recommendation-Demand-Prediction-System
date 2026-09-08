import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";
import type { Order } from "@/types";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  try {
    const order = await apiFetch<Order>(`/admin/orders/${id}`, { method: "PATCH", body });
    return NextResponse.json(order);
  } catch (err) {
    return apiErrorResponse(err);
  }
}
