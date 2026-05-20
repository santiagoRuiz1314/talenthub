import { MapPin } from "lucide-react";

import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import {
  ProfileStats,
  type ProfileStatItem,
} from "@/components/talent/profile-stats";
import { Badge } from "@/components/ui/badge";
import { CASTING_CATEGORY_LABELS, CITY_LABELS } from "@/lib/constants";
import type { Talent } from "@/lib/types/talent";
import { cn, computeAge } from "@/lib/utils";

export interface ProfileHeroProps {
  talent: Talent;
  /** Stats a mostrar en la grid inferior. */
  stats: ProfileStatItem[];
  /** Si el talento marcó disponibilidad activa. Default true. */
  available?: boolean;
}

/**
 * Hero del perfil: foto principal + bloque info (eyebrow disponibilidad + nombre
 * + meta edad/ciudad/experiencia + tags categorías) + stats inline.
 * Layout grid 380px/1fr en >=lg, stack en <lg.
 */
export function ProfileHero({ talent, stats, available = true }: ProfileHeroProps) {
  const age = computeAge(talent.birthDate);
  const yearsOfExperience = Math.max(
    1,
    new Date().getFullYear() - Math.min(...talent.experience.map((e) => e.year)),
  );
  const photosCount = talent.gallery.length;
  const categories = talent.categoriesOfInterest ?? [];

  return (
    <section className="grid items-stretch gap-6 py-10 lg:grid-cols-[380px_1fr] lg:gap-10">
      <div className="relative">
        <PhotoPlaceholder
          seed={`profile-hero-${talent.id}`}
          className="aspect-[3/4] w-full rounded-[16px]"
        />
        <div
          className="absolute bottom-4 right-4 inline-flex items-center gap-1.5
                     rounded-full bg-white/95 px-3 py-1 text-[11.5px] font-medium text-ink
                     backdrop-blur"
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-coral" />
          <span className="tabular-nums">{photosCount}</span> foto
          {photosCount === 1 ? "" : "s"}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 pt-3">
        <div>
          {available && (
            <div
              className="mb-3 inline-flex items-center gap-2 text-[11.5px] font-medium uppercase
                         tracking-[0.08em] text-ink-muted"
            >
              <span
                aria-hidden
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-coral",
                  "ring-4 ring-coral/20",
                )}
              />
              Disponible para castings
            </div>
          )}
          <h1
            className="font-display m-0 mb-4 text-[clamp(36px,4.4vw,52px)] font-medium
                       leading-[1.05] tracking-[-0.03em] text-ink"
          >
            {talent.firstName} {talent.lastName}
          </h1>
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] text-ink">
            <span>{age} años</span>
            <span aria-hidden className="text-ink-muted">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} strokeWidth={1.4} aria-hidden />
              {CITY_LABELS[talent.city]}
            </span>
            {talent.experience.length > 0 && (
              <>
                <span aria-hidden className="text-ink-muted">
                  ·
                </span>
                <span>
                  {yearsOfExperience} año{yearsOfExperience === 1 ? "" : "s"} de
                  experiencia
                </span>
              </>
            )}
          </div>
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <Badge
                  key={c}
                  variant="outline"
                  className="rounded-full border-border bg-bg px-2.5 py-1.5 text-[12.5px]
                             font-medium text-ink"
                >
                  {CASTING_CATEGORY_LABELS[c]}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <ProfileStats items={stats} />
      </div>
    </section>
  );
}
