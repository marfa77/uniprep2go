import { availableDecks } from "@/lib/decks";
import { intentPages } from "@/lib/intent-pages";
import { getAllMockExams } from "@/lib/mock-exams/configs";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export function GET() {
  const urls = [
    absoluteUrl("/llms.txt"),
    absoluteUrl("/llms-full.txt"),
    absoluteUrl("/api/facts"),
    absoluteUrl("/api/mock-exams"),
    ...intentPages.map((page) => absoluteUrl(`/${page.slug}`)),
    ...intentPages.map((page) => absoluteUrl(`/${page.slug}/markdown`)),
    ...availableDecks.map((deck) => absoluteUrl(`/${deck.slug}.md`)),
    ...availableDecks.map((deck) => absoluteUrl(`/api/facts/${deck.slug}`)),
    ...getAllMockExams().map((mock) => absoluteUrl(`/api/mock-exams/${mock.slug}`)),
    ...getAllMockExams().map((mock) => absoluteUrl(`/mock-exams/${mock.slug}/markdown`)),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${url}</loc></url>`),
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
