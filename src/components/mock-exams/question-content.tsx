"use client";

import { useMemo } from "react";
import {
  normalizeDisplayMath,
  parseQuestionContentBlocks,
  type QuestionTextBlock,
} from "@/lib/mock-exams/question-content";
import { MathContent } from "./math-content";

type QuestionContentProps = {
  text: string;
  className?: string;
};

function TableBlock({ block }: { block: Extract<QuestionTextBlock, { type: "table" }> }) {
  return (
    <div className="my-4 overflow-x-auto rounded-2xl border border-[#18140f]/10">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-[#f7f3ea]">
          <tr>
            {block.headers.map((header, index) => (
              <th
                key={`${header}-${index}`}
                className={`border-b border-[#18140f]/10 px-4 py-3 font-semibold text-[#18140f] ${
                  block.alignments[index] === "right"
                    ? "text-right"
                    : block.alignments[index] === "center"
                      ? "text-center"
                      : "text-left"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-[#fffaf0] even:bg-[#f7f3ea]/40">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  className={`border-b border-[#18140f]/5 px-4 py-3 text-[#18140f] ${
                    block.alignments[cellIndex] === "right"
                      ? "text-right"
                      : block.alignments[cellIndex] === "center"
                        ? "text-center"
                        : "text-left"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function QuestionContent({ text, className }: QuestionContentProps) {
  const blocks = useMemo(() => parseQuestionContentBlocks(text), [text]);

  if (blocks.length === 1 && blocks[0]?.type === "text") {
    return <MathContent text={normalizeDisplayMath(blocks[0].content)} className={className} />;
  }

  return (
    <div className={className}>
      {blocks.map((block, index) =>
        block.type === "table" ? (
          <TableBlock key={`table-${index}`} block={block} />
        ) : (
          <MathContent
            key={`text-${index}`}
            text={normalizeDisplayMath(block.content)}
            className="block whitespace-pre-line"
          />
        ),
      )}
    </div>
  );
}
