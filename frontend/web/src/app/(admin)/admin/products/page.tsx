import { Package, Plus, Star } from "lucide-react";

import { Pagination } from "@/components/admin/Pagination";
import { PageHeader } from "@/components/admin/PageHeader";
import { Select, Toolbar } from "@/components/admin/Toolbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import { formatCurrency } from "@/lib/format";
import { products } from "@/lib/mock/products";

export const metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Products"
        subtitle={`${products.length} products in the catalog`}
        actions={
          <Button>
            <Plus size={16} /> Add product
          </Button>
        }
      />

      <Card className="p-0">
        <Toolbar
          searchPlaceholder="Search by name or SKU…"
          filters={
            <>
              <Select
                options={[
                  { label: "All categories", value: "" },
                  { label: "Electronics", value: "electronics" },
                  { label: "Fashion", value: "fashion" },
                  { label: "Home & Decor", value: "home" },
                  { label: "Sports", value: "sports" },
                ]}
              />
              <Select
                options={[
                  { label: "All status", value: "" },
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
              />
            </>
          }
        />

        <Table>
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Rating</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((p) => (
              <Tr key={p.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-muted text-muted">
                      <Package size={17} />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate font-medium text-foreground">{p.title}</div>
                      <div className="truncate font-mono text-[0.7rem] text-muted">{p.sku}</div>
                    </div>
                  </div>
                </Td>
                <Td>{p.category}</Td>
                <Td className="font-semibold text-foreground">{formatCurrency(p.price)}</Td>
                <Td>
                  <span className={p.stock === 0 ? "font-semibold text-danger" : ""}>
                    {p.stock === 0 ? "Out of stock" : p.stock}
                  </span>
                </Td>
                <Td>
                  <div className="flex items-center gap-1">
                    <Star size={13} className="fill-warning text-warning" />
                    {p.rating.toFixed(1)}
                    <span className="text-xs text-muted">({p.ratingCount})</span>
                  </div>
                </Td>
                <Td>
                  <Badge tone={p.isActive ? "success" : "neutral"}>
                    {p.isActive ? "Active" : "Inactive"}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Pagination page={1} totalPages={3} total={products.length * 3} pageSize={products.length} />
      </Card>
    </div>
  );
}
