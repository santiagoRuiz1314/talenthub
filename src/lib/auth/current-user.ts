import "server-only";

import { getSession } from "@/lib/auth/session";
import { simulateLatency } from "@/lib/data/_latency";
import type { Agency } from "@/lib/types/agency";
import type { Talent } from "@/lib/types/talent";
import type { UUID } from "@/lib/types/shared";
import type { User } from "@/lib/types/user";
import { mockAgencies } from "@/mocks/agencies";
import { mockTalents } from "@/mocks/talents";
import { mockUsers } from "@/mocks/users";

/**
 * Helpers de "usuario actualmente autenticado" — Fase 2 MVP demo.
 * Leen el payload de la cookie `talenthub-session` (set por `lib/auth/actions.ts`)
 * y resuelven contra los mocks. Si el id de la cookie no matchea ningún mock
 * (ej. usuario efímero perdido en reinicio del server), reconstruyen un objeto
 * mínimo desde el payload para que la UI no rompa.
 */

export async function getCurrentUser(): Promise<User | null> {
  await simulateLatency();
  const session = await getSession();
  if (!session) return null;
  const found = mockUsers.find((u) => u.id === session.userId);
  if (found) return { ...found };
  if (session.role === "admin") return null;
  return {
    id: session.userId,
    email: session.email ?? "demo@talenthub.co",
    role: session.role,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function getCurrentUserId(): Promise<UUID | null> {
  const session = await getSession();
  return session?.userId ?? null;
}

/**
 * Talent del usuario actual (si el rol es "talent"). Devuelve `null` si no
 * hay sesión, el rol no es talent, o no se encuentra el perfil.
 */
export async function getCurrentTalent(): Promise<Talent | null> {
  await simulateLatency();
  const session = await getSession();
  if (!session || session.role !== "talent") return null;
  const t = mockTalents.find((x) => x.userId === session.userId);
  return t ? { ...t } : null;
}

/**
 * Agencia del usuario actual (si el rol es "agency"). Resuelve por
 * `ownerUserId === session.userId`, no por `mockAgencies[0]`.
 */
export async function getCurrentAgency(): Promise<Agency | null> {
  await simulateLatency();
  const session = await getSession();
  if (!session || session.role !== "agency") return null;
  const a = mockAgencies.find((x) => x.ownerUserId === session.userId);
  return a ? { ...a } : null;
}
