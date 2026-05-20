import { z } from "zod";

import { castingCategorySchema } from "./casting";
import { citySchema, languageCodeSchema } from "./shared";

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
      .min(1, "Ingresa tu Instagram o portfolio web")
      .max(120, "Máximo 120 caracteres"),
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
    { message: "Ingresa tu Instagram o portfolio web", path: ["instagramHandle"] },
  );

export type OnboardingStep1Input = z.infer<typeof onboardingStep1Schema>;

/** Teléfono colombiano local (sin prefijo +57). 7–11 dígitos con espacios permitidos. */
export const phoneLocalSchema = z
  .string()
  .transform((s) => s.trim())
  .pipe(
    z
      .string()
      .regex(/^[0-9 ]+$/, "Solo números")
      .refine((s) => s.replace(/\s/g, "").length >= 7, "Mínimo 7 dígitos")
      .refine((s) => s.replace(/\s/g, "").length <= 11, "Máximo 11 dígitos"),
  );

export const onboardingStep2Schema = z.object({
  city: citySchema,
  languages: z.array(languageCodeSchema).default([]),
  categoriesOfInterest: z
    .array(castingCategorySchema)
    .min(1, "Selecciona al menos 1 categoría"),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || v.trim() === "" || phoneLocalSchema.safeParse(v).success,
      "Teléfono inválido",
    ),
});

export type OnboardingStep2Input = z.infer<typeof onboardingStep2Schema>;
