"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/format";
import type { Order } from "@/lib/mock/orders";
import { STATUS_TONE } from "@/lib/mock/orders";

export function OrderDetailDrawer({ order, onClose }: { order: Order | null; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />

      <aside className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-border bg-surface shadow-card-lg">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <div className="font-mono text-xs text-muted">{order.id}</div>
            <h2 className="text-lg font-bold text-foreground">Order details</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-surface-muted hover:text-foreground"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-5">
          <div className="flex items-center gap-3">
            <Avatar name={order.customer} size={40} />
            <div className="min-w-0">
              <div className="truncate font-medium text-foreground">{order.customer}</div>
              <div className="truncate text-xs text-muted">{order.email}</div>
            </div>
            <Badge tone={STATUS_TONE[order.status]} className="ml-auto shrink-0 capitalize">
              {order.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-surface-muted p-3">
              <div className="text-xs text-muted">Placed</div>
              <div className="font-medium text-foreground">{order.placedAt}</div>
            </div>
            <div className="rounded-lg bg-surface-muted p-3">
              <div className="text-xs text-muted">Payment</div>
              <div className="font-medium text-foreground">{order.paymentMethod}</div>
            </div>
          </div>

          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
              Shipping address
            </div>
            <p className="text-sm text-body">{order.shippingAddress}</p>
          </div>

          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Items
            </div>
            <ul className="flex flex-col gap-2.5">
              {order.lineItems.map((li) => (
                <li key={li.sku} className="flex items-center gap-3 text-sm">
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-foreground">{li.title}</div>
                    <div className="font-mono text-[0.7rem] text-muted">
                      {li.sku} · ×{li.qty}
                    </div>
                  </div>
                  <div className="shrink-0 font-semibold text-foreground">
                    {formatCurrency(li.price * li.qty)}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-medium text-body">Total</span>
            <span className="text-lg font-bold text-foreground">{formatCurrency(order.amount)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
