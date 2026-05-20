import { ProfileSection } from "@/components/talent/profile-section";
import type { ExperienceItem } from "@/lib/types/talent";
import { cn } from "@/lib/utils";

export interface ExperienceListProps {
  items: ExperienceItem[];
}

/**
 * Timeline vertical con los trabajos previos del talento. Cada fila: año
 * grande (tabular-nums, ink-muted) | título + role | (opcional) badge brand.
 *
 * Los items se renderizan en el orden que vienen — el data layer ya los
 * ordena por año desc.
 */
export function ExperienceList({ items }: ExperienceListProps) {
  if (items.length === 0) return null;
  const sorted = [...items].sort((a, b) => b.year - a.year);
  return (
    <ProfileSection title="Experiencia" kicker="Trayectoria">
      <ul className="m-0 list-none p-0">
        {sorted.map((e, i) => (
          <li
            key={e.id}
            className={cn(
              "grid items-center gap-5 py-4 sm:grid-cols-[70px_1fr]",
              i < sorted.length - 1 && "border-b border-border",
            )}
          >
            <span className="font-display text-[22px] font-medium tracking-[-0.02em] tabular-nums text-ink-muted">
              {e.year}
            </span>
            <div>
              <div className="mb-1 font-display text-[16px] font-medium tracking-[-0.015em] text-ink">
                {e.title}
              </div>
              {e.role && <div className="text-[12.5px] text-ink-muted">{e.role}</div>}
            </div>
          </li>
        ))}
      </ul>
    </ProfileSection>
  );
}
