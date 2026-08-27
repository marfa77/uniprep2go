"use client";

import dynamic from "next/dynamic";
import { MockExamClientSkeleton } from "@/components/mock-exams/mock-exam-client-skeleton";
import type { MockExamClientProps } from "@/components/mock-exams/mock-exam-client";

const MockExamClient = dynamic(
  () =>
    import("@/components/mock-exams/mock-exam-client").then((mod) => mod.MockExamClient),
  {
    loading: () => <MockExamClientSkeleton />,
    ssr: false,
  },
);

export function MockExamClientLoader(props: MockExamClientProps) {
  return <MockExamClient {...props} />;
}
