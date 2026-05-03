import { z } from "zod";

import {
  citySchema,
  genderSchema,
  isoDateStringSchema,
  languageSchema,
  urlStringSchema,
  uuidSchema,
} from "./shared";

export const eyeColorSchema = z.enum([
  "brown",
  "black",
  "hazel",
  "green",
  "blue",
  "gray",
]);

export const hairColorSchema = z.enum([
  "black",
  "brown",
  "blonde",
  "red",
  "gray",
  "white",
  "other",
]);

export const talentMeasurementsSchema = z.object({
  bustCm: z.number().int().min(50).max(150).optional(),
  waistCm: z.number().int().min(40).max(150).optional(),
  hipsCm: z.number().int().min(50).max(160).optional(),
});

export const physicalDataSchema = z.object({
  heightCm: z.number().int().min(120).max(230),
  measurements: talentMeasurementsSchema.optional(),
  shoeSizeEu: z.number().int().min(30).max(50).optional(),
  eyeColor: eyeColorSchema.optional(),
  hairColor: hairColorSchema.optional(),
});

export const socialLinksSchema = z.object({
  instagram: z.string().min(1).max(40).optional(),
  tiktok: z.string().min(1).max(40).optional(),
  youtube: urlStringSchema.optional(),
  website: urlStringSchema.optional(),
});

const experienceItemInputSchema = z.object({
  title: z.string().min(2).max(140),
  role: z.string().min(2).max(80).optional(),
  year: z
    .number()
    .int()
    .min(1980)
    .max(new Date().getFullYear()),
  description: z.string().max(500).optional(),
});

const galleryPhotoInputSchema = z.object({
  url: urlStringSchema,
  alt: z.string().max(140).optional(),
  order: z.number().int().min(0),
});

export const talentInputSchema = z.object({
  userId: uuidSchema,
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  birthDate: isoDateStringSchema,
  gender: genderSchema,
  city: citySchema,
  bio: z.string().max(800).optional(),
  languages: z.array(languageSchema),
  physicalData: physicalDataSchema,
  socialLinks: socialLinksSchema,
  experience: z.array(experienceItemInputSchema),
  gallery: z.array(galleryPhotoInputSchema),
});

export const talentUpdateSchema = talentInputSchema.partial();

export const portfolioInputSchema = z.object({
  talentId: uuidSchema,
  fileName: z.string().min(1).max(200),
  fileUrl: urlStringSchema,
});
