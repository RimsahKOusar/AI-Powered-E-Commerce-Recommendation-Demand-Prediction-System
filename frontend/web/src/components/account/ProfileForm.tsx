"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { User } from "@/types";

export function ProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const [fullName, setFullName] = useState(user.full_name);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setLoading(true);

    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error?.message ?? "Failed to update profile.");
        return;
      }

      setSaved(true);
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3.5">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-body">Full name</span>
            <Input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-body">Email</span>
            <Input value={user.email} disabled />
            <span className="text-xs text-muted">Email changes aren&apos;t supported yet.</span>
          </label>

          {error && (
            <p className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>
          )}

          <div className="flex items-center gap-3">
            <Button type="submit" loading={loading}>
              Save changes
            </Button>
            {saved && <span className="text-sm font-medium text-success">Saved.</span>}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
