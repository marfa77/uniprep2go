import { buildIntentMarkdown } from "@/lib/llm-docs";
import { getIntentPageBySlug } from "@/lib/intent-pages";
import { geoMarkdownHeaders } from "@/lib/seo";

export const revalidate = 3600;

export async function GET() {
  const page = getIntentPageBySlug("which-citizenship-anki-deck");

  if (!page) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(buildIntentMarkdown(page), {
    headers: geoMarkdownHeaders(`/${page.slug}`),
  });
}
