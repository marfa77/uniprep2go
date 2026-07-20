import { createHmac, timingSafeEqual } from "crypto";

export const LEARN_SESSION_COOKIE = "uniprep_learn_session";

function learnSecret(): string | null {
  const configured =
    process.env.LEARN_ACCESS_SECRET?.trim() || process.env.PACK_ACCESS_SECRET?.trim();
  if (configured) return configured;
  if (process.env.NODE_ENV !== "production") {
    return "dev-learn-access-secret";
  }
  return null;
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

/** Signed browser session bound to a redeemed license hash (never store raw key). */
export function signLearnSession(licenseHash: string): string | null {
  const secret = learnSecret();
  if (!secret || !licenseHash) return null;
  const body = JSON.stringify({ h: licenseHash, i: Math.floor(Date.now() / 1000) });
  const b64 = Buffer.from(body, "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(body).digest("hex");
  return `${b64}.${sig}`;
}

export function verifyLearnSession(token: string | null | undefined): { licenseHash: string } | null {
  if (!token) return null;
  const secret = learnSecret();
  if (!secret) return null;

  const dot = token.indexOf(".");
  if (dot <= 0) return null;
  const b64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^[a-f0-9]+$/i.test(sig) || sig.length !== 64) return null;

  let body: string;
  try {
    body = Buffer.from(b64, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expectedSig = createHmac("sha256", secret).update(body).digest("hex");
  if (!timingSafeEqualHex(sig.toLowerCase(), expectedSig)) return null;

  let payload: { h?: string };
  try {
    payload = JSON.parse(body) as { h?: string };
  } catch {
    return null;
  }

  const licenseHash = String(payload.h ?? "").trim().toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(licenseHash)) return null;
  return { licenseHash };
}
