import type { FunnelEvent } from "./analytics";
import type { CheckoutPriceSyncResult } from "./checkout-pricing";
import type { FunnelStats } from "./funnel-store";
import { countMockStartsByMode } from "./mock-exams/session-mode";
import { TRAFFIC_CHANNELS, trafficChannelLabels } from "./traffic-channel";
import type { ProductUniqueMetrics } from "./visitor-metrics";

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
  const dayKeys = recentDayKeys(days, now);
  const lines = dayKeys.map((day) => {
    const visitors = dailyUnique[day] ?? 0;
    const views = dailyPageViews[day] ?? 0;

    return `  ${formatShortDate(day)}: ${visitors} / ${views}${formatVisitorBar(visitors)}`;
  });

  return ["Динамика 7 дней (посетители / просмотры)", ...lines].join("\n");
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

const TOP_PRODUCTS_LIMIT = 10;

function formatProductLine(productKey: string, metrics: ProductUniqueMetrics) {
  const conversionRate = formatRate(metrics.conversions, metrics.visitors);

  return `- ${formatProductLabel(productKey)}: ${metrics.visitors} view → ${metrics.intents} intent → ${metrics.conversions} convert (${conversionRate})`;
}

function formatTopProducts(products: Array<[string, ProductUniqueMetrics]>) {
  if (products.length === 0) {
    return "- no product traffic yet";
  }

  const topProducts = products.slice(0, TOP_PRODUCTS_LIMIT);
  const lines = topProducts.map(([productKey, metrics]) => formatProductLine(productKey, metrics));
  const hiddenCount = products.length - topProducts.length;

  if (hiddenCount > 0) {
    lines.push(`- ...and ${hiddenCount} more`);
  }

  return lines.join("\n");
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

function formatTopPaths(paths: Record<string, number>, limit = 6) {
  const lines = Object.entries(paths)
    .sort(([, left], [, right]) => right - left)
    .slice(0, limit)
    .map(([path, count]) => `- ${path} — ${count}`);

  return lines.join("\n") || "- no page data yet";
}

function isTodayPageEvent(event: FunnelEvent, day: string) {
  if (!event.path || !(event.occurredAt || "").startsWith(day)) {
    return false;
  }

  return event.name === "page_view" || event.name === "mock_landing_view";
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

  const ranked = [...pathVisitors.entries()]
    .map(([path, visitors]) => ({
      path,
      unique: visitors.size,
      views: pathViews.get(path) ?? 0,
    }))
    .sort(
      (left, right) =>
        right.unique - left.unique || right.views - left.views || left.path.localeCompare(right.path),
    );

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

export function toTelegramStatsMessage(stats: FunnelStats) {
  return toTelegramStatsMessages(stats)[0] ?? "UniPrep2Go · no stats yet";
}

export function toTelegramStatsMessages(stats: FunnelStats) {
  const visitors = stats.visitors;
  const growth = computeGrowthSignal(visitors.dailyUnique);
  const products = Object.entries(visitors.products).sort(
    ([, left], [, right]) => right.visitors - left.visitors,
  );

  const mockStarts = countMockStartsByMode(stats.bySource);
  const mockStartsLifetime = countMockStartsByMode(stats.lifetime.bySource);

  const lines = [
    "UniPrep2Go · growth pulse",
    "",
    `Trend: ${growth.label}`,
    `Unique users: ${visitors.periodUnique} period · ${visitors.lifetimeUnique} lifetime`,
    formatReturningUsers(visitors.periodNew, visitors.periodReturning, visitors.periodUnique),
    "",
    "Mock starts (Exam vs Learn):",
    `period exam ${mockStarts.exam} · learn ${mockStarts.learn} · total ${mockStarts.total}`,
    `lifetime exam ${mockStartsLifetime.exam} · learn ${mockStartsLifetime.learn} · total ${mockStartsLifetime.total}`,
    "",
    "Sources (unique, period):",
    formatChannelLine(visitors.periodByChannel),
    "",
    "Countries (unique, period):",
    formatTopCountries(visitors.periodByCountry, stats.byCountry),
    "",
    "Decks & mocks (unique view → intent → convert):",
    formatTopProducts(products),
    "",
    "Top pages (period):",
    formatTopPaths(visitors.paths),
    "",
    formatTodayTopPages(stats),
    "",
    formatSevenDayDynamics(visitors.dailyUnique, visitors.dailyPageViews),
    "",
    `Period: ${formatPeriodRange(stats)} · storage: ${stats.storage}`,
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
