import { getPricedDecks } from "@/lib/checkout-pricing";
import { buildLlmsFullTxt } from "@/lib/llm-docs";

export const revalidate = 3600;

export async function GET() {
  const decks = await getPricedDecks();

  return new Response(buildLlmsFullTxt(decks), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
