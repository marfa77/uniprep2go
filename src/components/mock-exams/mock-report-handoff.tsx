"use client";

import Link from "next/link";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import { trackMockEvent } from "./mock-analytics";

export type LinkedDeckCheckout = {
  deckSlug: string;
  checkoutUrl: string;
  ctaLabel: string;
};

type MockReportHandoffProps = {
  deckSlug: string;
  deckPageUrl: string;
  deckShortName: string;
  linkedCheckout: LinkedDeckCheckout | null;
  mockSlug: string;
  recommendDeck: boolean;
  retakeHref: string;
};

export function MockReportHandoff({
  deckSlug,
  deckPageUrl,
  deckShortName,
  linkedCheckout,
  mockSlug,
  recommendDeck,
  retakeHref,
}: MockReportHandoffProps) {
  function trackDeckClick(source: string) {
    trackMockEvent({
      name: "mock_deck_cta_click",
      deckSlug,
      mockSlug,
      source,
      destinationUrl: deckPageUrl,
    });
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {linkedCheckout ? (
        <TrackedCheckoutLink
          className="inline-flex rounded-lg bg-[#1f3a5f] px-5 py-2.5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#152238]"
          deckSlug={linkedCheckout.deckSlug}
          href={linkedCheckout.checkoutUrl}
          source={`mock_report:${mockSlug}:checkout`}
        >
          {linkedCheckout.ctaLabel}
        </TrackedCheckoutLink>
      ) : (
        <Link
          className="inline-flex rounded-lg bg-[#18140f] px-5 py-2.5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
          href={deckPageUrl}
          onClick={() => trackDeckClick(`mock_report:${mockSlug}:deck_primary`)}
        >
          Open linked Anki deck
        </Link>
      )}
      {linkedCheckout ? (
        <Link
          className="inline-flex rounded-lg border border-[#18140f]/20 px-5 py-2.5 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f]"
          href={deckPageUrl}
          onClick={() => trackDeckClick(`mock_report:${mockSlug}:deck_details`)}
        >
          View deck details
        </Link>
      ) : null}
      <Link
        className="inline-flex rounded-lg border border-[#18140f]/20 px-5 py-2.5 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f]"
        href={retakeHref}
      >
        Retake this mock
      </Link>
      {recommendDeck ? (
        <p className="w-full text-sm leading-7 text-[#4f493e]">
          Recommended next step: drill {deckShortName} on weak topics, then retake in 3–7 days.
        </p>
      ) : null}
    </div>
  );
}
