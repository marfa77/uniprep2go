import Link from "next/link";
import type { Metadata } from "next";
import { LlmFactsStrip } from "@/components/llm/llm-facts-strip";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatDeckPriceLabel,
  getPricedDecksByCategory,
} from "@/lib/checkout-pricing";
import { categoryLabels, formatDeckContentLabel } from "@/lib/decks";
import { withAiMetadata } from "@/lib/llm-meta";
import { finalize, leafPageTitle } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { buildCatalogItemListJsonLd } from "@/lib/product-jsonld";
import { btnChip, ledgerList } from "@/lib/ui-button-classes";
import { PREP2GO_SHOP_URL, RETIRED_LANGUAGE_DECKS_NOTE } from "@/lib/retired-language-decks";

export async function generateMetadata(): Promise<Metadata> {
  const title = leafPageTitle("Anki Decks & Exam Prep Catalog | UniPrep2Go");

  return withAiMetadata(
    finalize({
      title,
      description:
        "Browse UniPrep2Go Anki decks and study guides for FINRA, CFA, FRM, EPA 608, LEED, ServSafe, PTCB, and more — each paired with a free timed practice test where available.",
      alternates: { canonical: "/decks" },
      openGraph: {
        title: "Anki Decks & Exam Prep Catalog | UniPrep2Go",
        description:
          "Independent Anki flashcard decks and PDFs for US licensing, finance, and building certifications — with free linked practice tests.",
        url: "/decks",
      },
    }),
    {
      aiDescription:
        "UniPrep2Go deck catalog: Anki flashcards and PDFs for US licensing, finance credentials, building certifications, and citizenship civics. Language-exam Anki decks are sold on Prep2Go.study/shop.",
      aiCategory: "Exam prep catalog",
      path: "/decks",
      linkLlmsCatalog: true,
    },
  );
}

export default async function DecksHubPage() {
  const groups = await getPricedDecksByCategory();
  const allDecks = groups.flatMap((group) => group.decks);

  const jsonLd = {
        "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/decks")}#webpage`,
        name: "Anki Decks & Exam Prep Catalog",
        url: absoluteUrl("/decks"),
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
      buildCatalogItemListJsonLd(allDecks),
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
        className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12"
        id="main-content"
        tabIndex={-1}
      >
        <LlmFactsStrip
          hubName="Anki decks catalog"
          hubPath="/decks"
          pathwayCount={allDecks.length}
          variant="hub"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Catalog · all decks and references</p>
        <h1 className="mt-3 text-5xl tracking-tight text-ink">Decks</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
          Anki decks and formula PDFs. Prices below are the live list prices. Prefer a free timed mock
          first? Start at{" "}
          <Link className="font-medium text-navy underline-offset-4 hover:underline" href="/mock-exams">
            practice tests
          </Link>
          .
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link className={btnChip} href="/finance-anki-decks">
            Finance hub
          </Link>
          <Link className={btnChip} href="/building-certification-anki-decks">
            Building &amp; safety hub
          </Link>
          <Link className={btnChip} href="/language-certification-decks">
            Language hub
          </Link>
        </div>

        {groups.map((group) =>
          group.decks.length > 0 ? (
            <section
              className="mt-12 scroll-mt-24"
              id={`catalog-${group.category}`}
              key={group.category}
            >
              <h2 className="text-2xl font-semibold tracking-tight">
                {categoryLabels[group.category] ?? group.category}
              </h2>
              <div className={`mt-4 ${ledgerList}`}>
                <div className="hidden grid-cols-[1.4fr_1fr_auto_auto] gap-4 py-2 text-xs uppercase tracking-[0.14em] text-muted sm:grid">
                  <span>Title</span>
                  <span>Format</span>
                  <span>Price</span>
                  <span>Action</span>
                </div>
                {group.decks.map((deck) => (
                  <div className="grid gap-1 py-4 sm:grid-cols-[1.4fr_1fr_auto_auto] sm:items-center sm:gap-4" key={deck.slug}>
                    <Link className="text-lg text-ink hover:underline" href={`/decks/${deck.slug}`}>
                      {deck.slug === "hvac-epa-608-anki-deck" ? "EPA 608 Anki deck" : deck.shortName}
                    </Link>
                    <span className="text-sm text-muted">{formatDeckContentLabel(deck)}</span>
                    <span className="text-sm text-ink">{formatDeckPriceLabel(deck)}</span>
                    <Link className="text-sm font-semibold text-navy" href={`/decks/${deck.slug}`}>
                      Open
                    </Link>
                  </div>
                ))}
              </div>
              {group.category === "language" ? (
                <p className="mt-4 text-sm leading-6 text-[#5f5749]">
                  {RETIRED_LANGUAGE_DECKS_NOTE}:{" "}
                  <a className="underline underline-offset-2" href={PREP2GO_SHOP_URL} rel="noopener">
                    prep2go.study/shop
                  </a>
                  .
                </p>
              ) : null}
            </section>
          ) : null,
        )}
      </article>
      <SiteFooter />
    </main>
  );
}
