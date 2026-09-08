import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProduct, listCategories } from "@/lib/catalog";

export const metadata = { title: "Edit product" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categories, product] = await Promise.all([listCategories(), getProduct(id)]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <PageHeader title="Edit product" subtitle={product.title} />
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
