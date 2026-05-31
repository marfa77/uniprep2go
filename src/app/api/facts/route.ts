import { primaryDeck } from "@/lib/decks";
import { buildDeckFacts } from "@/lib/llm-docs";

export function GET() {
  return Response.json(buildDeckFacts(primaryDeck), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
