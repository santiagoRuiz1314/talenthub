import { z } from "zod";

/** ISO 8601 (`YYYY-MM-DD` o timestamp completo). */
export const isoDateStringSchema = z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
  message: "Fecha inválida (ISO 8601)",
});

/** UUID en Fase 3+; en Fase 2 cualquier string no vacío es válido (mocks usan ids como `c_001`). */
export const uuidSchema = z.string().min(1, "UUID requerido");

export const urlStringSchema = z.url({ message: "URL inválida" });

export const citySchema = z.enum([
  "bogota",
  "medellin",
  "cali",
  "barranquilla",
  "cartagena",
  "bucaramanga",
  "pereira",
  "manizales",
  "santa_marta",
  "cucuta",
  "ibague",
  "pasto",
]);

export const genderSchema = z.enum(["female", "male", "non_binary", "other"]);

export const genderRequirementSchema = z.enum(["female", "male", "non_binary", "other", "any"]);

export const ageRangeSchema = z
  .object({
    min: z.number().int().min(14).max(99),
    max: z.number().int().min(14).max(99),
  })
  .refine((r) => r.min <= r.max, {
    message: "min debe ser ≤ max",
    path: ["min"],
  });

export const heightRangeSchema = z
  .object({
    minCm: z.number().int().min(100).max(230),
    maxCm: z.number().int().min(100).max(230),
  })
  .refine((r) => r.minCm <= r.maxCm, {
    message: "minCm debe ser ≤ maxCm",
    path: ["minCm"],
  });

export const languageCodeSchema = z.enum(["es", "en", "pt", "fr", "it", "de"]);

export const languageLevelSchema = z.enum(["basic", "intermediate", "advanced", "native"]);

export const languageSchema = z.object({
  code: languageCodeSchema,
  level: languageLevelSchema,
});
