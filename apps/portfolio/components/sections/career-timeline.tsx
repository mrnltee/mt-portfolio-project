import { Plus } from "lucide-react";
import { EMPLOYERS, type Employer } from "@/lib/content";

const plate = "grid h-14 w-24 shrink-0 place-items-center rounded-card px-4";

function Node({ e }: { e: Employer }) {
  return (
    <div className="flex items-center gap-4 lg:flex-col lg:gap-3 lg:text-center">
      <div className={`${plate} bg-background-logo-plate ring-1 ring-border-default`}>
        {e.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={e.logo} alt="" className="max-h-6 w-auto max-w-full object-contain [filter:brightness(0)_invert(1)]" />
        ) : (
          <span aria-hidden="true" className="font-display text-body font-semibold lowercase text-text-on-logo-plate">
            {e.wordmark}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-body-sm font-medium text-text-primary">{e.name}</p>
        <p className="mt-0.5 text-caption text-text-secondary">{e.role}</p>
      </div>
    </div>
  );
}

/**
 * Oldest → newest, ending with an open slot. Vertical below lg; a horizontal rail from lg,
 * where eight 96px nodes fit the About column (below lg they overflowed the page).
 */
export function CareerTimeline() {
  return (
    <div className="relative mt-8">
      <span aria-hidden className="absolute bottom-2 left-12 top-2 w-px bg-border-default lg:bottom-auto lg:left-0 lg:right-0 lg:top-7 lg:h-px lg:w-auto" />
      <ol className="relative flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between lg:gap-2">
        {EMPLOYERS.map((e) => (
          <li key={e.name} className="lg:flex-1">
            <Node e={e} />
          </li>
        ))}
        <li className="lg:flex-1">
          <div className="flex items-center gap-4 lg:flex-col lg:gap-3 lg:text-center">
            <div className={`${plate} border-2 border-dashed border-action-primary/50 bg-background-surface`}>
              <Plus className="h-icon-md w-icon-md text-text-link" aria-hidden="true" />
            </div>
            <div>
              <p className="text-body-sm font-medium text-text-link">(your company)</p>
              <p className="mt-0.5 text-caption text-text-tertiary">2026</p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
}
