import type { Metadata } from "next";
import { CheckCircle2, Clock, Phone, MessageCircle } from "lucide-react";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { SITE_CONFIG } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";
import { ALL_PRODUCTS } from "@/lib/services";
import { title } from "process";
import { PRODUCT_CLASSES } from "@/lib/service-categories";

export const metadata: Metadata = {
  title: "Get a Free Insurance Quote",
  description:
    "Request a personalized insurance quote from Puritan Insurance Agency Ltd. Motor, health, life, marine and more. We respond within 2 hours.",
};

const ALL_PRODUCT_TITLES = ALL_PRODUCTS.map(p => p.title);
export default function QuotePage() {
  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    "Hello! I need an insurance quote from Puritan Insurance Agency Ltd."
  );

  console.log(PRODUCT_CLASSES);
  

  return (
    <>
      {/* Page Hero */}
      <section className="bg-navy-900 pt-16 pb-24 relative overflow-hidden" aria-label="Quote page hero">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/6 rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="container-default relative z-10 text-center">
          <p className="section-eyebrow text-gold-400 mb-3">Free, No-Obligation</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Get Your Insurance Quote
          </h1>
          <div className="gold-divider mx-auto mb-5" />
          <p className="text-white/65 text-lg max-w-xl mx-auto">
            Fill in the form below and our advisors will prepare a tailored quote for
            you — usually within 24 business hours.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full">
            <path d="M0 40L1440 40L1440 20C1200 35 960 40 720 38C480 36 240 25 0 20V40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white" aria-label="Quote request form">
        <div className="container-default">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Left: Sidebar info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Process steps */}
              <div>
                <h2 className="font-display text-xl font-bold text-navy-900 mb-5">
                  How It Works
                </h2>
                <ol className="space-y-4" aria-label="Quote process steps">
                  {[
                    {
                      step: "1",
                      title: "Submit Your Request",
                      desc: "Fill in your details and the type of cover you need.",
                    },
                    {
                      step: "2",
                      title: "We Prepare Your Quote",
                      desc: "Our advisors review your requirements and craft a tailored quote.",
                    },
                    {
                      step: "3",
                      title: "Review & Accept",
                      desc: "We'll reach out within 24 hours with your personalized quote.",
                    },
                    {
                      step: "4",
                      title: "Get Covered",
                      desc: "Pay via M-Pesa or bank transfer and your policy is issued instantly.",
                    },
                  ].map(({ step, title, desc }) => (
                    <li key={step} className="flex gap-4">
                      <div className="w-8 h-8 bg-gold-gradient rounded-full flex items-center justify-center text-navy-900 font-bold text-sm flex-shrink-0 mt-0.5 shadow-gold-glow">
                        {step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900 text-sm mb-0.5">
                          {title}
                        </h3>
                        <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <hr className="border-gray-100" />

              {/* Response time */}
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                <Clock size={18} className="text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-green-800 text-sm">
                    Fast Response Guaranteed
                  </p>
                  <p className="text-green-700 text-xs leading-relaxed mt-0.5">
                    All quote requests are responded to within <strong>24 business hours</strong> during
                    Mon–Fri 8am–6pm.
                  </p>
                </div>
              </div>

              {/* Alternative contact */}
              <div className="card-base p-5 space-y-3">
                <p className="font-semibold text-navy-900 text-sm">
                  Prefer to talk directly?
                </p>
                <a
                  href={`tel:${SITE_CONFIG.phoneTel}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-9 h-9 bg-navy-100 rounded-lg flex items-center justify-center group-hover:bg-navy-200 transition-colors">
                    <Phone size={16} className="text-navy-700" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Call Us</p>
                    <p className="font-semibold text-navy-900 text-sm">
                      {SITE_CONFIG.phone}
                    </p>
                  </div>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <MessageCircle size={16} className="text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">WhatsApp</p>
                    <p className="font-semibold text-navy-900 text-sm">
                      Chat with an Advisor
                    </p>
                  </div>
                </a>
              </div>

              {/* Trust badges */}
              <div className="space-y-2">
                {[
                  "No obligation — free quote",
                  "Your data is 100% secure",
                  "IRA licensed provider",
                  "No hidden charges",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2
                      size={14}
                      className="text-gold-500 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2">
              <div className="card-base p-8 md:p-10">
                <div className="mb-7">
                  <h2 className="font-display text-2xl font-bold text-navy-900 mb-1">
                    Request a Quote
                  </h2>
                  <p className="text-gray-500 text-sm">
                    All fields marked with{" "}
                    <span className="text-red-500" aria-label="asterisk — required">*</span>{" "}
                    are required.
                  </p>
                </div>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services quick reference */}
      <section className="py-14 bg-gray-50 border-t border-gray-100" aria-labelledby="services-ref-heading">
        <div className="container-default">
          <h2 id="services-ref-heading" className="font-semibold text-navy-900 text-center mb-8">
            We Cover All Major Insurance Types
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {ALL_PRODUCT_TITLES.map((service) => (
              <div
                key={service}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 shadow-sm"
              >
                {/* <span aria-hidden="true">{service.icon}</span> */}
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
