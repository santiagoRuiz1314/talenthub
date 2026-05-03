import {
  castingInputSchema,
  castingUpdateSchema,
} from "@/lib/schemas/casting";
import type {
  Casting,
  CastingFilters,
  CastingInput,
  CastingPhoto,
  CastingUpdate,
} from "@/lib/types/casting";
import type { UUID } from "@/lib/types/shared";
import { mockCastings } from "@/mocks/castings";
import { mockTalents } from "@/mocks/talents";

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

/** Devuelve un casting por id, o `null` si no existe. */
export async function getCasting(id: UUID): Promise<Casting | null> {
  await simulateLatency();
  return mockCastings.find((c) => c.id === id) ?? null;
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
