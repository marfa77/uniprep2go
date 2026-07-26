import { buildIntentMarkdown } from "@/lib/llm-docs";
import { getIntentPageBySlug } from "@/lib/intent-pages";

export const revalidate = 3600;

export async function GET() {
  const page = getIntentPageBySlug("language-exam-vs-citizenship-civics-anki");

  if (!page) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(buildIntentMarkdown(page), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
