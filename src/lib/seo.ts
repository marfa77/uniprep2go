import type { Metadata } from "next";
import type { Deck } from "./decks";
import { getMockExamConfig } from "./mock-exams/configs";
import {
  isGoogleHeadExamSlug,
  isNicheGooglePrioritySlug,
} from "./mock-exams/hub-clusters";
import { getNicheExamExplainer } from "./mock-exams/niche-exam-explainers";
import { isMockExamRunnable } from "./mock-exams/question-bank";
import { absoluteUrl, siteConfig } from "./site";

/** State real-estate mocks Google may index — hub spear + majors only. */
export const INDEXABLE_STATE_RE_SLUGS = new Set([
  "california-real-estate-readiness-check",
  "fl-real-estate-readiness-check",
  "tx-real-estate-readiness-check",
  "ny-real-estate-readiness-check",
]);

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

/** Trim to max length on a word boundary — no ellipsis (clean SERP display). */
export function fitSeoTitle(title: string, max = SEO_TITLE_MAX): string {
  const trimmed = title.trim();
  if (trimmed.length <= max) {
    return trimmed;
  }
  let cut = trimmed.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > Math.floor(max * 0.55)) {
    cut = cut.slice(0, lastSpace);
  }
  return cut.trim();
}

/** @deprecated Prefer fitSeoTitle — kept for tests and hub pages with title template suffix. */
export function truncateSeoTitle(title: string, max = SEO_TITLE_MAX): string {
  return fitSeoTitle(title, max);
}

/** Leaf product/mock pages — skip layout `| SiteName` suffix so titles are not double-truncated in SERPs. */
export function leafPageTitle(title: string, max = 60): Metadata["title"] {
  return { absolute: fitSeoTitle(title, max) };
}

/**
 * Indexable mocks:
 * - live + runnable bank (state-RE limited to INDEXABLE_STATE_RE_SLUGS)
 * - coming_soon waitlist pages with a niche explainer (thick SEO guide + notify CTA)
 */
export function shouldIndexMockExam(slug: string): boolean {
  const config = getMockExamConfig(slug);
  if (!config) {
    return false;
  }
  if (config.familyId === "state-re" && !INDEXABLE_STATE_RE_SLUGS.has(slug)) {
    return false;
  }
  if (config.status === "live") {
    return isMockExamRunnable(slug);
  }
  if (config.status === "coming_soon") {
    const explainer = getNicheExamExplainer(slug);
    return Boolean(explainer?.whatIsExam && (explainer.examFaqs?.length ?? 0) >= 6);
  }
  return false;
}

export function mockExamRobots(slug: string): Metadata["robots"] | undefined {
  return shouldIndexMockExam(slug) ? undefined : thinContentRobots;
}

/** Planned waitlist decks stay crawlable for GEO/notify but are not Google-indexed. */
export function shouldIndexDeck(deck: Pick<Deck, "status">): boolean {
  return deck.status !== "planned";
}

export function deckRobots(deck: Pick<Deck, "status">): Metadata["robots"] | undefined {
  return shouldIndexDeck(deck) ? undefined : thinContentRobots;
}

/** Sitemap priority: niche Google money URLs high; head exams low; other indexed mocks mid. */
export function mockExamSitemapPriority(slug: string): number {
  if (isNicheGooglePrioritySlug(slug)) {
    return 0.98;
  }
  if (isGoogleHeadExamSlug(slug)) {
    return 0.72;
  }
  return 0.88;
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
  // Keep absolute title ≤57 chars (Ahrefs / audit TITLE_MAX).
  const title = "Free US Exam Practice Tests | EPA, LEED, CDL";
  const description =
    "Free timed practice tests for EPA 608, LEED, NEBOSH, CDL, trades, and specialty licenses — paired with Anki decks for weak-topic repair. No signup.";

  return finalize({
    title: {
      absolute: title,
    },
    description,
    alternates: { canonical: absoluteUrl("/") },
    openGraph: {
      title,
      description,
      url: absoluteUrl("/"),
      images: [
        {
          url: "/home/hero.webp",
          width: 1200,
          height: 630,
          alt: "UniPrep2Go free online practice tests for US licensing exams",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description:
        "Timed mocks with topic reports — plus Anki decks for daily drilling. Start with a free practice test.",
      images: ["/home/hero.webp"],
    },
  });
}
