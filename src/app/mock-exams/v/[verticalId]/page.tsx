import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getMockClusterImage } from "@/lib/mock-exams/cluster-images";
import {
  getMocksByVertical,
  getVerticalOrThrow,
  getVerticalSummaries,
  groupMocksByFamily,
} from "@/lib/mock-exams/hub-clusters";
import { filterMockSearchIndex, toMockSearchIndexItem } from "@/lib/mock-exams/search-index";
import { MOCK_VERTICALS } from "@/lib/mock-exams/taxonomy";
import type { MockVerticalId } from "@/lib/mock-exams/types";
import { getVerticalSeoCopy } from "@/lib/mock-exams/vertical-seo";
import { finalize, leafPageTitle, shouldIndexMockExam } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { getCatalogDeckBySlug, getDeckBySlug } from "@/lib/decks";

type PageProps = {
  params: Promise<{ verticalId: string }>;
  searchParams: Promise<{ q?: string }>;
};

function isVerticalId(value: string): value is MockVerticalId {
  return MOCK_VERTICALS.some((vertical) => vertical.id === value);
}

export function generateStaticParams() {
  return getVerticalSummaries().map((vertical) => ({ verticalId: vertical.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { verticalId } = await params;
  if (!isVerticalId(verticalId)) {
    return {};
  }
  const vertical = getVerticalOrThrow(verticalId);
  const mocks = getMocksByVertical(verticalId);
  const path = `/mock-exams/v/${verticalId}`;
  const seo = getVerticalSeoCopy(verticalId);
  const description = seo
    ? `${seo.lead.slice(0, 155).replace(/\s+\S*$/, "")}.`
    : `${vertical.description} ${mocks.length} free timed practice tests with topic scoring — no signup.`;

  return finalize({
    title: leafPageTitle(`${vertical.seoTitle} | UniPrep2Go`),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: vertical.seoTitle,
      description: seo?.lead ?? vertical.description,
      url: path,
      type: "website",
      images: [
        {
          url: getMockClusterImage(vertical.imageType),
          width: 1200,
          height: 630,
          alt: vertical.label,
        },
      ],
    },
  });
}

export const revalidate = 3600;

export default async function MockVerticalPage({ params, searchParams }: PageProps) {
  const { verticalId } = await params;
  const { q } = await searchParams;

  if (!isVerticalId(verticalId)) {
    notFound();
  }

  const vertical = getVerticalOrThrow(verticalId);
  let mocks = getMocksByVertical(verticalId);
  if (mocks.length === 0) {
    notFound();
  }

  const query = q?.trim() ?? "";
  if (query) {
    const matched = new Set(
      filterMockSearchIndex(mocks.map(toMockSearchIndexItem), query).map((item) => item.slug),
    );
    mocks = mocks.filter((mock) => matched.has(mock.slug));
  }

  const familyGroups = groupMocksByFamily(mocks);
  const useFamilySections = familyGroups.length > 1 && mocks.length > 12;
  const imageSrc = getMockClusterImage(vertical.imageType);
  const pageUrl = absoluteUrl(`/mock-exams/v/${verticalId}`);
  const indexableCount = mocks.filter((mock) => shouldIndexMockExam(mock.slug)).length;
  const seo = getVerticalSeoCopy(verticalId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        name: vertical.seoTitle,
        description: seo?.lead ?? vertical.description,
        url: pageUrl,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        numberOfItems: mocks.length,
      },
      {
        "@type": "ItemList",
        itemListElement: mocks.map((mock, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: mock.shortTitle,
          url: absoluteUrl(`/mock-exams/${mock.slug}`),
        })),
      },
      ...(seo?.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: seo.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]
        : []),
    ],
  };

  function renderMockRow(slug: string) {
    const mock = mocks.find((item) => item.slug === slug);
    if (!mock) return null;
    const linkedDeck =
      getCatalogDeckBySlug(mock.linkedDeckSlug) ?? getDeckBySlug(mock.linkedDeckSlug);
    return (
      <li key={mock.slug}>
        <Link
          className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition hover:bg-[#f7f3ea]"
          href={`/mock-exams/${mock.slug}`}
        >
          <span className="font-medium">{mock.shortTitle}</span>
          <span className="text-sm text-[#5f5749]">
            {mock.questionCount} Q · {mock.status}
            {linkedDeck ? ` · ${linkedDeck.shortName}` : ""}
          </span>
        </Link>
      </li>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <article className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12">
        <nav className="text-sm text-[#5f5749]">
          <Link className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline" href="/mock-exams">
            Free mocks
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span>{vertical.label}</span>
        </nav>

        <div className="mt-6 overflow-hidden rounded-3xl border border-[#18140f]/10">
          <div className="relative h-40 w-full sm:h-48">
            <Image
              alt=""
              className="object-cover"
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              src={imageSrc}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18140f]/80 via-[#18140f]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fffaf0]/80">
                Exam path
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#fffaf0] sm:text-4xl">
                {vertical.seoTitle}
              </h1>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">
          {seo?.lead ?? vertical.description}
        </p>
        <p className="mt-2 text-sm text-[#5f5749]">
          {query
            ? `${mocks.length} match${mocks.length === 1 ? "" : "es"} for “${query}”`
            : `${mocks.length} practice tests${indexableCount < mocks.length ? ` · ${indexableCount} indexed` : ""}`}
          {" · "}
          <Link className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline" href="/mock-exams#search">
            Search all exams
          </Link>
          {query ? (
            <>
              {" · "}
              <Link
                className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
                href={`/mock-exams/v/${verticalId}`}
              >
                Clear filter
              </Link>
            </>
          ) : null}
        </p>

        {mocks.length === 0 ? (
          <p className="mt-10 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 text-sm text-[#5f5749]">
            No exams in this path matched “{query}”.{" "}
            <Link
              className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
              href={`/mock-exams/v/${verticalId}`}
            >
              Show all {vertical.label} exams
            </Link>
            .
          </p>
        ) : useFamilySections ? (
          familyGroups.map((group) => (
            <section className="mt-10" key={group.familyId} id={group.familyId}>
              <h2 className="text-xl font-semibold tracking-tight">{group.label}</h2>
              <ul className="mt-4 divide-y divide-[#18140f]/10 overflow-hidden rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]">
                {group.mocks.map((mock) => renderMockRow(mock.slug))}
              </ul>
            </section>
          ))
        ) : (
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight">Practice tests</h2>
            <ul className="mt-4 divide-y divide-[#18140f]/10 overflow-hidden rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]">
              {mocks.map((mock) => renderMockRow(mock.slug))}
            </ul>
          </section>
        )}

        {seo?.sections.map((section) => (
          <section className="mt-10" key={section.heading}>
            <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
            <p className="mt-4 text-base leading-8 text-[#4f493e]">{section.body}</p>
          </section>
        ))}

        {seo?.faqs?.length ? (
          <section className="mt-10" id="faq">
            <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
            <dl className="mt-6 space-y-5">
              {seo.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold tracking-tight">{faq.question}</dt>
                  <dd className="mt-2 text-base leading-8 text-[#4f493e]">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <p className="mt-12 text-sm text-[#5f5749]">
          <Link className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline" href="/mock-exams">
            ← Back to all exam paths
          </Link>
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}
