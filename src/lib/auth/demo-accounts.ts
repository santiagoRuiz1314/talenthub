import type { UUID } from "@/lib/types/shared";
import type { UserRole } from "@/lib/types/user";

/**
 * Cuentas demo del MVP: emails fijos que loguean como usuarios mock con
 * perfil rico precargado. Permite mostrar el flujo end-to-end sin tener que
 * llenar datos en vivo durante la demo.
 *
 * Cualquier email fuera de este mapa = registro libre con perfil vacío
 * (manejado en `lib/auth/actions.ts`).
 */
export const DEMO_ACCOUNTS: Record<string, { userId: UUID; role: UserRole }> = {
  "talento@demo.com": { userId: "u_t_001", role: "talent" },
  "agencia@demo.com": { userId: "u_a_001", role: "agency" },
};

export function isDemoEmail(email: string): boolean {
  return email.toLowerCase().trim() in DEMO_ACCOUNTS;
}

export function getDemoAccount(email: string) {
  return DEMO_ACCOUNTS[email.toLowerCase().trim()] ?? null;
}
