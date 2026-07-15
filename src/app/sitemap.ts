import type { MetadataRoute } from "next";
import { availableDecks } from "../lib/decks";
import { getAllMockExams } from "../lib/mock-exams/configs";
import { shouldIndexMockExam } from "../lib/seo";
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

  const mockPages = getAllMockExams()
    .filter((mock) => shouldIndexMockExam(mock.slug))
    .map((mock) => ({
    url: `${siteUrl}/mock-exams/${mock.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.95,
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
      url: `${siteUrl}/cfa-level-1-anki-deck-vs-curriculum`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/cursor-rules-for-indie-hackers`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${siteUrl}/mock-exams`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/building-certification-anki-decks`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.94,
    },
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
