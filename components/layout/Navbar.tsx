"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy-950 text-white/70 text-xs py-2 hidden md:block">
        <div className="container-default flex justify-between items-center">
          <span>
            IRA Licensed Insurer — Reg. No.{" "}
            <strong className="text-gold-400">
              {SITE_CONFIG.registrationNo}
            </strong>
          </span>
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="flex items-center gap-1.5 text-white/80 hover:text-gold-400 transition-colors"
          >
            <Phone size={12} />
            <span>{SITE_CONFIG.phone}</span>
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-navy-200/80 backdrop-blur shadow-navy-lg"
            : "bg-navy-100/90"
        )}
      >
        <nav
          className="container-default flex items-center justify-between h-16 md:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label={`${SITE_CONFIG.name} — Home`}
          >
            {/* Logo Mark - INCREASED SIZE */}
            {/* <div className="relative w-16 h-16 flex-shrink-0"> */}
              {/* <div className="w-16 h-16 bg-gold-800 rounded-lg flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform duration-200"> */}
                <Image
                  src="/logo.webp"
                  alt={SITE_CONFIG.name}
                  width={140}
                  height={140}
                  className="size-40 object-contain"
                />
              {/* </div> */}
            {/* </div> */}
            {/* <div className="hidden sm:block">
              <div className="font-display text-xl font-bold text-white leading-none">
                Puritan
              </div>
              <div className="text-gold-400 text-xs font-medium tracking-widest uppercase leading-none mt-0.5">
                Insurance Agency
              </div>
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(link.href)
                    ? "bg-white/10 text-gold-900"
                    : "text-navy-800 hover:text-gold-400 hover:bg-white/8"
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="flex items-center gap-2 text-gold-900/70 hover:text-gold-400 text-sm transition-colors"
              aria-label="Call us"
            >
              <Phone size={16} />
            </a>
            <Link href="/quote" className="btn-primary text-sm px-5 py-2.5">
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gold-900 hover:bg-white/10 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
          aria-hidden={!isOpen}
        >
          <div className="container-default pb-4 space-y-1 border-t border-white/10 pt-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive(link.href)
                    ? "bg-white/10 text-gold-900"
                    : "text-navy-800 hover:text-gold-400 hover:bg-white/8"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 flex flex-col gap-2">
              <a
                href={`tel:${SITE_CONFIG.phoneTel}`}
                className="flex items-center gap-2 px-4 py-3 text-sm text-white/70 hover:text-gold-400"
              >
                <Phone size={16} />
                {SITE_CONFIG.phone}
              </a>
              <Link
                href="/quote"
                className="btn-primary text-sm mx-0 justify-center"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
