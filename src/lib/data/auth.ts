import { getCurrentUser } from "@/lib/auth/current-user";
import type { Session } from "@/lib/types/user";
import { mockAgencies } from "@/mocks/agencies";
import { mockTalents } from "@/mocks/talents";

/**
 * Sesión actual derivada del `getCurrentUser` canónico (`@/lib/auth/current-user`).
 * `profileId` apunta a `Talent.id` o `Agency.id` según rol del user.
 * `expiresAt` es placeholder (1h adelante) — la cookie real vive 7 días.
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
