"use server";

import { redirect } from "next/navigation";

import { getDemoAccount } from "@/lib/auth/demo-accounts";
import {
  registerEphemeralAgency,
  registerEphemeralTalent,
} from "@/lib/auth/ephemeral-store";
import { clearSession, setSession } from "@/lib/auth/session";
import type { UserRole } from "@/lib/types/user";
import { mockUsers } from "@/mocks/users";

type LoginRole = Exclude<UserRole, "admin">;

/**
 * Login/registro simulado del MVP. Si el email matchea una cuenta demo,
 * loguea como ese mock (perfil rico). Si no, crea un usuario efímero del rol
 * solicitado y redirige al onboarding (talent) o dashboard (agency).
 *
 * Siempre termina con `redirect()` — el caller no usa el return value.
 */
export async function loginOrRegister(email: string, role: LoginRole): Promise<never> {
  const normalized = email.toLowerCase().trim();

  const demo = getDemoAccount(normalized);
  if (demo) {
    await setSession({
      userId: demo.userId,
      role: demo.role,
      isEphemeral: false,
      email: normalized,
    });
    redirect(demo.role === "talent" ? "/" : "/agency/dashboard");
  }

  const existingUser = mockUsers.find((u) => u.email.toLowerCase() === normalized);
  if (existingUser && existingUser.role !== "admin") {
    await setSession({
      userId: existingUser.id,
      role: existingUser.role,
      isEphemeral: false,
      email: normalized,
    });
    redirect(existingUser.role === "talent" ? "/" : "/agency/dashboard");
  }

  if (role === "talent") {
    const { user, talent } = registerEphemeralTalent(normalized);
    await setSession({
      userId: user.id,
      role: "talent",
      isEphemeral: true,
      email: user.email,
      name: `${talent.firstName} ${talent.lastName}`,
    });
    redirect("/onboarding");
  }

  const { user, agency } = registerEphemeralAgency(normalized);
  await setSession({
    userId: user.id,
    role: "agency",
    isEphemeral: true,
    email: user.email,
    name: agency.name,
  });
  redirect("/agency/dashboard");
}

export async function logout(): Promise<never> {
  await clearSession();
  redirect("/");
}
