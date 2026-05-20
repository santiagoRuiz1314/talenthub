import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ISODateString } from "@/lib/types/shared";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS_ES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

export function formatDeadline(dateString: ISODateString): string {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return `${d.getDate()} ${MONTHS_ES[d.getMonth()]}`;
}

export function parseCastingIdParam(id: unknown): string | null {
  if (typeof id !== "string" || id.trim() === "") return null;
  return id.trim();
}

export function parseAuthRoleParam(value: unknown): "talent" | "agency" {
  const str = Array.isArray(value) ? value[0] : value;
  if (str === "agency") return "agency";
  return "talent";
}

/** Edad en años calculada a partir de un `birthDate` ISO (`YYYY-MM-DD`). */
export function computeAge(birthDate: ISODateString): number {
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

/** Iniciales de un nombre completo, ej. "María Rojas" → "MR". Hasta 2 letras. */
export function nameInitials(firstName: string, lastName?: string): string {
  const f = firstName.trim()[0] ?? "";
  const l = lastName?.trim()[0] ?? "";
  return (f + l).toUpperCase() || "·";
}

/**
 * Tiempo relativo en español-CO: "hace 2 días", "hace 1 sem", "hace 3 sem", "hace 2 meses".
 * Para diferencias negativas (futuro) o inválidas retorna "hace un momento".
 */
export function formatRelativeDate(dateString: ISODateString): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "hace un momento";
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return "hace un momento";
  if (diffMin < 60) return `hace ${diffMin} min`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `hace ${diffHr} ${diffHr === 1 ? "hora" : "horas"}`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `hace ${diffDay} ${diffDay === 1 ? "día" : "días"}`;
  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek < 5) return `hace ${diffWeek} sem`;
  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `hace ${diffMonth} ${diffMonth === 1 ? "mes" : "meses"}`;
  const diffYear = Math.floor(diffDay / 365);
  return `hace ${diffYear} ${diffYear === 1 ? "año" : "años"}`;
}
