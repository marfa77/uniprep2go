/**
 * Manual IndexNow ping — full catalog or paths from a deploy diff.
 *
 * Usage:
 *   npx tsx scripts/ping-indexnow.ts --all
 *   npx tsx scripts/ping-indexnow.ts --from-deploy
 *   npx tsx scripts/ping-indexnow.ts --files src/lib/decks.ts,src/app/page.tsx
 */
import {
  getDeployChangedFiles,
  getIndexNowUrls,
  resolveIndexNowUrlsFromChangedFiles,
  submitIndexNowForDeploy,
  submitIndexNowUrls,
} from "../src/lib/indexnow";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const all = args.includes("--all");
  const fromDeploy = args.includes("--from-deploy");
  const filesArg = args.find((a) => a.startsWith("--files="))?.slice("--files=".length);

  let result;
  if (all) {
    result = await submitIndexNowUrls(getIndexNowUrls());
    console.log(JSON.stringify({ mode: "all", ...result }, null, 2));
  } else if (filesArg) {
    const files = filesArg.split(",").map((f) => f.trim()).filter(Boolean);
    const { scope, urls } = resolveIndexNowUrlsFromChangedFiles(files);
    result = await submitIndexNowUrls(urls);
    console.log(JSON.stringify({ mode: "files", scope, ...result }, null, 2));
  } else if (fromDeploy) {
    result = await submitIndexNowForDeploy();
    console.log(JSON.stringify({ mode: "deploy", ...result }, null, 2));
  } else {
    const changed = getDeployChangedFiles();
    if (changed?.length) {
      const { scope, urls } = resolveIndexNowUrlsFromChangedFiles(changed);
      result = await submitIndexNowUrls(urls);
      console.log(
        JSON.stringify({ mode: "git-diff", scope, changedCount: changed.length, ...result }, null, 2),
      );
    } else {
      console.log("No git diff available. Use --all, --from-deploy, or --files=path1,path2");
      process.exitCode = 1;
    }
  }

  if (result && !result.ok && result.urlCount > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
