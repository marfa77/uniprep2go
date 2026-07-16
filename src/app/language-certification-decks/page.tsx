import Link from "next/link";
import type { Metadata } from "next";
import { LlmFactsStrip } from "@/components/llm/llm-facts-strip";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatDeckPriceLabel,
  getPricedDecksByCategory,
} from "@/lib/checkout-pricing";
import { formatDeckContentLabel } from "@/lib/decks";
import { withAiMetadata } from "@/lib/llm-meta";
import { finalize, leafPageTitle } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { buildCatalogItemListJsonLd } from "@/lib/product-jsonld";

export async function generateMetadata(): Promise<Metadata> {
  const title = leafPageTitle("Language Certification Anki Decks | CIPLE, DELF, Dutch A2");

  return withAiMetadata(
    finalize({
      title,
      description:
        "22 language certification Anki decks for CIPLE A2, DELF B2, Dutch Inburgering, German, Italian, and more — European Portuguese, French, and immigration exam prep.",
      alternates: { canonical: "/language-certification-decks" },
      openGraph: {
        title: "Language Certification Anki Decks | UniPrep2Go",
        description: "Independent Anki flashcard decks for European language and citizenship exams.",
        url: "/language-certification-decks",
      },
    }),
    {
      aiDescription:
        "UniPrep2Go language certification decks cover CIPLE A2 European Portuguese, DELF B2 French, Dutch A2 Inburgering, German, Italian, Spanish, and 22 total language exam flashcard products.",
      aiCategory: "Language exam prep hub",
      path: "/language-certification-decks",
    },
  );
}

export default async function LanguageCertificationDecksPage() {
  const groups = await getPricedDecksByCategory();
  const languageDecks = groups.find((group) => group.category === "language")?.decks ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/language-certification-decks")}#webpage`,
        name: "Language Certification Anki Decks",
        url: absoluteUrl("/language-certification-decks"),
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
      buildCatalogItemListJsonLd(languageDecks),
    ],
  };

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <article className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12">
        <LlmFactsStrip
          hubName="language certification hub"
          hubPath="/language-certification-decks"
          pathwayCount={languageDecks.length}
          variant="hub"
        />
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Language &amp; immigration</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Language certification Anki decks
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">
          European Portuguese, French, Dutch, German, Italian, and more — daily spaced-repetition flashcards for A2–B2 exams and inburgering pathways. Language decks are Anki-only; we do not publish separate timed practice mocks for language certifications.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">All language decks ({languageDecks.length})</h2>
          <ul className="mt-5 space-y-3">
            {languageDecks.map((deck) => (
              <li key={deck.slug}>
                <Link
                  className="block rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] p-4 hover:border-[#1f3a5f]/30"
                  href={`/decks/${deck.slug}`}
                >
                  <span className="font-semibold">{deck.title}</span>
                  <span className="mt-1 block text-sm text-[#5f5749]">
                    {formatDeckContentLabel(deck)} · {formatDeckPriceLabel(deck)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
