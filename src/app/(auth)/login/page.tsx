import type { Metadata } from "next";

import { AuthModal } from "@/components/auth/auth-modal";
import { parseAuthRoleParam } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Iniciar sesión — TalentHub",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialRole = parseAuthRoleParam(params.role);
  return <AuthModal mode="page" initialRole={initialRole} pageVariant="login" />;
}
