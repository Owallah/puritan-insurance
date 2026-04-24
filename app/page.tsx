import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Zap, HeartHandshake, CheckCircle2, Star, Headphones, Users, ShieldCheck } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SERVICES, TRUST_INDICATORS, values, TESTIMONIALS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Apex Insurance Group — Protecting What Matters Most",
  description:
    "Kenya's most trusted insurance provider. Comprehensive motor, health, life, marine, and business coverage. IRA licensed. Get a free quote today.",
};

const trustIcons = [ShieldCheck, Zap, Users, Headphones];

export default function HomePage() {
  const featuredServices = SERVICES.filter((s) => s.popular);
  const allServices = SERVICES.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <HeroSection />
       

      {/* Services Preview */}
      <section className="section-padding bg-gray-50" aria-labelledby="services-heading">
        <div className="container-default">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-eyebrow mb-3">What We Cover</p>
            <h2 id="services-heading" className="section-title mb-4">
              Comprehensive Insurance Solutions
            </h2>
            <div className="gold-divider mx-auto mb-4" />
            <p className="section-subtitle mx-auto">
              From protecting your vehicle to securing your business, we offer
              tailored insurance products for every stage of life.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/services" className="btn-secondary inline-flex">
              View All Insurance Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white" aria-labelledby="why-heading">
        <div className="container-default">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left: Text */}
            <div>
              <p className="section-eyebrow mb-3">Why Puritan?</p>
              <h2 id="why-heading" className="section-title mb-4">
                Insurance You Can Actually{" "}
                <span className="text-gold-600 italic font-display">Trust</span>
              </h2>
              <div className="gold-divider mb-6" />
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We believe insurance should be simple, transparent, and fast. That's
                why Apex has built its entire operation around the customer experience —
                from instant online quotes to same-day claims responses.
              </p>

              <div className="space-y-4 mb-8">
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
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={18} className="text-navy-700" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-0.5">{title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-primary inline-flex">
                Learn About Us
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.slice(0, 4).map((value, index) => (
                <div
                  key={value.id}
                  className={`card-base p-6 group hover:border-gold-200 transition-colors ${
                    index === 1 || index === 2 ? "mt-6" : ""
                  }`}
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <h3 className="font-semibold text-navy-900 mb-1.5 text-sm">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-navy-950" aria-labelledby="testimonials-heading">
        <div className="container-default">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3 text-gold-400">Client Stories</p>
            <h2 id="testimonials-heading" className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Clients Say
            </h2>
            <div className="gold-divider mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white/8 border border-white/10 rounded-2xl p-7 hover:bg-white/12 transition-colors"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold-400 text-gold-400" aria-hidden="true" />
                  ))}
                </div>

                <blockquote className="text-white/75 text-sm leading-relaxed mb-5 italic">
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center text-gold-400 font-bold text-sm">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-white/50 text-xs">
                      {testimonial.role}
                      {testimonial.company && ` · ${testimonial.company}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTASection />
    </>
  );
}
