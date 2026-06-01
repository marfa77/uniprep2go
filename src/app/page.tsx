import Link from "next/link";
import { FunnelTracker, TrackedCheckoutLink } from "@/components/funnel-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDeckPriceLabel, getPricedDecks, getPricedDecksByCategory, getFeaturedPricedDecks } from "@/lib/checkout-pricing";
import {
  categoryLabels,
  categoryOrder,
  primaryDeck,
  siteFaqs,
} from "@/lib/decks";
import { buildCatalogItemListJsonLd } from "@/lib/product-jsonld";
import { absoluteUrl, siteConfig } from "@/lib/site";

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
          "@type": "Organization",
          name: siteConfig.name,
        },
      },
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
        <section className="border-b border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
              Anki deck catalog
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              Exam prep, languages, and professional decks — one catalog
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
              {siteConfig.name} publishes {availableDecks.length} independent
              Anki flashcard decks across {categoryOrder.length} categories.
              Download .apkg files from Gumroad or Lemon Squeezy and import
              into Anki on desktop, mobile, or web.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Browse catalog
              </a>
              <a
                href={siteConfig.lemonSqueezyStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Prep2Go store
              </a>
            </div>
            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <dt className="text-sm text-zinc-500">Decks</dt>
                <dd className="mt-1 text-2xl font-semibold text-zinc-900">
                  {availableDecks.length}
                </dd>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <dt className="text-sm text-zinc-500">Categories</dt>
                <dd className="mt-1 text-2xl font-semibold text-zinc-900">
                  {categoryOrder.length}
                </dd>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <dt className="text-sm text-zinc-500">Price range</dt>
                <dd className="mt-1 text-2xl font-semibold text-zinc-900">
                  {minPrice > 0 ? `$${minPrice}–$${maxPrice}` : "See checkout"}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {featuredDecks.length > 0 && (
          <section className="border-b border-zinc-200">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
              <h2 className="text-2xl font-semibold text-zinc-900">
                Featured decks
              </h2>
              <p className="mt-2 text-zinc-600">
                Popular picks across language, finance, and professional
                training.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredDecks.map((deck) => (
                  <article
                    key={deck.slug}
                    className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                      {categoryLabels[deck.category]}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                      <Link
                        href={`/decks/${deck.slug}`}
                        className="hover:underline"
                      >
                        {deck.title}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                      {deck.directAnswer}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="font-medium text-zinc-900">
                        {formatDeckPriceLabel(deck)} · {deck.facts.cards} cards
                      </span>
                      <Link
                        href={`/decks/${deck.slug}`}
                        className="font-medium text-zinc-900 underline-offset-2 hover:underline"
                      >
                        View deck
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="catalog" className="border-b border-zinc-200">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Full catalog
            </h2>
            <p className="mt-2 text-zinc-600">
              All decks grouped by category. Each product page includes sample
              cards, FAQ, and machine-readable facts for AI systems.
            </p>
            <div className="mt-10 space-y-12">
              {catalogGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {group.label}
                  </h3>
                  <ul className="mt-4 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
                    {group.decks.map((deck) => (
                      <li
                        key={deck.slug}
                        className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <Link
                            href={`/decks/${deck.slug}`}
                            className="font-medium text-zinc-900 hover:underline"
                          >
                            {deck.title}
                          </Link>
                          <p className="mt-1 text-sm text-zinc-600">
                            {deck.facts.cards} cards · {deck.facts.examYear} · {deck.checkoutProvider}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-4 text-sm">
                          <span className="font-medium text-zinc-900">
                            {formatDeckPriceLabel(deck)}
                          </span>
                          <Link
                            href={`/decks/${deck.slug}`}
                            className="text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline"
                          >
                            Details
                          </Link>
                          <TrackedCheckoutLink
                            className="font-medium text-zinc-900 underline-offset-2 hover:underline"
                            deckSlug={deck.slug}
                            href={deck.checkoutUrl}
                            source="catalog_buy"
                          >
                            Buy
                          </TrackedCheckoutLink>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="llm-sources" className="border-b border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Machine-readable sources
            </h2>
            <p className="mt-2 text-zinc-600">
              Structured data for search engines, assistants, and RAG
              pipelines.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>
                <Link
                  href="/api/facts"
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline"
                >
                  /api/facts
                </Link>{" "}
                — full catalog JSON
              </li>
              <li>
                <a
                  href="/llms.txt"
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline"
                >
                  /llms.txt
                </a>{" "}
                — LLM entrypoint with agent instructions
              </li>
              <li>
                <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs">
                  /[slug].md
                </code>{" "}
                — per-deck markdown for RAG (e.g.{" "}
                <a
                  href="/cfa-level-1-anki-deck.md"
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline"
                >
                  cfa-level-1-anki-deck.md
                </a>
                )
              </li>
            </ul>
          </div>
        </section>

        <section id="faq" className="border-b border-zinc-200">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-semibold text-zinc-900">FAQ</h2>
            <dl className="mt-8 space-y-6">
              {siteFaqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-medium text-zinc-900">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-zinc-600">
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
