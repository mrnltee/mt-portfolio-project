"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  exact?: boolean;
}

/** Consumes @mt/tokens: text-text-secondary default, text-action-primary active/hover. */
export function NavLink({ href, exact = false, className, children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const path = href.toString();
  const isActive = exact ? pathname === path : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "focus-ring relative rounded-field px-1 py-1 text-body-sm font-medium text-text-secondary transition-colors duration-normal hover:text-text-primary",
        isActive && "text-action-primary hover:text-action-primary",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
