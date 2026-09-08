import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  page,
  totalPages,
  total,
  pageSize,
}: {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
}) {
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4 text-sm">
      <span className="text-muted">
        Showing <span className="font-medium text-foreground">{from}</span>–
        <span className="font-medium text-foreground">{to}</span> of{" "}
        <span className="font-medium text-foreground">{total}</span>
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page <= 1}
          className="grid h-8 w-8 place-items-center rounded-lg border border-border text-body hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={15} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            className={
              p === page
                ? "grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-semibold text-primary-fg"
                : "grid h-8 w-8 place-items-center rounded-lg text-sm text-body hover:bg-surface-muted"
            }
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          disabled={page >= totalPages}
          className="grid h-8 w-8 place-items-center rounded-lg border border-border text-body hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
