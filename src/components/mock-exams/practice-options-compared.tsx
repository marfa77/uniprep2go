import Link from "next/link";
import type { PracticeOptionsCompared } from "@/lib/mock-exams/practice-options-compared";

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function PracticeOptionsComparedSection({
  table,
}: {
  table: PracticeOptionsCompared;
}) {
  return (
    <section className="mt-10" id="practice-options-compared" data-llm="practice-options-compared">
      <h2 className="text-2xl font-semibold tracking-tight">{table.heading}</h2>
      <p className="mt-2 text-sm leading-7 text-[#5f5749]">{table.lead}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8a8274]">
        Checked {table.checkedDate} · public sources only
      </p>

      <div className="mt-5 overflow-x-auto rounded-xl border border-[#18140f]/12">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#f7f3ea] text-[#1f3a5f]">
            <tr>
              <th className="px-3 py-2.5 font-semibold">Option</th>
              <th className="px-3 py-2.5 font-semibold">Format</th>
              <th className="px-3 py-2.5 font-semibold">Access</th>
              <th className="px-3 py-2.5 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.name} className="border-t border-[#18140f]/10 align-top">
                <td className="px-3 py-3 font-medium text-[#18140f]">
                  {isExternal(row.href) ? (
                    <a
                      className="underline-offset-4 hover:underline"
                      href={row.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {row.name}
                    </a>
                  ) : (
                    <Link className="underline-offset-4 hover:underline" href={row.href}>
                      {row.name}
                    </Link>
                  )}
                </td>
                <td className="px-3 py-3 text-[#4f493e]">{row.format}</td>
                <td className="px-3 py-3 text-[#4f493e]">{row.access}</td>
                <td className="px-3 py-3 text-[#4f493e]">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-4 space-y-1 text-xs leading-6 text-[#5f5749]">
        {table.sources.map((s) => (
          <li key={s.url}>
            Source:{" "}
            <a
              className="underline-offset-2 hover:underline"
              href={s.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
