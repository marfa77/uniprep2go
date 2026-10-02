import { cookies } from "next/headers";
import { MOCK_PASS_COOKIE, isMockPassUnlockReady, verifyMockPassSession } from "@/lib/mock-pass-token";
import { getMockPassState } from "@/lib/mock-pass-store";
import { isMockPaywallEnabled } from "@/lib/mock-exams/mock-pass";

export const dynamic = "force-dynamic";

export async function GET() {
  const paywallEnabled = isMockPaywallEnabled();
  const unlockReady = isMockPassUnlockReady();
  const jar = await cookies();
  const session = verifyMockPassSession(jar.get(MOCK_PASS_COOKIE)?.value);
  if (!session) {
    return Response.json({ paywallEnabled, unlockReady, hasPass: false, remaining: 0, granted: 0 });
  }

  try {
    const state = await getMockPassState(session.licenseHash);
    return Response.json({
      paywallEnabled,
      unlockReady,
      hasPass: state.exists,
      remaining: state.remaining,
      granted: state.granted,
    });
  } catch (error) {
    console.error("[mock-pass/status] failed", error);
    return Response.json({ paywallEnabled, hasPass: true, remaining: 0, granted: 0, error: "store" }, { status: 503 });
  }
}
