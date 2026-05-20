"use client";

import { cn } from "@/lib/utils";

export interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Input de WhatsApp colombiano con prefijo +57 fijo + bandera CO.
 * `value` contiene solo los dígitos locales (sin prefijo) — el +57 se agrega
 * al persistir o enviar al server. Sanitiza la entrada a [0-9 ].
 */
export function PhoneInput({
  value,
  onChange,
  id,
  placeholder = "300 123 4567",
  disabled,
}: PhoneInputProps) {
  return (
    <div
      className={cn(
        "flex items-center overflow-hidden rounded-[10px] border border-border bg-bg",
        "transition-colors duration-[140ms] focus-within:border-ink",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <div
        aria-hidden
        className="flex items-center gap-1.5 border-r border-border bg-beige-soft
                   px-3.5 py-3 text-[14px] text-ink"
      >
        <span>🇨🇴</span>
        <span className="tabular-nums">+57</span>
      </div>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9 ]/g, ""))}
        disabled={disabled}
        placeholder={placeholder}
        className="flex-1 bg-transparent px-3.5 py-3 text-[14px] text-ink
                   outline-none placeholder:text-ink-muted/60"
      />
    </div>
  );
}
