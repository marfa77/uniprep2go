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
  formatDeckContentLabel,
  primaryDeck,
  siteFaqs,
} from "@/lib/decks";
import { buildCatalogItemListJsonLd, buildSiteOrganizationJsonLd } from "@/lib/product-jsonld";
import { getAllMockExams } from "@/lib/mock-exams/configs";
import { buildMockExamItemListJsonLd } from "@/lib/mock-exams/llm";
import { buildMockSeoTitle } from "@/lib/mock-exams/seo";
import { isMockExamRunnable } from "@/lib/mock-exams/question-bank";
import { customDeckMailtoUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free SIE & ServSafe Practice Tests + US Licensing Flashcards | UniPrep2Go",
  description:
    "Free FINRA SIE and ServSafe Manager practice tests online. Anki flashcards for PTCB pharmacy tech, Series 7, insurance licensing, California real estate, CFA, and FRM — timed mocks with topic scoring.",
  keywords: [
    "free sie practice test",
    "servsafe manager practice test",
    "ptcb flashcards",
    "insurance license practice exam",
    "series 7 practice test",
    "california real estate exam prep",
    "pharmacy technician exam prep",
    "cfa anki deck",
    "frm anki deck",
  ],
  openGraph: {
    title: "Free US licensing practice tests + Anki flashcards | UniPrep2Go",
    description:
      "Timed free mocks for SIE, ServSafe, CFA, insurance, and real estate plus independent flashcard decks for FINRA, PTCB, and finance exams.",
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
  const mockExams = getAllMockExams();
  const pdfProductCount = availableDecks.filter((deck) => deck.format === "PDF").length;

  const sectionEvents = [
    { selector: "#catalog", name: "catalog_view" as const },
    { selector: "#faq", name: "faq_view" as const },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      buildSiteOrganizationJsonLd(),
      buildCatalogItemListJsonLd(availableDecks),
      buildMockExamItemListJsonLd(),
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
                US exam prep catalog
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-[#18140f] sm:text-5xl">
                Free practice tests and flashcards for US licensing exams
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#4f493e]">
                {siteConfig.name} helps Americans prep for FINRA SIE, Series 7, Series 63,
                PTCB pharmacy technician, insurance producer, California real estate, ServSafe
                Manager, CFA, and FRM — with free timed online mocks plus Anki decks and printable
                PDFs you can review on your phone between shifts or study sessions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#mock-exams"
                  className="inline-flex items-center rounded-full bg-[#18140f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
                >
                  Free practice tests
                </a>
                <a
                  href="#catalog"
                  className="inline-flex items-center rounded-full border border-[#18140f]/20 bg-[#fffaf0]/70 px-6 py-3 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f]"
                >
                  Browse decks
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-[#1f3a5f]">
                {[
                  { href: "/mock-exams/sie-full-mock", label: "Free SIE practice test" },
                  { href: "/mock-exams/servsafe-manager-mock", label: "ServSafe practice test" },
                  { href: "/decks/ptcb-pharmacy-technician-anki-deck", label: "PTCB flashcards" },
                  { href: "/mock-exams/life-and-health-insurance-readiness-check", label: "Insurance practice test" },
                  { href: "/mock-exams/california-real-estate-readiness-check", label: "CA real estate mock" },
                  { href: "/mock-exams/cfa-level-1-readiness-check", label: "CFA practice test" },
                  { href: "/mock-exams/frm-part-1-readiness-check", label: "FRM practice test" },
                  { href: "/mock-exams/series-7-readiness-check", label: "Series 7 mock" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    className="underline-offset-4 hover:underline"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70 p-4">
                  <dt className="text-sm text-[#7a6e5a]">Product formats</dt>
                  <dd className="mt-1 text-2xl font-semibold text-[#18140f]">
                    Decks · mocks · PDFs
                  </dd>
                </div>
                <div className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70 p-4">
                  <dt className="text-sm text-[#7a6e5a]">Catalog size</dt>
                  <dd className="mt-1 text-2xl font-semibold text-[#18140f]">
                    {availableDecks.length} decks · {mockExams.length} mocks
                  </dd>
                  {pdfProductCount > 0 ? (
                    <dd className="mt-1 text-sm text-[#7a6e5a]">
                      plus {pdfProductCount} printable PDF{pdfProductCount === 1 ? "" : "s"}
                    </dd>
                  ) : null}
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

        <section className="border-b border-[#18140f]/10 bg-[#fffaf0]">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
                New to Anki?
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#18140f]">
                What are Anki decks?
              </h2>
              <p className="mt-4 leading-7 text-[#4f493e]">
                An Anki deck is a set of digital flashcards for the Anki spaced-repetition app.
                UniPrep2Go decks are usually delivered as <code className="rounded bg-[#18140f]/5 px-1.5 py-0.5 text-sm">.apkg</code> files:
                import the file once, then review a small queue of cards every day.
              </p>
              <Link
                className="mt-5 inline-flex text-sm font-semibold text-[#1f3a5f] underline-offset-4 hover:underline"
                href="/anki-starter-kit"
              >
                Open the 15-minute Anki Starter Kit
              </Link>
            </div>

            <ol className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Install Anki",
                  detail: "Use the free desktop app first; it imports .apkg files most reliably.",
                },
                {
                  title: "Import the deck",
                  detail: "Open Anki, choose File then Import, and select the downloaded deck file.",
                },
                {
                  title: "Review daily",
                  detail: "Anki schedules harder cards sooner and easier cards later, so practice stays focused.",
                },
              ].map((step, index) => (
                <li
                  className="rounded-3xl border border-[#18140f]/10 bg-[#f7f3ea] p-5"
                  key={step.title}
                >
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#1f3a5f]">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-3 font-semibold text-[#18140f]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f5749]">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {featuredDecks.length > 0 && (
          <section className="border-b border-[#18140f]/10 bg-[#fffaf0]/40">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
              <h2 className="text-2xl font-semibold tracking-tight text-[#18140f]">
                Featured decks
              </h2>
              <p className="mt-2 text-[#4f493e]">
                Top US picks: food safety, pharmacy tech, FINRA securities, and CFA
                formula recall — each with sample cards and checkout on Gumroad.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                            className="aspect-[4/3] h-auto w-full bg-[#f6efe8] object-contain object-center p-3"
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
                        <p className="mt-2 flex-1 text-sm leading-6 text-[#5f5749] line-clamp-3">
                          {deck.subtitle}
                        </p>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span className="font-medium text-[#18140f]">
                            {formatDeckPriceLabel(deck)} ·{" "}
                            {formatDeckContentLabel(deck)}
                          </span>
                          <Link
                            href={`/decks/${deck.slug}`}
                            className="font-medium text-[#1f3a5f] underline-offset-2 hover:underline"
                          >
                            {deck.format === "PDF" ? "View PDF" : "View deck"}
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

        <section id="mock-exams" className="border-b border-[#18140f]/10 bg-[#f7f3ea]">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              Free practice tests
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#18140f]">
              Free SIE, ServSafe, insurance, and real estate practice tests online
            </h2>
            <p className="mt-3 max-w-3xl text-[#4f493e]">
              Americans searching for a free SIE practice test, ServSafe Manager mock exam,
              or insurance license practice questions can start here — no signup wall.
              Full timed mocks for SIE and ServSafe; readiness checks for CFA, FRM, Series 7,
              Series 63, Life &amp; Health, Property &amp; Casualty, and California real estate.
              Every report shows topic-level weak spots and links back to the matching flashcard deck.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {mockExams.map((mock) => {
                const live = mock.status === "live";
                const ctaLabel = isMockExamRunnable(mock.slug)
                  ? live
                    ? "Start free mock"
                    : "Start readiness check"
                  : "View details";

                return (
                  <Link
                    key={mock.slug}
                    className={`group rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-4 transition hover:-translate-y-0.5 hover:border-[#1f3a5f]/30 ${
                      live ? "md:col-span-2 lg:col-span-2" : ""
                    }`}
                    href={`/mock-exams/${mock.slug}`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1f3a5f]">
                      {live ? "Full mock available" : "Readiness preview"}
                    </p>
                    <h3 className="mt-2 text-base font-semibold text-[#18140f]">
                      {buildMockSeoTitle(mock)}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#5f5749]">
                      {mock.questionCount} q · {mock.durationMinutes} min · pass {mock.passRule.passPercent}%
                    </p>
                    <p className="mt-4 text-sm font-medium text-[#1f3a5f] group-hover:underline">
                      {ctaLabel}
                    </p>
                  </Link>
                );
              })}
            </div>
            <Link
              className="mt-6 inline-flex text-sm font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
              href="/mock-exams"
            >
              View all practice tests
            </Link>
          </div>
        </section>

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
                <div key={group.category} id={`catalog-${group.category}`}>
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
                                aria-label={`View ${deck.title}`}
                                className="shrink-0 overflow-hidden rounded-2xl border border-[#18140f]/10 bg-[#f6efe8]"
                                href={`/decks/${deck.slug}`}
                              >
                                <Image
                                  alt=""
                                  aria-hidden
                                  className="h-16 w-28 bg-[#f6efe8] object-contain object-center p-1"
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
                                {formatDeckContentLabel(deck)} · {deck.facts.examYear} · {deck.checkoutProvider}
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

        <section id="custom-decks" className="border-b border-[#18140f]/10 bg-[#fffaf0]/40">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              Custom work
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#18140f]">
              {siteConfig.customDeckInquiry.title}
            </h2>
            <p className="mt-3 max-w-3xl text-[#4f493e]">
              {siteConfig.customDeckInquiry.summary}
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5f5749]">
              {siteConfig.customDeckInquiry.instructions}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center rounded-full bg-[#18140f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
                href={customDeckMailtoUrl()}
              >
                Request a custom deck
              </a>
              <Link
                className="inline-flex items-center rounded-full border border-[#18140f]/20 bg-[#fffaf0]/70 px-6 py-3 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f]"
                href="/contact#custom-decks"
              >
                Contact page
              </Link>
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
                <Link
                  href="/api/mock-exams"
                  className="font-medium text-[#18140f] underline-offset-2 hover:underline"
                >
                  /api/mock-exams
                </Link>{" "}
                — finance mock exam facts JSON
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
                ,{" "}
                <Link
                  href="/decks/cat4-level-d-anki-deck-printable-pdf"
                  className="font-medium text-[#18140f] underline-offset-2 hover:underline"
                >
                  CAT4 Level D deck page
                </Link>
                ,{" "}
                <a
                  href="/cat4-level-d-anki-deck-printable-pdf.md"
                  className="font-medium text-[#18140f] underline-offset-2 hover:underline"
                >
                  cat4-level-d-anki-deck-printable-pdf.md
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
