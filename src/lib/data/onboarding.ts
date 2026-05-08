import type { OnboardingDraft } from "@/lib/types/onboarding";

const DRAFT_KEY = "talenthub:onboarding-draft";

type DraftPayload = Omit<Partial<OnboardingDraft>, "updatedAt">;

/**
 * Persiste el draft en localStorage.
 * Si el source cambia respecto al draft existente, descarta los campos del
 * source anterior para que no queden campos huérfanos (ej: fileName cuando
 * el usuario cambia de PDF a Instagram).
 */
export async function saveOnboardingDraft(payload: DraftPayload): Promise<OnboardingDraft> {
  if (typeof window === "undefined") {
    return { ...payload, updatedAt: new Date().toISOString() } as OnboardingDraft;
  }
  const existing = await getOnboardingDraft();
  const sourceChanged = !!payload.source && payload.source !== existing?.source;
  const base = sourceChanged ? {} : (existing ?? {});
  const draft = { ...base, ...payload, updatedAt: new Date().toISOString() } as OnboardingDraft;
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  return draft;
}

export async function getOnboardingDraft(): Promise<OnboardingDraft | null> {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OnboardingDraft;
  } catch {
    return null;
  }
}

export async function clearOnboardingDraft(): Promise<void> {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DRAFT_KEY);
}
