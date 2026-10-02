import { createHmac, timingSafeEqual } from "crypto";

export const MOCK_PASS_COOKIE = "uniprep_mock_pass";
export const MOCK_PASS_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function secret(): string | null {
  const configured =
    process.env.MOCK_PASS_SECRET?.trim() || process.env.LEARN_ACCESS_SECRET?.trim();
  if (configured) return configured;
  if (process.env.NODE_ENV !== "production") {
    return "dev-mock-pass-secret";
  }
  return null;
}

/** Redeem can only issue a session when this is true (sensitive Vercel vars are not readable back). */
export function isMockPassUnlockReady(): boolean {
  return secret() !== null;
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    const ba = Buffer.from(a, "hex");
    const bb = Buffer.from(b, "hex");
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

/** Signed browser session bound to a redeemed license hash (the raw key is never stored). */
export function signMockPassSession(licenseHash: string): string | null {
  const key = secret();
  if (!key || !licenseHash) return null;
  const body = JSON.stringify({ h: licenseHash, i: Math.floor(Date.now() / 1000) });
  const b64 = Buffer.from(body, "utf8").toString("base64url");
  const sig = createHmac("sha256", key).update(body).digest("hex");
  return `${b64}.${sig}`;
}

export function verifyMockPassSession(token: string | null | undefined): { licenseHash: string } | null {
  if (!token) return null;
  const key = secret();
  if (!key) return null;

  const dot = token.indexOf(".");
  if (dot <= 0) return null;
  const b64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^[a-f0-9]{64}$/i.test(sig)) return null;

  let body: string;
  try {
    body = Buffer.from(b64, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expectedSig = createHmac("sha256", key).update(body).digest("hex");
  if (!timingSafeEqualHex(sig.toLowerCase(), expectedSig)) return null;

  try {
    const payload = JSON.parse(body) as { h?: string };
    const licenseHash = String(payload.h ?? "").trim().toLowerCase();
    return /^[a-f0-9]{64}$/.test(licenseHash) ? { licenseHash } : null;
  } catch {
    return null;
  }
}
