import Link from "next/link";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDeckContentLabel } from "@/lib/decks";
import { formatDeckPriceLabel, getPricedDeckBySlug } from "@/lib/checkout-pricing";
import { getIntentPageDecks, getIntentPagePrimaryDeck, type IntentPage } from "@/lib/intent-pages";
import { absoluteUrl, siteConfig } from "@/lib/site";

export async function IntentPageView({ page }: Readonly<{ page: IntentPage }>) {
  const catalogDecks = getIntentPageDecks(page);
  const catalogPrimary = getIntentPagePrimaryDeck(page) ?? catalogDecks[0];
  const decks = (
    await Promise.all(catalogDecks.map((deck) => getPricedDeckBySlug(deck.slug)))
  ).filter((deck): deck is NonNullable<typeof deck> => deck !== undefined);
  const primaryDeck =
    (catalogPrimary ? await getPricedDeckBySlug(catalogPrimary.slug) : undefined) ?? decks[0];

  if (!primaryDeck) {
    return null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/${page.slug}#webpage`,
        name: page.title,
        description: page.description,
        url: absoluteUrl(`/${page.slug}`),
        about: decks.map((deck) => ({
          "@type": "WebPage",
          name: deck.title,
          url: absoluteUrl(`/decks/${deck.slug}`),
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/${page.slug}#faq`,
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}/${page.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: absoluteUrl(`/${page.slug}`),
          },
        ],
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

      <article className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
          {page.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {page.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">
          {page.directAnswer}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <TrackedCheckoutLink
            className="inline-flex items-center justify-center rounded-full bg-[#18140f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
            deckSlug={primaryDeck.slug}
            href={primaryDeck.checkoutUrl}
            source={`${page.slug}_cta`}
          >
            Buy {primaryDeck.shortName} — {formatDeckPriceLabel(primaryDeck)}
          </TrackedCheckoutLink>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-[#18140f]/25 px-6 py-3 text-sm font-semibold transition hover:border-[#18140f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
            href={`/decks/${primaryDeck.slug}`}
          >
            View deck details
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Recommended deck</h2>
          <div className="mt-4 divide-y divide-[#18140f]/10 rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
            {decks.map((deck) => (
              <article className="p-5" key={deck.slug}>
                <h3 className="text-lg font-semibold">
                  <Link className="hover:underline" href={`/decks/${deck.slug}`}>
                    {deck.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5f5749]">{deck.directAnswer}</p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-[#7a6e5a]">
                  {formatDeckContentLabel(deck)} · {formatDeckPriceLabel(deck)} · {deck.checkoutProvider}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Why it matters</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {page.sections.map((section) => (
              <article
                className="rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70 p-5"
                key={section.title}
              >
                <h3 className="font-semibold">{section.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f5749]">{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Quick facts</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {page.proofPoints.map((point) => (
              <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3 text-sm" key={point}>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-4 divide-y divide-[#18140f]/10 rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
            {page.faqs.map((faq) => (
              <article className="p-5" key={faq.question}>
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 leading-7 text-[#5f5749]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 flex flex-wrap gap-4 text-sm font-medium">
          <Link className="underline decoration-[#18140f]/20 underline-offset-4" href="/api/facts">
            Catalog facts JSON
          </Link>
          <Link className="underline decoration-[#18140f]/20 underline-offset-4" href="/llms.txt">
            llms.txt
          </Link>
          <Link className="underline decoration-[#18140f]/20 underline-offset-4" href="/">
            Full catalog
          </Link>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
