# Portfolio — Content & Placeholders Checklist

A single reference for every variable, placeholder, and asset across the project that you need to fill in or replace before going live.

Each section lists the **file path**, the **variable / line**, the **current value**, and a **note** about what to do.

---

## 1. Assets to drop in `client/public/`

These are missing files the app already references.

| File path | What it is | Status |
|---|---|---|
| `client/public/resume.pdf` | Your CV — used by header Resume link and the footer Download/View buttons | **MISSING — add it** |
| `client/public/favicon.svg` | Site favicon (currently a generic SVG) | Replace if you want your own |
| `client/public/og-image.png` | Open Graph share image (LinkedIn / Twitter previews) | Optional but recommended |
| Project screenshots (e.g. `client/public/projects/ecommerce.png`) | Used by `images: []` arrays in `projects.js` | Add per-project images |

---

## 2. `client/src/config/constants.js`

Central config — **most personal data lives here**.

### `SITE` object

| Key | Current value | Action |
|---|---|---|
| `name` | `'Anuj Tyagi'` | Verify |
| `role` | `'MERN Stack Developer'` | Verify / refine |
| `tagline` | `'Building fast, scalable web apps that drive real results.'` | Verify / refine |
| `email` | `'anujtyagi0720@gmail.com'` | Verify |
| `phone` | `''` (empty) | **Add your phone number** — enables footer phone row + tel: link |
| `location` | `'India'` | Make more specific if you want (e.g. "Delhi, India") |
| `available` | `true` | Toggle to `false` when you're not taking work — hides "Available" pill in footer |

### `NAV_LINKS` array

| Entry | Current href | Action |
|---|---|---|
| `GitHub` | `'https://github.com/anujtyagi'` | **Verify your real GitHub username** (placeholder profile may not exist) |
| `Resume` | `'/resume.pdf'` | Just drop the file at `client/public/resume.pdf` |

### `SOCIAL` object

| Key | Current value | Action |
|---|---|---|
| `github` | `'https://github.com/anujtyagi'` | **Verify** — same as NAV_LINKS GitHub |
| `linkedin` | `'https://linkedin.com/in/anujtyagi'` | **Verify your real LinkedIn slug** |
| `twitter` | `''` (empty) | Add full URL (e.g. `'https://twitter.com/anujtyagi'`) — auto-shows in footer if set |
| `instagram` | `''` (empty) | Add full URL — auto-shows in footer if set |

### `SERVICES` array

| Status | Note |
|---|---|
| Currently unused | The Services section uses its own internal `SERVICES` array in `Services.jsx`. You can delete this constant or keep it as a backup. |

---

## 3. `client/src/data/skills.js`

Your tech skill list with levels and emoji icons.

| Variable | Current state | Action |
|---|---|---|
| `skills[]` | 12 entries (React, JS, Node, etc. with `level: 90` style ratings) | **Review levels honestly** — recruiters scan these. Adjust % per skill or remove `level` if you don't want bars |
| `skills[].icon` | Emoji (`'⚛️'`, `'🟨'`, etc.) | Optional — replace with actual icons or keep emojis |
| `skillCategories[]` | `['All', 'Frontend', 'Backend', 'Database', 'Language', 'Tools']` | Verify these match your `category` values |

---

## 4. `client/src/data/projects.js`

**9 boilerplate projects** — all the metrics, problem/solution/result text, and stats are made up. **All `liveUrl` and `githubUrl` are empty.**

For each of the 9 entries (`id: 1` through `id: 9`):

| Field | Current state | Action |
|---|---|---|
| `title`, `slug`, `tagline` | Boilerplate names ("E-Commerce Platform", "Task Management App", etc.) | **Replace with your real project names** OR delete entries you didn't build |
| `description` | Boilerplate copy | Rewrite for your actual project |
| `problem` / `solution` / `result` | **All fabricated metrics** (e.g. "40% reduction in order errors", "200+ quizzes created") | **Rewrite with truthful, real numbers** — fake metrics destroy credibility |
| `techStack` | Boilerplate stacks | Replace with what you actually used |
| `images: []` | **Empty array** for every project | **Add real screenshots** (drop in `client/public/projects/` and reference) |
| `liveUrl: ''` | **Empty** | Add your deployed URL |
| `githubUrl: ''` | **Empty** | Add your repo URL |
| `featured` | First two are `featured: true` | Pick which projects to show on home grid |
| `order` | 1–9 | Reorder if needed |
| `coverGradient` | Pre-set per project | Style — adjust if you want |

**Recommendation:** keep only the 4–6 projects you can actually defend in an interview. Quality > quantity.

---

## 5. `client/src/data/experience.js`

2 internship entries — **all `highlights` are literal placeholder strings**.

### Entry 1 — Technobull India (id: '1')

| Field | Current state | Action |
|---|---|---|
| `role` | `'Full Stack Developer Intern'` | Verify |
| `company` | `'Technobull India'` | Verify |
| `period` | `'6 months'` | **Add actual date range** (e.g. `'Jan 2024 – Jun 2024'`) |
| `location` | `'Remote · India'` | Verify |
| `description` | Generic copy | Rewrite specific to what you did |
| `highlights[]` | **4× `'Add specific achievement or responsibility here'`** | **Replace all 4** — use STAR format, include numbers (users, latency, bugs fixed) |
| `tech` | Stack list | Verify accuracy |

### Entry 2 — Unlink Technologies (id: '2')

Same as above — `period: '1 month'` should become a date range, and the **3 highlight placeholders** must be replaced.

---

## 6. `client/src/data/education.js`

Heavily placeholder'd — search for `[ Add ` to find every blank.

### Entry 1 — Coding Ninjas (id: '1', featured course)

| Field | Current value | Action |
|---|---|---|
| `mode` | `'[ Online ]'` | Remove brackets: `'Online'` |
| `period` | `'[ Add date range ]'` | **Add** — e.g. `'2023 – 2024'` |
| `location` | `'[ Add location ]'` | **Add** — or remove the field entirely if not needed |

### Entry 2 — B.Tech / MIET (id: '2')

| Field | Current value | Action |
|---|---|---|
| `mode` | `'[ Online / Offline ]'` | **Pick one** |
| `period` | `'[ Add year range ]'` | **Add** — e.g. `'2021 – 2025'` |
| `location` | `'[ Add location ]'` | **Add** — e.g. `'Meerut, India'` |

### Entry 3 — Class 12 (id: '3')

| Field | Current value | Action |
|---|---|---|
| `school` | `'[ Add school name ]'` | **Add** |
| `mode` | `'[ Online / Offline ]'` | **Pick one** |
| `period` | `'[ Add year ]'` | **Add** |
| `location` | `'[ Add location ]'` | **Add** |
| `grade` | `'[ Add percentage / grade ]'` | **Add** — e.g. `'87%'` |

### Entry 4 — Class 10 (id: '4')

Same 5 placeholder fields as Class 12 — **all need filling**.

---

## 7. `client/src/components/sections/About.jsx`

Bio paragraphs and stats are **hardcoded inline** — not in a data file.

| Location (approx line) | Current text | Action |
|---|---|---|
| Line ~154 | `"I'm Anuj Tyagi, a MERN Stack Developer..."` (intro paragraph) | Verify / refine |
| Line ~157 | `"7 months of internship experience across two companies"` | Update if your duration changes |
| Line ~160 | Closing paragraph about UI/UX & performance | Verify / refine |
| Line ~219 | `"BTech — Computer Science & Engineering"` (in education card) | Verify school name |
| Line ~220 | `"Meerut Institute of Engineering and Technology"` | Verify |
| `EXPERIENCE` array (line ~94) | Duplicates the data in `experience.js` — **boilerplate** | Either sync with `experience.js` or refactor to import from there |
| `SERVICES` array (line ~84) | 7 services for "What I Build" list | Customize the offerings |

---

## 8. `client/src/components/sections/Hero.jsx`

Hero copy is hardcoded.

| Location (approx line) | Current text | Action |
|---|---|---|
| Line ~212 | `"Anuj Tyagi"` (intro line) | Verify |
| Line ~227 | `"I Build MERN Apps"` (main headline) | Refine if you want different positioning |
| Line ~233 | `"with the Power of AI"` (gradient sub-headline) | Refine |
| Line ~245-249 | "Full stack web apps using React, Node.js & MongoDB..." | Refine subheadline |
| Line ~270-276 | Trust bar items: `'5+ Projects'`, `'2yr Experience'`, `'React'`, `'Node.js'`, `'MongoDB'`, `'AI'` | **`'5+ Projects'` and `'2yr Experience'` are made up — update with real numbers** |
| Line ~116 (VSCodeMockup) | `developer: 'Anuj Tyagi'` inside the fake code mockup | Verify |
| Line ~119 | `'Let\'s build something great'` message in mockup | Optional — change if you want |

---

## 9. `client/src/components/sections/Services.jsx`

The Services section has its own internal `SERVICES` array (separate from `constants.js`).

| Location | Current state | Action |
|---|---|---|
| `SERVICES` array (top of file) | 6 service entries — title only, with `accent` and `glowColor` | Update titles or accent colors if needed |
| `PROCESS` array | 4-step "How I work" strip (Discover → Design → Build → Ship) | Tweak descriptions if your process differs |
| Header copy ("Services I offer", "From a single landing page...") | Hardcoded | Refine |
| `ClosingCTA` ("Have a project in mind?") | Hardcoded | Refine |

---

## 10. Server config — `server/.env`

Required environment variables (file isn't committed; use `server/.env.example` as the template).

| Var | Action |
|---|---|
| `MONGODB_URI` | Add your MongoDB connection string |
| `JWT_SECRET` | Generate a long random string |
| `ANTHROPIC_API_KEY` | Add your Claude API key (for chatbot in Phase 2) |

---

## Priority order (suggested)

1. **`client/public/resume.pdf`** — drop the file (header & footer break without it)
2. **`constants.js`** — `SITE.phone`, verify GitHub/LinkedIn URLs, add Twitter/Instagram if you use them
3. **`experience.js`** — replace all `'Add specific achievement or responsibility here'` placeholders
4. **`education.js`** — replace all `[ Add ... ]` brackets
5. **`projects.js`** — keep only real projects, add real `liveUrl` / `githubUrl` / images, fix fake metrics
6. **`Hero.jsx` trust bar** — fix the made-up `'5+ Projects'` / `'2yr Experience'` numbers
7. **`skills.js`** — sanity-check skill levels
8. **`server/.env`** — only needed when you wire up the backend / chatbot

---

## Quick search shortcuts

If you want to find every placeholder in one pass, search the project for these strings:

- `[ Add ` — every bracketed placeholder in `education.js`
- `Add specific achievement` — every blank highlight in `experience.js`
- `liveUrl: ''` and `githubUrl: ''` — every project missing links
- `images: []` — every project missing screenshots
- `phone: ''`, `twitter: ''`, `instagram: ''` — empty social slots
