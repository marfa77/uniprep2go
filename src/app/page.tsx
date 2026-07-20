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
  BUILDING_CLUSTER_LABELS,
  BUILDING_MOCK_DECK_REPAIR_PAIRS,
  type BuildingClusterId,
} from "@/lib/building-cert-clusters";
import { buildCatalogItemListJsonLd, buildSiteOrganizationJsonLd } from "@/lib/product-jsonld";
import { getAllMockExams, getMockExamConfig, primaryMock } from "@/lib/mock-exams/configs";
import { buildFeaturedMockItemListJsonLd, buildMockExamItemListJsonLd } from "@/lib/mock-exams/llm";
import { siteConfig } from "@/lib/site";
import type { MockExamConfig } from "@/lib/mock-exams/types";
import {
  btnPrimary,
  btnPrimarySm,
  btnSecondary,
  btnSecondarySm,
} from "@/lib/ui-button-classes";

const examPathLinks = [
  {
    title: "Building, safety & sustainability",
    description:
      "EPA 608, LEED, NEBOSH, CFPS, and MRICS pathways — free timed mocks with linked Anki decks.",
    links: [
      { href: `/${BUILDING_CERTIFICATION_HUB_SLUG}`, label: "All building certification pathways" },
      { href: "/mock-exams/epa-608-readiness-check", label: "EPA 608 practice test" },
      { href: "/mock-exams/leed-green-associate-readiness-check", label: "LEED GA practice test" },
      { href: "/mock-exams/nebosh-readiness-check", label: "NEBOSH readiness check" },
    ],
  },
  {
    title: "Trades & water treatment",
    description: "Electrical journeyman, plumbing, and Water Treatment Operator Class I readiness checks.",
    links: [
      { href: "/mock-exams/v/trades", label: "Browse trades mocks" },
      { href: "/mock-exams/electrical-journeyman-readiness-check", label: "Electrical journeyman" },
      { href: "/mock-exams/water-treatment-operator-1-readiness-check", label: "Water treatment Op-1" },
    ],
  },
  {
    title: "CDL & commercial driving",
    description: "General knowledge plus HazMat, passenger, and school bus endorsement practice.",
    links: [
      { href: "/mock-exams/v/transport", label: "All CDL mocks" },
      { href: "/mock-exams/cdl-general-knowledge-readiness-check", label: "CDL General Knowledge" },
      { href: "/mock-exams/cdl-hazmat-readiness-check", label: "CDL HazMat" },
    ],
  },
  {
    title: "Allied health (specialty)",
    description: "NHA phlebotomy and CCMA readiness checks — niche allied-health mocks first.",
    links: [
      { href: "/mock-exams/v/allied-health", label: "Browse allied health mocks" },
      { href: "/mock-exams/nha-cpt-phlebotomy-readiness-check", label: "NHA CPT phlebotomy" },
      { href: "/mock-exams/nha-ccma-readiness-check", label: "NHA CCMA mock" },
    ],
  },
  {
    title: "State real estate licensing",
    description: "Florida, Texas, New York, and California salesperson readiness checks.",
    links: [
      { href: "/mock-exams/v/real-estate", label: "All real estate mocks" },
      { href: "/mock-exams/fl-real-estate-readiness-check", label: "Florida RE mock" },
      { href: "/mock-exams/california-real-estate-readiness-check", label: "California RE mock" },
    ],
  },
  {
    title: "Nursing & nurse aide",
    description: "NNAAP CNA and NCLEX-PN style readiness checks before clinical skills day.",
    links: [
      { href: "/mock-exams/v/nursing", label: "Nursing mocks" },
      { href: "/mock-exams/nnaap-cna-readiness-check", label: "NNAAP CNA mock" },
      { href: "/mock-exams/nclex-pn-readiness-check", label: "NCLEX-PN readiness" },
    ],
  },
  {
    title: "Personal training (CPT)",
    description: "NASM, ISSA, and ACE CPT practice tests for domain scoring before exam day.",
    links: [
      { href: "/mock-exams/v/fitness", label: "All CPT mocks" },
      { href: "/mock-exams/nasm-cpt-readiness-check", label: "NASM CPT" },
      { href: "/mock-exams/ace-cpt-readiness-check", label: "ACE CPT" },
    ],
  },
  {
    title: "Dental assisting & hygiene",
    description: "DANB ICE/GC and NBDHE readiness checks for chairside and hygiene pathways.",
    links: [
      { href: "/mock-exams/v/dental", label: "Dental mocks" },
      { href: "/mock-exams/danb-ice-readiness-check", label: "DANB ICE" },
      { href: "/mock-exams/nbdhe-readiness-check", label: "NBDHE readiness" },
    ],
  },
  {
    title: "FINRA securities exam prep",
    description: "SIE, Series 7, and Series 63 flashcards after the free SIE mock.",
    links: [
      { href: "/mock-exams/sie-full-mock", label: "Free SIE practice test" },
      { href: "/decks/sie-exam-anki-deck", label: "SIE flashcards" },
      { href: "/decks/series-7-anki-deck", label: "Series 7 deck" },
    ],
  },
  {
    title: "Food safety and ServSafe Manager",
    description: "Use the 90-question ServSafe mock before the Anki deck or printable study guide.",
    links: [
      { href: "/mock-exams/servsafe-manager-mock", label: "Free ServSafe practice test" },
      { href: "/decks/servsafe-manager-anki-deck", label: "ServSafe flashcards" },
      { href: "/decks/servsafe-manager-complete-study-guide", label: "Printable study guide" },
    ],
  },
  {
    title: "Finance credentials",
    description: "CFA and FRM readiness checks paired with formula references and focused Anki decks.",
    links: [
      { href: "/mock-exams/cfa-level-1-readiness-check", label: "CFA Level 1 mock" },
      { href: "/mock-exams/cfa-level-2-readiness-check", label: "CFA Level 2 mock" },
      { href: "/decks/frm-part-1-anki-deck", label: "FRM Part 1 deck" },
    ],
  },
];

/** US licensing & finance mock → deck pairs. Building certs are in #building-repair-pairs. */
const mockDeckRepairPairSlugs: Array<{ mockSlug: string; deckSlug: string }> = [
  { mockSlug: "sie-full-mock", deckSlug: "sie-exam-anki-deck" },
  { mockSlug: "servsafe-manager-mock", deckSlug: "servsafe-manager-anki-deck" },
  { mockSlug: "cfa-level-1-readiness-check", deckSlug: "cfa-level-1-anki-deck" },
  { mockSlug: "cfa-level-2-readiness-check", deckSlug: "cfa-level-2-anki-deck" },
  { mockSlug: "us-citizenship-readiness-check", deckSlug: "us-citizenship-test-prep2go-app" },
  { mockSlug: "life-and-health-insurance-readiness-check", deckSlug: "life-and-health-insurance-exam-anki-deck" },
  { mockSlug: "california-real-estate-readiness-check", deckSlug: "california-real-estate-exam-anki-deck" },
  { mockSlug: "ptcb-pharmacy-technician-mock", deckSlug: "ptcb-pharmacy-technician-anki-deck" },
];

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
    title: "Drill weak topics daily",
    detail:
      "Use the linked Anki deck or printable PDF for spaced-repetition repair between study sessions.",
  },
];

/** Home featured strip — niche Google priority set (not head SIE/ServSafe/PTCB). */
const featuredMockSlugs = [
  "epa-608-readiness-check",
  "leed-green-associate-readiness-check",
  "nebosh-readiness-check",
  "cfps-readiness-check",
  "cdl-general-knowledge-readiness-check",
  "electrical-journeyman-readiness-check",
  "nha-cpt-phlebotomy-readiness-check",
  "fl-real-estate-readiness-check",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return withAiMetadata(homeMetadata(), {
    aiDescription: buildSiteAiDescription(),
    aiCategory: buildSiteAiCategory(),
    path: "/",
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

function resolveBuildingRepairPairs(pricedBySlug: Map<string, PricedDeck>) {
  return BUILDING_MOCK_DECK_REPAIR_PAIRS.flatMap(({ mockSlug, deckSlug, clusterId }) => {
    const mock = getMockExamConfig(mockSlug);
    const deck = getDeckBySlug(deckSlug);
    if (!mock || !deck) return [];

    return [{ mock, deck, pricedDeck: pricedBySlug.get(deckSlug) ?? null, clusterId }];
  });
}

function groupBuildingPairsByCluster(
  pairs: ReturnType<typeof resolveBuildingRepairPairs>,
) {
  const grouped = new Map<BuildingClusterId, typeof pairs>();

  for (const pair of pairs) {
    const existing = grouped.get(pair.clusterId) ?? [];
    existing.push(pair);
    grouped.set(pair.clusterId, existing);
  }

  return grouped;
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
  const buildingRepairPairs = resolveBuildingRepairPairs(pricedBySlug);
  const buildingPairsByCluster = groupBuildingPairsByCluster(buildingRepairPairs);

  const sectionEvents = [
    { selector: "#repair-pairs", name: "mock_landing_view" as const },
    { selector: "#building-repair-pairs", name: "mock_landing_view" as const },
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
        deckSlug={primaryMock.linkedDeckSlug}
        sectionEvents={sectionEvents}
        source={`mock:${primaryMock.slug}:home`}
      />
      <main id="main-content" tabIndex={-1}>
        {/* 1. Hero — brand, headline, one sentence, CTAs, image */}
        <section className="border-b border-[#18140f]/10 bg-[#f7f3ea]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:py-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
                Free practice tests first
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-[#18140f] sm:text-5xl">
                Diagnose exam gaps with free timed mocks — then drill with Anki
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#4f493e]">
                Start with a timed mock and pass/no-pass topic report — no signup — then buy the
                linked Anki deck to drill weak areas.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/mock-exams/epa-608-readiness-check"
                  className={btnPrimary}
                  aria-label="Start free EPA 608 practice test"
                >
                  Start Free EPA 608 Practice Test
                </Link>
                <Link href="/mock-exams" className={btnSecondary}>
                  Browse all practice tests
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#18140f]/10 bg-[#fffaf0] shadow-[0_24px_60px_-32px_rgba(24,20,15,0.35)]">
              <Image
                alt="UniPrep2Go free online practice tests for US licensing exams"
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

        {/* Featured free mocks */}
        <section className="border-b border-[#18140f]/10 bg-[#f7f3ea]">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Start here</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#18140f]">
              Top free practice tests for US licensing &amp; finance
            </h2>
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
              search CDL, NHA, real estate, CPT, and 40+ niche exams.
            </p>
          </div>
        </section>

        {/* 2. Exam picker by vertical */}
        <section className="border-b border-[#18140f]/10 bg-[#fffaf0]">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              Popular exam paths
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#18140f]">
              Find the right practice test, deck, or PDF without guessing
            </h2>
            <p className="mt-3 max-w-3xl text-[#4f493e]">
              Highest-intent entry points by exam vertical — each path links to existing mock pages,
              deck pages, or catalog anchors in one click.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {examPathLinks.map((path) => (
                <article
                  className="rounded-3xl border border-[#18140f]/10 bg-[#f7f3ea] p-5"
                  key={path.title}
                >
                  <h3 className="text-lg font-semibold text-[#18140f]">{path.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f5749]">{path.description}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-[#1f3a5f]">
                    {path.links.map((link) => (
                      <Link className="underline-offset-4 hover:underline" href={link.href} key={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
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
              These are the highest-intent mock and deck combinations — start the mock, read the
              report, then drill the linked product. Full index:{" "}
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

                    <div className="flex gap-4 rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] p-5">
                      {thumbnail ? (
                        <Link
                          className="shrink-0 overflow-hidden rounded-xl border border-[#18140f]/10 bg-[#f6efe8]"
                          href={`/decks/${deck.slug}`}
                        >
                          <Image
                            alt=""
                            aria-hidden
                            className="h-20 w-36 object-cover object-[78%_center]"
                            height={80}
                            src={thumbnail}
                            unoptimized={isPreoptimizedPublicImage(thumbnail)}
                            width={144}
                          />
                        </Link>
                      ) : null}
                      <div className="flex min-w-0 flex-col">
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

        {/* 5. Building certification repair pairs — full pathway line */}
        <section id="building-repair-pairs" className="border-b border-[#18140f]/10 bg-[#f7f3ea]">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              Building certification line
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#18140f]">
              Mock → deck pathways by certification cluster
            </h2>
            <p className="mt-3 max-w-3xl text-[#4f493e]">
              Each building, safety, sustainability, and MBA credential pairs a free readiness check
              with a linked Anki deck — grouped by study pathway so you can see what comes next.{" "}
              <Link
                className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
                href={`/${BUILDING_CERTIFICATION_HUB_SLUG}`}
              >
                Full building certification hub
              </Link>
              .
            </p>
            <div className="mt-10 space-y-10">
              {Array.from(buildingPairsByCluster.entries()).map(([clusterId, pairs]) => (
                <div id={clusterId} key={clusterId}>
                  <h3 className="text-lg font-semibold text-[#18140f]">
                    {BUILDING_CLUSTER_LABELS[clusterId]}
                  </h3>
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    {pairs.map(({ mock, deck, pricedDeck }) => {
                      const deckIsPlanned = deck.status === "planned";

                      return (
                        <article
                          className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-5"
                          key={mock.slug}
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0 flex-1">
                              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1f3a5f]">
                                Readiness check
                              </p>
                              <Link
                                className="mt-1 block font-semibold text-[#18140f] hover:underline"
                                href={`/mock-exams/${mock.slug}`}
                              >
                                {mock.shortTitle}
                              </Link>
                              <p className="mt-1 text-sm text-[#5f5749]">
                                {mock.questionCount} q · {mock.durationMinutes} min
                              </p>
                            </div>
                            <span aria-hidden="true" className="hidden text-[#7a6e5a] sm:block">
                              →
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1f3a5f]">
                                {deckIsPlanned ? "Planned deck" : "Linked deck"}
                              </p>
                              <Link
                                className="mt-1 block font-semibold text-[#18140f] hover:underline"
                                href={`/decks/${deck.slug}`}
                              >
                                {deck.shortName}
                              </Link>
                              <p className="mt-1 text-sm text-[#5f5749]">
                                {pricedDeck
                                  ? `${formatDeckPriceLabel(pricedDeck)} · ${formatDeckContentLabel(pricedDeck)}`
                                  : deckIsPlanned
                                    ? "Planned · not yet on sale"
                                    : "See deck page"}
                              </p>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Collapsed catalog */}
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
                                  className="h-16 w-28 object-cover object-[78%_center]"
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
