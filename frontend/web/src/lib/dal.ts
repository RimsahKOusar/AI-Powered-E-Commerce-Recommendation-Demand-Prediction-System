import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { apiFetch, ApiError } from "@/lib/api";
import { ACCESS_COOKIE } from "@/lib/session";
import type { User } from "@/types";

/**
 * Verifies the session against core-api (`GET /auth/me`) inside the Server
 * Component tree — this, not `middleware.ts`, is the real auth boundary.
 * `cache()` de-dupes repeat calls within one request/render pass.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const jar = await cookies();
  if (!jar.get(ACCESS_COOKIE)?.value) return null;

  try {
    return await apiFetch<User>("/auth/me");
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) return null;
    throw err;
  }
});

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser();
  if (user.role !== "admin") redirect("/");
  return user;
}
