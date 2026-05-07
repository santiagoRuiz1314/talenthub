import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ISODateString } from "@/lib/types/shared";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS_ES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
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
