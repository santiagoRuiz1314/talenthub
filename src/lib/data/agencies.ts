import type { Agency } from "@/lib/types/agency";
import type { UUID } from "@/lib/types/shared";
import { mockAgencies } from "@/mocks/agencies";

import { simulateLatency } from "./_latency";

/**
 * Agency por id, o `null` si no existe.
 * Spread shallow defensivo: mutar el objeto retornado no toca el mock.
 */
export async function getAgency(id: UUID): Promise<Agency | null> {
  await simulateLatency();
  const found = mockAgencies.find((a) => a.id === id);
  return found ? { ...found } : null;
}

/**
 * Marca una agencia como `verified`.
 * V1: verificación manual del admin (no hay flujo automatizado).
 * Lanza si la agencia no existe.
 */
export async function verifyAgency(id: UUID): Promise<Agency> {
  await simulateLatency();
  const idx = mockAgencies.findIndex((a) => a.id === id);
  if (idx === -1) {
    throw new Error(`Agency ${id} no encontrada`);
  }
  const updated: Agency = {
    ...mockAgencies[idx],
    verificationStatus: "verified",
    updatedAt: new Date().toISOString(),
  };
  mockAgencies[idx] = updated;
  return updated;
}
