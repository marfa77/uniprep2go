import type { Metadata } from "next";
import { IntentPageView } from "@/components/intent-page";
import { getIntentPageBySlug } from "@/lib/intent-pages";

const page = getIntentPageBySlug("anki-decks-for-language-exams");

export const metadata: Metadata = {
  title: page?.title,
  description: page?.description,
  alternates: {
    canonical: "/anki-decks-for-language-exams",
  },
};

export default function AnkiDecksForLanguageExamsPage() {
  return <IntentPageView page={page!} />;
}
