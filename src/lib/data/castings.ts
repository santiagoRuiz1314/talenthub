import {
  castingInputSchema,
  castingUpdateSchema,
} from "@/lib/schemas/casting";
import type { Agency } from "@/lib/types/agency";
import type {
  Casting,
  CastingFilters,
  CastingInput,
  CastingPhoto,
  CastingUpdate,
  CastingWithAgency,
} from "@/lib/types/casting";
import type { UUID } from "@/lib/types/shared";
import { mockCastings } from "@/mocks/castings";
import { mockTalents } from "@/mocks/talents";

import { getAgency } from "./agencies";
import { simulateLatency } from "./_latency";

/**
 * Lista castings aplicando filtros opcionales.
 * Orden por defecto: `publishedAt` desc, fallback a `createdAt`.
 */
export async function getCastings(filters?: CastingFilters): Promise<Casting[]> {
  await simulateLatency();
  const { agencyId, category, city, search, status } = filters ?? {};
  const q = search?.toLowerCase();
  return mockCastings
    .filter((c) => (agencyId ? c.agencyId === agencyId : true))
    .filter((c) => (category ? c.category === category : true))
    .filter((c) => (city ? c.city === city : true))
    .filter((c) => (status ? c.status === status : true))
    .filter((c) =>
      q
        ? c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
        : true,
    )
    .slice()
    .sort((a, b) => {
      const aDate = a.publishedAt ?? a.createdAt;
      const bDate = b.publishedAt ?? b.createdAt;
      return bDate.localeCompare(aDate);
    });
}

/**
 * Devuelve un casting por id, o `null` si no existe.
 * Spread shallow defensivo: mutar el objeto retornado no toca el mock.
 */
export async function getCasting(id: UUID): Promise<Casting | null> {
  await simulateLatency();
  const found = mockCastings.find((c) => c.id === id);
  return found ? { ...found } : null;
}

/**
 * Crea un casting. Valida `input` con `castingInputSchema` (lanza `ZodError` si inválido).
 * Si `status === "active"` setea `publishedAt = now`.
 */
export async function createCasting(input: CastingInput): Promise<Casting> {
  const parsed = castingInputSchema.parse(input);
  await simulateLatency();
  const now = new Date().toISOString();
  const casting: Casting = {
    id: crypto.randomUUID(),
    agencyId: parsed.agencyId,
    title: parsed.title,
    description: parsed.description,
    category: parsed.category,
    status: parsed.status,
    city: parsed.city,
    location: parsed.location,
    requirements: parsed.requirements,
    photos: parsed.photos.map(
      (p): CastingPhoto => ({ ...p, id: crypto.randomUUID() }),
    ),
    deadline: parsed.deadline,
    shootDate: parsed.shootDate,
    publishedAt: parsed.status === "active" ? now : undefined,
    createdAt: now,
    updatedAt: now,
  };
  mockCastings.push(casting);
  return casting;
}

/**
 * Actualiza un casting. Valida con `castingUpdateSchema`.
 * Si pasa de `draft`/`closed` → `active` y no tenía `publishedAt`, lo setea ahora.
 * Lanza si el casting no existe.
 */
export async function updateCasting(
  id: UUID,
  input: CastingUpdate,
): Promise<Casting> {
  const parsed = castingUpdateSchema.parse(input);
  await simulateLatency();
  const idx = mockCastings.findIndex((c) => c.id === id);
  if (idx === -1) {
    throw new Error(`Casting ${id} no encontrado`);
  }
  const existing = mockCastings[idx];
  const now = new Date().toISOString();
  const photos = parsed.photos
    ? parsed.photos.map(
        (p): CastingPhoto => ({ ...p, id: crypto.randomUUID() }),
      )
    : existing.photos;
  const updated: Casting = {
    ...existing,
    ...parsed,
    photos,
    updatedAt: now,
  };
  if (
    parsed.status === "active" &&
    existing.status !== "active" &&
    !existing.publishedAt
  ) {
    updated.publishedAt = now;
  }
  mockCastings[idx] = updated;
  return updated;
}

/** Castings de una agencia (incluye drafts y closed — el dashboard los muestra todos). */
export async function getCastingsByAgency(agencyId: UUID): Promise<Casting[]> {
  await simulateLatency();
  return mockCastings.filter((c) => c.agencyId === agencyId);
}

/**
 * Recomendados para un talento. Fase 4 reemplaza esto con embeddings + matching IA.
 * Implementación naïve Fase 2: castings activos en la misma ciudad del talento, top 6.
 */
export async function getRecommendedCastings(
  talentId: UUID,
): Promise<Casting[]> {
  await simulateLatency();
  const talent = mockTalents.find((t) => t.id === talentId);
  if (!talent) return [];
  return mockCastings
    .filter((c) => c.status === "active" && c.city === talent.city)
    .slice(0, 6);
}

/**
 * Casting hidratado con un subset público de la agencia (`name`, `logoUrl`,
 * `verificationStatus`). Pantallas de cara a talento (feed, detalle) lo
 * consumen para evitar un fetch separado de agencia.
 * Devuelve `null` si el casting no existe o si su agencia no existe.
 */
export async function getCastingWithAgency(
  id: UUID,
): Promise<CastingWithAgency | null> {
  const casting = await getCasting(id);
  if (!casting) return null;
  const agency = await getAgency(casting.agencyId);
  if (!agency) return null;
  return { ...casting, agency: pickPublicAgency(agency) };
}

/**
 * Versión hidratada de `getCastings`. Castings cuya agencia no existe en el
 * storage se omiten silenciosamente (no rompe el listado).
 * Deduplicamos por `agencyId` para que un feed de N castings no haga N
 * llamadas a `getAgency` cuando solo hay ~M agencias distintas.
 */
export async function getCastingsWithAgency(
  filters?: CastingFilters,
): Promise<CastingWithAgency[]> {
  const castings = await getCastings(filters);
  const uniqueAgencyIds = Array.from(new Set(castings.map((c) => c.agencyId)));
  const agencies = await Promise.all(uniqueAgencyIds.map((id) => getAgency(id)));
  const byId = new Map<UUID, Agency>();
  for (const a of agencies) {
    if (a) byId.set(a.id, a);
  }
  const result: CastingWithAgency[] = [];
  for (const casting of castings) {
    const agency = byId.get(casting.agencyId);
    if (!agency) continue;
    result.push({ ...casting, agency: pickPublicAgency(agency) });
  }
  return result;
}

/**
 * Versión hidratada de `getRecommendedCastings`. Castings cuya agencia no
 * existe se omiten. Deduplica por `agencyId` igual que `getCastingsWithAgency`.
 */
export async function getRecommendedCastingsWithAgency(
  talentId: UUID,
): Promise<CastingWithAgency[]> {
  const castings = await getRecommendedCastings(talentId);
  if (castings.length === 0) return [];
  const uniqueAgencyIds = Array.from(new Set(castings.map((c) => c.agencyId)));
  const agencies = await Promise.all(uniqueAgencyIds.map((id) => getAgency(id)));
  const byId = new Map<UUID, Agency>();
  for (const a of agencies) {
    if (a) byId.set(a.id, a);
  }
  const result: CastingWithAgency[] = [];
  for (const casting of castings) {
    const agency = byId.get(casting.agencyId);
    if (!agency) continue;
    result.push({ ...casting, agency: pickPublicAgency(agency) });
  }
  return result;
}

function pickPublicAgency(
  agency: Agency,
): CastingWithAgency["agency"] {
  return {
    id: agency.id,
    name: agency.name,
    logoUrl: agency.logoUrl,
    verificationStatus: agency.verificationStatus,
  };
}
