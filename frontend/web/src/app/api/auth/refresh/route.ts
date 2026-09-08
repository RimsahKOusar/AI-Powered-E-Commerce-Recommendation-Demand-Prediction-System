import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ApiError, coreFetch } from "@/lib/api";
import { clearSessionCookies, REFRESH_COOKIE, setSessionCookies } from "@/lib/session";
import type { AccessPair } from "@/types";

export async function POST() {
  const jar = await cookies();
  const refreshToken = jar.get(REFRESH_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: { code: "UNAUTHENTICATED", message: "No refresh token.", details: {} } },
      { status: 401 },
    );
  }

  try {
    const tokens = await coreFetch<AccessPair>("/auth/refresh", {
      method: "POST",
      body: { refresh_token: refreshToken },
    });

    const res = NextResponse.json({ ok: true });
    setSessionCookies(res.cookies, tokens);
    return res;
  } catch (err) {
    const res = NextResponse.json(
      {
        error:
          err instanceof ApiError
            ? { code: err.code, message: err.message, details: err.details }
            : { code: "UNAUTHENTICATED", message: "Session expired.", details: {} },
      },
      { status: err instanceof ApiError ? err.status : 401 },
    );
    // A dead refresh token can't be salvaged — drop it so the client re-prompts login.
    clearSessionCookies(res.cookies);
    return res;
  }
}
