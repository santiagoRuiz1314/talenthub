import { Suspense } from "react";

import { CastingCardSkeleton } from "@/components/casting/casting-card-skeleton";
import { CastingGrid } from "@/components/casting/casting-grid";
import { FilterBar } from "@/components/casting/filter-bar";
import { RecommendedRow } from "@/components/casting/recommended-row";
import { CASTING_CATEGORY_LABELS, CITY_LABELS } from "@/lib/constants";
import {
  getCastingsWithAgency,
  getRecommendedCastingsWithAgency,
} from "@/lib/data/castings";
import type { CastingCategory, City } from "@/lib/types";

type SearchParams = { [key: string]: string | string[] | undefined };

const RECOMMENDED_FOR_TALENT_ID = "t_001";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const rawCategory = typeof params.category === "string" ? params.category : undefined;
  const rawCity = typeof params.city === "string" ? params.city : undefined;

  const category: CastingCategory | undefined =
    rawCategory && Object.keys(CASTING_CATEGORY_LABELS).includes(rawCategory)
      ? (rawCategory as CastingCategory)
      : undefined;
  const city: City | undefined =
    rawCity && Object.keys(CITY_LABELS).includes(rawCity)
      ? (rawCity as City)
      : undefined;

  // Suspense key fuerza re-suspensión cuando cambian los filtros — dispara el skeleton.
  const gridKey = `${category ?? "all"}-${city ?? "all"}`;

  return (
    <>
      <Suspense fallback={<FilterBarFallback />}>
        <FilterBar />
      </Suspense>

      <Suspense fallback={<RecommendedRowFallback />}>
        <RecommendedSection talentId={RECOMMENDED_FOR_TALENT_ID} />
      </Suspense>

      <section className="mx-auto w-full max-w-[1280px] px-5 py-9 sm:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-ink-muted mb-1 text-[11.5px] font-medium tracking-[0.08em] uppercase">
              Catálogo
            </div>
            <h2 className="font-display text-ink text-[26px] leading-tight font-medium tracking-[-0.025em]">
              Todos los castings
            </h2>
          </div>
        </div>
        <Suspense key={gridKey} fallback={<GridFallback />}>
          <CastingGridAsync category={category} city={city} />
        </Suspense>
      </section>
    </>
  );
}

async function RecommendedSection({ talentId }: { talentId: string }) {
  const castings = await getRecommendedCastingsWithAgency(talentId);
  if (castings.length === 0) return null;
  return <RecommendedRow castings={castings} />;
}

async function CastingGridAsync({
  category,
  city,
}: {
  category?: CastingCategory;
  city?: City;
}) {
  const castings = await getCastingsWithAgency({
    category,
    city,
    status: "active",
  });
  return <CastingGrid castings={castings} />;
}

function FilterBarFallback() {
  return (
    <section
      aria-hidden
      className="border-border sticky top-16 z-20 border-b backdrop-blur-[10px] backdrop-saturate-[180%]"
      style={{ background: "rgba(250, 250, 247, 0.92)" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 py-3.5 sm:px-8">
        <div className="flex items-center gap-1.5">
          <div className="border-border text-ink-muted inline-flex items-center rounded-full border px-3 py-1.5 text-[12.5px] font-medium">
            Tipo
          </div>
          <div className="border-border text-ink-muted inline-flex items-center rounded-full border px-3 py-1.5 text-[12.5px] font-medium">
            Ciudad
          </div>
        </div>
      </div>
    </section>
  );
}

function GridFallback() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <CastingCardSkeleton key={i} />
      ))}
    </div>
  );
}

function RecommendedRowFallback() {
  return (
    <section className="border-border border-b py-9">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <div
          aria-hidden
          className="animate-th-shimmer mb-7 h-12 w-2/3 rounded bg-[linear-gradient(90deg,var(--beige-soft)_0%,var(--bg)_50%,var(--beige-soft)_100%)] bg-[length:200%_100%]"
        />
        <div className="-mx-5 flex gap-4 overflow-hidden px-5 pb-2 sm:-mx-8 sm:px-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-[360px] shrink-0">
              <CastingCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
