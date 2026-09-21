import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "../lib/blog";
import { availableDecks } from "../lib/decks";
import {
  deckSitemapPriority,
  getGoogleSitemapBlogSlugs,
  getGoogleSitemapComicPaths,
  getGoogleSitemapMockSlugs,
  getGoogleSitemapVerticalPaths,
  GOOGLE_SITEMAP_COMICS_LASTMOD,
  GOOGLE_SITEMAP_HUB_LASTMOD,
  GOOGLE_SITEMAP_HUB_PATHS,
  GOOGLE_SITEMAP_INTENT_SLUGS,
  GOOGLE_SITEMAP_SUPPORT_LASTMOD,
  GOOGLE_SITEMAP_SUPPORT_PATHS,
  LAYER_B_BLOG_SLUGS,
  LAYER_B_MOCK_SLUGS,
  parseSitemapDate,
} from "../lib/google-sitemap-allowlist";
import { getMockExamConfig } from "../lib/mock-exams/configs";
import { mockExamSitemapPriority } from "../lib/seo";
import { siteConfig } from "../lib/site";

const siteUrl = siteConfig.url;

function dedupeByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
}

export default function sitemap(): MetadataRoute.Sitemap {
  const hubLastModified = parseSitemapDate(GOOGLE_SITEMAP_HUB_LASTMOD);
  const comicsLastModified = parseSitemapDate(GOOGLE_SITEMAP_COMICS_LASTMOD);
  const supportLastModified = parseSitemapDate(GOOGLE_SITEMAP_SUPPORT_LASTMOD);
  const moneyBlogSlugs = new Set(getGoogleSitemapBlogSlugs());
  const layerBMocks = new Set<string>(LAYER_B_MOCK_SLUGS);
  const layerBBlogs = new Set<string>(LAYER_B_BLOG_SLUGS);

  const hubs = GOOGLE_SITEMAP_HUB_PATHS.map((path) => ({
    url: path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`,
    lastModified: hubLastModified,
    changeFrequency: (path === "/blog" || path === "/mock-exams" || path === "/decks"
      ? "weekly"
      : "monthly") as "weekly" | "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/mock-exams"
          ? 0.95
          : path === "/decks"
            ? 0.94
            : path === "/language-certification-decks"
              ? 0.78
              : 0.93,
  }));

  const supportPages = GOOGLE_SITEMAP_SUPPORT_PATHS.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: supportLastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const intentPages = GOOGLE_SITEMAP_INTENT_SLUGS.map((slug) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: supportLastModified,
    changeFrequency: "monthly" as const,
    priority:
      slug === "which-citizenship-anki-deck" || slug === "language-exam-vs-citizenship-civics-anki"
        ? 0.84
        : 0.7,
  }));

  const blogPosts = getAllBlogPosts()
    .filter((post) => moneyBlogSlugs.has(post.slug))
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: parseSitemapDate(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: layerBBlogs.has(post.slug) ? 0.97 : 0.84,
    }));

  const comicPages = getGoogleSitemapComicPaths().map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: comicsLastModified,
    changeFrequency: (path === "/comics/gaivota-em-portugal" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority: /\/(03-aljubarrota|04-ceuta|05-vasco-da-gama|06-liberal-revolution|07-republic|08-estado-novo|09-treaty-of-windsor|10-eu-accession)$/.test(
      path,
    )
      ? 0.7
      : path.endsWith("/01-1755-earthquake")
        ? 0.68
        : path === "/comics/gaivota-em-portugal"
          ? 0.66
          : 0.66,
  }));

  const deckPages = availableDecks.map((deck) => ({
    url: `${siteUrl}/decks/${deck.slug}`,
    lastModified: parseSitemapDate(deck.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: deckSitemapPriority(deck.slug, deck.category),
  }));

  const mockPages = getGoogleSitemapMockSlugs().map((slug) => {
    const config = getMockExamConfig(slug);
    return {
      url: `${siteUrl}/mock-exams/${slug}`,
      lastModified: parseSitemapDate(config?.lastUpdated ?? GOOGLE_SITEMAP_HUB_LASTMOD),
      changeFrequency: "weekly" as const,
      priority: layerBMocks.has(slug) ? 0.99 : mockExamSitemapPriority(slug),
    };
  });

  const verticalPages = getGoogleSitemapVerticalPaths().map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: hubLastModified,
    changeFrequency: "weekly" as const,
    priority: 0.86,
  }));

  return dedupeByUrl([
    ...hubs,
    ...supportPages,
    ...intentPages,
    ...blogPosts,
    ...comicPages,
    ...verticalPages,
    ...mockPages,
    ...deckPages,
  ]);
}
