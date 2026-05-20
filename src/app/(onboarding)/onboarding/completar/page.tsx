import type { Metadata } from "next";

import { ExtractedPreview, type ExtractedField } from "@/components/onboarding/extracted-preview";
import { OnboardingStep2Client } from "@/components/onboarding/onboarding-step2-client";
import { StepProgress } from "@/components/onboarding/step-progress";
import { Logo } from "@/components/shared/logo";

export const metadata: Metadata = {
  title: "Completa tu perfil — TalentHub",
};

// TODO(fase-4): estos campos vienen del resultado real de extracción IA del PDF.
// En Fase 2 son demo data fijos para validar el visual + UX del flujo.
const DEMO_EXTRACTED_FIELDS: ExtractedField[] = [
  { label: "Nombre", value: "María José Rojas" },
  { label: "Edad", value: "26 años" },
  { label: "Estatura", value: "1.72 m" },
  { label: "Medidas", value: "86 · 64 · 92" },
  { label: "Cabello", value: "Castaño oscuro" },
  { label: "Ojos", value: "Café" },
  { label: "Experiencia", value: "3 años" },
];

export default function CompletarOnboardingPage() {
  return (
    <>
      <header className="flex items-center justify-between gap-4 border-b border-border px-8 py-5">
        <Logo />
        <StepProgress step={2} total={2} />
      </header>

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-8 pb-20 pt-14">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_380px]">
          <OnboardingStep2Client />
          <div className="order-first lg:order-none">
            <ExtractedPreview
              name="María José Rojas"
              subtitle="Modelo · Actriz · 3 años de experiencia"
              photoSeed="onboarding-preview-maria"
              photosCount={8}
              fields={DEMO_EXTRACTED_FIELDS}
              sourceFileName="portafolio_maria_rojas_2026.pdf"
            />
          </div>
        </div>
      </main>
    </>
  );
}
