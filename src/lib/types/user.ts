import type { ISODateString, URLString, UUID } from "./shared";

export type UserRole = "talent" | "agency" | "admin";

export type User = {
  id: UUID;
  email: string;
  role: UserRole;
  avatarUrl?: URLString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type UserInput = Omit<User, "id" | "createdAt" | "updatedAt">;

export type UserUpdate = Partial<UserInput>;

/** Sesión activa. `profileId` apunta a `Talent.id` o `Agency.id` según `user.role`. */
export type Session = {
  user: User;
  profileId: UUID | null;
  expiresAt: ISODateString;
};
