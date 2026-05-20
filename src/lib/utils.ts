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
