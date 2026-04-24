import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <section
      className="min-h-[80vh] flex items-center justify-center bg-white"
      aria-label="Page not found"
    >
      <div className="container-default text-center py-20">
        {/* Visual */}
        <div className="relative inline-flex items-center justify-center mb-10">
          <div className="w-32 h-32 bg-navy-50 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center">
              <Search size={32} className="text-navy-400" aria-hidden="true" />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center text-navy-900 font-display font-bold text-sm shadow-gold-glow">
            ?
          </div>
        </div>

        {/* Error code */}
        <div className="font-display text-8xl md:text-9xl font-bold text-navy-100 mb-4 leading-none select-none" aria-hidden="true">
          404
        </div>

        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link href="/" className="btn-primary">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider font-medium">
            Quick Links
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-navy-700 hover:text-gold-600 font-medium underline underline-offset-4 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
