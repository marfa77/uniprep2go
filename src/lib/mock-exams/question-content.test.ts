import { describe, expect, it } from "vitest";
import { parseMarkdownTable, parseQuestionContentBlocks } from "./question-content";

describe("question content parsing", () => {
  it("parses markdown tables embedded in prompts", () => {
    const prompt = `The table shows quarterly revenue (in $ thousands) for a company over one year.

| Quarter | Revenue |
|---|---:|
| Q1 | 400 |
| Q2 | 460 |

Did the company meet the target?`;

    const blocks = parseQuestionContentBlocks(prompt);
    expect(blocks).toHaveLength(3);
    expect(blocks[0]).toMatchObject({ type: "text" });
    expect(blocks[1]).toMatchObject({
      type: "table",
      headers: ["Quarter", "Revenue"],
      rows: [
        ["Q1", "400"],
        ["Q2", "460"],
      ],
    });
    expect(blocks[2]).toMatchObject({ type: "text" });
    expect(blocks[0]?.type === "text" && blocks[0].content).toContain("$ thousands");
  });

  it("detects right-aligned table columns", () => {
    const table = parseMarkdownTable([
      "| Quarter | Revenue |",
      "|---|---:|",
      "| Q1 | 400 |",
    ]);

    expect(table?.alignments).toEqual(["left", "right"]);
  });
});
