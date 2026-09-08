import { Eye } from "lucide-react";

import { PageHeader } from "@/components/admin/PageHeader";
import { Pagination } from "@/components/admin/Pagination";
import { Select, Toolbar } from "@/components/admin/Toolbar";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import { formatCurrency } from "@/lib/format";
import { orders, STATUS_TONE } from "@/lib/mock/orders";

export const metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Orders" subtitle={`${orders.length} orders`} />

      <Card className="p-0">
        <Toolbar
          searchPlaceholder="Search by order ID or customer…"
          filters={
            <Select
              options={[
                { label: "All statuses", value: "" },
                { label: "Pending", value: "pending" },
                { label: "Paid", value: "paid" },
                { label: "Shipped", value: "shipped" },
                { label: "Delivered", value: "delivered" },
                { label: "Cancelled", value: "cancelled" },
                { label: "Refunded", value: "refunded" },
              ]}
            />
          }
        />

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
            {orders.map((o) => (
              <Tr key={o.id}>
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
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-surface-muted hover:text-foreground"
                    aria-label={`View ${o.id}`}
                  >
                    <Eye size={16} />
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Pagination page={1} totalPages={4} total={orders.length * 4} pageSize={orders.length} />
      </Card>
    </div>
  );
}
