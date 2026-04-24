import type { Metadata } from "next";
import {
  Shield,
  Target,
  Eye,
  Award,
  Heart,
  ShieldCheck,
  Lock,
  Lightbulb,
  Clock,
} from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { TEAM_MEMBERS, SITE_CONFIG, values } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Puritan Insurance Agency Ltd — our history, mission, vision, core values, and the dedicated team serving Kenya since 2026.",
};

const valueIcons = [ShieldCheck, Lock, Award, Lightbulb, Clock];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section
        className="bg-navy-900 pt-16 pb-24 relative overflow-hidden"
        aria-label="About page hero"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/6 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="container-default relative z-10 text-center">
          <p className="section-eyebrow text-gold-400 mb-3">Who We Are</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
            About {SITE_CONFIG.name}
          </h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Since {SITE_CONFIG.yearFounded}, we've been Kenya's trusted partner
            in protection, providing peace of mind to individuals, families, and
            businesses across the country.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full">
            <path
              d="M0 40L1440 40L1440 20C1200 35 960 40 720 38C480 36 240 25 0 20V40Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Company Overview */}
      <section
        className="section-padding bg-white"
        aria-labelledby="overview-heading"
      >
        <div className="container-default">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="section-eyebrow mb-3">Our Story</p>
              <h2 id="overview-heading" className="section-title mb-4">
                Built on Trust, Driven by Service
              </h2>
              <div className="gold-divider mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {SITE_CONFIG.name} was founded in {SITE_CONFIG.yearFounded} by
                  a team of insurance professionals who believed the industry
                  could do better. At Puritan Insurance Agency Ltd, we have an
                  in-depth understanding of general, life, medical and liability
                  covers from experience gained over the years.
                </p>
                <p>
                  With this knowledge, we are able to adequately advise our
                  customers on the insurance solutions available in the market.
                  With this information, the customers is therefore able to make
                  the right decision based on their individual needs and
                  circumstances. We cater for corporate, institutional and
                  individual customers linking them to top notch insurance
                  companies.
                </p>
                <p>
                  What sets us apart is not just our products — Insurance is
                  full of jargon and technical terms in fine prints. At Puritan,
                  we break it down in simple language making it easy for you to
                  understand the insurance contract.
                </p>
              </div>
            </div>

            <div className="relative hidden lg:block animate-fade-up animate-delay-300">
              {/* Floating cards */}
              <div className="relative w-full max-w-md mx-auto">
                {/* Main card */}
                <div className="bg-navy-900 backdrop-blur-sm border border-white/15 rounded-3xl p-8 shadow-navy-lg">
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
      </section>

      {/* Mission & Vision */}
      <section
        className="section-padding bg-gray-50"
        aria-labelledby="mission-heading"
      >
        <div className="container-default">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">Our Purpose</p>
            <h2 id="mission-heading" className="section-title mb-4">
              Mission & Vision
            </h2>
            <div className="gold-divider mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-base p-8 relative overflow-hidden group hover:border-navy-200 transition-colors">
              <div
                className="absolute top-0 right-0 w-24 h-24 bg-navy-50 rounded-full -translate-y-1/2 translate-x-1/2"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center mb-5">
                  <Target
                    size={22}
                    className="text-gold-400"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-navy-900 mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide tailored insurance solutions that protect
                  enterprise value, strengthen resilience, and support
                  sustainable growth for our corporate clients.
                </p>
              </div>
            </div>

            <div className="card-base p-8 relative overflow-hidden group hover:border-gold-200 transition-colors">
              <div
                className="absolute top-0 right-0 w-24 h-24 bg-gold-50 rounded-full -translate-y-1/2 translate-x-1/2"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gold-gradient rounded-xl flex items-center justify-center mb-5">
                  <Eye size={22} className="text-navy-900" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold text-navy-900 mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To lead the transformation of corporate insurance in Kenya
                  through innovation, analytics, and client-centric strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section
        className="section-padding bg-white"
        aria-labelledby="values-heading"
      >
        <div className="container-default">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-eyebrow mb-3">What We Stand For</p>
            <h2 id="values-heading" className="section-title mb-4">
              Our Core Values
            </h2>
            <div className="gold-divider mx-auto mb-4" />
            <p className="section-subtitle mx-auto">
              These six principles guide every decision we make — from product
              design to claims handling to how we talk with clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = valueIcons[index] ?? Heart;
              return (
                <div key={value.id} className="card-base card-hover p-7 group">
                  <div
                    className="text-3xl mb-4 grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-gold-50"
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="gold-divider mb-4 w-10 h-0.5 group-hover:w-16 transition-all duration-500" />
                  <h3 className="font-semibold text-navy-900 text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        className="section-padding bg-navy-950"
        aria-labelledby="team-heading"
      >
        <div className="container-default">
          <div className="text-center mb-12">
            <p className="section-eyebrow text-gold-400 mb-3">The People</p>
            <h2
              id="team-heading"
              className="font-display text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Leadership Team
            </h2>
            <div className="gold-divider mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white/8 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/12 hover:border-gold-500/30 transition-all duration-300 group"
              >
                {/* Avatar */}
                <div className="w-16 h-16 bg-gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 text-navy-900 font-display text-2xl font-bold shadow-gold-glow group-hover:scale-105 transition-transform">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-gold-400 text-xs font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-white/55 text-xs leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IRA License Banner */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container-default">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-navy-50 border border-navy-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-navy-900 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield
                  size={26}
                  className="text-gold-400"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-0.5">
                  IRA Licensed Insurance Provider
                </h3>
                <p className="text-gray-600 text-sm">
                  Registration No: <strong>{SITE_CONFIG.registrationNo}</strong>
                  {" · "}Licensed by the Insurance Regulatory Authority of Kenya
                </p>
              </div>
            </div>
            {/* <a
              href="https://www.ira.go.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm flex-shrink-0"
            >
              Verify License →
            </a> */}
          </div>
        </div>
      </section>

      <CTASection
        variant="navy"
        title="Partner with a Team That Has Your Back"
      />
    </>
  );
}
