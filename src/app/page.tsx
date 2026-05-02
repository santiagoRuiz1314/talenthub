import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24 md:px-8">
      <span className="text-ink-muted text-[11px] font-medium tracking-[0.08em] uppercase">
        TalentHub · Fase 1 · Setup
      </span>
      <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance md:text-5xl">
        Marketplace de castings para Colombia
        <span className="text-coral">.</span>
      </h1>
      <p className="text-ink-muted max-w-prose text-base leading-relaxed">
        Conectamos talento (modelos, actores, creadores) con agencias y productoras verificadas. La
        home pública, el detalle de casting y los flujos de talento/agencia llegan en Fase 2.
      </p>
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link
          href="/sandbox"
          className="bg-ink text-bg hover:bg-ink-muted inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
        >
          Ver sandbox de diseño →
        </Link>
        <a
          href="https://github.com/santiagoRuiz1314/talenthub"
          className="border-border text-ink hover:bg-beige-soft inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
        >
          Repositorio
        </a>
      </div>
    </main>
  );
}
