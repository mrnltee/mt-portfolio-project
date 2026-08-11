import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/** Text input with a leading search icon (native type="search"). */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(({ className, ...props }, ref) => (
  <div className="relative">
    <Search
      aria-hidden="true"
      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
    />
    <input
      ref={ref}
      type="search"
      className={cn(
        "focus-ring w-full rounded-field border border-border-default bg-background-surface py-2.5 pl-9 pr-3.5 text-body text-text-primary transition-colors placeholder:text-text-tertiary hover:border-border-strong",
        className,
      )}
      {...props}
    />
  </div>
));
SearchField.displayName = "SearchField";
