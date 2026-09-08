import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";
import type { Customer, Paginated } from "@/types";

export async function GET(request: Request) {
  const { search } = new URL(request.url);
  try {
    const result = await apiFetch<Paginated<Customer>>(`/admin/customers${search}`);
    return NextResponse.json(result);
  } catch (err) {
    return apiErrorResponse(err);
  }
}
