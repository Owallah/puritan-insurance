// components/ui/ServiceCard.tsx (Updated version)
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Car, CheckCircle2, Flame, HeartPulse, Home, LucideIcon, Plane, ShieldCheck, Ship, Wheat, CreditCard } from "lucide-react";
import type { InsuranceService, PremiumOption } from "@/types";
import { cn } from "@/lib/utils";
import { PaystackPaymentDialog } from "@/components/payment";
import { Button } from "@/components/ui/button";

const icons: Record<string, LucideIcon> = {
  Car, HeartPulse, Flame, Briefcase, ShieldCheck, Plane, Wheat, Ship,
};

interface ServiceCardProps {
  service: InsuranceService;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function ServiceCard({
  service,
  variant = "default",
  className,
}: ServiceCardProps) {
  const Icon = icons[service.icon] ?? ShieldCheck;
  const [selectedPremium, setSelectedPremium] = useState<PremiumOption | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handlePayClick = (premium: PremiumOption) => {
    setSelectedPremium(premium);
    setShowPaymentDialog(true);
  };

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
                <span className="text-xs bg-gold-100 text-gold-700 font-semibold px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {service.shortDescription}
            </p>

            {/* Premium Options for Compact */}
            {service.premium && service.premium.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-xs font-semibold text-gray-500">PREMIUM FROM:</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-navy-900">
                    KES {Math.min(...service.premium.map(p => p.amount)).toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">
                    /{service.premium[0]?.period}
                  </span>
                </div>
                <Button
                  size="sm"
                  onClick={() => handlePayClick(service.premium![0])}
                  className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900"
                >
                  <CreditCard className="h-3 w-3 mr-1" />
                  Pay Premium
                </Button>
              </div>
            )}
          </div>
        </div>

        {selectedPremium && (
          <PaystackPaymentDialog
            isOpen={showPaymentDialog}
            onClose={() => setShowPaymentDialog(false)}
            serviceName={service.title}
            premiumOption={{
              name: selectedPremium.name,
              amount: selectedPremium.amount,
              period: selectedPremium.period,
            }}

          />
        )}
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
            <span className="text-xs bg-gold-500 text-navy-900 font-bold px-3 py-1 rounded-full mb-3 inline-block">
              Most Popular
            </span>
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

          {/* Premium Options for Featured */}
          {service.premium && service.premium.length > 0 && (
            <div className="mb-6 p-3 bg-white/10 rounded-lg">
              <p className="text-xs text-gold-300 mb-2">PREMIUM OPTIONS</p>
              <div className="space-y-2">
                {service.premium.slice(0, 2).map((premium) => (
                  <div key={premium.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{premium.name}</p>
                      <p className="text-xs text-white/60">{premium.description}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handlePayClick(premium)}
                      className="bg-gold-500 hover:bg-gold-400 text-navy-900"
                    >
                      Pay KES {premium.amount.toLocaleString()}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 font-semibold px-5 py-2.5 rounded-lg hover:bg-gold-400 transition-all text-sm group/btn"
          >
            Get a Quote
            <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

        {selectedPremium && (
          <PaystackPaymentDialog
            isOpen={showPaymentDialog}
            onClose={() => setShowPaymentDialog(false)}
            serviceName={service.title}
            premiumOption={{
              name: selectedPremium.name,
              amount: selectedPremium.amount,
              period: selectedPremium.period,
            }}
          />
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("card-base card-hover p-7 group flex flex-col", className)}>
      <div className="flex items-start justify-between mb-5">
        <div className="w-14 h-14 bg-navy-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-gold-50 transition-colors duration-300">
          <Icon className="h-6 w-6" />
        </div>
        {service.popular && (
          <span className="text-xs bg-gold-100 text-gold-700 font-semibold px-2.5 py-1 rounded-full">
            Popular
          </span>
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

      {/* Premium Options for Default */}
      {service.premium && service.premium.length > 0 && (
        <div className="mb-4 border-t border-gray-100 pt-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">POPULAR PREMIUMS</p>
          <div className="space-y-2">
            {service.premium.slice(0, 2).map((premium) => (
              <div key={premium.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{premium.name}</p>
                  <p className="text-xs text-gray-500">per {premium.period}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-navy-900">KES {premium.amount.toLocaleString()}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePayClick(premium)}
                    className="mt-1 text-xs border-gold-500 text-gold-600 hover:bg-gold-50"
                  >
                    Pay
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="h-0.5 w-0 bg-gold-gradient rounded-full mb-5 group-hover:w-full transition-all duration-500" aria-hidden="true" />

      <div className="flex items-center justify-between">
        <Link
          href="/quote"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors group/link"
        >
          Request Quote
          <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>

      {selectedPremium && (
        <PaystackPaymentDialog
          isOpen={showPaymentDialog}
          onClose={() => setShowPaymentDialog(false)}
          serviceName={service.title}
          premiumOption={{
            name: selectedPremium.name,
            amount: selectedPremium.amount,
            period: selectedPremium.period,
          }}
        />
      )}
    </div>
  );
}