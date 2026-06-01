import { getPricedDecks } from "@/lib/checkout-pricing";
import { buildCatalogFacts } from "@/lib/llm-docs";

export const revalidate = 3600;

export async function GET() {
  const decks = await getPricedDecks();

  return Response.json(buildCatalogFacts(decks), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
