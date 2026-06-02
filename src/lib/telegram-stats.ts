import { filterReportingSources } from "./funnel-filter";
import { formatMockStartProgress } from "./mock-exams/pricing";
import type { CheckoutPriceSyncResult } from "./checkout-pricing";
import type { FunnelAggregate } from "./funnel-aggregates";
import type { FunnelStats } from "./funnel-store";

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

function formatRates(aggregate: FunnelAggregate) {
  const pageViews = aggregate.byEvent.page_view;
  const checkoutIntents = aggregate.byEvent.checkout_intent;
  const checkoutClicks = aggregate.byEvent.checkout_click;
  const ctaRate = pageViews > 0 ? `${((checkoutIntents / pageViews) * 100).toFixed(1)}%` : "n/a";
  const clickRate = pageViews > 0 ? `${((checkoutClicks / pageViews) * 100).toFixed(1)}%` : "n/a";

  return { pageViews, checkoutIntents, checkoutClicks, ctaRate, clickRate };
}

function formatSummaryBlock(title: string, aggregate: FunnelAggregate) {
  const rates = formatRates(aggregate);
  const mockStarts = aggregate.byEvent.mock_started;
  const mockCompletions = aggregate.byEvent.mock_completed;
  const mockCompletionRate =
    mockStarts > 0 ? `${((mockCompletions / mockStarts) * 100).toFixed(1)}%` : "n/a";

  return [
    title,
    `Total events: ${aggregate.totalEvents}`,
    `Page views: ${rates.pageViews}`,
    `Product facts views: ${aggregate.byEvent.product_facts_view}`,
    `Topic matrix views: ${aggregate.byEvent.topic_matrix_view}`,
    `Sample cards views: ${aggregate.byEvent.sample_cards_view}`,
    `Catalog views: ${aggregate.byEvent.catalog_view}`,
    `FAQ views: ${aggregate.byEvent.faq_view}`,
    `Checkout intents: ${rates.checkoutIntents}`,
    `Checkout clicks: ${rates.checkoutClicks}`,
    `CTA rate: ${rates.ctaRate}`,
    `Click rate: ${rates.clickRate}`,
    `Mock landing views: ${aggregate.byEvent.mock_landing_view}`,
    `Mock starts: ${formatMockStartProgress(mockStarts)} (free cap)`,
    `Mock completions: ${mockCompletions}`,
    `Mock completion rate: ${mockCompletionRate}`,
    `Mock pass verdicts: ${aggregate.byEvent.mock_pass_verdict}`,
    `Mock no-pass verdicts: ${aggregate.byEvent.mock_no_pass_verdict}`,
    `Mock interest clicks: ${aggregate.byEvent.mock_unlock_interest}`,
    `Window started: ${aggregate.startedAt ?? "n/a"}`,
    `Last event: ${aggregate.updatedAt ?? "n/a"}`,
  ].join("\n");
}

function formatRankedList(title: string, entries: Record<string, number>, limit = 15) {
  const lines = Object.entries(entries)
    .sort(([, left], [, right]) => right - left)
    .slice(0, limit)
    .map(([key, count]) => `- ${key}: ${count}`);

  return [title, lines.join("\n") || "- no data yet"].join("\n");
}

const mockEventLabels = {
  landing: "landing",
  start: "starts",
  complete: "completions",
  result_view: "results",
  pass: "pass",
  no_pass: "no-pass",
  unlock_interest: "interest",
  deck_cta_click: "deck CTA",
} as const;

function parseMockSource(source: string) {
  const match = source.match(/^mock:([^:]+):(.+)$/);

  if (!match) {
    return undefined;
  }

  return { slug: match[1], action: normalizeMockAction(match[2]) };
}

function normalizeMockAction(action: string) {
  if (action === "started") {
    return "start";
  }

  if (action === "completed") {
    return "complete";
  }

  if (action === "landing_view") {
    return "landing";
  }

  if (action === "interest" || action.startsWith("interest:")) {
    return "unlock_interest";
  }

  if (action.startsWith("verdict:")) {
    return "result_view";
  }

  return action;
}

function formatMockBreakdown(title: string, aggregate: FunnelAggregate) {
  const byMock: Record<string, Record<string, number>> = {};

  for (const [source, count] of Object.entries(aggregate.bySource)) {
    const parsed = parseMockSource(source);

    if (!parsed) {
      continue;
    }

    byMock[parsed.slug] ??= {};
    byMock[parsed.slug][parsed.action] = (byMock[parsed.slug][parsed.action] ?? 0) + count;
  }

  const lines = Object.entries(byMock)
    .map(([slug, counts]) => {
      const parts = Object.entries(mockEventLabels)
        .map(([action, label]) => `${label} ${counts[action] ?? 0}`)
        .join(" · ");

      return `- ${slug}: ${parts}`;
    })
    .sort();

  return [title, lines.join("\n") || "- no mock data yet"].join("\n");
}

function formatRecentEvents(stats: FunnelStats, limit = 20) {
  const lines = stats.recentEvents.slice(0, limit).map((event) => {
    const timestamp = event.occurredAt.replace("T", " ").replace(/\.\d{3}Z$/, " UTC");
    const source = event.source ?? "unknown";
    const country = event.country ?? "??";
    const language = event.browserLanguage ?? event.acceptLanguage?.split(",")[0]?.trim() ?? "n/a";
    const referrer = event.referrer ? safeReferrerHost(event.referrer) : "direct";

    return `- ${timestamp} · ${event.name} · ${event.deckSlug} · ${source} · ${country} · ${language} · ${referrer}`;
  });

  return ["Recent events", lines.join("\n") || "- no recent events yet"].join("\n");
}

function safeReferrerHost(referrer: string) {
  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return referrer.slice(0, 40);
  }
}

export function toTelegramStatsMessage(stats: FunnelStats) {
  return toTelegramStatsMessages(stats).join("\n\n");
}

export function toTelegramStatsMessages(stats: FunnelStats) {
  const lifetimeSources = filterReportingSources(stats.lifetime.bySource);
  const currentSources = filterReportingSources(stats.bySource);

  const sections = [
    "UniPrep2Go funnel stats",
    formatSummaryBlock("All-time", stats.lifetime),
    formatSummaryBlock("Current period (since last reset)", stats),
    formatRankedList("Top decks (all-time)", stats.lifetime.byDeck),
    formatRankedList("Top decks (current period)", stats.byDeck),
    formatMockBreakdown("Mock exams breakdown (all-time)", stats.lifetime),
    formatMockBreakdown("Mock exams breakdown (current period)", stats),
    formatRankedList("Top sources (all-time)", lifetimeSources),
    formatRankedList("Top sources (current period)", currentSources),
    formatRankedList("Top countries (all-time)", stats.lifetime.byCountry),
    formatRankedList("Top countries (current period)", stats.byCountry),
    formatRankedList("Top browser languages (all-time)", stats.lifetime.byLanguage),
    formatRankedList("Top browser languages (current period)", stats.byLanguage),
    formatRankedList("Top referrers (all-time)", stats.lifetime.byReferrer),
    formatRankedList("Top referrers (current period)", stats.byReferrer),
    formatRecentEvents(stats),
    `Storage: ${stats.storage}`,
  ];

  return splitTelegramMessages(sections.join("\n\n"));
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
    "UniPrep2Go current period reset.",
    "",
    "All-time stats were preserved.",
    "Send /stats for the full report.",
    "Send /sync to refresh checkout prices.",
  ].join("\n");
}

export function toTelegramResetAllMessage() {
  return [
    "UniPrep2Go all funnel stats reset.",
    "",
    "Current period, lifetime stats, and recent events were cleared.",
    "Send /stats for the new report.",
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
