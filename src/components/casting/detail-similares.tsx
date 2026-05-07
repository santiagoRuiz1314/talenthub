import { CASTING_DETAIL_COPY } from "@/lib/constants";
import type { CastingWithAgency } from "@/lib/types";

import { CastingCard } from "./casting-card";
import { DetailSection } from "./detail-section";

type Props = {
  castings: CastingWithAgency[];
};

export function DetailSimilares({ castings }: Props) {
  if (castings.length === 0) return null;
  return (
    <DetailSection title={CASTING_DETAIL_COPY.similaresTitle} kicker={CASTING_DETAIL_COPY.similaresKicker}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {castings.map((casting) => (
          <CastingCard key={casting.id} casting={casting} />
        ))}
      </div>
    </DetailSection>
  );
}
