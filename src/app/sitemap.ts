import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "../lib/blog";
import { availableDecks } from "../lib/decks";
import {
  getGoogleSitemapBlogSlugs,
  getGoogleSitemapComicPaths,
  getGoogleSitemapMockSlugs,
  getGoogleSitemapVerticalPaths,
  GOOGLE_SITEMAP_HUB_PATHS,
  GOOGLE_SITEMAP_INTENT_SLUGS,
  GOOGLE_SITEMAP_SUPPORT_PATHS,
} from "../lib/google-sitemap-allowlist";
import { mockExamSitemapPriority } from "../lib/seo";
import { siteConfig } from "../lib/site";

const siteUrl = siteConfig.url;

function dedupeByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const moneyBlogSlugs = new Set(getGoogleSitemapBlogSlugs());

  const hubs = GOOGLE_SITEMAP_HUB_PATHS.map((path) => ({
    url: path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: (path === "/blog" || path === "/mock-exams" || path === "/decks"
      ? "weekly"
      : "monthly") as "weekly" | "monthly",
    priority: path === "/" ? 1 : path === "/mock-exams" ? 0.95 : path === "/decks" ? 0.94 : 0.93,
  }));

  const supportPages = GOOGLE_SITEMAP_SUPPORT_PATHS.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const intentPages = GOOGLE_SITEMAP_INTENT_SLUGS.map((slug) => ({
    url: `${siteUrl}/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogPosts = getAllBlogPosts()
    .filter((post) => moneyBlogSlugs.has(post.slug))
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.publishedAt}T12:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.84,
    }));

  const comicPages = getGoogleSitemapComicPaths().map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: (path === "/comics/gaivota-em-portugal" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority: path.endsWith("/01-1755-earthquake")
      ? 0.86
      : path === "/comics/gaivota-em-portugal"
        ? 0.84
        : 0.84,
  }));

  const deckPages = availableDecks.map((deck) => ({
    url: `${siteUrl}/decks/${deck.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.96,
  }));

  const mockPages = getGoogleSitemapMockSlugs().map((slug) => ({
    url: `${siteUrl}/mock-exams/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: mockExamSitemapPriority(slug),
  }));

  const verticalPages = getGoogleSitemapVerticalPaths().map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
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
