import { catalogAvailableDecks } from "@/lib/decks";
import { getPricedDeckBySlug } from "@/lib/checkout-pricing";
import { buildDeckFacts } from "@/lib/llm-docs";

export const revalidate = 3600;

export function generateStaticParams() {
  return catalogAvailableDecks.map((deck) => ({ slug: deck.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const deck = await getPricedDeckBySlug(slug);

  if (!deck) {
    return Response.json({ error: "Deck not found" }, { status: 404 });
  }

  return Response.json(buildDeckFacts(deck), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
