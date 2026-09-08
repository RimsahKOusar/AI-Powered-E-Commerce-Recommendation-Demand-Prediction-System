import { NextResponse } from "next/server";

import { ApiError, coreFetch } from "@/lib/api";
import { setSessionCookies } from "@/lib/session";
import type { TokenPair } from "@/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.password) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: "email and password are required.", details: {} } },
      { status: 422 },
    );
  }

  try {
    const tokens = await coreFetch<TokenPair>("/auth/login", {
      method: "POST",
      body: { email: body.email, password: body.password },
    });

    const res = NextResponse.json({ user: tokens.user });
    setSessionCookies(res.cookies, tokens);
    return res;
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        { error: { code: err.code, message: err.message, details: err.details } },
        { status: err.status },
      );
    }
    throw err;
  }
}
