import { env } from "@/lib/env";

export const ACCESS_COOKIE = "access_token";
export const REFRESH_COOKIE = "refresh_token";

const JWT_ACCESS_TTL_MIN = 15;
const JWT_REFRESH_TTL_DAYS = 7;

/** Minimal shape both `next/headers` `cookies()` and `NextResponse.cookies` satisfy. */
export interface CookieJar {
  set(
    name: string,
    value: string,
    options?: {
      httpOnly?: boolean;
      secure?: boolean;
      sameSite?: "lax" | "strict" | "none";
      path?: string;
      maxAge?: number;
    },
  ): void;
}

function base(secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
  };
}

/** Set both session cookies from a fresh token pair. Call from a Route Handler only. */
export function setSessionCookies(
  jar: CookieJar,
  tokens: { access_token: string; refresh_token: string },
) {
  const secure = env.COOKIE_SECURE;
  jar.set(ACCESS_COOKIE, tokens.access_token, {
    ...base(secure),
    path: "/",
    maxAge: JWT_ACCESS_TTL_MIN * 60,
  });
  jar.set(REFRESH_COOKIE, tokens.refresh_token, {
    ...base(secure),
    path: "/api/auth",
    maxAge: JWT_REFRESH_TTL_DAYS * 24 * 60 * 60,
  });
}

export function clearSessionCookies(jar: CookieJar) {
  jar.set(ACCESS_COOKIE, "", { ...base(env.COOKIE_SECURE), path: "/", maxAge: 0 });
  jar.set(REFRESH_COOKIE, "", { ...base(env.COOKIE_SECURE), path: "/api/auth", maxAge: 0 });
}
