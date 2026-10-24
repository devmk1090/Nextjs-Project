# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

"올인원 유틸리티 도구" — a Korean-language collection of 35 free client-side tools (calculators, developer tools, text tools, color tools, random generators) built with Next.js 15 App Router, React 19, TypeScript and Tailwind CSS 3. Deployed on Vercel (`https://all-in-one-k-calculator.vercel.app`) and monetized with Google AdSense. All UI text, metadata and code comments are in Korean.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build (also the main type-check)
npm run start   # serve the production build
npm run lint    # next lint — no ESLint config is committed, so this prompts for setup on first run
```

There is no test suite. Verify changes with `npm run build` (or `npx tsc --noEmit`) and by checking the page in the dev server.

## Architecture

- **Every tool lives in `app/pages/<tool-slug>/`** (served at `/pages/<tool-slug>`; this is an App Router folder named `pages`, not the legacy Pages Router). Each has exactly two files:
  - `page.tsx` — a server component that only exports `metadata` (Korean SEO `title` + long `description`) and renders the tool component.
  - `<PascalName>.tsx` — a single `"use client"` component holding all state, logic and markup. All computation runs in the browser; there are no API routes or backend.
- **Tool page content structure**: below the interactive tool, each component includes SEO/AdSense-oriented explanatory sections as `<h2>` blocks — 사용 방법, "<도구>란?", 활용 사례, 원리, 자주 묻는 질문 (FAQ). New tools should follow the same pattern (see e.g. `app/pages/text-diff/TextDiff.tsx`).
- **`app/tools.ts` is the single source of truth** for categories (`calculator`, `developer`, `text`, `color`, `random`) and the tool list (slug, category, emoji, name, description). The home cards, footer, related-tools links, drawer tool count, about page and `app/sitemap.ts` are all generated from it. Site constants (name, contact email, GitHub URL) are in `app/site.ts`.
- **Home page**: `app/page.tsx` (metadata) → `app/HomeContent.tsx` (client). All 5 category sections are rendered into the HTML and inactive ones are only hidden with CSS, so crawlers see every tool link — don't switch back to conditional rendering. The active tab is synced with the URL hash (`/#developer`).
- **Global layout** (`app/layout.tsx`): sets site-wide metadata (title template `%s | 계산기 모음`, `metadataBase` from `NEXT_PUBLIC_BASE_URL`), and mounts `GoogleAdsense` (injects the AdSense script), `DrawerNavigation` (hamburger drawer with `<Link>`s to `/#<category>` and info pages) and `SiteFooter` (on tool pages, links to other tools in the same category via `usePathname`; on every page, links to all tools and the info pages).
- **Info pages**: `/about` (also holds the contact info; `/contact` redirects there via `next.config.ts`) and `/privacy` use the shared `app/components/InfoPage.tsx` layout. The privacy page contains the Google AdSense cookie disclosure required by AdSense policy.
- **Crawlability matters (AdSense review)**: navigation must use real `<Link>`/`<a>` elements, not `button` + `router.push`, so every page links to the rest of the site in the server-rendered HTML.
- **Styling**: Tailwind utility classes inline; no shared UI component library. Common look is `bg-gradient-to-b from-blue-100 to-purple-100` page background with white `rounded-lg shadow-xl` cards.

### Adding a new tool

1. Create `app/pages/<slug>/page.tsx` + `<Name>.tsx` following the pattern above.
2. Add an entry to `tools` in `app/tools.ts` — this updates the home cards, footer, related tools, sitemap and drawer count.
3. Update the hard-coded tool count ("35개") and keywords/description in the `app/page.tsx` metadata.

## Dependencies worth knowing

- `lunar-typescript` — lunar/solar calendar conversion (lunar-, solar-, day-calculator).
- `diff` — text-diff tool.
- `qrcode` — QR generator.

## Environment variables

- `NEXT_PUBLIC_BASE_URL` — canonical site URL for metadata, sitemap and robots (falls back to the Vercel URL).
- `NEXT_PUBLIC_ADSENSE_CLIENT_KEY` — AdSense client id. `public/ads.txt` is required by AdSense.

## Notes

- Tailwind config is `tailwind.config.ts`, PostCSS config is `postcss.config.mjs` (tailwindcss + autoprefixer). Don't add `.js` variants — Tailwind/Next pick `.js` first and would silently shadow these.
- Commit messages use a `FEAT:` / `FIX:` prefix followed by a Korean summary.
