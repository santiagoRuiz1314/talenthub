import type { Metadata } from "next";

import { AuthModal } from "@/components/auth/auth-modal";

export const metadata: Metadata = {
  title: "Iniciar sesión — TalentHub",
};

export default function LoginPage() {
  return <AuthModal mode="page" initialRole="talent" />;
}
