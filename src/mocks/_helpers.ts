import type { City, ISODateString } from "@/lib/types/shared";

/** "Hoy" para los mocks de Fase 2 — alineado con la fecha del proyecto. */
export const NOW_ISO: ISODateString = "2026-05-02T10:00:00.000Z";

const NOW_MS = Date.parse(NOW_ISO);
const DAY_MS = 86_400_000;

/** ISO timestamp `n` días antes de NOW (UTC). */
export function daysAgo(n: number): ISODateString {
  return new Date(NOW_MS - n * DAY_MS).toISOString();
}

/** ISO timestamp `n` días después de NOW (UTC). */
export function daysFromNow(n: number): ISODateString {
  return new Date(NOW_MS + n * DAY_MS).toISOString();
}

/**
 * Fecha calendario `YYYY-MM-DD` `years` años antes de NOW, con offsets opcionales
 * para diversificar día/mes entre talentos generados.
 */
export function yearsAgoDate(years: number, monthOffset = 0, dayOffset = 0): ISODateString {
  const d = new Date(NOW_MS);
  d.setUTCFullYear(d.getUTCFullYear() - years);
  if (monthOffset) d.setUTCMonth(d.getUTCMonth() + monthOffset);
  if (dayOffset) d.setUTCDate(d.getUTCDate() + dayOffset);
  return d.toISOString().slice(0, 10);
}

/** URL determinística (Picsum) por seed. Se reemplaza con storage real en Fase 3. */
export function photoUrl(seed: string, w: number, h: number): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

/** Las 12 ciudades de V1, ordenadas por tamaño aproximado de mercado. */
export const ALL_CITIES_CO: readonly City[] = [
  "bogota",
  "medellin",
  "cali",
  "barranquilla",
  "cartagena",
  "bucaramanga",
  "pereira",
  "manizales",
  "santa_marta",
  "cucuta",
  "ibague",
  "pasto",
] as const;

/** Pick determinístico circular — sin random; estable entre builds. */
export function pick<T>(arr: readonly T[], i: number): T {
  return arr[((i % arr.length) + arr.length) % arr.length];
}

/** Pad numérico a 3 dígitos para ids (`t_001`, `c_032`, etc.). */
export function pad3(n: number): string {
  return String(n).padStart(3, "0");
}
