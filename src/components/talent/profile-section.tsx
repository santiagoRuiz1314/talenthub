import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ProfileSectionProps {
  title: string;
  kicker?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * Wrapper estándar de sección dentro del perfil talento.
 * Renderiza un border-top + eyebrow opcional + H2 + acción a la derecha.
 * No exportado a otros dominios — el spacing y la jerarquía son específicos
 * de pantalla 6 / 7.
 */
export function ProfileSection({
  title,
  kicker,
  action,
  className,
  children,
}: ProfileSectionProps) {
  return (
    <section className={cn("border-t border-border py-10", className)}>
      <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
        <div>
          {kicker && (
            <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
              {kicker}
            </div>
          )}
          <h2 className="font-display m-0 text-[24px] font-medium tracking-[-0.025em] text-ink">
            {title}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
