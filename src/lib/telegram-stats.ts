import type { FunnelEvent } from "./analytics";
import type { CheckoutPriceSyncResult } from "./checkout-pricing";
import type { FunnelStats } from "./funnel-store";
import { countMockStartsByMode } from "./mock-exams/session-mode";
import {
  TRAFFIC_CHANNELS,
  classifyTrafficChannel,
  trafficChannelLabels,
  type TrafficChannel,
} from "./traffic-channel";
import type { DailyTrafficSnapshot, ProductUniqueMetrics } from "./visitor-metrics";

export function shouldReturnStats(text: string) {
  const normalized = text.trim().toLowerCase();

  return normalized === "stats" || normalized === "/stats" || normalized === "/stats@mariccol_bot";
}

export function shouldResetStats(text: string) {
  const normalized = text.trim().toLowerCase();

  return (
    normalized === "reset-stats" ||
    normalized === "/reset-stats" ||
    normalized === "/reset-stats@mariccol_bot"
  );
}

export function shouldResetAllStats(text: string) {
  const normalized = text.trim().toLowerCase();

  return (
    normalized === "reset-all-stats" ||
    normalized === "/reset-all-stats" ||
    normalized === "/reset-all-stats@mariccol_bot"
  );
}

export function shouldSyncPrices(text: string) {
  const normalized = text.trim().toLowerCase();

  return normalized === "sync" || normalized === "/sync" || normalized === "/sync@mariccol_bot";
}

function formatRate(numerator: number, denominator: number) {
  if (denominator <= 0) {
    return "0%";
  }

  return `${((numerator / denominator) * 100).toFixed(1)}%`;
}

function formatShortDate(isoDate: string) {
  const [, month, day] = isoDate.split("-");
  return `${day}.${month}`;
}

function formatVisitorBar(visitorCount: number) {
  if (visitorCount <= 0) {
    return " ·";
  }

  return ` ${"▪".repeat(Math.min(visitorCount, 12))}`;
}

export function formatSevenDayDynamics(
  dailyUnique: Record<string, number>,
  dailyPageViews: Record<string, number>,
  days = 7,
  now = new Date(),
) {
  return formatSevenDayGrowthSection(dailyUnique, dailyPageViews, days, now);
}

function sumDailyWindow(dailyUnique: Record<string, number>, dayKeys: string[]) {
  return dayKeys.reduce((total, day) => total + (dailyUnique[day] ?? 0), 0);
}

function recentDayKeys(days: number, anchorDate = new Date()) {
  const keys: string[] = [];

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(anchorDate);
    date.setUTCDate(date.getUTCDate() - offset);
    keys.push(date.toISOString().slice(0, 10));
  }

  return keys;
}

export function computeGrowthSignal(dailyUnique: Record<string, number>, now = new Date()) {
  const last7 = recentDayKeys(7, now);
  const previous7 = recentDayKeys(7, new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));
  const current = sumDailyWindow(dailyUnique, last7);
  const previous = sumDailyWindow(dailyUnique, previous7);

  if (current === 0 && previous === 0) {
    return { label: "— no traffic yet", deltaPercent: 0 };
  }

  if (previous === 0) {
    return { label: "↑ new traffic", deltaPercent: 100 };
  }

  const deltaPercent = Math.round(((current - previous) / previous) * 100);

  if (deltaPercent >= 15) {
    return { label: `↑ growing (+${deltaPercent}% vs prior 7d)`, deltaPercent };
  }

  if (deltaPercent <= -15) {
    return { label: `↓ cooling (${deltaPercent}% vs prior 7d)`, deltaPercent };
  }

  return { label: `→ plateau (${deltaPercent >= 0 ? "+" : ""}${deltaPercent}% vs prior 7d)`, deltaPercent };
}

function formatChannelLine(byChannel: Record<string, number>) {
  return TRAFFIC_CHANNELS.map(
    (channel) => `${trafficChannelLabels[channel]} ${byChannel[channel] ?? 0}`,
  ).join(" · ");
}

function formatProductLabel(productKey: string) {
  if (productKey.startsWith("mock:")) {
    return productKey.replace(/^mock:/, "mock · ");
  }

  return productKey;
}

const TOP_PRODUCTS_LIMIT = 5;

function formatProductLine(productKey: string, metrics: ProductUniqueMetrics) {
  const conversionRate = formatRate(metrics.conversions, metrics.visitors);
  const isMock = productKey.startsWith("mock:");

  if (isMock) {
    return `- ${formatProductLabel(productKey)}: ${metrics.visitors} view → ${metrics.intents} start → ${metrics.completions} done → ${metrics.conversions} convert (${conversionRate})`;
  }

  return `- ${formatProductLabel(productKey)}: ${metrics.visitors} view → ${metrics.intents} intent → ${metrics.conversions} convert (${conversionRate})`;
}

function formatReturningUsers(periodNew: number, periodReturning: number, periodUnique: number) {
  if (periodUnique <= 0) {
    return "- no user data yet";
  }

  const returnRate = formatRate(periodReturning, periodUnique);

  return `new ${periodNew} · returning ${periodReturning} (${returnRate} return rate)`;
}

function formatTopCountries(
  uniqueByCountry: Record<string, number>,
  visitsByCountry: Record<string, number>,
  limit = 8,
) {
  const uniqueEntries = Object.entries(uniqueByCountry).filter(([, count]) => count > 0);

  if (uniqueEntries.length > 0) {
    return uniqueEntries
      .sort(([, left], [, right]) => right - left)
      .slice(0, limit)
      .map(([country, count]) => `${country} ${count}`)
      .join(" · ");
  }

  const visitEntries = Object.entries(visitsByCountry).filter(([, count]) => count > 0);

  if (visitEntries.length === 0) {
    return "- no country data yet";
  }

  return (
    visitEntries
      .sort(([, left], [, right]) => right - left)
      .slice(0, limit)
      .map(([country, count]) => `${country} ${count}`)
      .join(" · ") + " (visits)"
  );
}

function formatSignedCountDelta(current: number, previous: number) {
  if (previous <= 0) {
    return current > 0 ? "new" : "—";
  }

  const delta = current - previous;
  if (delta === 0) {
    return "flat";
  }

  return delta > 0 ? `+${delta}` : `${delta}`;
}

function formatSignedPercentDelta(current: number, previous: number) {
  if (previous <= 0) {
    return current > 0 ? "+∞%" : "—";
  }

  const deltaPercent = Math.round(((current - previous) / previous) * 100);
  return `${deltaPercent >= 0 ? "+" : ""}${deltaPercent}%`;
}

export function dayOffsetUtc(now: Date, offsetDays: number) {
  const date = new Date(now);
  date.setUTCDate(date.getUTCDate() - offsetDays);
  return date.toISOString().slice(0, 10);
}

function rankDailyPaths(snapshot: DailyTrafficSnapshot | undefined): RankedPath[] {
  if (!snapshot) {
    return [];
  }

  return Object.entries(snapshot.paths)
    .map(([path, metrics]) => ({
      path,
      unique: metrics.unique,
      views: metrics.views,
    }))
    .sort(
      (left, right) =>
        right.views - left.views || right.unique - left.unique || left.path.localeCompare(right.path),
    );
}

function formatDailyPathLines(
  snapshot: DailyTrafficSnapshot | undefined,
  limit: number,
  emptyHint: string,
) {
  const ranked = rankDailyPaths(snapshot);
  if (ranked.length === 0) {
    return [`- ${emptyHint}`];
  }

  const lines = ranked
    .slice(0, limit)
    .map(({ path, unique, views }) => `- ${path} — ${views}v (${unique}u)`);

  if (ranked.length > limit) {
    lines.push(`- ...and ${ranked.length - limit} more paths`);
  }

  return lines;
}

function countRecentDayEvents(recentEvents: FunnelEvent[], day: string) {
  const counts = {
    mock_started: 0,
    mock_completed: 0,
    checkout_click: 0,
    mock_deck_cta_click: 0,
  };

  for (const event of recentEvents) {
    if (!(event.occurredAt || "").startsWith(day)) {
      continue;
    }

    if (event.name in counts) {
      counts[event.name as keyof typeof counts] += 1;
    }
  }

  return counts;
}

export function formatYesterdaySection(stats: FunnelStats, now = new Date(), pathLimit = 6) {
  const yesterday = dayOffsetUtc(now, 1);
  const dayBefore = dayOffsetUtc(now, 2);
  const snapshot = stats.visitors.dailySnapshots[yesterday];
  const previousSnapshot = stats.visitors.dailySnapshots[dayBefore];
  const unique = snapshot?.unique ?? stats.visitors.dailyUnique[yesterday] ?? 0;
  const views = snapshot?.pageViews ?? stats.visitors.dailyPageViews[yesterday] ?? 0;
  const prevUnique = previousSnapshot?.unique ?? stats.visitors.dailyUnique[dayBefore] ?? 0;
  const prevViews = previousSnapshot?.pageViews ?? stats.visitors.dailyPageViews[dayBefore] ?? 0;
  const dayEvents = countRecentDayEvents(stats.recentEvents, yesterday);

  const lines = [
    `▸ YESTERDAY · ${formatShortDate(yesterday)} UTC`,
    `${unique} unique · ${views} views (${formatSignedCountDelta(unique, prevUnique)}u · ${formatSignedCountDelta(views, prevViews)}v vs ${formatShortDate(dayBefore)})`,
  ];

  if (snapshot) {
    lines.push(
      `Sources: ${formatChannelLine(snapshot.byChannel)}`,
      `Countries: ${formatTopCountries(snapshot.byCountry, {}, 6)}`,
      "Top paths:",
      ...formatDailyPathLines(
        snapshot,
        pathLimit,
        unique > 0 ? "tracked visits without page_view path" : "no traffic",
      ),
    );
  } else if (unique > 0 || views > 0) {
    lines.push(
      "Top paths:",
      "- daily path index starts now — full breakdown tomorrow for new hits",
    );
  } else {
    lines.push("- no traffic yesterday");
  }

  if (
    dayEvents.mock_started > 0 ||
    dayEvents.mock_completed > 0 ||
    dayEvents.checkout_click > 0 ||
    dayEvents.mock_deck_cta_click > 0
  ) {
    lines.push(
      `Actions (recent window): ${dayEvents.mock_started} mock start · ${dayEvents.mock_completed} mock done · ${dayEvents.checkout_click} checkout · ${dayEvents.mock_deck_cta_click} deck CTA`,
    );
  }

  return lines.join("\n");
}

export function formatSevenDayGrowthSection(
  dailyUnique: Record<string, number>,
  dailyPageViews: Record<string, number>,
  days = 7,
  now = new Date(),
) {
  const dayKeys = recentDayKeys(days, now);
  const previousKeys = recentDayKeys(days, new Date(now.getTime() - days * 24 * 60 * 60 * 1000));
  const currentUnique = sumDailyWindow(dailyUnique, dayKeys);
  const previousUnique = sumDailyWindow(dailyUnique, previousKeys);
  const currentViews = sumDailyWindow(dailyPageViews, dayKeys);
  const avgUnique = dayKeys.length > 0 ? currentUnique / dayKeys.length : 0;

  const chartLines = dayKeys.map((day) => {
    const visitors = dailyUnique[day] ?? 0;
    const views = dailyPageViews[day] ?? 0;
    const marker = day === dayOffsetUtc(now, 1) ? " ← yesterday" : "";

    return `  ${formatShortDate(day)}: ${String(visitors).padStart(2, " ")}u / ${String(views).padStart(3, " ")}v${formatVisitorBar(visitors)}${marker}`;
  });

  return [
    "▸ LAST 7 DAYS · unique / views per UTC day",
    ...chartLines,
    `Σ7d: ${currentUnique} unique · ${currentViews} views · avg ${avgUnique.toFixed(1)}u/day`,
    `vs prior 7d unique: ${formatSignedPercentDelta(currentUnique, previousUnique)} · ${computeGrowthSignal(dailyUnique, now).label}`,
  ].join("\n");
}

function formatPeriodFunnelSection(stats: FunnelStats) {
  const mockStarts = countMockStartsByMode(stats.bySource);
  const visitors = stats.visitors;

  return [
    "▸ PERIOD TOTAL · since reset",
    `${visitors.periodUnique} unique (${formatReturningUsers(visitors.periodNew, visitors.periodReturning, visitors.periodUnique)})`,
    `Mock: ${mockStarts.total} starts (exam ${mockStarts.exam} · learn ${mockStarts.learn}) · ${stats.byEvent.mock_completed ?? 0} completed · ${stats.byEvent.mock_deck_cta_click ?? 0} deck CTA · ${stats.byEvent.checkout_click ?? 0} checkout`,
    `Sources: ${formatChannelLine(visitors.periodByChannel)}`,
    `Countries: ${formatTopCountries(visitors.periodByCountry, stats.byCountry)}`,
  ].join("\n");
}

function formatPeriodProductsSection(products: Array<[string, ProductUniqueMetrics]>, limit = 5) {
  if (products.length === 0) {
    return "▸ TOP SKUs (period)\n- no product traffic yet";
  }

  const lines = products.slice(0, limit).map(([productKey, metrics]) => formatProductLine(productKey, metrics));
  const hiddenCount = products.length - limit;

  return [
    `▸ TOP SKUs (period · view → intent/start → convert)`,
    ...lines,
    ...(hiddenCount > 0 ? [`- ...and ${hiddenCount} more SKUs`] : []),
  ].join("\n");
}

function formatAcquisitionSection(stats: FunnelStats, limit = 3) {
  const googlePeriod = stats.visitors.periodByChannel.google ?? 0;
  const llmPeriod =
    (stats.visitors.periodByChannel.chatgpt ?? 0) + (stats.visitors.periodByChannel.llm ?? 0);

  if (googlePeriod === 0 && llmPeriod === 0) {
    return "▸ ACQUISITION\n- no Google/LLM uniques this period yet";
  }

  const google = pickChannelPathRanks(
    stats.visitors.lifetimePathsByChannel?.google,
    stats.visitors.pathsByChannel?.google,
    aggregateTopPathsByChannels(stats.recentEvents, ["google"]).ranked,
  );
  const llm = pickChannelPathRanks(
    mergeChannelPathCounts(stats.visitors.lifetimePathsByChannel, ["chatgpt", "llm"]),
    mergeChannelPathCounts(stats.visitors.pathsByChannel, ["chatgpt", "llm"]),
    aggregateTopPathsByChannels(stats.recentEvents, ["chatgpt", "llm"]).ranked,
  );

  const lines = ["▸ ACQUISITION · period Google / LLM landing pages"];

  if (googlePeriod > 0) {
    lines.push(
      `Google (${googlePeriod}u):`,
      ...formatRankedPathLines(google.ranked, limit, "none yet", true).map((line) => `  ${line}`),
    );
  }

  if (llmPeriod > 0) {
    lines.push(
      `LLM (${llmPeriod}u):`,
      ...formatRankedPathLines(llm.ranked, limit, "none yet", true).map((line) => `  ${line}`),
    );
  }

  return lines.join("\n");
}

function isPagePathEvent(event: FunnelEvent) {
  return Boolean(event.path) && (event.name === "page_view" || event.name === "mock_landing_view");
}

function isTodayPageEvent(event: FunnelEvent, day: string) {
  if (!isPagePathEvent(event) || !(event.occurredAt || "").startsWith(day)) {
    return false;
  }

  return true;
}

function channelFromPageEvent(event: FunnelEvent): TrafficChannel {
  return classifyTrafficChannel(event.referrer, {
    utmSource: event.utmSource,
    utmMedium: event.utmMedium,
  });
}

type RankedPath = { path: string; unique: number; views: number };

function rankPaths(
  pathVisitors: Map<string, Set<string>>,
  pathViews: Map<string, number>,
): RankedPath[] {
  return [...pathVisitors.entries()]
    .map(([path, visitors]) => ({
      path,
      unique: visitors.size,
      views: pathViews.get(path) ?? 0,
    }))
    .sort(
      (left, right) =>
        right.unique - left.unique || right.views - left.views || left.path.localeCompare(right.path),
    );
}

const CHANNEL_STICKY_PRIORITY: Record<TrafficChannel, number> = {
  google: 3,
  chatgpt: 3,
  llm: 3,
  other: 1,
  direct: 0,
};

/** Prefer acquisition channel when a visitor has mixed referrers in the window. */
export function stickyVisitorChannels(events: FunnelEvent[]) {
  const map = new Map<string, TrafficChannel>();

  for (const event of events) {
    const visitorId = event.visitorId?.trim();
    if (!visitorId) {
      continue;
    }

    const channel = channelFromPageEvent(event);
    const previous = map.get(visitorId);
    if (!previous || CHANNEL_STICKY_PRIORITY[channel] > CHANNEL_STICKY_PRIORITY[previous]) {
      map.set(visitorId, channel);
    }
  }

  return map;
}

/** Best-effort path ranking for selected channels from the recent-events window. */
export function aggregateTopPathsByChannels(
  recentEvents: FunnelEvent[],
  channels: readonly TrafficChannel[],
) {
  const allowed = new Set(channels);
  const visitorChannels = stickyVisitorChannels(recentEvents);
  const pathVisitors = new Map<string, Set<string>>();
  const pathViews = new Map<string, number>();
  let pageEvents = 0;

  for (const event of recentEvents) {
    if (!isPagePathEvent(event)) {
      continue;
    }

    const visitorKey = event.visitorId?.trim() || `anon:${pageEvents + 1}`;
    const channel = visitorChannels.get(visitorKey) ?? channelFromPageEvent(event);
    if (!allowed.has(channel)) {
      continue;
    }

    pageEvents += 1;
    pathViews.set(event.path!, (pathViews.get(event.path!) ?? 0) + 1);

    const visitors = pathVisitors.get(event.path!) ?? new Set<string>();
    visitors.add(visitorKey);
    pathVisitors.set(event.path!, visitors);
  }

  return {
    pageEvents,
    ranked: rankPaths(pathVisitors, pathViews),
  };
}

export function rankPathsFromUniqueCounts(paths: Record<string, number> | undefined): RankedPath[] {
  if (!paths) {
    return [];
  }

  return Object.entries(paths)
    .map(([path, unique]) => ({ path, unique, views: unique }))
    .sort(
      (left, right) =>
        right.unique - left.unique || left.path.localeCompare(right.path),
    );
}

function mergeChannelPathCounts(
  pathsByChannel: Record<TrafficChannel, Record<string, number>> | undefined,
  channels: readonly TrafficChannel[],
) {
  const merged: Record<string, number> = {};

  for (const channel of channels) {
    for (const [path, unique] of Object.entries(pathsByChannel?.[channel] ?? {})) {
      merged[path] = (merged[path] ?? 0) + unique;
    }
  }

  return merged;
}

function formatRankedPathLines(
  ranked: RankedPath[],
  limit: number,
  emptyHint: string,
  uniqueOnly = false,
) {
  if (ranked.length === 0) {
    return [`- ${emptyHint}`];
  }

  const lines = ranked
    .slice(0, limit)
    .map(({ path, unique, views }) =>
      uniqueOnly ? `- ${path} — ${unique}u` : `- ${path} — ${views} (${unique}u)`,
    );

  if (ranked.length > limit) {
    lines.push(`- ...and ${ranked.length - limit} more`);
  }

  return lines;
}

function pickChannelPathRanks(
  lifetimeCounts: Record<string, number> | undefined,
  periodCounts: Record<string, number> | undefined,
  recentRanked: RankedPath[],
): { ranked: RankedPath[]; source: "all-time" | "period" | "recent" } {
  // Prefer the current period so the pulse moves after resets / new traffic.
  // All-time unique counts of 1–2u look "stuck" if they always win over period.
  const periodRanked = rankPathsFromUniqueCounts(periodCounts);
  if (periodRanked.length > 0) {
    return { ranked: periodRanked, source: "period" };
  }

  const lifetimeRanked = rankPathsFromUniqueCounts(lifetimeCounts);
  if (lifetimeRanked.length > 0) {
    return { ranked: lifetimeRanked, source: "all-time" };
  }

  return { ranked: recentRanked, source: "recent" };
}

function formatChannelTopPagesBlock(options: {
  label: string;
  primary: { ranked: RankedPath[]; source: "all-time" | "period" | "recent" };
  lifetimeRanked: RankedPath[];
  recentRanked: RankedPath[];
  limit: number;
  emptyHint: string;
}) {
  const { label, primary, lifetimeRanked, recentRanked, limit, emptyHint } = options;
  const lines = [
    `Top pages (${label} · ${primary.source}):`,
    ...formatRankedPathLines(
      primary.ranked,
      limit,
      emptyHint,
      primary.source !== "recent",
    ),
  ];

  // When primary is all-time (period empty), also surface the recent window so the
  // digest is not frozen on old 1u lifetime pages while new hits sit only in recentEvents.
  if (primary.source === "all-time" && recentRanked.length > 0) {
    lines.push(
      `Top pages (${label} · recent):`,
      ...formatRankedPathLines(recentRanked, limit, "none yet", false),
    );
  }

  // When primary is period, keep a short all-time snapshot if it differs.
  if (
    primary.source === "period" &&
    lifetimeRanked.length > 0 &&
    lifetimeRanked[0]?.path !== primary.ranked[0]?.path
  ) {
    lines.push(
      `Top pages (${label} · all-time):`,
      ...formatRankedPathLines(lifetimeRanked, Math.min(3, limit), "none yet", true),
    );
  }

  return lines;
}

/** Top pages from Google vs ChatGPT/LLM — prefer period path∩channel, else all-time, else recent. */
export function formatSearchAndLlmTopPages(stats: FunnelStats, limit = 5) {
  const googleLifetime = stats.visitors.lifetimeByChannel.google ?? 0;
  const llmLifetime =
    (stats.visitors.lifetimeByChannel.chatgpt ?? 0) + (stats.visitors.lifetimeByChannel.llm ?? 0);
  const googlePeriod = stats.visitors.periodByChannel.google ?? 0;
  const llmPeriod =
    (stats.visitors.periodByChannel.chatgpt ?? 0) + (stats.visitors.periodByChannel.llm ?? 0);

  const googleRecent = aggregateTopPathsByChannels(stats.recentEvents, ["google"]);
  const llmRecent = aggregateTopPathsByChannels(stats.recentEvents, ["chatgpt", "llm"]);

  const googleLifetimePaths = rankPathsFromUniqueCounts(
    stats.visitors.lifetimePathsByChannel?.google,
  );
  const llmLifetimePaths = rankPathsFromUniqueCounts(
    mergeChannelPathCounts(stats.visitors.lifetimePathsByChannel, ["chatgpt", "llm"]),
  );

  const google = pickChannelPathRanks(
    stats.visitors.lifetimePathsByChannel?.google,
    stats.visitors.pathsByChannel?.google,
    googleRecent.ranked,
  );
  const llm = pickChannelPathRanks(
    mergeChannelPathCounts(stats.visitors.lifetimePathsByChannel, ["chatgpt", "llm"]),
    mergeChannelPathCounts(stats.visitors.pathsByChannel, ["chatgpt", "llm"]),
    llmRecent.ranked,
  );
  const recentWindow = stats.recentEvents.length || 100;

  return [
    ...formatChannelTopPagesBlock({
      label: "Google",
      primary: google,
      lifetimeRanked: googleLifetimePaths,
      recentRanked: googleRecent.ranked,
      limit,
      emptyHint: `none yet (all-time Google uniques: ${googleLifetime}; period: ${googlePeriod}; checked last ${recentWindow} events)`,
    }),
    "",
    ...formatChannelTopPagesBlock({
      label: "LLM · ChatGPT+LLM",
      primary: llm,
      lifetimeRanked: llmLifetimePaths,
      recentRanked: llmRecent.ranked,
      limit,
      emptyHint: `none yet (all-time LLM uniques: ${llmLifetime}; period: ${llmPeriod}; checked last ${recentWindow} events)`,
    }),
  ].join("\n");
}

/** Best-effort today path breakdown from the recent-events window (last 100). */
export function aggregateTodayPaths(recentEvents: FunnelEvent[], now = new Date()) {
  const day = now.toISOString().slice(0, 10);
  const pathVisitors = new Map<string, Set<string>>();
  const pathViews = new Map<string, number>();
  let pageEvents = 0;

  for (const event of recentEvents) {
    if (!isTodayPageEvent(event, day)) {
      continue;
    }

    pageEvents += 1;
    pathViews.set(event.path!, (pathViews.get(event.path!) ?? 0) + 1);

    const visitors = pathVisitors.get(event.path!) ?? new Set<string>();
    const visitorKey = event.visitorId?.trim() || `anon:${pageEvents}`;
    visitors.add(visitorKey);
    pathVisitors.set(event.path!, visitors);
  }

  const ranked = rankPaths(pathVisitors, pathViews);

  return {
    day,
    pageEvents,
    paths: Object.fromEntries(ranked.map(({ path, unique }) => [path, unique])),
    ranked,
  };
}

export function formatTodayTopPages(
  stats: FunnelStats,
  limit = 6,
  now = new Date(),
) {
  const today = aggregateTodayPaths(stats.recentEvents, now);
  const unique = stats.visitors.dailyUnique[today.day] ?? 0;
  const views = stats.visitors.dailyPageViews[today.day] ?? 0;
  const header = `Top pages (today · ${formatShortDate(today.day)} · ${unique} unique / ${views} views):`;

  if (today.ranked.length === 0) {
    if (unique === 0 && views === 0) {
      return [header, "- no page data yet"].join("\n");
    }

    return [header, "- path breakdown unavailable (outside recent window)"].join("\n");
  }

  const lines = today.ranked
    .slice(0, limit)
    .map(({ path, unique: pathUnique, views: pathViews }) => `- ${path} — ${pathViews} (${pathUnique}u)`);

  if (today.ranked.length > limit) {
    lines.push(`- ...and ${today.ranked.length - limit} more`);
  }

  if (views > 0 && today.pageEvents < views) {
    lines.push(`- (recent window: ${today.pageEvents}/${views} views)`);
  }

  return [header, ...lines].join("\n");
}

function formatPeriodRange(stats: FunnelStats) {
  const start = stats.startedAt?.slice(0, 10) ?? "n/a";
  const end = stats.updatedAt?.slice(0, 10) ?? "n/a";

  return `${start} → ${end}`;
}

export function toTelegramStatsMessage(stats: FunnelStats, now = new Date()) {
  return toTelegramStatsMessages(stats, now)[0] ?? "UniPrep2Go · no stats yet";
}

export function toTelegramStatsMessages(stats: FunnelStats, now = new Date()) {
  const visitors = stats.visitors;
  const products = Object.entries(visitors.products).sort(
    ([, left], [, right]) => right.visitors - left.visitors,
  );

  const lines = [
    "UniPrep2Go · growth pulse",
    `As of ${formatShortDate(dayOffsetUtc(now, 0))} UTC · period ${formatPeriodRange(stats)}`,
    "",
    formatYesterdaySection(stats, now),
    "",
    formatSevenDayGrowthSection(visitors.dailyUnique, visitors.dailyPageViews, 7, now),
    "",
    formatPeriodFunnelSection(stats),
    "",
    formatPeriodProductsSection(products, 5),
    "",
    formatAcquisitionSection(stats),
    "",
    `Storage: ${stats.storage} · lifetime ${visitors.lifetimeUnique} unique`,
  ];

  return splitTelegramMessages(lines.join("\n"));
}

export function splitTelegramMessages(text: string, maxLength = 3900) {
  if (text.length <= maxLength) {
    return [text];
  }

  const chunks: string[] = [];
  let buffer = "";

  for (const paragraph of text.split("\n\n")) {
    const candidate = buffer ? `${buffer}\n\n${paragraph}` : paragraph;

    if (candidate.length <= maxLength) {
      buffer = candidate;
      continue;
    }

    if (buffer) {
      chunks.push(buffer);
    }

    if (paragraph.length <= maxLength) {
      buffer = paragraph;
      continue;
    }

    for (let index = 0; index < paragraph.length; index += maxLength) {
      chunks.push(paragraph.slice(index, index + maxLength));
    }

    buffer = "";
  }

  if (buffer) {
    chunks.push(buffer);
  }

  return chunks.map((chunk, index, all) =>
    all.length > 1 ? `[${index + 1}/${all.length}]\n${chunk}` : chunk,
  );
}

export function toTelegramResetMessage() {
  return [
    "UniPrep2Go period reset.",
    "",
    "Lifetime stats were preserved.",
    "Send /stats for the growth pulse.",
  ].join("\n");
}

export function toTelegramResetAllMessage() {
  return [
    "UniPrep2Go all stats reset.",
    "",
    "Send /stats for a fresh growth pulse.",
  ].join("\n");
}

export function toTelegramSyncMessage(result: CheckoutPriceSyncResult) {
  const lines = [
    "UniPrep2Go price sync complete",
    "",
    `Synced: ${result.synced}`,
    `Gumroad: ${result.gumroad}`,
    `Lemon: ${result.lemon}`,
    `Failed: ${result.failed}`,
  ];

  if (result.errors.length > 0) {
    lines.push("", "Errors:", ...result.errors.slice(0, 10).map((error) => `- ${error}`));

    if (result.errors.length > 10) {
      lines.push(`- ...and ${result.errors.length - 10} more`);
    }
  } else {
    lines.push("", "Errors: none");
  }

  lines.push("", "Cached prices update on site within ~1 hour.");

  return lines.join("\n");
}
