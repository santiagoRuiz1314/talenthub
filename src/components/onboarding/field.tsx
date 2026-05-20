import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface FieldProps {
  label: string;
  optional?: boolean;
  hint?: ReactNode;
  htmlFor?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Wrapper estándar de campo de formulario para el paso 2 del onboarding.
 * Renderiza un eyebrow ALL CAPS arriba (label + opcional + hint a la derecha),
 * el control, y un mensaje de error opcional debajo.
 */
export function Field({ label, optional, hint, htmlFor, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label
          htmlFor={htmlFor}
          className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-muted"
        >
          {label}
          {optional && (
            <span className="ml-1 text-ink-muted opacity-70 font-normal normal-case tracking-normal">
              · opcional
            </span>
          )}
        </label>
        {hint && <span className="text-[11.5px] text-ink-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <p role="alert" className="text-[12.5px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
