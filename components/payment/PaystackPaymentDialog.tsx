"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  CreditCard,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Shield,
  ExternalLink,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface PremiumOption {
  name: string;
  amount: number;
  period: string;
  description?: string;
}

interface PaystackPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  premiumOption: PremiumOption;
  onPaymentConfirmed?: (reference: string) => void;
}

type DialogState = "idle" | "initializing" | "awaiting" | "verifying" | "confirmed" | "failed";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s\+\-\(\)]{7,15}$/.test(phone.trim());
}

function formatKES(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function PaystackPaymentDialog({
  isOpen,
  onClose,
  serviceName,
  premiumOption,
  onPaymentConfirmed,
}: PaystackPaymentDialogProps) {
  const [state, setState]       = useState<DialogState>("idle");
  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [reference, setReference] = useState("");
  const [verifyResult, setVerifyResult] = useState<{
    amount?: number;
    channel?: string;
    paidAt?: string;
  }>({});

  // ── Validation ─────────────────────────────────────────────────────────────

  function validate(): string | null {
    if (!fullName.trim())           return "Please enter your full name.";
    if (!isValidEmail(email))       return "Please enter a valid email address.";
    if (phone && !isValidPhone(phone)) return "Please enter a valid phone number.";
    return null;
  }

  // ── Step 1: Initialize payment with our backend ────────────────────────────

  async function handlePay() {
    const validationError = validate();
    if (validationError) { setErrorMsg(validationError); return; }

    setErrorMsg("");
    setState("initializing");

    try {
      const res = await fetch("/api/payments/paystack/initialize", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount:            premiumOption.amount,
          fullName:          fullName.trim(),
          phone:             phone.trim() || undefined,
          serviceName,
          premiumOptionName: premiumOption.name,
          period:            premiumOption.period,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Failed to initialize payment. Please try again.");
      }

      // Store reference so we can verify after the popup closes
      setReference(data.reference);

      // ── Step 2: Open Paystack checkout in a new tab ─────────────────────────
      const popup = window.open(data.authorizationUrl, "_blank", "noopener,noreferrer");

      setState("awaiting");

      // Poll for the popup closing (user paid or closed the tab)
      const pollClosed = setInterval(() => {
        if (popup && popup.closed) {
          clearInterval(pollClosed);
          handleVerify(data.reference);
        }
      }, 800);

    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setState("failed");
    }
  }

  // ── Step 3: Verify payment after popup closes ──────────────────────────────

  async function handleVerify(ref: string) {
    setState("verifying");

    try {
      const res = await fetch("/api/payments/paystack/verify", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: ref }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Verification failed.");
      }

      if (data.status === "completed") {
        setVerifyResult({
          amount:  data.amount,
          channel: data.channel,
          paidAt:  data.paidAt,
        });
        setState("confirmed");
        onPaymentConfirmed?.(ref);
        return;
      }

      if (data.status === "failed") {
        setErrorMsg(data.gatewayResponse ?? "Payment was not completed. Please try again.");
        setState("failed");
        return;
      }

      // Still pending — user may have closed tab before paying
      setErrorMsg(
        "We could not confirm your payment yet. If you completed the payment, please wait a moment and try again — or call us directly."
      );
      setState("failed");

    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Verification failed.");
      setState("failed");
    }
  }

  // ── Manual verify button (if user paid but closed popup early) ─────────────

  function handleManualVerify() {
    if (reference) handleVerify(reference);
  }

  // ── Reset & close ──────────────────────────────────────────────────────────

  function reset() {
    setState("idle");
    setErrorMsg("");
    setReference("");
    setVerifyResult({});
  }

  function handleClose() {
    onClose();
    setTimeout(reset, 300);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden rounded-2xl">

        {/* Header */}
        <DialogHeader className="bg-navy-900 px-6 pt-6 pb-5">
          <DialogTitle className="flex items-center gap-2.5 text-white text-lg font-bold">
            <div className="w-9 h-9 bg-gold-500/20 rounded-lg flex items-center justify-center">
              <CreditCard size={18} className="text-gold-500" />
            </div>
            Secure Payment
          </DialogTitle>
          <DialogDescription className="text-white/60 text-sm mt-1">
            {serviceName} — {premiumOption.name}
          </DialogDescription>
        </DialogHeader>

        {/* Amount banner */}
        <div className="bg-navy-50 border-b border-navy-100 px-6 py-3 flex items-center justify-between">
          <span className="text-sm text-gray-500">Amount</span>
          <span className="text-2xl font-bold text-navy-900 font-display">
            {formatKES(premiumOption.amount)}
          </span>
        </div>

        <div className="px-6 py-6 space-y-4">

          {/* ── IDLE: Input form ── */}
          {state === "idle" && (
            <>
              {errorMsg && (
                <Alert variant="destructive" className="py-2.5">
                  <AlertDescription className="text-sm">{errorMsg}</AlertDescription>
                </Alert>
              )}

              <Field label="Full Name *" htmlFor="ps-name">
                <input
                  id="ps-name"
                  type="text"
                  placeholder="Jane Wanjiru"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                />
              </Field>

              <Field label="Email Address *" htmlFor="ps-email">
                <input
                  id="ps-email"
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
                <p className="text-xs text-gray-400 mt-1">Your receipt will be sent here.</p>
              </Field>

              <Field label="Phone Number (optional)" htmlFor="ps-phone">
                <input
                  id="ps-phone"
                  type="tel"
                  placeholder="0712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
              </Field>

              <button
                onClick={handlePay}
                className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold
                           py-3 rounded-lg transition-colors active:scale-[0.98] mt-2
                           flex items-center justify-center gap-2"
              >
                <ExternalLink size={15} />
                Pay {formatKES(premiumOption.amount)} via Paystack
              </button>

              <SecurityNote />
            </>
          )}

          {/* ── INITIALIZING ── */}
          {state === "initializing" && (
            <StatusBlock
              icon={<Loader2 size={40} className="animate-spin text-gold-500" />}
              title="Preparing Checkout…"
              body="Setting up your secure payment session. Just a moment."
            />
          )}

          {/* ── AWAITING: Popup is open, user is paying ── */}
          {state === "awaiting" && (
            <div className="space-y-4">
              <StatusBlock
                icon={
                  <div className="relative">
                    <CreditCard size={40} className="text-navy-700" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-gold-500" />
                    </span>
                  </div>
                }
                title="Complete Payment in the Popup"
                body="A Paystack checkout tab has opened. Complete your payment there, then return here."
                extra={
                  <p className="text-xs text-gray-400 text-center">
                    We'll confirm your payment automatically when the tab closes.
                  </p>
                }
              />
              {/* Manual fallback if popup detection fails */}
              <button
                onClick={handleManualVerify}
                className="w-full text-sm border border-gray-200 text-gray-600 font-medium
                           py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                I've completed payment — confirm now
              </button>
            </div>
          )}

          {/* ── VERIFYING ── */}
          {state === "verifying" && (
            <StatusBlock
              icon={<Loader2 size={40} className="animate-spin text-navy-700" />}
              title="Verifying Payment…"
              body="Confirming your transaction with Paystack. This takes just a second."
            />
          )}

          {/* ── CONFIRMED ── */}
          {state === "confirmed" && (
            <StatusBlock
              icon={<CheckCircle2 size={40} className="text-green-500" />}
              title="Payment Confirmed!"
              body={`Your ${serviceName} premium has been received. A receipt has been sent to ${email}.`}
              extra={
                <div className="w-full space-y-2">
                  {verifyResult.amount && (
                    <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
                      <p className="text-xs text-green-600 font-medium">Amount Paid</p>
                      <p className="text-lg font-bold text-green-800">
                        {formatKES(verifyResult.amount)}
                      </p>
                    </div>
                  )}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-center">
                    <p className="text-xs text-gray-500 font-medium">Reference</p>
                    <p className="text-sm font-bold text-gray-800 font-mono">{reference}</p>
                  </div>
                </div>
              }
            />
          )}

          {/* ── FAILED ── */}
          {state === "failed" && (
            <div className="space-y-4">
              <StatusBlock
                icon={<XCircle size={40} className="text-red-500" />}
                title="Payment Not Completed"
                body={errorMsg || "Something went wrong. Please try again."}
              />
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 border border-gray-200
                           text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50
                           transition-colors text-sm"
              >
                <ArrowLeft size={14} />
                Try Again
              </button>
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="form-label">{label}</label>
      {children}
    </div>
  );
}

function StatusBlock({
  icon,
  title,
  body,
  extra,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center py-4 gap-4">
      {icon}
      <div>
        <p className="font-semibold text-navy-900 text-base">{title}</p>
        <p className="text-gray-500 text-sm leading-relaxed mt-1 max-w-xs">{body}</p>
      </div>
      {extra}
    </div>
  );
}

function SecurityNote() {
  return (
    <div className="flex items-start gap-2 text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2.5">
      <Shield size={12} className="mt-0.5 flex-shrink-0 text-gray-400" />
      <span>
        Secured by Paystack. Pay with card, M-Pesa, or bank transfer.
        We never store your payment details. Receipt sent to your email immediately.
      </span>
    </div>
  );
}
