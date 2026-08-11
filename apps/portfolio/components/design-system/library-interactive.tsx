"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { MoreHorizontal, Pencil, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Pagination } from "@/components/ui/pagination";
import { Banner } from "@/components/ui/banner";
import { MaterialIcon } from "@/components/ui/material-icon";

function Group({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className="border-t border-border-default py-10">
      <h3 className="font-display text-h4 font-semibold text-text-primary">{title}</h3>
      {note && <p className="mt-1 text-caption text-text-secondary">{note}</p>}
      <div className="mt-5 flex flex-wrap items-start gap-x-10 gap-y-6">{children}</div>
    </div>
  );
}

const MATERIAL = ["home", "search", "settings", "notifications", "favorite", "star", "download", "delete", "add", "inbox", "done", "chevron_right"];

export function LibraryInteractive() {
  const [seg, setSeg] = useState("day");
  const [page, setPage] = useState(2);

  return (
    <TooltipProvider delayDuration={200}>
      <Group title="Button variants" note="primary · secondary · tertiary · danger · ghost · link">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </Group>

      <Group title="Tabs" note="@radix-ui/react-tabs · roving focus + aria">
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
      </Group>

      <Group title="Select" note="@radix-ui/react-select · accessible listbox">
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
      </Group>

      <Group title="Slider" note="@radix-ui/react-slider">
        <Slider defaultValue={[40]} max={100} step={1} className="w-64" />
      </Group>

      <Group title="Menu (dropdown)" note="@radix-ui/react-dropdown-menu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              Actions
            </Button>
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
      </Group>

      <Group title="Tooltip" note="@radix-ui/react-tooltip">
        <Tooltip content="More options">
          <IconButton aria-label="More options" variant="secondary">
            <MoreHorizontal className="h-5 w-5" />
          </IconButton>
        </Tooltip>
      </Group>

      <Group title="Segmented control" note="Compact single-select (radiogroup)">
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
      </Group>

      <Group title="Pagination" note="Prev · numbers · next">
        <Pagination page={page} pageCount={5} onPageChange={setPage} />
      </Group>

      <Group title="Banner" note="Full-width contextual message with an action">
        <div className="w-full max-w-xl overflow-hidden rounded-card">
          <Banner variant="info" action={<Button size="sm" variant="tertiary">Review</Button>}>
            A new design token release is available.
          </Banner>
        </div>
      </Group>

      <Group title="Material icons" note="material-symbols (outlined) — companion set to Lucide">
        <div className="flex flex-wrap items-center gap-4 text-text-primary" style={{ fontSize: 24 }}>
          {MATERIAL.map((n) => (
            <MaterialIcon key={n} name={n} />
          ))}
        </div>
      </Group>
    </TooltipProvider>
  );
}
