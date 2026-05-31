import type { FunnelStats } from "./funnel-store";

export function shouldReturnStats(text: string) {
  const normalized = text.trim().toLowerCase();

  return normalized === "stats" || normalized === "/stats" || normalized === "/stats@mariccol_bot";
}

export function toTelegramStatsMessage(stats: FunnelStats) {
  const pageViews = stats.byEvent.page_view;
  const checkoutIntents = stats.byEvent.checkout_intent;
  const gumroadClicks = stats.byEvent.gumroad_click;
  const ctaRate = pageViews > 0 ? `${((checkoutIntents / pageViews) * 100).toFixed(1)}%` : "n/a";
  const clickRate = pageViews > 0 ? `${((gumroadClicks / pageViews) * 100).toFixed(1)}%` : "n/a";
  const topSources = Object.entries(stats.bySource)
    .sort(([, left], [, right]) => right - left)
    .slice(0, 5)
    .map(([source, count]) => `- ${source}: ${count}`)
    .join("\n");

  return [
    "UniPrep2Go funnel stats",
    "",
    `Total events: ${stats.totalEvents}`,
    `Page views: ${pageViews}`,
    `Product facts views: ${stats.byEvent.product_facts_view}`,
    `Topic matrix views: ${stats.byEvent.topic_matrix_view}`,
    `FAQ views: ${stats.byEvent.faq_view}`,
    `Checkout intents: ${checkoutIntents}`,
    `Gumroad clicks: ${gumroadClicks}`,
    `CTA rate: ${ctaRate}`,
    `Click rate: ${clickRate}`,
    "",
    `Window started: ${stats.startedAt ?? "n/a"}`,
    `Last event: ${stats.updatedAt ?? "n/a"}`,
    "",
    "Top sources:",
    topSources || "- no source data yet",
  ].join("\n");
}
