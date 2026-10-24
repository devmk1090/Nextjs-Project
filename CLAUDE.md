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
- **Home page**: `app/page.tsx` (metadata) → `app/HomeContent.tsx` (client), which renders a hard-coded `<Link>` card grid grouped into 5 tabs: `calculator`, `developer`, `text`, `color`, `random`. The active tab is synced with the URL hash (`/#developer`).
- **Global layout** (`app/layout.tsx`): sets site-wide metadata (title template `%s | 계산기 모음`, `metadataBase` from `NEXT_PUBLIC_BASE_URL`), and mounts `DrawerNavigation` (hamburger drawer that navigates to `/#<category>`) and `GoogleAdsense` (injects the AdSense script).
- **Styling**: Tailwind utility classes inline; no shared UI component library. Common look is `bg-gradient-to-b from-blue-100 to-purple-100` page background with white `rounded-lg shadow-xl` cards.

### Adding a new tool

1. Create `app/pages/<slug>/page.tsx` + `<Name>.tsx` following the pattern above.
2. Add a `<Link>` card in the matching tab section of `app/HomeContent.tsx`.
3. Update the tool count ("35개") in `app/components/DrawerNavigation.tsx` and in `app/page.tsx` metadata, and add keywords/description to the home metadata.
4. Add the slug to `toolSlugs` in `app/sitemap.ts` (it is a hand-maintained list, not auto-discovered).

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
