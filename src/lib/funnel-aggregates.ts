import type { FunnelEvent, FunnelEventName } from "./analytics";
import { funnelEventNames } from "./analytics";

export type FunnelAggregate = {
  totalEvents: number;
  byEvent: Record<FunnelEventName, number>;
  byDeck: Record<string, number>;
  bySource: Record<string, number>;
  startedAt?: string;
  updatedAt?: string;
};

export function emptyByEvent() {
  return Object.fromEntries(funnelEventNames.map((name) => [name, 0])) as Record<
    FunnelEventName,
    number
  >;
}

export function emptyAggregate(): FunnelAggregate {
  return {
    totalEvents: 0,
    byEvent: emptyByEvent(),
    byDeck: {},
    bySource: {},
  };
}

export function applyEventToAggregate(aggregate: FunnelAggregate, event: FunnelEvent) {
  aggregate.totalEvents += 1;
  aggregate.byEvent[event.name] += 1;
  aggregate.byDeck[event.deckSlug] = (aggregate.byDeck[event.deckSlug] ?? 0) + 1;

  if (event.source) {
    aggregate.bySource[event.source] = (aggregate.bySource[event.source] ?? 0) + 1;
  }

  aggregate.startedAt ??= event.occurredAt;
  aggregate.updatedAt = event.occurredAt;
}

export function toCountMap(raw: Record<string, unknown> | null): Record<string, number> {
  const result: Record<string, number> = {};

  if (!raw) {
    return result;
  }

  for (const [key, value] of Object.entries(raw)) {
    result[key] = Number(value) || 0;
  }

  return result;
}

export function aggregateFromCountMaps(input: {
  total: number;
  byEventRaw: Record<string, unknown> | null;
  byDeckRaw: Record<string, unknown> | null;
  bySourceRaw: Record<string, unknown> | null;
  startedAt?: string;
  updatedAt?: string;
}): FunnelAggregate {
  const byEvent = emptyByEvent();
  const byEventCounts = toCountMap(input.byEventRaw);

  for (const name of funnelEventNames) {
    byEvent[name] = byEventCounts[name] ?? 0;
  }

  return {
    totalEvents: input.total,
    byEvent,
    byDeck: toCountMap(input.byDeckRaw),
    bySource: toCountMap(input.bySourceRaw),
    startedAt: input.startedAt,
    updatedAt: input.updatedAt,
  };
}
