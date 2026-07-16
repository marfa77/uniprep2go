"use client";

import { useState } from "react";
import type { MockExamConfig, MockReport } from "@/lib/mock-exams/types";

type MockInterestCtaProps = {
  config: MockExamConfig;
  cta: {
    label: string;
    description: string;
    interestCaptureEnabled: boolean;
  };
  report?: MockReport;
  compact?: boolean;
};

export function MockInterestCta({ config, cta, report, compact = false }: MockInterestCtaProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function registerInterest() {
    setStatus("loading");

    try {
      const response = await fetch("/api/mock-exams/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mockSlug: config.slug,
          deckSlug: config.linkedDeckSlug,
          verdict: report?.verdict,
        }),
      });

      if (!response.ok) {
        throw new Error("Interest capture failed");
      }

      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (compact) {
    return (
      <button
        className="inline-flex h-11 items-center rounded-full border border-[#1f3a5f]/25 px-5 text-sm font-semibold text-[#1f3a5f] transition hover:border-[#1f3a5f] disabled:opacity-50"
        disabled={status === "loading" || status === "done"}
        onClick={registerInterest}
        type="button"
      >
        {status === "done" ? "Interest recorded" : cta.label}
      </button>
    );
  }

  return (
    <section className="rounded-3xl border border-[#1f3a5f]/20 bg-[#fffaf0] p-6 sm:p-8">
      <h3 className="text-2xl font-semibold tracking-tight">{cta.label}</h3>
      <p className="mt-3 text-sm leading-7 text-[#4f493e]">{cta.description}</p>
      <button
        className="mt-6 rounded-full bg-[#1f3a5f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#18140f] disabled:opacity-50"
        disabled={status === "loading" || status === "done"}
        onClick={registerInterest}
        type="button"
      >
        {status === "done"
          ? "Thanks — we will notify you"
          : status === "error"
            ? "Try again"
            : cta.label}
      </button>
    </section>
  );
}
