import "server-only";

import { cookies } from "next/headers";

import type { UUID } from "@/lib/types/shared";
import type { UserRole } from "@/lib/types/user";

const COOKIE_NAME = "talenthub-session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 1 semana

/**
 * Payload mínimo de sesión guardado en cookie httpOnly. Identidad pura:
 * los datos ricos (avatar, perfil) se reconstruyen desde mocks o el
 * ephemeral store. Para usuarios efímeros incluimos `email` y `name`
 * porque ningún mock los contendrá entre reinicios.
 */
export type SessionPayload = {
  userId: UUID;
  role: UserRole;
  isEphemeral: boolean;
  email?: string;
  name?: string;
};

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SessionPayload;
    if (!parsed.userId || !parsed.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function setSession(payload: SessionPayload): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, JSON.stringify(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
