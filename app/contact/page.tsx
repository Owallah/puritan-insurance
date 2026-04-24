import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { SITE_CONFIG } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Apex Insurance Group. Call, WhatsApp, email, or visit our Nairobi office. We respond within 2 hours.",
};

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    "Hello! I need assistance from Apex Insurance Group."
  );

  return (
    <>
      {/* Page Hero */}
      <section className="bg-navy-900 pt-16 pb-24 relative overflow-hidden" aria-label="Contact page hero">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/6 rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="container-default relative z-10 text-center">
          <p className="section-eyebrow text-gold-400 mb-3">We're Here to Help</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Contact {SITE_CONFIG.name}
          </h1>
          <div className="gold-divider mx-auto mb-5" />
          <p className="text-white/65 text-lg max-w-xl mx-auto">
            Have a question, need to file a claim, or want to know more about our
            products? Our team is ready to assist you.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full">
            <path d="M0 40L1440 40L1440 20C1200 35 960 40 720 38C480 36 240 25 0 20V40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white" aria-label="Contact information and form">
        <div className="container-default">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Left: Contact info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-navy-900 mb-5">
                  Get in Touch
                </h2>

                {/* Contact cards */}
                <div className="space-y-4">
                  {/* Phone */}
                  <a
                    href={`tel:${SITE_CONFIG.phoneTel}`}
                    className="card-base p-5 items-start gap-4 hover:border-navy-200 transition-colors group block"
                    aria-label={`Call us at ${SITE_CONFIG.phone}`}
                  >
                    <div className="w-11 h-11 bg-navy-900 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 transition-colors">
                      <Phone size={18} className="text-gold-400 group-hover:text-navy-900 transition-colors" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                        Call Us
                      </p>
                      <p className="font-semibold text-navy-900">{SITE_CONFIG.phone}</p>
                      <p className="text-gray-500 text-xs mt-0.5">Mon–Sat, 8am–7pm</p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-base p-5 items-start gap-4 hover:border-green-200 transition-colors group block"
                    aria-label="Chat with us on WhatsApp"
                  >
                    <div className="w-11 h-11 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={18} className="text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                        WhatsApp
                      </p>
                      <p className="font-semibold text-navy-900">Chat with an Advisor</p>
                      <p className="text-gray-500 text-xs mt-0.5">Typically replies in minutes</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="card-base p-5 items-start gap-4 hover:border-navy-200 transition-colors group block"
                    aria-label={`Email us at ${SITE_CONFIG.email}`}
                  >
                    <div className="w-11 h-11 bg-navy-900 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 transition-colors">
                      <Mail size={18} className="text-gold-400 group-hover:text-navy-900 transition-colors" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                        Email
                      </p>
                      <p className="font-semibold text-navy-900 break-all text-sm">
                        {SITE_CONFIG.email}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">Response within 4 hours</p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="card-base p-5 flex items-start gap-4">
                    <div className="w-11 h-11 bg-navy-900 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-gold-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                        Office
                      </p>
                      <p className="font-semibold text-navy-900 text-sm leading-relaxed">
                        {SITE_CONFIG.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="card-base p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={16} className="text-gold-500" aria-hidden="true" />
                  <h3 className="font-semibold text-navy-900 text-sm">Office Hours</h3>
                </div>
                <dl className="space-y-2 text-sm">
                  {[
                    { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
                    { day: "Saturday", hours: "9:00 AM – 2:00 PM" },
                    { day: "Sunday & Holidays", hours: "Closed" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between gap-4">
                      <dt className="text-gray-600">{day}</dt>
                      <dd className="font-medium text-navy-900 text-right">{hours}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
                  Emergency claims support available 24/7 via phone.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2">
              <div className="card-base p-8 md:p-10">
                <div className="mb-7">
                  <h2 className="font-display text-2xl font-bold text-navy-900 mb-1">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-500 text-sm">
                    We'll get back to you within 2–4 business hours.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="bg-gray-50 pb-16" aria-label="Office location map">
        <div className="container-default">
          <div className="rounded-2xl overflow-hidden shadow-navy-md border border-gray-200" style={{ height: "420px" }}>
            <iframe
              src={SITE_CONFIG.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Apex Insurance Group office location"
              aria-label="Google Maps showing our office location in Westlands, Nairobi"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-navy-700 hover:text-gold-600 font-medium transition-colors"
            >
              <MapPin size={14} />
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
