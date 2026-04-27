import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Shield, Zap } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceCard } from "@/components/ui/ServiceCard";

import type { ServiceCategory } from "@/types";
import { getProductsByCategory } from "@/lib/services";
import { group } from "console";

export const metadata: Metadata = {
  title: "Our Insurance Services",
  description:
    "Explore Puritan Insurance Agency's full range of products — motor, health, life, marine, fire & property, business, travel, and agriculture insurance.",
};

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  liability: "Liability Covers",
  property: "Property Insurance",
  people: "People Insurance",
  personal: "Personal Lines",
};

const CATEGORY_DESCRIPTIONS: Record<ServiceCategory, string> = {
  personal: "Protect yourself and your family",
  liability: "This covers liabilities arising from accidental injury to the general public from the use of property or premises. It includes statutory covers such as WIBA.",
  property: "This cover damage to property and goods thereon against accidental damage by fire and related perils. The cover includes consequential loss following the property damage.",
  people: "Protect your greatest asset — your employees and their well-being",
};

const CATEGORIES: ServiceCategory[] = ["personal",  "liability", "property", "liability"];

export default function ServicesPage() {
  const servicesByCategory = CATEGORIES.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    description: CATEGORY_DESCRIPTIONS[cat],
    services: getProductsByCategory(cat),
  })).filter((group) => group.services.length > 0)

  return (
    <>
      {/* Page Hero */}
      <section className="bg-navy-900 pt-16 pb-24 relative overflow-hidden" aria-label="Services page hero">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="container-default relative z-10 text-center">
          <p className="section-eyebrow text-gold-400 mb-3">What We Offer</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
            Insurance for Every Need
          </h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Nine comprehensive insurance products, designed around the real needs of
            Kenyans — from first-time vehicle owners to large enterprises.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                {CATEGORY_LABELS[cat]}
              </a>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full">
            <path d="M0 40L1440 40L1440 20C1200 35 960 40 720 38C480 36 240 25 0 20V40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Services by Category */}
      <div className="bg-white">
        {servicesByCategory.map((group, groupIndex) => (
          <section
            key={group.category}
            id={group.category}
            className={`section-padding ${groupIndex % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
            aria-labelledby={`${group.category}-heading`}
          >
            <div className="container-default">
              {/* Category header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <p className="section-eyebrow mb-2">{group.description}</p>
                  <h2
                    id={`${group.category}-heading`}
                    className="section-title"
                  >
                    {group.label}
                  </h2>
                </div>
                <Link
                  href="/quote"
                  className="text-sm font-semibold text-navy-700 hover:text-gold-600 flex items-center gap-1.5 group whitespace-nowrap"
                >
                  Get a Quote
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="gold-divider mb-8" />

              {/* Services grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Why Our Products Section */}
      <section className="section-padding bg-navy-900" aria-labelledby="products-why-heading">
        <div className="container-default">
          <div className="text-center mb-12">
            <p className="section-eyebrow text-gold-400 mb-3">Our Difference</p>
            <h2 id="products-why-heading" className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Puritan Products?
            </h2>
            <div className="gold-divider mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
                  {
                    icon: Shield,
                    title: "Industry Specialization",
                    desc: "Deep focus on the key industries of Construction, general trading, energy, manufacturing.",
                  },
                  {
                    icon: Zap,
                    title: "Proactive Risk Management",
                    desc: "We undertake risk audit and advise on safety compliance to ensure business continuity. ",
                  },
                  {
                    icon: HeartHandshake,
                    title: "Claims Advocacy That Delivers ",
                    desc: "structured claims escalation process that ensures speedy settlement.",
                  },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/8 border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-colors text-center group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto flex-shrink-0 mt-0.5" aria-hidden="true">
                <Icon size={32} className="text-navy-50" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        variant="gold"
        title="Not Sure Which Policy is Right for You?"
        subtitle="Our insurance advisors are here to help you find the perfect coverage for your situation. Get a free consultation today."
        primaryCta={{ label: "Request a Free Consultation", href: "/quote" }}
      />
    </>
  );
}
