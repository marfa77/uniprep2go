import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FunnelTracker, TrackedCheckoutLink } from "@/components/funnel-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { catalogAvailableDecks, categoryLabels } from "@/lib/decks";
import { formatDeckPriceLabel, getPricedDeckBySlug } from "@/lib/checkout-pricing";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return catalogAvailableDecks.map((deck) => ({ slug: deck.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const deck = await getPricedDeckBySlug(slug);

  if (!deck) {
    return { title: "Deck not found" };
  }

  return {
    title: deck.title,
    description: deck.directAnswer,
    alternates: {
      canonical: `/decks/${deck.slug}`,
    },
  };
}

export default async function DeckPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deck = await getPricedDeckBySlug(slug);

  if (!deck) {
    notFound();
  }

  const priceLabel = formatDeckPriceLabel(deck);

  const sectionEvents = [
    { selector: "#facts", name: "product_facts_view" as const },
    { selector: "#topic-matrix", name: "topic_matrix_view" as const },
    { selector: "#sample-cards", name: "sample_cards_view" as const },
    { selector: "#faq", name: "faq_view" as const },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${siteConfig.url}/decks/${deck.slug}#product`,
        name: deck.title,
        description: deck.directAnswer,
        category: categoryLabels[deck.category],
        url: `${siteConfig.url}/decks/${deck.slug}`,
        image: deck.sampleCards
          .filter((card) => card.imageUrl)
          .map((card) => absoluteUrl(card.imageUrl)),
        brand: { "@type": "Brand", name: siteConfig.name },
        offers: {
          "@type": "Offer",
          url: deck.checkoutUrl,
          availability: "https://schema.org/InStock",
          ...(deck.price.amount > 0
            ? { price: deck.price.amount, priceCurrency: deck.price.currency }
            : {}),
          seller: { "@type": "Organization", name: deck.checkoutSeller },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/decks/${deck.slug}#faq`,
        mainEntity: deck.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
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
      <FunnelTracker deckSlug={deck.slug} sectionEvents={sectionEvents} source="deck_page" />

      <article className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
          {categoryLabels[deck.category]}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {deck.title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">{deck.directAnswer}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <TrackedCheckoutLink
            className="inline-flex items-center justify-center rounded-full bg-[#18140f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
            deckSlug={deck.slug}
            href={deck.checkoutUrl}
            source="deck_page_cta"
          >
            Buy the deck — {priceLabel}
          </TrackedCheckoutLink>
          {deck.slug === "cfa-level-1-anki-deck" ? (
            <Link
              className="inline-flex items-center justify-center rounded-full border border-[#18140f]/25 px-6 py-3 text-sm font-semibold transition hover:border-[#18140f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
              href="/how-to-import-cfa-anki-deck"
            >
              How to import
            </Link>
          ) : (
            <Link
              className="inline-flex items-center justify-center rounded-full border border-[#18140f]/25 px-6 py-3 text-sm font-semibold transition hover:border-[#18140f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
              href="/#faq"
            >
              Import guide
            </Link>
          )}
        </div>

        <section id="facts" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Product facts</h2>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-3xl border border-[#18140f]/15 bg-[#18140f]/10 sm:grid-cols-2">
            {[
              ["Cards", deck.facts.cards],
              ["Coverage", deck.facts.topics],
              ["Format", deck.format],
              ["Price", priceLabel],
              ["Checkout", deck.checkoutProvider],
              ["Exam cycle", deck.facts.examYear],
              ["Delivery", deck.facts.delivery],
            ].map(([label, value]) => (
              <div className="bg-[#fffaf0] px-5 py-4" key={label}>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
                  {label}
                </dt>
                <dd className="mt-2 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {deck.topicCoverage.length > 0 ? (
          <section id="topic-matrix" className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">Coverage by exam topic</h2>
            <div className="mt-4 overflow-x-auto rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#18140f]/15 font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
                    <th className="px-5 py-4 font-medium">Topic</th>
                    <th className="px-5 py-4 font-medium">Exam weight</th>
                    <th className="px-5 py-4 font-medium">Cards</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#18140f]/10">
                  {deck.topicCoverage.map((topic) => (
                    <tr key={topic.name}>
                      <td className="px-5 py-4 font-medium">{topic.name}</td>
                      <td className="px-5 py-4 text-[#4f493e]">{topic.examWeight}</td>
                      <td className="px-5 py-4 text-[#4f493e]">{topic.cards}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {deck.sampleCards.length > 0 ? (
          <section id="sample-cards" className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">Sample cards</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3 sm:items-start">
              {deck.sampleCards.map((card) => (
                <article
                  className="overflow-hidden rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]"
                  key={`${card.question}-${card.imageUrl}-${card.audioUrl ?? ""}`}
                >
                  {card.imageUrl ? (
                    <div className="bg-[#f6efe8]">
                      <Image
                        alt={`Sample Anki card: ${card.question}`}
                        className="h-auto w-full"
                        height={550}
                        sizes="(max-width: 640px) 100vw, 33vw"
                        src={card.imageUrl}
                        width={976}
                      />
                    </div>
                  ) : (
                    <div className="flex min-h-48 items-center justify-center bg-gradient-to-br from-[#f4dccf] via-[#fff8f0] to-[#f6efe8] px-6 py-10 text-center">
                      <p className="text-2xl font-semibold text-[#18140f]">{card.question}</p>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-semibold">{card.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5f5749]">{card.answer}</p>
                    {card.audioUrl ? (
                      <audio controls preload="metadata" src={card.audioUrl} className="mt-4 h-10 w-full">
                        Your browser does not support the audio element.
                      </audio>
                    ) : null}
                    {card.audioUrlEs ? (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a7d68]">
                          Spanish audio
                        </p>
                        <audio controls preload="metadata" src={card.audioUrlEs} className="h-10 w-full">
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    ) : null}
                    {card.audioUrlIt ? (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a7d68]">
                          Italian audio
                        </p>
                        <audio controls preload="metadata" src={card.audioUrlIt} className="h-10 w-full">
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section id="faq" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-4 divide-y divide-[#18140f]/10 rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
            {deck.faqs.map((faq) => (
              <article className="p-5" key={faq.question}>
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 leading-7 text-[#5f5749]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 flex flex-wrap gap-4 text-sm font-medium">
          {deck.slug === "cfa-level-1-anki-deck" ? (
            <Link
              className="underline decoration-[#18140f]/20 underline-offset-4"
              href="/cfa-level-1-anki-deck-vs-curriculum"
            >
              Deck vs official curriculum
            </Link>
          ) : null}
          <Link className="underline decoration-[#18140f]/20 underline-offset-4" href="/">
            Full catalog
          </Link>
          <a className="underline decoration-[#18140f]/20 underline-offset-4" href={`/${deck.slug}.md`}>
            Machine-readable document
          </a>
          <a className="underline decoration-[#18140f]/20 underline-offset-4" href={`/api/facts/${deck.slug}`}>
            Product facts (JSON)
          </a>
        </section>

        <p className="mt-10 text-xs text-[#8a7d68]">Last updated {deck.lastUpdated}.</p>
      </article>

      <SiteFooter />
    </main>
  );
}
