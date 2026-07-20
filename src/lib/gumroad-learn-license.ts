import {
  initialLearnCreditsForQuantity,
  parseLearnPurchaseQuantity,
} from "@/lib/mock-exams/learn-pass";

export type GumroadLearnVerifyResult =
  | {
      ok: true;
      email: string | null;
      saleId: string | null;
      test: boolean;
      quantity: number;
      initialCredits: number;
      gumroadUses: number;
    }
  | { ok: false; message: string };

/** Manual unlimited keys (demos, partners, internal). Case-insensitive. */
const UNLIMITED_LICENSE_KEYS = ["FREE"] as const;
export const FREE_LEARN_CREDITS = 999;

export function isFreeLearnLicenseKey(licenseKey: string): boolean {
  const normalized = licenseKey.trim().toUpperCase();
  return (UNLIMITED_LICENSE_KEYS as readonly string[]).includes(normalized);
}

type GumroadVerifyJson = {
  success?: boolean;
  message?: string;
  uses?: unknown;
  purchase?: {
    email?: string;
    sale_id?: string;
    test?: boolean;
    quantity?: number;
    product_id?: string;
  };
};

function resolveLearnProductId(): string | null {
  const env = process.env.GUMROAD_LEARN_PRODUCT_ID?.trim();
  if (env) return env;
  return null;
}

async function postLicenseVerify(licenseKey: string, productId: string): Promise<GumroadVerifyJson | null> {
  const body = new URLSearchParams({
    product_id: productId,
    license_key: licenseKey,
    increment_uses_count: "false",
  });
  try {
    const res = await fetch("https://api.gumroad.com/v2/licenses/verify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
    return (await res.json().catch(() => ({}))) as GumroadVerifyJson;
  } catch (error) {
    console.error("[gumroad-learn-license] verify failed:", error);
    return null;
  }
}

/**
 * Verify a Gumroad license against the Learn Pass product.
 * Credits = purchase quantity (1 credit per $5 unit).
 */
export async function verifyGumroadLearnLicense(licenseKey: string): Promise<GumroadLearnVerifyResult> {
  const trimmed = licenseKey.trim();
  if (!trimmed || trimmed.length > 200) {
    return { ok: false, message: "Enter the license key from your Gumroad receipt email." };
  }

  if (isFreeLearnLicenseKey(trimmed)) {
    return {
      ok: true,
      email: null,
      saleId: "FREE",
      test: true,
      quantity: 1,
      initialCredits: FREE_LEARN_CREDITS,
      gumroadUses: 0,
    };
  }

  const productId = resolveLearnProductId();
  if (!productId) {
    return {
      ok: false,
      message: "Learn Pass checkout is not configured yet. Contact support if you already paid.",
    };
  }

  const data = await postLicenseVerify(trimmed, productId);
  if (!data) {
    return { ok: false, message: "Could not reach Gumroad. Try again in a minute." };
  }
  if (!data.success) {
    return {
      ok: false,
      message: data.message || "Invalid or expired license key. Check the key in your Gumroad email.",
    };
  }

  const quantity = parseLearnPurchaseQuantity(data.purchase?.quantity);
  const usesNum = Number(data.uses);
  return {
    ok: true,
    email: data.purchase?.email ? String(data.purchase.email) : null,
    saleId: data.purchase?.sale_id ? String(data.purchase.sale_id) : null,
    test: Boolean(data.purchase?.test),
    quantity,
    initialCredits: initialLearnCreditsForQuantity(quantity),
    gumroadUses: Number.isFinite(usesNum) ? Math.max(0, Math.floor(usesNum)) : 0,
  };
}
