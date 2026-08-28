/**
 * Server-side environment. Never import this into a Client Component.
 * `CORE_API_URL` is the internal base URL for RSC / Route Handler fetches and
 * is never exposed to the browser.
 */
export const env = {
  CORE_API_URL: process.env.CORE_API_URL ?? "http://localhost:8000/api/v1",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  COOKIE_SECURE: process.env.COOKIE_SECURE === "true",
} as const;
