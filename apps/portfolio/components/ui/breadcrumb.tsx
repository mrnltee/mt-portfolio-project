import { Fragment } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumb trail. The last item is treated as the current page. */
export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-body-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-text-secondary">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li>
                {item.href && !last ? (
                  <Link href={item.href} className="focus-ring rounded hover:text-text-primary">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={cn(last && "font-medium text-text-primary")}>
                    {item.label}
                  </span>
                )}
              </li>
              {!last && <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-text-tertiary" />}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
