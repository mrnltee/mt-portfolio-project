import { Mail } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { LinkedInIcon } from "@/components/ui/icons";
import { CV_URL, EMAIL, LINKEDIN_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The closing call to action: who to contact and how, with the address visible (a mailto
 * link alone fails on machines without a mail client). Used at the end of the home page,
 * About and every case study.
 */
export function ContactBand({ className, headingLevel = "h2" }: { className?: string; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <section aria-labelledby="contact-band-heading" className={cn("py-12 sm:py-16", className)}>
      <Container>
        <div className="flex flex-col gap-8 rounded-container bg-background-inverse p-7 text-text-inverse sm:p-10 lg:flex-row lg:items-center lg:gap-12 lg:p-14">
          <Avatar src="/mernel-avatar-head.png" alt="" size={96} className="h-20 w-20 shrink-0 bg-background-surface-subtle sm:h-24 sm:w-24" />
          <div className="flex-1">
            <p className="text-overline uppercase text-text-inverse/80">Let&apos;s talk</p>
            <Heading id="contact-band-heading" className="mt-2 text-balance font-display text-h2 font-bold text-text-inverse">
              Looking for a product designer?
            </Heading>
            <p className="mt-3 max-w-xl text-body-lg text-text-inverse/80">
              Open to full-time and contract product design roles, remote or relocation. I usually reply within a couple of days.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <a href={`mailto:${EMAIL}`} className="focus-ring inline-flex items-center gap-2.5 rounded-field font-display text-h4 font-semibold text-text-inverse underline-offset-4 hover:underline">
              <Mail className="h-icon-md w-icon-md" aria-hidden="true" />
              {EMAIL}
            </a>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`mailto:${EMAIL}`}>Email me</ButtonLink>
              <ButtonLink href={CV_URL} download variant="on-dark">
                Download CV
              </ButtonLink>
              <ButtonLink href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" variant="on-dark">
                <LinkedInIcon className="h-icon-sm w-icon-sm" />
                LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
