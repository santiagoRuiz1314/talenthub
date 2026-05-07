import { CASTING_DETAIL_COPY } from "@/lib/constants";

import { DetailSection } from "./detail-section";

type Props = {
  description: string;
};

export function DetailDescription({ description }: Props) {
  const paragraphs = description.split("\n\n").filter(Boolean);
  return (
    <DetailSection title={CASTING_DETAIL_COPY.descriptionTitle} kicker={CASTING_DETAIL_COPY.descriptionKicker}>
      <div className="text-ink max-w-[68ch] text-[15.5px] leading-[1.65] text-pretty">
        {paragraphs.map((p, i) => (
          <p key={i} className={i < paragraphs.length - 1 ? "mb-4" : ""}>
            {p}
          </p>
        ))}
      </div>
    </DetailSection>
  );
}
