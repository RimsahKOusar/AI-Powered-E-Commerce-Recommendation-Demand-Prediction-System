import { cookies } from "next/headers";

import { env } from "@/lib/env";
import { ACCESS_COOKIE } from "@/lib/session";
import type { ApiErrorBody } from "@/types";

export class ApiError extends Error {
  status: number;
  code: string;
  details: Record<string, unknown>;
  requestId?: string;

  constructor(status: number, body: Partial<ApiErrorBody["error"]>, requestId?: string) {
    super(body.message ?? "Request failed");
    this.name = "ApiError";
    this.status = status;
    this.code = body.code ?? "UNKNOWN_ERROR";
    this.details = body.details ?? {};
    this.requestId = requestId;
  }
}

type FetchOptions = Omit<RequestInit, "body"> & { body?: unknown };

/** Raw fetch against core-api. No auth header — pass one via `headers` if needed. */
export async function coreFetch<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  const { body, headers, ...rest } = opts;

  const res = await fetch(`${env.CORE_API_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (res.status === 204) return undefined as T;

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(res.status, json.error ?? { message: `HTTP ${res.status}` }, json.request_id);
  }

  return json as T;
}

/**
 * Authenticated fetch for Server Components / Server Actions — reads the
 * access token from the `access_token` httpOnly cookie automatically.
 * Never import this into a Client Component.
 */
export async function apiFetch<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  const jar = await cookies();
  const token = jar.get(ACCESS_COOKIE)?.value;

  return coreFetch<T>(path, {
    ...opts,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opts.headers,
    },
  });
}
