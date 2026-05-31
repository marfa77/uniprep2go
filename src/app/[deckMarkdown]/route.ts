import { availableDecks, getAvailableDeckBySlug } from "@/lib/decks";
import { buildDeckMarkdown } from "@/lib/llm-docs";

export function generateStaticParams() {
  return availableDecks.map((deck) => ({
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
  const deck = getAvailableDeckBySlug(slug);

  if (!deck) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(buildDeckMarkdown(deck), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
