"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Briefcase, Car, CheckCircle2, Flame, HeartPulse,
  LucideIcon, Plane, ShieldCheck, Ship, Wheat, Building2,
  Smartphone, Info, ChevronDown, ChevronUp,
} from "lucide-react";
import type { InsuranceService, PremiumOption } from "@/types";
import { cn } from "@/lib/utils";
import { PAYMENT_DETAILS } from "@/lib/data";
import Image from "next/image";

const icons: Record<string, LucideIcon> = {
  Car, HeartPulse, Flame, Briefcase, ShieldCheck, Plane, Wheat, Ship,
};

interface ServiceCardProps {
  service: InsuranceService;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────────────────────────────────────

function MpesaDisabledButton({ amount }: { amount?: number }) {
  return (
    <div className="relative group/mpesa">
      <button
        disabled
        aria-disabled="true"
        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                   bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed select-none"
      >
        <Smartphone size={12} />
        {amount ? `Pay KES ${amount.toLocaleString()}` : "Pay with M-Pesa"}
      </button>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 hidden group-hover/mpesa:block z-20">
        <div className="bg-navy-900 text-white text-xs rounded-lg px-3 py-2 text-center leading-snug shadow-lg">
          M-Pesa payments coming soon
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy-900" />
        </div>
      </div>
    </div>
  );
}

function PaymentInfoPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 rounded-xl border border-gold-200 bg-gold-50 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-xs font-semibold text-gold-700">
          <Info size={13} />
          How to Pay
        </span>
        {open
          ? <ChevronUp size={14} className="text-gold-600" />
          : <ChevronDown size={14} className="text-gold-600" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-gold-200">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mt-3 mb-1.5">
              <Smartphone size={12} className="text-[#3CB72B]" />
              M-Pesa Paybill
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              <span className="text-gray-500">Paybill No.</span>
              <span className="font-bold text-navy-900 font-mono">{PAYMENT_DETAILS.mpesa.paybill}</span>
              <span className="text-gray-500">Account No.</span>
              <span className="font-bold text-navy-900 font-mono">{PAYMENT_DETAILS.mpesa.accountNo}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-gold-200">
            <p className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1.5">
            <Image src="/ncba.png" alt="NCBA" width={32} height={12} className="object-contain" />
              Bank Transfer
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              <span className="text-gray-500">Account Name</span>
              <span className="font-semibold text-navy-900">{PAYMENT_DETAILS.bank.accountName}</span>
              <span className="text-gray-500">Account No.</span>
              <span className="font-bold text-navy-900 font-mono">{PAYMENT_DETAILS.bank.accountNumber}</span>
              <span className="text-gray-500">Branch</span>
              <span className="font-semibold text-navy-900">{PAYMENT_DETAILS.bank.branch}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 pt-1">
            After payment send proof to{" "}
            <a href="mailto:info@puritaninsurance.co.ke" className="text-gold-600 hover:underline">
              info@puritaninsurance.co.ke
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ServiceCard
// ─────────────────────────────────────────────────────────────────────────────

export function ServiceCard({ service, variant = "default", className }: ServiceCardProps) {
  const Icon = icons[service.icon] ?? ShieldCheck;

  if (variant === "compact") {
    return (
      <div className={cn("card-base card-hover p-6 group cursor-default", className)}>
        <div className="flex items-start gap-4">
          <div className="text-3xl flex-shrink-0 leading-none mt-1">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-navy-900 text-base">{service.title}</h3>
              {service.popular && (
                <span className="text-xs bg-gold-100 text-gold-700 font-semibold px-2 py-0.5 rounded-full">Popular</span>
              )}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{service.shortDescription}</p>
            {service.premium && service.premium.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-xs font-semibold text-gray-500">PREMIUM FROM:</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-navy-900">
                    KES {Math.min(...service.premium.map((p) => p.amount)).toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">/{service.premium[0]?.period}</span>
                </div>
                <MpesaDisabledButton amount={service.premium[0]?.amount} />
              </div>
            )}
            <PaymentInfoPanel />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl bg-navy-gradient text-white p-8 shadow-navy-lg group", className)}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-500/10 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden="true" />
        <div className="relative z-10">
          <div className="text-4xl mb-4"><Icon className="h-6 w-6" /></div>
          {service.popular && (
            <span className="text-xs bg-gold-500 text-navy-900 font-bold px-3 py-1 rounded-full mb-3 inline-block">Most Popular</span>
          )}
          <h3 className="font-display text-2xl font-bold text-white mb-3">{service.title}</h3>
          <p className="text-white/75 text-sm leading-relaxed mb-6">{service.shortDescription}</p>
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 size={15} className="text-gold-400 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          {service.premium && service.premium.length > 0 && (
            <div className="mb-6 p-3 bg-white/10 rounded-lg">
              <p className="text-xs text-gold-300 mb-2">PREMIUM OPTIONS</p>
              <div className="space-y-3">
                {service.premium.slice(0, 2).map((premium) => (
                  <div key={premium.id} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{premium.name}</p>
                      <p className="text-xs text-white/60">{premium.description}</p>
                    </div>
                    <MpesaDisabledButton amount={premium.amount} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Payment info — light on dark */}
          <div className="mb-6 rounded-xl border border-white/20 bg-white/10 overflow-hidden">
            <div className="px-4 py-2.5">
              <p className="flex items-center gap-2 text-xs font-semibold text-gold-300">
                <Info size={13} /> How to Pay
              </p>
            </div>
            <div className="px-4 pb-4 border-t border-white/10 space-y-3">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-bold text-white mt-3 mb-1.5">
                  <Smartphone size={12} className="text-[#3CB72B]" /> M-Pesa Paybill
                </p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  <span className="text-white/60">Paybill No.</span>
                  <span className="font-bold text-gold-300 font-mono">{PAYMENT_DETAILS.mpesa.paybill}</span>
                  <span className="text-white/60">Account No.</span>
                  <span className="font-bold text-gold-300 font-mono">{PAYMENT_DETAILS.mpesa.accountNo}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="flex items-center gap-1.5 text-xs font-bold text-white mb-1.5">
                  <Building2 size={12} /> Bank — NCBA Upper Hill
                </p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  <span className="text-white/60">Account No.</span>
                  <span className="font-bold text-gold-300 font-mono">{PAYMENT_DETAILS.bank.accountNumber}</span>
                  <span className="text-white/60">Name</span>
                  <span className="text-white/80">{PAYMENT_DETAILS.bank.accountName}</span>
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 font-semibold px-5 py-2.5 rounded-lg hover:bg-gold-400 transition-all text-sm group/btn"
          >
            Get a Quote
            <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  // Default
  return (
    <div className={cn("card-base card-hover p-7 group flex flex-col", className)}>
      <div className="flex items-start justify-between mb-5">
        <div className="w-14 h-14 bg-navy-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-gold-50 transition-colors duration-300">
          <Icon className="h-6 w-6" />
        </div>
        {service.popular && (
          <span className="text-xs bg-gold-100 text-gold-700 font-semibold px-2.5 py-1 rounded-full">Popular</span>
        )}
      </div>
      <h3 className="font-display text-xl font-bold text-navy-900 mb-2">{service.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{service.shortDescription}</p>
      <ul className="space-y-2 mb-6">
        {service.features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 size={14} className="text-gold-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      {service.premium && service.premium.length > 0 && (
        <div className="mb-2 border-t border-gray-100 pt-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">POPULAR PREMIUMS</p>
          <div className="space-y-2">
            {service.premium.slice(0, 2).map((premium) => (
              <div key={premium.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{premium.name}</p>
                  <p className="text-xs text-gray-500">per {premium.period}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-navy-900 mb-1">KES {premium.amount.toLocaleString()}</p>
                  <MpesaDisabledButton />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <PaymentInfoPanel />
      <div className="h-0.5 w-0 bg-gold-gradient rounded-full mt-5 mb-4 group-hover:w-full transition-all duration-500" aria-hidden="true" />
      <div className="flex items-center justify-between">
        <Link
          href="/quote"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors group/link"
        >
          Request Quote
          <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
