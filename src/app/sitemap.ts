import type { MetadataRoute } from "next";
import { availableDecks } from "../lib/decks";
import { getAllMockExams } from "../lib/mock-exams/configs";
import { intentPages } from "../lib/intent-pages";
import { siteConfig } from "../lib/site";

const siteUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const deckPages = availableDecks.map((deck) => ({
    url: `${siteUrl}/decks/${deck.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const intentAnswerPages = intentPages.map((page) => ({
    url: `${siteUrl}/${page.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const mockPages = getAllMockExams().map((mock) => ({
    url: `${siteUrl}/mock-exams/${mock.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
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
      url: `${siteUrl}/mock-exams`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...mockPages,
    ...intentAnswerPages,
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
