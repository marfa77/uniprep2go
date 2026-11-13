import Link from "next/link";
import type { Metadata } from "next";
import { FunnelTracker } from "@/components/funnel-tracker";
import { LlmFactsStrip } from "@/components/llm/llm-facts-strip";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  buildSiteAiCategory,
  buildSiteAiDescription,
} from "@/lib/exam-llm-layer";
import { withAiMetadata } from "@/lib/llm-meta";
import { homeMetadata, shouldIndexMockExam } from "@/lib/seo";
import { getPricedDecks, getPricedDecksByCategory } from "@/lib/checkout-pricing";
import { siteFaqs } from "@/lib/decks";
import { buildCatalogItemListJsonLd, buildSiteOrganizationJsonLd } from "@/lib/product-jsonld";
import { getAllMockExams, getMockExamConfig } from "@/lib/mock-exams/configs";
import { buildFeaturedMockItemListJsonLd } from "@/lib/mock-exams/llm";
import { isPrep2GoAppDeckSlug } from "@/lib/prep2go-app-decks";
import { formatMockStatLine } from "@/lib/mock-exams/mock-labels";
import { siteConfig } from "@/lib/site";
import type { MockExamConfig } from "@/lib/mock-exams/types";
import { btnPrimary, btnPrimarySm, btnSecondary, ledgerCard, ledgerList } from "@/lib/ui-button-classes";

/** Homepage HTML budget is <200 KB; the full catalog renders on /decks. */
const HOME_CATALOG_DECKS_PER_GROUP = 6;

/** Compact homepage index-boost — Tier A money only. */
const popularDeckBoostLinks = [
  { href: "/decks/cfa-level-1-pass-pack", label: "CFA L1 Pass Pack" },
  { href: "/decks/ptcb-2026-pass-pack", label: "PTCB 2026 Pass Pack" },
  { href: "/decks/ptcb-study-guide-2026", label: "PTCB study guide" },
  { href: "/decks/series-63-anki-deck", label: "Series 63" },
  { href: "/decks/sie-exam-anki-deck", label: "SIE" },
  { href: "/decks/series-65-anki-deck", label: "Series 65" },
  { href: "/decks/life-and-health-insurance-exam-anki-deck", label: "Life & Health" },
  { href: "/decks/hvac-epa-608-anki-deck", label: "EPA 608 Anki deck" },
  { href: "/decks/servsafe-manager-anki-deck", label: "ServSafe" },
  { href: "/decks/cfa-level-2-formula-reference-2026", label: "CFA L2 formulas" },
  { href: "/mock-exams", label: "All mocks" },
  { href: "/decks", label: "All decks" },
] as const;

const heroSecondaryLinks = [
  { href: "/mock-exams/frm-part-1-readiness-check", label: "FRM Part 1" },
  { href: "/mock-exams", label: "Browse all exams" },
] as const;

const howItWorksSteps = [
  {
    title: "Take your free 25-question diagnostic.",
    detail: "No registration barrier. Timed under candidate rules with real pacing feedback.",
  },
  {
    title: "Read your readiness report.",
    detail: "Topic scores and the questions you missed, without a vanity chart.",
  },
  {
    title: "Fix only what you are weak at.",
    detail: "Drill the weak topics in the matching Anki deck, then retake the mock.",
  },
];

const ledgerFacts = [
  {
    title: "Live practice tests",
    body: "Timed sessions follow the published topic weights. The first attempt is a free 25-question diagnostic.",
  },
  {
    title: "Anki and PDF catalog",
    body: "Decks and printable formula sheets for the topics the mock marks as weak.",
  },
  {
    title: "Mock Pass $5 for 5 attempts",
    body: "The first attempt is a free 25-question diagnostic. Five more scored attempts are $5.",
  },
] as const;

/**
 * Homepage featured strip — 8 acquisition exams only.
 * Citizenship / SAT / GRE / language stay in catalog hubs, not this strip.
 */
const featuredMockSlugs = [
  "cfa-level-1-readiness-check",
  "frm-part-1-readiness-check",
  "series-7-readiness-check",
  "cfa-level-2-readiness-check",
  "series-63-readiness-check",
  "ptcb-pharmacy-technician-mock",
  "life-and-health-insurance-readiness-check",
  "servsafe-manager-mock",
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

export default async function HomePage() {
  const availableDecks = await getPricedDecks();
  const catalogGroups = await getPricedDecksByCategory();
  const mockExams = getAllMockExams();
  const indexedMockCount = mockExams.filter((mock) => shouldIndexMockExam(mock.slug)).length;
  const featuredMocks = featuredMockSlugs
    .map((slug) => getMockExamConfig(slug))
    .filter((mock): mock is MockExamConfig => mock !== undefined);
  const homeCatalogGroups = catalogGroups
    .map((group) => {
      const decks = group.decks.filter((deck) => !isPrep2GoAppDeckSlug(deck.slug));
      return {
        category: group.category,
        label: group.label,
        total: decks.length,
        topDecks: decks.slice(0, HOME_CATALOG_DECKS_PER_GROUP),
      };
    })
    .filter((group) => group.topDecks.length > 0);
  const homeCatalogDecks = homeCatalogGroups.flatMap((group) => group.topDecks);

  const sectionEvents = [
    { selector: "#how-it-works", name: "catalog_view" as const },
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
      buildCatalogItemListJsonLd(homeCatalogDecks),
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
        deckSlug="cfa-level-1-anki-deck"
        sectionEvents={sectionEvents}
        source="mock:cfa-level-1-readiness-check:home"
      />
      <main id="main-content" tabIndex={-1}>
        {/* 1. Hero — CFA Level 1 practice test (pair lock 2026-10-24). */}
        <section className="border-b border-line bg-paper">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5f5749]">
              Free · no signup
            </p>
            <h1 className="mt-3 max-w-3xl text-5xl text-balance text-[#18140f] sm:text-6xl">
              CFA Level 1 Practice Test
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-[#5f5749]">
              25 questions free, no signup. The full timed mock is 60 questions in 90 minutes
              and scores every topic. The matching Anki deck drills only the weak ones.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/mock-exams/cfa-level-1-readiness-check"
                className={btnPrimary}
                aria-label="Start the CFA Level 1 practice test"
              >
                Start the CFA Level 1 practice test
              </Link>
              <Link
                href="/mock-exams/cfa-level-2-readiness-check"
                className={btnSecondary}
                aria-label="Open the CFA Level 2 practice exam"
              >
                CFA Level 2 practice exam
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#5f5749]">
              The November 2026 CFA Level I window is open now, 11–22 November.{" "}
              <a
                className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
                href="https://www.cfainstitute.org/sites/default/files/docs/programs/cfa-program/candidate-resources/26-nov-passport-assistance-letter.pdf"
                rel="noreferrer"
                target="_blank"
              >
                CFA Institute
              </a>
            </p>
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
        </section>

        <section className="border-b border-line bg-paper" aria-label="What the ledger is">
          <div className="mx-auto grid max-w-6xl gap-4 px-6 py-12 sm:grid-cols-3 sm:px-10">
            {ledgerFacts.map((fact) => (
              <article className={`${ledgerCard} p-5`} key={fact.title}>
                <h2 className="text-lg text-ink">{fact.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{fact.body}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto max-w-6xl px-6 pb-8 sm:px-10">
            <LlmFactsStrip
              deckCount={availableDecks.length}
              mockCount={indexedMockCount}
              variant="site"
            />
          </div>
        </section>

        <section className="border-b border-line bg-paper">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
            <h2 className="text-2xl text-ink">Timed mocks for the exams we push hardest.</h2>
            <div className={`mt-6 ${ledgerList}`}>
              {featuredMocks.map((mock) => (
                <div className="flex flex-wrap items-center justify-between gap-4 py-4" key={mock.slug}>
                  <div>
                    <h3 className="text-xl text-ink">{mock.shortTitle}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {formatMockStatLine({
                        questionCount: mock.questionCount,
                        durationMinutes: mock.durationMinutes,
                        passPercent: mock.passRule.passPercent,
                      })}
                    </p>
                  </div>
                  <Link
                    aria-label={`${mockCtaLabel(mock)} for ${mock.shortTitle}`}
                    className={btnPrimarySm}
                    href={`/mock-exams/${mock.slug}`}
                  >
                    Start free mock
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              <Link className="font-medium text-navy underline-offset-4 hover:underline" href="/mock-exams">
                All practice tests
              </Link>
            </p>
          </div>
        </section>

        <section className="border-b border-line bg-paper" id="how-it-works">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
            <ol className={ledgerList}>
              {howItWorksSteps.map((step, index) => (
                <li className="grid gap-3 py-6 sm:grid-cols-[4rem_1fr]" key={step.title}>
                  <span className="font-serif text-3xl text-navy">{index + 1}</span>
                  <div>
                    <h2 className="text-xl text-ink">{step.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-line bg-paper" aria-label="Decks">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
            <h2 className="text-2xl text-ink">Decks</h2>
            <p className="mt-2 text-sm text-muted">Anki decks and formula PDFs. Prices are the live list prices.</p>
            <div className={`mt-6 ${ledgerList}`}>
              {popularDeckBoostLinks.map((link) => (
                <div className="flex items-center justify-between gap-4 py-4" key={link.href}>
                  <Link className="text-lg text-ink hover:underline" href={link.href}>
                    {link.label}
                  </Link>
                  <Link className="text-sm font-semibold text-navy" href={link.href}>
                    Open
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              <Link className="font-medium text-navy underline-offset-4 hover:underline" href="/decks">
                Full catalog of {availableDecks.length} products
              </Link>
              {" · "}
              <Link className="font-medium text-navy underline-offset-4 hover:underline" href="/faq">
                Questions
              </Link>
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
