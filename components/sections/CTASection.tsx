import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "navy" | "gold" | "light";
}

export function CTASection({
  title = "Ready to Get Protected?",
  subtitle = "Join 50,000+ Kenyans and businesses who trust Puritan Insurance Agency Ltd. Get a personalized quote in minutes — no obligation, no hassle.",
  primaryCta = { label: "Get a Free Quote", href: "/quote" },
  secondaryCta,
  variant = "navy",
}: CTASectionProps) {
  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    "Hello! I'd like to get an insurance quote from Puritan Insurance Agency Ltd."
  );

  if (variant === "light") {
    return (
      <section className="section-padding bg-gray-50" aria-label="Call to action">
        <div className="container-default">
          <div className="bg-white rounded-3xl p-10 md:p-14 shadow-navy-md border border-gray-100 text-center max-w-3xl mx-auto">
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="section-title mb-4">{title}</h2>
            <p className="section-subtitle mx-auto mb-8 text-center">{subtitle}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={primaryCta.href} className="btn-primary">
                {primaryCta.label}
                <ArrowRight size={16} />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "gold") {
    return (
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #e6c367 0%, #d4a832 100%)" }}
        aria-label="Call to action"
      >
        {/* Decorative background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-navy-900/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="container-default relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-4 text-balance">
            {title}
          </h2>
          <p className="text-navy-800/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-navy-800 active:scale-95 transition-all"
            >
              {primaryCta.label}
              <ArrowRight size={16} />
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="inline-flex items-center gap-2 bg-white/30 text-navy-900 font-semibold px-7 py-3.5 rounded-lg border-2 border-navy-900/20 hover:bg-white/50 active:scale-95 transition-all"
            >
              <Phone size={16} />
              {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Navy (default)
  return (
    <section
      className="section-padding relative overflow-hidden bg-navy-900"
      aria-label="Call to action"
    >
      {/* Background decorations */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-default relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" aria-hidden="true" />
            Start Today — It's Free
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
            {title}
          </h2>
          <p className="text-white/65 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={primaryCta.href} className="btn-primary text-base px-7 py-3.5 group">
              {primaryCta.label}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {secondaryCta ? (
              <Link href={secondaryCta.href} className="btn-outline-white text-base px-7 py-3.5">
                {secondaryCta.label}
              </Link>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white text-base px-7 py-3.5"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            )}
          </div>

          {/* Subtle trust note */}
          <p className="text-white/35 text-sm mt-8">
            No credit card required · No commitment · Response within 2 hours
          </p>
        </div>
      </div>
    </section>
  );
}
