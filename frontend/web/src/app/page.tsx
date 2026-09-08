export default function Home() {
  return (
    <main className="mx-auto flex min-h-full max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-widest text-muted">
        Phase 0 · Foundation
      </span>
      <h1 className="text-3xl font-extrabold text-foreground">
        ShopIQ scaffold is up
      </h1>
      <p className="max-w-prose text-body">
        Next.js 16 App Router with the Sneat design tokens wired into Tailwind v4.
        The storefront and admin shells land in Phase 3; authentication in Phases
        1&ndash;2.
      </p>

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
            database
          </div>
          <div className="mt-1 font-semibold text-foreground">PostgreSQL 17</div>
          <p className="mt-1 text-sm text-body">Migration 0001 — identity &amp; auth</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-hover">
          primary #696cff
        </span>
        <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">
          success
        </span>
        <span className="rounded-full bg-warning-soft px-3 py-1 text-xs font-semibold text-warning">
          warning
        </span>
        <span className="rounded-full bg-danger-soft px-3 py-1 text-xs font-semibold text-danger">
          danger
        </span>
      </div>
    </main>
  );
}
