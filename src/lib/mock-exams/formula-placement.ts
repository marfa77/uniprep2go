type FormulaQuestion = {
  prompt: string;
  formula?: string | null;
};

function isStudyReferenceFormula(formulaRaw: string): boolean {
  const compact = formulaRaw.toLowerCase().replace(/\s+/g, "");
  const markers = [
    String.raw`\text{finalprice}`,
    String.raw`\text{average}`,
    String.raw`\text{%`,
    String.raw`\text{circumference}`,
    String.raw`\text{area}`,
    String.raw`\text{base}`,
    String.raw`\text{height}`,
    String.raw`\text{northmarket`,
    String.raw`\text{southmarket`,
    String.raw`p(a\text{and}b)`,
    String.raw`i=p\timesr\timest`,
    String.raw`\frac{1}{t}=\frac{1}{t_1}`,
    String.raw`p(x=k)=\binom`,
    String.raw`%\text{increase}`,
    String.raw`\text{sumofvalues}`,
    String.raw`\text{numberofvalues}`,
  ];

  return markers.some((marker) => compact.includes(marker));
}

function formulaRedundantWithPrompt(prompt: string, formulaRaw: string): boolean {
  if (prompt.includes("f(1) = 3") && formulaRaw.includes("f(1) = 3")) {
    return true;
  }
  return false;
}

export function formulaBelongsOnFront(question: FormulaQuestion): boolean {
  const formulaRaw = (question.formula ?? "").trim();
  if (!formulaRaw) {
    return false;
  }

  const prompt = question.prompt.trim();

  if (formulaRaw.startsWith("|") || formulaRaw.includes("\\begin{array}")) {
    return true;
  }

  if (formulaRaw.includes("\\text{(1)") || formulaRaw.includes("\\text{(2)")) {
    return true;
  }

  if (isStudyReferenceFormula(formulaRaw)) {
    return false;
  }

  if (formulaRedundantWithPrompt(prompt, formulaRaw)) {
    return false;
  }

  return prompt.length <= 120;
}
