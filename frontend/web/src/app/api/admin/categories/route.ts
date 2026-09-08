import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";
import type { Category } from "@/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const category = await apiFetch<Category>("/admin/categories", { method: "POST", body });
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
