import { z } from "zod";

// ─────────────────────────────────────────────
// Quote Request Schema
// ─────────────────────────────────────────────

export const quoteFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Please enter a valid name"),

  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Phone number is too long")
    .regex(
      /^(\+254|0)[17]\d{8}$/,
      "Please enter a valid Kenyan phone number (e.g. 0712345678)"
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(150, "Email address is too long"),

  insuranceType: z
    .string()
    .min(1, "Please select an insurance type"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long (max 1000 characters)"),
});

export type QuoteFormSchema = z.infer<typeof quoteFormSchema>;

// ─────────────────────────────────────────────
// Contact Form Schema
// ─────────────────────────────────────────────

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .regex(
      /^(\+254|0)[17]\d{8}$|^$/,
      "Please enter a valid Kenyan phone number or leave blank"
    )
    .optional()
    .or(z.literal("")),

  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject is too long"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long (max 2000 characters)"),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

// ─────────────────────────────────────────────
// Payment Schema
// ─────────────────────────────────────────────

export const paymentSchema = z.object({
  phone: z
    .string()
    .regex(
      /^(\+254|0)[17]\d{8}$/,
      "Please enter a valid M-Pesa registered number"
    ),
  amount: z
    .number()
    .min(100, "Minimum payment is KES 100")
    .max(1000000, "Maximum single payment is KES 1,000,000"),
  reference: z.string().min(1),
  description: z.string().min(1),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
