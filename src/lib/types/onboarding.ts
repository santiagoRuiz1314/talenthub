import type { CastingCategory } from "./casting";
import type { City, ISODateString, URLString } from "./shared";

export type OnboardingSource = "pdf" | "instagram";

/**
 * Draft del onboarding del talento.
 * Fase 2: localStorage con key `talenthub:onboarding-draft`.
 * Fase 3: tabla en DB con `user_id` (decisión 2026-05-01 en CLAUDE.md §9).
 */
export type OnboardingDraft = {
  source: OnboardingSource;
  fileName?: string;
  fileUrl?: URLString;
  instagramHandle?: string;
  city?: City;
  categoriesOfInterest?: CastingCategory[];
  updatedAt: ISODateString;
};
