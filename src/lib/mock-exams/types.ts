export type MockAccessMode = "free_demand_test" | "gumroad_license" | "coming_soon";

export type MockExamStatus = "live" | "preview" | "coming_soon";

export type MockVerdict = "PASS" | "NO PASS" | "BORDERLINE RISK" | "READINESS PASS";

export type MockQuestionDifficulty = "easy" | "medium" | "hard";

export type MockTopic = {
  id: string;
  label: string;
  questionCount?: number;
  weightPercent?: number;
  targetPercent: number;
};

export type MockPassRule = {
  type: "score_threshold" | "readiness_check";
  passPercent: number;
  borderlinePercent?: number;
  verdictLabels: {
    pass: MockVerdict;
    noPass: MockVerdict;
    borderline?: MockVerdict;
  };
};

export type MockExamConfig = {
  slug: string;
  title: string;
  shortTitle: string;
  linkedDeckSlug: string;
  status: MockExamStatus;
  accessMode: MockAccessMode;
  durationMinutes: number;
  questionCount: number;
  passRule: MockPassRule;
  topics: MockTopic[];
  officialSourceNote: string;
  disclaimer: string;
  description: string;
  examBody: string;
  lastUpdated: string;
  /** Future Gumroad product id — not used in demand-test mode */
  gumroadProductId?: string;
};

export type MockQuestionOption = {
  id: string;
  text: string;
};

export type MockQuestion = {
  id: string;
  examSlug: string;
  topicId: string;
  prompt: string;
  formula?: string;
  options: MockQuestionOption[];
  correctOptionId: string;
  explanation: string;
  distractorExplanations: Record<string, string>;
  difficulty: MockQuestionDifficulty;
  sourceNote: string;
};

export type MockAnswerMap = Record<string, string>;

export type MockAttemptInput = {
  examSlug: string;
  attemptSeed: string;
  answers: MockAnswerMap;
  elapsedSeconds: number;
  startedAt: string;
  completedAt: string;
};

export type MockTopicResult = {
  topicId: string;
  label: string;
  weightPercent: number;
  targetPercent: number;
  correct: number;
  total: number;
  scorePercent: number;
  status: "strong" | "on_track" | "weak" | "critical";
  missedQuestionIds: string[];
};

export type MockQuestionReview = {
  questionId: string;
  topicId: string;
  topicLabel: string;
  prompt: string;
  formula?: string;
  options: MockQuestionOption[];
  correctOptionId: string;
  userOptionId: string | null;
  isCorrect: boolean;
  explanation: string;
  distractorExplanation: string | null;
};

export type MockPacingAnalysis = {
  durationMinutes: number;
  elapsedSeconds: number;
  averageSecondsPerQuestion: number;
  recommendedSecondsPerQuestion: number;
  pacingStatus: "ahead" | "on_pace" | "behind" | "very_slow";
  pacingNote: string;
};

export type MockRepairPlanItem = {
  topicId: string;
  topicLabel: string;
  scorePercent: number;
  targetPercent: number;
  action: string;
};

export type MockReport = {
  examSlug: string;
  examTitle: string;
  verdict: MockVerdict;
  verdictExplanation: string;
  scorePercent: number;
  correctCount: number;
  totalCount: number;
  passThresholdPercent: number;
  topicResults: MockTopicResult[];
  questionReview: MockQuestionReview[];
  pacing: MockPacingAnalysis;
  repairPlan: MockRepairPlanItem[];
  disclaimer: string;
  linkedDeckSlug: string;
  linkedDeckUrl: string;
};

export type MockAccessState = {
  mockSlug: string;
  accessMode: MockAccessMode;
  fullReportUnlocked: boolean;
  interestCaptureEnabled: boolean;
  ctaLabel: string;
  ctaDescription: string;
};
