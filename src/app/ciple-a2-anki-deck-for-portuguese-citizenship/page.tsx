import type { Metadata } from "next";
import { IntentPageView } from "@/components/intent-page";
import { buildIntentPageMetadata, getIntentPageBySlug } from "@/lib/intent-pages";
import { notFound } from "next/navigation";

const SLUG = "ciple-a2-anki-deck-for-portuguese-citizenship";

export async function generateMetadata(): Promise<Metadata> {
  const page = getIntentPageBySlug(SLUG);
  if (!page) {
    return { title: "Not found" };
  }

  return buildIntentPageMetadata(page);
}

export default async function CipleA2AnkiDeckForPortugueseCitizenshipPage() {
  const page = getIntentPageBySlug(SLUG);
  if (!page) {
    notFound();
  }

  return <IntentPageView page={page} />;
}
