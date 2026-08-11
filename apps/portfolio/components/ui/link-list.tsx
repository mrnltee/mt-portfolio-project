import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LinkListItem {
  label: string;
  href: string;
  description?: string;
}

/** A bordered list of navigational links (e.g. a settings or docs index). */
export function LinkList({ items, className }: { items: LinkListItem[]; className?: string }) {
  return (
    <ul className={cn("divide-y divide-border-default overflow-hidden rounded-card border border-border-default", className)}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="focus-ring flex items-center justify-between gap-3 px-4 py-3 hover:bg-background-surface-subtle"
          >
            <span className="min-w-0">
              <span className="block text-body-sm font-medium text-text-primary">{item.label}</span>
              {item.description && <span className="block text-caption text-text-secondary">{item.description}</span>}
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-text-tertiary" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
