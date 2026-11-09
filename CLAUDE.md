# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

"올인원 유틸리티 도구" — a Korean-language collection of 36 free client-side tools (calculators, developer tools, text tools, color tools, random generators) built with Next.js 15 App Router, React 19, TypeScript and Tailwind CSS 3. Deployed on Vercel (`https://all-in-one-k-calculator.vercel.app`) and monetized with Google AdSense. All UI text, metadata and code comments are in Korean.

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
- **Programmatic sub-pages** (server components, statically generated, aimed at long-tail searches like "1990년생 나이" / "34평 몇 m²"):
  - `app/pages/age-calculator/[year]/` — one page per birth year from 1930 to the current year (KST). Data in `birthYear.ts` (60갑자, 설날·입춘 via `lunar-typescript`, school years, 국민연금 age); `revalidate = 86400` so ages roll over with the year. `birthYearPath.ts` holds the path/range helpers that client components may import (it must not import `lunar-typescript`). `BirthYearIndex.tsx` is the year link list passed as `children` into the age and zodiac calculators.
  - `app/pages/pyeong-calculator/[area]/` — fixed list of 평/m² pages in `areas.ts` (`dynamicParams = false`).
  - `app/pages/salary-calculator/[amount]/` (연봉별 실수령액, `amounts.ts`), `app/pages/loan-calculator/[amount]/` (대출 금액별 이자, `amounts.ts`), `app/pages/dday-calculator/[event]/` (명절·기념일 D-day, `events.ts`; dates in `eventDates.ts`, `revalidate = 3600`).
- **연봉 실수령액 rules are yearly**: `app/lib/salary.ts` holds the 4대보험 rates and 국민연금 기준소득월액 limits (change every January/July), and `app/lib/salaryTaxTable.ts` is the 근로소득 간이세액표 (소득세법 시행령 별표2, 2026. 2. 27. 개정) copied verbatim from the law PDF for 공제대상가족 1~4명 — regenerate it from the official PDF when the table is revised; never hand-edit.
  - Both use `app/components/SubPage.tsx` (visible breadcrumb + BreadcrumbList/FAQPage JSON-LD) and are added to `app/sitemap.ts`. Every page must carry data that differs per page — don't mass-generate near-duplicate pages.
- **Structured data**: `app/components/ToolStructuredData.tsx` (mounted in the root layout) outputs WebSite JSON-LD on the home page and BreadcrumbList + WebApplication on every `/pages/<slug>` from `tools.ts`. Helpers are in `app/lib/structuredData.ts`; render JSON-LD only through `app/components/JsonLd.tsx`.
- **`app/tools.ts` is the single source of truth** for categories (`calculator`, `developer`, `text`, `color`, `random`) and the tool list (slug, category, icon, name, description). The home cards and search, footer, related-tools links, about page and `app/sitemap.ts` are all generated from it. Site constants (name, contact email, GitHub URL, `siteUrl`/`absoluteUrl`) are in `app/site.ts`.
- **Home page**: `app/page.tsx` (metadata) → `app/HomeContent.tsx` (client). All 5 category sections are rendered into the HTML and inactive ones are only hidden with CSS, so crawlers see every tool link — don't switch back to conditional rendering. The active tab is synced with the URL hash (`/#developer`).
- **Global layout** (`app/layout.tsx`): sets site-wide metadata (title template `%s | 계산기 모음`, `metadataBase` from `NEXT_PUBLIC_BASE_URL`), renders the AdSense script in `<head>` plus the `google-adsense-account` meta tag (publisher id `adsenseClient` in `app/site.ts`), and mounts `SiteHeader` (logo + links) and `SiteFooter` (on tool pages, links to other tools in the same category via `usePathname`; on every page, links to all tools and the info pages).
- **Info pages**: `/about` (no contact section; `/contact` redirects there via `next.config.ts`, and the only contact email is in the privacy page's 개인정보 보호책임자 section) and `/privacy` use the shared `app/components/InfoPage.tsx` layout. The privacy page contains the Google AdSense cookie disclosure required by AdSense policy.
- **Crawlability matters (AdSense review)**: navigation must use real `<Link>`/`<a>` elements, not `button` + `router.push`, so every page links to the rest of the site in the server-rendered HTML.
- **Styling** (clean card look): Tailwind utility classes inline, tokens in `tailwind.config.ts` — `canvas` (#F2F4F6 page background, set on `body`), white `rounded-3xl` cards without shadows, one accent `brand` (`brand`/`brand-hover`/`brand-soft`), text `ink`/`ink-2..4`, borders `line`. Font is Pretendard (self-hosted dynamic subset imported in `app/layout.tsx`). No gradients, no emoji in UI — use `app/components/Icon.tsx` (each tool's `icon` in `tools.ts`). Tool pages are built from `app/components/tool/ToolUI.tsx` (`ToolPage` breadcrumb+title from `tools.ts`, `Card`, `Field`/`inputClass`, `Segmented`, `PrimaryButton`, `ErrorText`, `ResultHero` big number, `StatGrid`, `BulletList`, `FaqList`) with number helpers in `app/lib/format.ts` — layout: title → input card → result card → explanation cards; show input errors inline, not with `alert`. All 14 calculators use it (date inputs via `DateFields` + `app/lib/date.ts`, lunar conversion via `app/lib/lunar.ts`, 60갑자 via `app/lib/ganzhi.ts`); the developer/text/color/random tools intentionally keep the older single-card markup. Global header is `SiteHeader`.

### Adding a new tool

1. Create `app/pages/<slug>/page.tsx` + `<Name>.tsx` following the pattern above.
2. Add an entry to `tools` in `app/tools.ts` — this updates the home cards, footer, related tools and sitemap (pick an `icon` from `app/components/Icon.tsx`).
3. Update the hard-coded tool count ("36개") and keywords/description in the `app/page.tsx` metadata.

## Dependencies worth knowing

- `lunar-typescript` — lunar/solar calendar conversion (lunar-, solar-, day-calculator).
- `diff` — text-diff tool.
- `qrcode` — QR generator.

## Environment variables

- `NEXT_PUBLIC_BASE_URL` — canonical site URL for metadata, sitemap and robots (falls back to the Vercel URL).
- AdSense needs no env var: the publisher id is hard-coded in `app/site.ts` and must match `public/ads.txt`.

## Notes

- Tailwind config is `tailwind.config.ts`, PostCSS config is `postcss.config.mjs` (tailwindcss + autoprefixer). Don't add `.js` variants — Tailwind/Next pick `.js` first and would silently shadow these.
- Commit messages use a `FEAT:` / `FIX:` prefix followed by a Korean summary.
