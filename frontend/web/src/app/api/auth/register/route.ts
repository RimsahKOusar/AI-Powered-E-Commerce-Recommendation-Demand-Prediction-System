import { NextResponse } from "next/server";

import { ApiError, coreFetch } from "@/lib/api";
import { setSessionCookies } from "@/lib/session";
import type { TokenPair } from "@/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.password || !body?.full_name) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "email, password and full_name are required.",
          details: {},
        },
      },
      { status: 422 },
    );
  }

  try {
    const tokens = await coreFetch<TokenPair>("/auth/register", {
      method: "POST",
      body: { email: body.email, password: body.password, full_name: body.full_name },
    });

    const res = NextResponse.json({ user: tokens.user }, { status: 201 });
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
