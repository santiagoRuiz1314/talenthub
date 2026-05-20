import { FileText } from "lucide-react";

import { Sparkle } from "@/components/icons";
import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";

export interface ExtractedField {
  label: string;
  value: string;
}

export interface ExtractedPreviewProps {
  name: string;
  /** Subtítulo corto: roles + experiencia (e.g. "Modelo · Actriz · 3 años de experiencia"). */
  subtitle: string;
  /** Foto principal — usa seed para generar el placeholder warm. */
  photoSeed: string;
  photosCount: number;
  fields: ExtractedField[];
  sourceFileName?: string;
}

/**
 * Right-rail sticky del paso 2: muestra los campos extraídos por IA del PDF
 * (proof + transparencia). En Fase 2 los datos vienen hardcodeados desde la
 * página; en Fase 4 vendrán del resultado real de la extracción.
 */
export function ExtractedPreview({
  name,
  subtitle,
  photoSeed,
  photosCount,
  fields,
  sourceFileName,
}: ExtractedPreviewProps) {
  return (
    <aside
      className="sticky top-8 overflow-hidden rounded-2xl border border-border bg-bg
                 lg:order-none [.lg-collapse_&]:order-first"
    >
      <div
        className="flex items-center justify-between gap-2 border-b border-border
                   bg-beige-soft px-[18px] py-3.5"
      >
        <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-coral-deep">
          <span aria-hidden className="inline-flex animate-th-pulse-soft text-coral">
            <Sparkle size={12} />
          </span>
          Extraído por IA
        </div>
        <button
          type="button"
          className="bg-transparent text-[11.5px] font-medium text-ink-muted underline underline-offset-2
                     hover:text-ink"
        >
          Editar
        </button>
      </div>

      <div className="p-[18px]">
        <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden rounded-[12px]">
          <PhotoPlaceholder seed={photoSeed} className="absolute inset-0 rounded-[12px]" />
          <div
            aria-hidden
            className="absolute left-0 right-0 top-1/2 h-[2px] opacity-60"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--coral), transparent)",
              boxShadow: "0 0 12px var(--coral)",
            }}
          />
          <div
            className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5
                       rounded-full bg-white/90 px-2 py-1 text-[10.5px] font-medium text-ink
                       backdrop-blur"
          >
            <span aria-hidden className="h-1 w-1 rounded-full bg-coral" />
            <span className="tabular-nums">{photosCount}</span> foto
            {photosCount === 1 ? "" : "s"} detectada{photosCount === 1 ? "" : "s"}
          </div>
        </div>

        <h3
          className="m-0 mb-1 font-display text-[22px] font-medium leading-tight tracking-[-0.025em]
                     text-ink"
        >
          {name}
        </h3>
        <p className="m-0 mb-[18px] text-[13px] text-ink-muted">{subtitle}</p>

        <ul className="m-0 list-none border-t border-border p-0">
          {fields.map((f) => (
            <li
              key={f.label}
              className="flex items-center justify-between gap-3 border-b border-border py-2.5
                         text-[13px]"
            >
              <span className="text-ink-muted">{f.label}</span>
              <span className="font-display font-medium tracking-[-0.005em] text-ink">
                {f.value}
              </span>
            </li>
          ))}
        </ul>

        {sourceFileName && (
          <div className="mt-3.5 flex items-center gap-1.5 border-t border-border pt-3.5 text-[11.5px] text-ink-muted">
            <FileText size={11} strokeWidth={1.4} aria-hidden />
            <span className="flex-1 truncate" title={sourceFileName}>
              {sourceFileName}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
