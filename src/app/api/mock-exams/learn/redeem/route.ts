import { cookies } from "next/headers";
import {
  verifyGumroadLearnLicense,
  isFreeLearnLicenseKey,
} from "@/lib/gumroad-learn-license";
import { LEARN_SESSION_COOKIE, signLearnSession } from "@/lib/learn-access-token";
import { hashLearnLicenseKey, redeemLearnLicense } from "@/lib/learn-credits-store";
import { LEARN_PASS_PRICE_USD, isLearnPassEnabled } from "@/lib/mock-exams/learn-pass";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isLearnPassEnabled()) {
    return Response.json({ ok: false, message: "Not found" }, { status: 404 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as { licenseKey?: unknown };
    const licenseKey = typeof body.licenseKey === "string" ? body.licenseKey.trim() : "";
    if (!licenseKey) {
      return Response.json({ ok: false, message: "License key is required." }, { status: 400 });
    }

    const verified = await verifyGumroadLearnLicense(licenseKey);
    if (!verified.ok) {
      return Response.json({ ok: false, message: verified.message }, { status: 400 });
    }

    const licenseHash = hashLearnLicenseKey(licenseKey);
    const redeemed = await redeemLearnLicense({
      licenseHash,
      purchaserEmail: verified.email,
      gumroadSaleId: verified.saleId,
      initialCredits: verified.initialCredits,
      rawLicenseKey: licenseKey,
    });

    const token = signLearnSession(licenseHash);
    if (!token) {
      return Response.json(
        { ok: false, message: "Could not create Learn session. Missing LEARN_ACCESS_SECRET." },
        { status: 500 },
      );
    }

    const jar = await cookies();
    jar.set(LEARN_SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return Response.json({
      ok: true,
      remaining: redeemed.remaining,
      granted: redeemed.granted,
      alreadyRedeemed: redeemed.alreadyRedeemed,
      quantity: verified.quantity,
      priceUsd: LEARN_PASS_PRICE_USD,
      isFreeKey: isFreeLearnLicenseKey(licenseKey),
    });
  } catch (error) {
    console.error("[learn/redeem] failed", error);
    return Response.json({ ok: false, message: "Redeem failed. Try again." }, { status: 500 });
  }
}
