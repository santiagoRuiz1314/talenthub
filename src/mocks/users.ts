import type { UUID } from "@/lib/types/shared";
import type { User } from "@/lib/types/user";

import { daysAgo, pad3, photoUrl } from "./_helpers";
import { AGENCY_EMAIL_DOMAINS, AGENCY_OWNER_SEEDS, TALENT_SEEDS, emailSlug } from "./_seeds";

const talentUsers: User[] = TALENT_SEEDS.map((seed, i) => {
  const idx = pad3(i + 1);
  return {
    id: `u_t_${idx}`,
    email: `${emailSlug(seed.firstName, seed.lastName)}@mail.co`,
    role: "talent",
    avatarUrl: photoUrl(`avatar-t-${idx}`, 200, 200),
    createdAt: daysAgo(220 - i * 4),
    updatedAt: daysAgo(((i * 7) % 80) + 1),
  };
});

const agencyOwnerUsers: User[] = AGENCY_OWNER_SEEDS.map((owner, i) => {
  const idx = pad3(i + 1);
  return {
    id: `u_a_${idx}`,
    email: `${emailSlug(owner.firstName, owner.lastName)}@${AGENCY_EMAIL_DOMAINS[i]}`,
    role: "agency",
    avatarUrl: photoUrl(`avatar-a-${idx}`, 200, 200),
    createdAt: daysAgo(420 - i * 30),
    updatedAt: daysAgo(((i * 9) % 60) + 1),
  };
});

const adminUser: User = {
  id: "u_admin_001",
  email: "admin@talenthub.co",
  role: "admin",
  avatarUrl: photoUrl("avatar-admin", 200, 200),
  createdAt: daysAgo(600),
  updatedAt: daysAgo(1),
};

export const mockUsers: User[] = [...talentUsers, ...agencyOwnerUsers, adminUser];

/**
 * User "actualmente autenticado" para los mocks. Apunta a `u_t_001` (Valentina
 * Restrepo, Medellín, perfil completo) — usuario de prueba en todas las pantallas.
 * Para simular otro rol, cambiar el literal aquí (ej. `"u_a_001"` para agencia).
 */
export const mockCurrentUserId: UUID | null = "u_t_001";
