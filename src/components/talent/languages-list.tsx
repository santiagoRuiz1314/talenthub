import { ProfileSection } from "@/components/talent/profile-section";
import { LANGUAGE_CODE_LABELS, LANGUAGE_LEVEL_LABELS } from "@/lib/constants";
import type { Language } from "@/lib/types/shared";

export interface LanguagesListProps {
  languages: Language[];
}

/**
 * Pills "Idioma · Nivel" mostrando todos los idiomas que habla el talento.
 * Usa los labels del proyecto (`LANGUAGE_CODE_LABELS`, `LANGUAGE_LEVEL_LABELS`).
 */
export function LanguagesList({ languages }: LanguagesListProps) {
  if (languages.length === 0) return null;
  return (
    <ProfileSection title="Idiomas" kicker="Comunicación">
      <div className="flex flex-wrap gap-2">
        {languages.map((l) => (
          <div
            key={l.code}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg
                       px-3.5 py-2"
          >
            <span className="text-[13.5px] font-medium text-ink">
              {LANGUAGE_CODE_LABELS[l.code]}
            </span>
            <span className="rounded-full bg-beige-soft px-2 py-0.5 text-[11px] text-ink-muted">
              {LANGUAGE_LEVEL_LABELS[l.level]}
            </span>
          </div>
        ))}
      </div>
    </ProfileSection>
  );
}
