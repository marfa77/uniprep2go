export const funnelEventNames = [
  "page_view",
  "product_facts_view",
  "topic_matrix_view",
  "sample_cards_view",
  "positioning_view",
  "catalog_view",
  "faq_view",
  "checkout_intent",
  "checkout_click",
  "mock_landing_view",
  "mock_started",
  "mock_question_answered",
  "mock_completed",
  "mock_result_view",
  "mock_pass_verdict",
  "mock_no_pass_verdict",
  "mock_unlock_interest",
  "mock_deck_cta_click",
  "mock_checkout_placeholder_click",
] as const;

export type FunnelEventName = (typeof funnelEventNames)[number];

export type FunnelEvent = {
  eventId: string;
  name: FunnelEventName;
  deckSlug: string;
  occurredAt: string;
  visitorId?: string;
  source?: string;
  path?: string;
  destinationUrl?: string;
  referrer?: string;
  browserLanguage?: string;
  browserLanguages?: string[];
  acceptLanguage?: string;
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
  screen?: string;
  userAgent?: string;
  clientIp?: string;
  internal?: boolean;
};

type FunnelEventInput = {
  name: FunnelEventName;
  deckSlug: string;
  occurredAt?: string;
  visitorId?: string;
  source?: string;
  path?: string;
  destinationUrl?: string;
  referrer?: string;
  browserLanguage?: string;
  browserLanguages?: string[];
  acceptLanguage?: string;
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
  screen?: string;
  userAgent?: string;
  clientIp?: string;
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
    visitorId: optionalString(candidate.visitorId),
    source: optionalString(candidate.source),
    path: optionalString(candidate.path),
    destinationUrl: optionalString(candidate.destinationUrl),
    referrer: optionalString(candidate.referrer),
    browserLanguage: optionalString(candidate.browserLanguage),
    browserLanguages: optionalStringArray(candidate.browserLanguages),
    acceptLanguage: optionalString(candidate.acceptLanguage),
    country: optionalString(candidate.country),
    region: optionalString(candidate.region),
    city: optionalString(candidate.city),
    timezone: optionalString(candidate.timezone),
    screen: optionalString(candidate.screen),
    userAgent: optionalString(candidate.userAgent),
    clientIp: optionalString(candidate.clientIp),
    internal: candidate.internal === true,
  });
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function optionalStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const strings = value.filter((item): item is string => typeof item === "string" && item.length > 0);
  return strings.length > 0 ? strings : undefined;
}
