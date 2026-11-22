import type { FunnelEvent } from "./analytics";
import { isCheckoutTooSoon, isCheckoutWin } from "./checkout-guard";
import { isHetznerIp } from "./datacenter-asn";
import { readFirstPageView } from "./visitor-first-view";

/** Headless Chrome, a Hetzner exit, or a click before the visitor has been on the page. */
export async function isPhantomCheckout(event: FunnelEvent) {
  if (!isCheckoutWin(event.name)) return false;
  if (event.webdriver === true) return true;
  if (isHetznerIp(event.clientIp)) return true;

  const first = await readFirstPageView(event.visitorId);
  return isCheckoutTooSoon({
    name: event.name,
    occurredAt: event.occurredAt,
    visitorId: event.visitorId,
    firstViewAt: first.at,
    firstViewKnown: first.known,
  });
}
