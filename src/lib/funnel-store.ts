import type { FunnelEvent } from "./analytics";
import {
  aggregateFromCountMaps,
  applyEventToAggregate,
  emptyAggregate,
  type FunnelAggregate,
} from "./funnel-aggregates";
import { getRedisClient } from "./redis";
import { TRAFFIC_CHANNELS } from "./traffic-channel";
import {
  deleteIndexedRedisKeys,
  deleteAllProductRedisKeys,
  deletePeriodCountryRedisKeys,
  deletePeriodProductRedisKeys,
  emptyVisitorMetrics,
  periodVisitorRedisKeysForReset,
  readVisitorMetricsFromMemory,
  readVisitorMetricsFromRedis,
  dailyTrafficRedisOperations,
  recordDailyTrafficMetricsInMemory,
  recordVisitorMetricInMemory,
  resetAllVisitorSets,
  resetPeriodVisitorSets,
  VISITOR_REDIS_KEYS,
  visitorMetricRedisOperations,
  resolveVisitorReturnStatus,
  type VisitorMetrics,
} from "./visitor-metrics";

const MAX_RECENT_EVENTS = 100;

const KEYS = {
  total: "funnel:total",
  byEvent: "funnel:byEvent",
  byDeck: "funnel:byDeck",
  bySource: "funnel:bySource",
  byCountry: "funnel:byCountry",
  byLanguage: "funnel:byLanguage",
  byReferrer: "funnel:byReferrer",
  startedAt: "funnel:startedAt",
  updatedAt: "funnel:updatedAt",
  recent: "funnel:recent",
} as const;

const LIFETIME_KEYS = {
  total: "funnel:lifetime:total",
  byEvent: "funnel:lifetime:byEvent",
  byDeck: "funnel:lifetime:byDeck",
  bySource: "funnel:lifetime:bySource",
  byCountry: "funnel:lifetime:byCountry",
  byLanguage: "funnel:lifetime:byLanguage",
  byReferrer: "funnel:lifetime:byReferrer",
  startedAt: "funnel:lifetime:startedAt",
  updatedAt: "funnel:lifetime:updatedAt",
} as const;

type FunnelStatsState = {
  current: FunnelAggregate;
  lifetime: FunnelAggregate;
  recentEvents: FunnelEvent[];
};

type GlobalWithFunnelStats = typeof globalThis & {
  __uniprep2goFunnelStats?: FunnelStatsState;
};

export type FunnelStats = FunnelAggregate & {
  recentEvents: FunnelEvent[];
  lifetime: FunnelAggregate;
  visitors: VisitorMetrics;
  storage: "redis" | "memory";
};

function getMemoryState() {
  const globalStore = globalThis as GlobalWithFunnelStats;

  if (!globalStore.__uniprep2goFunnelStats) {
    globalStore.__uniprep2goFunnelStats = {
      current: emptyAggregate(),
      lifetime: emptyAggregate(),
      recentEvents: [],
    };
  }

  return globalStore.__uniprep2goFunnelStats;
}

function appendRecentEvent(state: FunnelStatsState, event: FunnelEvent) {
  state.recentEvents.unshift(event);
  state.recentEvents = state.recentEvents.slice(0, MAX_RECENT_EVENTS);
}

function incrementAggregatePipeline(
  pipeline: ReturnType<NonNullable<ReturnType<typeof getRedisClient>>["pipeline"]>,
  keys: typeof KEYS | typeof LIFETIME_KEYS,
  event: FunnelEvent,
) {
  pipeline.incr(keys.total);
  pipeline.hincrby(keys.byEvent, event.name, 1);
  pipeline.hincrby(keys.byDeck, event.deckSlug, 1);

  if (event.source) {
    pipeline.hincrby(keys.bySource, event.source, 1);
  }

  if (event.country) {
    pipeline.hincrby(keys.byCountry, event.country, 1);
  }

  const language = event.browserLanguage ?? event.acceptLanguage?.split(",")[0]?.trim();
  if (language) {
    pipeline.hincrby(keys.byLanguage, language, 1);
  }

  const referrerHost = normalizeReferrerHost(event.referrer);
  if (referrerHost) {
    pipeline.hincrby(keys.byReferrer, referrerHost, 1);
  }

  pipeline.set(keys.startedAt, event.occurredAt, { nx: true });
  pipeline.set(keys.updatedAt, event.occurredAt);
}

async function readAggregate(
  client: NonNullable<ReturnType<typeof getRedisClient>>,
  keys: typeof KEYS | typeof LIFETIME_KEYS,
): Promise<FunnelAggregate> {
  const [
    total,
    byEventRaw,
    byDeckRaw,
    bySourceRaw,
    byCountryRaw,
    byLanguageRaw,
    byReferrerRaw,
    startedAt,
    updatedAt,
  ] = await Promise.all([
    client.get<number>(keys.total),
    client.hgetall<Record<string, unknown>>(keys.byEvent),
    client.hgetall<Record<string, unknown>>(keys.byDeck),
    client.hgetall<Record<string, unknown>>(keys.bySource),
    client.hgetall<Record<string, unknown>>(keys.byCountry),
    client.hgetall<Record<string, unknown>>(keys.byLanguage),
    client.hgetall<Record<string, unknown>>(keys.byReferrer),
    client.get<string>(keys.startedAt),
    client.get<string>(keys.updatedAt),
  ]);

  return aggregateFromCountMaps({
    total: Number(total) || 0,
    byEventRaw,
    byDeckRaw,
    bySourceRaw,
    byCountryRaw,
    byLanguageRaw,
    byReferrerRaw,
    startedAt: startedAt ?? undefined,
    updatedAt: updatedAt ?? undefined,
  });
}

function parseRecent(entries: unknown[]): FunnelEvent[] {
  return entries
    .map((entry) => {
      if (typeof entry === "string") {
        try {
          return JSON.parse(entry) as FunnelEvent;
        } catch {
          return null;
        }
      }

      return (entry as FunnelEvent) ?? null;
    })
    .filter((entry): entry is FunnelEvent => entry !== null);
}

function cloneAggregate(aggregate: FunnelAggregate): FunnelAggregate {
  return {
    ...aggregate,
    byEvent: { ...aggregate.byEvent },
    byDeck: { ...aggregate.byDeck },
    bySource: { ...aggregate.bySource },
    byCountry: { ...aggregate.byCountry },
    byLanguage: { ...aggregate.byLanguage },
    byReferrer: { ...aggregate.byReferrer },
  };
}

function computeMemoryStats(): FunnelStats {
  const state = getMemoryState();

  return {
    ...cloneAggregate(state.current),
    recentEvents: [...state.recentEvents],
    lifetime: cloneAggregate(state.lifetime),
    visitors: readVisitorMetricsFromMemory(),
    storage: "memory",
  };
}

export async function recordFunnelEvent(event: FunnelEvent) {
  const client = getRedisClient();

  if (!client) {
    const state = getMemoryState();
    applyEventToAggregate(state.current, event);
    applyEventToAggregate(state.lifetime, event);
    appendRecentEvent(state, event);
    recordDailyTrafficMetricsInMemory(event);
    recordVisitorMetricInMemory(event);
    return;
  }

  try {
    const pipeline = client.pipeline();
    incrementAggregatePipeline(pipeline, KEYS, event);
    incrementAggregatePipeline(pipeline, LIFETIME_KEYS, event);
    pipeline.lpush(KEYS.recent, JSON.stringify(event));
    pipeline.ltrim(KEYS.recent, 0, MAX_RECENT_EVENTS - 1);

    for (const operation of dailyTrafficRedisOperations(event)) {
      operation(pipeline);
    }

    const returnStatus = await resolveVisitorReturnStatus(client, event.visitorId);

    for (const operation of visitorMetricRedisOperations(event, returnStatus)) {
      operation(pipeline);
    }

    await pipeline.exec();
  } catch (error) {
    console.error("[funnel_store] failed to persist event", error);
  }
}

async function backfillLifetimeFromCurrent(client: NonNullable<ReturnType<typeof getRedisClient>>) {
  const [currentTotal, lifetimeTotal] = await Promise.all([
    client.get<number>(KEYS.total),
    client.get<number>(LIFETIME_KEYS.total),
  ]);

  if (Number(lifetimeTotal) > 0 || Number(currentTotal) <= 0) {
    return;
  }

  const [byEvent, byDeck, bySource, byCountry, byLanguage, byReferrer, startedAt, updatedAt] = await Promise.all([
    client.hgetall<Record<string, string>>(KEYS.byEvent),
    client.hgetall<Record<string, string>>(KEYS.byDeck),
    client.hgetall<Record<string, string>>(KEYS.bySource),
    client.hgetall<Record<string, string>>(KEYS.byCountry),
    client.hgetall<Record<string, string>>(KEYS.byLanguage),
    client.hgetall<Record<string, string>>(KEYS.byReferrer),
    client.get<string>(KEYS.startedAt),
    client.get<string>(KEYS.updatedAt),
  ]);

  const pipeline = client.pipeline();
  pipeline.set(LIFETIME_KEYS.total, String(currentTotal ?? 0));

  for (const [key, value] of Object.entries(byEvent ?? {})) {
    pipeline.hset(LIFETIME_KEYS.byEvent, { [key]: value });
  }

  for (const [key, value] of Object.entries(byDeck ?? {})) {
    pipeline.hset(LIFETIME_KEYS.byDeck, { [key]: value });
  }

  for (const [key, value] of Object.entries(bySource ?? {})) {
    pipeline.hset(LIFETIME_KEYS.bySource, { [key]: value });
  }

  for (const [key, value] of Object.entries(byCountry ?? {})) {
    pipeline.hset(LIFETIME_KEYS.byCountry, { [key]: value });
  }

  for (const [key, value] of Object.entries(byLanguage ?? {})) {
    pipeline.hset(LIFETIME_KEYS.byLanguage, { [key]: value });
  }

  for (const [key, value] of Object.entries(byReferrer ?? {})) {
    pipeline.hset(LIFETIME_KEYS.byReferrer, { [key]: value });
  }

  if (startedAt) {
    pipeline.set(LIFETIME_KEYS.startedAt, startedAt);
  }

  if (updatedAt) {
    pipeline.set(LIFETIME_KEYS.updatedAt, updatedAt);
  }

  await pipeline.exec();
}

export async function getFunnelStats(): Promise<FunnelStats> {
  const client = getRedisClient();

  if (!client) {
    return computeMemoryStats();
  }

  try {
    await backfillLifetimeFromCurrent(client);

    const [current, lifetime, recentRaw, visitors] = await Promise.all([
      readAggregate(client, KEYS),
      readAggregate(client, LIFETIME_KEYS),
      client.lrange(KEYS.recent, 0, MAX_RECENT_EVENTS - 1),
      readVisitorMetricsFromRedis(client).catch(() => emptyVisitorMetrics()),
    ]);

    return {
      ...current,
      recentEvents: parseRecent(recentRaw ?? []),
      lifetime,
      visitors,
      storage: "redis",
    };
  } catch (error) {
    console.error("[funnel_store] failed to read stats, falling back to memory", error);
    return computeMemoryStats();
  }
}

export async function resetFunnelStats() {
  const client = getRedisClient();

  if (!client) {
    const state = getMemoryState();
    state.current = emptyAggregate();
    state.recentEvents = [];
    resetPeriodVisitorSets();
    return;
  }

  await client.del(
    KEYS.total,
    KEYS.byEvent,
    KEYS.byDeck,
    KEYS.bySource,
    KEYS.byCountry,
    KEYS.byLanguage,
    KEYS.byReferrer,
    KEYS.startedAt,
    KEYS.updatedAt,
    KEYS.recent,
    ...periodVisitorRedisKeysForReset(),
  );

  await deleteIndexedRedisKeys(client, VISITOR_REDIS_KEYS.pathIndex, (path) => [
    VISITOR_REDIS_KEYS.pathVisitors(path),
  ]);
  await deletePeriodCountryRedisKeys(client);
  await deletePeriodProductRedisKeys(client);
}

export async function resetAllFunnelStats() {
  const client = getRedisClient();

  if (!client) {
    const state = getMemoryState();
    state.current = emptyAggregate();
    state.lifetime = emptyAggregate();
    state.recentEvents = [];
    resetAllVisitorSets();
    return;
  }

  await client.del(
    KEYS.total,
    KEYS.byEvent,
    KEYS.byDeck,
    KEYS.bySource,
    KEYS.byCountry,
    KEYS.byLanguage,
    KEYS.byReferrer,
    KEYS.startedAt,
    KEYS.updatedAt,
    KEYS.recent,
    LIFETIME_KEYS.total,
    LIFETIME_KEYS.byEvent,
    LIFETIME_KEYS.byDeck,
    LIFETIME_KEYS.bySource,
    LIFETIME_KEYS.byCountry,
    LIFETIME_KEYS.byLanguage,
    LIFETIME_KEYS.byReferrer,
    LIFETIME_KEYS.startedAt,
    LIFETIME_KEYS.updatedAt,
    VISITOR_REDIS_KEYS.lifetime,
    ...periodVisitorRedisKeysForReset(),
    ...TRAFFIC_CHANNELS.map((channel) => VISITOR_REDIS_KEYS.lifetimeChannel(channel)),
  );

  await deleteIndexedRedisKeys(client, VISITOR_REDIS_KEYS.pathIndex, (path) => [
    VISITOR_REDIS_KEYS.pathVisitors(path),
  ]);
  await deletePeriodCountryRedisKeys(client);
  await deleteAllProductRedisKeys(client);
}

function normalizeReferrerHost(referrer: string | undefined) {
  if (!referrer) {
    return undefined;
  }

  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return referrer.slice(0, 80);
  }
}
