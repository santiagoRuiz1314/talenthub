import { z } from "zod";

export const emailAuthSchema = z.object({
  email: z.string().email("Email inválido"),
});

export type EmailAuthInput = z.infer<typeof emailAuthSchema>;
