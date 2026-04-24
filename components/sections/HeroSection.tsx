import Link from "next/link";
import { ArrowRight, Phone, Shield, Award, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/data";
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[88vh] flex items-center overflow-hidden bg-navy-900"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pic.webp"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/80 to-navy-950/70" />
      </div>

      {/* Background decorative elements (overlay on top of image) */}
      <div className="absolute inset-0 z-5" aria-hidden="true">
        {/* Geometric shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-navy-800 rounded-full -translate-y-1/3 translate-x-1/3 opacity-30" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-500/10 rounded-full translate-y-1/3 -translate-x-1/3" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gold accent blob */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/15 rounded-full blur-3xl" />
      </div>

      <div className="container-default relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-fade-up">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" aria-hidden="true" />
              IRA Licensed — Trusted Since {SITE_CONFIG.yearFounded}
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5 text-balance animate-fade-up animate-delay-100">
              Protecting What{" "}
              <span className="relative">
                <span className="text-gold-400">Matters</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 5C50 1 150 1 199 5"
                    stroke="#e6c367"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </span>{" "}
              Most
            </h1>

            {/* Subtext */}
            <p className="text-white/80 text-lg leading-relaxed mb-8 animate-fade-up animate-delay-200">
              From motor and health to marine and business — Puritan Insurance Agency
              delivers comprehensive coverage with fast claims, transparent pricing,
              and world-class service.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10 animate-fade-up animate-delay-300">
              <Link href="/quote" className="btn-primary text-base px-7 py-3.5 group">
                Get a Free Quote
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phoneTel}`}
                className="btn-outline-white text-base px-7 py-3.5"
              >
                <Phone size={16} />
                {SITE_CONFIG.phone}
              </a>
            </div>

            {/* Quick trust badges */}
            <div className="flex flex-wrap gap-5 animate-fade-up animate-delay-400">
              {[
                { icon: Shield, label: "IRA Licensed" },
                { icon: Award, label: "98.4% Claims Satisfaction" },
                { icon: Clock, label: "24/7 Support" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/70 text-sm">
                  <Icon size={15} className="text-gold-400" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Empty / decorative space (or you can add a form here) */}
          <div className="relative hidden lg:block">
            <div className="relative hidden lg:block animate-fade-up animate-delay-300">
              {/* Floating cards */}
              <div className="relative w-full max-w-md mx-auto">
                {/* Main card */}
                <div className="bg-navy-900/80 backdrop-blur-sm border border-white/15 rounded-3xl p-8 shadow-navy-lg">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-gold-glow">
                      <svg
                        viewBox="0 0 32 32"
                        fill="none"
                        className="w-10 h-10"
                        aria-hidden="true"
                      >
                        <path
                          d="M16 2L4 8v8c0 7.73 5.12 14.93 12 16.93C22.88 30.93 28 23.73 28 16V8L16 2z"
                          fill="#0a1849"
                        />
                        <path
                          d="M11 16l3 3 7-7"
                          stroke="#0a1849"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-white mb-1">
                      Puritan Insurance Agency
                    </h2>
                    <p className="text-gold-400 text-sm font-medium">
                      Your Trusted Shield
                    </p>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Clients", value: "50K+" },
                      { label: "Claims Paid", value: "KES 2.8B" },
                      { label: "Products", value: "8+" },
                      { label: "Satisfaction", value: "98.4%" },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-white/8 rounded-xl p-4 text-center border border-white/10"
                      >
                        <div className="font-display text-2xl font-bold text-gold-400 leading-none mb-1">
                          {value}
                        </div>
                        <div className="text-white/60 text-xs">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 28C840 36 960 42 1080 40C1200 38 1320 28 1380 23L1440 18V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}