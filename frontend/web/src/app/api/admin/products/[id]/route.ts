import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";
import type { Product } from "@/types";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  try {
    const product = await apiFetch<Product>(`/admin/products/${id}`, { method: "PUT", body });
    return NextResponse.json(product);
  } catch (err) {
    return apiErrorResponse(err);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await apiFetch(`/admin/products/${id}`, { method: "DELETE" });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
