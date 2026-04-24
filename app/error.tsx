"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service (e.g. Sentry) in production
    console.error("Application error:", error);
  }, [error]);

  return (
    <section
      className="min-h-[70vh] flex items-center justify-center bg-white"
      aria-label="Error page"
    >
      <div className="container-default text-center py-20 max-w-lg">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl" aria-hidden="true">⚠️</span>
        </div>

        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mb-3">
          Something Went Wrong
        </h1>
        <p className="text-gray-500 mb-3 leading-relaxed">
          An unexpected error occurred. Our team has been notified. Please try
          again or contact us if the problem persists.
        </p>

        {error.digest && (
          <p className="text-xs text-gray-400 font-mono mb-8">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <button onClick={reset} className="btn-primary">
            <RefreshCw size={16} />
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            <Home size={16} />
            Go Home
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600">
            Need immediate assistance?{" "}
            <a
              href="tel:+254700000000"
              className="font-semibold text-navy-700 hover:text-gold-600 underline"
            >
              Call us: +254 700 000 000
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
