import type { MockQuestion } from "./types";
import lebenBank from "@/data/mock-exams/leben-in-deutschland-readiness-check.json";
import franceBank from "@/data/mock-exams/naturalisation-francaise-readiness-check.json";
import ukBank from "@/data/mock-exams/life-in-the-uk-readiness-check.json";
import canadaBank from "@/data/mock-exams/canadian-citizenship-readiness-check.json";
import australiaBank from "@/data/mock-exams/australian-citizenship-readiness-check.json";
import ccseBank from "@/data/mock-exams/ccse-espana-readiness-check.json";
import swissBank from "@/data/mock-exams/swiss-citizenship-readiness-check.json";
import naturalisationSuisseBank from "@/data/mock-exams/naturalisation-suisse-readiness-check.json";
import naturalizzazioneSvizzeraBank from "@/data/mock-exams/naturalizzazione-svizzera-readiness-check.json";
import czechBank from "@/data/mock-exams/czech-citizenship-readiness-check.json";
import polishBank from "@/data/mock-exams/polish-citizenship-readiness-check.json";
import denmarkBank from "@/data/mock-exams/denmark-indfoedsretsproeven-readiness-check.json";
import portugalBank from "@/data/mock-exams/portugal-nacionalidade-readiness-check.json";
import norwayBank from "@/data/mock-exams/norway-statsborgerproven-readiness-check.json";
import swedenBank from "@/data/mock-exams/sweden-medborgarskapsprov-readiness-check.json";
import belgiumFlandersBank from "@/data/mock-exams/belgium-flanders-mo-readiness-check.json";
import belgiumWallonieBank from "@/data/mock-exams/belgium-wallonie-citoyennete-readiness-check.json";
import luxembourgBank from "@/data/mock-exams/luxembourg-vivre-ensemble-readiness-check.json";

export const citizenshipBanksBySlug: Record<string, MockQuestion[]> = {
  "leben-in-deutschland-readiness-check": lebenBank as unknown as MockQuestion[],
  "naturalisation-francaise-readiness-check": franceBank as unknown as MockQuestion[],
  "life-in-the-uk-readiness-check": ukBank as unknown as MockQuestion[],
  "canadian-citizenship-readiness-check": canadaBank as unknown as MockQuestion[],
  "australian-citizenship-readiness-check": australiaBank as unknown as MockQuestion[],
  "ccse-espana-readiness-check": ccseBank as unknown as MockQuestion[],
  "swiss-citizenship-readiness-check": swissBank as unknown as MockQuestion[],
  "naturalisation-suisse-readiness-check": naturalisationSuisseBank as unknown as MockQuestion[],
  "naturalizzazione-svizzera-readiness-check": naturalizzazioneSvizzeraBank as unknown as MockQuestion[],
  "czech-citizenship-readiness-check": czechBank as unknown as MockQuestion[],
  "polish-citizenship-readiness-check": polishBank as unknown as MockQuestion[],
  "denmark-indfoedsretsproeven-readiness-check": denmarkBank as unknown as MockQuestion[],
  "portugal-nacionalidade-readiness-check": portugalBank as unknown as MockQuestion[],
  "norway-statsborgerproven-readiness-check": norwayBank as unknown as MockQuestion[],
  "sweden-medborgarskapsprov-readiness-check": swedenBank as unknown as MockQuestion[],
  "belgium-flanders-mo-readiness-check": belgiumFlandersBank as unknown as MockQuestion[],
  "belgium-wallonie-citoyennete-readiness-check": belgiumWallonieBank as unknown as MockQuestion[],
  "luxembourg-vivre-ensemble-readiness-check": luxembourgBank as unknown as MockQuestion[],
};
