import { Container } from "@/components/layout/container";
import { EMPLOYERS } from "@/lib/content";

/**
 * Employer logos on a dark plate, early on the home page as proof of experience.
 * Logos are rendered white (the files are mixed colour), matching the About timeline.
 */
export function TeamsStrip() {
  return (
    <section aria-labelledby="teams-heading" className="pt-3 sm:pt-5">
      <Container>
        <div className="flex flex-col gap-5 rounded-container bg-background-logo-plate px-6 py-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <h2 id="teams-heading" className="shrink-0 text-overline uppercase text-text-on-logo-plate lg:max-w-[9rem]">
            Teams I&apos;ve built things with
          </h2>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-5 lg:flex-nowrap lg:justify-between lg:gap-x-6">
            {EMPLOYERS.map((e) => (
              <li key={e.name} className="flex h-7 items-center">
                {e.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={e.logo} alt={e.name} className="h-full max-h-6 w-auto max-w-[7.5rem] object-contain opacity-90 [filter:brightness(0)_invert(1)]" />
                ) : (
                  <span className="font-display text-body font-semibold lowercase text-text-on-logo-plate">
                    {e.wordmark}
                    <span className="sr-only"> ({e.name})</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
