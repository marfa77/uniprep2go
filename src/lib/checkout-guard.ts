/** A click sooner than this after the first page view is not counted as checkout intent. */
export const CHECKOUT_MIN_ACTION_MS = 8_000;

const CHECKOUT_WINS = new Set(["checkout_intent", "checkout_click"]);

export function isCheckoutWin(name: string) {
  return CHECKOUT_WINS.has(name);
}

export function shouldSendCheckoutEvent(input: {
  name: string;
  webdriver: boolean;
  millisSinceFirstView: number;
}) {
  if (!isCheckoutWin(input.name)) return true;
  if (input.webdriver) return false;
  return input.millisSinceFirstView >= CHECKOUT_MIN_ACTION_MS;
}

/**
 * Server clock. Missing first view for a known visitor is too soon: the click
 * arrived before any page view was stored. A failed lookup stays open so a
 * Redis blip does not hide a real checkout.
 */
export function isCheckoutTooSoon(input: {
  name: string;
  occurredAt: string;
  visitorId?: string;
  firstViewAt: string | null;
  firstViewKnown: boolean;
}) {
  if (!isCheckoutWin(input.name)) return false;
  if (!input.visitorId?.trim()) return false;
  if (!input.firstViewKnown) return false;
  if (!input.firstViewAt) return true;

  const started = Date.parse(input.firstViewAt);
  const at = Date.parse(input.occurredAt);
  if (!Number.isFinite(started) || !Number.isFinite(at)) return false;
  return at - started < CHECKOUT_MIN_ACTION_MS;
}
