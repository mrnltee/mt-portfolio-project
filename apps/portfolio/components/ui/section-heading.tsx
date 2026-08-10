import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  id?: string;
}

export function SectionHeading({ eyebrow, title, description, className, align = "left", id }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="mb-3 text-overline text-action-primary">{eyebrow}</p>}
      <h2 id={id} className="font-display text-h2 font-bold text-text-primary">
        {title}
      </h2>
      {description && <p className="mt-3 text-body-lg text-text-secondary">{description}</p>}
    </div>
  );
}
