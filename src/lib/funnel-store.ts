import type { FunnelEvent, FunnelEventName } from "./analytics";
import { funnelEventNames } from "./analytics";

const MAX_RECENT_EVENTS = 25;

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
};

function getState() {
  const globalStore = globalThis as GlobalWithFunnelStats;

  if (!globalStore.__uniprep2goFunnelStats) {
    globalStore.__uniprep2goFunnelStats = { events: [] };
  }

  return globalStore.__uniprep2goFunnelStats;
}

export function recordFunnelEvent(event: FunnelEvent) {
  getState().events.push(event);
}

export function getFunnelStats(): FunnelStats {
  const events = getState().events;
  const byEvent = Object.fromEntries(funnelEventNames.map((name) => [name, 0])) as Record<
    FunnelEventName,
    number
  >;
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
  };
}

export function resetFunnelStats() {
  getState().events = [];
}
