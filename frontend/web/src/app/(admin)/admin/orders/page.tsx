import { OrdersTable } from "@/components/admin/OrdersTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/Card";
import { listOrdersAdmin } from "@/lib/orders";

export const metadata = { title: "Orders" };

export default async function OrdersPage() {
  const initial = await listOrdersAdmin({ page: 1, page_size: 10 });

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Orders" subtitle={`${initial.meta.pagination.total} orders`} />

      <Card className="p-0">
        <OrdersTable initial={initial} />
      </Card>
    </div>
  );
}
