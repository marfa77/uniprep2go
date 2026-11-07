import { createHash } from "node:crypto";

/** One free diagnostic per public IP. Incognito gets a new browser token, not a new address. */
export const FREE_ATTEMPT_IP_TTL_SECONDS = 60 * 60 * 24;

export function freeAttemptIpKey(ip: string) {
  const digest = createHash("sha256").update(ip).digest("hex");
  return `mock:free-ip:v1:${digest}`;
}

function firstAddress(value: string | null) {
  return value?.split(",")[0]?.trim() ?? "";
}

function normalizeIp(raw: string) {
  let ip = raw.trim().toLowerCase();
  if (ip.startsWith("[") && ip.endsWith("]")) {
    ip = ip.slice(1, -1);
  }
  if (ip.startsWith("::ffff:")) {
    ip = ip.slice("::ffff:".length);
  }
  return ip;
}

function isLoopback(ip: string) {
  return ip === "127.0.0.1" || ip === "::1" || ip === "localhost";
}

/**
 * Address Vercel saw, not the first `x-forwarded-for` hop.
 * That hop is client-supplied, so a new value would mint a fresh free attempt.
 */
export function trustedClientIp(headers: Pick<Headers, "get">): string | null {
  const vercel = firstAddress(headers.get("x-vercel-forwarded-for"));
  const real = headers.get("x-real-ip")?.trim() ?? "";
  const ip = normalizeIp(vercel || real);
  if (!ip || isLoopback(ip)) return null;
  return ip;
}

/** 402 closes the free start. Any other response, including a store outage, leaves it open. */
export function interpretFreeStartHttp(status: number, code: string | undefined): "start" | "paywall" {
  if (status === 402 || code === "free_used") return "paywall";
  return "start";
}
