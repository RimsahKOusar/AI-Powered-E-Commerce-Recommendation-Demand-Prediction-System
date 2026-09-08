import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/dal";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect(user.role === "admin" ? "/admin" : "/account");
  }

  return (
    <main className="mx-auto flex min-h-full max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-widest text-muted">
        AI-powered e-commerce
      </span>
      <h1 className="text-3xl font-extrabold text-foreground">ShopIQ</h1>
      <p className="max-w-prose text-body">
        Personalized recommendations and demand forecasting, built on Next.js + FastAPI.
        Sign in to see your account, or open the admin dashboard.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/login"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-fg hover:bg-primary-hover"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface-muted"
        >
          Create account
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-card border border-border bg-surface p-4 shadow-card">
          <div className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
            core-api
          </div>
          <div className="mt-1 font-semibold text-foreground">FastAPI · :8000</div>
          <p className="mt-1 text-sm text-body">
            Health at <code className="text-primary-hover">/api/v1/health</code>
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-4 shadow-card">
          <div className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
            auth
          </div>
          <div className="mt-1 font-semibold text-foreground">JWT · httpOnly cookies</div>
          <p className="mt-1 text-sm text-body">
            Proxied via <code className="text-primary-hover">/api/auth/*</code> route handlers
          </p>
        </div>
      </div>
    </main>
  );
}
