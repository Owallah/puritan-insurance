"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { PaystackPaymentDialog } from "@/components/payment";
import { cn } from "@/lib/utils";
import type { PremiumOption } from "@/types";

interface PaymentButtonProps {
  serviceName: string;
  premiumOption: PremiumOption;
  className?: string;
  variant?: "default" | "outline" | "gold";
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function PaymentButton({
  serviceName,
  premiumOption,
  className,
  variant = "default",
  size = "md",
  label,
}: PaymentButtonProps) {
  const [open, setOpen] = useState(false);

  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all active:scale-[0.98] cursor-pointer";

  const variants = {
    default: "bg-navy-900 hover:bg-navy-800 text-white",
    outline: "border border-navy-900 text-navy-900 hover:bg-navy-50",
    gold:    "bg-gold-500 hover:bg-gold-400 text-navy-900",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-6 py-3",
  };

  const buttonLabel =
    label ?? `Pay KES ${premiumOption.amount.toLocaleString()}`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(base, variants[variant], sizes[size], className)}
      >
        <CreditCard size={size === "sm" ? 12 : size === "lg" ? 18 : 15} />
        {buttonLabel}
      </button>

      <PaystackPaymentDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        serviceName={serviceName}
        premiumOption={{
          name:   premiumOption.name,
          amount: premiumOption.amount,
          period: premiumOption.period,
        }}
        onPaymentConfirmed={(ref) => {
          console.log("Payment confirmed:", ref);
          setOpen(false);
        }}
      />
    </>
  );
}
