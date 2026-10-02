import { createHash } from "crypto";
import {
  MOCK_PASS_PRODUCT_ID,
  clampMockPassQuantity,
  mockPassAttemptsForQuantity,
} from "@/lib/mock-exams/mock-pass";

export type MockPassVerifyResult =
  | {
      ok: true;
      email: string | null;
      saleId: string | null;
      test: boolean;
      quantity: number;
      attempts: number;
      unlimited: boolean;
    }
  | { ok: false; message: string };

/** Attempts reported for internal keys listed in MOCK_PASS_UNLIMITED_KEYS. */
export const UNLIMITED_MOCK_PASS_ATTEMPTS = 999;

export function hashMockPassKey(licenseKey: string): string {
  return createHash("sha256").update(licenseKey.trim().toLowerCase()).digest("hex");
}

/** Internal demo/partner keys from env (comma-separated). Never hardcoded. */
export function unlimitedMockPassHashes(): Set<string> {
  const raw = process.env.MOCK_PASS_UNLIMITED_KEYS ?? "";
  return new Set(
    raw
      .split(",")
      .map((key) => key.trim())
      .filter((key) => key.length >= 12)
      .map(hashMockPassKey),
  );
}

export function isUnlimitedMockPassHash(licenseHash: string): boolean {
  return unlimitedMockPassHashes().has(licenseHash);
}

function resolveProductId(): string {
  return process.env.GUMROAD_MOCK_PASS_PRODUCT_ID?.trim() || MOCK_PASS_PRODUCT_ID;
}

type GumroadVerifyJson = {
  success?: boolean;
  message?: string;
  purchase?: {
    email?: string;
    sale_id?: string;
    test?: boolean;
    quantity?: number;
    refunded?: boolean;
    chargebacked?: boolean;
    disputed?: boolean;
    dispute_won?: boolean;
  };
};

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
    console.error("[mock-pass] gumroad verify failed:", error);
    return null;
  }
}

/** Verify a Gumroad license against the Mock Pass product (1 unit = 5 attempts). */
export async function verifyMockPassLicense(licenseKey: string): Promise<MockPassVerifyResult> {
  const trimmed = licenseKey.trim();
  if (!trimmed || trimmed.length > 200) {
    return { ok: false, message: "Enter the license key from your Gumroad receipt email." };
  }

  if (isUnlimitedMockPassHash(hashMockPassKey(trimmed))) {
    return {
      ok: true,
      email: null,
      saleId: "internal",
      test: true,
      quantity: 1,
      attempts: UNLIMITED_MOCK_PASS_ATTEMPTS,
      unlimited: true,
    };
  }

  const data = await postLicenseVerify(trimmed, resolveProductId());
  if (!data) {
    return { ok: false, message: "Could not reach Gumroad. Try again in a minute." };
  }
  if (!data.success) {
    return {
      ok: false,
      message: "That key is not a Mock Pass license. Copy it exactly from your Gumroad receipt email.",
    };
  }

  const purchase = data.purchase ?? {};
  if (purchase.refunded || purchase.chargebacked || (purchase.disputed && !purchase.dispute_won)) {
    return { ok: false, message: "This Mock Pass purchase was refunded or disputed, so the key is no longer active." };
  }

  const quantity = clampMockPassQuantity(purchase.quantity);
  return {
    ok: true,
    email: purchase.email ? String(purchase.email) : null,
    saleId: purchase.sale_id ? String(purchase.sale_id) : null,
    test: Boolean(purchase.test),
    quantity,
    attempts: mockPassAttemptsForQuantity(quantity),
    unlimited: false,
  };
}
