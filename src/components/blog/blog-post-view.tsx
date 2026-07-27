import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getRelatedBlogPosts,
  type BlogBlock,
  type BlogImage,
  type BlogPost,
} from "@/lib/blog";
import {
  formatDeckPriceLabel,
  getDeckCheckoutCtaLabel,
  getPricedDeckBySlug,
  type PricedDeck,
} from "@/lib/checkout-pricing";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { btnPrimary, btnSecondary, btnQuiet } from "@/lib/ui-button-classes";

/** Render inline **bold** markers from author content. */
function RichText({ text }: Readonly<{ text: string }>) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function StockFigure({
  image,
  priority = false,
}: Readonly<{ image: BlogImage; priority?: boolean }>) {
  return (
    <figure className="mt-8 overflow-hidden rounded-3xl border border-[#18140f]/15 bg-[#18140f]/5">
      <Image
        alt={image.alt}
        className="h-auto w-full object-cover"
        height={630}
        priority={priority}
        src={image.src}
        width={1200}
      />
      {image.caption ? (
        <figcaption className="border-t border-[#18140f]/10 bg-[#fffaf0]/70 px-5 py-3 text-sm leading-6 text-[#5f5749]">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Block({ block }: Readonly<{ block: BlogBlock }>) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-4 text-base leading-7 text-[#4f493e]">
          <RichText text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-[#4f493e]">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-7 text-[#4f493e]">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ol>
      );
    case "topics":
      return (
        <div className="mt-6 space-y-6">
          {block.items.map((topic) => (
            <div key={topic.title}>
              <h3 className="text-lg font-semibold tracking-tight">{topic.title}</h3>
              {topic.body ? (
                <p className="mt-2 text-base leading-7 text-[#4f493e]">
                  <RichText text={topic.body} />
                </p>
              ) : null}
              {topic.bullets?.length ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-[#4f493e]">
                  {topic.bullets.map((item) => (
                    <li key={item}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      );
    case "steps":
      return (
        <div className="mt-6 space-y-5">
          {block.items.map((step) => (
            <div key={step.title}>
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-base leading-7 text-[#4f493e]">
                <RichText text={step.body} />
              </p>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="mt-8 overflow-x-auto rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
          {block.caption ? (
            <p className="border-b border-[#18140f]/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-[#7a6e5a]">
              {block.caption}
            </p>
          ) : null}
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#18140f]/15 font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
                {block.headers.map((header) => (
                  <th className="px-5 py-4 font-medium" key={header}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18140f]/10">
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, cellIndex) => (
                    <td
                      className={
                        cellIndex === 0
                          ? "px-5 py-4 font-medium"
                          : "px-5 py-4 text-[#4f493e]"
                      }
                      key={`${row[0]}-${cellIndex}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

function CtaBand({
  post,
  deck,
}: Readonly<{ post: BlogPost; deck: PricedDeck | null }>): ReactNode {
  const priceLabel = deck ? formatDeckPriceLabel(deck) : null;
  const checkoutLabel =
    deck && priceLabel ? getDeckCheckoutCtaLabel(deck, priceLabel) : post.cta.deckLabel;

  return (
    <section className="mt-10 rounded-3xl border border-[#1f3a5f]/20 bg-[#1f3a5f]/5 px-5 py-6 sm:px-6">
      <p className="text-base leading-7 text-[#4f493e]">{post.cta.summary}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link className={btnPrimary} href={`/mock-exams/${post.mockSlug}`}>
          {post.cta.mockLabel}
        </Link>
        {deck?.checkoutUrl ? (
          <TrackedCheckoutLink
            className={btnSecondary}
            deckSlug={deck.slug}
            href={deck.checkoutUrl}
            source={`blog:${post.slug}`}
          >
            {checkoutLabel}
          </TrackedCheckoutLink>
        ) : (
          <Link className={btnSecondary} href={`/decks/${post.deckSlug}`}>
            {post.cta.deckLabel}
          </Link>
        )}
      </div>
      {deck?.checkoutUrl ? (
        <p className="mt-4">
          <Link className={btnQuiet} href={`/decks/${post.deckSlug}`}>
            View deck details →
          </Link>
        </p>
      ) : null}
    </section>
  );
}

export async function BlogPostView({ post }: Readonly<{ post: BlogPost }>) {
  const pageUrl = absoluteUrl(`/blog/${post.slug}`);
  const related = getRelatedBlogPosts(post);
  const deck = (await getPricedDeckBySlug(post.deckSlug)) ?? null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        mainEntityOfPage: pageUrl,
        url: pageUrl,
        image: [absoluteUrl(post.hero.src), ...post.inlineImages.map((img) => absoluteUrl(img.src))],
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
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
            name: "Blog",
            item: absoluteUrl("/blog"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: pageUrl,
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

      <article
        className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 lg:px-12"
        id="main-content"
        tabIndex={-1}
      >
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
          {post.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-[#7a6e5a]">
          {post.publishedAt} · UniPrep2Go Blog
        </p>
        <p className="mt-6 text-lg leading-8 text-[#4f493e]">
          <RichText text={post.intro} />
        </p>

        <StockFigure image={post.hero} priority />

        <CtaBand deck={deck} post={post} />

        {post.sections.map((section, sectionIndex) => (
          <section className="mt-12" key={section.heading}>
            <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
            {section.blocks.map((block, index) => (
              <Block block={block} key={`${section.heading}-${block.type}-${index}`} />
            ))}
            {post.inlineImages[sectionIndex] ? (
              <StockFigure image={post.inlineImages[sectionIndex]!} />
            ) : null}
          </section>
        ))}

        <section className="mt-12" id="faq">
          <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-4 divide-y divide-[#18140f]/10 rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
            {post.faqs.map((faq) => (
              <article className="p-5" key={faq.question}>
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 leading-7 text-[#5f5749]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Bottom Line</h2>
          <p className="mt-4 text-base leading-7 text-[#4f493e]">
            <RichText text={post.bottomLine} />
          </p>
        </section>

        <CtaBand deck={deck} post={post} />

        {related.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight">Related guides in this cluster</h2>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
                    href={`/blog/${item.slug}`}
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1 text-sm leading-6 text-[#5f5749]">{item.metaDescription}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="mt-10 text-sm text-[#7a6e5a]">
          <Link className="underline-offset-4 hover:underline" href="/blog">
            ← All exam prep guides
          </Link>
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}
