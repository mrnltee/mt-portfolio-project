"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  Bell,
  Settings,
  Plus,
  MoreHorizontal,
  Pencil,
  Copy,
  Trash2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  Inbox,
  Home,
  Search,
  Star,
  Heart,
  Download,
  Check,
  ChevronRight,
  Layers,
  Palette,
  Mail,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ButtonGroup } from "@/components/ui/button-group";
import { SegmentedControl } from "@/components/ui/segmented-control";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/toolbar";
import { Input, Label, Textarea } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { SearchField } from "@/components/ui/search-field";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Combobox } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio } from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { DatePicker } from "@/components/ui/date-picker";
import { FileUpload } from "@/components/ui/file-upload";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { Stepper } from "@/components/ui/stepper";
import { SideNav } from "@/components/ui/side-nav";
import { LinkList } from "@/components/ui/link-list";
import { Alert } from "@/components/ui/alert";
import { Banner } from "@/components/ui/banner";
import { Toaster, useToast } from "@/components/ui/toast";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Card, CardBody } from "@/components/ui/card";
import { Tag, FilterTag } from "@/components/ui/tag";
import { MaterialIcon } from "@/components/ui/material-icon";
import { cn } from "@/lib/utils";
import { slugify } from "./component-toc";

const focusPreviewStyle: CSSProperties = { outline: "2px solid var(--mt-color-focus-ring)", outlineOffset: "2px" };

function Category({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section id={slugify(title)} className="scroll-mt-24 border-t border-border-default pt-10 first:border-t-0 first:pt-0">
      <h3 className="text-overline text-action-primary">{title}</h3>
      <div className="mt-1 divide-y divide-border-default">{children}</div>
    </section>
  );
}

function Demo({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div id={slugify(title)} className="scroll-mt-24 py-8">
      <div className="mb-4 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
        <h4 className="font-display text-h4 font-semibold text-text-primary">{title}</h4>
        {note && <code className="text-caption text-text-secondary">{note}</code>}
      </div>
      <div className="flex flex-wrap items-start gap-x-10 gap-y-6">{children}</div>
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

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button size="sm" variant="secondary" onClick={() => toast({ title: "Saved", description: "Your changes were saved.", variant: "success" })}>
        Show success
      </Button>
      <Button size="sm" variant="secondary" onClick={() => toast({ title: "Upload failed", description: "Please try again.", variant: "error" })}>
        Show error
      </Button>
    </div>
  );
}

const LUCIDE = [Home, Search, Settings, Bell, Heart, Star, Download, Trash2, Plus, Inbox, Check, ChevronRight];
const MATERIAL = ["home", "search", "settings", "notifications", "favorite", "star", "download", "delete", "add", "inbox", "done", "chevron_right"];
const TOOLS = [
  { label: "Figma", value: "figma" },
  { label: "Sketch", value: "sketch" },
  { label: "Framer", value: "framer" },
  { label: "Adobe XD", value: "xd" },
  { label: "Penpot", value: "penpot" },
];

export function ComponentLibrary() {
  const [seg, setSeg] = useState("day");
  const [page, setPage] = useState(2);
  const [combo, setCombo] = useState<string>();
  const [date, setDate] = useState<Date>();

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-4">
        {/* ---------------- BUTTONS & ACTIONS ---------------- */}
        <Category title="Buttons & actions">
          <Demo title="Button" note="primary · secondary · tertiary · danger · ghost · link">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Default</Button>
                <span className={cn(buttonVariants({ variant: "primary", size: "md" }))} style={{ backgroundColor: "var(--mt-color-action-primary-hover)" }}>
                  Hover
                </span>
                <span className={cn(buttonVariants({ variant: "primary", size: "md" }))} style={focusPreviewStyle}>
                  Focus
                </span>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </Demo>

          <Demo title="Icon button" note="ghost / secondary / primary · requires aria-label">
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
          </Demo>

          <Demo title="Button group" note="Joined related actions">
            <ButtonGroup>
              <Button variant="ghost" size="sm">Day</Button>
              <Button variant="ghost" size="sm">Week</Button>
              <Button variant="ghost" size="sm">Month</Button>
            </ButtonGroup>
          </Demo>

          <Demo title="Segmented control" note="Compact single-select (radiogroup)">
            <SegmentedControl
              aria-label="Range"
              value={seg}
              onValueChange={setSeg}
              options={[
                { label: "Day", value: "day" },
                { label: "Week", value: "week" },
                { label: "Month", value: "month" },
              ]}
            />
          </Demo>

          <Demo title="Menu (dropdown)" note="@radix-ui/react-dropdown-menu">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Manage</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Pencil className="h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-feedback-error">
                  <Trash2 className="h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Demo>

          <Demo title="Toolbar" note="@radix-ui/react-toolbar · roving focus">
            <Toolbar aria-label="Formatting">
              <ToolbarButton aria-label="Bold"><Bold className="h-4 w-4" /></ToolbarButton>
              <ToolbarButton aria-label="Italic"><Italic className="h-4 w-4" /></ToolbarButton>
              <ToolbarButton aria-label="Underline"><Underline className="h-4 w-4" /></ToolbarButton>
              <ToolbarSeparator />
              <ToolbarButton aria-label="Align left"><AlignLeft className="h-4 w-4" /></ToolbarButton>
              <ToolbarButton aria-label="Align center"><AlignCenter className="h-4 w-4" /></ToolbarButton>
            </Toolbar>
          </Demo>
        </Category>

        {/* ---------------- FORM CONTROLS ---------------- */}
        <Category title="Input & form controls">
          <Demo title="Text input" note="border-border-default · focus-ring · aria-invalid:border-feedback-error">
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          </Demo>

          <Demo title="Textarea">
            <Textarea placeholder="Write a message…" className="w-full max-w-md" />
          </Demo>

          <Demo title="Form field" note="label + hint + error + required">
            <FormField label="Work email" hint="Used only for role inquiries." required className="w-64">
              {(p) => <Input placeholder="you@company.com" {...p} />}
            </FormField>
            <FormField label="Work email" error="Enter a valid email address." className="w-64">
              {(p) => <Input defaultValue="not-an-email" {...p} />}
            </FormField>
          </Demo>

          <Demo title="Search field">
            <SearchField placeholder="Search…" className="w-64" />
          </Demo>

          <Demo title="Select" note="@radix-ui/react-select">
            <Select defaultValue="figma">
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Choose a tool" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="figma">Figma</SelectItem>
                <SelectItem value="sketch">Sketch</SelectItem>
                <SelectItem value="framer">Framer</SelectItem>
              </SelectContent>
            </Select>
          </Demo>

          <Demo title="Combobox / Autocomplete" note="Radix Popover + cmdk">
            <Combobox className="w-64" options={TOOLS} value={combo} onValueChange={setCombo} placeholder="Select a tool" />
          </Demo>

          <Demo title="Checkbox · Radio · Switch">
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
          </Demo>

          <Demo title="Slider" note="@radix-ui/react-slider">
            <Slider defaultValue={[40]} max={100} step={1} className="w-64" />
          </Demo>

          <Demo title="Date picker" note="react-day-picker in a Popover">
            <DatePicker value={date} onChange={setDate} />
          </Demo>

          <Demo title="File upload" note="Click or drag & drop">
            <FileUpload className="w-full max-w-md" multiple />
          </Demo>
        </Category>

        {/* ---------------- NAVIGATION ---------------- */}
        <Category title="Navigation">
          <Demo title="Nav link" note="text-text-secondary → text-action-primary (active) · aria-current">
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-body-sm font-medium text-text-secondary">Default</span>
              <span className="text-body-sm font-medium text-text-primary">Hover</span>
              <span className="text-body-sm font-medium text-action-primary" aria-current="page">Active</span>
            </div>
          </Demo>

          <Demo title="Tabs" note="@radix-ui/react-tabs">
            <Tabs defaultValue="overview" className="w-full max-w-md">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specs">Specs</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">Overview panel content.</TabsContent>
              <TabsContent value="specs">Specs panel content.</TabsContent>
              <TabsContent value="reviews">Reviews panel content.</TabsContent>
            </Tabs>
          </Demo>

          <Demo title="Breadcrumb">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Case studies", href: "/case-studies" }, { label: "Atlas — Design System" }]} />
          </Demo>

          <Demo title="Pagination">
            <Pagination page={page} pageCount={5} onPageChange={setPage} />
          </Demo>

          <Demo title="Stepper">
            <Stepper steps={[{ label: "Account" }, { label: "Profile" }, { label: "Review" }]} current={1} />
          </Demo>

          <Demo title="Side nav" note="Highlights the current route">
            <SideNav
              items={[
                { label: "Home", href: "/", icon: Home },
                { label: "Case studies", href: "/case-studies", icon: Layers },
                { label: "Design system", href: "/design-system", icon: Palette },
                { label: "Contact", href: "/contact", icon: Mail },
              ]}
            />
          </Demo>

          <Demo title="Link list">
            <LinkList
              className="w-full max-w-md"
              items={[
                { label: "Case studies", href: "/case-studies", description: "Full project write-ups" },
                { label: "Design system", href: "/design-system", description: "Tokens & components" },
                { label: "Contact", href: "/contact", description: "Get in touch" },
              ]}
            />
          </Demo>
        </Category>

        {/* ---------------- FEEDBACK & STATUS ---------------- */}
        <Category title="Feedback & status">
          <Demo title="Inline alert" note="role=alert · feedback surface + icon per status">
            <div className="flex w-full max-w-lg flex-col gap-3">
              <Alert variant="info" title="Heads up">This is an informational message.</Alert>
              <Alert variant="success" title="Saved">Your changes were saved.</Alert>
              <Alert variant="warning" title="Careful">This action needs review.</Alert>
              <Alert variant="error" title="Something went wrong">Please try again.</Alert>
            </div>
          </Demo>

          <Demo title="Banner" note="Full-width contextual message">
            <div className="w-full max-w-xl overflow-hidden rounded-card">
              <Banner variant="info" action={<Button size="sm" variant="tertiary">Review</Button>}>
                A new design token release is available.
              </Banner>
            </div>
          </Demo>

          <Demo title="Toast / Snackbar" note="@radix-ui/react-toast · mount <Toaster> once">
            <Toaster>
              <ToastDemo />
            </Toaster>
          </Demo>

          <Demo title="Progress · Spinner · Skeleton">
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
          </Demo>

          <Demo title="Empty state">
            <EmptyState
              className="w-full max-w-md"
              icon={<Inbox className="h-6 w-6" />}
              title="No projects yet"
              description="When you add case studies they'll appear here."
              action={<Button size="sm">Add a project</Button>}
            />
          </Demo>

          <Demo title="Badge" note="Status label (distinct from Tag)">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Neutral</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </div>
          </Demo>

          <Demo title="Tooltip" note="@radix-ui/react-tooltip">
            <Tooltip content="More options">
              <IconButton aria-label="More options" variant="secondary">
                <MoreHorizontal className="h-5 w-5" />
              </IconButton>
            </Tooltip>
          </Demo>
        </Category>

        {/* ---------------- CONTENT & LAYOUT ---------------- */}
        <Category title="Content & layout">
          <Demo title="Card" note="bg-background-surface · border-border-default · shadow-raised → shadow-overlay">
            <div className="grid w-full grid-cols-1 gap-6 sm:max-w-xl sm:grid-cols-2">
              <Card>
                <CardBody>
                  <p className="text-body-sm text-text-secondary">Default elevation</p>
                </CardBody>
              </Card>
              <Card className="border-border-strong shadow-modal">
                <CardBody>
                  <p className="text-body-sm text-text-secondary">Hovered elevation</p>
                </CardBody>
              </Card>
            </div>
          </Demo>

          <Demo title="Tag" note="bg-background-surface-subtle / bg-action-accent-subtle · text-overline">
            <div className="flex flex-wrap items-center gap-3">
              <Tag variant="neutral">Neutral</Tag>
              <Tag variant="accent">Accent</Tag>
              <FilterTag active={false}>Filter — default</FilterTag>
              <FilterTag active>Filter — active</FilterTag>
            </div>
          </Demo>
        </Category>

        {/* ---------------- ICONOGRAPHY ---------------- */}
        <Category title="Iconography">
          <Demo title="Lucide" note="lucide-react — generic set">
            <div className="flex flex-wrap items-center gap-4 text-text-primary">
              {LUCIDE.map((Icon, i) => (
                <Icon key={i} className="h-5 w-5" aria-hidden="true" />
              ))}
            </div>
          </Demo>

          <Demo title="Material" note="material-symbols (outlined)">
            <div className="flex flex-wrap items-center gap-4 text-text-primary" style={{ fontSize: 24 }}>
              {MATERIAL.map((n) => (
                <MaterialIcon key={n} name={n} />
              ))}
            </div>
          </Demo>
        </Category>
      </div>
    </TooltipProvider>
  );
}
