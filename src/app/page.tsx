import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FunnelTracker, TrackedCheckoutLink } from "@/components/funnel-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDeckPriceLabel, getCheckoutActionLabel, getFeaturedPricedDecks, getPricedDecks, getPricedDecksByCategory } from "@/lib/checkout-pricing";
import { getDeckCoverUrl } from "@/lib/deck-media";
import {
  categoryLabels,
  categoryOrder,
  primaryDeck,
  siteFaqs,
} from "@/lib/decks";
import { buildCatalogItemListJsonLd, buildSiteOrganizationJsonLd } from "@/lib/product-jsonld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "US Exam Prep Anki Decks | FINRA, Insurance, Real Estate, CFA | UniPrep2Go",
  description:
    "US-first Anki deck catalog for FINRA SIE, Series 7, Series 63, insurance licensing, California real estate, CFA, FRM, and language certification prep.",
  keywords: [
    "US exam prep Anki decks",
    "FINRA SIE Anki deck",
    "Series 7 Anki deck",
    "Series 63 Anki deck",
    "insurance licensing exam flashcards",
    "California real estate exam flashcards",
    "CFA Anki deck",
    "FRM Anki deck",
  ],
  openGraph: {
    title: "US exam prep Anki decks for licensing and finance credentials",
    description:
      "Independent Anki decks for FINRA, insurance, real estate, CFA, FRM, and language certification review.",
    images: [
      {
        url: "/home/hero.webp",
        width: 1536,
        height: 1024,
        alt: "UniPrep2Go independent Anki flashcard decks for exam prep",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/home/hero.webp"],
  },
};

export const revalidate = 3600;

export default async function HomePage() {
  const availableDecks = await getPricedDecks();
  const featuredDecks = await getFeaturedPricedDecks();
  const featuredSlugs = new Set(featuredDecks.map((deck) => deck.slug));
  const catalogGroups = (await getPricedDecksByCategory())
    .map((group) => ({
      ...group,
      decks: group.decks.filter((deck) => !featuredSlugs.has(deck.slug)),
    }))
    .filter((group) => group.decks.length > 0);
  const prices = availableDecks.map((d) => d.price.amount).filter((amount) => amount > 0);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const sectionEvents = [
    { selector: "#catalog", name: "catalog_view" as const },
    { selector: "#faq", name: "faq_view" as const },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      buildSiteOrganizationJsonLd(),
      buildCatalogItemListJsonLd(availableDecks),
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
        deckSlug={primaryDeck.slug}
        sectionEvents={sectionEvents}
        source="home"
      />
      <main>
        <section className="border-b border-[#18140f]/10 bg-[#f7f3ea]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:py-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
                US exam prep Anki catalog
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-[#18140f] sm:text-5xl">
                US licensing exams, finance credentials, and language decks — one catalog
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#4f493e]">
                {siteConfig.name} is US-first: FINRA SIE, Series 7, Series 63,
                insurance licensing, California real estate, CFA, and FRM review
                sit at the front of the catalog, with language certification
                decks kept for long-tail search and global learners.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#catalog"
                  className="inline-flex items-center rounded-full bg-[#18140f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
                >
                  Browse catalog
                </a>
                <a
                  href={siteConfig.lemonSqueezyStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-[#18140f]/20 bg-[#fffaf0]/70 px-6 py-3 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f]"
                >
                  Prep2Go store
                </a>
              </div>
              <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70 p-4">
                  <dt className="text-sm text-[#7a6e5a]">US-first catalog</dt>
                  <dd className="mt-1 text-2xl font-semibold text-[#18140f]">
                    FINRA + licensing
                  </dd>
                </div>
                <div className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70 p-4">
                  <dt className="text-sm text-[#7a6e5a]">Total decks</dt>
                  <dd className="mt-1 text-2xl font-semibold text-[#18140f]">
                    {availableDecks.length}
                  </dd>
                </div>
                <div className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70 p-4">
                  <dt className="text-sm text-[#7a6e5a]">Price range</dt>
                  <dd className="mt-1 text-2xl font-semibold text-[#18140f]">
                    {minPrice > 0 ? `$${minPrice}–$${maxPrice}` : "See checkout"}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#18140f]/10 bg-[#fffaf0] shadow-[0_24px_60px_-32px_rgba(24,20,15,0.35)]">
              <Image
                alt="Stack of premium Anki flashcards on a warm study desk"
                className="h-auto w-full object-cover"
                height={1024}
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                src="/home/hero.webp"
                width={1536}
              />
            </div>
          </div>
        </section>

        {featuredDecks.length > 0 && (
          <section className="border-b border-[#18140f]/10 bg-[#fffaf0]/40">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
              <h2 className="text-2xl font-semibold tracking-tight text-[#18140f]">
                Featured decks
              </h2>
              <p className="mt-2 text-[#4f493e]">
                Popular picks for US licensing, finance credentials, and
                professional training.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredDecks.map((deck) => {
                  const thumbnail = getDeckCoverUrl(deck);

                  return (
                    <article
                      key={deck.slug}
                      className="overflow-hidden rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]"
                    >
                      {thumbnail ? (
                        <Link
                          className="block overflow-hidden bg-[#f6efe8]"
                          href={`/decks/${deck.slug}`}
                        >
                          <Image
                            alt={`${deck.shortName} product cover`}
                            className="aspect-[4/3] h-auto w-full object-cover object-top"
                            height={750}
                            sizes="(max-width: 640px) 100vw, 33vw"
                            src={thumbnail}
                            width={1005}
                          />
                        </Link>
                      ) : null}
                      <div className="flex flex-col p-5">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">
                          {categoryLabels[deck.category]}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-[#18140f]">
                          <Link
                            href={`/decks/${deck.slug}`}
                            className="hover:underline"
                          >
                            {deck.title}
                          </Link>
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-6 text-[#5f5749] line-clamp-4">
                          {deck.directAnswer}
                        </p>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span className="font-medium text-[#18140f]">
                            {formatDeckPriceLabel(deck)} · {deck.facts.cards} cards
                          </span>
                          <Link
                            href={`/decks/${deck.slug}`}
                            className="font-medium text-[#1f3a5f] underline-offset-2 hover:underline"
                          >
                            View deck
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section id="catalog" className="border-b border-[#18140f]/10">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
            <h2 className="text-2xl font-semibold tracking-tight text-[#18140f]">
              Full catalog
            </h2>
            <p className="mt-2 text-[#4f493e]">
              US licensing and finance exams are prioritized first. Language
              certification decks remain available as long-tail catalog pages
              with sample cards, FAQ, and machine-readable facts for AI systems.
            </p>
            <div className="mt-10 space-y-12">
              {catalogGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-lg font-semibold text-[#18140f]">
                    {group.label}
                  </h3>
                  <ul className="mt-4 divide-y divide-[#18140f]/10 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70">
                    {group.decks.map((deck) => {
                      const thumbnail = getDeckCoverUrl(deck);

                      return (
                        <li
                          key={deck.slug}
                          className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex min-w-0 items-start gap-4">
                            {thumbnail ? (
                              <Link
                                className="shrink-0 overflow-hidden rounded-2xl border border-[#18140f]/10 bg-[#f6efe8]"
                                href={`/decks/${deck.slug}`}
                              >
                                <Image
                                  alt=""
                                  aria-hidden
                                  className="h-16 w-28 object-cover object-top"
                                  height={64}
                                  src={thumbnail}
                                  width={112}
                                />
                              </Link>
                            ) : null}
                            <div className="min-w-0">
                              <Link
                                href={`/decks/${deck.slug}`}
                                className="font-medium text-[#18140f] hover:underline"
                              >
                                {deck.title}
                              </Link>
                              <p className="mt-1 text-sm text-[#5f5749]">
                                {deck.facts.cards} cards · {deck.facts.examYear} · {deck.checkoutProvider}
                              </p>
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-4 text-sm sm:pl-0">
                            <span className="font-medium text-[#18140f]">
                              {formatDeckPriceLabel(deck)}
                            </span>
                            <Link
                              href={`/decks/${deck.slug}`}
                              className="text-[#5f5749] underline-offset-2 hover:text-[#18140f] hover:underline"
                            >
                              Details
                            </Link>
                            <TrackedCheckoutLink
                              className="font-medium text-[#1f3a5f] underline-offset-2 hover:underline"
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
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="llm-sources" className="border-b border-[#18140f]/10 bg-[#f7f3ea]">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
            <h2 className="text-2xl font-semibold tracking-tight text-[#18140f]">
              Machine-readable sources
            </h2>
            <p className="mt-2 text-[#4f493e]">
              Structured data for search engines, assistants, and RAG
              pipelines.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-[#5f5749]">
              <li>
                <Link
                  href="/api/facts"
                  className="font-medium text-[#18140f] underline-offset-2 hover:underline"
                >
                  /api/facts
                </Link>{" "}
                — full catalog JSON
              </li>
              <li>
                <a
                  href="/llms.txt"
                  className="font-medium text-[#18140f] underline-offset-2 hover:underline"
                >
                  /llms.txt
                </a>{" "}
                — LLM entrypoint with agent instructions
              </li>
              <li>
                <code className="rounded bg-[#18140f]/5 px-1.5 py-0.5 text-xs">
                  /[slug].md
                </code>{" "}
                — per-deck markdown for RAG (e.g.{" "}
                <a
                  href="/cfa-level-1-anki-deck.md"
                  className="font-medium text-[#18140f] underline-offset-2 hover:underline"
                >
                  cfa-level-1-anki-deck.md
                </a>
                )
              </li>
            </ul>
          </div>
        </section>

        <section id="faq" className="border-b border-[#18140f]/10">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
            <h2 className="text-2xl font-semibold tracking-tight text-[#18140f]">FAQ</h2>
            <dl className="mt-8 space-y-6">
              {siteFaqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-medium text-[#18140f]">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-7 text-[#5f5749]">
                    {faq.answer}
                  </dd>
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
