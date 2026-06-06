/**
 * Post-build IndexNow ping on Vercel production (main only).
 * Mirrors bench-energy-news: submit all sitemap URLs after deploy.
 */
import { shouldRunIndexNowOnDeploy, submitIndexNowSitemap } from "@/lib/indexnow";

async function main(): Promise<void> {
  if (!shouldRunIndexNowOnDeploy()) {
    console.log("[indexnow:deploy] skip (not production main)");
    return;
  }

  const result = await submitIndexNowSitemap();
  console.log(
    `[indexnow:deploy] status=${result.status} urls=${result.urlCount} ok=${result.ok}`,
  );
  if (result.error) console.error("[indexnow:deploy] error:", result.error);
  if (result.body) console.log("[indexnow:deploy] body:", result.body);

  if (!result.ok && result.urlCount > 0) {
    console.warn(
      "[indexnow:deploy] ping failed — deploy continues; retry via npm run indexnow:submit -- --sitemap",
    );
  }
}

main().catch((err) => {
  console.error("[indexnow:deploy] fatal:", err);
  console.warn("[indexnow:deploy] non-fatal for build — IndexNow can be retried after deploy");
});
