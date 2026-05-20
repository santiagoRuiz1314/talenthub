import type { Metadata } from "next";

import { Logo } from "@/components/shared/logo";
import { StepProgress } from "@/components/onboarding/step-progress";
import { OnboardingStep1Client } from "@/components/onboarding/onboarding-step1-client";

export const metadata: Metadata = {
  title: "Sube tu portafolio — TalentHub",
};

export default function OnboardingStep1Page() {
  return (
    <>
      <header
        className="grid items-center gap-4 border-b border-border px-8 py-7
                   sm:grid-cols-[1fr_auto_1fr]"
      >
        <div className="hidden sm:block" />
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="flex justify-end">
          <StepProgress step={1} total={2} />
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-8 pb-20 pt-[72px]">
        <OnboardingStep1Client />
      </main>
    </>
  );
}
