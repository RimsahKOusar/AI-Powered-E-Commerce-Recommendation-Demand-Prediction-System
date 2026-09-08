import Link from "next/link";
import type { ReactNode } from "react";
import { Boxes } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-full place-items-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-fg">
            <Boxes size={19} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-foreground">ShopIQ</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
