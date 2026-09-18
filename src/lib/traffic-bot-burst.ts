import type { DailyTrafficSnapshot } from "./visitor-metrics";

/** Minimum uniques before a day can be classified as a scrape burst. */
export const BOT_BURST_MIN_UNIQUE = 80;

/** Direct share of channel-attributed uniques. */
export const BOT_BURST_MIN_DIRECT_SHARE = 0.85;

/** Top country share of country-attributed uniques. */
export const BOT_BURST_MIN_TOP_COUNTRY_SHARE = 0.75;

/** Distinct paths touched — scrapers fan out across the catalog. */
export const BOT_BURST_MIN_PATHS = 40;

/** Max Google+ChatGPT+LLM share — real growth usually has some acquisition. */
export const BOT_BURST_MAX_ACQUISITION_SHARE = 0.08;

export type BotBurstVerdict = {
  isBurst: boolean;
  reason?: string;
  topCountry?: string;
  pathCount: number;
  directShare: number;
  topCountryShare: number;
  acquisitionShare: number;
};

function sumCounts(counts: Record<string, number>) {
  return Object.values(counts).reduce((total, value) => total + (value > 0 ? value : 0), 0);
}

function topEntry(counts: Record<string, number>): [string, number] | undefined {
  let best: [string, number] | undefined;

  for (const [key, value] of Object.entries(counts)) {
    if (value <= 0) {
      continue;
    }

    if (!best || value > best[1]) {
      best = [key, value];
    }
  }

  return best;
}

/**
 * Detect one-day Direct-heavy catalog scrapes (e.g. SG data-center Chrome spoof)
 * that inflate unique/view growth without Google/LLM acquisition or mock intent.
 */
export function detectBotBurstDay(
  snapshot: Pick<DailyTrafficSnapshot, "unique" | "pageViews" | "paths" | "byChannel" | "byCountry"> | null | undefined,
): BotBurstVerdict {
  if (!snapshot || snapshot.unique < BOT_BURST_MIN_UNIQUE) {
    return {
      isBurst: false,
      pathCount: snapshot ? Object.keys(snapshot.paths ?? {}).length : 0,
      directShare: 0,
      topCountryShare: 0,
      acquisitionShare: 0,
    };
  }

  const pathCount = Object.keys(snapshot.paths ?? {}).length;
  const channelTotal = sumCounts(snapshot.byChannel);
  const countryTotal = sumCounts(snapshot.byCountry);
  const direct = snapshot.byChannel.direct ?? 0;
  const acquisition =
    (snapshot.byChannel.google ?? 0) +
    (snapshot.byChannel.chatgpt ?? 0) +
    (snapshot.byChannel.llm ?? 0);
  const top = topEntry(snapshot.byCountry);

  const directShare = channelTotal > 0 ? direct / channelTotal : 0;
  const acquisitionShare = channelTotal > 0 ? acquisition / channelTotal : 0;
  const topCountryShare = top && countryTotal > 0 ? top[1] / countryTotal : 0;

  const looksLikeCrawl =
    pathCount >= BOT_BURST_MIN_PATHS ||
    (snapshot.unique >= BOT_BURST_MIN_UNIQUE && pathCount >= Math.max(25, Math.floor(snapshot.unique * 0.35)));

  const isBurst =
    looksLikeCrawl &&
    directShare >= BOT_BURST_MIN_DIRECT_SHARE &&
    topCountryShare >= BOT_BURST_MIN_TOP_COUNTRY_SHARE &&
    acquisitionShare <= BOT_BURST_MAX_ACQUISITION_SHARE;

  if (!isBurst) {
    return {
      isBurst: false,
      pathCount,
      directShare,
      topCountryShare,
      acquisitionShare,
      topCountry: top?.[0],
    };
  }

  const countryLabel = top?.[0] ?? "one country";

  return {
    isBurst: true,
    reason: `${countryLabel} Direct crawl · ${pathCount} paths`,
    topCountry: top?.[0],
    pathCount,
    directShare,
    topCountryShare,
    acquisitionShare,
  };
}

export function isBotBurstDay(
  snapshot: Pick<DailyTrafficSnapshot, "unique" | "pageViews" | "paths" | "byChannel" | "byCountry"> | null | undefined,
) {
  return detectBotBurstDay(snapshot).isBurst;
}

export function filterBotBurstDailyCounts(
  dailyUnique: Record<string, number>,
  dailyPageViews: Record<string, number>,
  dailySnapshots: Record<string, DailyTrafficSnapshot> | undefined,
  dayKeys: string[],
) {
  const filteredUnique: Record<string, number> = { ...dailyUnique };
  const filteredViews: Record<string, number> = { ...dailyPageViews };
  const burstDays: Array<{ day: string; unique: number; views: number; reason: string }> = [];

  for (const day of dayKeys) {
    const verdict = detectBotBurstDay(dailySnapshots?.[day]);

    if (!verdict.isBurst) {
      continue;
    }

    burstDays.push({
      day,
      unique: dailyUnique[day] ?? dailySnapshots?.[day]?.unique ?? 0,
      views: dailyPageViews[day] ?? dailySnapshots?.[day]?.pageViews ?? 0,
      reason: verdict.reason ?? "bot burst",
    });
    filteredUnique[day] = 0;
    filteredViews[day] = 0;
  }

  return { filteredUnique, filteredViews, burstDays };
}
