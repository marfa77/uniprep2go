import type { Metadata } from "next";
import { IntentPageView } from "@/components/intent-page";
import { getIntentPageBySlug } from "@/lib/intent-pages";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const page = getIntentPageBySlug("ciple-a2-anki-deck-for-portuguese-citizenship");
  if (!page) {
    return { title: "Not found" };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/ciple-a2-anki-deck-for-portuguese-citizenship" },
  };
}

export default async function CipleA2AnkiDeckForPortugueseCitizenshipPage() {
  const page = getIntentPageBySlug("ciple-a2-anki-deck-for-portuguese-citizenship");
  if (!page) {
    notFound();
  }

  return <IntentPageView page={page} />;
}
