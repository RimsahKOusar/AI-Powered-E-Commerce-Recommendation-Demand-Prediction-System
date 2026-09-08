import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const result = await apiFetch<{ message: string; debug_reset_otp?: string }>(
      "/auth/forgot-password",
      { method: "POST", body },
    );
    return NextResponse.json(result);
  } catch (err) {
    return apiErrorResponse(err);
  }
}
