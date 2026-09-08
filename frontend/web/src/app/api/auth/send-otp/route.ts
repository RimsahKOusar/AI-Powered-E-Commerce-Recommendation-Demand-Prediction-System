import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";

export async function POST() {
  try {
    const result = await apiFetch<{ message: string; debug_otp?: string }>(
      "/auth/send-otp",
      { method: "POST" },
    );
    return NextResponse.json(result);
  } catch (err) {
    return apiErrorResponse(err);
  }
}
