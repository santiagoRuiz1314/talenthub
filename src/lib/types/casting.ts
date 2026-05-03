import type {
  AgeRange,
  City,
  GenderRequirement,
  HeightRange,
  ISODateString,
  LanguageCode,
  URLString,
  UUID,
} from "./shared";

export type CastingStatus = "draft" | "active" | "closed";

export type CastingCategory =
  | "commercial"
  | "editorial"
  | "runway"
  | "audiovisual"
  | "digital_content";

export type ExperienceLevel = "none" | "some" | "professional";

/** Todos los campos opcionales — no todos los castings filtran por todo. */
export type CastingRequirements = {
  ageRange?: AgeRange;
  gender?: GenderRequirement;
  heightRange?: HeightRange;
  languages?: LanguageCode[];
  /** Free-text en V1: "ojos claros", "cabello largo", "tatuajes visibles", etc. */
  features?: string[];
  experience?: ExperienceLevel;
};

export type CastingPhoto = {
  id: UUID;
  url: URLString;
  alt?: string;
  order: number;
};

export type Casting = {
  id: UUID;
  agencyId: UUID;
  title: string;
  description: string;
  category: CastingCategory;
  status: CastingStatus;
  city: City;
  location?: string;
  requirements: CastingRequirements;
  photos: CastingPhoto[];
  /** Cierre de aplicaciones. */
  deadline: ISODateString;
  shootDate?: ISODateString;
  /** Se setea al pasar `draft` → `active`. */
  publishedAt?: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

/** Filtros que consume `getCastings(filters?)` en `lib/data/castings.ts`. */
export type CastingFilters = {
  category?: CastingCategory;
  city?: City;
  status?: CastingStatus;
  search?: string;
  agencyId?: UUID;
};

export type CastingInput = Omit<
  Casting,
  "id" | "createdAt" | "updatedAt" | "publishedAt" | "photos"
> & {
  photos: Omit<CastingPhoto, "id">[];
};

export type CastingUpdate = Partial<CastingInput>;
