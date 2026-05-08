import { z } from "zod";

export const PDF_MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB

// TODO(fase-4): se dispara cuando la IA falle la extracción del PDF.
// No se usa en Fase 2 — el componente lo recibe via prop `error` cuando aplique.
export const PDF_ERROR_CORRUPT = "No pudimos leer el archivo, intenta con otro PDF";

/**
 * Valida un objeto `File` del browser.
 * Solo se llama client-side (drag-and-drop handler) — el guard de `typeof File`
 * garantiza que no explota si el módulo se importa en un Server Component.
 */
export const pdfFileSchema = z
  .custom<File>(
    (val) => {
      if (typeof File === "undefined") return false;
      return val instanceof File;
    },
    "Archivo inválido",
  )
  .refine((f) => f.type === "application/pdf", "Solo aceptamos PDF")
  .refine((f) => f.size <= PDF_MAX_SIZE_BYTES, "El archivo supera los 8 MB");

export const instagramHandleSchema = z
  .string()
  .transform((s) => s.trim())
  .pipe(
    z
      .string()
      .min(1, "Ingresa tu handle de Instagram")
      .max(30, "Máximo 30 caracteres")
      .regex(/^[a-zA-Z0-9_.]+$/, "Solo letras, números, puntos y guiones bajos"),
  );

export const onboardingStep1Schema = z
  .object({
    // "manual" se excluye intencionalmente — el skip path persiste source="manual"
    // directo en handleSkip sin pasar por este schema.
    source: z.enum(["pdf", "instagram"]),
    instagramHandle: instagramHandleSchema.optional(),
  })
  .refine(
    (d) => d.source !== "instagram" || !!d.instagramHandle,
    { message: "Ingresa tu handle de Instagram", path: ["instagramHandle"] },
  );

export type OnboardingStep1Input = z.infer<typeof onboardingStep1Schema>;
