import { Plus } from "lucide-react";

import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { ProfileSection } from "@/components/talent/profile-section";
import type { GalleryPhoto } from "@/lib/types/talent";

export interface ProfileGalleryProps {
  photos: GalleryPhoto[];
}

/**
 * Galería del perfil — grid 4-col (2-col en mobile). Cada slot usa PhotoPlaceholder
 * con seed determinístico. Aspect ratios alternan 3/4 con 1/1 en posiciones 0 y 3
 * para crear ritmo visual (replica el patrón del diseño fuente).
 */
export function ProfileGallery({ photos }: ProfileGalleryProps) {
  return (
    <ProfileSection
      title="Galería"
      kicker={`Portafolio · ${photos.length} foto${photos.length === 1 ? "" : "s"}`}
      action={
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg
                     px-3.5 py-2 text-[13px] font-medium text-ink transition-colors
                     hover:bg-beige-soft focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-ink"
        >
          <Plus size={13} strokeWidth={1.5} aria-hidden />
          Añadir fotos
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {photos.map((p, i) => {
          const ratio = i === 0 || i === 3 ? "aspect-square" : "aspect-[3/4]";
          return (
            <PhotoPlaceholder
              key={p.id}
              seed={p.id}
              className={`${ratio} w-full rounded-[10px]`}
            />
          );
        })}
      </div>
    </ProfileSection>
  );
}
