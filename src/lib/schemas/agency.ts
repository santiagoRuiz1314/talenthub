import { z } from "zod";

import { citySchema, urlStringSchema, uuidSchema } from "./shared";

export const agencyTypeSchema = z.enum([
  "production",
  "fashion_house",
  "advertising",
  "brand",
  "other",
]);

export const agencyInputSchema = z.object({
  ownerUserId: uuidSchema,
  name: z.string().min(2).max(100),
  type: agencyTypeSchema,
  city: citySchema,
  website: urlStringSchema.optional(),
  logoUrl: urlStringSchema.optional(),
  description: z.string().max(1000).optional(),
});

export const agencyUpdateSchema = agencyInputSchema.partial();
