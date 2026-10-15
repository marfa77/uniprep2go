"use client";

import Link from "next/link";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import type { ResultUpsell } from "@/lib/mock-exams/result-upsell";
import type { LinkedDeckCheckout } from "./mock-report-handoff";
import { trackMockEvent } from "./mock-analytics";

const toneStyles: Record<ResultUpsell["tone"], string> = {
  pass: "border-[#8a6a1f]/30 bg-[#fff4d6]",
  risk: "border-[#8a6a1f]/30 bg-[#fff4d6]",
  fail: "border-[#7a2e2e]/20 bg-[#fff0f0]",
};

type MockResultUpsellProps = {
  upsell: ResultUpsell;
  mockSlug: string;
  deckSlug: string;
  deckPageUrl: string;
  linkedCheckout: LinkedDeckCheckout | null;
  isFreeDiagnostic: boolean;
  startBusy: boolean;
  onMockCta: () => void;
  /** Set when this browser has no Mock Pass attempts: the full-mock CTA opens checkout as a real link. */
  mockPassCheckoutUrl?: string | null;
};

/** Top of the result screen: the score never ends the session — weak topics → deck, or the full mock. */
export function MockResultUpsell({
  upsell,
  mockSlug,
  deckSlug,
  deckPageUrl,
  linkedCheckout,
  isFreeDiagnostic,
  startBusy,
  onMockCta,
  mockPassCheckoutUrl = null,
}: MockResultUpsellProps) {
  const deckPrimary = Boolean(linkedCheckout && upsell.deckCtaLabel);
  const mockCtaClass = deckPrimary
    ? "inline-flex min-h-12 items-center justify-center rounded-full border border-[#18140f]/25 bg-[#fffaf0] px-6 text-sm font-semibold transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-50"
    : "inline-flex min-h-14 items-center justify-center rounded-full bg-[#b5451b] px-6 text-base font-semibold text-white transition hover:bg-[#8f3514] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5451b] disabled:opacity-50";

  return (
    <section
      aria-label="Your result and next step"
      className={`rounded-2xl border p-5 text-[#18140f] sm:rounded-3xl sm:p-8 ${toneStyles[upsell.tone]}`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#6b5418]">
        {isFreeDiagnostic ? "Free diagnostic result" : "Mock result"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{upsell.headline}</h2>
      {upsell.sampleNote ? (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#5f5749]">{upsell.sampleNote}</p>
      ) : null}
      <p className="mt-4 max-w-3xl text-base leading-7">{upsell.reality}</p>
      <p className="mt-3 max-w-3xl text-base font-semibold leading-7">{upsell.misses}</p>
      <p className="mt-3 max-w-3xl text-base leading-7">{upsell.close}</p>

      <div className="mt-6 flex flex-col gap-3">
        {deckPrimary && linkedCheckout ? (
          <TrackedCheckoutLink
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#b5451b] px-6 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#8f3514] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5451b] sm:w-auto sm:self-start"
            deckSlug={linkedCheckout.deckSlug}
            href={linkedCheckout.checkoutUrl}
            source={`mock_result:${mockSlug}:upsell:checkout`}
          >
            {upsell.deckCtaLabel}
            {upsell.deckCtaFullPrice ? (
              <s className="ml-2 font-normal text-white/70">{upsell.deckCtaFullPrice}</s>
            ) : null}
          </TrackedCheckoutLink>
        ) : null}
        {deckPrimary && upsell.deckOfferNote ? (
          <p className="-mt-1 text-sm text-[#4f493e]">{upsell.deckOfferNote}</p>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {mockPassCheckoutUrl ? (
            <a
              className={mockCtaClass}
              href={mockPassCheckoutUrl}
              onClick={() => {
                trackMockEvent({
                  name: "mock_pass_checkout_click",
                  deckSlug,
                  mockSlug,
                  source: `mock_result:${mockSlug}:upsell:mock_pass`,
                  destinationUrl: mockPassCheckoutUrl,
                });
                onMockCta();
              }}
              rel="noopener"
              target="_blank"
            >
              {upsell.mockCtaLabel}
            </a>
          ) : (
            <button className={mockCtaClass} disabled={startBusy} onClick={onMockCta} type="button">
              {startBusy ? "Starting…" : upsell.mockCtaLabel}
            </button>
          )}
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#18140f]/15 px-6 text-sm font-medium text-[#4f493e] transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]"
            href={deckPageUrl}
            onClick={() =>
              trackMockEvent({
                name: "mock_deck_cta_click",
                deckSlug,
                mockSlug,
                source: `mock_result:${mockSlug}:upsell:deck_details`,
                destinationUrl: deckPageUrl,
              })
            }
          >
            {linkedCheckout ? "See sample cards" : "Join the Anki deck waitlist"}
          </Link>
        </div>
      </div>
    </section>
  );
}
