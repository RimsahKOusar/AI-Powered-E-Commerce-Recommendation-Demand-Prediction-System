import { AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";

import { PageHeader } from "@/components/admin/PageHeader";
import { Select, Toolbar } from "@/components/admin/Toolbar";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import { inventory, type Risk } from "@/lib/mock/inventory";
import { cn } from "@/lib/utils";

export const metadata = { title: "Inventory" };

const RISK_TONE: Record<Risk, BadgeTone> = { HIGH: "danger", MEDIUM: "warning", LOW: "success" };

export default function InventoryPage() {
  const counts = { HIGH: 0, MEDIUM: 0, LOW: 0 } as Record<Risk, number>;
  for (const row of inventory) counts[row.risk]++;

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Inventory"
        subtitle="30-day demand coverage per product · M2 forecast"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-3 p-4">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-danger-soft text-danger">
            <AlertTriangle size={18} />
          </span>
          <div>
            <div className="text-xl font-bold text-foreground">{counts.HIGH}</div>
            <div className="text-xs text-muted">High risk — reorder now</div>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-warning-soft text-warning">
            <RefreshCw size={18} />
          </span>
          <div>
            <div className="text-xl font-bold text-foreground">{counts.MEDIUM}</div>
            <div className="text-xs text-muted">Medium risk — monitor</div>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-success-soft text-success">
            <CheckCircle2 size={18} />
          </span>
          <div>
            <div className="text-xl font-bold text-foreground">{counts.LOW}</div>
            <div className="text-xs text-muted">Healthy coverage</div>
          </div>
        </Card>
      </div>

      <Card className="p-0">
        <Toolbar
          searchPlaceholder="Search by product or SKU…"
          filters={
            <Select
              options={[
                { label: "All risk levels", value: "" },
                { label: "High", value: "high" },
                { label: "Medium", value: "medium" },
                { label: "Low", value: "low" },
              ]}
            />
          }
        />

        <Table>
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Stock</Th>
              <Th>Predicted (30d)</Th>
              <Th>Coverage</Th>
              <Th>Risk</Th>
              <Th>Reorder qty</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {inventory.map((row) => (
              <Tr key={row.sku}>
                <Td>
                  <div className="font-medium text-foreground">{row.product}</div>
                  <div className="font-mono text-[0.7rem] text-muted">{row.sku}</div>
                </Td>
                <Td>{row.stock}</Td>
                <Td>{row.predicted30d}</Td>
                <Td className="w-36">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-muted">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          row.risk === "HIGH" && "bg-danger",
                          row.risk === "MEDIUM" && "bg-warning",
                          row.risk === "LOW" && "bg-success",
                        )}
                        style={{ width: `${Math.min(row.coverage * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted">{Math.round(row.coverage * 100)}%</span>
                  </div>
                </Td>
                <Td>
                  <Badge tone={RISK_TONE[row.risk]}>{row.risk}</Badge>
                </Td>
                <Td>{row.reorderQty || <span className="text-muted">—</span>}</Td>
                <Td>
                  <Button variant="outline" className="px-3 py-1.5 text-xs" disabled={row.reorderQty === 0}>
                    Restock
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
    </div>
  );
}
