import type { Metadata } from "next";
import { IntentPageView } from "@/components/intent-page";
import { getIntentPageBySlug } from "@/lib/intent-pages";

const page = getIntentPageBySlug("ciple-a2-anki-deck-for-portuguese-citizenship");

export const metadata: Metadata = {
  title: page?.title,
  description: page?.description,
  alternates: {
    canonical: "/ciple-a2-anki-deck-for-portuguese-citizenship",
  },
};

export default function CipleA2AnkiDeckForPortugueseCitizenshipPage() {
  return <IntentPageView page={page!} />;
}
