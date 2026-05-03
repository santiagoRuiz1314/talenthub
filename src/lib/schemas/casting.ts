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
