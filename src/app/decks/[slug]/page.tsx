import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FunnelTracker, TrackedCheckoutLink } from "@/components/funnel-tracker";
import { LlmFactsStrip } from "@/components/llm/llm-facts-strip";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  buildDeckAiCategory,
  buildDeckAiDescription,
} from "@/lib/exam-llm-layer";
import { getExamFactsProfileForDeck } from "@/lib/exam-facts";
import { withAiMetadata } from "@/lib/llm-meta";
import { DeckApkgPendingNotice } from "@/components/decks/deck-apkg-pending-notice";
import { DeckCompanionProductSection } from "@/components/decks/deck-companion-product-section";
import { DeckExamFactsSection } from "@/components/decks/deck-exam-facts-section";
import { DeckPositioningSection } from "@/components/decks/deck-positioning-section";
import { DeckPracticeMockSection } from "@/components/decks/deck-practice-mock-section";
import { DeckRelatedDecks } from "@/components/decks/deck-related-decks";
import { DeckSeoSections } from "@/components/decks/deck-seo-sections";
import { DeckUniqueContentSection } from "@/components/decks/deck-unique-content-section";
import { CollapsibleDetails } from "@/components/ui/collapsible-details";
import {
  BUILDING_CERTIFICATION_HUB_SLUG,
  getBuildingClusterStudyPaths,
  isBuildingCertDeckSlug,
} from "@/lib/building-cert-clusters";
import { buildMergedDeckFaqs } from "@/lib/deck-faq";
import {
  getCompanionDeck,
  getDeckPracticeMock,
  isMockFirstDeckPage,
} from "@/lib/deck-funnel";
import { getDeckShortPitch } from "@/lib/deck-page-copy";
import { catalogAvailableDecks, categoryLabels } from "@/lib/decks";
import { formatDeckPriceLabel, getDeckCheckoutCtaLabel, getPricedDeckBySlug } from "@/lib/checkout-pricing";
import {
  buildDeckSeoDescription,
  buildDeckSeoHeadline,
  buildDeckSeoKeywords,
  buildDeckSeoTitle,
  getDeckLinkedMock,
} from "@/lib/deck-seo";
import { getDeckCoverUrl, isPreoptimizedPublicImage } from "@/lib/deck-media";
import { buildDeckPageJsonLd } from "@/lib/product-jsonld";
import {
  VISIBLE_FAQ_COUNT,
  VISIBLE_FAQ_COUNT_WITH_EXAM,
  deckMoreAboutHint,
  shouldShowDeckPracticeMockSection,
  splitFaqs,
} from "@/lib/page-layout";
import { finalize, leafPageTitle } from "@/lib/seo";
import { buildSocialMetadata } from "@/lib/social-metadata";

export const revalidate = 3600;

export function generateStaticParams() {
  return catalogAvailableDecks.map((deck) => ({ slug: deck.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const deck = await getPricedDeckBySlug(slug);

  if (!deck) {
    return { title: "Deck not found" };
  }

  const image = getDeckCoverUrl(deck);
  const seoTitle = buildDeckSeoTitle(deck);
  const title = leafPageTitle(seoTitle);
  const description = buildDeckSeoDescription(deck);
  const keywords = buildDeckSeoKeywords(deck);
  const examProfile = getExamFactsProfileForDeck(deck.slug);
  const linkedMockForMeta = getDeckLinkedMock(deck.slug);

  return withAiMetadata(
    finalize({
      title,
      description,
      keywords,
      alternates: {
        canonical: `/decks/${deck.slug}`,
      },
      ...buildSocialMetadata({
        title: seoTitle,
        description,
        path: `/decks/${deck.slug}`,
        image,
        imageAlt: `${deck.shortName} exam prep preview`,
      }),
    }),
    {
      aiDescription: buildDeckAiDescription(deck, examProfile, linkedMockForMeta),
      aiCategory: buildDeckAiCategory(deck),
      path: `/decks/${deck.slug}`,
    },
  );
}

export default async function DeckPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deck = await getPricedDeckBySlug(slug);

  if (!deck) {
    notFound();
  }

  const priceLabel = formatDeckPriceLabel(deck);
  const checkoutCtaLabel = getDeckCheckoutCtaLabel(deck, priceLabel);
  const linkedMock = getDeckLinkedMock(deck.slug);
  const practiceMock = getDeckPracticeMock(deck.slug);
  const mockFirst = isMockFirstDeckPage(deck.slug);
  const companionDeck = getCompanionDeck(deck.slug);
  const pricedCompanionDeck = companionDeck
    ? await getPricedDeckBySlug(companionDeck.slug)
    : null;
  const examFactsProfile = getExamFactsProfileForDeck(deck.slug);
  const secondaryCta = practiceMock
    ? {
        href: `/mock-exams/${practiceMock.slug}`,
        label: `Free ${deck.shortName} practice test`,
      }
    : deck.format === "PDF"
      ? {
          href: "/mock-exams/servsafe-manager-mock",
          label: "Try free practice test",
        }
      : deck.slug === "cfa-level-1-anki-deck"
        ? {
            href: "/how-to-import-cfa-anki-deck",
            label: "How to import",
          }
        : {
            href: "/anki-starter-kit",
            label: "Anki starter kit",
          };

  const sectionEvents = [
    ...(practiceMock
      ? [{ selector: "#practice-mock", name: "mock_landing_view" as const }]
      : []),
    { selector: "#facts", name: "product_facts_view" as const },
    { selector: "#topic-matrix", name: "topic_matrix_view" as const },
    { selector: "#sample-cards", name: "sample_cards_view" as const },
    { selector: "#how-this-compares", name: "positioning_view" as const },
    { selector: "#exam-facts", name: "exam_facts_view" as const },
    { selector: "#faq", name: "faq_view" as const },
  ];

  const mergedFaqs = buildMergedDeckFaqs(deck);
  const { primary: primaryFaqs, extra: extraFaqs } = splitFaqs(
    mergedFaqs,
    examFactsProfile ? VISIBLE_FAQ_COUNT_WITH_EXAM : VISIBLE_FAQ_COUNT,
  );
  const shortPitch = getDeckShortPitch(deck);
  const showPracticeMockSection = practiceMock && shouldShowDeckPracticeMockSection(deck.slug);

  const jsonLd = buildDeckPageJsonLd(deck);
  const heroImage = getDeckCoverUrl(deck);
  const relatedStudyPaths = [
    ...(isBuildingCertDeckSlug(deck.slug)
      ? getBuildingClusterStudyPaths(deck.slug)
      : [
          ...(practiceMock
            ? [
                {
                  href: `/mock-exams/${practiceMock.slug}`,
                  label: `Free ${deck.shortName} practice test`,
                  note: `${practiceMock.questionCount} questions with topic scoring`,
                },
              ]
            : []),
          ...(companionDeck
            ? [
                {
                  href: `/decks/${companionDeck.slug}`,
                  label:
                    companionDeck.format === "PDF" && companionDeck.slug.includes("formula")
                      ? `Matching ${companionDeck.shortName} formula sheet`
                      : companionDeck.shortName,
                  note:
                    deck.format === "PDF"
                      ? "Daily spaced-repetition companion"
                      : "Printable formula reference",
                },
              ]
            : []),
        ]),
  ];

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <FunnelTracker deckSlug={deck.slug} sectionEvents={sectionEvents} source="deck_page" />

      <article className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
          {categoryLabels[deck.category]}
        </p>
        <nav aria-label="Breadcrumb" className="mt-3 text-sm text-[#5f5749]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="hover:text-[#18140f] hover:underline" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                className="hover:text-[#18140f] hover:underline"
                href={`/#catalog-${deck.category}`}
              >
                {categoryLabels[deck.category]}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#18140f]">{deck.shortName}</li>
          </ol>
        </nav>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {buildDeckSeoHeadline(deck)}
        </h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.42fr)] lg:items-start">
          <div className="max-w-3xl">
            <p className="text-xl leading-8 text-[#18140f]">{shortPitch}</p>
          </div>
          {heroImage ? (
            <div className="overflow-hidden rounded-3xl border border-[#18140f]/15 bg-[#fffaf0] shadow-[0_18px_50px_-34px_rgba(24,20,15,0.45)]">
              <Image
                alt={`${deck.shortName} product preview`}
                className="h-auto w-full"
                height={768}
                priority={deck.format === "PDF"}
                sizes="(max-width: 1024px) 100vw, 360px"
                src={heroImage}
                unoptimized={isPreoptimizedPublicImage(heroImage)}
                width={1376}
              />
            </div>
          ) : null}
        </div>

        <LlmFactsStrip
          deck={deck}
          linkedMock={linkedMock}
          profile={examFactsProfile}
          variant="deck"
        />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {mockFirst && practiceMock ? (
            <>
              <Link
                aria-label={`Try free ${practiceMock.questionCount}-question ${deck.shortName} practice test`}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1f3a5f] px-6 py-3 text-base font-semibold text-[#fffaf0] transition hover:bg-[#152238] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a5f] focus-visible:ring-offset-2"
                href={`/mock-exams/${practiceMock.slug}`}
              >
                Try free {practiceMock.questionCount}-question practice test
              </Link>
              <TrackedCheckoutLink
                aria-label={`${checkoutCtaLabel} on ${deck.checkoutProvider}`}
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#18140f]/25 px-6 py-3 text-base font-semibold transition hover:border-[#18140f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a5f] focus-visible:ring-offset-2"
                deckSlug={deck.slug}
                href={deck.checkoutUrl}
                source="deck_page_cta"
              >
                {checkoutCtaLabel}
              </TrackedCheckoutLink>
            </>
          ) : (
            <>
              <TrackedCheckoutLink
                aria-label={`${checkoutCtaLabel} on ${deck.checkoutProvider}`}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1f3a5f] px-6 py-3 text-base font-semibold text-[#fffaf0] transition hover:bg-[#152238] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a5f] focus-visible:ring-offset-2"
                deckSlug={deck.slug}
                href={deck.checkoutUrl}
                source="deck_page_cta"
              >
                {checkoutCtaLabel}
              </TrackedCheckoutLink>
              {practiceMock ? (
                <Link
                  aria-label={`Try free ${practiceMock.questionCount}-question ${deck.shortName} practice test`}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#18140f]/25 px-6 py-3 text-base font-semibold transition hover:border-[#18140f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a5f] focus-visible:ring-offset-2"
                  href={`/mock-exams/${practiceMock.slug}`}
                >
                  Try free {practiceMock.questionCount}-question practice test
                </Link>
              ) : deck.checkoutProvider === "App Store" ? (
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#18140f]/25 px-6 py-3 text-base font-semibold transition hover:border-[#18140f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a5f] focus-visible:ring-offset-2"
                  href={deck.checkoutUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View on App Store
                </Link>
              ) : (
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#18140f]/25 px-6 py-3 text-base font-semibold transition hover:border-[#18140f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a5f] focus-visible:ring-offset-2"
                  href={secondaryCta.href}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </>
          )}
        </div>
        {deck.checkoutProvider !== "App Store" ? (
          <p className="mt-3 text-sm text-[#5f5749]">
            Instant {deck.format === "PDF" ? "PDF" : ".apkg"} download · {deck.checkoutProvider} secure checkout
          </p>
        ) : null}

        <DeckApkgPendingNotice deck={deck} />

        {showPracticeMockSection ? (
          <div id="practice-mock">
            <DeckPracticeMockSection
              companionMock={mockFirst}
              deck={deck}
              mock={practiceMock}
            />
          </div>
        ) : null}

        {deck.sampleCards.length > 0 ? (
          <section id="sample-cards" className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">
              {deck.format === "PDF" ? "PDF previews" : "Sample cards"}
            </h2>
            {deck.format === "PDF" ? (
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5f5749]">
                Real excerpts from the PDF so you can judge layout and depth before checkout.
              </p>
            ) : null}
            <div
              className={
                deck.format === "PDF"
                  ? "mt-5 space-y-6"
                  : "mt-4 grid gap-4 sm:grid-cols-3 sm:items-start"
              }
            >
              {deck.sampleCards.map((card) => (
                <article
                  className={
                    deck.format === "PDF"
                      ? "overflow-hidden rounded-3xl border border-[#18140f]/15 bg-[#fffaf0] shadow-[0_18px_48px_-36px_rgba(24,20,15,0.5)]"
                      : "overflow-hidden rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]"
                  }
                  key={`${card.question}-${card.imageUrl}-${card.audioUrl ?? ""}`}
                >
                  {deck.format === "PDF" ? (
                    <div className="border-b border-[#18140f]/10 p-5 sm:p-6">
                      <h3 className="text-xl font-semibold leading-tight">{card.question}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f5749]">{card.answer}</p>
                    </div>
                  ) : null}
                  {card.imageUrl ? (
                    <div
                      className={
                        deck.format === "PDF"
                          ? "flex max-h-[700px] items-start justify-center overflow-hidden bg-[#f6efe8] p-3 sm:p-5"
                          : "bg-[#f6efe8]"
                      }
                    >
                      <Image
                        alt={deck.format === "PDF" ? `PDF preview: ${card.question}` : `Sample Anki card: ${card.question}`}
                        className={deck.format === "PDF" ? "h-auto w-full rounded-2xl" : "h-auto w-full"}
                        height={deck.format === "PDF" ? 1780 : 550}
                        sizes={deck.format === "PDF" ? "(max-width: 1024px) 100vw, 896px" : "(max-width: 640px) 100vw, 33vw"}
                        src={card.imageUrl}
                        width={deck.format === "PDF" ? 2200 : 976}
                      />
                    </div>
                  ) : (
                    <div className="flex min-h-48 items-center justify-center bg-gradient-to-br from-[#f4dccf] via-[#fff8f0] to-[#f6efe8] px-6 py-10 text-center">
                      <p className="text-2xl font-semibold text-[#18140f]">{card.question}</p>
                    </div>
                  )}
                  {deck.format !== "PDF" ? (
                    <div className="p-5">
                      <h3 className="font-semibold">{card.question}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#5f5749]">{card.answer}</p>
                      {card.audioUrl ? (
                        <audio controls preload="metadata" src={card.audioUrl} className="mt-4 h-10 w-full">
                          Your browser does not support the audio element.
                        </audio>
                      ) : null}
                      {card.audioUrlEs ? (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a7d68]">
                            Spanish audio
                          </p>
                          <audio controls preload="metadata" src={card.audioUrlEs} className="h-10 w-full">
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      ) : null}
                      {card.audioUrlIt ? (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a7d68]">
                            Italian audio
                          </p>
                          <audio controls preload="metadata" src={card.audioUrlIt} className="h-10 w-full">
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {deck.checkoutProvider !== "App Store" && deck.sampleCards.length > 0 ? (
          <section className="mt-10 rounded-3xl border border-[#1f3a5f]/20 bg-[#fffaf0] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">Ready to drill with the full deck?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5f5749]">
              Instant {deck.format === "PDF" ? "PDF" : ".apkg"} download after {deck.checkoutProvider} checkout.
            </p>
            <TrackedCheckoutLink
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1f3a5f] px-6 py-3 text-base font-semibold text-[#fffaf0] transition hover:bg-[#152238]"
              deckSlug={deck.slug}
              href={deck.checkoutUrl}
              source="deck_page_post_samples"
            >
              {checkoutCtaLabel}
            </TrackedCheckoutLink>
          </section>
        ) : null}

        {pricedCompanionDeck ? (
          <DeckCompanionProductSection companion={pricedCompanionDeck} deck={deck} />
        ) : null}

        <section id="facts" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Product facts</h2>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-3xl border border-[#18140f]/15 bg-[#18140f]/10 sm:grid-cols-2">
            {[
              [deck.format === "PDF" ? "Contents" : "Cards", deck.facts.cards],
              ["Coverage", deck.facts.topics],
              ["Format", deck.format],
              ["Price", priceLabel],
              ["Checkout", deck.checkoutProvider],
              ["Exam cycle", deck.facts.examYear],
              ["Delivery", deck.facts.delivery],
            ].map(([label, value]) => (
              <div className="bg-[#fffaf0] px-5 py-4" key={label}>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
                  {label}
                </dt>
                <dd className="mt-2 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {deck.topicCoverage.length > 0 ? (
          <section id="topic-matrix" className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">
              {deck.format === "PDF" ? "What is inside the PDF" : "Coverage by exam topic"}
            </h2>
            <div className="mt-4 overflow-x-auto rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#18140f]/15 font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
                    <th className="px-5 py-4 font-medium">
                      {deck.format === "PDF" ? "Section" : "Topic"}
                    </th>
                    <th className="px-5 py-4 font-medium">
                      {deck.format === "PDF" ? "Length" : "Exam weight"}
                    </th>
                    <th className="px-5 py-4 font-medium">
                      {deck.format === "PDF" ? "What you get" : "Cards"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#18140f]/10">
                  {deck.topicCoverage.map((topic) => (
                    <tr key={topic.name}>
                      <td className="px-5 py-4 font-medium">{topic.name}</td>
                      <td className="px-5 py-4 text-[#4f493e]">{topic.examWeight}</td>
                      <td className="px-5 py-4 text-[#4f493e]">{topic.cards}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {examFactsProfile ? (
          <DeckExamFactsSection deck={deck} profile={examFactsProfile} />
        ) : null}

        <CollapsibleDetails
          hint={deckMoreAboutHint(deck)}
          id="more-about"
          summary={`More about ${deck.shortName}`}
        >
          <div className="space-y-10 [&_section]:!mt-0">
            <DeckSeoSections deck={deck} />
            <DeckPositioningSection deck={deck} />
            <DeckUniqueContentSection deck={deck} />
          </div>
        </CollapsibleDetails>

        <section id="faq" className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight">
            {examFactsProfile
              ? `${examFactsProfile.exam_facts.exam_name} & product FAQ`
              : "FAQ"}
          </h2>
          <div className="mt-4 divide-y divide-[#18140f]/10 rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
            {primaryFaqs.map((faq) => (
              <article className="p-5" key={faq.question}>
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-[#5f5749]">{faq.answer}</p>
              </article>
            ))}
          </div>
          {extraFaqs.length > 0 ? (
            <CollapsibleDetails className="mt-4" summary={`More questions (${extraFaqs.length})`}>
              <div className="divide-y divide-[#18140f]/10">
                {extraFaqs.map((faq) => (
                  <article className="py-4 first:pt-0 last:pb-0" key={faq.question}>
                    <h3 className="font-semibold">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#5f5749]">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </CollapsibleDetails>
          ) : null}
        </section>

        {relatedStudyPaths.length > 0 ? (
          <section className="mt-8 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70 p-5">
            <h2 className="text-lg font-semibold tracking-tight">Also useful</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {relatedStudyPaths.map((path) => (
                <Link
                  className="rounded-2xl border border-[#18140f]/10 bg-[#f7f3ea] px-4 py-3 transition hover:border-[#1f3a5f]/30"
                  href={path.href}
                  key={`${path.href}-${path.label}`}
                >
                  <span className="block text-sm font-semibold text-[#18140f]">{path.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-[#5f5749]">{path.note}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <DeckRelatedDecks deck={deck} />

        <section className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#7a6e5a]">
          {isBuildingCertDeckSlug(deck.slug) ? (
            <Link
              className="underline decoration-[#18140f]/20 underline-offset-4"
              href={`/${BUILDING_CERTIFICATION_HUB_SLUG}`}
            >
              Building certification hub
            </Link>
          ) : null}
          <Link className="underline decoration-[#18140f]/20 underline-offset-4" href={`/#catalog-${deck.category}`}>
            {categoryLabels[deck.category]} catalog
          </Link>
          <Link className="underline decoration-[#18140f]/20 underline-offset-4" href="/">
            Full catalog
          </Link>
        </section>

        <p className="mt-10 text-xs text-[#8a7d68]">Last updated {deck.lastUpdated}.</p>
      </article>

      <SiteFooter />
    </main>
  );
}
