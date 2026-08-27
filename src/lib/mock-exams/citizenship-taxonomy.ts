import type { MockVerticalId } from "./types";

type CitizenshipTaxonomyEntry = {
  verticalId: MockVerticalId;
  familyId: string;
  searchAliases?: string[];
};

export const citizenshipTaxonomyEntries: Record<string, CitizenshipTaxonomyEntry> = {
  "leben-in-deutschland-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["Einbürgerungstest", "LiD", "German citizenship test"],
  },
  "naturalisation-francaise-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["naturalisation française", "French citizenship test"],
  },
  "life-in-the-uk-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["Life in the UK", "LITUK", "British citizenship test"],
  },
  "canadian-citizenship-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["Canadian citizenship test", "Discover Canada", "IRCC"],
  },
  "australian-citizenship-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["Australian citizenship test", "Home Affairs citizenship"],
  },
  "ccse-espana-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["CCSE", "CCSE España", "prueba CCSE", "nacionalidad española"],
  },
  "swiss-citizenship-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["Swiss citizenship", "Einbürgerung Schweiz", "Staatskunde"],
  },
  "naturalisation-suisse-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["naturalisation suisse", "examen naturalisation suisse", "Staatskunde français"],
  },
  "naturalizzazione-svizzera-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["naturalizzazione svizzera", "cittadinanza svizzera", "Staatskunde italiano"],
  },
  "czech-citizenship-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["Czech citizenship", "občanství ČR", "zkouška z reálií"],
  },
  "polish-citizenship-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["Polish citizenship", "obywatelstwo polskie", "wiedza o Polsce"],
  },
  "denmark-indfoedsretsproeven-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["Indfødsretsprøven", "Danish citizenship test"],
  },
  "portugal-nacionalidade-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["nacionalidade portuguesa", "conhecimento cívico"],
  },
  "norway-statsborgerproven-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["Statsborgerprøven", "Norwegian citizenship test"],
  },
  "sweden-medborgarskapsprov-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["Medborgarskapsprov", "Swedish citizenship test"],
  },
  "belgium-flanders-mo-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["maatschappelijke oriëntatie", "Flanders MO", "inburgering Vlaanderen"],
  },
  "belgium-wallonie-citoyennete-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["citoyenneté Wallonie", "parcours d'intégration"],
  },
  "luxembourg-vivre-ensemble-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["Vivre ensemble Luxembourg", "Luxembourg citizenship"],
  },
  "finland-kansalaisuuskoe-readiness-check": {
    verticalId: "citizenship",
    familyId: "citizenship",
    searchAliases: ["kansalaisuuskoe", "Finnish citizenship test", "kansalaisuustesti"],
  },
};
