"use server";

import { revalidatePath } from "next/cache";

import { getCurrentTalent } from "@/lib/auth/current-user";
import {
  createApplication,
  updateApplicationStatus,
} from "@/lib/data/applications";
import type { ApplicationStatus } from "@/lib/types/application";
import type { UUID } from "@/lib/types/shared";
import { mockApplications } from "@/mocks/applications";

type ApplyResult =
  | { ok: true }
  | { ok: false; error: "unauthenticated" | "duplicate" | "unknown"; message?: string };

/**
 * Aplica el talento actual al casting. Idempotente: si ya existe una
 * aplicación devuelve `ok: true` sin volver a crear.
 *
 * Revalida las páginas que reflejan el estado de la aplicación:
 *   - `/applications` (vista del talento)
 *   - `/castings/[id]` (CTA del detalle)
 *   - `/agency/castings/[id]/applicants` (lista de la agencia)
 *   - `/agency/dashboard` (conteo)
 */
export async function applyToCastingAction(castingId: UUID): Promise<ApplyResult> {
  const talent = await getCurrentTalent();
  if (!talent) return { ok: false, error: "unauthenticated" };

  try {
    await createApplication({ castingId, talentId: talent.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error desconocido";
    if (msg.includes("Ya aplicaste")) {
      return { ok: true };
    }
    return { ok: false, error: "unknown", message: msg };
  }

  revalidatePath("/applications");
  revalidatePath(`/castings/${castingId}`);
  revalidatePath(`/agency/castings/${castingId}/applicants`);
  revalidatePath("/agency/dashboard");

  return { ok: true };
}

type StatusResult =
  | { ok: true }
  | { ok: false; error: "unauthenticated" | "not_found" | "unknown"; message?: string };

/**
 * Cambia el estado de una aplicación. La agencia es la que invoca esto desde
 * `/agency/castings/[id]/applicants`. Revalida ambos lados.
 */
export async function setApplicationStatusAction(
  applicationId: UUID,
  status: ApplicationStatus,
): Promise<StatusResult> {
  const app = mockApplications.find((a) => a.id === applicationId);
  if (!app) return { ok: false, error: "not_found" };

  try {
    await updateApplicationStatus(applicationId, status);
  } catch (err) {
    return {
      ok: false,
      error: "unknown",
      message: err instanceof Error ? err.message : undefined,
    };
  }

  revalidatePath(`/agency/castings/${app.castingId}/applicants`);
  revalidatePath("/applications");
  revalidatePath("/agency/dashboard");

  return { ok: true };
}
