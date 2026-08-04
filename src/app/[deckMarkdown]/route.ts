import { catalogAvailableDecks } from "@/lib/decks";
import { getPricedDeckBySlug } from "@/lib/checkout-pricing";
import { buildDeckMarkdown } from "@/lib/llm-docs";
import { geoMarkdownHeaders } from "@/lib/seo";

export const revalidate = 3600;

export function generateStaticParams() {
  return catalogAvailableDecks.map((deck) => ({
    deckMarkdown: `${deck.slug}.md`,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ deckMarkdown: string }> },
) {
  const { deckMarkdown } = await params;

  if (!deckMarkdown.endsWith(".md")) {
    return new Response("Not found", { status: 404 });
  }

  const slug = deckMarkdown.slice(0, -3);
  const deck = await getPricedDeckBySlug(slug);

  if (!deck) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(buildDeckMarkdown(deck), {
    headers: geoMarkdownHeaders(`/decks/${slug}`),
  });
}
