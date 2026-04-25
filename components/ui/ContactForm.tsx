"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, AlertCircle, Send } from "lucide-react";
import { contactFormSchema, type ContactFormSchema } from "@/lib/validations";
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/components/ui/FormFields";
import type { ContactSubmissionResult } from "@/types";

const SUBJECTS = [
  { value: "general", label: "General Inquiry" },
  { value: "quote", label: "Request a Quote" },
  { value: "claim", label: "Claims Support" },
  { value: "policy", label: "Policy Questions" },
  { value: "payment", label: "Payment & Billing" },
  { value: "complaint", label: "Complaint / Feedback" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [result, setResult] = useState<ContactSubmissionResult | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormSchema) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json());
      setResult(res);
      if (res.success) reset();
    } catch {
      setResult({
        success: false,
        message: "Submission failed. Please try again or contact us directly.",
      });
    }
  };

  if (result?.success) {
    return (
      <div className="text-center py-10 px-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h3 className="font-display text-2xl font-bold text-navy-900 mb-3">
          Message Sent!
        </h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">{result.message}</p>
        <button onClick={() => setResult(null)} className="btn-primary">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-label="Contact form"
    >
      {result && !result.success && (
        <div
          role="alert"
          className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <AlertCircle
            size={16}
            className="text-red-500 mt-0.5 flex-shrink-0"
            aria-hidden="true"
          />
          <p className="text-red-700 text-sm">{result.message}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <FormInput
          label="Full Name"
          type="text"
          placeholder="Jane Wanjiru"
          required
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <FormInput
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          required
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <FormInput
        label="Phone Number (Optional)"
        type="tel"
        placeholder="0712 345 678"
        autoComplete="tel"
        hint="In case we need to call you back"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <FormSelect
        label="Subject"
        placeholder="— Select a subject —"
        required
        options={SUBJECTS}
        error={errors.subject?.message}
        {...register("subject")}
      />

      <FormTextarea
        label="Your Message"
        placeholder="Write your message here..."
        required
        rows={5}
        error={errors.message?.message}
        {...register("message")}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full py-3.5 text-base disabled:opacity-70 disabled:cursor-not-allowed"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
