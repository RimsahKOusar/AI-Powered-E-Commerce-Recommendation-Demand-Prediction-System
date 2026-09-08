import { FolderTree, Plus } from "lucide-react";

import { PageHeader } from "@/components/admin/PageHeader";
import { Toolbar } from "@/components/admin/Toolbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import { formatCompactNumber } from "@/lib/format";
import { categories } from "@/lib/mock/categories";

export const metadata = { title: "Categories" };

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Categories"
        subtitle={`${categories.length} categories`}
        actions={
          <Button>
            <Plus size={16} /> Add category
          </Button>
        }
      />

      <Card className="p-0">
        <Toolbar searchPlaceholder="Search categories…" />

        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Parent</Th>
              <Th>Slug</Th>
              <Th>Products</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((c) => (
              <Tr key={c.id}>
                <Td>
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary-hover">
                      <FolderTree size={15} />
                    </span>
                    <span className="font-medium text-foreground">{c.name}</span>
                  </div>
                </Td>
                <Td>{c.parent ?? <span className="text-muted">—</span>}</Td>
                <Td className="font-mono text-xs">{c.slug}</Td>
                <Td className="font-semibold text-foreground">
                  {formatCompactNumber(c.productCount)}
                </Td>
                <Td>
                  <Badge tone={c.isActive ? "success" : "neutral"}>
                    {c.isActive ? "Active" : "Inactive"}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
    </div>
  );
}
