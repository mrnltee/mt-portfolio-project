/**
 * The exact prompt that scaffolded this site, reproduced verbatim.
 * Displayed read-only on /how-this-was-built — do not edit for accuracy's sake.
 */
export const ORIGINAL_PROMPT = `Build an interactive portfolio website for a UI/UX Designer named Mernel Tusoy. This is a
job-application asset — hiring managers and design leads will click through it, so it needs
to feel polished, fast, and like a genuine work sample, not a template.

STACK
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, configured with a proper design token setup (not just utility classes —
  extend tailwind.config with color/spacing/type scale tokens defined in one place)
- Framer Motion for page transitions and micro-interactions
- Deployable as a static/Vercel site, no backend required

SITE STRUCTURE
1. Home — hero intro, role/tagline, 3-4 featured project cards, quick nav to case studies,
   design system, and contact.
2. Case Studies (3 placeholder entries) — each follows this template:
   - Header: project title, role, timeframe, tools used [REPLACE]
   - Problem / context [REPLACE — 1-2 paragraphs]
   - Process (research, wireframes, iterations) — layout for images/screenshots [REPLACE]
   - Solution (final designs) — image gallery placeholders [REPLACE]
   - Outcome / impact (metrics or qualitative results) [REPLACE]
   Mark every placeholder clearly with a \`[REPLACE]\` comment or visible placeholder text so
   I know exactly what to swap out later.
3. Design System — a live, interactive page documenting the actual system this site is built
   on (not a generic style guide):
   - Color tokens with swatches, hex/HSL values, and usage notes (primary, neutral, semantic)
   - Typography scale rendered live (each heading/body style shown at actual size with
     token name, font, weight, line-height)
   - Spacing/grid scale visualized
   - Component library section showing real components used on this site (buttons, inputs,
     cards, nav, tags) with all variants and states (default/hover/focus/disabled) rendered
     live, plus the underlying token/class each one maps to
   - This page should read as evidence of design system thinking, not filler
4. About — short bio, skills, process philosophy [REPLACE with real content]
5. Contact — simple contact section with email/LinkedIn links [REPLACE]
6. "How This Was Built" — a dedicated page (linked from the footer, low-key, labeled
   something like "Built with AI — see how") containing:
   - A brief note on the workflow (Figma → Claude Code, or whatever the real process was)
   - A read-only, syntax-highlighted panel displaying THIS ENTIRE PROMPT verbatim, with a
     "Copy prompt" button, so a visitor can copy it and try it themselves in their own tools
   - No API calls, no live regeneration — this is a static, copyable text panel only

INTERACTIVITY (keep it purposeful, not gratuitous)
- Smooth page/section transitions
- Hover and focus micro-interactions on cards, buttons, nav links
- Light/dark mode toggle wired through the design token system
- Filterable/sortable project grid on the home page (by role, tool, or project type)
- Scroll-triggered reveal animations, used sparingly

QUALITY BARS
- Fully responsive (mobile, tablet, desktop)
- WCAG 2.1 AA: color contrast, keyboard navigation, focus states, semantic HTML, alt text
  placeholders on all images
- Fast: optimize images (next/image), avoid unnecessary client-side JS, aim for good
  Lighthouse scores
- Clean, documented component structure so I can extend it myself later

DELIVERABLES
- Working Next.js project, runnable with \`npm run dev\`
- A CLAUDE.md at the project root summarizing the design token system, folder structure,
  and conventions, so future edits stay consistent
- A short README with setup/deploy instructions

Start by proposing the file/folder structure and design token values before writing code,
so I can confirm the direction.`;
