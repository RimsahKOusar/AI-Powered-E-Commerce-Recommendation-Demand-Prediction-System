import { CartItemsList } from "@/components/shop/CartItemsList";
import { StorefrontHeader } from "@/components/shop/StorefrontHeader";
import { getCart } from "@/lib/cart";
import { requireUser } from "@/lib/dal";

export const metadata = { title: "Your cart" };

export default async function CartPage() {
  await requireUser();
  const cart = await getCart();

  return (
    <div className="min-h-full">
      <StorefrontHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <h1 className="mb-5 text-xl font-bold text-foreground">Your cart</h1>
        <CartItemsList initial={cart} />
      </main>
    </div>
  );
}
