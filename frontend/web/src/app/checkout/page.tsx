import { redirect } from "next/navigation";

import { CheckoutForm } from "@/components/shop/CheckoutForm";
import { StorefrontHeader } from "@/components/shop/StorefrontHeader";
import { getCart } from "@/lib/cart";
import { requireUser } from "@/lib/dal";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  await requireUser();
  const cart = await getCart();

  if (cart.items.length === 0) {
    redirect("/cart");
  }

  return (
    <div className="min-h-full">
      <StorefrontHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <h1 className="mb-5 text-xl font-bold text-foreground">Checkout</h1>
        <CheckoutForm cart={cart} />
      </main>
    </div>
  );
}
