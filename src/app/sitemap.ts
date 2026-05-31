import type { MetadataRoute } from "next";
import { decks } from "@/lib/decks";

const siteUrl = "https://uniprep2go.study";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const deckDocuments = decks
    .filter((deck) => deck.status === "available")
    .map((deck) => ({
      url: `${siteUrl}/${deck.slug}.md`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    ...deckDocuments,
  ];
}
