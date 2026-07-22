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
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

export async function generateMetadata(): Promise<Metadata> {
  const title = leafPageTitle(
    "Language Certification Anki Decks | CIPLE, DELE, DELF, TCF, NT2",
  );

  return withAiMetadata(
    finalize({
      title,
      description:
        "Twelve multi-pathway language Anki decks ($26), DELF Prim printable French flashcards for ages 7–12 ($12), plus Citizenship & Naturalization Anki Bundle for six countries ($20).",
      alternates: { canonical: "/language-certification-decks" },
      openGraph: {
        title: "Language Certification Anki Decks | UniPrep2Go",
        description: "Independent Anki flashcard decks for European language and citizenship exams.",
        url: "/language-certification-decks",
      },
    }),
    {
      aiDescription:
        "UniPrep2Go language certification products cover twelve curated multi-pathway Anki decks on Gumroad, DELF Prim printable French flashcards for ages 7–12, and a Citizenship & Naturalization Anki Bundle for Germany, France, UK, Canada, Australia, and the U.S.: CIPLE CAPLE Portuguese citizenship, DELF DALF TCF TEF French, DELE SIELE Spanish, Dutch Inburgering NT2, German Goethe telc ÖSD DTZ, Danish Prøve i Dansk PD2 PD3, Norwegian Norskprøve residence/citizenship, Swedish SFI residence/citizenship, Greek Ellinomatheia residence/citizenship, Czech CCE residence/citizenship, CELI CILS PLIDA Italian, and IELTS / TOEFL English for French Speakers.",
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
      <article
        className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12"
        id="main-content"
        tabIndex={-1}
      >
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
          Twelve multi-pathway Anki decks ($26) for CIPLE / CAPLE Portuguese, DELF / DALF / TCF / TEF
          French, DELE / SIELE Spanish (language only — not a CCSE civics bundle), Dutch Inburgering /
          NT2, German Goethe / telc / ÖSD / DTZ, Danish Prøve i Dansk, Norwegian Norskprøve, Swedish
          SFI, Greek Ellinomatheia, Czech CCE, CELI / CILS / PLIDA Italian, and IELTS / TOEFL English
          for French Speakers — plus DELF Prim printable French flashcards for ages 7–12 ($12) and a
          Citizenship &amp; Naturalization Anki Bundle for six countries ($20). We do not publish
          separate timed practice mocks for language certifications; each product page is the study
          guide + checkout.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className={btnPrimary}
            href="/ciple-a2-anki-deck-for-portuguese-citizenship"
          >
            CIPLE A2 pathway
          </Link>
          <Link className={btnSecondary} href="/comics/gaivota-em-portugal">
            Free history comic (Gaivota)
          </Link>
          <Link className={btnSecondary} href="/decks">
            Full deck catalog
          </Link>
        </div>

        <section className="mt-12 max-w-3xl" id="how-to-choose">
          <h2 className="text-2xl font-semibold tracking-tight">How to choose a language deck</h2>
          <p className="mt-4 text-base leading-8 text-[#4f493e]">
            Pick the exam body or immigration pathway you must satisfy, then buy the matching Anki
            bank — do not mix Brazilian Portuguese into CIPLE prep, or CCSE civics into a DELE-only
            purchase. Residence and citizenship language rules change; always confirm your required
            level with the official authority before you schedule. Use 15–20 new cards per day with
            audio, and keep speaking/listening practice separate from Anki.
          </p>
          <p className="mt-4 text-base leading-8 text-[#4f493e]">
            For Portuguese citizenship language evidence start with CIPLE / CAPLE. For French
            immigration vs diplomas, one French vocabulary bank covers DELF/DALF plus TCF/TEF
            pathways. French speakers preparing IELTS / TOEFL should use the English-for-French-speakers
            deck. For Scandinavian and Central European residence language, use the SFI,
            Norskprøve, Ellinomatheia, or CCE decks listed below. Kids learning DELF Prim should buy
            the printable PDF set, not the adult French Anki.
          </p>
        </section>

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

        <section className="mt-12 max-w-3xl" id="faq">
          <h2 className="text-2xl font-semibold tracking-tight">Language deck FAQ</h2>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="font-semibold tracking-tight">Are these official exam materials?</dt>
              <dd className="mt-2 text-base leading-8 text-[#4f493e]">
                No. UniPrep2Go / PixID Studio decks are independent study aids. They are not
                affiliated with CAPLE, Instituto Cervantes, France Éducation international, Goethe,
                or other exam bodies.
              </dd>
            </div>
            <div>
              <dt className="font-semibold tracking-tight">Do you sell timed language mocks?</dt>
              <dd className="mt-2 text-base leading-8 text-[#4f493e]">
                Not for these language pathways. Free timed readiness checks on UniPrep2Go focus on
                US licensing and building certifications. Language products are Anki (or printable)
                vocabulary banks with pathway-specific study guides on each deck page.
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
