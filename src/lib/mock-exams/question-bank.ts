import sieFullMockBank from "@/data/mock-exams/sie-full-mock.json";
import cfaPreviewBank from "@/data/mock-exams/cfa-level-1-preview.json";
import frmPreviewBank from "@/data/mock-exams/frm-part-1-preview.json";
import series7PreviewBank from "@/data/mock-exams/series-7-preview.json";
import series63PreviewBank from "@/data/mock-exams/series-63-preview.json";
import californiaRealEstatePreviewBank from "@/data/mock-exams/california-real-estate-preview.json";
import lifeHealthPreviewBank from "@/data/mock-exams/life-and-health-insurance-preview.json";
import propertyCasualtyPreviewBank from "@/data/mock-exams/property-casualty-insurance-preview.json";
import servSafeManagerMockBank from "@/data/mock-exams/servsafe-manager-mock.json";
import ptcbPharmacyTechnicianMockBank from "@/data/mock-exams/ptcb-pharmacy-technician-mock.json";
import gmatFocusReadinessBank from "@/data/mock-exams/gmat-focus-readiness-check.json";
import satReadinessBank from "@/data/mock-exams/sat-readiness-check.json";
import epa608ReadinessBank from "@/data/mock-exams/epa-608-readiness-check.json";
import bmsBasReadinessBank from "@/data/mock-exams/bms-bas-readiness-check.json";
import leedGreenAssociateReadinessBank from "@/data/mock-exams/leed-green-associate-readiness-check.json";
import leedApBdCReadinessBank from "@/data/mock-exams/leed-ap-bd-c-readiness-check.json";
import wellApReadinessBank from "@/data/mock-exams/well-ap-readiness-check.json";
import cemReadinessBank from "@/data/mock-exams/cem-readiness-check.json";
import ashraeCertificationsReadinessBank from "@/data/mock-exams/ashrae-certifications-readiness-check.json";
import cdcpReadinessBank from "@/data/mock-exams/cdcp-readiness-check.json";
import neboshReadinessBank from "@/data/mock-exams/nebosh-readiness-check.json";
import cfpsReadinessBank from "@/data/mock-exams/cfps-readiness-check.json";
import mricsReadinessBank from "@/data/mock-exams/mrics-readiness-check.json";
import mricsQuantitySurveyingReadinessBank from "@/data/mock-exams/mrics-quantity-surveying-readiness-check.json";
import cfaLevel2ReadinessBank from "@/data/mock-exams/cfa-level-2-readiness-check.json";
import usCitizenshipReadinessBank from "@/data/mock-exams/us-citizenship-readiness-check.json";
import { getMockExamConfig } from "./configs";
import type { MockQuestion } from "./types";

const banksBySlug: Record<string, MockQuestion[]> = {
  "sie-full-mock": sieFullMockBank as unknown as MockQuestion[],
  "cfa-level-1-readiness-check": cfaPreviewBank as unknown as MockQuestion[],
  "frm-part-1-readiness-check": frmPreviewBank as unknown as MockQuestion[],
  "series-7-readiness-check": series7PreviewBank as unknown as MockQuestion[],
  "series-63-readiness-check": series63PreviewBank as unknown as MockQuestion[],
  "california-real-estate-readiness-check": californiaRealEstatePreviewBank as unknown as MockQuestion[],
  "life-and-health-insurance-readiness-check": lifeHealthPreviewBank as unknown as MockQuestion[],
  "property-casualty-insurance-readiness-check": propertyCasualtyPreviewBank as unknown as MockQuestion[],
  "servsafe-manager-mock": servSafeManagerMockBank as unknown as MockQuestion[],
  "ptcb-pharmacy-technician-mock": ptcbPharmacyTechnicianMockBank as unknown as MockQuestion[],
  "gmat-focus-readiness-check": gmatFocusReadinessBank as unknown as MockQuestion[],
  "sat-readiness-check": satReadinessBank as unknown as MockQuestion[],
  "epa-608-readiness-check": epa608ReadinessBank as unknown as MockQuestion[],
  "bms-bas-readiness-check": bmsBasReadinessBank as unknown as MockQuestion[],
  "leed-green-associate-readiness-check": leedGreenAssociateReadinessBank as unknown as MockQuestion[],
  "leed-ap-bd-c-readiness-check": leedApBdCReadinessBank as unknown as MockQuestion[],
  "well-ap-readiness-check": wellApReadinessBank as unknown as MockQuestion[],
  "cem-readiness-check": cemReadinessBank as unknown as MockQuestion[],
  "ashrae-certifications-readiness-check": ashraeCertificationsReadinessBank as unknown as MockQuestion[],
  "cdcp-readiness-check": cdcpReadinessBank as unknown as MockQuestion[],
  "nebosh-readiness-check": neboshReadinessBank as unknown as MockQuestion[],
  "cfps-readiness-check": cfpsReadinessBank as unknown as MockQuestion[],
  "mrics-readiness-check": mricsReadinessBank as unknown as MockQuestion[],
  "mrics-quantity-surveying-readiness-check": mricsQuantitySurveyingReadinessBank as unknown as MockQuestion[],
  "cfa-level-2-readiness-check": cfaLevel2ReadinessBank as unknown as MockQuestion[],
  "us-citizenship-readiness-check": usCitizenshipReadinessBank as unknown as MockQuestion[],
};

export function getQuestionBank(examSlug: string) {
  return banksBySlug[examSlug] ?? [];
}

export function getQuestionBankForExam(examSlug: string) {
  const config = getMockExamConfig(examSlug);
  const questions = getQuestionBank(examSlug);

  if (!config) {
    return { config: null, questions: [] as MockQuestion[], errors: ["Unknown mock exam slug"] };
  }

  return {
    config,
    questions,
    errors: validateQuestionBank(config.slug, config.questionCount, questions, config.topics),
  };
}

export function validateQuestionBank(
  examSlug: string,
  expectedCount: number,
  questions: MockQuestion[],
  topics: Array<{ id: string; questionCount?: number }>,
) {
  const errors: string[] = [];

  if (questions.length === 0) {
    errors.push(`No questions loaded for ${examSlug}`);
    return errors;
  }

  if (questions.length !== expectedCount && getMockExamConfig(examSlug)?.status === "live") {
    errors.push(`Expected ${expectedCount} questions, found ${questions.length}`);
  }

  for (const question of questions) {
    if (question.examSlug !== examSlug) {
      errors.push(`Question ${question.id} has mismatched examSlug`);
    }

    const optionIds = new Set(question.options.map((option) => option.id));

    if (!optionIds.has(question.correctOptionId)) {
      errors.push(`Question ${question.id} correctOptionId not in options`);
    }

    if (!question.explanation.trim()) {
      errors.push(`Question ${question.id} missing explanation`);
    }

    for (const option of question.options) {
      if (option.id !== question.correctOptionId && !question.distractorExplanations[option.id]) {
        errors.push(`Question ${question.id} missing distractor explanation for ${option.id}`);
      }
    }
  }

  const config = getMockExamConfig(examSlug);
  const isPreview = config?.status === "preview";

  for (const topic of topics) {
    if (typeof topic.questionCount !== "number") {
      continue;
    }

    const topicCount = questions.filter((question) => question.topicId === topic.id).length;

    if (isPreview) {
      if (topicCount < topic.questionCount) {
        errors.push(
          `Topic ${topic.id} expected at least ${topic.questionCount} questions, found ${topicCount}`,
        );
      }
      continue;
    }

    if (topicCount !== topic.questionCount) {
      errors.push(
        `Topic ${topic.id} expected ${topic.questionCount} questions, found ${topicCount}`,
      );
    }
  }

  return errors;
}

export function isMockExamRunnable(examSlug: string) {
  const { config, questions, errors } = getQuestionBankForExam(examSlug);

  if (!config || config.status === "coming_soon") {
    return false;
  }

  if (config.status === "live") {
    return questions.length === config.questionCount && errors.length === 0;
  }

  // Preview readiness checks can run when the bank meets the configured count.
  return questions.length >= config.questionCount && errors.length === 0;
}
