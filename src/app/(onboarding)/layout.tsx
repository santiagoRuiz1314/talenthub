import type { ReactNode } from "react";

/**
 * Layout del flujo de onboarding (`/onboarding`, `/onboarding/completar`).
 * Diferente del layout de `(auth)` — onboarding necesita un shell fullscreen
 * con header propio (StepProgress visible) en lugar del centrado modal de login/registro.
 */
export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return <div className="bg-bg flex min-h-screen flex-col">{children}</div>;
}
