import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { coreFetch } from "@/lib/api";
import { clearSessionCookies, REFRESH_COOKIE } from "@/lib/session";

export async function POST() {
  const jar = await cookies();
  const refreshToken = jar.get(REFRESH_COOKIE)?.value;

  if (refreshToken) {
    // Best-effort revoke — the cookies get cleared either way.
    await coreFetch("/auth/logout", {
      method: "POST",
      body: { refresh_token: refreshToken },
    }).catch(() => {});
  }

  const res = new NextResponse(null, { status: 204 });
  clearSessionCookies(res.cookies);
  return res;
}
