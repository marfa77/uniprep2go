import { getRedisClient } from "@/lib/redis";

/** Total checkout clicks per deck for Telegram “Nth click since observation”. */
function observationCountKey(slug: string) {
  return `checkout:click-obs:v1:${slug}`;
}

const OBSERVATION_SINCE_KEY = "checkout:click-obs:v1:since";

type GlobalWithObsClicks = typeof globalThis & {
  __uniprep2goCheckoutClickObs?: { since: string; bySlug: Record<string, number> };
};

function memoryObs() {
  const g = globalThis as GlobalWithObsClicks;
  if (!g.__uniprep2goCheckoutClickObs) {
    g.__uniprep2goCheckoutClickObs = { since: new Date().toISOString(), bySlug: {} };
  }
  return g.__uniprep2goCheckoutClickObs;
}

export type CheckoutClickObservation = {
  /** 1-based ordinal for this deck since checkout-click observation began */
  n: number;
  since: string;
};

/**
 * Increment the observation counter for a deck checkout click (every recorded click).
 * Used in Telegram: “Click #: 3rd for this deck (since 2026-11-13)”.
 * Older clicks are not in this counter: funnel stats never stored checkout clicks per deck.
 */
export async function recordCheckoutClickObservation(
  slug: string,
): Promise<CheckoutClickObservation | null> {
  const trimmed = slug?.trim();
  if (!trimmed) return null;

  const client = getRedisClient();
  if (!client) {
    const mem = memoryObs();
    mem.bySlug[trimmed] = (mem.bySlug[trimmed] ?? 0) + 1;
    return { n: mem.bySlug[trimmed], since: mem.since };
  }

  try {
    const now = new Date().toISOString();
    await client.set(OBSERVATION_SINCE_KEY, now, { nx: true });

    const n = await client.incr(observationCountKey(trimmed));
    const since = (await client.get<string>(OBSERVATION_SINCE_KEY)) ?? now;
    return { n, since };
  } catch (error) {
    console.error("[checkout_click_obs] record failed", error);
    return null;
  }
}
