"use client";

import { FormulaContent, isFormulaTable } from "@/lib/mock-exams/formula-content";
import { MathContent } from "./math-content";

type FormulaBlockProps = {
  text: string;
  className?: string;
};

export function FormulaBlock({ text, className }: FormulaBlockProps) {
  if (isFormulaTable(text)) {
    return <FormulaContent text={text} className={className} />;
  }
  return <MathContent text={text} className={className} />;
}
