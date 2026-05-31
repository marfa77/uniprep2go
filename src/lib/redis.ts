import { Redis } from "@upstash/redis";

let cachedClient: Redis | null | undefined;

function resolveCredentials() {
  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? undefined;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? undefined;

  if (!url || !token) {
    return null;
  }

  return { url, token };
}

export function getRedisClient(): Redis | null {
  if (cachedClient !== undefined) {
    return cachedClient;
  }

  const credentials = resolveCredentials();
  cachedClient = credentials ? new Redis(credentials) : null;

  return cachedClient;
}

export function isRedisConfigured() {
  return resolveCredentials() !== null;
}
