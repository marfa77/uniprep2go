import { buildLlmsTxt } from "@/lib/llm-docs";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
