import { NextResponse } from "next/server";

import { apiErrorResponse, apiFetch } from "@/lib/api";
import type { User } from "@/types";

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const user = await apiFetch<User>("/users/me", { method: "PATCH", body });
    return NextResponse.json(user);
  } catch (err) {
    return apiErrorResponse(err);
  }
}
