import { CASTING_CATEGORY_LABELS } from "@/lib/constants";
import type { CastingCategory } from "@/lib/types";

type Props = {
  category: CastingCategory;
};

const CATEGORY_DOT: Record<CastingCategory, string> = {
  commercial: "var(--coral)",
  editorial: "var(--info-dot)",
  runway: "var(--success-dot)",
  audiovisual: "var(--coral-deep)",
  digital_content: "var(--info-text)",
};

export function TypeTag({ category }: Props) {
  return (
    <span className="text-ink inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-[3px] text-[11px] font-medium tracking-[0.01em] backdrop-blur-md">
      <span
        aria-hidden
        className="h-[5px] w-[5px] rounded-full"
        style={{ background: CATEGORY_DOT[category] }}
      />
      {CASTING_CATEGORY_LABELS[category]}
    </span>
  );
}
