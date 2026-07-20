import { cookies } from "next/headers";
import { LEARN_SESSION_COOKIE, verifyLearnSession } from "@/lib/learn-access-token";
import { getLearnLicenseState } from "@/lib/learn-credits-store";
import {
  LEARN_PASS_PRICE_USD,
  isLearnPassConfigured,
  isLearnPassEnabled,
} from "@/lib/mock-exams/learn-pass";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isLearnPassEnabled()) {
    return Response.json({ ok: false, message: "Not found" }, { status: 404 });
  }

  const jar = await cookies();
  const session = verifyLearnSession(jar.get(LEARN_SESSION_COOKIE)?.value);
  if (!session) {
    return Response.json({
      authenticated: false,
      remaining: 0,
      granted: 0,
      priceUsd: LEARN_PASS_PRICE_USD,
      productConfigured: isLearnPassConfigured(),
    });
  }

  const state = await getLearnLicenseState(session.licenseHash);
  return Response.json({
    authenticated: true,
    remaining: state.remaining,
    granted: state.granted,
    priceUsd: LEARN_PASS_PRICE_USD,
    productConfigured: isLearnPassConfigured(),
  });
}
