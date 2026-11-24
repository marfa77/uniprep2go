import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "./index";

const body = (slug: string) => {
  const p = getBlogPostBySlug(slug)!;
  return JSON.stringify([p.intro, p.cta, p.sections, p.faqs, p.bottomLine]);
};

describe("WP-B 5 — ServSafe / Florida cluster", () => {
  it("ServSafe Florida requirements: § 509.039 and ServSafe FAQ facts, Florida-labelled; 2027 titles", () => {
    const p = getBlogPostBySlug("servsafe-manager-florida-requirements-2026")!;
    expect(p.titleTag).toBe("ServSafe Manager Florida Requirements 2027: Class or Exam?");
    const b = body(p.slug);
    expect(b).toContain("509.039");
    expect(b).toContain("Florida only");
    expect(b).not.toMatch(/60 days after hire|3 years|Learn2Serve|75% readiness/);
  });

  it("Florida DBPR rules post reads the statute; no unsourced prices or 4-employee claim", () => {
    const b = body("florida-food-manager-certification-dbpr-rules");
    expect(b).toContain("30 days after employment");
    expect(b).toContain("61C-4.023");
    expect(b).not.toMatch(/\$129|\$69|\$79|\$179|about thirteen|four or more employees/);
  });

  it("practice-tests post invents no recommended number of mocks or pass rates", () => {
    const b = body("how-many-practice-tests-before-servsafe-manager-exam");
    expect(b).toContain("56 of the 80");
    expect(b).not.toMatch(/2 to 3|2–3|85%|65%|One in three/i);
  });

  it("study guide: FDA Food Code values corrected, retake rule from ServSafe FAQ; 2027 titles", () => {
    const p = getBlogPostBySlug("servsafe-manager-exam-study-guide-2026")!;
    expect(p.titleTag).toBe("ServSafe Manager Exam Study Guide 2027: Pass on First Try");
    const b = body(p.slug);
    expect(b).toContain("155°F for 17 seconds");
    expect(b).not.toMatch(/wait 24 hours|2020 Examinee Handbook|120 minutes/);
  });
});
