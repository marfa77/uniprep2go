/**
 * Post-build IndexNow ping on Vercel production (main only).
 * Lives in src/lib/ because scripts/ may be excluded from the build context.
 */
import { shouldRunIndexNowOnDeploy, submitIndexNowForDeploy } from "@/lib/indexnow";

async function main(): Promise<void> {
  if (!shouldRunIndexNowOnDeploy()) {
    console.log("[indexnow:deploy] skip (not production main)");
    return;
  }

  const result = await submitIndexNowForDeploy();
  console.log(
    `[indexnow:deploy] scope=${result.scope ?? "n/a"} status=${result.status} urls=${result.urlCount} ok=${result.ok}`,
  );
  if (result.error) console.error("[indexnow:deploy] error:", result.error);
  if (result.body) console.log("[indexnow:deploy] body:", result.body);

  if (!result.ok && result.urlCount > 0) {
    console.warn(
      "[indexnow:deploy] ping failed — deploy continues; retry via cron or npm run indexnow:ping -- --all",
    );
  }
}

main().catch((err) => {
  console.error("[indexnow:deploy] fatal:", err);
  console.warn("[indexnow:deploy] non-fatal for build — IndexNow can be retried after deploy");
});
