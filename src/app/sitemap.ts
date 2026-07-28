import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "../lib/blog";
import { availableDecks } from "../lib/decks";
import { intentPages } from "../lib/intent-pages";
import { getAllMockExams } from "../lib/mock-exams/configs";
import { getVerticalSummaries } from "../lib/mock-exams/hub-clusters";
import { mockExamSitemapPriority, shouldIndexMockExam } from "../lib/seo";
import { siteConfig } from "../lib/site";

const siteUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const deckPages = availableDecks.map((deck) => ({
    url: `${siteUrl}/decks/${deck.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.92,
  }));

  // Planned waitlist decks stay on /api/facts + llms; exclude from Google sitemap.
  const mockPages = getAllMockExams()
    .filter((mock) => shouldIndexMockExam(mock.slug))
    .map((mock) => ({
      url: `${siteUrl}/mock-exams/${mock.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: mockExamSitemapPriority(mock.slug),
    }));

  const mockVerticalPages = getVerticalSummaries().map((vertical) => ({
    url: `${siteUrl}/mock-exams/v/${vertical.id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const indexedIntentPages = intentPages
    .filter((page) => page.indexInSitemap)
    .map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }));

  const blogIndex = {
    url: `${siteUrl}/blog`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.86,
  };

  const blogPosts = getAllBlogPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.publishedAt}T12:00:00.000Z`),
    changeFrequency: "monthly" as const,
    priority: 0.84,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/how-to-import-cfa-anki-deck`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/anki-starter-kit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${siteUrl}/comics/gaivota-em-portugal`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/comics/gaivota-em-portugal/01-1755-earthquake`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.86,
    },
    {
      url: `${siteUrl}/comics/gaivota-em-portugal/02-25-de-abril`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/comics/gaivota-em-portugal/03-aljubarrota`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/comics/gaivota-em-portugal/04-ceuta`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/comics/gaivota-em-portugal/05-vasco-da-gama`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/comics/gaivota-em-portugal/06-liberal-revolution`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/comics/gaivota-em-portugal/07-republic`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/comics/gaivota-em-portugal/08-estado-novo`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/comics/gaivota-em-portugal/09-treaty-of-windsor`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/comics/gaivota-em-portugal/10-eu-accession`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: `${siteUrl}/cfa-level-1-anki-deck-vs-curriculum`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...indexedIntentPages,
    blogIndex,
    ...blogPosts,
    {
      url: `${siteUrl}/mock-exams`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/llms-full.txt`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: `${siteUrl}/decks`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.94,
    },
    {
      url: `${siteUrl}/building-certification-anki-decks`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.94,
    },
    {
      url: `${siteUrl}/finance-anki-decks`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.93,
    },
    {
      url: `${siteUrl}/language-certification-decks`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    ...mockVerticalPages,
    ...mockPages,
    ...deckPages,
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/cookies`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
