import Link from "next/link";
import { getBlogClusterMoneyLinks } from "@/lib/blog/cluster-money-links";

export function BlogClusterMoneyLinks({ slug }: { slug: string }) {
  const links = getBlogClusterMoneyLinks(slug);
  if (links.length === 0) return null;

  return (
    <aside
      className="mt-8 rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] px-5 py-4"
      aria-label="Related practice tests and decks"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1f3a5f]">
        Free mocks &amp; decks
      </p>
      <ul className="mt-3 space-y-2 text-sm font-medium text-[#1f3a5f]">
        {links.map((link) => (
          <li key={link.href}>
            <Link className="underline-offset-4 hover:underline" href={link.href}>
              {link.label} →
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}