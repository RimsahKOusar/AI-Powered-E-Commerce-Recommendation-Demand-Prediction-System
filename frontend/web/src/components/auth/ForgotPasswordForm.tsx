"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"request" | "reset">("request");
  const [debugOtp, setDebugOtp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function requestOtp(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error?.message ?? "Could not send the code.");
        return;
      }
      setDebugOtp(data?.debug_reset_otp ?? null);
      setInfo("Your verification code is ready. It expires in 1 hour.");
      setStep("reset");
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: otp, password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error?.message ?? "Could not reset the password.");
        return;
      }
      setInfo("Password changed. You can now sign in.");
      setOtp("");
      setPassword("");
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <h1 className="text-lg font-bold text-foreground">Forgot password?</h1>
      <p className="mt-0.5 text-sm text-muted">
        {step === "request" ? "Enter your email to get a verification code." : "Enter the code and your new password."}
      </p>

      {step === "request" ? (
        <form onSubmit={requestOtp} className="mt-5 flex flex-col gap-3.5">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-body">Email</span>
            <Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <Button type="submit" loading={loading} className="w-full">Send OTP</Button>
        </form>
      ) : (
        <form onSubmit={resetPassword} className="mt-5 flex flex-col gap-3.5">
          {debugOtp && (
            <p className="rounded-lg bg-warning-soft px-3 py-2 text-sm text-warning">
              SMTP is not configured. Your OTP is: <strong>{debugOtp}</strong>
            </p>
          )}
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-body">OTP code</span>
            <Input required inputMode="numeric" pattern="\d{6}" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} placeholder="000000" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-body">New password</span>
            <Input required type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <Button type="submit" loading={loading} disabled={otp.length !== 6} className="w-full">Change password</Button>
        </form>
      )}

      {error && <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
      {info && !error && <p className="mt-3 rounded-lg bg-success-soft px-3 py-2 text-sm text-success">{info}</p>}
      <p className="mt-5 text-center text-sm text-muted"><Link href="/login" className="font-semibold text-primary-hover">Back to sign in</Link></p>
    </Card>
  );
}
