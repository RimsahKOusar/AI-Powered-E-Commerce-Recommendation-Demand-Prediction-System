import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    await apiFetch<void>("/auth/reset-password", { method: "POST", body });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
