/**
 * Tipos primitivos y enums compartidos por todo el dominio.
 * Los labels en español-CO de los enums viven en `src/lib/constants.ts`.
 */

/** ISO 8601 (`YYYY-MM-DD` para fechas calendario, timestamp completo para createdAt/updatedAt). */
export type ISODateString = string;

/** UUID v4 en Fase 3+. En Fase 2 (mocks) cualquier string único es válido. */
export type UUID = string;

/** URL absoluta con protocolo. */
export type URLString = string;

/** Ciudades soportadas en V1 (Colombia). */
export type City =
  | "bogota"
  | "medellin"
  | "cali"
  | "barranquilla"
  | "cartagena"
  | "bucaramanga"
  | "pereira"
  | "manizales"
  | "santa_marta"
  | "cucuta"
  | "ibague"
  | "pasto";

/** Self-identification del talento. */
export type Gender = "female" | "male" | "non_binary" | "other";

/** Filtro de género de un casting. `"any"` = no filtra por género. */
export type GenderRequirement = Gender | "any";

/** Validar en schemas: 14 ≤ min ≤ max ≤ 99. */
export type AgeRange = { min: number; max: number };

export type HeightRange = { minCm: number; maxCm: number };

/** ISO 639-1 acotado a los idiomas relevantes en V1. */
export type LanguageCode = "es" | "en" | "pt" | "fr" | "it" | "de";

export type LanguageLevel = "basic" | "intermediate" | "advanced" | "native";

export type Language = { code: LanguageCode; level: LanguageLevel };
