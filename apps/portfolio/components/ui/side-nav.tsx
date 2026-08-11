"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

export interface SideNavItem {
  label: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
}

/** Vertical sidebar navigation. Marks the item matching the current route active. */
export function SideNav({ items, className }: { items: SideNavItem[]; className?: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Sidebar" className={cn("flex w-56 flex-col gap-1", className)}>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "focus-ring flex items-center gap-2.5 rounded-field px-3 py-2 text-body-sm font-medium transition-colors",
              active
                ? "bg-action-accent-subtle text-action-on-accent-subtle"
                : "text-text-secondary hover:bg-background-surface-subtle hover:text-text-primary",
            )}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
