/** Latencia simulada para mocks de Fase 2 — preserva loading states realistas en pantallas. */
const MOCK_LATENCY_MS = 200;

/** En Fase 3 cada función de la capa de datos llama al backend real y este helper desaparece. */
export const simulateLatency = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));
