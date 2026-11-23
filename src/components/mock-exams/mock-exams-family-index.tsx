import Link from "next/link";
import { EXAM_FAMILIES } from "@/lib/exam-families";
import { getMockExamConfig } from "@/lib/mock-exams/configs";
import { shouldIndexMockExam } from "@/lib/seo";

function indexableMockLinksForFamily(familyId: string) {
  const family = EXAM_FAMILIES.find((entry) => entry.id === familyId);
  if (!family) {
    return [];
  }
  const links: { href: string; label: string }[] = [];
  const seen = new Set<string>();
  for (const member of family.members) {
    if (!member.mock || seen.has(member.mock)) {
      continue;
    }
    if (!shouldIndexMockExam(member.mock)) {
      continue;
    }
    const config = getMockExamConfig(member.mock);
    if (!config) {
      continue;
    }
    seen.add(member.mock);
    links.push({
      href: `/mock-exams/${member.mock}`,
      label: member.anchor,
    });
  }
  return links;
}

export function MockExamsFamilyIndex() {
  const families = EXAM_FAMILIES.map((family) => ({
    ...family,
    mocks: indexableMockLinksForFamily(family.id),
  })).filter((family) => family.mocks.length > 0);

  return (
    <section className="mt-12" id="practice-tests-by-family">
      <h2 className="text-2xl font-semibold tracking-tight">All practice tests by exam family</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5f5749]">
        Every indexed mock appears at least once below. Paths follow common study order within each
        family.
      </p>
      <div className="mt-6 space-y-8">
        {families.map((family) => (
          <details
            className="group rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70"
            key={family.id}
            open={family.id === "finra" || family.id === "finance-credentials"}
          >
            <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-[#18140f] marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="text-lg">{family.label}</span>
              <span className="ml-2 text-sm font-normal text-[#5f5749]">({family.mocks.length} mocks)</span>
            </summary>
            <ul className="divide-y divide-[#18140f]/10 border-t border-[#18140f]/10 px-2 pb-2">
              {family.mocks.map((mock) => (
                <li key={mock.href}>
                  <Link
                    className="block py-3 pl-3 pr-2 text-sm font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
                    href={mock.href}
                  >
                    {mock.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="border-t border-[#18140f]/10 px-5 py-3 text-sm">
              <Link
                className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
                href={family.hubHref}
              >
                Browse {family.label} hub →
              </Link>
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}