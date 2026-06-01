import type { FunnelEvent } from "./analytics";
import { shouldExcludeFunnelTraffic } from "./funnel-exclude";

const LEGACY_NOISE_SOURCES = new Set(["section_view"]);

export function isInternalFunnelEvent(event: Pick<FunnelEvent, "internal">) {
  return event.internal === true;
}

export function shouldRecordFunnelEvent(
  event: Pick<FunnelEvent, "internal">,
  request?: Pick<Request, "headers">,
) {
  if (shouldExcludeFunnelTraffic({
    internal: event.internal,
    cookieHeader: request?.headers.get("cookie"),
    clientIp: request ? getClientIpFromRequest(request) : undefined,
  })) {
    return false;
  }

  return true;
}

function getClientIpFromRequest(request: Pick<Request, "headers">) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "";
  }

  return request.headers.get("x-real-ip") ?? "";
}

export function isLegacyNoiseSource(source: string) {
  return LEGACY_NOISE_SOURCES.has(source);
}

export function filterReportingSources(bySource: Record<string, number>) {
  return Object.fromEntries(
    Object.entries(bySource).filter(([source]) => !isLegacyNoiseSource(source)),
  );
}

export { detectInternalClientContext } from "./funnel-exclude";
