"use client";

import type { FunnelEventName } from "@/lib/analytics";
import { trackFunnelEvent } from "@/components/funnel-tracker";

export function trackMockEvent(input: {
  name: FunnelEventName;
  deckSlug: string;
  mockSlug: string;
  source?: string;
  destinationUrl?: string;
}) {
  trackFunnelEvent({
    name: input.name,
    deckSlug: input.deckSlug,
    source: input.source ?? `mock:${input.mockSlug}:${input.name.replace(/^mock_/, "")}`,
    destinationUrl: input.destinationUrl,
  });
}
