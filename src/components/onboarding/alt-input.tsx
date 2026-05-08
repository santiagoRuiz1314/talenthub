"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

interface AltInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onClear: () => void;
  error?: string;
  disabled?: boolean;
}

/**
 * Campo alternativo al PDF: trigger colapsado → input de handle de Instagram expandido.
 * El prefijo "instagram.com/" es visual decorativo — `value` contiene solo el handle.
 * Estado expanded/collapsed interno; el resto es controlado por el padre.
 * Se monta bajo la DropZone en /onboarding. Conecta con instagramHandleSchema (onBlur).
 *
 * Posicionamiento: el wrapper externo (mx-auto max-w-[460px]) centra ambos estados.
 * El padre no necesita agregar centering propio.
 *
 * @example
 * <AltInput
 *   value={handle}
 *   onChange={setHandle}
 *   onBlur={() => trigger("instagramHandle")}
 *   onClear={handleClear}
 *   error={errors.instagramHandle?.message}
 * />
 */
export function AltInput({
  value,
  onChange,
  onBlur,
  onClear,
  error,
  disabled,
}: AltInputProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mx-auto flex max-w-[460px] flex-col items-center gap-1.5">
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          disabled={disabled}
          className="cursor-pointer bg-transparent p-0 text-[13.5px] text-ink-muted
                     hover:text-ink disabled:pointer-events-none disabled:opacity-50"
        >
          ¿No tienes portafolio en PDF?{" "}
          <span className="font-medium text-coral underline underline-offset-[3px]">
            Usa tu handle de Instagram
          </span>
        </button>
      ) : (
        <div
          className={cn(
            "animate-th-fade-up w-full flex items-center gap-2 rounded-lg border border-border",
            "bg-bg py-1 pl-3.5 pr-1",
            "transition-colors duration-[140ms] focus-within:border-ink",
            disabled && "pointer-events-none opacity-50",
          )}
        >
          <span className="shrink-0 select-none text-[13px] text-ink-muted">
            instagram.com/
          </span>
          {/* Placeholder "tu_usuario": el prefijo "instagram.com/" ya es visible decorativamente.
              Diverge del placeholder "instagram.com/tu_usuario" que documenta el diseño fuente —
              esa versión produciría duplicación visual con el prefijo afuera del input. */}
          <input
            autoFocus
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={disabled}
            placeholder="tu_usuario"
            className="flex-1 bg-transparent py-2 text-[13.5px] text-ink
                       outline-none placeholder:text-ink-muted/50"
          />
          <button
            onClick={() => {
              onClear();
              setExpanded(false);
            }}
            disabled={disabled}
            aria-label="Cancelar"
            className="flex h-7 w-7 shrink-0 items-center justify-center
                       rounded-[7px] text-ink-muted hover:bg-beige-soft hover:text-ink"
          >
            <X size={11} strokeWidth={1.6} />
          </button>
        </div>
      )}

      {/* Error inline — poblado desde el padre vía instagramHandleSchema */}
      {error && (
        <p className="text-center text-[12.5px] text-danger">{error}</p>
      )}
    </div>
  );
}
