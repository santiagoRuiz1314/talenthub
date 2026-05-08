import { Sparkle } from "@/components/icons/sparkle";
import type { CastingWithAgency } from "@/lib/types";

import { RecommendedCard } from "./recommended-card";

type Props = {
  castings: CastingWithAgency[];
};

export function RecommendedRow({ castings }: Props) {
  if (castings.length === 0) return null;
  const items = castings.slice(0, 6);
  return (
    <section className="border-border border-b py-9">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <div className="mb-7 flex items-start justify-between gap-4">
          <h1 className="font-display text-ink flex flex-wrap items-center gap-3 text-[clamp(36px,5.4vw,64px)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">
            <span>
              Recomendados para ti<span className="text-coral">.</span>
            </span>
            <span aria-hidden className="text-coral animate-th-pulse-soft inline-flex shrink-0">
              <Sparkle size={28} strokeWidth={1.5} />
            </span>
          </h1>
        </div>
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden">
          {items.map((casting) => (
            <div key={casting.id} className="w-[360px] max-w-[88vw] shrink-0 snap-start">
              <RecommendedCard casting={casting} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
