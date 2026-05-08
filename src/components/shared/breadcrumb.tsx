import { Fragment } from "react";
import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: Props) {
  return (
    <nav
      aria-label="Ruta de navegación"
      className="text-ink-muted flex items-center gap-2 pt-5 text-[12.5px]"
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span aria-hidden className="opacity-50">
              /
            </span>
          )}
          {i === items.length - 1 ? (
            <span aria-current="page" className="text-ink font-medium">
              {item.label}
            </span>
          ) : (
            <Link href={item.href ?? "#"} className="hover:text-ink transition-colors">
              {item.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
