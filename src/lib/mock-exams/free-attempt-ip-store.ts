import { getRedisClient } from "@/lib/redis";
import { FREE_ATTEMPT_IP_TTL_SECONDS, freeAttemptIpKey } from "./free-attempt-ip";

export async function claimFreeAttemptIp(ip: string): Promise<"claimed" | "used" | "unavailable"> {
  const trimmed = ip.trim();
  const client = getRedisClient();
  if (!trimmed || !client) return "unavailable";
  try {
    const claimed = await client.set(freeAttemptIpKey(trimmed), "1", {
      nx: true,
      ex: FREE_ATTEMPT_IP_TTL_SECONDS,
    });
    return claimed === "OK" ? "claimed" : "used";
  } catch (error) {
    console.error("[free-attempt-ip] claim failed", error);
    return "unavailable";
  }
}
