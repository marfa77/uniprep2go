"use client";

import Link from "next/link";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import type { ResultUpsell } from "@/lib/mock-exams/result-upsell";
import type { LinkedDeckCheckout } from "./mock-report-handoff";
import { trackMockEvent } from "./mock-analytics";

const toneStyles: Record<ResultUpsell["tone"], string> = {
  pass: "border-[#1f3a5f]/25 bg-[#1f3a5f]/5 text-[#18140f]",
  risk: "border-[#8a6a1f]/30 bg-[#fff4d6] text-[#18140f]",
  fail: "border-[#7a2e2e]/20 bg-[#fff0f0] text-[#18140f]",
};

const toneEyebrow: Record<ResultUpsell["tone"], string> = {
  pass: "text-[#1f3a5f]",
  risk: "text-[#6b5418]",
  fail: "text-[#7a2e2e]",
};

export type PassPackCheckout = {
  deckSlug: string;
  checkoutUrl: string;
  ctaLabel: string;
};

type MockResultUpsellProps = {
  upsell: ResultUpsell;
  mockSlug: string;
  deckSlug: string;
  deckPageUrl: string;
  linkedCheckout: LinkedDeckCheckout | null;
  /** Anki + PDF Pass Pack when sold for this exam. */
  packCheckout?: PassPackCheckout | null;
  isFreeDiagnostic: boolean;
  startBusy: boolean;
  onMockCta: () => void;
  /** Set when this browser has no Mock Pass attempts: the full-mock CTA opens checkout as a real link. */
  mockPassCheckoutUrl?: string | null;
};

const primaryBtn =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#b5451b] px-5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#8f3514] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5451b] disabled:opacity-50 sm:text-base";
const secondaryBtn =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#18140f]/25 bg-[#fffaf0] px-5 text-center text-sm font-semibold transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-50";
const ghostLink =
  "inline-flex min-h-10 items-center justify-center text-sm font-medium text-[#4f493e] underline decoration-[#18140f]/20 underline-offset-4 transition hover:text-[#18140f] hover:decoration-[#18140f]/50";

/** Top of the result screen: score → weak topics → Mock Pass + Anki (or Pass Pack). */
export function MockResultUpsell({
  upsell,
  mockSlug,
  deckSlug,
  deckPageUrl,
  linkedCheckout,
  packCheckout = null,
  isFreeDiagnostic,
  startBusy,
  onMockCta,
  mockPassCheckoutUrl = null,
}: MockResultUpsellProps) {
  const hasStudyCheckout = Boolean(packCheckout || (linkedCheckout && upsell.deckCtaLabel));
  const studyPrimary = packCheckout && upsell.packCtaLabel ? packCheckout : linkedCheckout;
  const studyPrimaryLabel =
    packCheckout && upsell.packCtaLabel ? upsell.packCtaLabel : upsell.deckCtaLabel;
  const studyPrimarySlug = studyPrimary?.deckSlug ?? deckSlug;

  function MockCta({ className }: { className: string }) {
    if (mockPassCheckoutUrl) {
      return (
        <a
          className={className}
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
      );
    }
    return (
      <button className={className} disabled={startBusy} onClick={onMockCta} type="button">
        {startBusy ? "Starting…" : upsell.mockCtaLabel}
      </button>
    );
  }

  return (
    <section
      aria-label="Your result and next step"
      className={`rounded-2xl border p-5 sm:rounded-3xl sm:p-8 ${toneStyles[upsell.tone]}`}
    >
      <p className={`font-mono text-xs uppercase tracking-[0.24em] ${toneEyebrow[upsell.tone]}`}>
        {isFreeDiagnostic ? "Free diagnostic result" : "Mock result"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{upsell.headline}</h2>
      {upsell.sampleNote ? (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#5f5749]">{upsell.sampleNote}</p>
      ) : null}
      <p className="mt-4 max-w-3xl text-base leading-7">{upsell.reality}</p>
      <p className="mt-3 max-w-3xl text-base font-semibold leading-7">{upsell.misses}</p>
      <p className="mt-3 max-w-3xl text-base leading-7">{upsell.close}</p>

      {hasStudyCheckout ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-[#18140f]/12 bg-[#fffaf0]/90 p-4 sm:p-5">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#1f3a5f]">
              {upsell.mockPathEyebrow}
            </p>
            <p className="mt-2 flex-1 text-sm leading-6 text-[#4f493e]">
              {isFreeDiagnostic
                ? "This was a sample. The full mock scores every topic with enough items to trust."
                : "Retake the full form when you have repaired the gaps above."}
            </p>
            <div className="mt-4">
              <MockCta className={secondaryBtn} />
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-[#18140f]/12 bg-[#fffaf0]/90 p-4 sm:p-5">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#1f3a5f]">
              {upsell.studyPathEyebrow}
            </p>
            <p className="mt-2 flex-1 text-sm leading-6 text-[#4f493e]">
              {upsell.packNote ??
                "Spaced recall on the same topic map — then retake when the gaps are closed."}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {studyPrimary && studyPrimaryLabel ? (
                <TrackedCheckoutLink
                  className={primaryBtn}
                  deckSlug={studyPrimarySlug}
                  href={studyPrimary.checkoutUrl}
                  source={`mock_result:${mockSlug}:upsell:${packCheckout ? "pack" : "checkout"}`}
                >
                  {studyPrimaryLabel}
                  {!packCheckout && upsell.deckCtaFullPrice ? (
                    <s className="ml-2 font-normal text-white/70">{upsell.deckCtaFullPrice}</s>
                  ) : null}
                </TrackedCheckoutLink>
              ) : null}
              {!packCheckout && upsell.deckOfferNote ? (
                <p className="text-xs leading-5 text-[#4f493e]">{upsell.deckOfferNote}</p>
              ) : null}
              {packCheckout && linkedCheckout && upsell.deckCtaLabel ? (
                <TrackedCheckoutLink
                  className={ghostLink}
                  deckSlug={linkedCheckout.deckSlug}
                  href={linkedCheckout.checkoutUrl}
                  source={`mock_result:${mockSlug}:upsell:anki_only`}
                >
                  {upsell.deckCtaLabel.replace(/^(Lock it in|Drill weak topics):\s*/, "Anki only — ")}
                </TrackedCheckoutLink>
              ) : null}
              <Link
                className={ghostLink}
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
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <MockCta className={primaryBtn} />
          <Link
            className={secondaryBtn + " sm:w-auto"}
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
            Join the Anki deck waitlist
          </Link>
        </div>
      )}
    </section>
  );
}
