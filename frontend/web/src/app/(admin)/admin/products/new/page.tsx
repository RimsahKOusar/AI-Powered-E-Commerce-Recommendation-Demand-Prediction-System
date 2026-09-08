import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { listCategories } from "@/lib/catalog";

export const metadata = { title: "Add product" };

export default async function NewProductPage() {
  const categories = await listCategories();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <PageHeader title="Add product" subtitle="Create a new catalog entry" />
      <ProductForm categories={categories} />
    </div>
  );
}
