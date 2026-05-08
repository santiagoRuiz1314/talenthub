import Link from "next/link";
import { Calendar } from "lucide-react";

import { Sparkle } from "@/components/icons/sparkle";
import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { CITY_LABELS } from "@/lib/constants";
import type { CastingWithAgency } from "@/lib/types";
import { formatDeadline } from "@/lib/utils";

type Props = {
  casting: CastingWithAgency;
};

export function RecommendedCard({ casting }: Props) {
  const firstPhoto = casting.photos?.[0];
  return (
    <article className="border-border hover:border-ink hover:bg-beige-soft relative grid grid-cols-[110px_1fr] overflow-hidden rounded-xl border transition-[border-color,background-color] duration-150">
      <Link
        href={`/castings/${casting.id}`}
        aria-label={`Ver casting: ${casting.title}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">Ver casting {casting.title}</span>
      </Link>
      <div className="p-2">
        {firstPhoto ? (
          <img
            src={firstPhoto.url}
            alt={firstPhoto.alt ?? casting.title}
            className="aspect-square h-full w-full rounded-md object-cover"
          />
        ) : (
          <PhotoPlaceholder seed={casting.id} className="aspect-square h-full w-full rounded-md" />
        )}
      </div>
      <div className="flex min-w-0 flex-col justify-between gap-2 px-3 py-3 pl-1">
        <div className="min-w-0">
          <span className="bg-coral-soft text-coral-deep mb-2 inline-flex items-center gap-1 rounded-xs px-1.5 py-0.5 text-[10.5px] font-semibold tracking-[0.04em] uppercase">
            <Sparkle size={9} strokeWidth={1.5} /> Recomendado
          </span>
          <h3 className="font-display text-ink line-clamp-2 text-[17px] leading-[1.2] font-medium tracking-[-0.02em]">
            {casting.title}
          </h3>
          <div className="text-ink-muted mt-1.5 flex min-w-0 items-center gap-1.5 text-[12.5px]">
            <span className="truncate">{casting.agency.name}</span>
            <span aria-hidden className="bg-ink-muted h-[2px] w-[2px] shrink-0 rounded-full" />
            <span className="shrink-0">{CITY_LABELS[casting.city]}</span>
          </div>
        </div>
        <div className="text-ink-muted flex items-center gap-1.5 text-[12px]">
          <Calendar size={11} strokeWidth={1.5} />
          <span className="tabular-nums">Cierra {formatDeadline(casting.deadline)}</span>
        </div>
      </div>
    </article>
  );
}
