import {
  catalogAvailableDecks,
  categoryLabels,
  categoryOrder,
  featuredDeckSlugs,
  getCatalogDeckBySlug,
  sortDecksByCatalogOrder,
  type AvailableDeck,
  type CatalogAvailableDeck,
  type CheckoutProvider,
  type DeckPrice,
} from "./decks";
import { PREP2GO_APP_STORE_MONTHLY_PRICE } from "./prep2go-app-decks";
import { getRedisClient } from "./redis";

export const PRICE_PLACEHOLDER = "{PRICE}";

export type SyncedPriceRecord = {
  amount: number;
  currency: "USD";
  syncedAt: string;
  source: "gumroad" | "lemon";
};

export type PricedDeck = AvailableDeck;

export type CheckoutPriceSyncResult = {
  synced: number;
  gumroad: number;
  lemon: number;
  failed: number;
  errors: string[];
};

const CACHE_KEY = "checkout:prices";
const PENDING_PRICE_LABEL = "See checkout";

type GlobalWithCheckoutPrices = typeof globalThis & {
  __uniprep2goCheckoutPrices?: Map<string, SyncedPriceRecord>;
};

function getMemoryCache() {
  const globalStore = globalThis as GlobalWithCheckoutPrices;

  if (!globalStore.__uniprep2goCheckoutPrices) {
    globalStore.__uniprep2goCheckoutPrices = new Map();
  }

  return globalStore.__uniprep2goCheckoutPrices;
}

export function formatCheckoutPrice(amount: number) {
  return amount % 1 === 0 ? `$${amount}` : `$${amount.toFixed(2)}`;
}

export function formatDeckPriceLabel(
  deck: Pick<PricedDeck, "price" | "checkoutProvider" | "pricePending">,
) {
  if (deck.checkoutProvider === "App Store") {
    return `From $${PREP2GO_APP_STORE_MONTHLY_PRICE}/mo`;
  }

  if (deck.pricePending || deck.price.amount <= 0) {
    return PENDING_PRICE_LABEL;
  }

  return `$${deck.price.amount} ${deck.price.currency}`;
}

export function getCheckoutActionLabel(provider: CheckoutProvider) {
  return provider === "App Store" ? "App Store" : "Buy";
}

export function parseLemonVariantId(checkoutUrl: string) {
  const match = checkoutUrl.match(/\/checkout\/buy\/([0-9a-f-]{36})/i);
  return match?.[1] ?? null;
}

type LemonVariantRecord = {
  priceCents: number;
};

let lemonVariantIndexPromise: Promise<Map<string, LemonVariantRecord>> | null = null;

export function resetLemonVariantIndexCache() {
  lemonVariantIndexPromise = null;
}

async function loadLemonVariantIndex(apiKey: string) {
  const index = new Map<string, LemonVariantRecord>();
  let page = 1;

  while (true) {
    const response = await fetch(
      `https://api.lemonsqueezy.com/v1/variants?page[number]=${page}&page[size]=100`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/vnd.api+json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Lemon Squeezy variants API failed (${response.status})`);
    }

    const payload = (await response.json()) as {
      data?: Array<{ id: string; attributes?: { slug?: string; price?: number } }>;
      meta?: { page?: { lastPage?: number } };
    };

    for (const variant of payload.data ?? []) {
      const priceCents = variant.attributes?.price;
      if (typeof priceCents !== "number" || priceCents <= 0) {
        continue;
      }

      const record = { priceCents };
      index.set(String(variant.id), record);

      const slug = variant.attributes?.slug;
      if (slug) {
        index.set(slug, record);
      }
    }

    const lastPage = payload.meta?.page?.lastPage ?? page;
    if (page >= lastPage) {
      break;
    }

    page += 1;
  }

  return index;
}

async function getLemonVariantIndex(apiKey: string) {
  if (!lemonVariantIndexPromise) {
    lemonVariantIndexPromise = loadLemonVariantIndex(apiKey).catch((error) => {
      lemonVariantIndexPromise = null;
      throw error;
    });
  }

  return lemonVariantIndexPromise;
}

export function parseGumroadPriceCentsFromHtml(html: string) {
  const matches = [...html.matchAll(/price_cents(?:&quot;|"):(\d+)/g)];

  for (const match of matches) {
    const cents = Number.parseInt(match[1], 10);
    if (cents > 0) {
      return cents;
    }
  }

  return null;
}

export function applyPriceRecordToDeck(
  deck: CatalogAvailableDeck,
  record: SyncedPriceRecord,
): PricedDeck {
  const price: DeckPrice = { amount: record.amount, currency: record.currency };
  const formatted = formatCheckoutPrice(record.amount);
  const directAnswer = deck.directAnswer.replaceAll(PRICE_PLACEHOLDER, `${formatted} USD`);

  return { ...deck, price, priceSource: record.source, directAnswer };
}

export function applyPendingPriceToDeck(deck: CatalogAvailableDeck): PricedDeck {
  return {
    ...deck,
    price: { amount: 0, currency: "USD" },
    pricePending: true,
    directAnswer: deck.directAnswer.replaceAll(PRICE_PLACEHOLDER, "the checkout price"),
  };
}

export async function fetchGumroadPriceCents(checkoutUrl: string) {
  const response = await fetch(checkoutUrl, {
    headers: {
      "User-Agent": "UniPrep2Go-PriceSync/1.0",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Gumroad fetch failed (${response.status}) for ${checkoutUrl}`);
  }

  return parseGumroadPriceCentsFromHtml(await response.text());
}

export async function fetchLemonPriceUsd(checkoutVariantKey: string, apiKey: string) {
  const index = await getLemonVariantIndex(apiKey);
  const variant = index.get(checkoutVariantKey);

  if (!variant) {
    throw new Error(`Lemon variant not found for checkout key ${checkoutVariantKey}`);
  }

  return variant.priceCents / 100;
}

export function applyAppStorePriceToDeck(deck: CatalogAvailableDeck): PricedDeck {
  return {
    ...deck,
    price: { amount: PREP2GO_APP_STORE_MONTHLY_PRICE, currency: "USD" },
  };
}

export async function syncDeckPrice(deck: CatalogAvailableDeck): Promise<SyncedPriceRecord> {
  if (deck.checkoutProvider === "App Store") {
    throw new Error(`App Store decks do not sync checkout prices for ${deck.slug}`);
  }

  const syncedAt = new Date().toISOString();

  if (deck.checkoutProvider === "Gumroad") {
    const cents = await fetchGumroadPriceCents(deck.checkoutUrl);
    if (!cents) {
      throw new Error(`Gumroad price not found for ${deck.slug}`);
    }

    return { amount: cents / 100, currency: "USD", syncedAt, source: "gumroad" };
  }

  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  const variantId = parseLemonVariantId(deck.checkoutUrl);

  if (!apiKey) {
    throw new Error(`LEMON_SQUEEZY_API_KEY is not configured for ${deck.slug}`);
  }

  if (!variantId) {
    throw new Error(`Lemon variant id not found for ${deck.slug}`);
  }

  const lemonPrice = await fetchLemonPriceUsd(variantId, apiKey);

  return { amount: lemonPrice, currency: "USD", syncedAt, source: "lemon" };
}

export async function readCachedPrice(slug: string) {
  const redis = getRedisClient();

  if (redis) {
    const value = await redis.hget<SyncedPriceRecord>(CACHE_KEY, slug);
    return value ?? null;
  }

  return getMemoryCache().get(slug) ?? null;
}

export async function readAllCachedPrices() {
  const redis = getRedisClient();

  if (redis) {
    const values = await redis.hgetall<Record<string, SyncedPriceRecord>>(CACHE_KEY);
    return new Map(Object.entries(values ?? {}));
  }

  return new Map(getMemoryCache());
}

export async function writeCachedPrice(slug: string, record: SyncedPriceRecord) {
  const redis = getRedisClient();

  if (redis) {
    await redis.hset(CACHE_KEY, { [slug]: record });
    return;
  }

  getMemoryCache().set(slug, record);
}

export async function resolveDeckPrice(deck: CatalogAvailableDeck): Promise<PricedDeck> {
  if (deck.checkoutProvider === "App Store") {
    return applyAppStorePriceToDeck(deck);
  }

  const cached = await readCachedPrice(deck.slug);
  if (cached) {
    return applyPriceRecordToDeck(deck, cached);
  }

  try {
    const synced = await syncDeckPrice(deck);
    await writeCachedPrice(deck.slug, synced);
    return applyPriceRecordToDeck(deck, synced);
  } catch (error) {
    console.warn(`[checkout_pricing] price unavailable for ${deck.slug}`, error);
    return applyPendingPriceToDeck(deck);
  }
}

export async function getPricedDeckBySlug(slug: string) {
  const deck = getCatalogDeckBySlug(slug);
  if (!deck) {
    return undefined;
  }

  return resolveDeckPrice(deck);
}

/** @deprecated Use getPricedDeckBySlug */
export const getAvailableDeckBySlugWithSyncedPrice = getPricedDeckBySlug;

export async function getPricedDecks() {
  return Promise.all(catalogAvailableDecks.map((deck) => resolveDeckPrice(deck)));
}

/** @deprecated Use getPricedDecks */
export const getAvailableDecksWithSyncedPrices = getPricedDecks;

export async function getPricedDecksByCategory() {
  const decks = await getPricedDecks();

  return categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      decks: sortDecksByCatalogOrder(decks.filter((deck) => deck.category === category)),
    }))
    .filter((group) => group.decks.length > 0);
}

export async function getFeaturedPricedDecks() {
  const decks = await getPricedDecks();
  const bySlug = new Map(decks.map((deck) => [deck.slug, deck]));

  return featuredDeckSlugs
    .map((slug) => bySlug.get(slug))
    .filter((deck): deck is PricedDeck => deck !== undefined);
}

/** @deprecated Use getFeaturedPricedDecks */
export const getFeaturedDecksWithSyncedPrices = getFeaturedPricedDecks;

/** @deprecated Use getPricedDecksByCategory */
export const getAvailableDecksByCategoryWithSyncedPrices = getPricedDecksByCategory;

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>,
) {
  const results: R[] = [];
  let index = 0;

  async function runWorker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await worker(items[current]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, runWorker));
  return results;
}

export async function syncAllCheckoutPrices(): Promise<CheckoutPriceSyncResult> {
  resetLemonVariantIndexCache();

  const result: CheckoutPriceSyncResult = {
    synced: 0,
    gumroad: 0,
    lemon: 0,
    failed: 0,
    errors: [],
  };

  await mapWithConcurrency(
    catalogAvailableDecks.filter((deck) => deck.checkoutProvider !== "App Store"),
    5,
    async (deck) => {
      try {
        const record = await syncDeckPrice(deck);
        await writeCachedPrice(deck.slug, record);
        result.synced += 1;
        result[record.source] += 1;
      } catch (error) {
        result.failed += 1;
        result.errors.push(
          `${deck.slug}: ${error instanceof Error ? error.message : "Unknown sync error"}`,
        );
      }
    },
  );

  return result;
}

export { type AvailableDeck, applyPriceRecordToDeck as applySyncedPriceToDeck };
