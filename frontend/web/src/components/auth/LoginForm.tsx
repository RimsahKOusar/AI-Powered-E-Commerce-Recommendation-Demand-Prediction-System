"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error?.message ?? "Login failed. Please try again.");
        return;
      }

      router.push(data.user.role === "admin" ? "/admin" : "/");
      router.refresh();
    } catch {
      setError("Could not reach the server. Is core-api running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <h1 className="text-lg font-bold text-foreground">Welcome back</h1>
      <p className="mt-0.5 text-sm text-muted">Sign in to your ShopIQ account</p>

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3.5">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-body">Email</span>
          <Input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-body">Password</span>
          <Input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>

        {error && (
          <p className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>
        )}

        <Button type="submit" loading={loading} className="mt-1 w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-primary-hover">
          Create one
        </Link>
      </p>
    </Card>
  );
}
