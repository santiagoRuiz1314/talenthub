"use client";

import { useRef, useState } from "react";
import { Image as ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface PhotoUploadFile {
  name: string;
  /** Tamaño legible (e.g. "234 KB"). */
  sizeLabel: string;
}

export interface PhotoUploadProps {
  file: PhotoUploadFile | null;
  onFile: (f: PhotoUploadFile | null) => void;
  disabled?: boolean;
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Drop zone para la foto/imagen principal del casting. Acepta JPG/PNG ≤ 5MB.
 * En Fase 2 el archivo no se sube — solo se muestra el nombre como confirmación
 * visual. Fase 3 lo conectará al storage real.
 */
export function PhotoUpload({ file, onFile, disabled }: PhotoUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (raw: File | undefined) => {
    if (!raw) return;
    if (raw.size > MAX_SIZE_BYTES) return;
    if (!raw.type.startsWith("image/")) return;
    const kb = raw.size / 1024;
    const sizeLabel = kb < 1024 ? `${kb.toFixed(0)} KB` : `${(kb / 1024).toFixed(1)} MB`;
    onFile({ name: raw.name, sizeLabel });
  };

  if (file) {
    return (
      <div className="flex items-center gap-3.5 rounded-[12px] border border-border bg-bg p-3.5">
        <div
          aria-hidden
          className="h-14 w-14 shrink-0 rounded-[10px]"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.04 22), oklch(0.86 0.03 32))",
          }}
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13.5px] font-medium text-ink">{file.name}</div>
          <div className="text-[12px] text-ink-muted">{file.sizeLabel}</div>
        </div>
        <button
          type="button"
          onClick={() => onFile(null)}
          disabled={disabled}
          className="rounded-md border border-border bg-transparent px-3 py-1.5 text-[12.5px] text-ink
                     transition-colors hover:bg-beige-soft disabled:opacity-50"
        >
          Quitar
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={(e) => {
        if (disabled) return;
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        if (disabled) return;
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
      className={cn(
        "flex items-center gap-3.5 rounded-[12px] border-[1.5px] border-dashed p-5",
        "cursor-pointer transition-colors duration-150",
        dragOver ? "border-coral bg-coral-soft" : "border-border bg-bg",
        disabled && "pointer-events-none opacity-50",
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="hidden"
        tabIndex={-1}
        aria-hidden
      />
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]",
          dragOver ? "bg-coral/15 text-coral" : "bg-beige-soft text-ink-muted",
        )}
      >
        <ImageIcon size={20} strokeWidth={1.5} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 text-[13.5px] font-medium text-ink">Foto del casting</div>
        <div className="text-[12.5px] text-ink-muted">
          Si tu casting está en formato imagen, súbela aquí — JPG o PNG hasta 5 MB
        </div>
      </div>
    </div>
  );
}
