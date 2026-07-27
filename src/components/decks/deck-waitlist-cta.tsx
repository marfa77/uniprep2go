"use client";

import { type FormEvent, useState } from "react";
import { btnPrimary, cx } from "@/lib/ui-button-classes";

type DeckWaitlistCtaProps = {
  deckSlug: string;
  deckTitle: string;
  mockSlug?: string;
  /** Compact button for hero CTA row */
  compact?: boolean;
};

function statusMessage(status: "idle" | "loading" | "done" | "error" | "invalid"): string {
  if (status === "done") {
    return "Request sent — we will email you when the deck launches.";
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
  return "";
}

export function DeckWaitlistCta({
  deckSlug,
  deckTitle,
  mockSlug,
  compact = false,
}: DeckWaitlistCtaProps) {
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
      const response = await fetch("/api/decks/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deckSlug,
          mockSlug,
          email: trimmed,
          referrer: typeof document !== "undefined" ? document.referrer : undefined,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        if (response.status === 400 && body?.error?.toLowerCase().includes("email")) {
          setStatus("invalid");
          return;
        }
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

  const emailField = (
    <label className={cx("flex min-w-0 flex-col gap-1.5", compact ? "w-full sm:w-56" : "w-full max-w-md")}>
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
          className={btnPrimary}
          disabled={status === "loading" || status === "done"}
          type="submit"
        >
          {buttonLabel}
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
    <section
      className="mt-8 rounded-3xl border border-[#1f3a5f]/20 bg-[#fffaf0] p-6 sm:p-8"
      id="waitlist"
    >
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Coming soon</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Get notified when {deckTitle} ships
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4f493e]">
        This Anki deck is planned — not for sale yet. Take the free practice test now, then leave
        your email and we&apos;ll write when the deck launches (and ping the founder when demand is
        clear).
      </p>
      <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={registerInterest}>
        {emailField}
        <button
          className={btnPrimary}
          disabled={status === "loading" || status === "done"}
          type="submit"
        >
          {buttonLabel}
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
