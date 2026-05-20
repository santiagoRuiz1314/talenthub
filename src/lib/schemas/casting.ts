import { z } from "zod";

import {
  ageRangeSchema,
  citySchema,
  genderRequirementSchema,
  heightRangeSchema,
  isoDateStringSchema,
  languageCodeSchema,
  urlStringSchema,
  uuidSchema,
} from "./shared";

export const castingStatusSchema = z.enum(["draft", "active", "closed"]);

export const castingCategorySchema = z.enum([
  "commercial",
  "editorial",
  "runway",
  "audiovisual",
  "digital_content",
]);

export const experienceLevelSchema = z.enum(["none", "some", "professional"]);

export const castingRequirementsSchema = z.object({
  ageRange: ageRangeSchema.optional(),
  gender: genderRequirementSchema.optional(),
  heightRange: heightRangeSchema.optional(),
  languages: z.array(languageCodeSchema).optional(),
  features: z.array(z.string().min(1).max(80)).optional(),
  experience: experienceLevelSchema.optional(),
});

const castingPhotoInputSchema = z.object({
  url: urlStringSchema,
  alt: z.string().max(140).optional(),
  order: z.number().int().min(0),
});

export const castingInputSchema = z.object({
  agencyId: uuidSchema,
  title: z.string().min(4).max(120),
  description: z.string().min(20).max(2000),
  category: castingCategorySchema,
  status: castingStatusSchema,
  city: citySchema,
  location: z.string().max(120).optional(),
  requirements: castingRequirementsSchema,
  photos: z.array(castingPhotoInputSchema),
  deadline: isoDateStringSchema,
  shootDate: isoDateStringSchema.optional(),
});

export const castingUpdateSchema = castingInputSchema.partial();

/**
 * Schema relajado para el form de Publicar Casting (pantalla 9).
 * Solo título y descripción son requeridos — el resto es opcional y se
 * completa con defaults antes de llamar createCasting().
 */
export const castingFormSchema = z.object({
  title: z
    .string()
    .min(4, "Mínimo 4 caracteres")
    .max(120, "Máximo 120 caracteres"),
  description: z
    .string()
    .min(20, "Mínimo 20 caracteres")
    .max(600, "Máximo 600 caracteres"),
  category: castingCategorySchema.optional(),
  city: citySchema.optional(),
  location: z.string().max(120).optional(),
  deadline: isoDateStringSchema.optional(),
  shootDate: isoDateStringSchema.optional(),
  ageMin: z
    .number({ message: "Debe ser un número" })
    .int()
    .min(14)
    .max(99)
    .optional(),
  ageMax: z
    .number({ message: "Debe ser un número" })
    .int()
    .min(14)
    .max(99)
    .optional(),
  gender: genderRequirementSchema.optional(),
  /** Free-text "1.65 — 1.80" o similar — Fase 4 parseará a heightRange. */
  heightHint: z.string().max(60).optional(),
  pay: z.string().max(120).optional(),
});

export type CastingFormInput = z.infer<typeof castingFormSchema>;
