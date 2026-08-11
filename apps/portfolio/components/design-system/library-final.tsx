"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, Home, Layers, Palette, Mail } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { SideNav } from "@/components/ui/side-nav";
import { DatePicker } from "@/components/ui/date-picker";
import { FileUpload } from "@/components/ui/file-upload";
import { Stepper } from "@/components/ui/stepper";
import { LinkList } from "@/components/ui/link-list";
import { ButtonGroup } from "@/components/ui/button-group";
import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/toolbar";
import { Toaster, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

function Group({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className="border-t border-border-default py-10">
      <h3 className="font-display text-h4 font-semibold text-text-primary">{title}</h3>
      {note && <p className="mt-1 text-caption text-text-secondary">{note}</p>}
      <div className="mt-5 flex flex-wrap items-start gap-x-10 gap-y-6">{children}</div>
    </div>
  );
}

const TOOLS = [
  { label: "Figma", value: "figma" },
  { label: "Sketch", value: "sketch" },
  { label: "Framer", value: "framer" },
  { label: "Adobe XD", value: "xd" },
  { label: "Penpot", value: "penpot" },
];

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

export function LibraryFinal() {
  const [combo, setCombo] = useState<string>();
  const [date, setDate] = useState<Date>();

  return (
    <div>
      <Group title="Combobox / Autocomplete" note="Radix Popover + cmdk — type to filter">
        <Combobox className="w-64" options={TOOLS} value={combo} onValueChange={setCombo} placeholder="Select a tool" />
      </Group>

      <Group title="Date picker" note="react-day-picker in a Popover">
        <DatePicker value={date} onChange={setDate} />
      </Group>

      <Group title="File upload" note="Click or drag & drop">
        <FileUpload className="w-full max-w-md" multiple />
      </Group>

      <Group title="Toast / Snackbar" note="@radix-ui/react-toast — mount <Toaster> once (here it's local to the demo)">
        <Toaster>
          <ToastDemo />
        </Toaster>
      </Group>

      <Group title="Stepper" note="Progress through a multi-step flow">
        <Stepper steps={[{ label: "Account" }, { label: "Profile" }, { label: "Review" }]} current={1} />
      </Group>

      <Group title="Toolbar" note="@radix-ui/react-toolbar — roving focus">
        <Toolbar aria-label="Formatting">
          <ToolbarButton aria-label="Bold">
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton aria-label="Italic">
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton aria-label="Underline">
            <Underline className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton aria-label="Align center">
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>
        </Toolbar>
      </Group>

      <Group title="Button group" note="Joined related actions">
        <ButtonGroup>
          <Button variant="ghost" size="sm">
            Day
          </Button>
          <Button variant="ghost" size="sm">
            Week
          </Button>
          <Button variant="ghost" size="sm">
            Month
          </Button>
        </ButtonGroup>
      </Group>

      <Group title="Side nav" note="Vertical navigation — highlights the current route">
        <SideNav
          items={[
            { label: "Home", href: "/", icon: Home },
            { label: "Case studies", href: "/case-studies", icon: Layers },
            { label: "Design system", href: "/design-system", icon: Palette },
            { label: "Contact", href: "/contact", icon: Mail },
          ]}
        />
      </Group>

      <Group title="Link list" note="Bordered navigational list">
        <LinkList
          className="w-full max-w-md"
          items={[
            { label: "Case studies", href: "/case-studies", description: "Full project write-ups" },
            { label: "Design system", href: "/design-system", description: "Tokens & components" },
            { label: "Contact", href: "/contact", description: "Get in touch" },
          ]}
        />
      </Group>
    </div>
  );
}
