"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Loader2, Search } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/mock/orders";
import { STATUS_TONE } from "@/lib/mock/orders";

import { OrderDetailDrawer } from "./OrderDetailDrawer";

const PAGE_SIZE = 8;
const STATUS_OPTIONS: { label: string; value: OrderStatus | "" }[] = [
  { label: "All statuses", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Refunded", value: "refunded" },
];

export function OrdersTable({ orders: allOrders }: { orders: Order[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | "">("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Order | null>(null);
  const sentinelRef = useRef<HTMLTableRowElement | null>(null);

  const orders = useMemo(() => {
    const term = search.trim().toLowerCase();
    return allOrders.filter((o) => {
      const matchesTerm =
        !term || o.id.toLowerCase().includes(term) || o.customer.toLowerCase().includes(term);
      const matchesStatus = !status || o.status === status;
      return matchesTerm && matchesStatus;
    });
  }, [allOrders, search, status]);

  function updateSearch(value: string) {
    setSearch(value);
    setVisibleCount(PAGE_SIZE); // filters reset pagination back to page 1
  }

  function updateStatus(value: OrderStatus | "") {
    setStatus(value);
    setVisibleCount(PAGE_SIZE);
  }

  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const currentPage = Math.min(Math.ceil(visibleCount / PAGE_SIZE) || 1, totalPages);
  const visible = useMemo(() => orders.slice(0, visibleCount), [orders, visibleCount]);
  const hasMore = visibleCount < orders.length;

  // Auto-load the next page as the sentinel row scrolls into view — the
  // numbered buttons below stay fully functional alongside this.
  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((v) => Math.min(v + PAGE_SIZE, orders.length));
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, orders.length]);

  function goToPage(page: number) {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setVisibleCount((v) => Math.max(v, clamped * PAGE_SIZE));
    requestAnimationFrame(() => {
      document
        .getElementById(`order-row-${orders[(clamped - 1) * PAGE_SIZE]?.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5 border-b border-border p-4">
        <label className="relative flex min-w-[220px] flex-1 items-center">
          <Search size={15} className="pointer-events-none absolute left-3 text-muted" />
          <Input
            placeholder="Search by order ID or customer…"
            className="pl-9"
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
          />
        </label>
        <select
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          value={status}
          onChange={(e) => updateStatus(e.target.value as OrderStatus | "")}
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {orders.length === 0 ? (
        <p className="p-8 text-center text-sm text-muted">No orders match these filters.</p>
      ) : (
        <>
      <Table>
        <Thead>
          <Tr>
            <Th>Order</Th>
            <Th>Customer</Th>
            <Th>Items</Th>
            <Th>Amount</Th>
            <Th>Payment</Th>
            <Th>Status</Th>
            <Th>Placed</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {visible.map((o) => (
            <Tr key={o.id} id={`order-row-${o.id}`}>
              <Td className="font-mono text-xs text-foreground">{o.id}</Td>
              <Td>
                <div className="flex items-center gap-2.5">
                  <Avatar name={o.customer} size={28} />
                  <div className="min-w-0">
                    <div className="truncate font-medium text-foreground">{o.customer}</div>
                    <div className="truncate text-[0.7rem] text-muted">{o.email}</div>
                  </div>
                </div>
              </Td>
              <Td>{o.items}</Td>
              <Td className="font-semibold text-foreground">{formatCurrency(o.amount)}</Td>
              <Td>{o.paymentMethod}</Td>
              <Td>
                <Badge tone={STATUS_TONE[o.status]} className="capitalize">
                  {o.status}
                </Badge>
              </Td>
              <Td className="whitespace-nowrap text-xs text-muted">{o.placedAt}</Td>
              <Td>
                <button
                  type="button"
                  onClick={() => setSelected(o)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-surface-muted hover:text-foreground"
                  aria-label={`View ${o.id}`}
                >
                  <Eye size={16} />
                </button>
              </Td>
            </Tr>
          ))}

          {hasMore && (
            <tr ref={sentinelRef}>
              <td colSpan={8} className="py-4 text-center text-xs text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Loader2 size={13} className="animate-spin" /> Loading more orders…
                </span>
              </td>
            </tr>
          )}
        </Tbody>
      </Table>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4 text-sm">
        <span className="text-muted">
          Showing <span className="font-medium text-foreground">{visible.length}</span> of{" "}
          <span className="font-medium text-foreground">{orders.length}</span> · scroll for more
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="grid h-8 w-8 place-items-center rounded-lg border border-border text-body hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={15} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => goToPage(p)}
              className={cn(
                "grid h-8 w-8 place-items-center rounded-lg text-sm",
                p === currentPage
                  ? "bg-primary font-semibold text-primary-fg"
                  : "text-body hover:bg-surface-muted",
              )}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="grid h-8 w-8 place-items-center rounded-lg border border-border text-body hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
        </>
      )}

      <OrderDetailDrawer order={selected} onClose={() => setSelected(null)} />
    </>
  );
}
