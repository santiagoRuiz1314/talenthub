import { talentUpdateSchema } from "@/lib/schemas/talent";
import type { ISODateString, UUID } from "@/lib/types/shared";
import type {
  ExperienceItem,
  GalleryPhoto,
  Talent,
  TalentFilters,
  TalentUpdate,
} from "@/lib/types/talent";
import { mockTalents } from "@/mocks/talents";

import { simulateLatency } from "./_latency";

/** Edad calculada a partir de `birthDate` (ISO `YYYY-MM-DD`). */
function computeAge(birthDate: ISODateString): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

/** Talent por id, o `null` si no existe. */
export async function getTalent(id: UUID): Promise<Talent | null> {
  await simulateLatency();
  return mockTalents.find((t) => t.id === id) ?? null;
}

/**
 * Actualiza un talent. Valida `input` con `talentUpdateSchema`.
 * `experience` y `gallery` reciben items sin id; el storage genera ids nuevos.
 * Lanza si el talent no existe.
 */
export async function updateTalent(
  id: UUID,
  input: TalentUpdate,
): Promise<Talent> {
  const parsed = talentUpdateSchema.parse(input);
  await simulateLatency();
  const idx = mockTalents.findIndex((t) => t.id === id);
  if (idx === -1) {
    throw new Error(`Talent ${id} no encontrado`);
  }
  const existing = mockTalents[idx];
  const experience = parsed.experience
    ? parsed.experience.map(
        (e): ExperienceItem => ({ ...e, id: crypto.randomUUID() }),
      )
    : existing.experience;
  const gallery = parsed.gallery
    ? parsed.gallery.map(
        (g): GalleryPhoto => ({ ...g, id: crypto.randomUUID() }),
      )
    : existing.gallery;
  const updated: Talent = {
    ...existing,
    ...parsed,
    experience,
    gallery,
    updatedAt: new Date().toISOString(),
  };
  mockTalents[idx] = updated;
  return updated;
}

/**
 * Búsqueda básica con filtros (Fase 2).
 * Fase 4 reemplaza con embeddings + matching IA. `search` matchea contra
 * `firstName lastName` (case-insensitive).
 */
export async function searchTalents(
  filters?: TalentFilters,
): Promise<Talent[]> {
  await simulateLatency();
  const { ageRange, city, gender, search } = filters ?? {};
  const q = search?.toLowerCase();
  return mockTalents.filter((t) => {
    if (city && t.city !== city) return false;
    if (gender && t.gender !== gender) return false;
    if (ageRange) {
      const age = computeAge(t.birthDate);
      if (age < ageRange.min || age > ageRange.max) return false;
    }
    if (q) {
      const fullName = `${t.firstName} ${t.lastName}`.toLowerCase();
      if (!fullName.includes(q)) return false;
    }
    return true;
  });
}
