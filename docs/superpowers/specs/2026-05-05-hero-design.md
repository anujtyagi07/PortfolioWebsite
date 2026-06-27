# Hero Section Design Spec
Date: 2026-05-05

## Layout
Centered single-column. Order: badge → headline → subheadline → CTAs → trust bar → VS Code scroll container.

## Content
- **Badge**: `● Available for hire` — purple pill
- **Headline**: `MERN Stack Developer` (white) + `+ AI Integration` (purple gradient)
- **Subheadline**: `Building the next generation of intelligent web apps with React, Node.js & MongoDB`
- **CTAs**: `Hire Me →` (brand filled) + `View Work` (ghost)
- **Trust bar**: `5+ Projects · 2yr Experience · React · Node.js · MongoDB`
- **Scroll container**: VS Code mockup — `GET /api/hire-me → { developer: 'Anuj Tyagi', available: true }`

## Animation (Framer Motion)
- Badge: fade-in, delay 0.2s
- Headline lines: fade-up, staggered 0.1s each
- Subheadline: fade-up after headline
- CTAs: fade-up together, delay 0.2s after sub
- Trust bar: fade-in, delay 0.3s after CTAs
- VS Code container: `useScroll` + `useTransform` — rotateX 20→0deg, scale 0.9→1

## Responsive
- Mobile: full width, headline 2.5rem, container static (no scroll effect)
- Tablet: same as desktop, smaller container
- Desktop: full Aceternity scroll effect, container max-width 900px

## Files
- `client/src/components/sections/Hero.jsx` — main component
- `client/src/pages/Home.jsx` — imports Hero
