import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Indeterminate loading spinner. Announces itself via a visually-hidden label. */
export function Spinner({ className, label = "Loading" }: { className?: string; label?: string }) {
  return (
    <span role="status" aria-live="polite" className="inline-flex">
      <Loader2 aria-hidden="true" className={cn("h-5 w-5 animate-spin text-action-primary", className)} />
      <span className="sr-only">{label}</span>
    </span>
  );
}
