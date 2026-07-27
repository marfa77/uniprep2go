"use client";

import { type FormEvent, useState } from "react";
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
  status: "idle" | "loading" | "done" | "error" | "invalid",
  idleFallback = "",
): string {
  if (status === "done") {
    return "Interest recorded — we will email you when it launches.";
  }
  if (status === "invalid") {
    return "Enter a valid email so we can notify you.";
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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error" | "invalid">("idle");
  const liveMessage = statusMessage(status);

  async function registerInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setStatus("invalid");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/mock-exams/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mockSlug: config.slug,
          deckSlug: config.linkedDeckSlug,
          email: trimmed,
          verdict: report?.verdict,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        if (response.status === 400 && body?.error?.toLowerCase().includes("email")) {
          setStatus("invalid");
          return;
        }
        throw new Error("Interest capture failed");
      }

      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const emailField = (
    <label className={cx("flex min-w-0 flex-col gap-1.5", compact ? "w-full sm:w-52" : "w-full max-w-md")}>
      <span className={compact ? "sr-only" : "text-sm font-medium text-[#18140f]"}>Email</span>
      <input
        autoComplete="email"
        className="min-h-12 w-full rounded-lg border border-[#18140f]/20 bg-[#fffaf0] px-4 text-base text-[#18140f] placeholder:text-[#7a6e5a] focus:border-[#1f3a5f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffaf0] disabled:opacity-50"
        disabled={status === "loading" || status === "done"}
        inputMode="email"
        name="email"
        onChange={(event) => {
          setEmail(event.target.value);
          if (status === "invalid" || status === "error") setStatus("idle");
        }}
        placeholder="you@email.com"
        required
        type="email"
        value={email}
      />
    </label>
  );

  if (compact) {
    return (
      <form className="inline-flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center" onSubmit={registerInterest}>
        {emailField}
        <button
          className={btnSecondarySm}
          disabled={status === "loading" || status === "done"}
          type="submit"
        >
          {status === "done" ? "Interest recorded" : status === "error" ? "Try again" : cta.label}
        </button>
        <span aria-live="polite" className="sr-only" role="status">
          {liveMessage}
        </span>
        {status === "invalid" || status === "error" ? (
          <span aria-live="polite" className="text-sm text-[#7a2e2e] sm:basis-full" role="status">
            {liveMessage}
          </span>
        ) : null}
      </form>
    );
  }

  return (
    <section className="rounded-3xl border border-[#1f3a5f]/20 bg-[#fffaf0] p-6 sm:p-8">
      <h3 className="text-2xl font-semibold tracking-tight">{cta.label}</h3>
      <p className="mt-3 text-sm leading-7 text-[#4f493e]">{cta.description}</p>
      <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={registerInterest}>
        {emailField}
        <button
          className={btnPrimary}
          disabled={status === "loading" || status === "done"}
          type="submit"
        >
          {status === "done"
            ? "Thanks — we will notify you"
            : status === "error"
              ? "Try again"
              : status === "loading"
                ? "Sending…"
                : cta.label}
        </button>
      </form>
      <p
        aria-live="polite"
        className={cx(
          "mt-3 text-sm",
          status === "error" || status === "invalid" ? "text-[#7a2e2e]" : "text-[#2f5d3a]",
          status === "idle" ? "sr-only" : "",
        )}
        role="status"
      >
        {liveMessage || "\u00a0"}
      </p>
    </section>
  );
}
