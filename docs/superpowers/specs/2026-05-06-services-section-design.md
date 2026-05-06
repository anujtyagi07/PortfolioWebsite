# Services Section — Design Spec

**Date:** 2026-05-06
**Component:** `client/src/components/sections/Services.jsx`
**Mounts in:** `client/src/pages/Home.jsx` (between `About` and `Skills` — see Placement below)

---

## 1. Goal

Convert two distinct audiences without forking the section:

- **Freelance clients** — see exactly what they can hire Anuj to build, what's in scope, and how to start a project.
- **Recruiters** — see the breadth and depth of services as evidence of capability and a real working process.

The section sells, but it does so without a pricing table. No tiers, no "starting from" prices — just clear services, deliverables, tech stack, and a path to contact.

---

## 2. Placement & Anatomy

In `Home.jsx`, the new `<Services />` mounts directly after `<About />`. Recommended order:

```
Hero → About → Services → Skills → Projects → Experience → Education
```

The full section, top to bottom:

1. **Section header** — eyebrow pill ("What I Build"), heading ("Services I offer")
2. **Bento grid** of 6 service cards (asymmetric, not uniform)
3. **Process strip** — 4-step "How I work" horizontal flow with animated connector
4. **Closing CTA** — short pitch + two buttons (`Start a Project`, `View Work`)

---

## 3. Bento Grid Layout

Six cards, asymmetric. Two "headline" services (Full-Stack Apps, AI-Powered Features) get larger cards; the others fill around them.

### Desktop (lg+, ≥1024px) — 3-col × 4-row CSS grid

```
┌─────────────────────────┬───────────┐
│                         │           │
│  1. Full-Stack Apps     │ 2. Landing│
│  (col-span-2 row-span-2)│   Pages   │
│       LARGE 2×2         │ (col-span-1
│                         │  row-span-2)
│                         │   TALL    │
├────────────┬────────────┤           │
│ 3. Business│  4. REST   │           │
│  Websites  │   APIs     │           │
│  (1×1)     │  (1×1)     │           │
├────────────┴────────────┼───────────┤
│                         │           │
│  5. AI-Powered Features │ 6. Admin  │
│  (col-span-2 row-span-1)│ Dashboards│
│       WIDE 2×1          │ (col-span-1
│                         │  row-span-2)
│                         │   TALL    │
└─────────────────────────┴───────────┘
```

Card classes (desktop only, `lg:` prefix):

| Card | Tailwind classes |
|------|------------------|
| 1. Full-Stack Apps | `lg:col-span-2 lg:row-span-2` |
| 2. Landing Pages | `lg:col-span-1 lg:row-span-2` |
| 3. Business Websites | `lg:col-span-1 lg:row-span-1` |
| 4. REST APIs | `lg:col-span-1 lg:row-span-1` |
| 5. AI-Powered Features | `lg:col-span-2 lg:row-span-1` |
| 6. Admin Dashboards | `lg:col-span-1 lg:row-span-2` |

Implementation on the grid wrapper: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4 gap-4 lg:auto-rows-[minmax(180px,auto)]`. Use `auto-rows` to keep card heights consistent regardless of content length.

Source order in JSX matches the table above (1 → 6). Card sizing is purely CSS; mobile and tablet ignore the `lg:` classes and stack normally.

### Tablet (md, 768–1023px) — 2-col grid

All cards become equal-size, 2 per row, in source order (3 rows × 2 cols). No `col-span` or `row-span` overrides — every card occupies one cell.

### Mobile (<768px) — single column

All cards stack full width, 1 per row, in source order. Each card minimum height is dictated by its content, not the grid.

---

## 4. Card Anatomy

Every card has the same structure regardless of size. Larger cards just give content more breathing room.

```
┌──────────────────────────────────────────┐
│ [icon]                                   │
│                                          │
│  Service Title                           │
│  Tagline — one line, problem-framed.     │
│                                          │
│  ✓ Deliverable one                       │
│  ✓ Deliverable two                       │
│  ✓ Deliverable three                     │
│                                          │
│  [react] [tailwind] [express]            │
│                              Start →     │
└──────────────────────────────────────────┘
```

**Fields per card:**

1. **Icon** (top-left, ~40×40, brand-tinted background `bg-brand/10` + `border-brand/20`, monoline SVG stroke `#8B5CF6`)
2. **Title** (h3, `text-base sm:text-lg font-semibold text-copy`)
3. **Tagline** (`text-sm text-muted leading-relaxed`)
4. **Deliverables list** — exactly 3 items, each a row with a small purple check (`text-xs text-muted`)
5. **Tech badges** — small pills, same chip styling as About's tech stack (`px-2 py-1 rounded-md border border-line bg-page text-[11px] text-muted`)
6. **"Start a project" arrow** (bottom-right, `text-xs text-brand`, hidden on mobile by default — visible on hover on desktop)

**Card container:** reuses `.card` class (already defined in the design system) with `rounded-2xl p-6` (or `p-7` for large cards) and `flex flex-col gap-4`.

---

## 5. Per-Card Content (final copy)

| # | Title | Size (desktop) | Tagline | Deliverables | Stack |
|---|-------|----------------|---------|--------------|-------|
| 1 | Full-Stack Web Applications | 2×2 large | Production-grade MERN apps with auth, dashboards, and real-time data. | JWT auth & roles · MongoDB schema design · Deployable build (Vercel/Render) | React · Node.js · Express · MongoDB |
| 2 | Landing Pages & Portfolios | 1×2 tall | Single-page sites built to convert — fast, focused, and conversion-tested. | Custom design · Mobile-first · Lighthouse 90+ | React · Tailwind · Framer Motion |
| 3 | Business & Marketing Websites | 1×1 small | Multi-page sites with a CMS your team can actually update. | SEO meta & sitemap · Contact forms · Editable content | React · Tailwind · MongoDB |
| 4 | REST API Development | 1×1 small | Clean, documented Express APIs that scale with your product. | Auth & rate limiting · Postman collection · Versioned endpoints | Express · MongoDB · JWT |
| 5 | AI-Powered Web Features | 2×1 wide | Chatbots, smart search, and content generation powered by Claude. | Claude API integration · Streaming responses · Cost-aware caching | Claude · Node.js · React |
| 6 | Admin Dashboards & CMS | 1×2 tall | Internal tools your team will actually want to use. | Data tables & filters · JWT auth & roles · CRUD with audit logs | React · Express · MongoDB |

---

## 6. Icons (per service)

All inline SVGs, monoline, stroke `#8B5CF6`, stroke-width 1.75, 18×18 inside a 40×40 brand-tinted square. Each icon also has a continuous micro-animation (see §7).

| # | Service | Icon concept | Continuous animation |
|---|---------|--------------|----------------------|
| 1 | Full-Stack Apps | Layered stack (3 horizontal rectangles) | Top layer slides up/down 2px, 2.4s loop |
| 2 | Landing Pages | Browser frame with arrow | Arrow translates X, fades, repeats every 2.6s |
| 3 | Business Websites | Globe with meridians | Slow rotate, 14s loop, ease-linear |
| 4 | REST APIs | Two nodes connected by a line | Pulsing dot travels along the connecting line, 2.2s |
| 5 | AI Features | Spark/star (4-pointed) inside a soft circle | Scale `[1, 1.14, 1]` + slow background gradient hue rotate, 3s |
| 6 | Admin Dashboards | Bar chart (3 vertical bars) | Bars rise to staggered heights, hold, reset, 3.2s loop |

---

## 7. Animation System (matches existing Hero/About patterns)

All variants use easing `[0.22, 1, 0.36, 1]` and viewport `once: true, margin: '-60px'`.

**Reused primitives** (copy the variant definitions from `About.jsx`):

- `fadeUp(delay)` — section header reveal
- `slideFrom(x, delay)` — left/right column reveals (used for the bento as a single block)
- `stagger` + `popItem` — bento card stagger; deliverables list stagger; process step stagger
- `chipVariant` — tech badge chips inside cards

**Section-specific animations:**

- **Section header** — `initial: { opacity: 0, y: 36, scale: 0.97 }` → `whileInView: { opacity: 1, y: 0, scale: 1 }`, `duration: 0.7` (matches About header)
- **Bento grid container** — wraps cards with `stagger` variant, `staggerChildren: 0.08, delayChildren: 0.04`
- **Each card** — `popItem` variant; card itself uses `whileHover={{ y: -3, transition: { duration: 0.2 } }}` and adds a brand-tinted ring on hover (`hover:ring-1 hover:ring-brand/20`) plus a soft purple glow via box-shadow
- **Card icons** — each has its own continuous animation per §6, defined inline with `animate={{...}}` + `transition: { duration, repeat: Infinity, ease: 'easeInOut' }`
- **Deliverables list** (inside each card) — staggered reveal of the three lines using `stagger` + `popItem`, only when card itself is in view
- **Tech badges** — staggered scale-in with `chipVariant`
- **"Start →" link** — on desktop, hidden by default, fades in + slides 4px from right on card hover (`group-hover:opacity-100 group-hover:translate-x-0`); always visible on mobile (`md:opacity-0`)

**Process strip animations:**

- Each numbered step uses `popItem` with stagger; revealed left-to-right
- The connecting line between steps is an SVG path with `pathLength: 0 → 1` driven by `useScroll` + `useTransform` on the section container, so the line "draws" as the user scrolls past
- Step number circles have a subtle pulsing ring (matches About's pulsing dots)

**Closing CTA:**

- Whole CTA card uses `fadeUp(0.1)` with `viewport once: true`
- Buttons reuse the existing `<Button>` component (primary + secondary variants)

---

## 8. Process Strip ("How I work")

A horizontal 4-step flow under the bento, before the closing CTA.

```
  ①────────→  ②────────→  ③────────→  ④
Discover    Design      Build       Ship
```

| Step | Label | One-line description |
|------|-------|----------------------|
| 1 | Discover | Quick call, scope, and fit. |
| 2 | Design | Wireframe, design system, and tech plan. |
| 3 | Build | MERN stack, AI-assisted, daily updates. |
| 4 | Ship | Deploy, hand off, and post-launch support. |

**Layout:**

- Desktop: 4 steps in a row, equal width, connected by SVG path
- Tablet: 2×2 grid, no connector
- Mobile: vertical stack with vertical connector (or just numbered list, no connector for simplicity)

**Step structure:**

- Circular brand-tinted number badge (`w-10 h-10 rounded-full border-brand/30 bg-brand/10 text-brand font-semibold`)
- Label (`text-sm font-semibold text-copy`)
- Description (`text-xs text-muted leading-relaxed`)

---

## 9. Closing CTA

Full-width card-like block (uses `.card` styling) below the process strip:

```
┌────────────────────────────────────────────────┐
│                                                │
│        Have a project in mind?                 │
│  Tell me about it — I usually reply in 24h.    │
│                                                │
│   [ Start a Project → ]   [ View Work ]        │
│                                                │
└────────────────────────────────────────────────┘
```

- Heading: `text-2xl sm:text-3xl font-extrabold text-copy`
- Subheading: `text-sm sm:text-base text-muted`
- Buttons: reuse `<Button>` component
  - **Start a Project** (primary, links to `/#contact`)
  - **View Work** (secondary, links to `/#projects`)

Subtle radial brand glow behind the CTA (matches the background glow patterns from Hero and About).

---

## 10. Component Structure (single file)

The whole section lives in `client/src/components/sections/Services.jsx` as one default-exported component. Internal sub-components, all in the same file:

- `Services` (default export) — section wrapper, header, glow background, mounts everything
- `BentoGrid` — grid wrapper with stagger variants
- `ServiceCard` — single card; takes `service` object as prop, renders icon + title + tagline + deliverables + badges + arrow
- `ServiceIcon` — switches on `service.id`, returns the right SVG with its continuous animation
- `ProcessStrip` — 4 steps + connector SVG
- `ClosingCTA` — final block

The 6 services are defined as a `SERVICES` array at the top of the file (constant, not props). No data fetching, no API call — fully static.

---

## 11. Section Wrapper Pattern (consistent with Hero/About)

```jsx
<section
  id="services"
  className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  {/* background glow — same pattern as About */}
  <div
    className="pointer-events-none absolute left-0 top-1/3 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10 -z-10"
    style={{ background: 'radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)' }}
    aria-hidden
  />

  <div className="max-w-6xl mx-auto">
    {/* eyebrow + heading */}
    {/* bento grid */}
    {/* process strip */}
    {/* closing CTA */}
  </div>
</section>
```

Section header reuses the eyebrow-pill pattern from About:

```jsx
<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold uppercase tracking-widest mb-4">
  Services
</span>
<h2 className="text-3xl sm:text-4xl font-extrabold text-copy tracking-tight">
  Services I offer
</h2>
<p className="mt-3 text-muted text-base sm:text-lg max-w-2xl">
  From a single landing page to a full-stack product — clear scope, clean code, and AI-assisted delivery.
</p>
```

---

## 12. Accessibility & Responsive Notes

- All icons are decorative; mark `aria-hidden="true"` on SVGs
- Cards are not links; the "Start →" affordance is a visible anchor (`<a href="/#contact">`) so keyboard users can reach it
- Process step connector SVG is decorative (`aria-hidden`)
- Continuous animations respect `prefers-reduced-motion` — wrap continuous animations in a check; reveal animations stay (they're brief)
- Touch devices (`md:` breakpoint and below): the "Start →" arrow is always visible since there's no hover
- Color contrast: all text on `card` background already meets AA per the existing design tokens

---

## 13. Out of Scope (explicit)

- **Pricing display** — no "starting at" prices, no tiers, no calculator
- **Service detail pages** — clicking a card does nothing (no route); all cards funnel to `/#contact` or `/#projects`
- **CMS / dynamic services** — services are hard-coded in the component, not loaded from MongoDB
- **Form embed** — the contact form lives in its own section; this CTA only links there
- **Testimonials** — those belong in a separate section
- **Animation alternatives for `prefers-reduced-motion`** beyond disabling continuous icon loops — reveal animations stay enabled

---

## 14. File-Level Acceptance

- New file: `client/src/components/sections/Services.jsx`
- Edit: `client/src/pages/Home.jsx` — import `Services` and mount between `<About />` and `<Skills />`
- No new dependencies (Framer Motion already installed)
- No changes to Tailwind config, design tokens, or shared components
- No changes to server-side code
