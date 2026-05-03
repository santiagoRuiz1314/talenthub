import type { Casting } from "./casting";
import type { ISODateString, UUID } from "./shared";
import type { Talent } from "./talent";

export type ApplicationStatus =
  | "pending"
  | "viewed"
  | "pre_selected"
  | "rejected";

export type Application = {
  id: UUID;
  castingId: UUID;
  talentId: UUID;
  status: ApplicationStatus;
  message?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  /** Última vez que la agencia cambió `status`. Habilita el badge "Vista por agencia". */
  statusUpdatedAt?: ISODateString;
};

/** Composición para `/applications` (talent ve sus aplicaciones con info del casting). */
export type ApplicationWithCasting = Application & { casting: Casting };

/** Composición para `/agency/castings/[id]/applicants`. */
export type ApplicationWithTalent = Application & { talent: Talent };

/** Aplicar a un casting. `status` arranca en `"pending"`. */
export type ApplicationInput = Pick<
  Application,
  "castingId" | "talentId" | "message"
>;

/** Solo la agencia cambia `status`. */
export type ApplicationUpdate = Pick<Application, "status">;
