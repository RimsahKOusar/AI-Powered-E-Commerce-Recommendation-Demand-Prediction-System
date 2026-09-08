import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";
import type { Order, Paginated } from "@/types";

export async function GET(request: Request) {
  const { search } = new URL(request.url);
  try {
    const result = await apiFetch<Paginated<Order>>(`/admin/orders${search}`);
    return NextResponse.json(result);
  } catch (err) {
    return apiErrorResponse(err);
  }
}
