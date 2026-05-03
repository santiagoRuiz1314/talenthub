"use client";

import { StateCard } from "@/components/shared/state-card";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PublicError({ reset }: Props) {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8">
      <StateCard
        variant="error"
        cta={
          <button
            type="button"
            onClick={reset}
            className="bg-ink hover:bg-ink-muted text-bg inline-flex items-center rounded-md px-5 py-2.5 text-[13.5px] font-medium transition-colors"
          >
            Reintentar
          </button>
        }
      />
    </div>
  );
}
