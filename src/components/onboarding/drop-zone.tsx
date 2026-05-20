"use client";

import { useRef, useState } from "react";

import { AISparkle, PdfIcon } from "@/components/icons";
import { FileCard } from "@/components/onboarding/file-card";
import { pdfFileSchema } from "@/lib/schemas/onboarding";
import { cn } from "@/lib/utils";

export interface DropZoneFile {
  /** Nombre original. */
  name: string;
  /** Tamaño en MB con 2 decimales (e.g. "3.45"). */
  sizeMb: string;
}

export interface DropZoneProps {
  file: DropZoneFile | null;
  onFile: (file: DropZoneFile) => void;
  onClear: () => void;
  /** Disparado cuando el ciclo IA del FileCard termina. */
  onComplete?: () => void;
  /** Mensaje de error visible debajo de la zona (PDF inválido, etc.). */
  error?: string;
  /** Mensaje de error inline visible cuando el usuario suelta un archivo inválido. */
  onError?: (message: string) => void;
}

/**
 * Drop zone principal del paso 1 de onboarding. Acepta drag-and-drop o click.
 * Cuando hay un archivo válido, renderiza `<FileCard>` con el ciclo IA.
 *
 * Validación con `pdfFileSchema` (PDF + ≤ 8 MB). Los errores se propagan
 * vía `onError` al padre para que decida cómo mostrarlos (toast, inline).
 *
 * @example
 * <DropZone
 *   file={file}
 *   onFile={setFile}
 *   onClear={() => setFile(null)}
 *   onComplete={handleAiComplete}
 *   error={uploadError}
 *   onError={setUploadError}
 * />
 */
export function DropZone({ file, onFile, onClear, onComplete, error, onError }: DropZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | undefined) => {
    if (!f) return;
    const parsed = pdfFileSchema.safeParse(f);
    if (!parsed.success) {
      onError?.(parsed.error.issues[0]?.message ?? "Archivo inválido");
      return;
    }
    onError?.("");
    onFile({
      name: f.name,
      sizeMb: (f.size / (1024 * 1024)).toFixed(2),
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="flex flex-col items-stretch gap-2">
      <div
        onDragOver={(e) => {
          if (file) return;
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
        className={cn(
          "relative overflow-hidden rounded-[20px] border-[1.5px] border-dashed text-center",
          "transition-[background-color,border-color,padding] duration-200 ease-out",
          file
            ? "border-coral bg-bg p-8"
            : dragOver
              ? "border-coral bg-coral-soft px-8 py-14 cursor-pointer"
              : "border-border bg-bg px-8 py-14 cursor-pointer hover:bg-beige-soft",
        )}
      >
        {/* Decorative orbiting dots cuando está vacío */}
        {!file && (
          <>
            <span
              aria-hidden
              className="absolute left-6 top-6 h-1.5 w-1.5 rounded-full bg-coral opacity-50 animate-th-pulse-soft"
            />
            <span
              aria-hidden
              className="absolute bottom-6 right-7 h-1 w-1 rounded-full bg-ink opacity-30 animate-th-pulse-soft"
              style={{ animationDelay: "0.5s", animationDuration: "4s" }}
            />
            <span
              aria-hidden
              className="absolute right-16 top-10 h-[3px] w-[3px] rounded-full bg-coral opacity-40 animate-th-pulse-soft"
              style={{ animationDelay: "1s", animationDuration: "3.5s" }}
            />
          </>
        )}

        {!file ? (
          <>
            <div
              className={cn(
                "mb-5 inline-flex transition-transform duration-200 ease-out",
                dragOver && "scale-[1.06]",
              )}
            >
              <PdfIcon size={56} />
            </div>

            <h3 className="m-0 mb-2 font-display text-[20px] font-medium tracking-[-0.02em] text-ink">
              {dragOver ? "Suelta tu portafolio aquí" : "Arrastra tu portafolio en PDF aquí"}
            </h3>

            <p className="mx-auto mb-[18px] text-[13.5px] text-ink-muted">
              o{" "}
              <span className="font-medium text-coral underline underline-offset-[3px]">
                haz clic para seleccionar
              </span>{" "}
              · hasta 8 MB
            </p>

            <div
              className="inline-flex items-center gap-1.5 rounded-full border border-border
                         bg-bg px-3 py-1 text-[11.5px] font-medium text-ink-muted"
            >
              <span aria-hidden className="inline-flex text-coral">
                <AISparkle size={12} animated />
              </span>
              <span
                className="bg-[length:200%_100%] bg-clip-text text-transparent
                           animate-th-shimmer"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--ink) 0%, var(--coral) 50%, var(--ink) 100%)",
                  animationDuration: "4s",
                }}
              >
                Powered by AI · Lee tu portafolio en segundos
              </span>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="hidden"
              aria-hidden
              tabIndex={-1}
            />
          </>
        ) : (
          <FileCard
            fileName={file.name}
            fileSizeMb={file.sizeMb}
            onClear={onClear}
            onComplete={onComplete}
          />
        )}
      </div>

      {error && (
        <p role="alert" className="text-center text-[12.5px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
