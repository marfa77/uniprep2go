import Link from "next/link";
import type { Metadata } from "next";
import { LlmFactsStrip } from "@/components/llm/llm-facts-strip";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatDeckPriceLabel,
  getPricedDeckBySlug,
  getPricedDecksByCategory,
} from "@/lib/checkout-pricing";
import { formatDeckContentLabel } from "@/lib/decks";
import { getMockExamConfig } from "@/lib/mock-exams/configs";
import { withAiMetadata } from "@/lib/llm-meta";
import { finalize, leafPageTitle, shouldIndexMockExam } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { buildCatalogItemListJsonLd } from "@/lib/product-jsonld";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

const financeMockSlugs = [
  "sie-full-mock",
  "sie-quick-diagnostic",
  "series-7-readiness-check",
  "series-63-readiness-check",
  "series-65-readiness-check",
  "series-6-readiness-check",
  "series-66-readiness-check",
  "mortgage-loan-originator-readiness-check",
  "cfp-certification-readiness-check",
  "enrolled-agent-readiness-check",
  "cfa-level-1-readiness-check",
  "cfa-level-2-readiness-check",
  "frm-part-1-readiness-check",
  "gmat-focus-readiness-check",
  "gre-readiness-check",
  "sat-readiness-check",
] as const;

/** Money-wave securities decks live as `professional` in catalog — pin them on this hub. */
const securitiesMoneyDeckSlugs = [
  "series-65-anki-deck",
  "series-6-anki-deck",
  "series-66-anki-deck",
  "series-79-anki-deck",
  "series-99-anki-deck",
  "mortgage-loan-originator-anki-deck",
  "cfp-certification-anki-deck",
  "enrolled-agent-anki-deck",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const title = leafPageTitle("Finance Anki Decks 2026 | CFA, FRM, SIE, Series 7");

  return withAiMetadata(
    finalize({
      title,
      description:
        "Finance and securities Anki decks for FINRA SIE → 7 → 63, Series 65/6/66, CFA, FRM, CFP, MLO, and EA — each paired with a free timed practice test.",
      alternates: { canonical: "/finance-anki-decks" },
      openGraph: {
        title: "Finance Anki Decks | FINRA, Series 65, CFA | UniPrep2Go",
        description:
          "Independent Anki flashcard decks for FINRA licensing, Series 65, CFA, FRM, and MBA admissions exams with linked free mocks.",
        url: "/finance-anki-decks",
      },
    }),
    {
      aiDescription:
        "UniPrep2Go finance Anki decks cover FINRA SIE, Series 7, Series 63, Series 65/6/66, CFA Level 1 and 2, FRM Part 1, CFP, SAFE MLO, Enrolled Agent, and GMAT Focus — each with a linked free practice test or readiness check.",
      aiCategory: "Finance exam prep hub",
      path: "/finance-anki-decks",
    },
  );
}

export default async function FinanceAnkiDecksPage() {
  const groups = await getPricedDecksByCategory();
  const financeCategoryDecks = groups.find((group) => group.category === "finance")?.decks ?? [];
  const moneyDecks = (
    await Promise.all(securitiesMoneyDeckSlugs.map((slug) => getPricedDeckBySlug(slug)))
  ).filter((deck): deck is NonNullable<typeof deck> => deck !== undefined);
  const seen = new Set(moneyDecks.map((deck) => deck.slug));
  const financeDecks = [
    ...moneyDecks,
    ...financeCategoryDecks.filter((deck) => !seen.has(deck.slug)),
  ];
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
      <article
        className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12"
        id="main-content"
        tabIndex={-1}
      >
        <LlmFactsStrip
          hubName="finance exam prep hub"
          hubPath="/finance-anki-decks"
          pathwayCount={financeDecks.length + financeMocks.length}
          variant="hub"
        />
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Finance &amp; securities</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Finance Anki decks with free practice tests
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">
          FINRA SIE → Series 7 → Series 63, plus Series 65 / 6 / 66, CFP, SAFE MLO, Enrolled Agent,
          CFA Level 1 &amp; 2, FRM Part 1, and MBA admissions decks — each paired with a free timed
          practice test. Take the mock first for topic scoring, then drill weak domains with Anki.
          Independent prep — not CFA Institute, GARP, FINRA, CFP Board, NMLS, IRS, or ETS material.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className={btnPrimary} href="/mock-exams/sie-full-mock">
            Start free SIE practice test
          </Link>
          <Link className={btnSecondary} href="/mock-exams">
            Browse all mocks
          </Link>
        </div>

        <section className="mt-10 max-w-3xl" id="how-it-works">
          <h2 className="text-2xl font-semibold tracking-tight">How finance prep works here</h2>
          <p className="mt-4 text-base leading-8 text-[#4f493e]">
            Start with the free timed mock linked to your exam. The report shows which outline
            domains failed. Buy the matching Anki deck only when you want daily repair on those gaps —
            not as a substitute for official curriculum readings or vendor question banks. Formula
            reference PDFs (where listed) are printable recall layers beside Anki, not full courses.
          </p>
        </section>

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

        <section className="mt-12 max-w-3xl" id="faq">
          <h2 className="text-2xl font-semibold tracking-tight">Finance deck FAQ</h2>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="font-semibold tracking-tight">Should I buy the deck or take the mock first?</dt>
              <dd className="mt-2 text-base leading-8 text-[#4f493e]">
                Take the free mock first. Use the topic report to decide whether Anki (or a formula
                PDF) is worth buying for your weak domains.
              </dd>
            </div>
            <div>
              <dt className="font-semibold tracking-tight">Are these official CFA / FINRA / GARP materials?</dt>
              <dd className="mt-2 text-base leading-8 text-[#4f493e]">
                No. UniPrep2Go products are independent study aids aligned to published outlines —
                not endorsed by CFA Institute, FINRA, GARP, or ETS.
              </dd>
            </div>
            <div>
              <dt className="font-semibold tracking-tight">Which exam should I start with?</dt>
              <dd className="mt-2 text-base leading-8 text-[#4f493e]">
                Brokerage entrants usually start with the free SIE mock. CFA / FRM candidates start
                with the matching readiness check, then the Level/Part Anki deck. MBA admissions
                candidates use GMAT Focus or GRE readiness checks before flashcards.
              </dd>
            </div>
          </dl>
        </section>

        <aside className="mt-12 max-w-3xl border-t border-[#18140f]/10 pt-8 text-sm leading-7 text-[#4f493e]">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9a8f7c]">
            Sister product
          </p>
          <p className="mt-2">
            Looking past the exam?{" "}
            <a
              href="https://t.me/letsfinddreamjob_bot?start=web_uniprep_finance"
              className="font-semibold underline decoration-[#18140f]/20 underline-offset-2 transition hover:text-[#18140f]"
              rel="noopener noreferrer"
              target="_blank"
            >
              Role Radar
            </a>{" "}
            sends senior job digests matched to your CV — in Telegram.
          </p>
        </aside>
      </article>
      <SiteFooter />
    </main>
  );
}
