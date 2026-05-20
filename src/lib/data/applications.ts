import { applicationInputSchema, applicationUpdateSchema } from "@/lib/schemas/application";
import type {
  Application,
  ApplicationInput,
  ApplicationStatus,
  ApplicationWithCasting,
  ApplicationWithTalent,
} from "@/lib/types/application";
import type { CastingWithAgency } from "@/lib/types/casting";
import type { UUID } from "@/lib/types/shared";
import { mockAgencies } from "@/mocks/agencies";
import { mockApplications } from "@/mocks/applications";
import { mockCastings } from "@/mocks/castings";
import { mockTalents } from "@/mocks/talents";

import { simulateLatency } from "./_latency";

/** Application hidratada con el casting + un subset público de la agencia. */
export type ApplicationFull = Application & { casting: CastingWithAgency };

/** Aplicaciones del talento, hidratadas con su `casting`. Lo consume `/applications`. */
export async function getApplications(talentId: UUID): Promise<ApplicationWithCasting[]> {
  await simulateLatency();
  const result: ApplicationWithCasting[] = [];
  for (const a of mockApplications) {
    if (a.talentId !== talentId) continue;
    const casting = mockCastings.find((c) => c.id === a.castingId);
    if (casting) result.push({ ...a, casting });
  }
  return result;
}

/**
 * Aplicaciones del talento hidratadas con casting + agencia (subset público).
 * Útil para `/applications`: muestra título casting + nombre agencia + status + meta.
 */
export async function getApplicationsFull(talentId: UUID): Promise<ApplicationFull[]> {
  await simulateLatency();
  const result: ApplicationFull[] = [];
  for (const a of mockApplications) {
    if (a.talentId !== talentId) continue;
    const casting = mockCastings.find((c) => c.id === a.castingId);
    if (!casting) continue;
    const agency = mockAgencies.find((g) => g.id === casting.agencyId);
    if (!agency) continue;
    result.push({
      ...a,
      casting: {
        ...casting,
        agency: {
          id: agency.id,
          name: agency.name,
          logoUrl: agency.logoUrl,
          verificationStatus: agency.verificationStatus,
        },
      },
    });
  }
  return result;
}

/** Aplicaciones de un casting, hidratadas con su `talent`. Lo consume `/agency/.../applicants`. */
export async function getApplicationsByCasting(castingId: UUID): Promise<ApplicationWithTalent[]> {
  await simulateLatency();
  const result: ApplicationWithTalent[] = [];
  for (const a of mockApplications) {
    if (a.castingId !== castingId) continue;
    const talent = mockTalents.find((t) => t.id === a.talentId);
    if (talent) result.push({ ...a, talent });
  }
  return result;
}

/**
 * Crea una aplicación. Valida `input` con `applicationInputSchema`.
 * Status inicial = `"pending"`. Lanza si ya existe una aplicación del mismo
 * talento al mismo casting.
 *
 * @fase2 Esta función persiste en el array de mocks.
 * El CTA "Aplicar" de Fase 2 NO debe llamarla directamente —
 * ese flujo es toast-only (ver AGENTS.md).
 * Usarla solo para simular creación real en tests/dev tools.
 */
export async function createApplication(input: ApplicationInput): Promise<Application> {
  const parsed = applicationInputSchema.parse(input);
  await simulateLatency();
  const duplicate = mockApplications.find(
    (a) => a.castingId === parsed.castingId && a.talentId === parsed.talentId,
  );
  if (duplicate) {
    throw new Error("Ya aplicaste a este casting");
  }
  const now = new Date().toISOString();
  const application: Application = {
    id: crypto.randomUUID(),
    castingId: parsed.castingId,
    talentId: parsed.talentId,
    message: parsed.message,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  mockApplications.push(application);
  return application;
}

/**
 * Cambia el `status` de una aplicación. Solo la agencia dueña del casting muta.
 * Valida con `applicationUpdateSchema`. Lanza si la aplicación no existe.
 */
export async function updateApplicationStatus(
  id: UUID,
  status: ApplicationStatus,
): Promise<Application> {
  const { status: parsedStatus } = applicationUpdateSchema.parse({ status });
  await simulateLatency();
  const idx = mockApplications.findIndex((a) => a.id === id);
  if (idx === -1) {
    throw new Error(`Application ${id} no encontrada`);
  }
  const now = new Date().toISOString();
  const updated: Application = {
    ...mockApplications[idx],
    status: parsedStatus,
    statusUpdatedAt: now,
    updatedAt: now,
  };
  mockApplications[idx] = updated;
  return updated;
}
