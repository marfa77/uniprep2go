import offer from "@/data/gumroad/diagnostic-offer.json";

export type DiagnosticOffer = {
  checkoutUrl: string;
  code: string;
  percentOff: number;
  amount: number;
};

/** Result-screen deck discount: the Gumroad offer code exists per product, so only listed permalinks qualify. */
export function applyDiagnosticOffer(checkoutUrl: string, amount: number): DiagnosticOffer | null {
  if (!(amount > 0)) return null;
  let url: URL;
  try {
    url = new URL(checkoutUrl);
  } catch {
    return null;
  }
  const [, segment, permalink, ...rest] = url.pathname.split("/");
  if (!url.hostname.endsWith("gumroad.com") || segment !== "l" || !permalink || rest.some(Boolean)) return null;
  if (!offer.permalinks.includes(permalink)) return null;
  url.pathname = `/l/${permalink}/${offer.code}`;
  return {
    checkoutUrl: url.toString(),
    code: offer.code,
    percentOff: offer.percentOff,
    amount: Math.round(amount * (100 - offer.percentOff)) / 100,
  };
}
