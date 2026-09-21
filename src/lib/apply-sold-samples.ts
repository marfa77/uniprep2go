import soldSamples from "@/data/sold-samples.json";
import type { SampleCard } from "./decks";

type SoldSample = { q: string; a: string };

const LANGUAGE_EXAM_SLUGS = new Set([
  "ciple-a2-european-portuguese-anki-deck",
  "delf-b2-french-anki-deck",
  "dutch-a2-inburgering-anki-deck",
  "german-a2-anki-deck",
  "celi-b1-italian-anki-deck",
  "danish-a2-prove-i-dansk-anki-deck",
  "norwegian-a2-norskprove-anki-deck",
  "swedish-a2-sfi-anki-deck",
  "greek-a2-ellinomatheia-anki-deck",
  "czech-a2-cce-anki-deck",
  "polish-a2-certyfikat-anki-deck",
  "polish-a2-for-ukrainian-speakers-anki-deck",
  "german-a2-for-ukrainian-speakers-anki-deck",
  "german-a2-for-russian-speakers-anki-deck",
  "ielts-toefl-english-for-french-speakers-anki-deck",
  "ielts-toefl-english-for-arabic-speakers-anki-deck",
  "ielts-toefl-english-for-ukrainian-speakers-anki-deck",
  "ielts-toefl-english-for-russian-speakers-anki-deck",
  "ielts-toefl-english-for-spanish-speakers-anki-deck",
  "ielts-toefl-english-for-portuguese-speakers-anki-deck",
  "ielts-toefl-english-for-turkish-speakers-anki-deck",
  "dele-a2-spanish-anki-deck",
]);

export function soldSamplesForSlug(slug: string): SoldSample[] {
  const rows = (soldSamples as Record<string, SoldSample[]>)[slug];
  return Array.isArray(rows) ? rows.slice(0, 3) : [];
}

/** Real Anki/PDF screenshots already match these Qs — do not overlay mismatched text. */
const SCREENSHOT_FAITHFUL_SLUGS = new Set([
  "cfa-level-1-anki-deck",
  "cfa-level-2-anki-deck",
  "cfa-level-1-formula-reference-2026",
  "cfa-level-2-formula-reference-2026",
  "frm-part-1-anki-deck",
  "ib-biology-sl-anki-deck",
  "ptcb-pharmacy-technician-anki-deck",
  "ptcb-study-guide-2026",
  "servsafe-manager-complete-study-guide",
  "ace-cpt-anki-deck",
  "acsm-cpt-anki-deck",
  "luxembourg-vivre-ensemble-anki-deck",
  "belgium-flanders-mo-anki-deck",
  "cat4-level-d-anki-deck-printable-pdf",
  "delf-prim-printable-french-flashcards",
  "series-7-anki-deck",
  "series-63-anki-deck",
]);

export function applySoldSamplesToDeck<
  T extends { slug: string; category: string; sampleCards: SampleCard[]; coverImage?: string },
>(deck: T): T {
  if (LANGUAGE_EXAM_SLUGS.has(deck.slug) || SCREENSHOT_FAITHFUL_SLUGS.has(deck.slug)) return deck;
  const picks = soldSamplesForSlug(deck.slug);
  if (picks.length < 3) return deck;

  const cover = deck.coverImage ?? `/covers/${deck.slug}.webp`;
  return {
    ...deck,
    sampleCards: picks.map((pick, index) => ({
      question: pick.q,
      answer: pick.a,
      imageUrl: deck.sampleCards[index]?.imageUrl || cover,
    })),
  };
}
