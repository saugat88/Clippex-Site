# CLIPPEX — Implementation Plan

## Context

CLIPPEX is a premium, performance-based creator marketing platform being built as an
interactive React prototype from a Figma design brief. The app currently ships a blank
`src/App.tsx`. The goal is a navigable, exhibition-quality prototype with three role-based
portals (Creator, Brand, Admin), a public landing page, and auth flows — all wired with
realistic mock data so a reviewer can click through every major screen.

The project is React 19 + Vite + Tailwind CSS v4 (no config file; theme customization lives
in `src/index.css`). Only `react`/`react-dom` are installed today. Navigation uses in-app
React state (no react-router) per the brief. `recharts` must be added for metrics charts.

## Aesthetic direction

Honoring the brief literally (modern premium SaaS — not the alt stances suggested by the theme tool):

- **Ground:** off-white `#FAFAFA` background, near-black `#0F0F12` foreground.
- **Primary accent:** violet-600 `#7C3AED` (used sparingly for interactive emphasis, active nav, CTAs).
- **Fonts (Google Fonts via `@import` at top of `src/index.css`):**
  - Plus Jakarta Sans — headings/display
  - Inter — body
  - JetBrains Mono — metrics, data, status labels
- **Craft:** 8/12px card radius, 6px controls, pill (999px) badges; ultra-subtle shadows;
  hairline borders (`~#ECECEF`); generous whitespace even in dense dashboards; subtle hover/
  focus transitions; responsive collapse of sidebar at ~1000px.

## Steps

### 1. Design system & fonts — `src/index.css`
- Add the three Google Fonts `@import` lines **first** (before `@import 'tailwindcss'` is not
  allowed — Tailwind import must follow charset/font imports; place font `@import`s above the
  Tailwind import, which is legal since both are `@import`).
- Add a `@theme` block mapping CSS custom properties → Tailwind tokens: colors (background,
  foreground, card, primary/violet scale, muted, border, ring, success/warn/danger for status),
  font families (`--font-sans`=Inter, `--font-display`=Plus Jakarta, `--font-mono`=JetBrains),
  radii, and shadow scale.
- Add base defaults (body font, selection color) and a scrollbar-hide-until-scroll utility.

### 2. Install dependency
- `recharts` (charts). No react-router.

### 3. Mock data layer — `src/data/`
Realistic, contextually named data (real-sounding creators, brands, campaigns, numbers, dates):
- `creators.ts`, `brands.ts`, `campaigns.ts`, `payouts.ts`, `analytics.ts` (time-series for charts),
  `users.ts` (current-user per role), plus `nav.ts` describing per-role sidebar items.

### 4. Shared UI primitives — `src/components/ui/`
Build the reusable kit (used everywhere before any bespoke UI):
- `Button`, `Badge`/`StatusPill`, `Card`, `Input`/`Select`, `Avatar`, `Table`, `Modal`,
  `Tabs`, `Tooltip`, `EmptyState`, `Skeleton`, `StatCard` (metric + delta + mono value),
  `ProgressBar`. Small inline SVG icon set in `src/components/ui/icons.tsx` (no icon lib dep).

### 5. Charts — `src/components/charts/`
Recharts wrappers themed to tokens: `AreaTrend`, `BarBreakdown`, `LineMulti`, `DonutSplit`.
Follow dataviz principles (one visual system, accessible, mono tick labels).

### 6. App shell / layout — `src/components/layout/`
- `AppShell` — CSS Grid: fixed sidebar + top bar + scrollable content.
- `Sidebar` — role-aware nav items from `nav.ts`, active state, collapses to a drawer < ~1000px.
- `TopBar` — search, notifications, user menu, and the **Creator/Brand/Admin role switcher**.
- `MobileNav` toggle.

### 7. Routing via state — `src/App.tsx`
- Central state: `{ view: 'landing' | 'auth' | 'app', role, page }`.
- Landing "Enter App" → auth → app (creator dashboard default). Role switcher updates `role`
  and resets to that role's default page. Sidebar clicks set `page`. A `renderPage()` map
  dispatches to the correct page component per `role`+`page`.

### 8. Pages — `src/pages/`
- `landing/Landing.tsx` — hero, value props, performance-model explainer, featured creators/
  brands, pricing, CTA, footer.
- `auth/` — `SignIn`, `SignUp`/role-select (state-driven, not real auth).
- `creator/` — Dashboard (earnings, active campaigns, performance charts), Discover Campaigns,
  My Campaigns, Analytics, Payouts, Profile.
- `brand/` — Dashboard (spend/ROI, campaign performance), Campaigns (list + detail), Create
  Campaign (modal/wizard), Creators (discover/roster), Analytics, Billing.
- `admin/` — Dashboard (platform KPIs), Users, Campaigns moderation, Payouts, Reports/settings.

Each portal reuses the shared kit and charts; empty states + skeletons demonstrated where lists load.

## Files

- Edit: `src/App.tsx`, `src/index.css`
- New: `src/data/*.ts`, `src/components/ui/*`, `src/components/charts/*`,
  `src/components/layout/*`, `src/pages/{landing,auth,creator,brand,admin}/*`
- `package.json` (add `recharts`)

## Verification

- Dev server already running on `$PORT`; confirm no build/HMR errors after adding fonts + recharts.
- Manual click-through: landing loads → "Enter App" → auth → creator dashboard; role switcher
  cycles Creator/Brand/Admin and shows role-correct nav + pages; sidebar navigation changes pages;
  recharts charts render with themed colors; modals (Create Campaign) open/close; empty states and
  skeletons visible; sidebar collapses to drawer at ~768–1000px width.
- Run `pnpm build` once at the end to catch type/import errors.
