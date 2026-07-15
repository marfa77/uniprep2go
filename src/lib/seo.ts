import type { Metadata } from "next";
import { isMockExamRunnable } from "./mock-exams/question-bank";
import { absoluteUrl, siteConfig } from "./site";

export const SITE_NAME = siteConfig.name;
/** Ahrefs: keep primary title under ~57 chars before the layout template suffix. */
export const SEO_TITLE_MAX = 57;

export const SEO_KEYWORDS = [
  "free practice test",
  "readiness check",
  "exam prep",
  "anki deck",
  "flashcards",
  "FINRA SIE",
  "Series 7",
  "CFA Level 1",
  "FRM Part 1",
  "ServSafe Manager",
  "EPA 608",
  "LEED Green Associate",
  "MRICS APC",
  "WELL AP",
  "CFPS",
  "NEBOSH IGC",
  "UniPrep2Go",
] as const;

export const SERVICE_TAGLINE = siteConfig.primaryPositioning;

export const SERVICE_DESCRIPTION_SHORT = siteConfig.description;

/** Pages with empty mock banks or placeholder content — crawlable but not indexed (Barakhlo thin-content pattern). */
export const thinContentRobots: Metadata["robots"] = {
  index: false,
  follow: true,
};

export const privatePageRobots: Metadata["robots"] = {
  index: false,
  follow: false,
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${SITE_NAME} | US Exam Prep — Free Practice Tests & Flashcards`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SERVICE_DESCRIPTION_SHORT,
  keywords: [...SEO_KEYWORDS],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: siteConfig.url }],
  creator: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Free Practice Tests & Exam Prep`,
    description: SERVICE_TAGLINE,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SERVICE_TAGLINE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export function truncateSeoTitle(title: string, max = SEO_TITLE_MAX): string {
  const trimmed = title.trim();
  if (trimmed.length <= max) {
    return trimmed;
  }
  return `${trimmed.slice(0, max - 1).trim()}…`;
}

/** Runnable mocks only — empty banks stay human-accessible but out of the index/sitemap. */
export function shouldIndexMockExam(slug: string): boolean {
  return isMockExamRunnable(slug);
}

export function mockExamRobots(slug: string): Metadata["robots"] | undefined {
  return shouldIndexMockExam(slug) ? undefined : thinContentRobots;
}

function hasOgImages(images: NonNullable<Metadata["openGraph"]>["images"]): boolean {
  if (!images) {
    return false;
  }
  return Array.isArray(images) ? images.length > 0 : true;
}

function enrichOpenGraph(
  partial: NonNullable<Metadata["openGraph"]>,
): NonNullable<Metadata["openGraph"]> {
  const url = partial.url ? absoluteUrl(String(partial.url)) : undefined;

  return {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    ...partial,
    url,
  };
}

/** Merge page metadata with site-wide OG defaults (Barakhlo `finalize` pattern). */
export function finalize(meta: Metadata): Metadata {
  return {
    ...meta,
    openGraph: meta.openGraph ? enrichOpenGraph(meta.openGraph) : undefined,
  };
}

export function homeMetadata(): Metadata {
  return finalize({
    title: "Free Practice Tests & Readiness Checks",
    description: SERVICE_DESCRIPTION_SHORT,
    alternates: { canonical: absoluteUrl("/") },
    openGraph: {
      title: `${SITE_NAME} — Free Practice Tests & Exam Prep`,
      description: SERVICE_TAGLINE,
      url: absoluteUrl("/"),
    },
  });
}
