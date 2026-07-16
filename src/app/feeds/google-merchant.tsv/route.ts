import { getPricedDecks } from "@/lib/checkout-pricing";
import { buildGoogleMerchantFeed } from "@/lib/google-merchant-feed";

export const revalidate = 3600;

export async function GET() {
  const decks = await getPricedDecks();
  const body = buildGoogleMerchantFeed(decks);

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/tab-separated-values; charset=utf-8",
    },
  });
}
