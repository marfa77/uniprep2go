import { filterReportingSources } from "./funnel-filter";
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

function formatRecentEvents(stats: FunnelStats, limit = 20) {
  const lines = stats.recentEvents.slice(0, limit).map((event) => {
    const timestamp = event.occurredAt.replace("T", " ").replace(/\.\d{3}Z$/, " UTC");
    const source = event.source ?? "unknown";

    return `- ${timestamp} · ${event.name} · ${event.deckSlug} · ${source}`;
  });

  return ["Recent events", lines.join("\n") || "- no recent events yet"].join("\n");
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
    formatRankedList("Top sources (all-time)", lifetimeSources),
    formatRankedList("Top sources (current period)", currentSources),
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
