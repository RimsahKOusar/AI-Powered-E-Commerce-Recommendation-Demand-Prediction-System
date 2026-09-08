import type { ReactNode } from "react";

import { AdminShell } from "@/components/layout/AdminShell";

// requireAdmin() lands in Phase 2 once /auth/me is wired to this app.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
