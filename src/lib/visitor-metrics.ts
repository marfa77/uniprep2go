import type { FunnelEvent } from "./analytics";
import {
  TRAFFIC_CHANNELS,
  classifyTrafficChannel,
  emptyChannelCounts,
  type TrafficChannel,
} from "./traffic-channel";

export type DailyUniqueCounts = Record<string, number>;

export type ProductUniqueMetrics = {
  visitors: number;
  intents: number;
  /** mock_completed unique visitors — mid-funnel for mocks; 0 for decks */
  completions: number;
  conversions: number;
};

export type VisitorMetrics = {
  lifetimeUnique: number;
  periodUnique: number;
  periodNew: number;
  periodReturning: number;
  lifetimeByChannel: Record<TrafficChannel, number>;
  periodByChannel: Record<TrafficChannel, number>;
  periodByCountry: Record<string, number>;
  dailyUnique: DailyUniqueCounts;
  dailyPageViews: DailyUniqueCounts;
  products: Record<string, ProductUniqueMetrics>;
  paths: Record<string, number>;
  /** Unique visitors per path ∩ period channel (pages seen by that channel's visitors). */
  pathsByChannel: Record<TrafficChannel, Record<string, number>>;
  /** Unique visitors per path ∩ lifetime channel (all-time Google / LLM page ranks). */
  lifetimePathsByChannel: Record<TrafficChannel, Record<string, number>>;
};

function emptyChannelPathCounts(): Record<TrafficChannel, Record<string, number>> {
  return {
    google: {},
    chatgpt: {},
    llm: {},
    direct: {},
    other: {},
  };
}

export function emptyVisitorMetrics(): VisitorMetrics {
  return {
    lifetimeUnique: 0,
    periodUnique: 0,
    periodNew: 0,
    periodReturning: 0,
    lifetimeByChannel: emptyChannelCounts(),
    periodByChannel: emptyChannelCounts(),
    periodByCountry: {},
    dailyUnique: {},
    dailyPageViews: {},
    products: {},
    paths: {},
    pathsByChannel: emptyChannelPathCounts(),
    lifetimePathsByChannel: emptyChannelPathCounts(),
  };
}

type VisitorSetStore = {
  lifetime: Set<string>;
  period: Set<string>;
  periodNew: Set<string>;
  periodReturning: Set<string>;
  lifetimeChannel: Record<TrafficChannel, Set<string>>;
  periodChannel: Record<TrafficChannel, Set<string>>;
  daily: Map<string, Set<string>>;
  lifetimeProductVisitors: Map<string, Set<string>>;
  lifetimeProductIntents: Map<string, Set<string>>;
  lifetimeProductCompletions: Map<string, Set<string>>;
  lifetimeProductConversions: Map<string, Set<string>>;
  periodProductVisitors: Map<string, Set<string>>;
  periodProductIntents: Map<string, Set<string>>;
  periodProductCompletions: Map<string, Set<string>>;
  periodProductConversions: Map<string, Set<string>>;
  periodCountry: Map<string, Set<string>>;
  pathVisitors: Map<string, Set<string>>;
  /** Paths touched in the current period only — cleared on period reset. */
  periodPathVisitors: Map<string, Set<string>>;
  dailyPageViews: Map<string, number>;
};

type GlobalWithVisitorSets = typeof globalThis & {
  __uniprep2goVisitorSets?: VisitorSetStore;
};

function emptyChannelSets(): Record<TrafficChannel, Set<string>> {
  return {
    google: new Set(),
    chatgpt: new Set(),
    llm: new Set(),
    direct: new Set(),
    other: new Set(),
  };
}

function channelFromEvent(event: FunnelEvent) {
  return classifyTrafficChannel(event.referrer, {
    utmSource: event.utmSource,
    utmMedium: event.utmMedium,
  });
}

function getMemoryVisitorSets(): VisitorSetStore {
  const globalStore = globalThis as GlobalWithVisitorSets;

  if (!globalStore.__uniprep2goVisitorSets) {
    globalStore.__uniprep2goVisitorSets = {
      lifetime: new Set(),
      period: new Set(),
      periodNew: new Set(),
      periodReturning: new Set(),
      lifetimeChannel: emptyChannelSets(),
      periodChannel: emptyChannelSets(),
      daily: new Map(),
      lifetimeProductVisitors: new Map(),
      lifetimeProductIntents: new Map(),
      lifetimeProductCompletions: new Map(),
      lifetimeProductConversions: new Map(),
      periodProductVisitors: new Map(),
      periodProductIntents: new Map(),
      periodProductCompletions: new Map(),
      periodProductConversions: new Map(),
      periodCountry: new Map(),
      pathVisitors: new Map(),
      periodPathVisitors: new Map(),
      dailyPageViews: new Map(),
    };
  }

  // Backfill for hot-reload / older in-memory shapes.
  if (!globalStore.__uniprep2goVisitorSets.periodPathVisitors) {
    globalStore.__uniprep2goVisitorSets.periodPathVisitors = new Map();
  }

  return globalStore.__uniprep2goVisitorSets;
}

export function resetPeriodVisitorSets() {
  const store = getMemoryVisitorSets();
  store.period.clear();
  store.periodNew.clear();
  store.periodReturning.clear();
  store.periodChannel = emptyChannelSets();
  store.periodProductVisitors.clear();
  store.periodProductIntents.clear();
  store.periodProductCompletions.clear();
  store.periodProductConversions.clear();
  store.periodCountry.clear();
  store.periodPathVisitors.clear();
  // Keep pathVisitors across period resets so all-time Google/LLM page ranks survive.
}

export function resetAllVisitorSets() {
  const globalStore = globalThis as GlobalWithVisitorSets;
  globalStore.__uniprep2goVisitorSets = {
    lifetime: new Set(),
    period: new Set(),
    periodNew: new Set(),
    periodReturning: new Set(),
    lifetimeChannel: emptyChannelSets(),
    periodChannel: emptyChannelSets(),
    daily: new Map(),
    lifetimeProductVisitors: new Map(),
    lifetimeProductIntents: new Map(),
    lifetimeProductCompletions: new Map(),
    lifetimeProductConversions: new Map(),
    periodProductVisitors: new Map(),
    periodProductIntents: new Map(),
    periodProductCompletions: new Map(),
    periodProductConversions: new Map(),
    periodCountry: new Map(),
    pathVisitors: new Map(),
    periodPathVisitors: new Map(),
    dailyPageViews: new Map(),
  };
}

function normalizeCountryCode(country: string | undefined) {
  const code = country?.trim().toUpperCase();

  if (!code || code === "XX") {
    return undefined;
  }

  return code;
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
  return (
    event.name === "checkout_intent" ||
    event.name === "mock_started" ||
    // Defensive: checkout_click alone still counts as intent if intent beacon dropped
    event.name === "checkout_click"
  );
}

function isCompletionEvent(event: FunnelEvent) {
  return event.name === "mock_completed";
}

function isConversionEvent(event: FunnelEvent) {
  return (
    event.name === "checkout_click" ||
    event.name === "mock_deck_cta_click" ||
    event.name === "mock_unlock_interest" ||
    event.name === "deck_waitlist_interest"
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
  const channel = channelFromEvent(event);
  const date = dayKey(event.occurredAt);
  const alreadyInPeriod = store.period.has(visitorId);
  const isReturning = !alreadyInPeriod && store.lifetime.has(visitorId);

  store.lifetime.add(visitorId);
  store.period.add(visitorId);

  if (!alreadyInPeriod) {
    if (isReturning) {
      store.periodReturning.add(visitorId);
    } else {
      store.periodNew.add(visitorId);
    }
  }

  store.lifetimeChannel[channel].add(visitorId);
  store.periodChannel[channel].add(visitorId);

  const country = normalizeCountryCode(event.country);

  if (country) {
    addToSetMap(store.periodCountry, country, visitorId);
  }

  const dailyBucket = store.daily.get(date) ?? new Set<string>();
  dailyBucket.add(visitorId);
  store.daily.set(date, dailyBucket);

  if (event.path) {
    addToSetMap(store.pathVisitors, event.path, visitorId);
    addToSetMap(store.periodPathVisitors, event.path, visitorId);
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

  if (isCompletionEvent(event)) {
    addToSetMap(store.lifetimeProductCompletions, productKey, visitorId);
    addToSetMap(store.periodProductCompletions, productKey, visitorId);
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

/** Count path visitors that also appear in a channel visitor set. */
export function intersectPathVisitorsWithChannel(
  pathVisitors: Map<string, Iterable<string>> | Record<string, Iterable<string>>,
  channelVisitors: Set<string>,
): Record<string, number> {
  if (channelVisitors.size === 0) {
    return {};
  }

  const result: Record<string, number> = {};
  const entries =
    pathVisitors instanceof Map ? pathVisitors.entries() : Object.entries(pathVisitors);

  for (const [path, visitors] of entries) {
    let count = 0;
    for (const visitorId of visitors) {
      if (channelVisitors.has(visitorId)) {
        count += 1;
      }
    }
    if (count > 0) {
      result[path] = count;
    }
  }

  return result;
}

function pathsByChannelFromSets(
  pathVisitors: Map<string, Set<string>>,
  periodChannel: Record<TrafficChannel, Set<string>>,
): Record<TrafficChannel, Record<string, number>> {
  const result = emptyChannelPathCounts();

  for (const channel of TRAFFIC_CHANNELS) {
    result[channel] = intersectPathVisitorsWithChannel(pathVisitors, periodChannel[channel]);
  }

  return result;
}

export function readVisitorMetricsFromMemory(): VisitorMetrics {
  const store = getMemoryVisitorSets();
  const products = new Set([
    ...store.periodProductVisitors.keys(),
    ...store.periodProductIntents.keys(),
    ...store.periodProductCompletions.keys(),
    ...store.periodProductConversions.keys(),
  ]);

  const productMetrics: Record<string, ProductUniqueMetrics> = {};

  for (const product of products) {
    productMetrics[product] = {
      visitors: setSize(store.periodProductVisitors.get(product)),
      intents: setSize(store.periodProductIntents.get(product)),
      completions: setSize(store.periodProductCompletions.get(product)),
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
    periodNew: store.periodNew.size,
    periodReturning: store.periodReturning.size,
    lifetimeByChannel: {
      google: store.lifetimeChannel.google.size,
      chatgpt: store.lifetimeChannel.chatgpt.size,
      llm: store.lifetimeChannel.llm.size,
      direct: store.lifetimeChannel.direct.size,
      other: store.lifetimeChannel.other.size,
    },
    periodByChannel: {
      google: store.periodChannel.google.size,
      chatgpt: store.periodChannel.chatgpt.size,
      llm: store.periodChannel.llm.size,
      direct: store.periodChannel.direct.size,
      other: store.periodChannel.other.size,
    },
    periodByCountry: mapSetSizes(store.periodCountry),
    dailyUnique,
    dailyPageViews,
    products: productMetrics,
    paths: intersectPathVisitorsWithChannel(store.periodPathVisitors, store.period),
    pathsByChannel: pathsByChannelFromSets(store.periodPathVisitors, store.periodChannel),
    lifetimePathsByChannel: pathsByChannelFromSets(store.pathVisitors, store.lifetimeChannel),
  };
}

export const VISITOR_REDIS_KEYS = {
  lifetime: "funnel:visitors:lifetime",
  period: "funnel:visitors:period",
  periodNew: "funnel:visitors:period:new",
  periodReturning: "funnel:visitors:period:returning",
  lifetimeChannel: (channel: TrafficChannel) => `funnel:visitors:lifetime:channel:${channel}`,
  periodChannel: (channel: TrafficChannel) => `funnel:visitors:period:channel:${channel}`,
  daily: (date: string) => `funnel:visitors:day:${date}`,
  dailyPageViews: (date: string) => `funnel:pageviews:day:${date}`,
  lifetimeProductVisitors: (productKey: string) => `funnel:product:lifetime:visitors:${productKey}`,
  lifetimeProductIntents: (productKey: string) => `funnel:product:lifetime:intents:${productKey}`,
  lifetimeProductCompletions: (productKey: string) =>
    `funnel:product:lifetime:completions:${productKey}`,
  lifetimeProductConversions: (productKey: string) => `funnel:product:lifetime:conversions:${productKey}`,
  periodProductVisitors: (productKey: string) => `funnel:product:period:visitors:${productKey}`,
  periodProductIntents: (productKey: string) => `funnel:product:period:intents:${productKey}`,
  periodProductCompletions: (productKey: string) => `funnel:product:period:completions:${productKey}`,
  periodProductConversions: (productKey: string) => `funnel:product:period:conversions:${productKey}`,
  pathVisitors: (path: string) => `funnel:path:visitors:${encodeURIComponent(path)}`,
  productIndex: "funnel:product:index",
  pathIndex: "funnel:path:index",
  periodPathVisitors: (path: string) => `funnel:path:period:visitors:${encodeURIComponent(path)}`,
  periodPathIndex: "funnel:path:period:index",
  periodCountry: (countryCode: string) => `funnel:visitors:period:country:${countryCode}`,
  countryIndex: "funnel:country:index",
} as const;

export type VisitorReturnStatus = {
  alreadyInPeriod: boolean;
  isReturning: boolean;
};

export async function resolveVisitorReturnStatus(
  client: { sismember: (key: string, member: string) => Promise<number | boolean> },
  visitorId: string | undefined,
): Promise<VisitorReturnStatus> {
  const normalizedVisitorId = visitorId?.trim();

  if (!normalizedVisitorId) {
    return { alreadyInPeriod: false, isReturning: false };
  }

  const [alreadyInPeriod, knownBefore] = await Promise.all([
    client.sismember(VISITOR_REDIS_KEYS.period, normalizedVisitorId),
    client.sismember(VISITOR_REDIS_KEYS.lifetime, normalizedVisitorId),
  ]);

  return {
    alreadyInPeriod: Boolean(alreadyInPeriod),
    isReturning: !alreadyInPeriod && Boolean(knownBefore),
  };
}

export function visitorMetricRedisOperations(
  event: FunnelEvent,
  returnStatus: VisitorReturnStatus = { alreadyInPeriod: false, isReturning: false },
) {
  const visitorId = event.visitorId?.trim();

  if (!visitorId) {
    return [] as const;
  }

  const channel = channelFromEvent(event);
  const country = normalizeCountryCode(event.country);
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

  if (!returnStatus.alreadyInPeriod) {
    ops.push((pipeline) => {
      if (returnStatus.isReturning) {
        pipeline.sadd(VISITOR_REDIS_KEYS.periodReturning, visitorId);
      } else {
        pipeline.sadd(VISITOR_REDIS_KEYS.periodNew, visitorId);
      }
    });
  }

  if (country) {
    ops.push((pipeline) => {
      pipeline.sadd(VISITOR_REDIS_KEYS.periodCountry(country), visitorId);
      pipeline.sadd(VISITOR_REDIS_KEYS.countryIndex, country);
    });
  }

  if (event.path) {
    ops.push((pipeline) => {
      pipeline.sadd(VISITOR_REDIS_KEYS.pathVisitors(event.path!), visitorId);
      pipeline.sadd(VISITOR_REDIS_KEYS.pathIndex, event.path!);
      pipeline.sadd(VISITOR_REDIS_KEYS.periodPathVisitors(event.path!), visitorId);
      pipeline.sadd(VISITOR_REDIS_KEYS.periodPathIndex, event.path!);
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

  if (isCompletionEvent(event)) {
    ops.push((pipeline) => {
      pipeline.sadd(VISITOR_REDIS_KEYS.lifetimeProductCompletions(productKey), visitorId);
      pipeline.sadd(VISITOR_REDIS_KEYS.periodProductCompletions(productKey), visitorId);
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

const PATH_CHANNEL_RANK_CHANNELS: TrafficChannel[] = ["google", "chatgpt", "llm"];

export async function readVisitorMetricsFromRedis(client: RedisLike): Promise<VisitorMetrics> {
  const [
    lifetimeUnique,
    periodUnique,
    periodNew,
    periodReturning,
    ...channelAndIndexCounts
  ] = await Promise.all([
    client.scard(VISITOR_REDIS_KEYS.lifetime),
    client.scard(VISITOR_REDIS_KEYS.period),
    client.scard(VISITOR_REDIS_KEYS.periodNew),
    client.scard(VISITOR_REDIS_KEYS.periodReturning),
    ...TRAFFIC_CHANNELS.map((channel) => client.scard(VISITOR_REDIS_KEYS.lifetimeChannel(channel))),
    ...TRAFFIC_CHANNELS.map((channel) => client.scard(VISITOR_REDIS_KEYS.periodChannel(channel))),
    client.smembers<string>(VISITOR_REDIS_KEYS.productIndex),
    client.smembers<string>(VISITOR_REDIS_KEYS.pathIndex),
    client.smembers<string>(VISITOR_REDIS_KEYS.periodPathIndex),
    client.smembers<string>(VISITOR_REDIS_KEYS.countryIndex),
  ]);

  const lifetimeChannelCounts = channelAndIndexCounts.slice(
    0,
    TRAFFIC_CHANNELS.length,
  ) as number[];
  const periodChannelCounts = channelAndIndexCounts.slice(
    TRAFFIC_CHANNELS.length,
    TRAFFIC_CHANNELS.length * 2,
  ) as number[];
  const productKeys = channelAndIndexCounts[TRAFFIC_CHANNELS.length * 2] as string[];
  const pathKeys = channelAndIndexCounts[TRAFFIC_CHANNELS.length * 2 + 1] as string[];
  const periodPathKeys = channelAndIndexCounts[TRAFFIC_CHANNELS.length * 2 + 2] as string[];
  const countryKeys = channelAndIndexCounts[TRAFFIC_CHANNELS.length * 2 + 3] as string[];

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
    const [visitors, intents, completions, conversions] = await Promise.all([
      client.scard(VISITOR_REDIS_KEYS.periodProductVisitors(productKey)),
      client.scard(VISITOR_REDIS_KEYS.periodProductIntents(productKey)),
      client.scard(VISITOR_REDIS_KEYS.periodProductCompletions(productKey)),
      client.scard(VISITOR_REDIS_KEYS.periodProductConversions(productKey)),
    ]);

    products[productKey] = { visitors, intents, completions, conversions };
  }

  const pathMemberLists = new Map<string, string[]>();
  const periodPathMemberLists = new Map<string, string[]>();

  for (const path of pathKeys ?? []) {
    const members = await client.smembers<string>(VISITOR_REDIS_KEYS.pathVisitors(path));
    pathMemberLists.set(path, members ?? []);
  }

  for (const path of periodPathKeys ?? []) {
    const members = await client.smembers<string>(VISITOR_REDIS_KEYS.periodPathVisitors(path));
    periodPathMemberLists.set(path, members ?? []);
  }

  const periodByCountry: Record<string, number> = {};

  for (const countryCode of countryKeys ?? []) {
    periodByCountry[countryCode] = await client.scard(VISITOR_REDIS_KEYS.periodCountry(countryCode));
  }

  const lifetimeByChannel = emptyChannelCounts();
  const periodByChannel = emptyChannelCounts();

  TRAFFIC_CHANNELS.forEach((channel, index) => {
    lifetimeByChannel[channel] = lifetimeChannelCounts[index] ?? 0;
    periodByChannel[channel] = periodChannelCounts[index] ?? 0;
  });

  const periodVisitorMembers =
    periodUnique > 0 ? await client.smembers<string>(VISITOR_REDIS_KEYS.period) : [];
  const periodVisitorSet = new Set(periodVisitorMembers ?? []);
  const paths = intersectPathVisitorsWithChannel(periodPathMemberLists, periodVisitorSet);

  const pathsByChannel = emptyChannelPathCounts();
  const lifetimePathsByChannel = emptyChannelPathCounts();

  const loadChannelMembers = async (scope: "period" | "lifetime", channel: TrafficChannel) => {
    const count =
      scope === "period" ? periodByChannel[channel] ?? 0 : lifetimeByChannel[channel] ?? 0;
    if (count === 0) {
      return new Set<string>();
    }
    const key =
      scope === "period"
        ? VISITOR_REDIS_KEYS.periodChannel(channel)
        : VISITOR_REDIS_KEYS.lifetimeChannel(channel);
    const members = await client.smembers<string>(key);
    return new Set(members ?? []);
  };

  const [periodChannelMemberSets, lifetimeChannelMemberSets] = await Promise.all([
    Promise.all(
      PATH_CHANNEL_RANK_CHANNELS.map(async (channel) => {
        return [channel, await loadChannelMembers("period", channel)] as const;
      }),
    ),
    Promise.all(
      PATH_CHANNEL_RANK_CHANNELS.map(async (channel) => {
        return [channel, await loadChannelMembers("lifetime", channel)] as const;
      }),
    ),
  ]);

  for (const [channel, channelVisitors] of periodChannelMemberSets) {
    pathsByChannel[channel] = intersectPathVisitorsWithChannel(
      periodPathMemberLists,
      channelVisitors,
    );
  }

  for (const [channel, channelVisitors] of lifetimeChannelMemberSets) {
    lifetimePathsByChannel[channel] = intersectPathVisitorsWithChannel(
      pathMemberLists,
      channelVisitors,
    );
  }

  return {
    lifetimeUnique,
    periodUnique,
    periodNew,
    periodReturning,
    lifetimeByChannel,
    periodByChannel,
    periodByCountry,
    dailyUnique,
    dailyPageViews,
    products,
    paths,
    pathsByChannel,
    lifetimePathsByChannel,
  };
}

export function periodVisitorRedisKeysForReset() {
  return [
    VISITOR_REDIS_KEYS.period,
    VISITOR_REDIS_KEYS.periodNew,
    VISITOR_REDIS_KEYS.periodReturning,
    ...TRAFFIC_CHANNELS.map((channel) => VISITOR_REDIS_KEYS.periodChannel(channel)),
  ];
}

export function lifetimeProductRedisKeys(productKey: string) {
  return [
    VISITOR_REDIS_KEYS.lifetimeProductVisitors(productKey),
    VISITOR_REDIS_KEYS.lifetimeProductIntents(productKey),
    VISITOR_REDIS_KEYS.lifetimeProductCompletions(productKey),
    VISITOR_REDIS_KEYS.lifetimeProductConversions(productKey),
  ];
}

export function periodProductRedisKeys(productKey: string) {
  return [
    VISITOR_REDIS_KEYS.periodProductVisitors(productKey),
    VISITOR_REDIS_KEYS.periodProductIntents(productKey),
    VISITOR_REDIS_KEYS.periodProductCompletions(productKey),
    VISITOR_REDIS_KEYS.periodProductConversions(productKey),
  ];
}

export async function deletePeriodPathRedisKeys(
  client: RedisLike & { del: (...keys: string[]) => Promise<number>; smembers: <T = string>(key: string) => Promise<T[]> },
) {
  await deleteIndexedRedisKeys(client, VISITOR_REDIS_KEYS.periodPathIndex, (path) => [
    VISITOR_REDIS_KEYS.periodPathVisitors(path),
  ]);
}

export async function deletePeriodCountryRedisKeys(
  client: RedisLike & { del: (...keys: string[]) => Promise<number>; smembers: <T = string>(key: string) => Promise<T[]> },
) {
  const countryKeys = await client.smembers<string>(VISITOR_REDIS_KEYS.countryIndex);

  if (countryKeys.length === 0) {
    await client.del(VISITOR_REDIS_KEYS.countryIndex);
    return;
  }

  await client.del(
    ...countryKeys.map((countryCode) => VISITOR_REDIS_KEYS.periodCountry(countryCode)),
    VISITOR_REDIS_KEYS.countryIndex,
  );
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
