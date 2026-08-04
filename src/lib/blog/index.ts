import { ankiDeckShelfLifePost } from "./posts/anki-deck-shelf-life";
import { ankiVsQuizletExamPrepPost } from "./posts/anki-vs-quizlet-exam-prep";
import { belgiumCitizenshipFlandersWalloniaPost } from "./posts/belgium-citizenship-flanders-wallonia";
import { canadaCitizenshipTestPost } from "./posts/canada-citizenship-test";
import { californiaRealEstateDreCentersPost } from "./posts/california-real-estate-dre-centers";
import { californiaRealEstatePsiVsPearsonPost } from "./posts/california-real-estate-psi-vs-pearson";
import { cdlGeneralKnowledgePost } from "./posts/cdl-general-knowledge";
import { cdlHazmatStateFingerprintingPost } from "./posts/cdl-hazmat-state-fingerprinting";
import { cdcpVsDcdcPost } from "./posts/cdcp-vs-dcdc";
import { cfaVsFrmPost } from "./posts/cfa-vs-frm";
import { czechCitizenshipExamZkouskaZRealiiPost } from "./posts/czech-citizenship-exam-zkouska-z-realii";
import { denmarkIndfoedsretsproevenPost } from "./posts/denmark-indfoedsretsproeven";
import { epa608PracticeTestPost } from "./posts/epa-608-practice-test";
import { epa608Type1VsType2Post } from "./posts/epa-608-type-1-vs-type-2";
import { finraOptionsQuestionsPost } from "./posts/finra-options-questions";
import { finraSieExamPrepPost } from "./posts/finra-sie-exam-prep";
import { floridaFoodManagerDbprRulesPost } from "./posts/florida-food-manager-dbpr-rules";
import { lebenInDeutschlandEnglishPrepPost } from "./posts/leben-in-deutschland-english-prep";
import { leedGaFreeResourcesPost } from "./posts/leed-ga-free-resources";
import { franceNaturalization2026Post } from "./posts/france-naturalization-2026";
import { germanyEinbuergerungstestVsLidPost } from "./posts/germany-einbuergerungstest-vs-lid";
import { italyCitizenshipB1Post } from "./posts/italy-citizenship-b1";
import { lifeInTheUkFailPassPost } from "./posts/life-in-the-uk-fail-pass";
import { luxembourgVivreEnsemblePost } from "./posts/luxembourg-vivre-ensemble";
import { memorizeEpa608RefrigerantsPost } from "./posts/memorize-epa-608-refrigerants";
import { mricsApcVsAssocricsPost } from "./posts/mrics-apc-vs-assocrics";
import { neboshIgcVsDiplomaPost } from "./posts/nebosh-igc-vs-diploma";
import { netherlandsInburgeringsexamenPost } from "./posts/netherlands-inburgeringsexamen";
import { norwayStatsborgerprovenPost } from "./posts/norway-statsborgerproven";
import { portugalNationalityTestPost } from "./posts/portugal-nationality-test";
import { servsafeFloridaRequirementsPost } from "./posts/servsafe-florida-requirements";
import { servsafeManagerStudyGuidePost } from "./posts/servsafe-manager-study-guide";
import { servsafePracticeTestsCountPost } from "./posts/servsafe-practice-tests-count";
import { spainCitizenshipCcseDelePost } from "./posts/spain-citizenship-ccse-dele";
import { swedenMedborgarskapsprovPost } from "./posts/sweden-medborgarskapsprov";
import { swissCitizenshipCantonalFormatPost } from "./posts/swiss-citizenship-cantonal-format";
import { usNaturalizationCivicsPost } from "./posts/us-naturalization-civics";
import { wellApVsFitwelPost } from "./posts/well-ap-vs-fitwel";
import {
  BLOG_STOCK_IMAGE_CONFIG,
  blogStockImagePublicPath,
} from "./stock-images";
import type { BlogImage, BlogPost, BlogPostDraft } from "./types";

export type { BlogBlock, BlogFaq, BlogImage, BlogPost, BlogPostDraft, BlogSection } from "./types";
export {
  BLOG_STOCK_IMAGE_CONFIG,
  BLOG_STOCK_IMAGES_DIR,
  blogStockImagePublicPath,
  listBlogStockImageSlots,
} from "./stock-images";

function slotToImage(slot: {
  id: string;
  alt: string;
  caption?: string;
}): BlogImage {
  return {
    src: blogStockImagePublicPath(slot.id),
    alt: slot.alt,
    caption: slot.caption,
  };
}

export function withBlogStockImages(draft: BlogPostDraft): BlogPost {
  const config = BLOG_STOCK_IMAGE_CONFIG[draft.slug];
  if (!config) {
    throw new Error(`Missing blog stock image config for slug: ${draft.slug}`);
  }
  return {
    ...draft,
    hero: slotToImage(config.hero),
    inlineImages: config.inline.map(slotToImage),
  };
}

const blogPostDrafts: BlogPostDraft[] = [
  czechCitizenshipExamZkouskaZRealiiPost,
  cdlGeneralKnowledgePost,
  canadaCitizenshipTestPost,
  usNaturalizationCivicsPost,
  lifeInTheUkFailPassPost,
  netherlandsInburgeringsexamenPost,
  franceNaturalization2026Post,
  germanyEinbuergerungstestVsLidPost,
  spainCitizenshipCcseDelePost,
  italyCitizenshipB1Post,
  luxembourgVivreEnsemblePost,
  belgiumCitizenshipFlandersWalloniaPost,
  swedenMedborgarskapsprovPost,
  norwayStatsborgerprovenPost,
  denmarkIndfoedsretsproevenPost,
  portugalNationalityTestPost,
  servsafePracticeTestsCountPost,
  cfaVsFrmPost,
  leedGaFreeResourcesPost,
  ankiDeckShelfLifePost,
  finraOptionsQuestionsPost,
  cdcpVsDcdcPost,
  memorizeEpa608RefrigerantsPost,
  ankiVsQuizletExamPrepPost,
  neboshIgcVsDiplomaPost,
  mricsApcVsAssocricsPost,
  wellApVsFitwelPost,
  lebenInDeutschlandEnglishPrepPost,
  cdlHazmatStateFingerprintingPost,
  swissCitizenshipCantonalFormatPost,
  floridaFoodManagerDbprRulesPost,
  californiaRealEstateDreCentersPost,
  servsafeFloridaRequirementsPost,
  californiaRealEstatePsiVsPearsonPost,
  epa608Type1VsType2Post,
  epa608PracticeTestPost,
  servsafeManagerStudyGuidePost,
  finraSieExamPrepPost,
];

/** Newest first — used by /blog index, sitemap, and llms.txt. */
export const blogPosts: BlogPost[] = blogPostDrafts.map(withBlogStockImages);

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

export function getRelatedBlogPosts(post: BlogPost): BlogPost[] {
  return post.relatedSlugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((related): related is BlogPost => related !== undefined);
}

export function getBlogPostsByCluster(clusterId: string): BlogPost[] {
  return blogPosts.filter((post) => post.clusterId === clusterId);
}

export function getBlogPostsForMockSlug(mockSlug: string): BlogPost[] {
  return blogPosts.filter((post) => post.mockSlug === mockSlug);
}

export function getBlogPostsForDeckSlug(deckSlug: string): BlogPost[] {
  return blogPosts.filter((post) => post.deckSlug === deckSlug);
}
