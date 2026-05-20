import { z } from "zod";

import { uuidSchema } from "./shared";

export const applicationStatusSchema = z.enum(["pending", "viewed", "pre_selected", "rejected"]);

export const applicationInputSchema = z.object({
  castingId: uuidSchema,
  talentId: uuidSchema,
  message: z.string().max(800).optional(),
});

export const applicationUpdateSchema = z.object({
  status: applicationStatusSchema,
});
