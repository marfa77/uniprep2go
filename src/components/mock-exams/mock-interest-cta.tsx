"use client";

import { useState } from "react";
import type { MockExamConfig, MockReport } from "@/lib/mock-exams/types";
import { btnPrimary, btnSecondarySm, cx } from "@/lib/ui-button-classes";

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

function statusMessage(
  status: "idle" | "loading" | "done" | "error",
  idleFallback = "",
): string {
  if (status === "done") {
    return "Interest recorded — we will notify you.";
  }
  if (status === "error") {
    return "Something went wrong. Please try again.";
  }
  if (status === "loading") {
    return "Sending your request…";
  }
  return idleFallback;
}

export function MockInterestCta({ config, cta, report, compact = false }: MockInterestCtaProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const liveMessage = statusMessage(status);

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
      <span className="inline-flex flex-col gap-1">
        <button
          className={btnSecondarySm}
          disabled={status === "loading" || status === "done"}
          onClick={registerInterest}
          type="button"
        >
          {status === "done" ? "Interest recorded" : status === "error" ? "Try again" : cta.label}
        </button>
        <span aria-live="polite" className="sr-only" role="status">
          {liveMessage}
        </span>
      </span>
    );
  }

  return (
    <section className="rounded-3xl border border-[#1f3a5f]/20 bg-[#fffaf0] p-6 sm:p-8">
      <h3 className="text-2xl font-semibold tracking-tight">{cta.label}</h3>
      <p className="mt-3 text-sm leading-7 text-[#4f493e]">{cta.description}</p>
      <button
        className={cx("mt-6", btnPrimary)}
        disabled={status === "loading" || status === "done"}
        onClick={registerInterest}
        type="button"
      >
        {status === "done"
          ? "Thanks — we will notify you"
          : status === "error"
            ? "Try again"
            : status === "loading"
              ? "Sending…"
              : cta.label}
      </button>
      <p
        aria-live="polite"
        className={cx(
          "mt-3 text-sm",
          status === "error" ? "text-[#7a2e2e]" : "text-[#2f5d3a]",
          status === "idle" ? "sr-only" : "",
        )}
        role="status"
      >
        {liveMessage || "\u00a0"}
      </p>
    </section>
  );
}
