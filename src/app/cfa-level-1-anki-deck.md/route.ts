import { primaryDeck } from "@/lib/decks";
import { buildDeckMarkdown } from "@/lib/llm-docs";

export function GET() {
  return new Response(buildDeckMarkdown(primaryDeck), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
