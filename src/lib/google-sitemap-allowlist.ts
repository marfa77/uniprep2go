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
  { path: "/anki-starter-kit", priority: 0.82 },
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

const MONEY_BLOG_SLUG_PATTERN =
  /finra|sie|series-|cfa|frm|servsafe|ptcb|pharmacy|excpt|california-real-estate|real-estate-dre|real-estate-psi|mrics/i;

export function isGoogleSitemapMoneyBlogSlug(slug: string): boolean {
  return MONEY_BLOG_SLUG_PATTERN.test(slug);
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
