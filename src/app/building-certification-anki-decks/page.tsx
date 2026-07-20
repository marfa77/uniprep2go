import Link from "next/link";
import type { Metadata } from "next";
import { LlmFactsStrip } from "@/components/llm/llm-facts-strip";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDeckPriceLabel, getPricedDeckBySlug } from "@/lib/checkout-pricing";
import {
  BUILDING_CERTIFICATION_HUB_SLUG,
  BUILDING_CLUSTER_LABELS,
  BUILDING_CLUSTER_MEMBERS,
  BUILDING_MOCK_DECK_REPAIR_PAIRS,
  type BuildingClusterId,
} from "@/lib/building-cert-clusters";
import { formatDeckContentLabel, getCatalogDeckBySlug } from "@/lib/decks";
import { withAiMetadata } from "@/lib/llm-meta";
import { getMockExamConfig } from "@/lib/mock-exams/configs";
import { finalize, leafPageTitle } from "@/lib/seo";
import { buildSocialMetadata } from "@/lib/social-metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

const directAnswer =
  "UniPrep2Go publishes 15 building, safety, sustainability, admissions, and project-management certification pathways — each with a free timed readiness check and a linked Anki flashcard deck. Clusters include EPA 608 + BMS (HVAC), LEED GA → LEED AP BD+C → WELL AP, MRICS APC + Quantity Surveying, NEBOSH + CFPS, CDCP data centre, CEM energy, ASHRAE, GMAT Focus, Digital SAT, and PMP.";

const clusterOrder: BuildingClusterId[] = [
  "hvac-controls",
  "green-building",
  "construction-surveying",
  "safety-fire",
  "datacenter",
  "mba-admissions",
];

export async function generateMetadata(): Promise<Metadata> {
  // Absolute title ≤57 chars — skip layout "| UniPrep2Go" suffix.
  const seoTitle = "Building Cert Anki Decks | EPA 608, LEED, MRICS";
  const title = leafPageTitle(seoTitle);
  const description =
    "15 pathways with free readiness checks + Anki decks: EPA 608, LEED, WELL AP, BMS, MRICS, CFPS, NEBOSH, CDCP, CEM, ASHRAE, GMAT, SAT, PMP.";

  return withAiMetadata(
    finalize({
      title,
      description,
      keywords: [
        "building certification anki deck",
        "epa 608 flashcards",
        "leed green associate anki",
        "well ap exam prep",
        "mrics apc flashcards",
        "cfps study deck",
        "nebosh igc anki",
        "gmat focus anki deck",
      ],
      alternates: { canonical: `/${BUILDING_CERTIFICATION_HUB_SLUG}` },
      ...buildSocialMetadata({
        title: seoTitle,
        description,
        path: `/${BUILDING_CERTIFICATION_HUB_SLUG}`,
        image: "/home/hero.webp",
        imageAlt: "Building certification exam prep pathways on UniPrep2Go",
      }),
    }),
    {
      aiDescription: directAnswer,
      aiCategory: "Building certification exam prep hub",
      path: `/${BUILDING_CERTIFICATION_HUB_SLUG}`,
    },
  );
}

export default async function BuildingCertificationHubPage() {
  const pathways = await Promise.all(
    BUILDING_MOCK_DECK_REPAIR_PAIRS.map(async ({ mockSlug, deckSlug, clusterId }) => {
      const mock = getMockExamConfig(mockSlug);
      const deck = getCatalogDeckBySlug(deckSlug);
      const pricedDeck = deck ? await getPricedDeckBySlug(deck.slug) : null;

      return { mock, deck, pricedDeck, clusterId };
    }),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/${BUILDING_CERTIFICATION_HUB_SLUG}#webpage`,
        name: "Building Certification Anki Decks",
        description: directAnswer,
        url: absoluteUrl(`/${BUILDING_CERTIFICATION_HUB_SLUG}`),
      },
      {
        "@type": "ItemList",
        name: "Building certification mock → deck pathways",
        itemListElement: pathways
          .filter((entry) => entry.mock && entry.deck)
          .map((entry, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${entry.mock!.shortTitle} → ${entry.deck!.shortName}`,
            url: absoluteUrl(`/decks/${entry.deck!.slug}`),
          })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <article
        className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-12"
        id="main-content"
        tabIndex={-1}
      >
        <LlmFactsStrip
          hubName="building certification hub"
          hubPath={`/${BUILDING_CERTIFICATION_HUB_SLUG}`}
          pathwayCount={BUILDING_MOCK_DECK_REPAIR_PAIRS.length}
          variant="hub"
        />
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
          Building certification hub
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance">
          Building, safety & sustainability certification prep
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#4f493e]">{directAnswer}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className={btnPrimary} href="/mock-exams">
            All practice tests
          </Link>
          <Link className={btnSecondary} href="/#catalog-professional">
            Professional deck catalog
          </Link>
        </div>

        <div className="mt-12 space-y-12">
          {clusterOrder.map((clusterId) => {
            const clusterPathways = pathways.filter(
              (entry) => entry.clusterId === clusterId && entry.mock && entry.deck,
            );

            if (clusterPathways.length === 0) {
              return null;
            }

            return (
              <section id={clusterId} key={clusterId}>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {BUILDING_CLUSTER_LABELS[clusterId]}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#5f5749]">
                  Recommended pathway:{" "}
                  {BUILDING_CLUSTER_MEMBERS[clusterId]
                    .map((slug) => getCatalogDeckBySlug(slug)?.shortName)
                    .filter(Boolean)
                    .join(" → ")}
                </p>
                <ul className="mt-6 divide-y divide-[#18140f]/10 rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
                  {clusterPathways.map(({ mock, deck, pricedDeck }) => (
                    <li className="grid gap-4 px-5 py-5 lg:grid-cols-[1fr_auto_1fr]" key={mock!.slug}>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1f3a5f]">
                          Free readiness check
                        </p>
                        <Link
                          className="mt-1 block font-semibold hover:underline"
                          href={`/mock-exams/${mock!.slug}`}
                        >
                          {mock!.shortTitle}
                        </Link>
                        <p className="mt-1 text-sm text-[#5f5749]">
                          {mock!.questionCount} questions · {mock!.durationMinutes} min
                        </p>
                      </div>
                      <div aria-hidden="true" className="hidden items-center text-[#7a6e5a] lg:flex">
                        →
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1f3a5f]">
                          Linked Anki deck
                        </p>
                        <Link
                          className="mt-1 block font-semibold hover:underline"
                          href={`/decks/${deck!.slug}`}
                        >
                          {deck!.shortName}
                        </Link>
                        <p className="mt-1 text-sm text-[#5f5749] line-clamp-2">{deck!.subtitle}</p>
                        {pricedDeck ? (
                          <p className="mt-2 text-sm font-medium">
                            {formatDeckPriceLabel(pricedDeck)} · {formatDeckContentLabel(pricedDeck)}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
