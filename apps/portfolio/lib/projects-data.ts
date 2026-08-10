import type { CaseStudy, Category } from "@/types/project";

/** Canonical filter order. A category only shows as a chip when a project uses it. */
export const CATEGORIES: Category[] = ["Enterprise SaaS", "AI Products", "Design Systems", "Mobile"];

/**
 * [REPLACE] Every entry in this file is placeholder content for a fictional
 * project. Swap the copy, tools, metrics, and image labels for real work —
 * this is the single source of truth for the home grid, the project filter,
 * and every /case-studies/[slug] page.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "wildflow-habit-app",
    title: "Wildflow — Habit Tracking App",
    role: "Lead Product Designer",
    timeframe: "Jan 2024 – Apr 2024",
    category: "Mobile",
    tools: ["Figma", "FigJam", "Maze", "Notion"],
    summary: "[REPLACE] One-line summary of the project and your impact, written for a scanning hiring manager.",
    coverLabel: "Wildflow app screens",
    tone: 0,
    featured: true,
    problem: [
      "[REPLACE] Describe the problem or business context in 1-2 paragraphs. What was broken, unclear, or missing before this project started? Who was affected, and how did you find out?",
      "[REPLACE] Name any constraints — timeline, team size, technical limitations, stakeholder expectations — that shaped how you approached the work.",
    ],
    process: [
      {
        heading: "Research",
        body: "[REPLACE] Summarize your research approach — interviews, surveys, competitive analysis, analytics review. Call out 1-2 concrete findings that changed your direction.",
        imageLabel: "Research synthesis / affinity map",
      },
      {
        heading: "Wireframes",
        body: "[REPLACE] Describe how you moved from insights to early structure — sketches, low-fidelity wireframes, information architecture decisions.",
        imageLabel: "Low-fidelity wireframes",
      },
      {
        heading: "Iterations",
        body: "[REPLACE] Show your thinking evolve — what changed between v1 and the final design, and why. Mention any testing that drove a pivot.",
        imageLabel: "Iteration comparison, v1 vs v2",
      },
    ],
    solution: {
      body: "[REPLACE] Describe the final design direction — key screens, interaction patterns, and the design decisions you're proudest of.",
      gallery: [
        { label: "Onboarding flow", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
        { label: "Habit dashboard", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
        { label: "Streak detail view", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
      ],
    },
    outcome: {
      summary: "[REPLACE] Summarize the outcome — shipped result, qualitative feedback, or what you'd do differently with more time.",
      metrics: [
        { label: "[REPLACE metric]", value: "+00%" },
        { label: "[REPLACE metric]", value: "00%" },
        { label: "[REPLACE metric]", value: "0.0★" },
      ],
    },
  },
  {
    slug: "northwind-banking-redesign",
    title: "Northwind — Online Banking Redesign",
    role: "UX Researcher & Designer",
    timeframe: "Jun 2023 – Nov 2023",
    category: "Enterprise SaaS",
    tools: ["Figma", "UserTesting", "Miro", "Jira"],
    summary: "[REPLACE] One-line summary of the project and your impact, written for a scanning hiring manager.",
    coverLabel: "Northwind banking dashboard",
    tone: 1,
    featured: true,
    problem: [
      "[REPLACE] Describe the problem or business context in 1-2 paragraphs. What was broken, unclear, or missing before this project started? Who was affected, and how did you find out?",
      "[REPLACE] Name any constraints — timeline, team size, technical limitations, stakeholder expectations — that shaped how you approached the work.",
    ],
    process: [
      {
        heading: "Research",
        body: "[REPLACE] Summarize your research approach — interviews, surveys, competitive analysis, analytics review. Call out 1-2 concrete findings that changed your direction.",
        imageLabel: "Usability testing highlights",
      },
      {
        heading: "Wireframes",
        body: "[REPLACE] Describe how you moved from insights to early structure — sketches, low-fidelity wireframes, information architecture decisions.",
        imageLabel: "Information architecture map",
      },
      {
        heading: "Iterations",
        body: "[REPLACE] Show your thinking evolve — what changed between v1 and the final design, and why. Mention any testing that drove a pivot.",
        imageLabel: "Iteration comparison, v1 vs v2",
      },
    ],
    solution: {
      body: "[REPLACE] Describe the final design direction — key screens, interaction patterns, and the design decisions you're proudest of.",
      gallery: [
        { label: "Account overview", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
        { label: "Transfer flow", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
        { label: "Statements view", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
      ],
    },
    outcome: {
      summary: "[REPLACE] Summarize the outcome — shipped result, qualitative feedback, or what you'd do differently with more time.",
      metrics: [
        { label: "[REPLACE metric]", value: "-00%" },
        { label: "[REPLACE metric]", value: "+00 pts" },
        { label: "[REPLACE metric]", value: "00%" },
      ],
    },
  },
  {
    slug: "atlas-design-system",
    title: "Atlas — Design System",
    role: "Design Systems Lead",
    timeframe: "Feb 2023 – Present",
    category: "Design Systems",
    tools: ["Figma", "Storybook", "Zeroheight"],
    summary: "[REPLACE] One-line summary of the project and your impact, written for a scanning hiring manager.",
    coverLabel: "Atlas component library",
    tone: 2,
    featured: true,
    problem: [
      "[REPLACE] Describe the problem or business context in 1-2 paragraphs. What was broken, unclear, or missing before this project started? Who was affected, and how did you find out?",
      "[REPLACE] Name any constraints — timeline, team size, technical limitations, stakeholder expectations — that shaped how you approached the work.",
    ],
    process: [
      {
        heading: "Research",
        body: "[REPLACE] Summarize your research approach — component audit, engineering interviews, inconsistency inventory across the product.",
        imageLabel: "Component audit spreadsheet",
      },
      {
        heading: "Wireframes",
        body: "[REPLACE] Describe your token architecture and component API decisions before high-fidelity work began.",
        imageLabel: "Token architecture diagram",
      },
      {
        heading: "Iterations",
        body: "[REPLACE] Show how components evolved through design/engineering pairing and adoption feedback.",
        imageLabel: "Component variant iterations",
      },
    ],
    solution: {
      body: "[REPLACE] Describe the final system — token structure, component coverage, documentation approach.",
      gallery: [
        { label: "Color & type tokens", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
        { label: "Core component set", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
        { label: "Documentation site", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
      ],
    },
    outcome: {
      summary: "[REPLACE] Summarize the outcome — adoption rate, design/dev velocity change, or qualitative feedback from teams using it.",
      metrics: [
        { label: "[REPLACE metric]", value: "00 components" },
        { label: "[REPLACE metric]", value: "00% adoption" },
        { label: "[REPLACE metric]", value: "-00% design debt" },
      ],
    },
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
