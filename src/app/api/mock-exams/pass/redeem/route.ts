import { cookies } from "next/headers";
import { hashMockPassKey, verifyMockPassLicense } from "@/lib/gumroad-mock-pass-license";
import { MOCK_PASS_COOKIE, MOCK_PASS_COOKIE_MAX_AGE, signMockPassSession } from "@/lib/mock-pass-token";
import { redeemMockPass } from "@/lib/mock-pass-store";
import { isMockPaywallEnabled } from "@/lib/mock-exams/mock-pass";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isMockPaywallEnabled()) {
    return Response.json({ ok: false, message: "Mocks are currently free — no key needed." }, { status: 404 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as { licenseKey?: unknown };
    const licenseKey = typeof body.licenseKey === "string" ? body.licenseKey.trim() : "";
    if (!licenseKey) {
      return Response.json({ ok: false, message: "Paste the license key from your Gumroad receipt." }, { status: 400 });
    }

    const verified = await verifyMockPassLicense(licenseKey);
    if (!verified.ok) {
      return Response.json({ ok: false, message: verified.message }, { status: 400 });
    }

    const licenseHash = hashMockPassKey(licenseKey);
    const redeemed = await redeemMockPass({
      licenseHash,
      attempts: verified.attempts,
      email: verified.email,
      saleId: verified.saleId,
    });

    const token = signMockPassSession(licenseHash);
    if (!token) {
      console.error("[mock-pass/redeem] MOCK_PASS_SECRET is not configured");
      return Response.json(
        { ok: false, message: "Unlock is temporarily unavailable. Your key is safe — try again shortly." },
        { status: 500 },
      );
    }

    const jar = await cookies();
    jar.set(MOCK_PASS_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: MOCK_PASS_COOKIE_MAX_AGE,
    });

    return Response.json({
      ok: true,
      remaining: redeemed.remaining,
      granted: redeemed.granted,
      alreadyRedeemed: redeemed.alreadyRedeemed,
      quantity: verified.quantity,
    });
  } catch (error) {
    console.error("[mock-pass/redeem] failed", error);
    return Response.json({ ok: false, message: "Unlock failed. Try again in a minute." }, { status: 500 });
  }
}
