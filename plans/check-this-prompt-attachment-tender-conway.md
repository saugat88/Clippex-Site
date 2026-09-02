# CLIPPEX — Figma Make Implementation Plan

## Context

The attached brief (`clippex-product-design.md`) is a Figma design/prototyping spec for **CLIPPEX**, a premium performance-based creator marketing platform. The brief explicitly says "DESIGN + PROTOTYPING ONLY / Do NOT generate production website code." However, in **Figma Make** the deliverable is a live React app — which is, in practice, the best kind of interactive prototype. We treat the spec's visual direction, UX principles, and screen list as the authoritative design brief and implement it as a navigable React prototype.

The current app is a blank canvas (`src/App.tsx` renders an empty div). Everything will be built from scratch.

---

## Scope

The brief describes 100+ screens. A single session will deliver the foundational design system and the highest-value representative screens, making the prototype immediately useful and extensible.

### What we build

| Layer | Content |
|---|---|
| Design system | Tokens, typography, spacing, color in `src/index.css` |
| App shell | Sidebar nav + top bar with user-type switcher (Creator / Brand / Admin) |
| Landing page | Hero, value props, how-it-works, social proof, CTA |
| Creator portal | Dashboard, Campaign Discovery, Campaign Detail, Submissions list, Earnings |
| Brand portal | Dashboard, Campaign list, Submission Review |
| Admin portal | Dashboard overview, User list, Fraud signals |
| Auth screens | Login, Sign Up, Account type selection |
| Shared | Empty states, loading skeletons, stat cards, charts, modals |

---

## Visual Direction

**Palette**
- Background: `#FAFAFA` (off-white)
- Foreground: `#0F0F12` (near-black)
- Primary accent: `#7C3AED` (violet-600)
- Muted surfaces: `#F4F4F8`
- Borders: `rgba(0,0,0,0.08)`
- Semantic: success `#16A34A`, warning `#D97706`, error `#DC2626`, info `#2563EB`

**Typography**
- Display/headings: **Plus Jakarta Sans** — modern, premium, wide weight range; strong weight contrast at `800`/`700` drives personality
- Body: **Inter** — neutral, readable, trusted SaaS staple
- Mono (data/labels): **JetBrains Mono** — metrics, transaction IDs, audit logs
- No serif — the brief is "modern SaaS", not editorial

**Radius**: `8px` base, `12px` cards, `6px` inputs, `999px` pills

**Shadows**: ultra-subtle: `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`

---

## Implementation Plan

### 1. Global CSS & tokens (`src/index.css`)
- Google Fonts `@import` for Plus Jakarta Sans, Inter, JetBrains Mono at top
- Tailwind `@import 'tailwindcss'`
- CSS custom properties for all design tokens (color, radius, shadow, spacing)
- `@theme` block mapping tokens to Tailwind classes
- Scrollbar hiding utility

### 2. Data layer (`src/data/`)
- Realistic mock data: campaign names, creator handles, view counts, earnings, dates
- User type context (`CreatorUser`, `BrandUser`, `AdminUser`)

### 3. Component library (`src/components/`)
- `ui/` — Button (variants: primary/secondary/ghost/destructive), Badge, Card, StatCard, Avatar, Tabs, Modal, Table, SkeletonLoader, EmptyState, Toast
- `charts/` — AreaChart, BarChart, DonutChart (using `recharts`)
- `layout/` — AppShell, Sidebar, TopBar, MobileNav

### 4. Pages (`src/pages/`)
- `Landing.tsx` — full public marketing page
- `auth/Login.tsx`, `auth/SignUp.tsx`, `auth/AccountType.tsx`
- `creator/Dashboard.tsx`, `creator/Discover.tsx`, `creator/CampaignDetail.tsx`, `creator/Submissions.tsx`, `creator/Earnings.tsx`
- `brand/Dashboard.tsx`, `brand/Campaigns.tsx`, `brand/SubmissionReview.tsx`
- `admin/Dashboard.tsx`, `admin/Users.tsx`, `admin/Fraud.tsx`

### 5. Routing (`src/App.tsx`)
- Client-side routing via React state (no react-router needed for a prototype)
- User-type switcher in top bar switches navigation context and dashboard
- Active route highlight in sidebar

---

## Key files to create/modify

| File | Action |
|---|---|
| `src/index.css` | Tokens, font imports, theme variables |
| `src/App.tsx` | Root with routing state, AppShell, page rendering |
| `src/components/ui/*` | Design system components |
| `src/components/charts/*` | Recharts wrappers |
| `src/components/layout/*` | AppShell, Sidebar, TopBar |
| `src/pages/**` | All screen implementations |
| `src/data/mock.ts` | Realistic placeholder data |

---

## Dependencies to install

- `recharts` — for area/bar/donut charts in dashboards

---

## Verification

1. App loads and shows the landing page
2. "Enter App" navigates to the creator dashboard
3. User-type switcher (Creator / Brand / Admin) changes sidebar and dashboard
4. Sidebar navigation routes between all major screens
5. Charts render with realistic data
6. Responsive at ~768px breakpoint: sidebar collapses, grid adjusts
7. Modals, empty states, and loading skeletons appear correctly
