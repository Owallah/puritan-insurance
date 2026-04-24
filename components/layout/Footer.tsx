import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { SITE_CONFIG, SERVICES, NAV_LINKS } from "@/lib/data";
import Image from "next/image";

export function Footer() {
  const serviceLinks = SERVICES.slice(0, 6);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white" role="contentinfo">
      {/* Main footer content */}
      <div className="container-default py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-10 h-10 bg-gold-800 rounded-lg flex items-center justify-center shadow-gold-glow flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt={SITE_CONFIG.name}
                  width={140}
                  height={140}
                  className="size-32 object-contain"
                />
              </div>
              <div>
                <div className="font-display text-xl font-bold text-white leading-none">
                  Puritan
                </div>
                <div className="text-gold-400 text-xs font-medium tracking-widest uppercase mt-0.5">
                  Insurance Agency
                </div>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Kenya's most trusted insurance provider since{" "}
              {SITE_CONFIG.yearFounded}. IRA licensed. Protecting families,
              businesses, and futures.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                {
                  href: SITE_CONFIG.socialLinks.facebook,
                  Icon: Facebook,
                  label: "Facebook",
                },
                {
                  href: SITE_CONFIG.socialLinks.twitter,
                  Icon: Twitter,
                  label: "Twitter",
                },
                {
                  href: SITE_CONFIG.socialLinks.linkedin,
                  Icon: Linkedin,
                  label: "LinkedIn",
                },
                {
                  href: SITE_CONFIG.socialLinks.instagram,
                  Icon: Instagram,
                  label: "Instagram",
                },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-all duration-200 text-white/60"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span
                      className="w-1 h-1 bg-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-white/60 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span
                      className="w-1 h-1 bg-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phoneTel}`}
                  className="flex items-start gap-3 text-white/60 hover:text-gold-400 transition-colors group"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-gold-500/20">
                    <Phone size={14} className="text-gold-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wide mb-0.5">
                      Phone / WhatsApp
                    </div>
                    <div className="text-sm">{SITE_CONFIG.phone}</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-3 text-white/60 hover:text-gold-400 transition-colors group"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-gold-500/20">
                    <Mail size={14} className="text-gold-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wide mb-0.5">
                      Email
                    </div>
                    <div className="text-sm break-all">{SITE_CONFIG.email}</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} className="text-gold-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wide mb-0.5">
                      Address
                    </div>
                    <div className="text-sm leading-relaxed">
                      {SITE_CONFIG.address}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-default py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved. Regulated
            by the Insurance Regulatory Authority of Kenya.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Claims"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-white/40 hover:text-gold-400 text-xs transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
