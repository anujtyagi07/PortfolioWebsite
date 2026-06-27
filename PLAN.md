# Anuj Tyagi — Production Portfolio: Architecture & Build Plan

## Overview

Production-grade MERN portfolio built to get hired and convert freelance clients.
Feels like a real SaaS product, not a template.

**Framework**: React 18 + Vite (Next.js upgrade later)
**Language**: JavaScript
**Structure**: Monorepo (`/client` + `/server`)
**Workflow**: Each UI section is built only after a reference image is provided.

---

## Tech Stack

| Layer       | Choice                                |
|-------------|---------------------------------------|
| Frontend    | React 18 + Vite 5                     |
| Styling     | Tailwind CSS v3 + custom design tokens|
| Animations  | Framer Motion                         |
| Routing     | React Router v6                       |
| HTTP Client | Axios                                 |
| Backend     | Express.js                            |
| Database    | MongoDB + Mongoose                    |
| Auth        | JWT (admin panel)                     |
| AI          | Claude claude-haiku-4-5 (chatbot)             |
| Dev Tooling | ESLint, Prettier                      |

---

## Folder Structure

```
portfolio-website/
├── client/                        ← React + Vite + Tailwind
│   ├── public/
│   │   ├── resume.pdf
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/                ← Button, Card, Badge, Input, Modal, Tag
│   │   │   ├── layout/            ← Navbar, Footer, Layout, ThemeToggle
│   │   │   └── sections/          ← Hero, Services, Projects, Skills,
│   │   │                             Experience, Testimonials, BlogPreview, Contact
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminProjects.jsx
│   │   │       └── AdminBlog.jsx
│   │   ├── hooks/                 ← useTheme, useScrollSpy, useApi, useLocalStorage
│   │   ├── context/               ← ThemeContext.jsx, AuthContext.jsx
│   │   ├── lib/                   ← axios.js, api.js
│   │   ├── config/
│   │   │   ├── theme.js           ← design tokens
│   │   │   └── constants.js       ← nav links, social links, meta
│   │   ├── data/                  ← projects.js, skills.js, experience.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── models/
│   │   │   ├── Project.js
│   │   │   ├── BlogPost.js
│   │   │   ├── Message.js
│   │   │   └── Admin.js
│   │   ├── controllers/
│   │   ├── routes/
│   │   │   ├── projects.js
│   │   │   ├── contact.js
│   │   │   ├── blog.js
│   │   │   ├── admin.js
│   │   │   └── chat.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── validate.js
│   │   │   └── rateLimit.js
│   │   └── app.js
│   ├── .env.example
│   └── package.json
│
└── package.json                   ← npm workspaces root
```

---

## Design System

### Colors
| Token          | Value     | Usage                    |
|----------------|-----------|--------------------------|
| brand          | #8B5CF6   | Primary accent (purple)  |
| brand.dark     | #7C3AED   | Hover states             |
| brand.light    | #A78BFA   | Subtle accents           |
| dark.bg        | #0A0A0F   | Dark mode background     |
| dark.surface   | #111118   | Cards, panels            |
| dark.border    | #1E1E2E   | Dividers                 |
| light.bg       | #FFFFFF   | Light mode background    |
| light.surface  | #F8FAFC   | Cards, panels            |
| light.border   | #E2E8F0   | Dividers                 |

**Rule**: 80% neutral, 20% accent. Dark mode is the default.

### Typography
- **UI**: Inter
- **Code**: Fira Code

### Spacing
8px base scale: `2 / 4 / 6 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64px`

---

## Pages & Routing

| Route              | Page               | Access    |
|--------------------|--------------------|-----------|
| `/`                | Home               | Public    |
| `/projects/:slug`  | ProjectDetail      | Public    |
| `/blog`            | Blog               | Public    |
| `/blog/:slug`      | BlogPost           | Public    |
| `/admin/login`     | AdminLogin         | Public    |
| `/admin`           | AdminDashboard     | Protected |
| `/admin/projects`  | AdminProjects      | Protected |
| `/admin/blog`      | AdminBlog          | Protected |

---

## Home Page Sections

1. **Hero** — Name, tagline, value prop, CTA: Hire Me + View Work
2. **Services** — What I offer (freelance conversion focus)
3. **Projects** — Case-study cards: Problem → Solution → Result
4. **Skills** — Visual tech stack grid
5. **Experience** — Career timeline
6. **Testimonials** — Social proof (placeholder-ready)
7. **Blog Preview** — Latest 3 posts
8. **Contact** — Working form + social links + availability

---

## Backend API

```
GET    /api/projects              All projects (public)
GET    /api/projects/:slug        Single project (public)
POST   /api/projects              Create (admin)
PUT    /api/projects/:id          Update (admin)
DELETE /api/projects/:id          Delete (admin)

GET    /api/blog                  Published posts (public)
GET    /api/blog/:slug            Single post (public)
POST   /api/blog                  Create (admin)
PUT    /api/blog/:id              Update (admin)
DELETE /api/blog/:id              Delete (admin)

POST   /api/contact               Submit form (rate-limited)
POST   /api/admin/login           Returns JWT
GET    /api/admin/messages        Contact messages (admin)
POST   /api/chat                  AI chatbot (proxies to Claude)
```

---

## Implementation Phases

### Phase 0 — Scaffold (no reference needed)
- [ ] Monorepo init (npm workspaces)
- [ ] Vite + React + Tailwind + React Router + Framer Motion + Axios
- [ ] Express + Mongoose + helmet + cors + rate-limiter
- [ ] Design tokens in tailwind.config.js
- [ ] Navbar, Footer, Layout, ThemeToggle
- [ ] ThemeContext (dark/light, default dark)
- [ ] AuthContext + ProtectedRoute
- [ ] Static data files (projects, skills, experience)
- [ ] Axios instance + auth interceptor
- [ ] MongoDB connection + .env setup

### Phase 1 — Sections (reference-driven)
Each section built after reference image is provided:
- [ ] Hero
- [ ] Services
- [ ] Projects (cards + detail page)
- [ ] Skills
- [ ] Experience
- [ ] Testimonials
- [ ] Blog preview + Blog pages
- [ ] Contact form

### Phase 2 — Advanced Features
- [ ] Admin panel (JWT login + CRUD)
- [ ] AI chatbot widget + /api/chat endpoint
- [ ] Resume download button

### Phase 3 — Polish & Performance
- [ ] React.lazy + Suspense (code splitting)
- [ ] Image optimization (WebP)
- [ ] Framer Motion animations (entrance + scroll)
- [ ] react-helmet-async (SEO meta tags)
- [ ] Lighthouse 90+ audit
