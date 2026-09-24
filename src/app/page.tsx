import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FunnelTracker, TrackedCheckoutLink } from "@/components/funnel-tracker";
import { LlmFactsStrip } from "@/components/llm/llm-facts-strip";
import { OfficialSourceTrustStrip } from "@/components/official-source-trust";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  buildSiteAiCategory,
  buildSiteAiDescription,
} from "@/lib/exam-llm-layer";
import { withAiMetadata } from "@/lib/llm-meta";
import { homeMetadata, shouldIndexMockExam } from "@/lib/seo";
import {
  formatDeckPriceLabel,
  getCheckoutActionLabel,
  getPricedDecks,
  getPricedDecksByCategory,
  type PricedDeck,
} from "@/lib/checkout-pricing";
import { getDeckCoverUrl, isPreoptimizedPublicImage } from "@/lib/deck-media";
import {
  formatDeckContentLabel,
  getDeckBySlug,
  siteFaqs,
} from "@/lib/decks";
import {
  BUILDING_CERTIFICATION_HUB_SLUG,
} from "@/lib/building-cert-clusters";
import { buildCatalogItemListJsonLd, buildSiteOrganizationJsonLd } from "@/lib/product-jsonld";
import { getAllMockExams, getMockExamConfig } from "@/lib/mock-exams/configs";
import { buildFeaturedMockItemListJsonLd, buildMockExamItemListJsonLd } from "@/lib/mock-exams/llm";
import { siteConfig } from "@/lib/site";
import type { MockExamConfig } from "@/lib/mock-exams/types";
import {
  btnPrimary,
  btnPrimarySm,
  btnSecondary,
  btnSecondarySm,
} from "@/lib/ui-button-classes";

const examCategories = [
  {
    title: "US Licensing",
    description:
      "PTCB, FINRA (SIE → 7 → 63/65), Life & Health, ServSafe, and major-state real estate — free timed mocks with topic readiness reports.",
    href: "/mock-exams",
    cta: "Browse US licensing mocks",
  },
  {
    title: "Finance",
    description:
      "CFA Level 1–2, FRM, CFP, and Enrolled Agent — readiness checks paired with formula PDFs and focused decks.",
    href: "/finance-anki-decks",
    cta: "Open finance hub",
  },
  {
    title: "Professional certifications",
    description:
      "EPA 608, LEED, WELL, BMS, NEBOSH, MRICS, and related building/safety pathways — mock → deck repair loops.",
    href: `/${BUILDING_CERTIFICATION_HUB_SLUG}`,
    cta: "Open certifications hub",
  },
  {
    title: "Admissions & language",
    description:
      "SAT, GRE, GMAT, and language/citizenship prep stay in the catalog — not the primary US acquisition push.",
    href: "/language-certification-decks",
    cta: "Browse language & admissions",
  },
] as const;

/** Homepage mock → deck pairs — Tier A acquisition only (2026-09-24). */
const mockDeckRepairPairSlugs: Array<{ mockSlug: string; deckSlug: string }> = [
  { mockSlug: "ptcb-pharmacy-technician-mock", deckSlug: "ptcb-pharmacy-technician-anki-deck" },
  { mockSlug: "sie-full-mock", deckSlug: "sie-exam-anki-deck" },
  { mockSlug: "series-63-readiness-check", deckSlug: "series-63-anki-deck" },
  { mockSlug: "series-65-readiness-check", deckSlug: "series-65-anki-deck" },
  { mockSlug: "life-and-health-insurance-readiness-check", deckSlug: "life-and-health-insurance-exam-anki-deck" },
  { mockSlug: "epa-608-readiness-check", deckSlug: "hvac-epa-608-anki-deck" },
  { mockSlug: "servsafe-manager-mock", deckSlug: "servsafe-manager-anki-deck" },
  { mockSlug: "cfa-level-2-readiness-check", deckSlug: "cfa-level-2-anki-deck" },
];

/** Compact homepage index-boost — Tier A money only. */
const popularDeckBoostLinks = [
  { href: "/decks/ptcb-study-guide-2026", label: "PTCB study guide" },
  { href: "/decks/series-63-anki-deck", label: "Series 63" },
  { href: "/decks/sie-exam-anki-deck", label: "SIE" },
  { href: "/decks/series-65-anki-deck", label: "Series 65" },
  { href: "/decks/life-and-health-insurance-exam-anki-deck", label: "Life & Health" },
  { href: "/decks/hvac-epa-608-anki-deck", label: "EPA 608" },
  { href: "/decks/servsafe-manager-anki-deck", label: "ServSafe" },
  { href: "/decks/cfa-level-2-formula-reference-2026", label: "CFA L2 formulas" },
  { href: "/mock-exams", label: "All mocks" },
  { href: "/decks", label: "All decks" },
] as const;

const heroSecondaryLinks = [
  { href: "/mock-exams/series-63-readiness-check", label: "Series 63 free mock" },
  { href: "/mock-exams", label: "Browse all exams" },
] as const;

const howItWorksSteps = [
  {
    title: "Take a free timed mock",
    detail:
      "Pick a practice test or readiness check — no signup wall. Timing and topic weights follow published official outlines; questions are original practice items.",
  },
  {
    title: "Read your readiness report",
    detail:
      "See pass/no-pass verdict, weak topics, pacing notes, and full answer review with explanations.",
  },
  {
    title: "Fix only what you're weak at",
    detail:
      "Targeted flashcards or a printable guide map to the same topics — close the gaps, then retake the mock before exam day.",
  },
];

/**
 * Homepage featured strip — 8 acquisition exams only.
 * Citizenship / SAT / GRE / language stay in catalog hubs, not this strip.
 */
const featuredMockSlugs = [
  "ptcb-pharmacy-technician-mock",
  "sie-full-mock",
  "series-63-readiness-check",
  "series-65-readiness-check",
  "life-and-health-insurance-readiness-check",
  "epa-608-readiness-check",
  "servsafe-manager-mock",
  "cfa-level-2-readiness-check",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return withAiMetadata(homeMetadata(), {
    aiDescription: buildSiteAiDescription(),
    aiCategory: buildSiteAiCategory(),
    path: "/",
    linkLlmsCatalog: true,
  });
}

export const revalidate = 3600;

function mockCtaLabel(mock: MockExamConfig) {
  if (!shouldIndexMockExam(mock.slug) && mock.status !== "live") return "Start readiness check";
  return mock.status === "live" ? "Start free mock" : "Start readiness check";
}

function resolveRepairPairs(pricedBySlug: Map<string, PricedDeck>) {
  return mockDeckRepairPairSlugs.flatMap(({ mockSlug, deckSlug }) => {
    const mock = getMockExamConfig(mockSlug);
    const deck = getDeckBySlug(deckSlug);
    if (!mock || !deck) return [];

    return [{ mock, deck, pricedDeck: pricedBySlug.get(deckSlug) ?? null }];
  });
}

export default async function HomePage() {
  const availableDecks = await getPricedDecks();
  const catalogGroups = await getPricedDecksByCategory();
  const pricedBySlug = new Map(availableDecks.map((deck) => [deck.slug, deck]));
  const prices = availableDecks.map((d) => d.price.amount).filter((amount) => amount > 0);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const mockExams = getAllMockExams();
  const indexedMockCount = mockExams.filter((mock) => shouldIndexMockExam(mock.slug)).length;
  const featuredMocks = featuredMockSlugs
    .map((slug) => getMockExamConfig(slug))
    .filter((mock): mock is MockExamConfig => mock !== undefined);
  const pdfProductCount = availableDecks.filter((deck) => deck.format === "PDF").length;
  const repairPairs = resolveRepairPairs(pricedBySlug);

  const sectionEvents = [
    { selector: "#repair-pairs", name: "mock_landing_view" as const },
    { selector: "#catalog", name: "catalog_view" as const },
    { selector: "#faq", name: "faq_view" as const },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      buildSiteOrganizationJsonLd(),
      buildCatalogItemListJsonLd(availableDecks),
      buildMockExamItemListJsonLd({ indexedOnly: true }),
      buildFeaturedMockItemListJsonLd([...featuredMockSlugs]),
      {
        "@type": "FAQPage",
        mainEntity: siteFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <FunnelTracker
        deckSlug="ptcb-pharmacy-technician-anki-deck"
        sectionEvents={sectionEvents}
        source="mock:ptcb-pharmacy-technician-mock:home"
      />
      <main id="main-content" tabIndex={-1}>
        {/* 1. Hero — live Layer B money (dual-track); SIE secondary until indexed */}
        <section className="border-b border-[#18140f]/10 bg-[#f7f3ea]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:py-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
                PTCB · Series 63 · Life &amp; Health · CFA
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-[#18140f] sm:text-5xl">
                Find your weak topics before exam day
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#4f493e]">
                Free timed PTCB or Series 63 practice test — no signup — then a pass/no-pass topic
                readiness report so you fix only the gaps that matter.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/mock-exams/ptcb-pharmacy-technician-mock"
                  className={btnPrimary}
                  aria-label="Start free PTCB practice test"
                >
                  Start Free PTCB Mock
                </Link>
                <Link
                  href="/decks/series-63-anki-deck"
                  className={btnSecondary}
                  aria-label="Open Series 63 exam prep deck"
                >
                  Series 63 exam prep
                </Link>
              </div>
              <p className="mt-5 text-sm text-[#5f5749]">
                Also:{" "}
                {heroSecondaryLinks.map((link, index) => (
                  <span key={link.href}>
                    {index > 0 ? " · " : null}
                    <Link
                      className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#18140f]/10 bg-[#fffaf0] shadow-[0_24px_60px_-32px_rgba(24,20,15,0.35)]">
              <Image
                alt="UniPrep2Go free timed practice tests and Anki decks for US licensing exams"
                className="h-auto w-full object-cover"
                height={630}
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                src="/home/hero.webp"
                unoptimized
                width={1200}
              />
            </div>
          </div>
        </section>

        {/* At a glance — stats + trust below first viewport */}
        <section className="border-b border-[#18140f]/10 bg-[#fffaf0]" aria-label="Catalog snapshot">
          <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
            <OfficialSourceTrustStrip className="max-w-3xl" compact />
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-[#18140f]/10 bg-[#f7f3ea] p-4">
                <dt className="text-sm text-[#7a6e5a]">Live practice tests</dt>
                <dd className="mt-1 text-2xl font-semibold text-[#18140f]">
                  {indexedMockCount} indexed mocks
                  {mockExams.length - indexedMockCount > 0
                    ? ` · ${mockExams.length - indexedMockCount} preview`
                    : ""}
                </dd>
              </div>
              <div className="rounded-3xl border border-[#18140f]/10 bg-[#f7f3ea] p-4">
                <dt className="text-sm text-[#7a6e5a]">Anki &amp; PDF catalog</dt>
                <dd className="mt-1 text-2xl font-semibold text-[#18140f]">
                  {availableDecks.length} decks
                </dd>
                {pdfProductCount > 0 ? (
                  <dd className="mt-1 text-sm text-[#7a6e5a]">
                    plus {pdfProductCount} printable PDF{pdfProductCount === 1 ? "" : "s"}
                  </dd>
                ) : null}
              </div>
              <div className="rounded-3xl border border-[#18140f]/10 bg-[#f7f3ea] p-4">
                <dt className="text-sm text-[#7a6e5a]">Price range</dt>
                <dd className="mt-1 text-2xl font-semibold text-[#18140f]">
                  {minPrice > 0 ? `$${minPrice}–$${maxPrice}` : "See checkout"}
                </dd>
              </div>
            </dl>
            <LlmFactsStrip
              deckCount={availableDecks.length}
              mockCount={indexedMockCount}
              variant="site"
            />
          </div>
        </section>

        {/* Featured free mocks — 8 acquisition exams */}
        <section className="border-b border-[#18140f]/10 bg-[#f7f3ea]">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Popular exams</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#18140f]">
              Free timed mocks for the exams we push hardest
            </h2>
            <p className="mt-3 max-w-3xl text-[#4f493e]">
              PTCB, FINRA, Life &amp; Health, EPA 608, ServSafe, and CFA Level 2 — start a mock, get a
              topic readiness report, then fix only the gaps.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredMocks.map((mock) => (
                <article
                  className="flex flex-col rounded-3xl border border-[#18140f]/10 bg-[#f7f3ea] p-5"
                  key={mock.slug}
                >
                  <h3 className="text-lg font-semibold text-[#18140f]">{mock.shortTitle}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#5f5749]">
                    {mock.questionCount} questions · {mock.durationMinutes} min · pass {mock.passRule.passPercent}%
                  </p>
                  <Link
                    aria-label={`${mockCtaLabel(mock)} for ${mock.shortTitle}`}
                    className={`mt-4 ${btnPrimarySm}`}
                    href={`/mock-exams/${mock.slug}`}
                  >
                    {mockCtaLabel(mock)}
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#5f5749]">
              <Link
                className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
                href="/mock-exams"
              >
                Browse all free practice tests
              </Link>
              {" — "}
              full catalog stays live; this homepage only features the eight acquisition exams above.
            </p>
          </div>
        </section>

        {/* Popular decks — compact internal-link boost for index priority URLs */}
        <section className="border-b border-[#18140f]/10 bg-[#fffaf0]" aria-label="Popular Anki decks">
          <div className="mx-auto max-w-6xl px-6 py-8 sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              Popular decks
            </p>
            <p className="mt-2 text-sm leading-6 text-[#5f5749]">
              {popularDeckBoostLinks.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? " · " : null}
                  <Link
                    className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* Exam categories — 4 worlds, not 12 vertical dumps */}
        <section className="border-b border-[#18140f]/10 bg-[#fffaf0]">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              Exam categories
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#18140f]">
              Four study worlds — pick the one that matches your exam
            </h2>
            <p className="mt-3 max-w-3xl text-[#4f493e]">
              US licensing is the primary acquisition push. Finance and professional certifications
              stay ready. Admissions and language remain in the catalog without homepage promotion.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {examCategories.map((category) => (
                <article
                  className="flex flex-col rounded-3xl border border-[#18140f]/10 bg-[#f7f3ea] p-5"
                  key={category.title}
                >
                  <h3 className="text-lg font-semibold text-[#18140f]">{category.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#5f5749]">{category.description}</p>
                  <Link
                    className={`mt-4 ${btnSecondarySm}`}
                    href={category.href}
                  >
                    {category.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. How it works */}
        <section id="how-it-works" className="border-b border-[#18140f]/10 bg-[#f7f3ea]">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              How it works
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#18140f]">
              Mock first, drill second
            </h2>
            <p className="mt-3 max-w-3xl text-[#4f493e]">
              UniPrep2Go is built around a simple repair loop: diagnose with a free timed mock, then
              fix weak topics with spaced-repetition flashcards.
            </p>
            <OfficialSourceTrustStrip className="mt-6 max-w-3xl" />
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {howItWorksSteps.map((step, index) => (
                <li
                  className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-5"
                  key={step.title}
                >
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#1f3a5f]">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-3 font-semibold text-[#18140f]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f5749]">{step.detail}</p>
                </li>
              ))}
            </ol>
            <Link
              className="mt-6 inline-flex text-sm font-semibold text-[#1f3a5f] underline-offset-4 hover:underline"
              href="/anki-starter-kit"
            >
              Open the 15-minute Anki Starter Kit
            </Link>
          </div>
        </section>

        {/* 4. Mock → deck repair pairs */}
        <section id="repair-pairs" className="border-b border-[#18140f]/10 bg-[#fffaf0]">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              Mock → deck repair
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#18140f]">
              Free practice test paired with the flashcard deck to fix weak topics
            </h2>
            <p className="mt-3 max-w-3xl text-[#4f493e]">
              The eight acquisition exams above — start the mock, read the report, then drill the
              linked product. Full index:{" "}
              <Link className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline" href="/mock-exams">
                all {mockExams.length} practice tests
              </Link>
              .
            </p>
            <div className="mt-8 space-y-4">
              {repairPairs.map(({ mock, deck, pricedDeck }) => {
                const thumbnail = getDeckCoverUrl(deck);
                const deckIsPlanned = deck.status === "planned";

                return (
                  <article
                    className="grid gap-4 rounded-3xl border border-[#18140f]/10 bg-[#f7f3ea] p-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch"
                    key={mock.slug}
                  >
                    <div className="flex flex-col rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1f3a5f]">
                        {mock.status === "live" ? "Full mock" : "Readiness check"}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-[#18140f]">{mock.shortTitle}</h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-[#5f5749]">
                        {mock.questionCount} questions · {mock.durationMinutes} min · pass{" "}
                        {mock.passRule.passPercent}%
                      </p>
                      <Link
                        className={`mt-4 ${btnPrimarySm}`}
                        href={`/mock-exams/${mock.slug}`}
                      >
                        {mockCtaLabel(mock)}
                      </Link>
                    </div>

                    <div
                      aria-hidden="true"
                      className="hidden items-center justify-center px-2 text-2xl text-[#7a6e5a] lg:flex"
                    >
                      →
                    </div>

                    <div className="flex items-stretch gap-4 rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] p-5">
                      {thumbnail ? (
                        <Link
                          className="relative block aspect-[16/10] w-40 shrink-0 overflow-hidden rounded-xl border border-[#18140f]/10 bg-[#f6efe8]"
                          href={`/decks/${deck.slug}`}
                        >
                          <Image
                            alt=""
                            aria-hidden
                            className="object-cover object-left"
                            fill
                            sizes="160px"
                            src={thumbnail}
                            unoptimized={isPreoptimizedPublicImage(thumbnail)}
                          />
                        </Link>
                      ) : null}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1f3a5f]">
                          {deckIsPlanned ? "Planned deck" : "Linked deck"}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-[#18140f]">
                          <Link className="hover:underline" href={`/decks/${deck.slug}`}>
                            {deck.shortName}
                          </Link>
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-6 text-[#5f5749] line-clamp-2">
                          {deck.subtitle}
                        </p>
                        <p className="mt-3 text-sm font-medium text-[#18140f]">
                          {pricedDeck
                            ? `${formatDeckPriceLabel(pricedDeck)} · ${formatDeckContentLabel(pricedDeck)}`
                            : deckIsPlanned
                              ? "Planned · not yet on sale"
                              : "See deck page"}
                        </p>
                        {pricedDeck?.checkoutUrl && !deckIsPlanned ? (
                          <TrackedCheckoutLink
                            className={`mt-3 ${btnSecondarySm}`}
                            deckSlug={deck.slug}
                            href={pricedDeck.checkoutUrl}
                            source="home_repair_pair_buy"
                          >
                            {getCheckoutActionLabel(pricedDeck.checkoutProvider)} —{" "}
                            {formatDeckPriceLabel(pricedDeck)}
                          </TrackedCheckoutLink>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Catalog stays collapsed below fold — full product list without homepage billboard */}
        <section id="catalog" className="border-b border-[#18140f]/10 bg-[#f7f3ea]">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
            <h2 className="text-2xl font-semibold tracking-tight text-[#18140f]">
              Flashcard deck catalog
            </h2>
            <p className="mt-2 text-[#4f493e]">
              Paid Anki decks and printable PDFs for daily drilling after a mock report. Expand a
              category to browse — US licensing and finance exams are listed first.
            </p>
            <div className="mt-8 space-y-3">
              {catalogGroups.map((group) => (
                <details
                  className="group rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70 open:bg-[#fffaf0]"
                  id={`catalog-${group.category}`}
                  key={group.category}
                >
                  <summary className="cursor-pointer list-none px-5 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#18140f]">{group.label}</h3>
                        <p className="mt-1 text-sm text-[#5f5749]">
                          {group.decks.length} product{group.decks.length === 1 ? "" : "s"}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="text-sm font-medium text-[#1f3a5f] transition group-open:rotate-180"
                      >
                        ▼
                      </span>
                    </div>
                  </summary>
                  <ul className="divide-y divide-[#18140f]/10 border-t border-[#18140f]/10">
                    {group.decks.map((deck) => {
                      const thumbnail = getDeckCoverUrl(deck);

                      return (
                        <li
                          className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                          key={deck.slug}
                        >
                          <div className="flex min-w-0 items-start gap-4">
                            {thumbnail ? (
                              <Link
                                aria-label={`View ${deck.title}`}
                                className="shrink-0 overflow-hidden rounded-2xl border border-[#18140f]/10 bg-[#f6efe8]"
                                href={`/decks/${deck.slug}`}
                              >
                                <Image
                                  alt=""
                                  aria-hidden
                                  className="h-16 w-28 object-cover object-left"
                                  height={64}
                                  src={thumbnail}
                                  unoptimized={isPreoptimizedPublicImage(thumbnail)}
                                  width={112}
                                />
                              </Link>
                            ) : null}
                            <div className="min-w-0">
                              <Link
                                className="font-medium text-[#18140f] hover:underline"
                                href={`/decks/${deck.slug}`}
                              >
                                {deck.title}
                              </Link>
                              <p className="mt-1 text-sm text-[#5f5749]">
                                {formatDeckContentLabel(deck)} · {deck.facts.examYear} ·{" "}
                                {deck.checkoutProvider}
                              </p>
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-4 text-sm sm:pl-0">
                            <span className="font-medium text-[#18140f]">
                              {formatDeckPriceLabel(deck)}
                            </span>
                            <Link
                              className={btnSecondarySm}
                              href={`/decks/${deck.slug}`}
                            >
                              Details
                            </Link>
                            <TrackedCheckoutLink
                              className={btnPrimarySm}
                              deckSlug={deck.slug}
                              href={deck.checkoutUrl}
                              source="catalog_buy"
                            >
                              {getCheckoutActionLabel(deck.checkoutProvider)}
                            </TrackedCheckoutLink>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section id="faq" className="border-b border-[#18140f]/10 bg-[#fffaf0]">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
            <h2 className="text-2xl font-semibold tracking-tight text-[#18140f]">FAQ</h2>
            <dl className="mt-8 space-y-6">
              {siteFaqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-medium text-[#18140f]">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-7 text-[#5f5749]">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
