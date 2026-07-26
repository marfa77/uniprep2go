import type { MockQuestion } from "./types";
import lebenBank from "@/data/mock-exams/leben-in-deutschland-readiness-check.json";
import franceBank from "@/data/mock-exams/naturalisation-francaise-readiness-check.json";
import ukBank from "@/data/mock-exams/life-in-the-uk-readiness-check.json";
import canadaBank from "@/data/mock-exams/canadian-citizenship-readiness-check.json";
import australiaBank from "@/data/mock-exams/australian-citizenship-readiness-check.json";
import ccseBank from "@/data/mock-exams/ccse-espana-readiness-check.json";

export const citizenshipBanksBySlug: Record<string, MockQuestion[]> = {
  "leben-in-deutschland-readiness-check": lebenBank as unknown as MockQuestion[],
  "naturalisation-francaise-readiness-check": franceBank as unknown as MockQuestion[],
  "life-in-the-uk-readiness-check": ukBank as unknown as MockQuestion[],
  "canadian-citizenship-readiness-check": canadaBank as unknown as MockQuestion[],
  "australian-citizenship-readiness-check": australiaBank as unknown as MockQuestion[],
  "ccse-espana-readiness-check": ccseBank as unknown as MockQuestion[],
};
