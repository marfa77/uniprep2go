import type { FunnelEvent, FunnelEventName } from "./analytics";
import { funnelEventNames } from "./analytics";
import { getRedisClient } from "./redis";

const MAX_RECENT_EVENTS = 25;

const KEYS = {
  total: "funnel:total",
  byEvent: "funnel:byEvent",
  byDeck: "funnel:byDeck",
  bySource: "funnel:bySource",
  startedAt: "funnel:startedAt",
  updatedAt: "funnel:updatedAt",
  recent: "funnel:recent",
} as const;

type FunnelStatsState = {
  events: FunnelEvent[];
};

type GlobalWithFunnelStats = typeof globalThis & {
  __uniprep2goFunnelStats?: FunnelStatsState;
};

export type FunnelStats = {
  totalEvents: number;
  byEvent: Record<FunnelEventName, number>;
  byDeck: Record<string, number>;
  bySource: Record<string, number>;
  recentEvents: FunnelEvent[];
  startedAt?: string;
  updatedAt?: string;
  storage: "redis" | "memory";
};

function emptyByEvent() {
  return Object.fromEntries(funnelEventNames.map((name) => [name, 0])) as Record<
    FunnelEventName,
    number
  >;
}

function getMemoryState() {
  const globalStore = globalThis as GlobalWithFunnelStats;

  if (!globalStore.__uniprep2goFunnelStats) {
    globalStore.__uniprep2goFunnelStats = { events: [] };
  }

  return globalStore.__uniprep2goFunnelStats;
}

export async function recordFunnelEvent(event: FunnelEvent) {
  const client = getRedisClient();

  if (!client) {
    getMemoryState().events.push(event);
    return;
  }

  try {
    const pipeline = client.pipeline();
    pipeline.incr(KEYS.total);
    pipeline.hincrby(KEYS.byEvent, event.name, 1);
    pipeline.hincrby(KEYS.byDeck, event.deckSlug, 1);

    if (event.source) {
      pipeline.hincrby(KEYS.bySource, event.source, 1);
    }

    pipeline.set(KEYS.startedAt, event.occurredAt, { nx: true });
    pipeline.set(KEYS.updatedAt, event.occurredAt);
    pipeline.lpush(KEYS.recent, JSON.stringify(event));
    pipeline.ltrim(KEYS.recent, 0, MAX_RECENT_EVENTS - 1);

    await pipeline.exec();
  } catch (error) {
    console.error("[funnel_store] failed to persist event", error);
  }
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

function toCountMap(raw: Record<string, unknown> | null): Record<string, number> {
  const result: Record<string, number> = {};

  if (!raw) {
    return result;
  }

  for (const [key, value] of Object.entries(raw)) {
    result[key] = Number(value) || 0;
  }

  return result;
}

function computeMemoryStats(): FunnelStats {
  const events = getMemoryState().events;
  const byEvent = emptyByEvent();
  const byDeck: Record<string, number> = {};
  const bySource: Record<string, number> = {};

  events.forEach((event) => {
    byEvent[event.name] += 1;
    byDeck[event.deckSlug] = (byDeck[event.deckSlug] ?? 0) + 1;

    if (event.source) {
      bySource[event.source] = (bySource[event.source] ?? 0) + 1;
    }
  });

  return {
    totalEvents: events.length,
    byEvent,
    byDeck,
    bySource,
    recentEvents: events.slice(-MAX_RECENT_EVENTS).reverse(),
    startedAt: events[0]?.occurredAt,
    updatedAt: events.at(-1)?.occurredAt,
    storage: "memory",
  };
}

export async function getFunnelStats(): Promise<FunnelStats> {
  const client = getRedisClient();

  if (!client) {
    return computeMemoryStats();
  }

  try {
    const [total, byEventRaw, byDeckRaw, bySourceRaw, startedAt, updatedAt, recentRaw] =
      await Promise.all([
        client.get<number>(KEYS.total),
        client.hgetall<Record<string, unknown>>(KEYS.byEvent),
        client.hgetall<Record<string, unknown>>(KEYS.byDeck),
        client.hgetall<Record<string, unknown>>(KEYS.bySource),
        client.get<string>(KEYS.startedAt),
        client.get<string>(KEYS.updatedAt),
        client.lrange(KEYS.recent, 0, MAX_RECENT_EVENTS - 1),
      ]);

    const byEvent = emptyByEvent();
    const byEventCounts = toCountMap(byEventRaw);

    for (const name of funnelEventNames) {
      byEvent[name] = byEventCounts[name] ?? 0;
    }

    return {
      totalEvents: Number(total) || 0,
      byEvent,
      byDeck: toCountMap(byDeckRaw),
      bySource: toCountMap(bySourceRaw),
      recentEvents: parseRecent(recentRaw ?? []),
      startedAt: startedAt ?? undefined,
      updatedAt: updatedAt ?? undefined,
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
    getMemoryState().events = [];
    return;
  }

  await client.del(
    KEYS.total,
    KEYS.byEvent,
    KEYS.byDeck,
    KEYS.bySource,
    KEYS.startedAt,
    KEYS.updatedAt,
    KEYS.recent,
  );
}
