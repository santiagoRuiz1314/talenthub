import type { UUID } from "@/lib/types/shared";
import type { User } from "@/lib/types/user";

/** Mock data Fase 2. Bloque C lo puebla con users realistas (≥1 talent + ≥1 agency owner). */
export const mockUsers: User[] = [];

/**
 * Id del user "actualmente autenticado" para mocks.
 * Se llena en Bloque C (cambiar el literal aquí permite simular distintos roles en QA).
 * En Fase 3 se reemplaza por la sesión real de Clerk/Supabase.
 */
export const mockCurrentUserId: UUID | null = null;
