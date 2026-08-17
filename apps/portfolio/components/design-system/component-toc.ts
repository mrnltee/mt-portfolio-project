/** Shared slug + table-of-contents so the page sidebar and the component
 *  anchors stay in sync. Item titles MUST match the <Demo title="…"> values. */
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const COMPONENT_TOC: { title: string; items: string[] }[] = [
  { title: "Buttons & actions", items: ["Button", "Icon button", "Button group", "Segmented control", "Menu (dropdown)", "Toolbar"] },
  {
    title: "Input & form controls",
    items: ["Text input", "Textarea", "Form field", "Search field", "Select", "Combobox / Autocomplete", "Checkbox · Radio · Switch", "Slider", "Date picker", "File upload"],
  },
  { title: "Navigation", items: ["Nav link", "Tabs", "Breadcrumb", "Pagination", "Stepper", "Side nav", "Link list"] },
  { title: "Feedback & status", items: ["Inline alert", "Banner", "Toast / Snackbar", "Progress · Spinner · Skeleton", "Empty state", "Badge", "Tooltip", "Dialog / Modal"] },
  { title: "Content & layout", items: ["Card", "Tag"] },
  { title: "Iconography", items: ["Lucide", "Material"] },
];
