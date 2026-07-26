import type { Metadata } from "next";
import { IntentPageView } from "@/components/intent-page";
import { getIntentPageBySlug } from "@/lib/intent-pages";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const page = getIntentPageBySlug("language-exam-vs-citizenship-civics-anki");
  if (!page) {
    return { title: "Not found" };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/language-exam-vs-citizenship-civics-anki" },
  };
}

export default async function LanguageExamVsCitizenshipCivicsAnkiPage() {
  const page = getIntentPageBySlug("language-exam-vs-citizenship-civics-anki");
  if (!page) {
    notFound();
  }

  return <IntentPageView page={page} />;
}
