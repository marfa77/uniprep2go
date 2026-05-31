import { availableDecks, getAvailableDeckBySlug } from "@/lib/decks";
import { buildDeckFacts } from "@/lib/llm-docs";

export function generateStaticParams() {
  return availableDecks.map((deck) => ({ slug: deck.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const deck = getAvailableDeckBySlug(slug);

  if (!deck) {
    return Response.json({ error: "Deck not found" }, { status: 404 });
  }

  return Response.json(buildDeckFacts(deck), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
