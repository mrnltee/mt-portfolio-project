import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { TeamsStrip } from "@/components/sections/teams-strip";
import { WorkBand } from "@/components/sections/work-band";
import { WhatIBring } from "@/components/sections/what-i-bring";
import { ContactBand } from "@/components/sections/contact-band";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { caseStudies } from "@/lib/projects-data";

export default function Home() {
  const featured = caseStudies.filter((p) => p.featured && p.band);

  return (
    <>
      <Hero />
      <TeamsStrip />

      <section aria-labelledby="selected-work-heading" className="pt-20 sm:pt-28">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-overline uppercase text-text-link">Selected work</p>
              <h2 id="selected-work-heading" className="text-balance font-display text-h2 font-bold text-text-primary">
                Three projects, from problem to shipped
              </h2>
            </div>
            <Link href="/case-studies" className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-field font-display text-body-sm font-semibold text-text-link underline-offset-4 hover:underline">
              See all {caseStudies.length} projects <ArrowRight className="h-icon-sm w-icon-sm" aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-6">
            {featured.map((project) => (
              <RevealOnScroll key={project.slug}>
                <WorkBand project={project} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="what-i-bring-heading" className="pt-20 sm:pt-28">
        <Container>
          <WhatIBring />
        </Container>
      </section>

      <ContactBand className="pb-16 pt-20 sm:pb-24 sm:pt-28" />
    </>
  );
}
