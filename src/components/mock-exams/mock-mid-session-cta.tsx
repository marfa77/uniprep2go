"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { LinkedDeckCheckout } from "./mock-report-handoff";
import { trackMockEvent } from "./mock-analytics";

type MockMidSessionCtaProps = {
  mockSlug: string;
  deckSlug: string;
  linkedCheckout: LinkedDeckCheckout | null;
  answeredCount: number;
  questionCount: number;
};

/** Soft money CTA after early progress — before full mock finish. */
export function MockMidSessionCta({
  mockSlug,
  deckSlug,
  linkedCheckout,
  answeredCount,
  questionCount,
}: MockMidSessionCtaProps) {
  const [dismissed, setDismissed] = useState(false);
  const threshold = Math.min(5, Math.max(3, Math.ceil(questionCount * 0.12)));
  const eligible = questionCount >= 20 && answeredCount >= threshold && !dismissed;

  useEffect(() => {
    if (!eligible || typeof window === "undefined") {
      return;
    }
    try {
      if (window.sessionStorage.getItem(`mock-mid-cta:${mockSlug}`) === "1") {
        setDismissed(true);
      }
    } catch {
      // ignore storage errors
    }
  }, [eligible, mockSlug]);

  if (!eligible || dismissed) {
    return null;
  }

  function dismiss() {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(`mock-mid-cta:${mockSlug}`, "1");
    } catch {
      // ignore
    }
  }

  return (
    <aside
      aria-label="Study resources"
      className="mt-5 rounded-2xl border border-[#1f3a5f]/20 bg-[#1f3a5f]/[0.04] p-4 sm:mt-6"
    >
      <p className="text-sm font-semibold text-[#18140f]">
        Already seeing weak spots? Drill them with Anki after this session.
      </p>
      <p className="mt-1.5 text-xs leading-5 text-[#5f5749]">
        Keep going for the full topic report — or open the deck now and come back.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {linkedCheckout?.checkoutUrl ? (
          <a
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#18140f] px-4 text-xs font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
            href={linkedCheckout.checkoutUrl}
            onClick={() => {
              trackMockEvent({
                name: "mock_deck_cta_click",
                deckSlug,
                mockSlug,
                source: `mock:${mockSlug}:mid_session:checkout`,
              });
            }}
            rel="noopener noreferrer"
            target="_blank"
          >
            {linkedCheckout.ctaLabel ?? "Buy Anki deck"}
          </a>
        ) : (
          <Link
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#18140f] px-4 text-xs font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
            href={`/decks/${deckSlug}`}
            onClick={() => {
              trackMockEvent({
                name: "mock_deck_cta_click",
                deckSlug,
                mockSlug,
                source: `mock:${mockSlug}:mid_session:deck`,
              });
            }}
          >
            Deck details
          </Link>
        )}
        <button
          className="inline-flex min-h-10 items-center rounded-full border border-[#18140f]/15 px-4 text-xs font-semibold text-[#5f5749] transition hover:border-[#18140f]/40 hover:text-[#18140f]"
          onClick={dismiss}
          type="button"
        >
          Keep practicing
        </button>
      </div>
    </aside>
  );
}
