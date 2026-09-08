import { OrdersTable } from "@/components/admin/OrdersTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/Card";
import { orders } from "@/lib/mock/orders";

export const metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Orders" subtitle={`${orders.length} orders`} />

      <Card className="p-0">
        <OrdersTable orders={orders} />
      </Card>
    </div>
  );
}
