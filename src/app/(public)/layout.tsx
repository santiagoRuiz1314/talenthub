import { TopNav } from "@/components/shared/top-nav";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav variant="public" />
      <main className="flex-1">{children}</main>
    </>
  );
}
