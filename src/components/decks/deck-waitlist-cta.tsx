"use client";

import { useState } from "react";

type DeckWaitlistCtaProps = {
  deckSlug: string;
  deckTitle: string;
  mockSlug?: string;
  /** Compact button for hero CTA row */
  compact?: boolean;
};

export function DeckWaitlistCta({
  deckSlug,
  deckTitle,
  mockSlug,
  compact = false,
}: DeckWaitlistCtaProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function registerInterest() {
    setStatus("loading");

    try {
      const response = await fetch("/api/decks/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deckSlug,
          mockSlug,
          referrer: typeof document !== "undefined" ? document.referrer : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Waitlist request failed");
      }

      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (compact) {
    return (
      <button
        className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1f3a5f] px-6 py-3 text-base font-semibold text-[#fffaf0] transition hover:bg-[#152238] disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a5f] focus-visible:ring-offset-2"
        disabled={status === "loading" || status === "done"}
        onClick={registerInterest}
        type="button"
      >
        {status === "done"
          ? "Request sent"
          : status === "error"
            ? "Try again"
            : status === "loading"
              ? "Sending…"
              : "Notify me when Anki launches"}
      </button>
    );
  }

  return (
    <section
      className="mt-8 rounded-3xl border border-[#1f3a5f]/20 bg-[#fffaf0] p-6 sm:p-8"
      id="waitlist"
    >
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Coming soon</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Get notified when {deckTitle} ships
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4f493e]">
        This Anki deck is planned — not for sale yet. Take the free practice test now, then tap
        below and we&apos;ll ping the founder when enough people want the deck.
      </p>
      <button
        className="mt-6 rounded-full bg-[#1f3a5f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#18140f] disabled:opacity-50"
        disabled={status === "loading" || status === "done"}
        onClick={registerInterest}
        type="button"
      >
        {status === "done"
          ? "Thanks — we got your request"
          : status === "error"
            ? "Try again"
            : status === "loading"
              ? "Sending…"
              : "Notify me when Anki launches"}
      </button>
    </section>
  );
}
