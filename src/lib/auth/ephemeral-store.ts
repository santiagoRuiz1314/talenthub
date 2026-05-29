import "server-only";

import type { Agency } from "@/lib/types/agency";
import type { UUID } from "@/lib/types/shared";
import type { Talent } from "@/lib/types/talent";
import type { User } from "@/lib/types/user";
import { mockAgencies } from "@/mocks/agencies";
import { mockTalents } from "@/mocks/talents";
import { mockUsers } from "@/mocks/users";

/**
 * Usuarios registrados en runtime durante el demo (cuentas que NO están en
 * mocks pre-cargados). Viven solo en memoria del proceso del server — se
 * pierden con HMR o restart. Aceptable para MVP demo.
 *
 * Push directo a `mockUsers`/`mockTalents`/`mockAgencies` para que el resto de
 * la capa de datos (que filtra esos arrays) los vea sin cambios adicionales.
 */

function nowISO(): string {
  return new Date().toISOString();
}

function shortId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function deriveName(email: string): string {
  const local = email.split("@")[0] ?? email;
  return local
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function registerEphemeralTalent(email: string): { user: User; talent: Talent } {
  const userId = shortId("u_eph_t");
  const talentId = shortId("t_eph");
  const now = nowISO();
  const displayName = deriveName(email);
  const parts = displayName.split(" ");
  const firstName = parts[0] ?? "Talento";
  const lastName = parts.slice(1).join(" ") || "Demo";

  const user: User = {
    id: userId,
    email,
    role: "talent",
    createdAt: now,
    updatedAt: now,
  };

  const talent: Talent = {
    id: talentId,
    userId,
    firstName,
    lastName,
    birthDate: "2000-01-01",
    gender: "non_binary",
    city: "bogota",
    languages: [{ code: "es", level: "native" }],
    physicalData: { heightCm: 170 },
    socialLinks: {},
    experience: [],
    gallery: [],
    createdAt: now,
    updatedAt: now,
  };

  mockUsers.push(user);
  mockTalents.push(talent);

  return { user, talent };
}

export function registerEphemeralAgency(email: string): { user: User; agency: Agency } {
  const userId = shortId("u_eph_a");
  const agencyId = shortId("a_eph");
  const now = nowISO();
  const displayName = deriveName(email);

  const user: User = {
    id: userId,
    email,
    role: "agency",
    createdAt: now,
    updatedAt: now,
  };

  const agency: Agency = {
    id: agencyId,
    ownerUserId: userId,
    name: displayName || "Mi agencia",
    type: "other",
    city: "bogota",
    description: "",
    verificationStatus: "pending",
    createdAt: now,
    updatedAt: now,
  };

  mockUsers.push(user);
  mockAgencies.push(agency);

  return { user, agency };
}

/** Reconstruye un `User` mínimo a partir del payload de cookie cuando los
 * mocks no contienen el id (ej: el server reinició y se perdió el push). */
export function buildEphemeralUserFallback(
  userId: UUID,
  email: string,
  role: "talent" | "agency" | "admin",
): User {
  return {
    id: userId,
    email,
    role,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
