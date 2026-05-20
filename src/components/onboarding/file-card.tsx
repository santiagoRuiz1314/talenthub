"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { AISparkle, PdfIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const AI_STEPS = [
  "Leyendo páginas",
  "Detectando experiencia",
  "Identificando tipos de casting",
  "Listo",
] as const;

const STEP_DURATION_MS = 900;

export interface FileCardProps {
  fileName: string;
  /** Tamaño del archivo en MB con 2 decimales (e.g. "3.45"). */
  fileSizeMb: string;
  onClear: () => void;
  /** Disparado una vez cuando el ciclo IA termina. Fase 4: gatillará el redirect a /completar. */
  onComplete?: () => void;
}

/**
 * Card mostrada dentro de la DropZone tras subir un PDF.
 * Cicla por 4 etapas simuladas de análisis IA (Fase 2 placeholder).
 * En estado "Listo" detiene la animación orbit del AISparkle y tinta de coral.
 *
 * @example
 * <FileCard
 *   fileName="portafolio.pdf"
 *   fileSizeMb="3.45"
 *   onClear={() => setFile(null)}
 *   onComplete={() => router.push("/onboarding/completar")}
 * />
 */
export function FileCard({ fileName, fileSizeMb, onClear, onComplete }: FileCardProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const done = stepIdx === AI_STEPS.length - 1;

  useEffect(() => {
    if (stepIdx < AI_STEPS.length - 1) {
      const t = setTimeout(() => setStepIdx((s) => s + 1), STEP_DURATION_MS);
      return () => clearTimeout(t);
    }
    onComplete?.();
  }, [stepIdx, onComplete]);

  return (
    <div
      className="animate-th-fade-up flex items-center gap-4 rounded-[14px] border border-border
                 bg-bg p-4 text-left"
    >
      <div className="shrink-0">
        <PdfIcon size={42} />
      </div>

      <div className="min-w-0 flex-1">
        <div
          className="mb-1 truncate font-display text-[15px] font-medium text-ink"
          title={fileName}
        >
          {fileName}
        </div>
        <div className="flex items-center gap-2 text-[12px] text-ink-muted">
          <span className="tabular-nums">{fileSizeMb} MB</span>
          <span aria-hidden className="h-[2px] w-[2px] rounded-full bg-ink-muted" />
          <span
            className={cn(
              "inline-flex items-center gap-1.5",
              done ? "text-coral" : "text-ink",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "inline-flex text-coral",
                !done && "animate-th-orbit",
              )}
            >
              <AISparkle size={11} />
            </span>
            <span aria-live="polite">{AI_STEPS[stepIdx]}</span>
            {!done && <span aria-hidden>…</span>}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        aria-label="Quitar archivo"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                   border border-border text-ink-muted transition-colors
                   hover:bg-beige-soft hover:text-ink
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        <X size={12} strokeWidth={1.6} />
      </button>
    </div>
  );
}
