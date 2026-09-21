import { getAllBlogPosts } from "./blog";
import { availableDecks } from "./decks";
import { gaivotaEpisodes, gaivotaSeries } from "./gaivota-comics";
import { getAllMockExams } from "./mock-exams/configs";
import { getVerticalSummaries } from "./mock-exams/hub-clusters";
import { shouldIndexMockExam } from "./seo";

/**
 * Google sitemap policy (Opus + founder):
 * Fix GSC flood by removing llms.txt-as-Sitemap / UTM discovery — not by starving revenue.
 * INCLUDE: hubs, all available decks, all indexable mocks, mock verticals, Gaivota comics,
 *   money blog, commercial intent, CFA support pages.
 * EXCLUDE: legal, contact, llms catalogs, non-money blog, cursor-rules intent.
 */

export const GOOGLE_SITEMAP_HUB_PATHS = [
  "/",
  "/mock-exams",
  "/decks",
  "/finance-anki-decks",
  "/building-certification-anki-decks",
  "/language-certification-decks",
  "/blog",
] as const;

export const GOOGLE_SITEMAP_SUPPORT_PATHS = [
  { path: "/anki-starter-kit", priority: 0.9 },
  { path: "/how-to-import-cfa-anki-deck", priority: 0.7 },
  { path: "/cfa-level-1-anki-deck-vs-curriculum", priority: 0.7 },
] as const;

export const GOOGLE_SITEMAP_INTENT_SLUGS = [
  "sell-anki-deck",
  "which-citizenship-anki-deck",
  "language-exam-vs-citizenship-civics-anki",
] as const;

export const GOOGLE_SITEMAP_EXCLUDED_PATH_PREFIXES = [
  "/privacy",
  "/terms",
  "/cookies",
  "/contact",
  "/llms.txt",
  "/llms-full.txt",
] as const;

/** Dual-track Layer B money URLs (2026-08-27) — highest sitemap priority. */
export const LAYER_B_DECK_SLUGS = [
  "ptcb-study-guide-2026",
  "cfa-level-2-formula-reference-2026",
  "series-63-anki-deck",
] as const;

export const LAYER_B_MOCK_SLUGS = [
  "life-and-health-insurance-readiness-check",
  "ptcb-pharmacy-technician-mock",
  "series-63-readiness-check",
] as const;

export const LAYER_B_BLOG_SLUGS = ["life-in-the-uk-test-why-one-in-three-fail"] as const;

/** Stable hub lastmod — do not stamp every deploy. Bump only when hub copy ships. */
export const GOOGLE_SITEMAP_HUB_LASTMOD = "2026-08-27";

/** Comics lastmod — freeze weekly SEO; bump only when an episode ships. */
export const GOOGLE_SITEMAP_COMICS_LASTMOD = "2026-07-28";

/** Support / intent lastmod when page has no content date field. */
export const GOOGLE_SITEMAP_SUPPORT_LASTMOD = "2026-08-27";

const MONEY_BLOG_SLUG_PATTERN =
  /finra|sie|series-|cfa|frm|servsafe|ptcb|pharmacy|excpt|california-real-estate|real-estate-dre|real-estate-psi|mrics/i;

const US_MONEY_DECK_SLUG_PATTERN =
  /sie|series-|cfa|frm|ptcb|excpt|servsafe|real-estate|insurance|life-and-health|property-casualty|gmat|gre|sat|pmp|nclex|shrm|cfp|enrolled-agent|finra/i;

export function isGoogleSitemapMoneyBlogSlug(slug: string): boolean {
  return MONEY_BLOG_SLUG_PATTERN.test(slug);
}

export function parseSitemapDate(isoDate: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return new Date(`${isoDate}T12:00:00.000Z`);
  }
  return new Date(isoDate);
}

export function deckSitemapPriority(slug: string, category: string): number {
  if ((LAYER_B_DECK_SLUGS as readonly string[]).includes(slug)) {
    return 0.99;
  }
  if (US_MONEY_DECK_SLUG_PATTERN.test(slug)) {
    return 0.96;
  }
  if (category === "language") {
    return 0.72;
  }
  if (category === "professional") {
    return 0.8;
  }
  return 0.88;
}

export function getGoogleSitemapDeckSlugs(): string[] {
  return availableDecks.map((deck) => deck.slug);
}

export function getGoogleSitemapMockSlugs(): string[] {
  return getAllMockExams()
    .filter((mock) => shouldIndexMockExam(mock.slug))
    .map((mock) => mock.slug);
}

export function getGoogleSitemapVerticalPaths(): string[] {
  return getVerticalSummaries().map((vertical) => vertical.href);
}

/** Sold comic series: hub + every episode with a pagePath. */
export function getGoogleSitemapComicPaths(): string[] {
  const episodePaths = gaivotaEpisodes
    .map((ep) => ep.pagePath)
    .filter((path): path is string => Boolean(path));
  return [gaivotaSeries.hubPath, ...episodePaths];
}

export function getGoogleSitemapBlogSlugs(): string[] {
  return getAllBlogPosts()
    .filter((post) => isGoogleSitemapMoneyBlogSlug(post.slug))
    .map((post) => post.slug);
}

export function isExcludedFromGoogleSitemap(pathname: string): boolean {
  return GOOGLE_SITEMAP_EXCLUDED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix),
  );
}
