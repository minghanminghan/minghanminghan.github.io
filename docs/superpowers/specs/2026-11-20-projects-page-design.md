# Projects page design

## Why
The top nav fills up as projects are added. Projects move to one page that can grow.

## Goals
- Remove "email" from the side nav.
- Top nav has two tabs: `readme` (`/`) and `projects` (`/projects`).
- `jev-demo` leaves the top nav and becomes a card on `/projects`.
- Adding a project = one entry in a list + one media file.

## Non-goals
- No tags, filters, or search.
- No change to how `/jev-demo` is served (the rewrite in `next.config.ts` stays).

## Approaches
1. Projects as a tab inside the current slideshow. Small change, but no shareable link.
2. **Picked:** projects as its own route `/projects`. Shareable link. Needs the top nav moved into a shared component.

## Design
- `src/app/ui/TopNav.tsx`: the `[ readme ] [ projects ]` row, same style as now. Active tab comes from the URL path.
- `src/app/layout.tsx`: wraps `TopNav` + page content in one column next to `SideBar`.
- `src/app/page.tsx`: drops the slideshow state; shows only the readme box.
- `src/app/projects/projects.ts`: the list. Each entry: `name`, `desc`, `href`, optional `media: { kind: "image" | "video", src }`.
- No media: the media slot keeps the same size (16:10), so the grid stays even. It is filled with the project name repeated in small monospace text, like the site's `TextBackground`, with the name large and centered on top. Static, no animation. Adding `media` later swaps it out with no other change.
- `src/app/projects/page.tsx`: card grid. 1 column on phone, 2–3 on desktop. Card = media on top, name + one line below, white border, `--bubble-bg`.
- Video: `autoPlay muted loop playsInline`.
- Links on this domain open in the same tab. Other domains open in a new tab.
- Media files go in `public/projects/`.
- Starting entries: `jev-demo` (`/jev-demo`) and `ascii-art` (`/ascii-art.html`).

## Left to the builder (my calls)
- The old `/projects/ascii-art` redirect stays.
