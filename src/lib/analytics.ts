export const funnelEventNames = [
  "page_view",
  "product_facts_view",
  "topic_matrix_view",
  "sample_cards_view",
  "catalog_view",
  "faq_view",
  "checkout_intent",
  "checkout_click",
] as const;

export type FunnelEventName = (typeof funnelEventNames)[number];

export type FunnelEvent = {
  eventId: string;
  name: FunnelEventName;
  deckSlug: string;
  occurredAt: string;
  source?: string;
  path?: string;
  referrer?: string;
  userAgent?: string;
  internal?: boolean;
};

type FunnelEventInput = {
  name: FunnelEventName;
  deckSlug: string;
  source?: string;
  path?: string;
  referrer?: string;
  userAgent?: string;
  internal?: boolean;
};

const funnelEventNameSet = new Set<string>(funnelEventNames);

export function createFunnelEvent(input: FunnelEventInput): FunnelEvent {
  return {
    eventId: `evt_${crypto.randomUUID()}`,
    occurredAt: new Date().toISOString(),
    ...input,
  };
}

export function parseFunnelEvent(payload: unknown): FunnelEvent {
  if (!payload || typeof payload !== "object") {
    throw new Error("Funnel event payload must be an object");
  }

  const candidate = payload as Record<string, unknown>;

  if (typeof candidate.name !== "string" || !funnelEventNameSet.has(candidate.name)) {
    throw new Error("Unsupported funnel event");
  }

  if (typeof candidate.deckSlug !== "string" || candidate.deckSlug.length === 0) {
    throw new Error("Funnel event requires deckSlug");
  }

  return createFunnelEvent({
    name: candidate.name as FunnelEventName,
    deckSlug: candidate.deckSlug,
    source: optionalString(candidate.source),
    path: optionalString(candidate.path),
    referrer: optionalString(candidate.referrer),
    userAgent: optionalString(candidate.userAgent),
    internal: candidate.internal === true,
  });
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
