import type { Metadata } from "next";

import { AuthModal } from "@/components/auth/auth-modal";

export const metadata: Metadata = {
  title: "Crear cuenta — TalentHub",
};

export default function RegisterTalentPage() {
  return <AuthModal mode="page" initialRole="talent" pageVariant="register" />;
}
