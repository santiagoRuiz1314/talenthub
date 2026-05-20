"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { AISparkle } from "@/components/icons";
import { AltInput } from "@/components/onboarding/alt-input";
import { DropZone, type DropZoneFile } from "@/components/onboarding/drop-zone";
import { saveOnboardingDraft } from "@/lib/data/onboarding";
import { instagramHandleSchema } from "@/lib/schemas/onboarding";
import { cn } from "@/lib/utils";

/**
 * Cliente del paso 1 de onboarding. Maneja:
 * - Upload de PDF (DropZone + validación con pdfFileSchema)
 * - Input alternativo Instagram/portfolio (AltInput + instagramHandleSchema)
 * - Skip path ("Saltar por ahora" → source="manual")
 * - Persistencia del draft en localStorage y navegación a /onboarding/completar
 *
 * Fase 4 (TODO): el `onComplete` del DropZone disparará la extracción real con IA;
 * en Fase 2 el ciclo es solo cosmético — la navegación ocurre al click "Continuar".
 */
export function OnboardingStep1Client() {
  const router = useRouter();
  const [file, setFile] = useState<DropZoneFile | null>(null);
  const [pdfError, setPdfError] = useState<string>("");
  const [handle, setHandle] = useState("");
  const [handleError, setHandleError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const handleTrimmed = handle.trim();
  const canContinue = !!file || handleTrimmed.length > 0;

  const handleContinue = async () => {
    if (submitting || !canContinue) return;
    if (file) {
      setSubmitting(true);
      await saveOnboardingDraft({
        source: "pdf",
        fileName: file.name,
        fileSize: Number(file.sizeMb) * 1024 * 1024,
      });
      router.push("/onboarding/completar");
      return;
    }
    const parsed = instagramHandleSchema.safeParse(handle);
    if (!parsed.success) {
      setHandleError(parsed.error.issues[0]?.message);
      return;
    }
    setSubmitting(true);
    await saveOnboardingDraft({ source: "instagram", instagramHandle: parsed.data });
    router.push("/onboarding/completar");
  };

  const handleSkip = async () => {
    if (submitting) return;
    setSubmitting(true);
    await saveOnboardingDraft({ source: "manual" });
    router.push("/onboarding/completar");
  };

  return (
    <div className="mx-auto w-full max-w-[640px] text-center">
      <div
        className="bg-coral-soft text-coral-deep mb-6 inline-flex items-center gap-2
                   rounded-full px-3 py-1 text-[11.5px] font-semibold uppercase
                   tracking-[0.06em]"
      >
        <span aria-hidden className="inline-flex">
          <AISparkle size={11} animated />
        </span>
        Tu perfil, en 30 segundos
      </div>

      <h1
        className="font-display m-0 mb-4 text-balance text-[clamp(36px,5vw,56px)]
                   font-medium leading-[1.02] tracking-[-0.035em] text-ink"
      >
        Sube tu portafolio.
        <br />
        Nosotros nos encargamos
        <br />
        <span className="text-coral">del resto</span>.
      </h1>

      <p
        className="mx-auto mb-12 max-w-[48ch] text-pretty text-[16px] leading-[1.55]
                   text-ink-muted"
      >
        Nuestra IA lee tu PDF — fotos, experiencia, habilidades — y completa tu perfil
        automáticamente. Tú revisas y publicas.
      </p>

      <DropZone
        file={file}
        onFile={setFile}
        onClear={() => setFile(null)}
        error={pdfError}
        onError={setPdfError}
      />

      <div className="mt-7">
        <AltInput
          value={handle}
          onChange={(v) => {
            setHandle(v);
            if (handleError) setHandleError(undefined);
          }}
          onBlur={() => {
            if (!handle.trim()) return;
            const r = instagramHandleSchema.safeParse(handle);
            if (!r.success) setHandleError(r.error.issues[0]?.message);
          }}
          onClear={() => {
            setHandle("");
            setHandleError(undefined);
          }}
          error={handleError}
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue || submitting}
          className={cn(
            "inline-flex items-center gap-2 rounded-[12px] px-7 py-3.5",
            "text-[14.5px] font-semibold transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            canContinue && !submitting
              ? "bg-coral text-white hover:bg-coral-deep"
              : "bg-beige text-ink-muted cursor-not-allowed",
          )}
        >
          Continuar
          <ArrowRight size={14} strokeWidth={1.6} />
        </button>
        <button
          type="button"
          onClick={handleSkip}
          disabled={submitting}
          className="rounded-md px-4 py-3.5 text-[13.5px] font-medium text-ink-muted
                     transition-colors hover:text-ink disabled:opacity-50"
        >
          Saltar por ahora
        </button>
      </div>

      <p
        className="mx-auto mt-12 max-w-[44ch] text-pretty text-[12px] text-ink-muted
                   opacity-85"
      >
        Tu portafolio nunca se comparte sin tu permiso. Solo se usa para crear tu perfil
        — puedes borrarlo cuando quieras.
      </p>
    </div>
  );
}
