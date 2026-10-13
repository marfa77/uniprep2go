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
import { PREP2GO_SHOP_URL, RETIRED_LANGUAGE_DECKS_NOTE } from "@/lib/retired-language-decks";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

export async function generateMetadata(): Promise<Metadata> {
  const title = leafPageTitle("Citizenship & Language Anki Decks");

  return withAiMetadata(
    finalize({
      title,
      description:
        "Country citizenship civics Anki decks and DELF Prim printable French flashcards for ages 7–12. Language-exam Anki decks (CIPLE, DELE, DELF, CELI, Inburgering, IELTS / TOEFL English) are sold on Prep2Go.",
      alternates: { canonical: "/language-certification-decks" },
      openGraph: {
        title: "Citizenship & Language Anki Decks | UniPrep2Go",
        description: "Independent citizenship civics Anki decks; language-exam decks are sold on Prep2Go.",
        url: "/language-certification-decks",
      },
    }),
    {
      aiDescription:
        "UniPrep2Go lists country citizenship civics Anki decks (one country per product) and DELF Prim printable French flashcards for ages 7–12. Language-exam Anki decks — CIPLE, DELE, DELF, CELI, DTZ, Inburgering, Scandinavian, Greek, Czech, Polish, and IELTS / TOEFL English-for-X — are sold on Prep2Go (https://www.prep2go.study/shop), not on UniPrep2Go.",
      aiCategory: "Language exam prep hub",
      path: "/language-certification-decks",
      linkLlmsCatalog: true,
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
        name: "Citizenship & Language Anki Decks",
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
      <article
        className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12"
        id="main-content"
        tabIndex={-1}
      >
        <LlmFactsStrip
          hubName="citizenship & language hub"
          hubPath="/language-certification-decks"
          pathwayCount={languageDecks.length}
          variant="hub"
        />
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Language &amp; immigration</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Citizenship &amp; language Anki decks
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">
          UniPrep2Go lists country citizenship civics Anki decks — each paired with a free timed
          readiness check — plus DELF Prim printable French flashcards for ages 7–12.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#4f493e]">
          {RETIRED_LANGUAGE_DECKS_NOTE}:{" "}
          <a
            className="font-medium text-[#1f3a5f] underline underline-offset-4"
            href={PREP2GO_SHOP_URL}
            rel="noopener"
          >
            prep2go.study/shop
          </a>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className={btnPrimary} href={PREP2GO_SHOP_URL} rel="noopener">
            Language-exam decks on Prep2Go
          </a>
          <Link className={btnSecondary} href="/language-exam-vs-citizenship-civics-anki">
            Language vs civics
          </Link>
          <Link className={btnSecondary} href="/which-citizenship-anki-deck">
            Which citizenship Anki?
          </Link>
          <Link className={btnSecondary} href="/decks">
            Full deck catalog
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">All decks on this hub ({languageDecks.length})</h2>
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

        <section className="mt-12 max-w-3xl" id="faq">
          <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="font-semibold tracking-tight">Are these official exam materials?</dt>
              <dd className="mt-2 text-base leading-8 text-[#4f493e]">
                No. UniPrep2Go / PixID Studio decks are independent study aids. They are not
                affiliated with any government, immigration authority, or exam body.
              </dd>
            </div>
            <div>
              <dt className="font-semibold tracking-tight">Where are the CIPLE, DELE, DELF, and IELTS decks?</dt>
              <dd className="mt-2 text-base leading-8 text-[#4f493e]">
                Language-exam Anki decks moved to Prep2Go. Old UniPrep2Go deck links redirect to the
                matching Prep2Go page; browse the full lineup at{" "}
                <a className="underline underline-offset-2" href={PREP2GO_SHOP_URL} rel="noopener">
                  prep2go.study/shop
                </a>
                .
              </dd>
            </div>
            <div>
              <dt className="font-semibold tracking-tight">
                What is the Citizenship &amp; Naturalization bundle?
              </dt>
              <dd className="mt-2 text-base leading-8 text-[#4f493e]">
                A $20 Gumroad download with six separate civics \`.apkg\` files for Germany, France,
                the UK, Canada, Australia, and the U.S. — text-first recall, not language media
                decks.
              </dd>
            </div>
          </dl>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
