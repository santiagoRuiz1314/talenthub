import { mockCurrentUserId, mockUsers } from "@/mocks/users";
import { mockTalents } from "@/mocks/talents";
import type { User } from "@/lib/types/user";
import type { Talent } from "@/lib/types/talent";
import type { UUID } from "@/lib/types/shared";

import { simulateLatency } from "@/lib/data/_latency";

/**
 * Helper de "usuario actualmente autenticado" para Fase 2 — mock-based.
 * En Fase 3 se reemplaza por una integración con el auth provider real (sesión + cookie).
 * Toda función retorna Promise para que las pantallas no cambien al migrar.
 */

export async function getCurrentUser(): Promise<User | null> {
  await simulateLatency();
  if (!mockCurrentUserId) return null;
  const u = mockUsers.find((x) => x.id === mockCurrentUserId);
  return u ? { ...u } : null;
}

export async function getCurrentUserId(): Promise<UUID | null> {
  await simulateLatency();
  return mockCurrentUserId;
}

/**
 * Talent del usuario actual (si el rol es "talent"). Devuelve `null` si el
 * usuario actual no es talent o no existe perfil.
 */
export async function getCurrentTalent(): Promise<Talent | null> {
  await simulateLatency();
  if (!mockCurrentUserId) return null;
  const t = mockTalents.find((x) => x.userId === mockCurrentUserId);
  return t ? { ...t } : null;
}
