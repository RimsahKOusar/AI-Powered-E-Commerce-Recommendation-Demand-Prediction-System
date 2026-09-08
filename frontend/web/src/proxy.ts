import { NextResponse, type NextRequest } from "next/server";

import { ACCESS_COOKIE } from "@/lib/session";

// Optimistic redirect only — presence of the cookie, not its validity.
// The real check is `requireUser()`/`requireAdmin()` in the Server Component
// tree (src/lib/dal.ts), per Next.js's auth guidance.
const PROTECTED_PREFIXES = ["/admin", "/account", "/verify-email"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  if (isProtected && !request.cookies.get(ACCESS_COOKIE)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/verify-email"],
};
