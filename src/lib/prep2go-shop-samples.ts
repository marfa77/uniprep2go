import previewSamples from "../data/shop-preview-samples.json";
import type { SampleCard } from "./decks";

type RawShopSample = {
  front: string;
  back: string;
  transliteration?: string;
  exampleTarget: string;
  exampleNative: string;
  frequency?: number;
};

const PHRASE_PREVIEW_KEYS = new Set([
  "Arabic_for_UAE",
  "Russian_Phrases",
  "Japanese_Phrases",
  "Korean_Phrases",
]);

export const UNIPREP_TO_SHOP_PREVIEW_KEY: Record<string, string> = {
  "ciple-a2-european-portuguese-anki-deck": "CIPLE",
  "delf-b2-french-anki-deck": "DELF_TCF",
  "dutch-a2-inburgering-anki-deck": "Inburgering",
  "german-a2-anki-deck": "Goethe_telc_OSD",
  "celi-b1-italian-anki-deck": "CELI_CILS_PLIDA",
  "danish-a2-prove-i-dansk-anki-deck": "Prove_i_Dansk_PD2",
  "norwegian-a2-norskprove-anki-deck": "Norskprove_Bokmal",
  "swedish-a2-sfi-anki-deck": "Swedish_SFI",
  "greek-a2-ellinomatheia-anki-deck": "Greek_Ellinomatheia",
  "czech-a2-cce-anki-deck": "Czech_CCE",
  "spanish-italian-paired-anki-deck": "Spanish_Italian_Together",
  "ielts-toefl-english-for-arabic-speakers-anki-deck": "Arabic_to_English",
  "ielts-toefl-english-for-french-speakers-anki-deck": "French_to_English",
  "ielts-toefl-english-for-portuguese-speakers-anki-deck": "Portuguese_to_English",
  "ielts-toefl-english-for-spanish-speakers-anki-deck": "Spanish_to_English",
  "ielts-toefl-english-for-turkish-speakers-anki-deck": "Turkish_to_English",
  "ielts-toefl-english-for-ukrainian-speakers-anki-deck": "Ukrainian_to_English",
  "arabic-survival-phrases-anki-deck": "Arabic_for_UAE",
  "dele-a2-spanish-anki-deck": "DELE",
  "dele-a2-ccse-spanish-citizenship-bundle": "DELE",

  "japanese-survival-phrases-anki-deck": "Japanese_Phrases",
  "korean-survival-phrases-anki-deck": "Korean_Phrases",
  "russian-survival-phrases-anki-deck": "Russian_Phrases",
  "ciple-a2-grammar-anki-deck": "CIPLE_Grammar",
  "dele-a2-grammar-anki-deck": "DELE_Grammar",
  "delf-b2-grammar-anki-deck": "DELF_Grammar",
};

function mediaBase(shopKey: string, index: number) {
  return `/shop-preview-media/${shopKey}/${index}`;
}

function formatSampleAnswer(shopKey: string, card: RawShopSample) {
  if (shopKey.endsWith("_Grammar")) {
    return card.back;
  }

  if (PHRASE_PREVIEW_KEYS.has(shopKey)) {
    return card.transliteration ? `${card.back} — ${card.transliteration}` : card.back;
  }

  if (shopKey === "Spanish_Italian_Together") {
    return `${card.back} — ${card.exampleTarget} / ${card.exampleNative}`;
  }

  if (shopKey.endsWith("_to_English")) {
    return `${card.back} — ${card.exampleTarget} (${card.exampleNative})`;
  }

  return `${card.back} — ${card.exampleTarget} (${card.exampleNative})`;
}

export function buildShopPreviewSampleCards(uniprepSlug: string): SampleCard[] | null {
  const shopKey = UNIPREP_TO_SHOP_PREVIEW_KEY[uniprepSlug];
  if (!shopKey) return null;

  const raw = (previewSamples as Record<string, RawShopSample[]>)[shopKey];
  if (!raw?.length) return null;

  return raw.slice(0, 3).map((card, index) => {
    const cardNumber = index + 1;

    if (shopKey.endsWith("_Grammar")) {
      return {
        question: card.front,
        answer: formatSampleAnswer(shopKey, card),
        imageUrl: `${mediaBase(shopKey, cardNumber)}.webp`,
      };
    }

    if (PHRASE_PREVIEW_KEYS.has(shopKey)) {
      return {
        question: card.front,
        answer: formatSampleAnswer(shopKey, card),
        imageUrl: "",
        audioUrl: `${mediaBase(shopKey, cardNumber)}.mp3`,
      };
    }

    if (shopKey === "Spanish_Italian_Together") {
      return {
        question: card.front,
        answer: formatSampleAnswer(shopKey, card),
        imageUrl: `${mediaBase(shopKey, cardNumber)}.webp`,
        audioUrlEs: `${mediaBase(shopKey, cardNumber)}_es.mp3`,
        audioUrlIt: `${mediaBase(shopKey, cardNumber)}_it.mp3`,
      };
    }

    return {
      question: card.front,
      answer: formatSampleAnswer(shopKey, card),
      imageUrl: `${mediaBase(shopKey, cardNumber)}.webp`,
      audioUrl: `${mediaBase(shopKey, cardNumber)}.mp3`,
    };
  });
}

export function enrichDeckWithShopPreviews<T extends { slug: string; status: string; sampleCards: SampleCard[] }>(
  deck: T,
): T {
  if (deck.status !== "available") return deck;

  const sampleCards = buildShopPreviewSampleCards(deck.slug);
  if (!sampleCards?.length) return deck;

  return { ...deck, sampleCards };
}
