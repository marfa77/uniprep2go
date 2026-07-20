import { createHash } from "crypto";
import { FREE_LEARN_CREDITS, isFreeLearnLicenseKey } from "@/lib/gumroad-learn-license";
import { getRedisClient } from "@/lib/redis";

export type LearnLicenseRow = {
  remaining: number;
  granted: number;
  email: string | null;
  saleId: string | null;
  updatedAt: string;
};

type DevMem = typeof globalThis & {
  __uniprep2goLearnCredits?: Map<string, LearnLicenseRow>;
};

function devStore(): Map<string, LearnLicenseRow> {
  const g = globalThis as DevMem;
  if (!g.__uniprep2goLearnCredits) {
    g.__uniprep2goLearnCredits = new Map();
  }
  return g.__uniprep2goLearnCredits;
}

/** Test helper — clears in-memory ledger between cases. */
export function resetLearnCreditsMemoryForTests() {
  (globalThis as DevMem).__uniprep2goLearnCredits = new Map();
}

export function hashLearnLicenseKey(licenseKey: string): string {
  return createHash("sha256").update(licenseKey.trim().toLowerCase()).digest("hex");
}

function redisKey(licenseHash: string) {
  return `learn:license:${licenseHash}`;
}

function isUnlimitedHash(licenseHash: string): boolean {
  return licenseHash === hashLearnLicenseKey("FREE");
}

export async function getLearnLicenseState(
  licenseHash: string,
): Promise<{ remaining: number; granted: number; exists: boolean }> {
  if (isUnlimitedHash(licenseHash)) {
    return { remaining: FREE_LEARN_CREDITS, granted: FREE_LEARN_CREDITS, exists: true };
  }

  const client = getRedisClient();
  if (client) {
    try {
      const row = await client.get<LearnLicenseRow>(redisKey(licenseHash));
      if (!row) {
        return { remaining: 0, granted: 0, exists: false };
      }
      return {
        remaining: Math.max(0, Number(row.remaining) || 0),
        granted: Math.max(0, Number(row.granted) || 0),
        exists: true,
      };
    } catch (error) {
      console.error("[learn-credits] redis get failed", error);
    }
  }

  const mem = devStore().get(licenseHash);
  if (!mem) {
    return { remaining: 0, granted: 0, exists: false };
  }
  return { remaining: mem.remaining, granted: mem.granted, exists: true };
}

export async function redeemLearnLicense(params: {
  licenseHash: string;
  purchaserEmail: string | null;
  gumroadSaleId: string | null;
  initialCredits: number;
  rawLicenseKey?: string;
}): Promise<{ remaining: number; alreadyRedeemed: boolean; granted: number }> {
  const { licenseHash, purchaserEmail, gumroadSaleId, initialCredits, rawLicenseKey } = params;

  if (isUnlimitedHash(licenseHash) || (rawLicenseKey && isFreeLearnLicenseKey(rawLicenseKey))) {
    return {
      remaining: FREE_LEARN_CREDITS,
      alreadyRedeemed: true,
      granted: FREE_LEARN_CREDITS,
    };
  }

  const credits = Math.max(1, Math.floor(initialCredits));
  const existing = await getLearnLicenseState(licenseHash);
  if (existing.exists) {
    return {
      remaining: existing.remaining,
      alreadyRedeemed: true,
      granted: existing.granted,
    };
  }

  const row: LearnLicenseRow = {
    remaining: credits,
    granted: credits,
    email: purchaserEmail,
    saleId: gumroadSaleId,
    updatedAt: new Date().toISOString(),
  };

  const client = getRedisClient();
  if (client) {
    try {
      await client.set(redisKey(licenseHash), row);
      return { remaining: credits, alreadyRedeemed: false, granted: credits };
    } catch (error) {
      console.error("[learn-credits] redis redeem failed", error);
      if (process.env.NODE_ENV === "production") {
        throw new Error("LEARN_STORE_UNAVAILABLE");
      }
    }
  }

  devStore().set(licenseHash, row);
  return { remaining: credits, alreadyRedeemed: false, granted: credits };
}

export async function consumeLearnCredit(
  licenseHash: string,
): Promise<{ ok: true; remaining: number } | { ok: false; reason: "empty" | "missing" | "store" }> {
  if (isUnlimitedHash(licenseHash)) {
    return { ok: true, remaining: FREE_LEARN_CREDITS };
  }

  const client = getRedisClient();
  if (client) {
    try {
      const key = redisKey(licenseHash);
      const row = await client.get<LearnLicenseRow>(key);
      if (!row) {
        return { ok: false, reason: "missing" };
      }
      const remaining = Math.max(0, Number(row.remaining) || 0);
      if (remaining <= 0) {
        return { ok: false, reason: "empty" };
      }
      const next: LearnLicenseRow = {
        ...row,
        remaining: remaining - 1,
        updatedAt: new Date().toISOString(),
      };
      await client.set(key, next);
      return { ok: true, remaining: next.remaining };
    } catch (error) {
      console.error("[learn-credits] redis consume failed", error);
      if (process.env.NODE_ENV === "production") {
        return { ok: false, reason: "store" };
      }
    }
  }

  const mem = devStore().get(licenseHash);
  if (!mem) {
    return { ok: false, reason: "missing" };
  }
  if (mem.remaining <= 0) {
    return { ok: false, reason: "empty" };
  }
  mem.remaining -= 1;
  mem.updatedAt = new Date().toISOString();
  return { ok: true, remaining: mem.remaining };
}
