import type { FunnelEvent } from "./analytics";
import { classifyTrafficChannel, type TrafficChannel } from "./traffic-channel";

export type DailyUniqueCounts = Record<string, number>;

export type ProductUniqueMetrics = {
  visitors: number;
  intents: number;
  conversions: number;
};

export type VisitorMetrics = {
  lifetimeUnique: number;
  periodUnique: number;
  lifetimeByChannel: Record<TrafficChannel, number>;
  periodByChannel: Record<TrafficChannel, number>;
  dailyUnique: DailyUniqueCounts;
  dailyPageViews: DailyUniqueCounts;
  products: Record<string, ProductUniqueMetrics>;
  paths: Record<string, number>;
};

export function emptyVisitorMetrics(): VisitorMetrics {
  return {
    lifetimeUnique: 0,
    periodUnique: 0,
    lifetimeByChannel: { google: 0, chatgpt: 0, direct: 0, other: 0 },
    periodByChannel: { google: 0, chatgpt: 0, direct: 0, other: 0 },
    dailyUnique: {},
    dailyPageViews: {},
    products: {},
    paths: {},
  };
}

type VisitorSetStore = {
  lifetime: Set<string>;
  period: Set<string>;
  lifetimeChannel: Record<TrafficChannel, Set<string>>;
  periodChannel: Record<TrafficChannel, Set<string>>;
  daily: Map<string, Set<string>>;
  lifetimeProductVisitors: Map<string, Set<string>>;
  lifetimeProductIntents: Map<string, Set<string>>;
  lifetimeProductConversions: Map<string, Set<string>>;
  periodProductVisitors: Map<string, Set<string>>;
  periodProductIntents: Map<string, Set<string>>;
  periodProductConversions: Map<string, Set<string>>;
  pathVisitors: Map<string, Set<string>>;
  dailyPageViews: Map<string, number>;
};

type GlobalWithVisitorSets = typeof globalThis & {
  __uniprep2goVisitorSets?: VisitorSetStore;
};

function emptyChannelSets(): Record<TrafficChannel, Set<string>> {
  return {
    google: new Set(),
    chatgpt: new Set(),
    direct: new Set(),
    other: new Set(),
  };
}

function getMemoryVisitorSets(): VisitorSetStore {
  const globalStore = globalThis as GlobalWithVisitorSets;

  if (!globalStore.__uniprep2goVisitorSets) {
    globalStore.__uniprep2goVisitorSets = {
      lifetime: new Set(),
      period: new Set(),
      lifetimeChannel: emptyChannelSets(),
      periodChannel: emptyChannelSets(),
      daily: new Map(),
      lifetimeProductVisitors: new Map(),
      lifetimeProductIntents: new Map(),
      lifetimeProductConversions: new Map(),
      periodProductVisitors: new Map(),
      periodProductIntents: new Map(),
      periodProductConversions: new Map(),
      pathVisitors: new Map(),
      dailyPageViews: new Map(),
    };
  }

  return globalStore.__uniprep2goVisitorSets;
}

export function resetPeriodVisitorSets() {
  const store = getMemoryVisitorSets();
  store.period.clear();
  store.periodChannel = emptyChannelSets();
  store.periodProductVisitors.clear();
  store.periodProductIntents.clear();
  store.periodProductConversions.clear();
  store.pathVisitors.clear();
}

export function resetAllVisitorSets() {
  const globalStore = globalThis as GlobalWithVisitorSets;
  globalStore.__uniprep2goVisitorSets = {
    lifetime: new Set(),
    period: new Set(),
    lifetimeChannel: emptyChannelSets(),
    periodChannel: emptyChannelSets(),
    daily: new Map(),
    lifetimeProductVisitors: new Map(),
    lifetimeProductIntents: new Map(),
    lifetimeProductConversions: new Map(),
    periodProductVisitors: new Map(),
    periodProductIntents: new Map(),
    periodProductConversions: new Map(),
    pathVisitors: new Map(),
    dailyPageViews: new Map(),
  };
}

function dayKey(isoTimestamp: string) {
  return isoTimestamp.slice(0, 10);
}

function addToSetMap(map: Map<string, Set<string>>, key: string, visitorId: string) {
  const bucket = map.get(key) ?? new Set<string>();
  bucket.add(visitorId);
  map.set(key, bucket);
}

export function resolveProductKey(event: FunnelEvent) {
  if (event.name === "mock_landing_view" || event.source?.startsWith("mock:")) {
    const fromSource = event.source?.match(/^mock:([^:]+)/)?.[1];
    const fromPath = event.path?.match(/^\/mock-exams\/([^/]+)/)?.[1];

    if (fromSource || fromPath) {
      return `mock:${fromSource ?? fromPath}`;
    }
  }

  return event.deckSlug;
}

function isPageViewEvent(event: FunnelEvent) {
  return event.name === "page_view" || event.name === "mock_landing_view";
}

function isVisitorTouchEvent(event: FunnelEvent) {
  return isPageViewEvent(event);
}

function isIntentEvent(event: FunnelEvent) {
  return event.name === "checkout_intent" || event.name === "mock_started";
}

function isConversionEvent(event: FunnelEvent) {
  return (
    event.name === "checkout_click" ||
    event.name === "mock_deck_cta_click" ||
    event.name === "mock_unlock_interest"
  );
}

export function recordDailyTrafficMetricsInMemory(event: FunnelEvent) {
  if (!isPageViewEvent(event)) {
    return;
  }

  const store = getMemoryVisitorSets();
  const date = dayKey(event.occurredAt);
  store.dailyPageViews.set(date, (store.dailyPageViews.get(date) ?? 0) + 1);
}

export function recordVisitorMetricInMemory(event: FunnelEvent) {
  const visitorId = event.visitorId?.trim();

  if (!visitorId) {
    return;
  }

  const store = getMemoryVisitorSets();
  const channel = classifyTrafficChannel(event.referrer);
  const date = dayKey(event.occurredAt);

  store.lifetime.add(visitorId);
  store.period.add(visitorId);
  store.lifetimeChannel[channel].add(visitorId);
  store.periodChannel[channel].add(visitorId);

  const dailyBucket = store.daily.get(date) ?? new Set<string>();
  dailyBucket.add(visitorId);
  store.daily.set(date, dailyBucket);

  if (event.path) {
    addToSetMap(store.pathVisitors, event.path, visitorId);
  }

  const productKey = resolveProductKey(event);

  if (isVisitorTouchEvent(event)) {
    addToSetMap(store.lifetimeProductVisitors, productKey, visitorId);
    addToSetMap(store.periodProductVisitors, productKey, visitorId);
  }

  if (isIntentEvent(event)) {
    addToSetMap(store.lifetimeProductIntents, productKey, visitorId);
    addToSetMap(store.periodProductIntents, productKey, visitorId);
  }

  if (isConversionEvent(event)) {
    addToSetMap(store.lifetimeProductConversions, productKey, visitorId);
    addToSetMap(store.periodProductConversions, productKey, visitorId);
  }
}

function setSize(value: Set<string> | undefined) {
  return value?.size ?? 0;
}

function mapSetSizes(map: Map<string, Set<string>>) {
  const result: Record<string, number> = {};

  for (const [key, value] of map.entries()) {
    result[key] = value.size;
  }

  return result;
}

export function readVisitorMetricsFromMemory(): VisitorMetrics {
  const store = getMemoryVisitorSets();
  const products = new Set([
    ...store.periodProductVisitors.keys(),
    ...store.periodProductIntents.keys(),
    ...store.periodProductConversions.keys(),
  ]);

  const productMetrics: Record<string, ProductUniqueMetrics> = {};

  for (const product of products) {
    productMetrics[product] = {
      visitors: setSize(store.periodProductVisitors.get(product)),
      intents: setSize(store.periodProductIntents.get(product)),
      conversions: setSize(store.periodProductConversions.get(product)),
    };
  }

  const dailyUnique: DailyUniqueCounts = {};

  for (const [date, visitors] of store.daily.entries()) {
    dailyUnique[date] = visitors.size;
  }

  const dailyPageViews: DailyUniqueCounts = Object.fromEntries(store.dailyPageViews.entries());

  return {
    lifetimeUnique: store.lifetime.size,
    periodUnique: store.period.size,
    lifetimeByChannel: {
      google: store.lifetimeChannel.google.size,
      chatgpt: store.lifetimeChannel.chatgpt.size,
      direct: store.lifetimeChannel.direct.size,
      other: store.lifetimeChannel.other.size,
    },
    periodByChannel: {
      google: store.periodChannel.google.size,
      chatgpt: store.periodChannel.chatgpt.size,
      direct: store.periodChannel.direct.size,
      other: store.periodChannel.other.size,
    },
    dailyUnique,
    dailyPageViews,
    products: productMetrics,
    paths: mapSetSizes(store.pathVisitors),
  };
}

export const VISITOR_REDIS_KEYS = {
  lifetime: "funnel:visitors:lifetime",
  period: "funnel:visitors:period",
  lifetimeChannel: (channel: TrafficChannel) => `funnel:visitors:lifetime:channel:${channel}`,
  periodChannel: (channel: TrafficChannel) => `funnel:visitors:period:channel:${channel}`,
  daily: (date: string) => `funnel:visitors:day:${date}`,
  dailyPageViews: (date: string) => `funnel:pageviews:day:${date}`,
  lifetimeProductVisitors: (productKey: string) => `funnel:product:lifetime:visitors:${productKey}`,
  lifetimeProductIntents: (productKey: string) => `funnel:product:lifetime:intents:${productKey}`,
  lifetimeProductConversions: (productKey: string) => `funnel:product:lifetime:conversions:${productKey}`,
  periodProductVisitors: (productKey: string) => `funnel:product:period:visitors:${productKey}`,
  periodProductIntents: (productKey: string) => `funnel:product:period:intents:${productKey}`,
  periodProductConversions: (productKey: string) => `funnel:product:period:conversions:${productKey}`,
  pathVisitors: (path: string) => `funnel:path:visitors:${encodeURIComponent(path)}`,
  productIndex: "funnel:product:index",
  pathIndex: "funnel:path:index",
} as const;

export function visitorMetricRedisOperations(event: FunnelEvent) {
  const visitorId = event.visitorId?.trim();

  if (!visitorId) {
    return [] as const;
  }

  const channel = classifyTrafficChannel(event.referrer);
  const date = dayKey(event.occurredAt);
  const productKey = resolveProductKey(event);
  const ops: Array<(pipeline: {
    sadd: (key: string, member: string) => unknown;
    expire: (key: string, seconds: number) => unknown;
  }) => void> = [];

  const trackVisitor = (pipeline: { sadd: (key: string, member: string) => unknown }) => {
    pipeline.sadd(VISITOR_REDIS_KEYS.lifetime, visitorId);
    pipeline.sadd(VISITOR_REDIS_KEYS.period, visitorId);
    pipeline.sadd(VISITOR_REDIS_KEYS.lifetimeChannel(channel), visitorId);
    pipeline.sadd(VISITOR_REDIS_KEYS.periodChannel(channel), visitorId);
    pipeline.sadd(VISITOR_REDIS_KEYS.daily(date), visitorId);
  };

  ops.push(trackVisitor);
  ops.push((pipeline) => {
    pipeline.expire(VISITOR_REDIS_KEYS.daily(date), 60 * 60 * 24 * 45);
  });

  if (event.path) {
    ops.push((pipeline) => {
      pipeline.sadd(VISITOR_REDIS_KEYS.pathVisitors(event.path!), visitorId);
      pipeline.sadd(VISITOR_REDIS_KEYS.pathIndex, event.path!);
    });
  }

  if (isVisitorTouchEvent(event)) {
    ops.push((pipeline) => {
      pipeline.sadd(VISITOR_REDIS_KEYS.lifetimeProductVisitors(productKey), visitorId);
      pipeline.sadd(VISITOR_REDIS_KEYS.periodProductVisitors(productKey), visitorId);
      pipeline.sadd(VISITOR_REDIS_KEYS.productIndex, productKey);
    });
  }

  if (isIntentEvent(event)) {
    ops.push((pipeline) => {
      pipeline.sadd(VISITOR_REDIS_KEYS.lifetimeProductIntents(productKey), visitorId);
      pipeline.sadd(VISITOR_REDIS_KEYS.periodProductIntents(productKey), visitorId);
      pipeline.sadd(VISITOR_REDIS_KEYS.productIndex, productKey);
    });
  }

  if (isConversionEvent(event)) {
    ops.push((pipeline) => {
      pipeline.sadd(VISITOR_REDIS_KEYS.lifetimeProductConversions(productKey), visitorId);
      pipeline.sadd(VISITOR_REDIS_KEYS.periodProductConversions(productKey), visitorId);
      pipeline.sadd(VISITOR_REDIS_KEYS.productIndex, productKey);
    });
  }

  return ops;
}

export function dailyTrafficRedisOperations(event: FunnelEvent) {
  if (!isPageViewEvent(event)) {
    return [] as const;
  }

  const date = dayKey(event.occurredAt);

  return [
    (pipeline: { incr: (key: string) => unknown; expire: (key: string, seconds: number) => unknown }) => {
      pipeline.incr(VISITOR_REDIS_KEYS.dailyPageViews(date));
      pipeline.expire(VISITOR_REDIS_KEYS.dailyPageViews(date), 60 * 60 * 24 * 45);
    },
  ] as const;
}

const TRAFFIC_CHANNELS: TrafficChannel[] = ["google", "chatgpt", "direct", "other"];

function recentDayKeys(days: number, now = new Date()) {
  const keys: string[] = [];

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(now);
    date.setUTCDate(date.getUTCDate() - offset);
    keys.push(date.toISOString().slice(0, 10));
  }

  return keys;
}

type RedisLike = {
  scard: (key: string) => Promise<number>;
  get: (key: string) => Promise<number | string | null>;
  smembers: <T = string>(key: string) => Promise<T[]>;
};

export async function readVisitorMetricsFromRedis(client: RedisLike): Promise<VisitorMetrics> {
  const [
    lifetimeUnique,
    periodUnique,
    lifetimeGoogle,
    lifetimeChatgpt,
    lifetimeDirect,
    lifetimeOther,
    periodGoogle,
    periodChatgpt,
    periodDirect,
    periodOther,
    productKeys,
    pathKeys,
  ] = await Promise.all([
    client.scard(VISITOR_REDIS_KEYS.lifetime),
    client.scard(VISITOR_REDIS_KEYS.period),
    client.scard(VISITOR_REDIS_KEYS.lifetimeChannel("google")),
    client.scard(VISITOR_REDIS_KEYS.lifetimeChannel("chatgpt")),
    client.scard(VISITOR_REDIS_KEYS.lifetimeChannel("direct")),
    client.scard(VISITOR_REDIS_KEYS.lifetimeChannel("other")),
    client.scard(VISITOR_REDIS_KEYS.periodChannel("google")),
    client.scard(VISITOR_REDIS_KEYS.periodChannel("chatgpt")),
    client.scard(VISITOR_REDIS_KEYS.periodChannel("direct")),
    client.scard(VISITOR_REDIS_KEYS.periodChannel("other")),
    client.smembers<string>(VISITOR_REDIS_KEYS.productIndex),
    client.smembers<string>(VISITOR_REDIS_KEYS.pathIndex),
  ]);

  const dayKeys = recentDayKeys(14);
  const [dailyCounts, pageViewCounts] = await Promise.all([
    Promise.all(dayKeys.map((date) => client.scard(VISITOR_REDIS_KEYS.daily(date)))),
    Promise.all(dayKeys.map((date) => client.get(VISITOR_REDIS_KEYS.dailyPageViews(date)))),
  ]);
  const dailyUnique = Object.fromEntries(dayKeys.map((date, index) => [date, dailyCounts[index] ?? 0]));
  const dailyPageViews = Object.fromEntries(
    dayKeys.map((date, index) => [date, Number(pageViewCounts[index]) || 0]),
  );

  const products: Record<string, ProductUniqueMetrics> = {};

  for (const productKey of productKeys ?? []) {
    const [visitors, intents, conversions] = await Promise.all([
      client.scard(VISITOR_REDIS_KEYS.periodProductVisitors(productKey)),
      client.scard(VISITOR_REDIS_KEYS.periodProductIntents(productKey)),
      client.scard(VISITOR_REDIS_KEYS.periodProductConversions(productKey)),
    ]);

    products[productKey] = { visitors, intents, conversions };
  }

  const paths: Record<string, number> = {};

  for (const path of pathKeys ?? []) {
    paths[path] = await client.scard(VISITOR_REDIS_KEYS.pathVisitors(path));
  }

  return {
    lifetimeUnique,
    periodUnique,
    lifetimeByChannel: {
      google: lifetimeGoogle,
      chatgpt: lifetimeChatgpt,
      direct: lifetimeDirect,
      other: lifetimeOther,
    },
    periodByChannel: {
      google: periodGoogle,
      chatgpt: periodChatgpt,
      direct: periodDirect,
      other: periodOther,
    },
    dailyUnique,
    dailyPageViews,
    products,
    paths,
  };
}

export function periodVisitorRedisKeysForReset() {
  return [
    VISITOR_REDIS_KEYS.period,
    ...TRAFFIC_CHANNELS.map((channel) => VISITOR_REDIS_KEYS.periodChannel(channel)),
  ];
}

export function lifetimeProductRedisKeys(productKey: string) {
  return [
    VISITOR_REDIS_KEYS.lifetimeProductVisitors(productKey),
    VISITOR_REDIS_KEYS.lifetimeProductIntents(productKey),
    VISITOR_REDIS_KEYS.lifetimeProductConversions(productKey),
  ];
}

export function periodProductRedisKeys(productKey: string) {
  return [
    VISITOR_REDIS_KEYS.periodProductVisitors(productKey),
    VISITOR_REDIS_KEYS.periodProductIntents(productKey),
    VISITOR_REDIS_KEYS.periodProductConversions(productKey),
  ];
}

export async function deletePeriodProductRedisKeys(
  client: RedisLike & { del: (...keys: string[]) => Promise<number>; smembers: <T = string>(key: string) => Promise<T[]> },
) {
  const productKeys = await client.smembers<string>(VISITOR_REDIS_KEYS.productIndex);

  if (productKeys.length === 0) {
    return;
  }

  await client.del(...productKeys.flatMap(periodProductRedisKeys));
}

export async function deleteAllProductRedisKeys(
  client: RedisLike & { del: (...keys: string[]) => Promise<number>; smembers: <T = string>(key: string) => Promise<T[]> },
) {
  const productKeys = await client.smembers<string>(VISITOR_REDIS_KEYS.productIndex);

  if (productKeys.length === 0) {
    await client.del(VISITOR_REDIS_KEYS.productIndex);
    return;
  }

  await client.del(
    ...productKeys.flatMap((productKey) => [
      ...lifetimeProductRedisKeys(productKey),
      ...periodProductRedisKeys(productKey),
    ]),
    VISITOR_REDIS_KEYS.productIndex,
  );
}

export async function deleteIndexedRedisKeys(
  client: RedisLike & { del: (...keys: string[]) => Promise<number> },
  indexKey: string,
  keysForMember: (member: string) => string[],
) {
  const members = await client.smembers<string>(indexKey);
  const keysToDelete = members.flatMap(keysForMember);

  if (keysToDelete.length > 0) {
    await client.del(...keysToDelete, indexKey);
    return;
  }

  await client.del(indexKey);
}
