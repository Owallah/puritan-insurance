import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { QuoteFormData, ContactFormData, QuoteSubmissionResult, ContactSubmissionResult } from "@/types";

// ─────────────────────────────────────────────
// Class Name Utility
// ─────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─────────────────────────────────────────────
// Form Submission Handlers
// These are structured for future Supabase integration.
// Replace the simulated logic with actual Supabase calls.
// ─────────────────────────────────────────────

export async function submitQuoteRequest(
  data: QuoteFormData
): Promise<QuoteSubmissionResult> {
  // FUTURE: Replace with Supabase insert
  // const { data: result, error } = await supabase
  //   .from('quote_requests')
  //   .insert([{
  //     full_name: data.fullName,
  //     phone: data.phone,
  //     email: data.email,
  //     insurance_type: data.insuranceType,
  //     message: data.message,
  //     status: 'pending',
  //     created_at: new Date().toISOString(),
  //   }]);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate success (replace with real Supabase response handling)
  const referenceId = `APX-${Date.now().toString(36).toUpperCase()}`;
  return {
    success: true,
    message: `Your quote request has been received. Reference: ${referenceId}`,
    referenceId,
  };
}

// ─────────────────────────────────────────────
// Format Utilities
// ─────────────────────────────────────────────

export function formatCurrency(amount: number, currency = "KES"): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatPhoneNumber(phone: string): string {
  // Normalize Kenyan phone numbers to +254 format
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0") && cleaned.length === 10) {
    return `+254${cleaned.slice(1)}`;
  }
  if (cleaned.startsWith("254") && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  return phone;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const encoded = encodeURIComponent(message);
  const cleaned = phone.replace(/\D/g, "");
  return `https://wa.me/${cleaned}?text=${encoded}`;
}

// ─────────────────────────────────────────────
// SEO Helpers
// ─────────────────────────────────────────────

export function buildPageTitle(pageTitle: string, siteName = "Puritan Insurance Agency Ltd"): string {
  return `${pageTitle} | ${siteName}`;
}
