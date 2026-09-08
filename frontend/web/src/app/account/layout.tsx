import type { ReactNode } from "react";

import { AccountHeader } from "@/components/account/AccountHeader";
import { requireUser } from "@/lib/dal";

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();

  return (
    <div className="min-h-full">
      <AccountHeader user={user} />
      <main className="mx-auto max-w-4xl p-4 sm:p-6">{children}</main>
    </div>
  );
}
