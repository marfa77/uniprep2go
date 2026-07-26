import type { MockVerticalId } from "./types";

type CitizenshipTaxonomyEntry = {
  verticalId: MockVerticalId;
  familyId: string;
  searchAliases?: string[];
};

export const citizenshipTaxonomyEntries: Record<string, CitizenshipTaxonomyEntry> = {
  "leben-in-deutschland-readiness-check": {
    verticalId: "licensing",
    familyId: "citizenship",
    searchAliases: ["Einbürgerungstest", "LiD", "German citizenship test"],
  },
  "naturalisation-francaise-readiness-check": {
    verticalId: "licensing",
    familyId: "citizenship",
    searchAliases: ["naturalisation française", "French citizenship test"],
  },
  "life-in-the-uk-readiness-check": {
    verticalId: "licensing",
    familyId: "citizenship",
    searchAliases: ["Life in the UK", "LITUK", "British citizenship test"],
  },
  "canadian-citizenship-readiness-check": {
    verticalId: "licensing",
    familyId: "citizenship",
    searchAliases: ["Canadian citizenship test", "Discover Canada", "IRCC"],
  },
  "australian-citizenship-readiness-check": {
    verticalId: "licensing",
    familyId: "citizenship",
    searchAliases: ["Australian citizenship test", "Home Affairs citizenship"],
  },
};
