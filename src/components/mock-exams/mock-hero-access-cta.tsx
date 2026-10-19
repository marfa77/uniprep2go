import Link from "next/link";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import type { LinkedDeckCheckout } from "@/components/mock-exams/mock-report-handoff";
import type { Deck } from "@/lib/decks";
import { FREE_DIAGNOSTIC_QUESTIONS, hasShortFreeDiagnostic } from "@/lib/mock-exams/free-diagnostic";
import { MOCK_PASS_ATTEMPTS, MOCK_PASS_CHECKOUT_URL, MOCK_PASS_PRICE_USD } from "@/lib/mock-exams/mock-pass";
import { mockFreeAccessPriceLabel } from "@/lib/mock-exams/pricing";
import type { MockExamConfig } from "@/lib/mock-exams/types";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

/** Live deck checkout wins the second hero button. Pages without one offer the Mock Pass. */
export function heroAccessActions(input: {
  linkedCheckout: LinkedDeckCheckout | null;
  linkedDeck: Deck | undefined;
}) {
  const liveDeck = Boolean(input.linkedCheckout?.checkoutUrl);
  return {
    showDeckCheckout: liveDeck,
    showMockPass: !liveDeck,
    showWaitlist: !liveDeck && input.linkedDeck?.status === "planned",
  };
}

type MockHeroAccessCtaProps = {
  config: MockExamConfig;
  linkedCheckout: LinkedDeckCheckout | null;
  linkedDeck: Deck | undefined;
};

/** Above-the-fold access price + deck CTA; the runner below is client-only. */
export function MockHeroAccessCta({ config, linkedCheckout, linkedDeck }: MockHeroAccessCtaProps) {
  const actions = heroAccessActions({ linkedCheckout, linkedDeck });
  return (
    <section aria-label="Mock access and linked deck" className="mt-5" id="mock-hero-cta">
      <p className="text-base font-semibold text-[#18140f]">
        {mockFreeAccessPriceLabel} · no signup
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a className={btnPrimary} href="#start-mock">
          {hasShortFreeDiagnostic(config)
            ? `Start free ${FREE_DIAGNOSTIC_QUESTIONS}-question diagnostic`
            : `Start free ${config.questionCount}-question mock`}
        </a>
        {actions.showDeckCheckout && linkedCheckout ? (
          <TrackedCheckoutLink
            className={btnSecondary}
            deckSlug={linkedCheckout.deckSlug}
            href={linkedCheckout.checkoutUrl}
            source={`mock:${config.slug}:hero:deck`}
          >
            {linkedCheckout.ctaLabel}
          </TrackedCheckoutLink>
        ) : null}
        {actions.showMockPass ? (
          <a
            className={btnSecondary}
            href={MOCK_PASS_CHECKOUT_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Mock Pass · ${MOCK_PASS_PRICE_USD} for {MOCK_PASS_ATTEMPTS} attempts
          </a>
        ) : null}
        {actions.showWaitlist && linkedDeck ? (
          <Link className="self-center text-sm font-medium text-[#1f3a5f] underline decoration-[#1f3a5f]/30 underline-offset-4" href={`/decks/${linkedDeck.slug}`}>
            {linkedDeck.shortName} Anki deck — join waitlist
          </Link>
        ) : null}
      </div>
    </section>
  );
}
