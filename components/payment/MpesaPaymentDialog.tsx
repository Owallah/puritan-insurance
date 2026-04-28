"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2, Smartphone, CheckCircle2, XCircle, ArrowLeft, Shield,
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

interface MpesaPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  premiumOption: PremiumOption;
  onPaymentConfirmed?: (receiptNumber: string) => void;
}

// idle      → form visible, nothing sent
// sending   → STK push request in-flight
// waiting   → STK sent, polling for PIN confirmation
// confirmed → payment fully completed
// failed    → STK push or payment failed
type DialogState = "idle" | "sending" | "waiting" | "confirmed" | "failed";

const POLL_INTERVAL_MS  = 2_000;
const POLL_MAX_ATTEMPTS = 40; // 80 seconds total

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 10) return "254" + digits.slice(1);
  if (digits.startsWith("7") && digits.length === 9)  return "254" + digits;
  if (digits.startsWith("254") && digits.length === 12) return digits;
  return digits;
}

function isValidPhone(raw: string): boolean {
  return /^254[17]\d{8}$/.test(normalizePhone(raw));
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatKES(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency", currency: "KES", minimumFractionDigits: 0,
  }).format(amount);
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function MpesaPaymentDialog({
  isOpen,
  onClose,
  serviceName,
  premiumOption,
  onPaymentConfirmed,
}: MpesaPaymentDialogProps) {
  const [state,         setState]         = useState<DialogState>("idle");
  const [phone,         setPhone]         = useState("");
  const [email,         setEmail]         = useState("");
  const [fullName,      setFullName]      = useState("");
  const [errorMsg,      setErrorMsg]      = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");

  const pollRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const attemptsRef  = useRef(0);

  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  // ── Polling ─────────────────────────────────────────────────────────────────

  function startPolling(checkoutRequestID: string) {
    attemptsRef.current = 0;
    pollRef.current = setInterval(async () => {
      attemptsRef.current += 1;
      try {
        const res  = await fetch("/api/payments/mpesa/status", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ checkoutRequestID }),
        });
        const data = await res.json();

        if (data.status === "completed") {
          stopPolling();
          setReceiptNumber(data.receiptNumber ?? "");
          setState("confirmed");
          onPaymentConfirmed?.(data.receiptNumber ?? "");
          return;
        }
        if (data.status === "failed") {
          stopPolling();
          setErrorMsg(data.resultDesc || "Payment was not completed. Please try again.");
          setState("failed");
          return;
        }
        if (attemptsRef.current >= POLL_MAX_ATTEMPTS) {
          stopPolling();
          setErrorMsg(
            "Payment confirmation is taking longer than expected. If you entered your PIN, check your M-Pesa messages — the payment may have gone through. Call us if you need help."
          );
          setState("failed");
        }
      } catch {
        // Network hiccup — keep polling
      }
    }, POLL_INTERVAL_MS);
  }

  function stopPolling() {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
  }

  // ── Submit ───────────────────────────────────────────────────────────────────

  async function handlePay() {
    setErrorMsg("");
    if (!fullName.trim())      return setErrorMsg("Please enter your full name.");
    if (!isValidPhone(phone))  return setErrorMsg("Please enter a valid Kenyan M-Pesa number (e.g. 0712 345 678).");
    if (!isValidEmail(email))  return setErrorMsg("Please enter a valid email address for your receipt.");

    setState("sending");
    try {
      const res = await fetch("/api/payments/mpesa/stkpush", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber:       normalizePhone(phone),
          amount:            premiumOption.amount,
          email,
          fullName:          fullName.trim(),
          serviceName,
          premiumOptionName: premiumOption.name,
          period:            premiumOption.period,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to send STK push.");
      setState("waiting");
      startPolling(data.checkoutRequestID);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setState("failed");
    }
  }

  // ── Reset ────────────────────────────────────────────────────────────────────

  function reset() {
    stopPolling();
    setState("idle");
    setErrorMsg("");
    setReceiptNumber("");
  }

  function handleClose() {
    stopPolling();
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
            <div className="w-9 h-9 bg-[#3CB72B]/20 rounded-lg flex items-center justify-center">
              <Smartphone size={18} className="text-[#3CB72B]" />
            </div>
            Pay with M-Pesa
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

          {/* IDLE — input form */}
          {state === "idle" && (
            <>
              {errorMsg && (
                <Alert variant="destructive" className="py-2.5">
                  <AlertDescription className="text-sm">{errorMsg}</AlertDescription>
                </Alert>
              )}
              <FormField label="Full Name" htmlFor="mpesa-name">
                <input
                  id="mpesa-name" type="text" placeholder="Jane Wanjiru"
                  value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                />
              </FormField>
              <FormField label="M-Pesa Phone Number" htmlFor="mpesa-phone">
                <input
                  id="mpesa-phone" type="tel" placeholder="0712 345 678"
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
                <p className="text-xs text-gray-400 mt-1">You'll receive an STK push prompt on this number.</p>
              </FormField>
              <FormField label="Email Address" htmlFor="mpesa-email">
                <input
                  id="mpesa-email" type="email" placeholder="jane@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
                <p className="text-xs text-gray-400 mt-1">Your receipt will be sent here.</p>
              </FormField>
              <button
                onClick={handlePay}
                className="w-full bg-[#3CB72B] hover:bg-[#34a326] text-white font-semibold py-3 rounded-lg transition-colors active:scale-[0.98] mt-2"
              >
                Pay {formatKES(premiumOption.amount)}
              </button>
              <SecurityNote />
            </>
          )}

          {/* SENDING */}
          {state === "sending" && (
            <StatusBlock
              icon={<Loader2 size={40} className="animate-spin text-gold-500" />}
              title="Sending STK Push…"
              body="Connecting to M-Pesa. This takes just a moment."
            />
          )}

          {/* WAITING */}
          {state === "waiting" && (
            <StatusBlock
              icon={
                <div className="relative">
                  <Smartphone size={40} className="text-navy-700" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3CB72B] opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#3CB72B]" />
                  </span>
                </div>
              }
              title="Check Your Phone"
              body="An M-Pesa prompt has been sent to your phone. Enter your PIN to complete the payment."
              extra={
                <p className="text-xs text-gray-400 text-center">
                  Waiting for confirmation…<br />Do not close this window.
                </p>
              }
            />
          )}

          {/* CONFIRMED */}
          {state === "confirmed" && (
            <StatusBlock
              icon={<CheckCircle2 size={40} className="text-green-500" />}
              title="Payment Confirmed!"
              body={`Your ${serviceName} premium has been received. A receipt has been sent to ${email}.`}
              extra={
                receiptNumber ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-green-600 font-medium">M-Pesa Receipt</p>
                    <p className="text-sm font-bold text-green-800 font-mono">{receiptNumber}</p>
                  </div>
                ) : null
              }
            />
          )}

          {/* FAILED */}
          {state === "failed" && (
            <div className="space-y-4">
              <StatusBlock
                icon={<XCircle size={40} className="text-red-500" />}
                title="Payment Not Completed"
                body={errorMsg || "Something went wrong. Please try again."}
              />
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
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

function FormField({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="form-label">{label}</label>
      {children}
    </div>
  );
}

function StatusBlock({ icon, title, body, extra }: {
  icon: React.ReactNode; title: string; body: string; extra?: React.ReactNode;
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
        Secured by Safaricom Daraja. We never store your M-Pesa PIN.
        Your receipt is sent to your email immediately after payment.
      </span>
    </div>
  );
}
