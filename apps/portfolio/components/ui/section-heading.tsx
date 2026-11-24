import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  id?: string;
  /** Use "h1" when this is the page's top heading (e.g. /case-studies). */
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, description, className, align = "left", id, as: Heading = "h2" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="mb-3 text-overline uppercase text-text-link">{eyebrow}</p>}
      <Heading id={id} className={cn("text-balance font-display font-bold text-text-primary", Heading === "h1" ? "text-h1" : "text-h2")}>
        {title}
      </Heading>
      {description && <p className="mt-3 text-body-lg text-text-secondary">{description}</p>}
    </div>
  );
}
