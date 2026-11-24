import { Card, CardBody } from "@/components/ui/card";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { WHAT_I_BRING } from "@/lib/content";

/** Three working principles as numbered cards. Shared by the home page and About. */
export function WhatIBring({ headingId = "what-i-bring-heading", eyebrow = true }: { headingId?: string; eyebrow?: boolean }) {
  return (
    <div>
      {eyebrow && <p className="mb-3 text-overline uppercase text-text-link">How I work</p>}
      <h2 id={headingId} className="font-display text-h2 font-bold text-text-primary">
        What I bring
      </h2>
      <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {WHAT_I_BRING.map((item, i) => (
          <RevealOnScroll as="li" key={item.title} delay={i * 0.06} className="h-full">
            <Card className="h-full">
              <CardBody className="flex h-full flex-col gap-3 p-7">
                <span aria-hidden="true" className="font-mono text-caption text-text-link">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-balance font-display text-h4 font-semibold text-text-primary">{item.title}</h3>
                <p className="text-body-sm text-text-secondary">{item.body}</p>
              </CardBody>
            </Card>
          </RevealOnScroll>
        ))}
      </ol>
    </div>
  );
}
