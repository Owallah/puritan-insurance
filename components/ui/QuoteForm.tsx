"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, AlertCircle, Send } from "lucide-react";
import { quoteFormSchema, type QuoteFormSchema } from "@/lib/validations";
import { submitQuoteRequest } from "@/lib/utils";
import { INSURANCE_TYPES } from "@/lib/data";
import { FormInput, FormSelect, FormTextarea } from "@/components/ui/FormFields";
import type { QuoteSubmissionResult } from "@/types";

export function QuoteForm() {
  const [submissionResult, setSubmissionResult] =
    useState<QuoteSubmissionResult | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormSchema>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      insuranceType: "",
      message: "",
    },
  });

  const onSubmit = async (data: QuoteFormSchema) => {
    try {
      const result = await submitQuoteRequest(data);
      setSubmissionResult(result);
      if (result.success) {
        reset();
      }
    } catch {
      setSubmissionResult({
        success: false,
        message:
          "Something went wrong. Please try again or call us directly.",
      });
    }
  };

  // Success screen
  if (submissionResult?.success) {
    return (
      <div className="text-center py-10 px-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h3 className="font-display text-2xl font-bold text-navy-900 mb-3">
          Quote Request Received!
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed max-w-sm mx-auto">
          {submissionResult.message}
        </p>
        {submissionResult.referenceId && (
          <div className="inline-block bg-navy-50 rounded-lg px-5 py-3 mb-6">
            <p className="text-xs text-gray-500 mb-1">Reference Number</p>
            <p className="font-mono font-bold text-navy-900 text-lg">
              {submissionResult.referenceId}
            </p>
          </div>
        )}
        <p className="text-gray-500 text-sm mb-6">
          Our team will contact you within <strong>2 business hours</strong>.
        </p>
        <button
          onClick={() => setSubmissionResult(null)}
          className="btn-primary"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-label="Quote request form"
    >
      {/* Error banner */}
      {submissionResult && !submissionResult.success && (
        <div
          role="alert"
          className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <AlertCircle
            size={16}
            className="text-red-500 mt-0.5 flex-shrink-0"
            aria-hidden="true"
          />
          <p className="text-red-700 text-sm">{submissionResult.message}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <FormInput
          label="Full Name"
          type="text"
          placeholder="John Mwangi"
          required
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <FormInput
          label="Phone Number"
          type="tel"
          placeholder="0712 345 678"
          required
          autoComplete="tel"
          hint="Kenyan number e.g. 0712 345 678"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <FormInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        required
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <FormSelect
        label="Insurance Type"
        placeholder="— Select an insurance type —"
        required
        options={INSURANCE_TYPES.map((t) => ({ value: t.value, label: t.label }))}
        error={errors.insuranceType?.message}
        {...register("insuranceType")}
      />

      <FormTextarea
        label="Additional Information"
        placeholder="Tell us more about what you need covered. For example: vehicle make/model, number of people to insure, coverage amount, etc."
        required
        rows={5}
        error={errors.message?.message}
        {...register("message")}
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full py-3.5 text-base disabled:opacity-70 disabled:cursor-not-allowed"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Submitting Request...
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            Submit Quote Request
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        By submitting, you agree to our{" "}
        <a href="#" className="underline hover:text-gray-600">
          Privacy Policy
        </a>
        . We never share your information without consent.
      </p>
    </form>
  );
}
