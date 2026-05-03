import type { Session, User } from "@/lib/types/user";
import { mockAgencies } from "@/mocks/agencies";
import { mockTalents } from "@/mocks/talents";
import { mockCurrentUserId, mockUsers } from "@/mocks/users";

import { simulateLatency } from "./_latency";

/**
 * Mock del usuario actualmente autenticado.
 * Configurable cambiando `mockCurrentUserId` en `src/mocks/users.ts`.
 * Devuelve `null` si no hay user configurado o el id no matchea.
 * En Fase 3 esto se reemplaza por la sesión real (Clerk/Supabase).
 */
export async function getCurrentUser(): Promise<User | null> {
  await simulateLatency();
  if (!mockCurrentUserId) return null;
  return mockUsers.find((u) => u.id === mockCurrentUserId) ?? null;
}

/**
 * Sesión actual mock.
 * `profileId` apunta a `Talent.id` o `Agency.id` según `user.role`; `null`
 * si el user es admin o si no hay perfil asociado todavía. `expiresAt` es
 * 1 hora hacia el futuro — placeholder hasta Fase 3.
 */
export async function getCurrentSession(): Promise<Session | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  let profileId: string | null = null;
  if (user.role === "talent") {
    profileId = mockTalents.find((t) => t.userId === user.id)?.id ?? null;
  } else if (user.role === "agency") {
    profileId = mockAgencies.find((a) => a.ownerUserId === user.id)?.id ?? null;
  }
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  return { user, profileId, expiresAt };
}
