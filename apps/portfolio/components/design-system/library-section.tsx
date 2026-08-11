import type { ReactNode } from "react";
import { Bell, Home, Settings, Heart, Star, Plus, Trash2, Download, Inbox, Search, Check, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio } from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";
import { SearchField } from "@/components/ui/search-field";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/ui/empty-state";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

function Group({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className="border-t border-border-default py-10 first:border-t-0 first:pt-0">
      <h3 className="font-display text-h4 font-semibold text-text-primary">{title}</h3>
      {note && <p className="mt-1 text-caption text-text-secondary">{note}</p>}
      <div className="mt-5 flex flex-wrap items-start gap-x-10 gap-y-6">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <span className="text-caption text-text-secondary">{label}</span>
    </div>
  );
}

const LUCIDE = [Home, Search, Settings, Bell, Heart, Star, Download, Trash2, Plus, Inbox, Check, ChevronRight];

export function LibrarySection() {
  return (
    <div>
      {/* INPUT FORM CONTROLS */}
      <Group title="Form controls" note="Checkbox · Radio · Switch · Search field · Form field (label + hint + error + required)">
        <Field label="Checkbox">
          <div className="flex items-center gap-3">
            <Checkbox aria-label="Unchecked" />
            <Checkbox aria-label="Checked" defaultChecked />
            <Checkbox aria-label="Disabled" disabled />
          </div>
        </Field>
        <Field label="Radio">
          <div className="flex items-center gap-3">
            <Radio name="ds-radio" aria-label="One" defaultChecked />
            <Radio name="ds-radio" aria-label="Two" />
            <Radio name="ds-radio" aria-label="Disabled" disabled />
          </div>
        </Field>
        <Field label="Switch (off / on)">
          <div className="flex items-center gap-3">
            <Switch aria-label="Off" />
            <Switch aria-label="On" defaultChecked />
          </div>
        </Field>
        <Field label="Search field">
          <SearchField placeholder="Search…" className="w-56" />
        </Field>
        <FormField label="Work email" hint="Used only for role inquiries." required className="w-64">
          {(p) => <Input placeholder="you@company.com" {...p} />}
        </FormField>
        <FormField label="Work email" error="Enter a valid email address." className="w-64">
          {(p) => <Input defaultValue="not-an-email" {...p} />}
        </FormField>
      </Group>

      {/* BUTTONS */}
      <Group title="Icon button" note="Icon-only button (ghost / secondary / primary) — requires an aria-label">
        <Field label="Ghost">
          <IconButton aria-label="Notifications" variant="ghost">
            <Bell className="h-5 w-5" />
          </IconButton>
        </Field>
        <Field label="Secondary">
          <IconButton aria-label="Settings" variant="secondary">
            <Settings className="h-5 w-5" />
          </IconButton>
        </Field>
        <Field label="Primary">
          <IconButton aria-label="Add" variant="primary">
            <Plus className="h-5 w-5" />
          </IconButton>
        </Field>
      </Group>

      {/* FEEDBACK & STATUSES */}
      <Group title="Badge" note="bg-feedback-*-surface · text-feedback-on-* · rounded-pill">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Neutral</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </Group>

      <Group title="Inline alert" note="role=alert · semantic icon + feedback surface per status">
        <div className="flex w-full max-w-lg flex-col gap-3">
          <Alert variant="info" title="Heads up">This is an informational message.</Alert>
          <Alert variant="success" title="Saved">Your changes were saved.</Alert>
          <Alert variant="warning" title="Careful">This action needs review.</Alert>
          <Alert variant="error" title="Something went wrong">Please try again.</Alert>
        </div>
      </Group>

      <Group title="Progress · Spinner · Skeleton" note="Determinate + indeterminate loading, and content placeholders">
        <Field label="Progress (60%)">
          <Progress value={60} label="Upload progress" className="w-56" />
        </Field>
        <Field label="Spinner">
          <Spinner />
        </Field>
        <Field label="Skeleton">
          <div className="flex w-56 flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </Field>
      </Group>

      <Group title="Empty state" note="Icon + copy + optional action, for no-results / errors">
        <EmptyState
          className="w-full max-w-md"
          icon={<Inbox className="h-6 w-6" />}
          title="No projects yet"
          description="When you add case studies they'll appear here."
          action={<Button size="sm">Add a project</Button>}
        />
      </Group>

      {/* NAVIGATION */}
      <Group title="Breadcrumb" note="nav[aria-label=Breadcrumb] · aria-current on the last item">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Case studies", href: "/case-studies" }, { label: "Atlas — Design System" }]} />
      </Group>

      {/* ICONOGRAPHY */}
      <Group title="Iconography" note="Lucide (installed). Material icons pending a package choice — see note.">
        <div className="flex flex-wrap items-center gap-4 text-text-primary">
          {LUCIDE.map((Icon, i) => (
            <Icon key={i} className="h-5 w-5" aria-hidden="true" />
          ))}
        </div>
      </Group>
    </div>
  );
}
