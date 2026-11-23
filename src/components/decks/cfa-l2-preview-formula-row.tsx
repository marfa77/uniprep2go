import { MathContent } from "@/components/mock-exams/math-content";
import type { CfaL2PreviewFormula } from "@/lib/cfa-level-2-formula-preview";

function wrapDisplayLatex(latex: string) {
  const trimmed = latex.trim();
  if (trimmed.startsWith("\\begin")) {
    return `\\[${trimmed}\\]`;
  }
  return `\\(${trimmed}\\)`;
}

export function CfaL2PreviewFormulaRow({ row }: { row: CfaL2PreviewFormula }) {
  return (
    <tr className="border-b border-[#18140f]/10 align-top">
      <td className="px-3 py-3 font-medium text-[#18140f]">{row.name}</td>
      <td className="px-3 py-3 text-[#4f493e]">
        <MathContent
          className="block text-[#18140f]"
          text={wrapDisplayLatex(row.latex)}
        />
        {row.vars ? <p className="mt-2 text-xs leading-6 text-[#5f5749]">{row.vars}</p> : null}
        <p className="mt-2 text-xs leading-6 text-[#4f493e]">
          <span className="font-medium text-[#18140f]">When to use:</span> {row.use}
        </p>
      </td>
    </tr>
  );
}