export function VerifiedBadge() {
  return (
    <span
      title="Agencia verificada"
      className="bg-coral-soft text-coral-deep inline-flex items-center gap-1 rounded-xs px-[7px] py-[2px] text-[10.5px] font-semibold uppercase tracking-[0.04em]"
    >
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M3 8.5l3 3 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Verificada
    </span>
  );
}
