# Mernel Tusoy — Portfolio

Product design portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and
Framer Motion. Fully static, no backend required.

See [`CLAUDE.md`](./CLAUDE.md) for the design token system, folder structure, and editing
conventions before making changes.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where content lives

- **Case studies** — edit `lib/projects-data.ts` (drives the home page grid, the case-studies
  index, filter tags, and every `/case-studies/[slug]` page). Add each new study as an object
  in `caseStudies`.
- **About / Contact copy** — `app/about/page.tsx`, `app/contact/page.tsx`.
- **Images** — case-study screenshots live in `public/images/`; pass `src`/`srcDark` to
  `<ImagePlaceholder />` for theme-aware rendering (see the doc comment in
  `components/ui/image-placeholder.tsx`).
- **Contact links** — the email and LinkedIn URL in `app/contact/page.tsx` and
  `components/layout/footer.tsx`.
- **Metadata** — `app/layout.tsx` `metadata` export (title/description), plus per-page
  `metadata` exports.

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # serve the production build locally
npm run lint     # eslint
```

## Deploying

This is a standard Next.js app — deploy to [Vercel](https://vercel.com/new) by importing the
repo (zero config needed), or run `npm run build && npm run start` on any Node host.

No environment variables, API routes, or database are required.
