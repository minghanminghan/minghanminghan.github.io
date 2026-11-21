# Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/projects` card page, a shared top nav (`readme`, `projects`), and drop `email` from the side nav.

**Architecture:** `TopNav` moves into `layout.tsx` beside the page content, so `/` and `/projects` share it. `/projects` renders a card grid from a data list; cards with no media draw a text-pattern placeholder.

**Tech Stack:** Next 16 (app router), React 19, Tailwind 4. No test framework in the repo; checks are `npm run lint`, `npm run build`, and a Playwright browser pass against `npm run dev`.

**Spec:** `docs/superpowers/specs/2026-11-20-projects-page-design.md`

## Global Constraints

- Keep the site look: `border-2 border-white`, rounded corners, `bg-[var(--bubble-bg)]`, `[ name ]` tab style, Figtree text, mono for the text pattern.
- Media slot aspect ratio: 16:10 (`aspect-[16/10]`), with or without media.
- Video tag: `autoPlay muted loop playsInline`.
- Same-domain `href` (starts with `/`) opens in the same tab. Other domains: `target="_blank" rel="noopener noreferrer"`.
- `/jev-demo` (rewrite) and `/ascii-art.html` (static file) are not Next routes: link them with a plain `<a>`, never `next/link`.
- Do not change `next.config.ts`.
- Commit only after the user says so.

## Review Focus

1. Many projects (6+) on desktop: layout is `md:h-screen`, so the content column must scroll (`md:overflow-y-auto`), not get cut off.
2. Long project name (e.g. 40 chars) in a no-media card: text clips inside the slot; card size does not change.
3. Phone width 375px: one card column, no horizontal page scroll.
4. Dark theme (click the eyes): cards and placeholder follow `--bubble-bg` / `--foreground`.
5. Direct load of `http://localhost:3000/projects`: `projects` tab is underlined.

---

### Task 1: Shared top nav, readme page, side nav cleanup

**Files:**
- Create: `src/app/ui/TopNav.tsx`
- Modify: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/ui/SideBar.tsx`

**Interfaces:**
- Produces: `export default function TopNav()` (client component, no props). `layout.tsx` content column: `<div className="flex-1 min-w-0 md:overflow-y-auto flex flex-col items-center gap-6 md:gap-10 pt-6 text-lg md:text-2xl"><TopNav/>{children}</div>`. Pages render only their body, no nav.

- [ ] **Step 1:** In `SideBar.tsx`, delete the `mailto:amj7925@nyu.edu` link.
- [ ] **Step 2:** Create `TopNav.tsx`: tabs `[{ name: "readme", href: "/" }, { name: "projects", href: "/projects" }]` with `next/link`, same box and `[ name ]` markup as the current index in `page.tsx`. Active = `usePathname() === href`, or `startsWith("/projects")` for projects; active gets `underline`.
- [ ] **Step 3:** In `layout.tsx`, wrap `{children}` in the content column above with `<TopNav/>` first.
- [ ] **Step 4:** Rewrite `page.tsx` as a server component `export default function Home()` that renders only the readme box (same text, same classes as the current desc container). Remove the slides array, `useState`, and the `jev-demo` link. Write `NYU &apos;26`.
- [ ] **Step 5:** Run `npm run lint && npm run build`. Expected: 0 lint errors (the 3 current errors in `page.tsx` are gone), build succeeds.
- [ ] **Step 6:** With `npm run dev`, open `http://localhost:3000/` in Playwright. Expected: tabs `readme` (underlined) and `projects`; no `jev-demo` tab; side nav has github, blog, linkedIn, resume, no email.
- [ ] **Step 7:** Commit (after user OK): `git commit -m "move top nav to layout, drop email link"`

### Task 2: Projects data, card, and page

**Files:**
- Create: `src/app/projects/projects.ts`, `src/app/projects/ProjectCard.tsx`, `src/app/projects/page.tsx`, `public/projects/.gitkeep`

**Interfaces:**
- Consumes: layout content column from Task 1.
- Produces:
  ```ts
  export type Media = { kind: "image" | "video"; src: string }
  export type Project = { name: string; desc: string; href: string; media?: Media }
  export const projects: Project[]
  export default function ProjectCard({ project }: { project: Project })
  ```

- [ ] **Step 1:** `projects.ts` entries, in this order:
  - `{ name: "jev-demo", desc: "<one line, ask user; placeholder: "jev demo">", href: "/jev-demo" }`
  - `{ name: "ascii-art", desc: "<one line, ask user; placeholder: "ascii art generator">", href: "/ascii-art.html" }`
- [ ] **Step 2:** `ProjectCard.tsx`: plain `<a>` wrapping the card (target rule from Global Constraints). Card: `border-2 border-white rounded-3xl bg-[var(--bubble-bg)] overflow-hidden hover:underline`. Top: `aspect-[16/10]` slot. Bottom: name (bold) and `desc` (smaller), left-aligned, `p-4`.
  - `media.kind === "image"`: `<img>` with `object-cover w-full h-full`, `alt={name}`.
  - `media.kind === "video"`: `<video>` with the Global Constraints attributes, `object-cover w-full h-full`.
  - No media: `relative overflow-hidden` slot. Back layer: `aria-hidden` `font-mono text-[10px] leading-[20px] opacity-25 break-all` text = `(name + " ").repeat(80)`. Front layer: name, `absolute inset-0 grid place-items-center text-2xl md:text-3xl font-bold truncate px-4`.
- [ ] **Step 3:** `page.tsx` (`/projects`): `export const metadata = { title: "projects" }` is optional; render `<div className="w-full px-8 md:px-16 pb-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">` mapping `projects` to `ProjectCard` (key = `name`).
- [ ] **Step 4:** Create empty `public/projects/.gitkeep` (media folder).
- [ ] **Step 5:** Run `npm run lint && npm run build`. Expected: pass. If lint flags `<img>` (`@next/next/no-img-element`), use `next/image` with `fill` and `unoptimized` instead.
- [ ] **Step 6:** Playwright on `http://localhost:3000/projects`. Expected: two placeholder cards, same size; `projects` tab underlined; clicking `jev-demo` card lands on `/jev-demo`; `ascii-art` lands on `/ascii-art.html`.
- [ ] **Step 7 (Review Focus 1–4):** Temporarily add 6 more entries, one with a 40-char name, one with `media: { kind: "video", src: "<any small mp4 in scratchpad copied to public/projects/>" }`. Check: desktop column scrolls to the last card; long name clips, card size same; at 375px width one column and `document.documentElement.scrollWidth <= 375`; after clicking the eyes, cards use dark `--bubble-bg`; video plays muted. Remove the temp entries and file.
- [ ] **Step 8:** Commit (after user OK): `git commit -m "add projects page with media and placeholder cards"`
