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
import { btnChip } from "@/lib/ui-button-classes";
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
        "UniPrep2Go deck catalog: Anki flashcards and PDFs for US licensing, finance credentials, building certifications, citizenship civics, and Prep2Go Immigration apps. Language-exam Anki decks are sold on Prep2Go.",
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
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Catalog</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Anki decks &amp; exam prep
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">
          All available UniPrep2Go study products — flashcard decks and PDFs for US licensing,
          finance, building certifications, citizenship tests, and more. Prefer a free timed mock
          first? Start at{" "}
          <Link className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline" href="/mock-exams">
            free practice tests
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
              <ul className="mt-5 space-y-3">
                {group.decks.map((deck) => (
                  <li key={deck.slug}>
                    <Link
                      className="block rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] p-4 hover:border-[#1f3a5f]/30"
                      href={`/decks/${deck.slug}`}
                    >
                      <span className="font-semibold">
                        {deck.slug === "hvac-epa-608-anki-deck"
                          ? "EPA 608 Anki deck"
                          : deck.shortName}
                      </span>
                      <span className="mt-1 block text-sm text-[#5f5749]">
                        {formatDeckContentLabel(deck)} · {formatDeckPriceLabel(deck)}
                      </span>
                    </Link>
                  </li>
                ))}

              </ul>
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
