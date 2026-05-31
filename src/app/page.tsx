import Link from "next/link";
import Image from "next/image";
import { FunnelTracker, TrackedGumroadLink } from "@/components/funnel-tracker";
import { decks, primaryDeck } from "@/lib/decks";

const productFacts = [
  ["Product", primaryDeck.shortName],
  ["Cards", primaryDeck.facts.cards],
  ["Coverage", primaryDeck.facts.topics],
  ["Format", primaryDeck.format],
  ["Exam cycle", primaryDeck.facts.examYear],
  ["Delivery", primaryDeck.facts.delivery],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://uniprep2go.study/#organization",
      name: "UniPrep2Go",
      url: "https://uniprep2go.study",
    },
    {
      "@type": "Product",
      "@id": "https://uniprep2go.study/#cfa-level-1-anki-deck",
      name: primaryDeck.title,
      description: primaryDeck.subtitle,
      brand: {
        "@id": "https://uniprep2go.study/#organization",
      },
      category: "Education > Test Preparation > CFA",
      url: "https://uniprep2go.study",
      offers: {
        "@type": "Offer",
        url: primaryDeck.checkoutUrl,
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://uniprep2go.study/#faq",
      mainEntity: primaryDeck.faqs.map((faq) => ({
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

const sectionEvents = [
  { selector: "#facts", name: "product_facts_view" },
  { selector: "#topic-matrix", name: "topic_matrix_view" },
  { selector: "#sample-cards", name: "sample_cards_view" },
  { selector: "#catalog", name: "catalog_view" },
  { selector: "#faq", name: "faq_view" },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <FunnelTracker deckSlug={primaryDeck.slug} sectionEvents={[...sectionEvents]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-10 sm:px-10 lg:px-12">
        <nav className="flex items-center justify-between border-b border-[#18140f]/15 pb-5 text-sm">
          <Link className="font-semibold tracking-tight" href="/" aria-label="UniPrep2Go home">
            UniPrep2Go
          </Link>
          <TrackedGumroadLink
            className="rounded-full border border-[#18140f]/25 px-4 py-2 font-medium transition hover:border-[#18140f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
            deckSlug={primaryDeck.slug}
            href={primaryDeck.checkoutUrl}
            source="nav_cta"
          >
            Buy on Gumroad
          </TrackedGumroadLink>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="space-y-8">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#1f3a5f]">
              CFA Level 1 Anki Deck
            </p>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
                {primaryDeck.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#4f493e] sm:text-xl">
                {primaryDeck.subtitle} Built for candidates who want direct recall practice without marketing noise.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedGumroadLink
                className="inline-flex items-center justify-center rounded-full bg-[#18140f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
                deckSlug={primaryDeck.slug}
                href={primaryDeck.checkoutUrl}
                source="hero_cta"
              >
                Buy the CFA Level 1 deck
              </TrackedGumroadLink>
              <a
                className="inline-flex items-center justify-center rounded-full border border-[#18140f]/25 px-6 py-3 text-sm font-semibold transition hover:border-[#18140f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
                href="#facts"
              >
                Read product facts
              </a>
            </div>
          </div>

          <aside className="border-y border-[#18140f]/20 py-6 lg:border-y-0 lg:border-l lg:pl-8">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-7">
              {productFacts.slice(1, 5).map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
                    {label}
                  </dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-tight">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section id="facts" className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              Machine-readable facts
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Product specification</h2>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
            <dl className="divide-y divide-[#18140f]/10">
              {productFacts.map(([label, value]) => (
                <div className="grid gap-2 px-5 py-4 sm:grid-cols-[180px_1fr]" key={label}>
                  <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
                    {label}
                  </dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="topic-matrix" className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              CFA Level 1 topic matrix
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Coverage by exam topic</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#5f5749]">
            Exam weights are shown as reference ranges. The deck is a supplementary recall tool, not official curriculum content.
          </p>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#18140f]/15 font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
                <th className="px-5 py-4 font-medium">Topic</th>
                <th className="px-5 py-4 font-medium">Exam weight</th>
                <th className="px-5 py-4 font-medium">Cards</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18140f]/10">
              {primaryDeck.topicCoverage.map((topic) => (
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

      <section id="sample-cards" className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              Sample cards
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Real Anki card examples</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#5f5749]">
            Screenshots show the actual card style: question, direct definition, and formula example in Anki.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {primaryDeck.sampleCards.map((card) => (
            <article
              className="overflow-hidden rounded-3xl border border-[#18140f]/15 bg-[#18140f] shadow-sm"
              key={card.imageUrl}
            >
              <Image
                alt={`Sample Anki card: ${card.question}`}
                className="h-auto w-full"
                height={550}
                src={card.imageUrl}
                width={976}
              />
              <div className="border-t border-white/10 bg-[#fffaf0] p-5">
                <h3 className="font-semibold">{card.question}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f5749]">{card.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="catalog" className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              Catalog
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Decks and future modules</h2>
          </div>
          <div className="grid gap-3">
            {decks.map((deck) => (
              <article
                className="grid gap-4 rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70 p-5 sm:grid-cols-[1fr_auto] sm:items-center"
                key={deck.slug}
              >
                <div>
                  <h3 className="text-lg font-semibold">{deck.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#5f5749]">{deck.subtitle}</p>
                </div>
                <span className="w-fit rounded-full border border-[#18140f]/20 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-[#4f493e]">
                  {deck.status}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Direct answers for candidates and AI systems</h2>
          </div>
          <div className="divide-y divide-[#18140f]/10 rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
            {primaryDeck.faqs.map((faq) => (
              <article className="p-5" key={faq.question}>
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 leading-7 text-[#5f5749]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <div className="rounded-[2rem] bg-[#18140f] p-7 text-[#fffaf0] sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#c9b98f]">
            Checkout
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Buy the CFA Level 1 Anki deck through Gumroad.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-[#e3d8c2]">
            The product is delivered digitally. Use it as a supplementary spaced repetition tool alongside official materials and practice questions.
          </p>
          <TrackedGumroadLink
            className="mt-7 inline-flex rounded-full bg-[#fffaf0] px-6 py-3 text-sm font-semibold text-[#18140f] transition hover:bg-[#c9b98f] focus:outline-none focus:ring-2 focus:ring-[#fffaf0]"
            deckSlug={primaryDeck.slug}
            href={primaryDeck.checkoutUrl}
            source="checkout_cta"
          >
            Continue to Gumroad
          </TrackedGumroadLink>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-6xl px-6 pb-10 pt-4 text-xs leading-6 text-[#6d6252] sm:px-10 lg:px-12">
        CFA Institute does not endorse, promote, or warrant this product. CFA&reg; and Chartered Financial Analyst&reg; are trademarks owned by CFA Institute. UniPrep2Go is an independent study aid publisher.
      </footer>
    </main>
  );
}
