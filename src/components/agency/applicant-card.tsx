import Link from "next/link";
import { ArrowRight, ImagePlus, Sparkles, Star } from "lucide-react";

import { ApplicantStatusBadge } from "@/components/agency/applicant-status-badge";
import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { CITY_LABELS } from "@/lib/constants";
import type { ApplicationWithTalent } from "@/lib/types/application";
import { cn, computeAge } from "@/lib/utils";

export interface ApplicantCardProps {
  application: ApplicationWithTalent;
  /** Match score 0-100 si la IA lo calculó (Fase 4). Decorativo en Fase 2. */
  matchScore?: number;
}

/**
 * Card de aplicante en la grid de la agencia (pantalla 10).
 * Foto principal 4/5 + status badge overlay top-left + match score overlay
 * top-right (si > 0) + photos count overlay bottom-right + bloque info abajo
 * con nombre, datos físicos, tags y dos acciones (Ver portafolio + Pre-seleccionar).
 *
 * El botón Pre-seleccionar no muta estado en Fase 2 — es decorativo.
 */
export function ApplicantCard({ application, matchScore }: ApplicantCardProps) {
  const { talent } = application;
  const age = computeAge(talent.birthDate);
  const photosCount = talent.gallery.length;
  const isPreselected = application.status === "pre_selected";

  const tags = (talent.categoriesOfInterest ?? []).slice(0, 3);

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-[16px] border border-border bg-bg
                 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink"
    >
      <div className="relative">
        <PhotoPlaceholder
          seed={`applicant-${talent.id}`}
          className="aspect-[4/5] w-full rounded-none"
        />
        <div className="absolute left-3 top-3">
          <ApplicantStatusBadge status={application.status} />
        </div>
        {matchScore !== undefined && matchScore > 0 && (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink/85 px-2 py-1 text-[11px] font-semibold tracking-[-0.005em] text-white backdrop-blur">
            <Sparkles size={9} strokeWidth={1.4} aria-hidden />
            <span className="tabular-nums">{matchScore}</span>% match
          </div>
        )}
        {photosCount > 1 && (
          <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-ink/70 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
            <ImagePlus size={11} strokeWidth={1.4} aria-hidden />
            <span className="tabular-nums">{photosCount}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3.5">
        <div>
          <h3 className="font-display m-0 mb-1 text-[17px] font-medium leading-[1.2] tracking-[-0.02em] text-ink">
            {talent.firstName} {talent.lastName}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-ink-muted">
            <span>{age} años</span>
            <span aria-hidden className="h-[2px] w-[2px] rounded-full bg-ink-muted opacity-50" />
            <span>{CITY_LABELS[talent.city]}</span>
            {talent.physicalData.heightCm && (
              <>
                <span aria-hidden className="h-[2px] w-[2px] rounded-full bg-ink-muted opacity-50" />
                <span className="tabular-nums">
                  {(talent.physicalData.heightCm / 100).toFixed(2)} m
                </span>
              </>
            )}
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-beige-soft px-2 py-0.5 text-[11px] font-medium text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-1.5 pt-1">
          <Link
            href={`/agency/applicants/${talent.id}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-[9px] bg-ink px-3 py-2 text-[12.5px] font-medium text-bg
                       transition-colors hover:bg-ink/90 focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Ver portafolio
            <ArrowRight size={11} strokeWidth={1.5} aria-hidden />
          </Link>
          <button
            type="button"
            aria-label={isPreselected ? "Quitar pre-selección" : "Pre-seleccionar"}
            aria-pressed={isPreselected}
            className={cn(
              "inline-flex h-auto w-[38px] shrink-0 items-center justify-center rounded-[9px] border transition-colors",
              isPreselected
                ? "border-transparent bg-coral-soft text-coral-deep"
                : "border-border bg-bg text-ink hover:bg-beige-soft",
            )}
          >
            <Star
              size={14}
              strokeWidth={1.5}
              fill={isPreselected ? "currentColor" : "none"}
              aria-hidden
            />
          </button>
        </div>
      </div>
    </article>
  );
}
