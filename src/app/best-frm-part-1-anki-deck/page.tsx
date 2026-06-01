import type { Metadata } from "next";
import { IntentPageView } from "@/components/intent-page";
import { getIntentPageBySlug } from "@/lib/intent-pages";

const page = getIntentPageBySlug("best-frm-part-1-anki-deck");

export const metadata: Metadata = {
  title: page?.title,
  description: page?.description,
  alternates: {
    canonical: "/best-frm-part-1-anki-deck",
  },
};

export default function BestFrmPartOneAnkiDeckPage() {
  return <IntentPageView page={page!} />;
}
