import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FunnelTracker, TrackedCheckoutLink } from "@/components/funnel-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { catalogAvailableDecks, categoryLabels } from "@/lib/decks";
import { formatDeckPriceLabel, getPricedDeckBySlug } from "@/lib/checkout-pricing";
import { getDeckCoverUrl } from "@/lib/deck-media";
import { buildDeckPageJsonLd } from "@/lib/product-jsonld";
import { getAllMockExams } from "@/lib/mock-exams/configs";
import { buildMockSeoTitle } from "@/lib/mock-exams/seo";

export const revalidate = 3600;

function buildDeckSeoTitle(deck: Awaited<ReturnType<typeof getPricedDeckBySlug>>) {
  if (!deck) {
    return "Deck not found";
  }

  const year = deck.facts.examYear.includes("2026") ? "2026 " : "";

  if (deck.slug === "cfa-level-1-anki-deck") {
    return "2026 CFA Level 1 Anki Deck | 342+ Formula Flashcards";
  }

  if (deck.slug === "frm-part-1-anki-deck") {
    return "2026 FRM Part 1 Anki Deck | 444 Formula Flashcards";
  }

  if (deck.slug === "sie-exam-anki-deck") {
    return "2026 SIE Exam Anki Deck | 300 Cards + Free Practice Test";
  }

  if (deck.slug === "servsafe-manager-anki-deck") {
    return "ServSafe Manager Anki Deck | 300 Cards + Free Practice Test";
  }

  if (deck.slug === "servsafe-manager-complete-study-guide") {
    return "ServSafe Manager Study Guide PDF | 70 Practice Questions";
  }

  if (deck.slug === "series-7-anki-deck") {
    return "2026 Series 7 Top-Off Anki Deck | Suitability & Options";
  }

  if (deck.slug === "series-63-anki-deck") {
    return "2026 Series 63 Anki Deck | State Law Flashcards";
  }

  return `${year}${deck.shortName} Anki Deck | UniPrep2Go`;
}

function buildDeckSeoDescription(deck: Awaited<ReturnType<typeof getPricedDeckBySlug>>) {
  if (!deck) {
    return "";
  }

  const price = formatDeckPriceLabel(deck);
  const base = `${deck.facts.cards} cards, ${deck.format} download, ${deck.facts.topics}. ${price} via ${deck.checkoutProvider}.`;

  if (deck.slug === "sie-exam-anki-deck") {
    return `${base} Covers current FINRA SIE topic weights with a linked free 75-question SIE practice test, 105-minute mock, and 70% target.`;
  }

  if (deck.slug === "servsafe-manager-anki-deck") {
    return `${base} Covers ServSafe Manager food safety topics with a linked free 90-question practice test, 120-minute mock, and 75% target.`;
  }

  if (deck.slug === "servsafe-manager-complete-study-guide") {
    return `${base} Includes an 18-page printable guide, 2-page cram sheet, 70 practice questions, rationales, 7-day plan, checklist, and glossary.`;
  }

  if (deck.slug === "series-7-anki-deck") {
    return `${base} Focuses on FINRA job functions, suitability, options, products, and a linked 60-question readiness check.`;
  }

  if (deck.category === "finance" || deck.category === "professional") {
    return `${base} Independent active-recall study aid with sample cards and free linked practice tests where available.`;
  }

  return `${base} Independent spaced-repetition study aid with sample cards and import guidance.`;
}

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

  const image = getDeckCoverUrl(deck);
  const title = buildDeckSeoTitle(deck);
  const description = buildDeckSeoDescription(deck);

  return {
    title,
    description,
    alternates: {
      canonical: `/decks/${deck.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/decks/${deck.slug}`,
      type: "website",
      images: image
        ? [
            {
              url: image,
              alt: `${deck.shortName} Anki deck preview`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
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
  const checkoutActionLabel =
    deck.checkoutProvider === "App Store" ? "Open in App Store" : "Buy the deck";
  const linkedMock = getAllMockExams().find((mock) => mock.linkedDeckSlug === deck.slug);

  const sectionEvents = [
    { selector: "#facts", name: "product_facts_view" as const },
    { selector: "#topic-matrix", name: "topic_matrix_view" as const },
    { selector: "#sample-cards", name: "sample_cards_view" as const },
    { selector: "#faq", name: "faq_view" as const },
  ];

  const jsonLd = buildDeckPageJsonLd(deck);

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
            {checkoutActionLabel} — {priceLabel}
          </TrackedCheckoutLink>
          {deck.checkoutProvider === "App Store" ? (
            <Link
              className="inline-flex items-center justify-center rounded-full border border-[#18140f]/25 px-6 py-3 text-sm font-semibold transition hover:border-[#18140f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
              href={deck.checkoutUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              View on App Store
            </Link>
          ) : deck.slug === "cfa-level-1-anki-deck" ? (
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

        {linkedMock ? (
          <section className="mt-8 rounded-3xl border border-[#1f3a5f]/15 bg-[#fffaf0] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">
              Free practice test
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              {buildMockSeoTitle(linkedMock)}
            </h2>
            <p className="mt-2 text-sm leading-7 text-[#4f493e]">
              Run the linked {linkedMock.questionCount}-question timed practice test for topic scoring,
              answer review, and a pass/no-pass remediation plan before deciding what to drill next.
            </p>
            <Link
              className="mt-4 inline-flex rounded-full border border-[#1f3a5f]/25 px-5 py-2.5 text-sm font-semibold text-[#1f3a5f] transition hover:border-[#1f3a5f]"
              href={`/mock-exams/${linkedMock.slug}`}
            >
              Start free practice test
            </Link>
          </section>
        ) : null}

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
