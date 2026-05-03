import { StateCard } from "@/components/shared/state-card";
import type { CastingWithAgency } from "@/lib/types";

import { CastingCard } from "./casting-card";

type Props = {
  castings: CastingWithAgency[];
};

export function CastingGrid({ castings }: Props) {
  if (castings.length === 0) {
    return (
      <StateCard
        variant="empty"
        title="Sin castings que coincidan"
        body="Probá ajustar los filtros o explorá todas las ciudades para ver más oportunidades."
      />
    );
  }
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {castings.map((casting) => (
        <CastingCard key={casting.id} casting={casting} />
      ))}
    </div>
  );
}
