import type { CastingCategory } from "./casting";
import type { AgeRange, City, Gender, ISODateString, Language, URLString, UUID } from "./shared";

export type EyeColor = "brown" | "black" | "hazel" | "green" | "blue" | "gray";

export type HairColor = "black" | "brown" | "blonde" | "red" | "gray" | "white" | "other";

/** Medidas en cm. Todas opcionales — no todos los talentos las completan. */
export type TalentMeasurements = {
  bustCm?: number;
  waistCm?: number;
  hipsCm?: number;
};

export type PhysicalData = {
  heightCm: number;
  measurements?: TalentMeasurements;
  shoeSizeEu?: number;
  eyeColor?: EyeColor;
  hairColor?: HairColor;
};

/** `instagram` y `tiktok` se guardan como handle (sin URL); `youtube` y `website` como URL completa. */
export type SocialLinks = {
  instagram?: string;
  tiktok?: string;
  youtube?: URLString;
  website?: URLString;
};

export type ExperienceItem = {
  id: UUID;
  title: string;
  role?: string;
  year: number;
  description?: string;
};

export type GalleryPhoto = {
  id: UUID;
  url: URLString;
  alt?: string;
  order: number;
};

/**
 * Acotado a Fase 2: solo lo necesario para pantallas estáticas.
 * Los campos extraídos por IA, scores y análisis se modelan en Fase 4.
 */
export type Portfolio = {
  id: UUID;
  talentId: UUID;
  fileName: string;
  fileUrl: URLString;
  uploadedAt: ISODateString;
};

export type Talent = {
  id: UUID;
  userId: UUID;
  firstName: string;
  lastName: string;
  /** `YYYY-MM-DD`. La edad se deriva con util en `lib/utils`, no se guarda. */
  birthDate: ISODateString;
  gender: Gender;
  city: City;
  bio?: string;
  languages: Language[];
  physicalData: PhysicalData;
  socialLinks: SocialLinks;
  experience: ExperienceItem[];
  gallery: GalleryPhoto[];
  /** Categorías que le interesan al talento (vienen del onboarding). */
  categoriesOfInterest?: CastingCategory[];
  portfolio?: Portfolio;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

/**
 * `portfolio` se sube por flujo aparte (onboarding). `experience` y `gallery`
 * se aceptan sin id; el storage los genera.
 */
export type TalentInput = Omit<
  Talent,
  "id" | "createdAt" | "updatedAt" | "experience" | "gallery" | "portfolio"
> & {
  experience: Omit<ExperienceItem, "id">[];
  gallery: Omit<GalleryPhoto, "id">[];
};

export type TalentUpdate = Partial<TalentInput>;

export type PortfolioInput = Omit<Portfolio, "id" | "uploadedAt">;

/** Filtros que consume `searchTalents(filters?)` en `lib/data/talents.ts`. */
export type TalentFilters = {
  city?: City;
  gender?: Gender;
  ageRange?: AgeRange;
  /** Búsqueda full-text por nombre completo (firstName + lastName). */
  search?: string;
};
