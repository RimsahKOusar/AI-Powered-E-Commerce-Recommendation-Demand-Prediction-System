import { PageHeader } from "@/components/admin/PageHeader";
import { Select, Toolbar } from "@/components/admin/Toolbar";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import { formatCurrency } from "@/lib/format";
import { customers, SEGMENT_LABEL, SEGMENT_TONE } from "@/lib/mock/customers";

export const metadata = { title: "Customers" };

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Customers" subtitle={`${customers.length} customers`} />

      <Card className="p-0">
        <Toolbar
          searchPlaceholder="Search by name or email…"
          filters={
            <Select
              options={[
                { label: "All segments", value: "" },
                { label: "New", value: "new" },
                { label: "Window shopper", value: "window_shopper" },
                { label: "High intent", value: "high_intent" },
                { label: "Loyal", value: "loyal" },
                { label: "At risk", value: "at_risk" },
              ]}
            />
          }
        />

        <Table>
          <Thead>
            <Tr>
              <Th>Customer</Th>
              <Th>Segment</Th>
              <Th>Orders</Th>
              <Th>Total spent</Th>
              <Th>Joined</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers.map((c) => (
              <Tr key={c.id}>
                <Td>
                  <div className="flex items-center gap-2.5">
                    <Avatar name={c.name} size={32} />
                    <div className="min-w-0">
                      <div className="truncate font-medium text-foreground">{c.name}</div>
                      <div className="truncate text-[0.7rem] text-muted">{c.email}</div>
                    </div>
                  </div>
                </Td>
                <Td>
                  <Badge tone={SEGMENT_TONE[c.segment]}>{SEGMENT_LABEL[c.segment]}</Badge>
                </Td>
                <Td>{c.orders}</Td>
                <Td className="font-semibold text-foreground">{formatCurrency(c.totalSpent)}</Td>
                <Td className="text-xs text-muted">{c.joined}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
    </div>
  );
}
