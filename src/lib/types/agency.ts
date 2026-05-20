import type { City, ISODateString, URLString, UUID } from "./shared";

export type AgencyType = "production" | "fashion_house" | "advertising" | "brand" | "other";

/** V1: verificación manual. `"rejected"` no oculta a la agencia, solo la marca. */
export type AgencyVerificationStatus = "pending" | "verified" | "rejected";

export type Agency = {
  id: UUID;
  ownerUserId: UUID;
  name: string;
  type: AgencyType;
  city: City;
  website?: URLString;
  logoUrl?: URLString;
  description?: string;
  verificationStatus: AgencyVerificationStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

/** `verificationStatus` arranca siempre en `"pending"` — no se acepta como input. */
export type AgencyInput = Omit<Agency, "id" | "createdAt" | "updatedAt" | "verificationStatus">;

export type AgencyUpdate = Partial<AgencyInput>;
