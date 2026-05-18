# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Animations**: Framer Motion
- **Deployment**: Vercel
- **Package manager**: `pnpm` (never npm or yarn)
- **Font strategy**: next/font (local or Google) — no CDN font links

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

## Architecture

### Directory Structure

```
app/
  layout.tsx          # Root layout: fonts, metadata, providers
  page.tsx            # Home (single-page: Hero → About → Projects → Contact)
  projects/
    page.tsx          # Full projects grid (if needed as standalone route)
    [slug]/page.tsx   # Individual project case study
  globals.css

components/
  sections/           # One file per page section (Hero, About, Projects, Contact)
  layout/             # Navbar, Footer — persistent across pages
  ui/                 # shadcn/ui primitives only (don't modify these)
  animations/         # Reusable Framer Motion wrappers (FadeIn, SlideUp, etc.)
  project-card.tsx    # Shared card used in both home and /projects

content/
  projects.ts         # Typed project data — single source of truth
  site.ts             # Global metadata (name, bio, social links, skills)

lib/
  utils.ts            # cn() and other pure utilities

public/
  images/projects/    # Project screenshots (WebP preferred)
  og/                 # OG images for social sharing
```

### Data Model

Project data lives in `content/projects.ts` — a typed array. Individual project pages are generated from this array via `generateStaticParams`. No CMS.

```ts
type Project = {
  slug: string;
  title: string;
  description: string; // 1–2 sentence summary for cards
  longDescription?: string; // Shown on case study page
  tags: string[]; // Tech stack labels
  url?: string; // Live link
  github?: string;
  image: string; // Path under /public/images/projects/
  featured: boolean; // Featured = shown on home page hero
};
```

### Animation Conventions

- All entrance animations go through reusable wrappers in `components/animations/` — don't scatter raw Framer Motion `motion.*` calls in section components
- `FadeIn` for text, `SlideUp` for cards, `StaggerChildren` for grids
- Respect `prefers-reduced-motion` — wrap `AnimatePresence` guards around all animations
- Scroll-triggered animations use `whileInView` with `viewport={{ once: true }}`

### Styling Rules

- All spacing, color, and typography via Tailwind tokens — no arbitrary values unless unavoidable
- Dark mode via `class` strategy (Tailwind dark:) toggled on `<html>`
- shadcn/ui theme tokens defined in `globals.css` — edit tokens there, not individual components
- Mobile-first breakpoints: `sm:` (640), `md:` (768), `lg:` (1024)

### Routing

- Home page (`/`) is a single scrolling page with anchor sections: `#about`, `#projects`, `#contact`
- `/projects/[slug]` — individual case study pages, statically generated
- Navbar links scroll on home, navigate away on other pages

## Key Constraints

- All images must go through `next/image` — no raw `<img>` tags
- Metadata defined in `layout.tsx` using Next.js `generateMetadata` — no `<Head>` tags
- `"use client"` only on components that actually need interactivity (animations, theme toggle, contact form) — keep most components server components
- Contact form submissions go to a Vercel serverless function in `app/api/contact/route.ts` — no third-party form services unless specified

## CLAUDE.md Update Protocol

After every correction or new constraint discovered during development, update this file with the rule. This prevents repeating the same mistake. Format: brief rule, no explanation needed unless non-obvious.
