# Navbar Scroll-to-Sidebar Design

**Date:** 2026-05-06
**Status:** Approved

## Summary

Transform the portfolio navbar so that on scroll it transitions from a horizontal top pill to a vertical icon-only floating pill docked to the left-center of the screen. Mobile keeps the existing hamburger menu unchanged.

---

## Decisions Made

| Question | Decision |
|---|---|
| Sidebar style | Icon-only floating pill |
| Pill contents | AT logo (top) + nav icons + Hire Me arrow icon (bottom) |
| Transition animation | Diagonal slide + morph (Framer Motion, Approach A) |
| Mobile | Hamburger menu unchanged |
| Scroll threshold | 80px |

---

## Component Architecture

`Navbar.jsx` contains three co-located pieces:

### `<TopNav>`
- Existing horizontal layout: logo left, pill nav center, ThemeToggle + Hire Me right
- Exit animation on scroll: `opacity: 0`, `x: -40, y: -20`, duration 0.3s ease-out
- Wrapped in `AnimatePresence` with `key="top-nav"`

### `<SidebarPill>`
- New vertical pill, desktop-only (`hidden md:flex`)
- Position: `fixed left-4 top-1/2 -translate-y-1/2 z-50`
- Entrance: slides from `x: -60, y: -30` → `x: 0, y: 0`, spring `stiffness: 300, damping: 28`
- Exit: reverses (slides back off left edge)
- Wrapped in `AnimatePresence` with `key="sidebar-pill"`

#### Pill contents (top to bottom)
1. **AT logo** — `w-8 h-8` rounded square, `bg-brand/10 border border-brand/20`, "AT" gradient text. Links to `/`.
2. **Divider** — `w-4 h-px bg-line mx-auto`
3. **Nav icons × 5** — one per `NAV_LINKS` entry. Each is a `<SidebarIcon>` sub-component:
   - Icon: SVG, 16×16, `stroke-width 1.75`
   - Icons: Home (house), Projects (layout-grid), Skills (zap), Blog (file-text), Contact (mail)
   - Active state: purple limelight glow — top beam gradient + bloom blur (mirrors existing `LimelightLink` effect, adapted vertically)
   - Hover tooltip: label slides in from right (`x: 8 → 0`, opacity fade), positioned `left: calc(100% + 10px)`, `bg-card border border-line rounded-lg px-2 py-1 text-xs`
   - Stagger entry: each icon animates in with `delay: i * 0.04` after pill arrives
4. **Divider** — same as above
5. **Hire Me button** — `w-8 h-8` filled `bg-brand` rounded square, arrow-right SVG icon. Links to `/#contact`.

### `<Navbar>` (parent)
- Owns `scrolled` state: `window.scrollY > 80`
- Renders `<TopNav>` when `!scrolled`, `<SidebarPill>` when `scrolled`
- Both inside a single `<AnimatePresence mode="wait">` so exit completes before entrance begins

---

## Animation Spec

### Top nav exit
```
initial: { opacity: 1, x: 0, y: 0 }
exit:    { opacity: 0, x: -40, y: -20, transition: { duration: 0.3, ease: 'easeOut' } }
```

### Sidebar pill entrance
```
initial:  { opacity: 0, x: -60, y: -30 }
animate:  { opacity: 1, x: 0,   y: 0,   transition: { type: 'spring', stiffness: 300, damping: 28 } }
exit:     { opacity: 0, x: -60, transition: { duration: 0.2, ease: 'easeIn' } }
```

### Icon stagger (inside pill)
```
each icon: { initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.04 } }
```

### Limelight glow (active/hover on sidebar icon)
- Top beam: `absolute top-0 inset-x-0 h-px` gradient `transparent → #8B5CF6 → transparent` (rotated for vertical context — runs left-to-right across icon top edge)
- Bloom: `absolute top-0 inset-y-1/4 w-4 blur-md bg-brand opacity-35` (left-side bloom)

---

## Scroll Behavior

```js
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 80)
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])
```

Threshold: **80px** — triggers after clearing roughly the top of the hero.

---

## Mobile

No changes. `<SidebarPill>` has `hidden md:flex` class — never renders on mobile. Top navbar stays with hamburger menu on `< md` breakpoints.

---

## Files Changed

- `src/components/layout/Navbar.jsx` — full rewrite of the component, all logic self-contained

No new files. No new dependencies (Framer Motion already installed).
