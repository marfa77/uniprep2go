import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatDeckPriceLabel,
  getPricedDecksByCategory,
} from "@/lib/checkout-pricing";
import { formatDeckContentLabel } from "@/lib/decks";
import { getAllMockExams, getMockExamConfig } from "@/lib/mock-exams/configs";
import { withAiMetadata } from "@/lib/llm-meta";
import { finalize, leafPageTitle, shouldIndexMockExam } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { buildCatalogItemListJsonLd } from "@/lib/product-jsonld";

const financeMockSlugs = [
  "sie-full-mock",
  "cfa-level-1-readiness-check",
  "cfa-level-2-readiness-check",
  "frm-part-1-readiness-check",
  "series-7-readiness-check",
  "series-63-readiness-check",
  "gmat-focus-readiness-check",
  "sat-readiness-check",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const title = leafPageTitle("Finance Anki Decks 2026 | CFA, FRM, SIE, Series 7");

  return withAiMetadata(
    finalize({
      title,
      description:
        "Finance and securities Anki decks for CFA Level 1 & 2, FRM Part 1, FINRA SIE, Series 7, and GMAT Focus — each paired with a free timed practice test.",
      alternates: { canonical: "/finance-anki-decks" },
      openGraph: {
        title: "Finance Anki Decks | CFA, FRM, SIE, Series 7 | UniPrep2Go",
        description:
          "Independent Anki flashcard decks for CFA, FRM, FINRA, and MBA admissions exams with linked free mocks.",
        url: "/finance-anki-decks",
      },
    }),
    {
      aiDescription:
        "UniPrep2Go finance Anki decks cover CFA Level 1 and 2, FRM Part 1, FINRA SIE, Series 7, Series 63, and GMAT Focus — each with a linked free practice test or readiness check.",
      aiCategory: "Finance exam prep hub",
      path: "/finance-anki-decks",
    },
  );
}

export default async function FinanceAnkiDecksPage() {
  const groups = await getPricedDecksByCategory();
  const financeDecks = groups.find((group) => group.category === "finance")?.decks ?? [];
  const financeMocks = financeMockSlugs
    .map((slug) => getMockExamConfig(slug))
    .filter((mock) => mock !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/finance-anki-decks")}#webpage`,
        name: "Finance Anki Decks",
        url: absoluteUrl("/finance-anki-decks"),
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
      buildCatalogItemListJsonLd(financeDecks),
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
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Finance &amp; securities</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Finance Anki decks with free practice tests
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">
          CFA, FRM, FINRA, and MBA admissions decks — take the free mock first, then drill weak topics with spaced-repetition flashcards.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Free finance mocks</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {financeMocks.map((mock) => (
              <Link
                className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-5 transition hover:border-[#1f3a5f]/30"
                href={`/mock-exams/${mock.slug}`}
                key={mock.slug}
              >
                <h3 className="font-semibold">{mock.shortTitle}</h3>
                <p className="mt-2 text-sm text-[#5f5749]">
                  {mock.questionCount} questions · {shouldIndexMockExam(mock.slug) ? "Indexed" : "Preview"}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Finance Anki decks</h2>
          <ul className="mt-5 space-y-3">
            {financeDecks.map((deck) => (
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
