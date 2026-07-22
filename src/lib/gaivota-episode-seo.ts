import type { GaivotaEpisode } from "./gaivota-comics";
import { gaivotaEpisodes } from "./gaivota-comics";

export type GaivotaEpisodeSeo = {
  historyBrief: string;
  howToUse: string;
  faqs: Array<{ question: string; answer: string }>;
};

/** Unique long-form copy so episode landings are not cover+CTA shells. */
export const gaivotaEpisodeSeo: Record<string, GaivotaEpisodeSeo> = {
  "01-1755-earthquake": {
    historyBrief:
      "On All Saints’ Day 1755, a massive earthquake, tsunami, and fires devastated Lisbon. Tens of thousands died; the city’s reconstruction under the Marquis of Pombal reshaped Portuguese urban planning and Enlightenment politics. This free Gaivota episode follows Leonor and Avô Manuel through the morning of the quake in a five-page noir comic with a 100-word PT→EN glossary for CIPLE / A2 learners.",
    howToUse:
      "Read the free online comic first, then skim the glossary aloud (PT then EN). Pair with CIPLE Anki vocabulary for housing and emergency words. Teachers can project one page and ask students to retell the panel in European Portuguese.",
    faqs: [
      {
        question: "Is Episode 1 really free?",
        answer:
          "Yes. O Terramoto (1755) is free to read on UniPrep2Go. Later Gaivota episodes are sold individually on Gumroad for $5 PDF downloads.",
      },
      {
        question: "Is this official history curriculum?",
        answer:
          "No. Gaivota is an independent educational comic — accurate enough for language learners, not a substitute for academic historiography.",
      },
      {
        question: "Does it help CIPLE / Portuguese citizenship prep?",
        answer:
          "It builds cultural context and A2 vocabulary in story form. Pair it with the CIPLE CAPLE Anki deck for spaced vocabulary drilling.",
      },
    ],
  },
  "02-25-de-abril": {
    historyBrief:
      "25 April 1974 — the Carnation Revolution ended Estado Novo dictatorship with a nearly bloodless military uprising in Lisbon. Carnations in rifle barrels became the global symbol. This Gaivota episode retells the morning of the revolution as a noir comic with glossary support for intermediate Portuguese learners.",
    howToUse:
      "Buy the $5 PDF on Gumroad, print or read on tablet, then study the 100-word glossary. Discuss why the revolution matters for modern Portuguese identity before CIPLE civics-adjacent culture topics.",
    faqs: [
      {
        question: "What do I get for $5?",
        answer:
          "A printable PDF episode: history brief, 5-page comic, and PT→EN glossary — delivered instantly via Gumroad by PixID Studio.",
      },
      {
        question: "Should I read Episode 1 first?",
        answer:
          "Recommended but not required. Episode 1 (1755) is free on this site and introduces the Gaivota format.",
      },
      {
        question: "Is this political propaganda?",
        answer:
          "No. It is a language-learning comic about a documented historical event. Always cross-check details with reliable history sources.",
      },
    ],
  },
  "03-aljubarrota": {
    historyBrief:
      "The 1385 Battle of Aljubarrota secured Portuguese independence against Castile and cemented the Aviz dynasty. Nuno Álvares Pereira’s tactics and English alliance themes echo through Portuguese national memory. Gaivota Episode 3 dramatizes the stakes in five noir pages plus glossary.",
    howToUse:
      "Read the PDF comic, then use glossary words in short spoken summaries (who fought, why it mattered). Pair with CIPLE cultural reading practice.",
    faqs: [
      {
        question: "Is Aljubarrota suitable for A2 learners?",
        answer:
          "Yes — the glossary targets roughly A2 vocabulary. The history brief is in English so beginners can follow the plot.",
      },
      {
        question: "How is this different from a textbook?",
        answer:
          "It is a short artistic comic with vocabulary support, not a full history course or CAPLE exam paper.",
      },
      {
        question: "Where do I buy it?",
        answer:
          "On Gumroad via the checkout button on this page — $5 instant PDF download.",
      },
    ],
  },
  "04-ceuta": {
    historyBrief:
      "In 1415 Portugal captured Ceuta in North Africa — often marked as an opening move of the Portuguese Discoveries. The campaign mixes crusading rhetoric, trade ambition, and royal politics under João I. This episode frames Ceuta as a turning point toward oceanic expansion.",
    howToUse:
      "Read the comic once for story, once for glossary words related to ships, forts, and travel. Discuss with a tutor: why Ceuta mattered for later voyages.",
    faqs: [
      {
        question: "Is the comic historically accurate?",
        answer:
          "It is a dramatized educational summary. Use it for language and orientation, then verify details in reputable histories.",
      },
      {
        question: "What level of Portuguese is required?",
        answer:
          "A2–B1 learners can follow with the glossary; absolute beginners should start with Episode 1’s free format.",
      },
      {
        question: "Can I print the PDF?",
        answer:
          "Yes — the Gumroad file is designed for print or tablet reading.",
      },
    ],
  },
  "05-vasco-da-gama": {
    historyBrief:
      "Vasco da Gama’s late-15th-century voyages linked Portugal to the Indian Ocean trade, reshaping global commerce and empire. Gaivota Episode 5 compresses the departure stakes and ocean risk into a noir five-pager with learner glossary.",
    howToUse:
      "After reading, list ten voyage-related Portuguese words from the glossary and use each in a spoken sentence. Pair with CIPLE travel/work vocabulary decks.",
    faqs: [
      {
        question: "Does the comic cover the whole career of da Gama?",
        answer:
          "No — it focuses on a short narrative arc suitable for language study, not a biography.",
      },
      {
        question: "Is this for kids or adults?",
        answer:
          "Teen and adult language learners. Tone is noir/history, not a children’s picture book.",
      },
      {
        question: "How do I get Episode 5?",
        answer:
          "Purchase the $5 PDF on Gumroad from the button on this page.",
      },
    ],
  },
  "06-liberal-revolution": {
    historyBrief:
      "The 1820 Liberal Revolution in Porto challenged absolutism and pushed Portugal toward constitutional monarchy amid Brazilian independence pressures. Gaivota Episode 6 introduces the street-level energy of liberal revolt for Portuguese learners.",
    howToUse:
      "Read the brief in English, then the comic panels; retell the plot in Portuguese using glossary verbs. Good bridge topic before modern republic episodes.",
    faqs: [
      {
        question: "Why learn history for language exams?",
        answer:
          "CIPLE and daily life in Portugal reward cultural references. Comics make those references memorable without a full history degree.",
      },
      {
        question: "Is Episode 6 free?",
        answer:
          "No — paid $5 PDF on Gumroad. Episode 1 remains the free sample on this site.",
      },
      {
        question: "Do I need earlier episodes?",
        answer:
          "Each episode stands alone, but reading in order builds series continuity.",
      },
    ],
  },
  "07-republic": {
    historyBrief:
      "The 1910 Portuguese Republic ended the monarchy after decades of political crisis. Gaivota Episode 7 sketches the republican rupture for learners who need cultural timeline anchors between monarchy and Estado Novo.",
    howToUse:
      "Use the glossary to build a mini timeline speech: monarchy → republic → later dictatorship. Practice numbers and dates in Portuguese aloud.",
    faqs: [
      {
        question: "Is this the same as Episode 8 Estado Novo?",
        answer:
          "No. Episode 7 covers the 1910 republic; Episode 8 covers the later authoritarian Estado Novo period.",
      },
      {
        question: "What file format do I receive?",
        answer:
          "A printable PDF comic pack via Gumroad after checkout.",
      },
      {
        question: "Can classrooms use it?",
        answer:
          "Yes as a short cultural warm-up — purchase covers personal/classroom use per Gumroad license terms.",
      },
    ],
  },
  "08-estado-novo": {
    historyBrief:
      "Estado Novo (1933–1974) was Portugal’s authoritarian regime under Salazar and later Caetano — censorship, colonial wars, and emigration shaped a generation. Episode 8 gives learners a compact noir entry point before the 25 de Abril episode.",
    howToUse:
      "Read Episode 8, then Episode 2 (25 de Abril) to connect dictatorship → revolution. Use glossary words for politics and daily life under restriction.",
    faqs: [
      {
        question: "Is the tone appropriate for schools?",
        answer:
          "It is serious historical noir. Teachers should preview panels; it is not a light children’s comic.",
      },
      {
        question: "Does it replace a history textbook?",
        answer:
          "No — it is a language-learning comic with a short factual brief.",
      },
      {
        question: "Where is checkout?",
        answer:
          "Use the Gumroad button on this page for the $5 PDF.",
      },
    ],
  },
  "09-treaty-of-windsor": {
    historyBrief:
      "The 1386 Treaty of Windsor sealed a long Anglo-Portuguese alliance after Aljubarrota. Episode 9 explores diplomacy and alliance language useful for cultural literacy and intermediate vocabulary.",
    howToUse:
      "After reading, explain the alliance in five Portuguese sentences using glossary nouns. Pair with Episode 3 (Aljubarrota) for medieval context.",
    faqs: [
      {
        question: "Why is Windsor in a Portugal series?",
        answer:
          "Because the treaty is a core Portuguese diplomatic milestone still referenced in cultural materials.",
      },
      {
        question: "Is English required to understand it?",
        answer:
          "The history brief is in English; the comic dialogue is Portuguese with glossary support.",
      },
      {
        question: "How much does it cost?",
        answer: "$5 USD via Gumroad instant download.",
      },
    ],
  },
  "10-eu-accession": {
    historyBrief:
      "In 1986 Portugal joined the European Economic Community (today’s EU path), accelerating modernization, funds, and mobility. Episode 10 closes Season 1’s arc from empire and dictatorship toward European integration — useful cultural framing for learners living in contemporary Portugal.",
    howToUse:
      "Read the comic, then discuss EU-related vocabulary (work, travel, rights) from the glossary. Pair with CIPLE daily-life themes about modern Portugal.",
    faqs: [
      {
        question: "Is this the last episode?",
        answer:
          "It is Episode 10 in the published Season 1 lineup on UniPrep2Go / Gumroad.",
      },
      {
        question: "Do I need every episode?",
        answer:
          "No. Start free with Episode 1; buy later issues that match the history topics you care about.",
      },
      {
        question: "Are these official EU materials?",
        answer:
          "No. Independent educational comics by the Prep2Go / UniPrep2Go creative line.",
      },
    ],
  },
};

export function getGaivotaEpisodeSeo(episodeId: string): GaivotaEpisodeSeo | null {
  return gaivotaEpisodeSeo[episodeId] ?? null;
}

export function getGaivotaEpisode(episodeId: string): GaivotaEpisode | undefined {
  return gaivotaEpisodes.find((ep) => ep.id === episodeId);
}
