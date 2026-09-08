import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";
import type { Product } from "@/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const product = await apiFetch<Product>("/admin/products", { method: "POST", body });
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
