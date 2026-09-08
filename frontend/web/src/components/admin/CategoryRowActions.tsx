"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

export function CategoryRowActions({
  id,
  name,
  productCount,
}: {
  id: string;
  name: string;
  productCount: number;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onRename() {
    const next = prompt("Rename category", name);
    if (!next || next.trim() === "" || next === name) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: next.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.error?.message ?? "Failed to rename category.");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    if (productCount > 0) {
      alert(`"${name}" still has ${productCount} product(s) — move or delete them first.`);
      return;
    }
    if (!confirm(`Delete "${name}"?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.error?.message ?? "Failed to delete category.");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onRename}
        disabled={busy}
        className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-surface-muted hover:text-foreground disabled:opacity-50"
        aria-label={`Rename ${name}`}
      >
        <Pencil size={15} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={busy}
        className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger disabled:opacity-50"
        aria-label={`Delete ${name}`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
