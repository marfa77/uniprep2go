export const FUNNEL_EXCLUDE_COOKIE = "uniprep2go_funnel_exclude";
export const FUNNEL_EXCLUDE_STORAGE_KEY = "uniprep2go:funnel:exclude";
export const FUNNEL_EXCLUDE_QUERY = "funnel=exclude";
export const FUNNEL_INCLUDE_QUERY = "funnel=include";

import { isBotUserAgent } from "./traffic-bot";

export function parseExcludeIps() {
  return (process.env.FUNNEL_EXCLUDE_IPS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export function getClientIp(request: Pick<Request, "headers">) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "";
  }

  return request.headers.get("x-real-ip") ?? "";
}

export function hasExcludeCookie(cookieHeader: string | null | undefined) {
  if (!cookieHeader) {
    return false;
  }

  return cookieHeader.includes(`${FUNNEL_EXCLUDE_COOKIE}=1`);
}

export function shouldExcludeFunnelTraffic(input: {
  internal?: boolean;
  cookieHeader?: string | null;
  clientIp?: string;
  hostname?: string;
  userAgent?: string | null;
}) {
  if (input.internal) {
    return true;
  }

  if (isBotUserAgent(input.userAgent)) {
    return true;
  }

  if (hasExcludeCookie(input.cookieHeader)) {
    return true;
  }

  const hostname = input.hostname?.toLowerCase() ?? "";

  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".local")
  ) {
    return true;
  }

  const clientIp = input.clientIp?.trim();

  if (clientIp && parseExcludeIps().includes(clientIp)) {
    return true;
  }

  return false;
}

export function detectInternalClientContext(input: {
  hostname?: string;
  search?: string;
  excluded?: boolean;
}) {
  if (input.excluded) {
    return true;
  }

  const hostname = input.hostname?.toLowerCase() ?? "";

  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".local")
  ) {
    return true;
  }

  if (input.search?.includes(FUNNEL_EXCLUDE_QUERY)) {
    return true;
  }

  if (input.search?.includes(FUNNEL_INCLUDE_QUERY)) {
    return false;
  }

  return false;
}
