import { Plus } from "lucide-react";

type Employer = {
  name: string;
  /** White-on-transparent asset in /public/images/employers. Omit to show a monogram. */
  logo?: string;
  mono?: string;
  /** Job title — revealed on hover/focus (desktop) or shown inline (mobile). */
  role?: string;
  period?: string;
  placeholder?: boolean;
};

// Listed oldest → newest, ending in a placeholder for the next chapter (this year).
const EMPLOYERS: Employer[] = [
  { name: "Medilink", logo: "/images/employers/medilink.png", role: "Web Designer" },
  { name: "TalentSource Inc.", logo: "/images/employers/talentsource.png", role: "Jr. Graphic Designer" },
  { name: "MobileGroup Inc.", logo: "/images/employers/mobilegroup.png", role: "UI/UX Designer" },
  { name: "HelloMedia Inc.", mono: "hm", role: "UI/UX Designer" }, // add /images/employers/hellomedia.png, then set `logo`
  { name: "Affinity Express Inc.", logo: "/images/employers/affinityx.png", role: "Web Developer (WordPress)" },
  { name: "IBM", logo: "/images/employers/ibm.svg", role: "User Interface Developer" },
  { name: "Actimai Philippines, Inc.", logo: "/images/employers/actimai.svg", role: "UI/UX Designer" },
  { name: "(your company)", period: "2026", placeholder: true },
];

function Node({ e }: { e: Employer }) {
  const revealable = !e.placeholder && Boolean(e.role);
  return (
    <div
      tabIndex={revealable ? 0 : undefined}
      className="group/node focus-ring relative flex items-center gap-4 rounded-card sm:flex-col sm:gap-3 sm:text-center"
    >
      <div
        className={
          e.placeholder
            ? "grid h-14 w-24 shrink-0 place-items-center rounded-card border-2 border-dashed border-action-primary/50 bg-background-surface"
            : "grid h-14 w-24 shrink-0 place-items-center rounded-card bg-[#141519] px-4 shadow-sm ring-1 ring-white/10 dark:bg-[#24262e] dark:ring-white/15"
        }
      >
        {e.placeholder ? (
          <Plus className="h-5 w-5 text-action-primary" aria-hidden="true" />
        ) : e.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={e.logo}
            alt={`${e.name} logo`}
            className="max-h-6 w-auto max-w-full object-contain [filter:brightness(0)_invert(1)]"
          />
        ) : (
          <span className="font-display text-body font-semibold lowercase text-white">{e.mono ?? e.name[0]}</span>
        )}
      </div>

      <div className="min-w-0">
        <p className={`text-body-sm font-medium ${e.placeholder ? "text-action-primary" : "text-text-primary"}`}>
          {e.name}
        </p>
        {e.period && <p className="text-caption text-text-tertiary">{e.period}</p>}

        {revealable && (
          // Mobile: always shown. Desktop (sm+): collapsed, revealed on node hover/focus.
          <p className="mt-1 text-caption text-text-secondary sm:mt-1.5 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:transition-all sm:duration-200 sm:group-hover/node:max-h-16 sm:group-hover/node:opacity-100 sm:group-focus/node:max-h-16 sm:group-focus/node:opacity-100">
            {e.role}
          </p>
        )}
      </div>
    </div>
  );
}

export function CareerTimeline() {
  return (
    <div className="relative mt-8">
      {/* Rail: vertical on mobile (through the chip column), horizontal on desktop (chip mid-height). */}
      <span
        aria-hidden
        className="absolute left-12 top-2 bottom-2 w-px bg-border-default sm:left-0 sm:right-0 sm:top-7 sm:bottom-auto sm:h-px sm:w-auto"
      />
      <ol className="relative flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
        {EMPLOYERS.map((e) => (
          <li key={e.name} className="sm:flex-1">
            <Node e={e} />
          </li>
        ))}
      </ol>
    </div>
  );
}
