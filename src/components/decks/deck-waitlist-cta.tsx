"use client";

import { useState } from "react";
import { btnPrimary, cx } from "@/lib/ui-button-classes";

type DeckWaitlistCtaProps = {
  deckSlug: string;
  deckTitle: string;
  mockSlug?: string;
  /** Compact button for hero CTA row */
  compact?: boolean;
};

function statusMessage(status: "idle" | "loading" | "done" | "error"): string {
  if (status === "done") {
    return "Request sent — we will notify you when the deck launches.";
  }
  if (status === "error") {
    return "Something went wrong. Please try again.";
  }
  if (status === "loading") {
    return "Sending your request…";
  }
  return "";
}

export function DeckWaitlistCta({
  deckSlug,
  deckTitle,
  mockSlug,
  compact = false,
}: DeckWaitlistCtaProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const liveMessage = statusMessage(status);

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

  const buttonLabel =
    status === "done"
      ? compact
        ? "Request sent"
        : "Thanks — we got your request"
      : status === "error"
        ? "Try again"
        : status === "loading"
          ? "Sending…"
          : "Notify me when Anki launches";

  if (compact) {
    return (
      <span className="inline-flex flex-col gap-1">
        <button
          className={btnPrimary}
          disabled={status === "loading" || status === "done"}
          onClick={registerInterest}
          type="button"
        >
          {buttonLabel}
        </button>
        <span aria-live="polite" className="sr-only" role="status">
          {liveMessage}
        </span>
      </span>
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
        className={cx("mt-6", btnPrimary)}
        disabled={status === "loading" || status === "done"}
        onClick={registerInterest}
        type="button"
      >
        {buttonLabel}
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
