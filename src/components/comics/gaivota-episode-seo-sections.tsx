import { getGaivotaEpisodeSeo } from "@/lib/gaivota-episode-seo";

export function GaivotaEpisodeSeoSections({ episodeId }: { episodeId: string }) {
  const seo = getGaivotaEpisodeSeo(episodeId);
  if (!seo) return null;

  return (
    <div className="mt-10 space-y-8 border-t border-[#0e0e0e]/15 pt-8">
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">History brief</h2>
        <p className="mt-4 text-base leading-8 text-[#3a342c]">{seo.historyBrief}</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">How to use this episode</h2>
        <p className="mt-4 text-base leading-8 text-[#3a342c]">{seo.howToUse}</p>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <dl className="mt-6 space-y-5">
          {seo.faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold tracking-tight">{faq.question}</dt>
              <dd className="mt-2 text-base leading-8 text-[#3a342c]">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
