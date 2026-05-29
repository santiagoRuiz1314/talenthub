"use server";

import { revalidatePath } from "next/cache";

import { createCasting } from "@/lib/data/castings";
import type { CastingInput } from "@/lib/types/casting";

type Result =
  | { ok: true; id: string }
  | { ok: false; message: string };

/**
 * Wrapper server action de `createCasting`. Garantiza que la mutación ocurre
 * en el server (no en el bundle client) y revalida las páginas afectadas.
 */
export async function createCastingAction(input: CastingInput): Promise<Result> {
  try {
    const casting = await createCasting(input);
    revalidatePath("/agency/dashboard");
    revalidatePath("/");
    return { ok: true, id: casting.id };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Error desconocido",
    };
  }
}
