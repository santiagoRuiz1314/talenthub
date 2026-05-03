import Link from "next/link";
import { BadgeCheck, Bookmark, Calendar, MapPin } from "lucide-react";

import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { CITY_LABELS } from "@/lib/constants";
import type { CastingWithAgency } from "@/lib/types";

import { TypeTag } from "./type-tag";

const MONTHS_ES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

function formatDeadline(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()} ${MONTHS_ES[d.getMonth()]}`;
}

type Props = {
  casting: CastingWithAgency;
};

export function CastingCard({ casting }: Props) {
  const isVerified = casting.agency.verificationStatus === "verified";
  return (
    <article className="border-border bg-bg hover:border-ink relative flex flex-col overflow-hidden rounded-xl border transition-[border-color,transform] duration-150 hover:-translate-y-0.5">
      <Link
        href={`/castings/${casting.id}`}
        aria-label={`Ver casting: ${casting.title}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">Ver casting {casting.title}</span>
      </Link>

      <div className="relative p-2.5">
        <PhotoPlaceholder
          seed={casting.id}
          className="aspect-[4/5] w-full rounded-lg"
        />
        <div className="absolute top-[18px] left-[18px] z-20">
          <TypeTag category={casting.category} />
        </div>
        <button
          type="button"
          aria-label={`Guardar ${casting.title}`}
          className="text-ink absolute top-[18px] right-[18px] z-20 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white/90 backdrop-blur-md transition-colors hover:bg-white"
        >
          <Bookmark size={14} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-4 pt-2 pb-4">
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className="text-ink-muted truncate text-[11px] font-medium tracking-[0.07em] uppercase">
            {casting.agency.name}
          </span>
          <span className="text-ink-muted inline-flex shrink-0 items-center gap-1 text-[12.5px]">
            <MapPin size={12} strokeWidth={1.5} />
            {CITY_LABELS[casting.city]}
          </span>
        </div>
        <h3 className="font-display text-ink mb-2.5 text-[17px] leading-[1.25] font-medium tracking-[-0.02em]">
          {casting.title}
        </h3>
        <div className="border-border text-ink-muted mt-auto flex items-center justify-between gap-2 border-t pt-2.5 text-[12.5px]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={12} strokeWidth={1.5} />
            <span className="tabular-nums">
              Cierra {formatDeadline(casting.deadline)}
            </span>
          </span>
          {isVerified && (
            <span className="text-coral-deep inline-flex items-center gap-1 text-[11px] font-medium">
              <BadgeCheck size={12} strokeWidth={1.5} />
              Verificada
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
