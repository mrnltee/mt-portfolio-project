import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Card, CardBody } from "@/components/ui/card";
import { Tag, FilterTag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

function Specimen({
  title,
  tokenNote,
  children,
}: {
  title: string;
  tokenNote: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border-default py-10 first:border-t-0 first:pt-0">
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-display text-h4 font-semibold text-text-primary">{title}</h3>
        <code className="text-caption text-text-secondary">{tokenNote}</code>
      </div>
      {children}
    </div>
  );
}

function StateLabel({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-center text-caption text-text-secondary">{children}</p>;
}

const focusPreviewStyle: React.CSSProperties = {
  outline: "2px solid var(--mt-color-focus-ring)",
  outlineOffset: "2px",
};

function ButtonStates({ variant }: { variant: "primary" | "secondary" | "ghost" }) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      <div>
        <Button variant={variant}>Label</Button>
        <StateLabel>Default</StateLabel>
      </div>
      <div>
        <span
          className={cn(buttonVariants({ variant, size: "md" }))}
          style={
            variant === "primary"
              ? { backgroundColor: "var(--mt-color-action-primary-hover)" }
              : { backgroundColor: "var(--mt-color-background-surface-subtle)" }
          }
        >
          Label
        </span>
        <StateLabel>Hover</StateLabel>
      </div>
      <div>
        <span className={cn(buttonVariants({ variant, size: "md" }))} style={focusPreviewStyle}>
          Label
        </span>
        <StateLabel>Focus</StateLabel>
      </div>
      <div>
        <Button variant={variant} disabled>
          Label
        </Button>
        <StateLabel>Disabled</StateLabel>
      </div>
    </div>
  );
}

export function ComponentSection() {
  return (
    <div>
      <Specimen title="Button — primary" tokenNote="bg-action-primary · hover:bg-action-primary-hover · rounded-control">
        <ButtonStates variant="primary" />
      </Specimen>
      <Specimen title="Button — secondary" tokenNote="border-border-default · bg-background-surface · hover:bg-background-surface-subtle">
        <ButtonStates variant="secondary" />
      </Specimen>
      <Specimen title="Button — ghost" tokenNote="hover:bg-background-surface-subtle">
        <ButtonStates variant="ghost" />
      </Specimen>

      <Specimen title="Input" tokenNote="border-border-default · focus-ring · aria-invalid:border-feedback-error">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="ds-input-default">Default</Label>
            <Input id="ds-input-default" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="ds-input-focus">Focus</Label>
            <Input id="ds-input-focus" placeholder="you@example.com" style={focusPreviewStyle} />
          </div>
          <div>
            <Label htmlFor="ds-input-error">Error</Label>
            <Input id="ds-input-error" defaultValue="not-an-email" aria-invalid="true" />
          </div>
          <div>
            <Label htmlFor="ds-input-disabled">Disabled</Label>
            <Input id="ds-input-disabled" placeholder="Disabled" disabled />
          </div>
        </div>
      </Specimen>

      <Specimen title="Card" tokenNote="bg-background-surface · border-border-default · shadow-raised → shadow-overlay">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Card>
              <CardBody>
                <p className="text-body-sm text-text-secondary">Default elevation</p>
              </CardBody>
            </Card>
            <StateLabel>Default</StateLabel>
          </div>
          <div>
            <Card className="shadow-modal border-border-strong">
              <CardBody>
                <p className="text-body-sm text-text-secondary">Hovered elevation</p>
              </CardBody>
            </Card>
            <StateLabel>Hover</StateLabel>
          </div>
        </div>
      </Specimen>

      <Specimen title="Tag" tokenNote="bg-background-surface-subtle / bg-action-accent-subtle · text-overline">
        <div className="flex flex-wrap items-center gap-3">
          <Tag variant="neutral">Neutral</Tag>
          <Tag variant="accent">Accent</Tag>
          <FilterTag active={false}>Filter — default</FilterTag>
          <FilterTag active>Filter — active</FilterTag>
        </div>
      </Specimen>

      <Specimen title="Nav link" tokenNote="text-text-secondary → text-action-primary (active) · aria-current">
        <div className="flex flex-wrap items-center gap-6">
          <span className="text-body-sm font-medium text-text-secondary">Default</span>
          <span className="text-body-sm font-medium text-text-primary">Hover</span>
          <span className="text-body-sm font-medium text-action-primary" aria-current="page">
            Active
          </span>
        </div>
      </Specimen>
    </div>
  );
}
