# AgriMateKE — Phase 1 Technical Documentation

> Built by: morginessau2-max  
> Version: 3.0  
> Status: Phase 1 Complete — Live at agrimateke.netlify.app  
> Last Updated: May 2026

---

## What Was Built

A fully functional Progressive Web App demo built as a single HTML file. No frameworks, no build tools, no dependencies except one charting library. The entire application — UI, state management, routing, data, and logic — lives in one file that any browser can open instantly.

---

## Frontend Architecture

The pattern used is called a **Single Page Application (SPA)** built with Vanilla JavaScript. Instead of loading a new page every time you click something, the app re-renders the content area dynamically using a custom render engine.

The core render loop:

```javascript
function render() {
  document.getElementById('root').innerHTML = buildApp()
  afterRender()
}
```

Every time state changes — a user clicks a button, submits a form, navigates to a page — `render()` is called and the entire UI is rebuilt from scratch. This is called **declarative UI**.

**State management** is handled through simple JavaScript variables at the top of the file:
- `PAGE` — current active page
- `AUTH` — whether user is logged in
- `MODAL` — which modal is open
- `LANG` — current language (en/sw)
- `CHAT_MSGS` — Shamba Bot conversation history

**Client-side routing** — the `PAGE` variable holds the current page name and a router function maps it to the correct render function. Same concept as React Router, just simpler.

---

## Technologies Used

### HTML5
The structural backbone. Semantic elements like `<nav>`, `<header>`, `<main>`, `<aside>` used for proper document structure and accessibility.

### CSS3
All styling written in pure CSS. Key features used:

- **CSS Custom Properties (Variables)** — Entire color system, typography, spacing defined as variables under `:root{}`. Changing one variable updates the entire app.
- **CSS Grid** — Used for metric cards with `repeat(auto-fit, minmax(170px, 1fr))` — automatically responsive without media queries.
- **CSS Flexbox** — Sidebar layout, navigation items, modal headers, button groups, horizontal alignment.
- **CSS Animations & Keyframes** — `fadeIn` on page transitions, `pulse` on Shamba Bot avatar, `toastIn` on notifications, `typeBlink` on typing indicator dots.
- **CSS Media Queries** — Sidebar collapses on screens smaller than 768px.
- **Linear Gradients** — Sidebar, weather card, Shamba Bot header, Pro upgrade card.

### JavaScript (ES6+)
All application logic. Key concepts used:

- **Template Literals** — Every HTML component built using backtick strings with `${}` interpolation.
- **Array Methods** — `.map()`, `.filter()`, `.reduce()`, `.find()`, `.forEach()`, `.flatMap()` for data transformation and querying.
- **Arrow Functions** — Used throughout for concise syntax.
- **Destructuring** — Extracting values from objects cleanly.
- **Spread Operator** — Adding items to arrays without mutation.
- **setTimeout** — Simulates Shamba Bot typing delay for realistic AI feel.
- **Event Delegation** — All events handled via inline `onclick` attributes calling global functions (intentional for a render-everything approach).

### Chart.js (v4.4.1)
The only external library. Loaded via CDN. Used for:
- Bar chart — 7-day revenue on dashboard
- Line chart — 5-month price trends on market prices page

Chart instances stored in `window._rc` and `window._pc` to prevent memory leaks on re-render.

### Google Fonts
Two font families:
- **Outfit** — Body font. Geometric sans-serif, modern and highly readable at small sizes.
- **DM Serif Display** — Display/heading font for logo and page titles. High-contrast serif adding character and professionalism.

---

## Design System

### Color Palette
Green-dominant palette with 8 shades from `--g50` (near white) to `--g900` (near black), plus:
- **Amber** — warnings and overdue alerts
- **Red** — errors and danger states
- **Sky** — informational content
- **Purple** — special/premium states

### Typography Scale
| Size | Usage |
|------|-------|
| 10–11px | Labels, metadata, badges |
| 12–13px | Body text, descriptions |
| 14–15px | Primary content |
| 16–18px | Section titles |
| 22–26px | Metrics and display text |

### Spacing System
Base unit: **4px**. Scale: 4, 8, 12, 16, 20, 24, 32, 48px.

### Border Radius Scale
| Variable | Value | Usage |
|----------|-------|-------|
| `--r-sm` | 8px | Buttons, inputs |
| `--r-md` | 12px | Cards |
| `--r-lg` | 16px | Large containers |
| `--r-xl` | 24px | Modals |
| `--r-full` | 999px | Pills, badges |

### Shadow Scale
| Variable | Usage |
|----------|-------|
| `--shadow-sm` | Subtle card elevation |
| `--shadow-md` | Hover states, dropdowns |
| `--shadow-lg` | Modals |

---

## Data Architecture

All data stored in a JavaScript object called `DB` — a mock database living in memory:

```
DB
├── user          → logged-in farmer profile
├── crops         → array of crop objects
├── livestock     → array of groups with daily records
├── sales         → array of sale transactions
├── expenses      → array of expense records
├── tasks         → array of tasks with status
├── prices        → market prices keyed by region
├── vets          → array of verified veterinarians
├── ads           → array of advertisement objects
├── grants        → array of government grant listings
└── activity      → recent activity log entries
```

Every action mutates the relevant `DB` array and calls `render()`. In Phase 2, each mutation becomes a Supabase database call that persists permanently.

---

## Features Built

| Feature | Status | Phase 2 Upgrade |
|---------|--------|-----------------|
| Authentication | ✅ Mock | Real Supabase Auth |
| Dashboard | ✅ Complete | Live data from DB |
| Crops Module (CRUD) | ✅ Complete | Supabase persistence |
| Livestock Module | ✅ Complete | Supabase persistence |
| Sales & Expenses | ✅ Complete | Supabase persistence |
| Tasks & Reminders | ✅ Complete | SMS alerts via Africa's Talking |
| Weather | ✅ Mock data | OpenWeatherMap API |
| Market Prices | ✅ Mock data | Real data source |
| Shamba Bot (AI) | ✅ Keyword-based | Claude/OpenAI API |
| Vet Directory | ✅ Mock data | Admin-approved real vets |
| Agri Deals (Ads) | ✅ Static | Admin-managed ad system |
| Govt Grants Board | ✅ Static | Admin-updated listings |
| Settings & Profile | ✅ Session only | Persistent via Supabase |
| i18n (EN + SW) | ✅ Complete | Extensible to more languages |
| Pro Upgrade | ✅ Simulated | Real M-Pesa Daraja API |
| Offline Mode | ❌ Not yet | PWA Service Worker |
| Admin Dashboard | ❌ Not yet | Phase 2 |

---

## Key Developer Q&A

**Q: How does data persist between sessions?**  
It doesn't yet. Refreshing resets everything. Fix: Supabase — every write to `DB` becomes a Supabase insert/update.

**Q: How is authentication secured?**  
It isn't yet — current login is cosmetic. Phase 2: Supabase Auth with password hashing, JWT tokens, session management, and Row Level Security.

**Q: How does Shamba Bot work?**  
Keyword matching against pre-written responses. Not real AI. Phase 2: API call to Claude/OpenAI with the farmer's actual farm data as context.

**Q: Is it mobile-friendly?**  
Yes. Sidebar collapses under 768px. Grids reflow automatically. Touch targets minimum 44px. Not yet tested below 360px width.

**Q: How do you handle offline functionality?**  
Currently not supported — requires internet for CDN assets. Phase 2: Service Worker caches assets and queues writes when offline.

**Q: How scalable is this architecture?**  
Phase 1 HTML file is not scalable — intentionally simple to ship fast. Phase 2: React + Supabase + Vercel scales to millions of users with no infrastructure changes.

**Q: How is payment handled?**  
M-Pesa button simulates payment. Phase 2: Daraja API — farmer enters phone, receives STK push, approves PIN, server receives callback and upgrades plan automatically.

**Q: Who moderates vets and ads?**  
Currently no moderation. Phase 2: Admin dashboard at protected URL where founder reviews KVB license numbers and approves/rejects applications via database flag.

**Q: What is the testing strategy?**  
Phase 1: Manual testing only. Phase 2: Jest for unit tests, Playwright for end-to-end tests, GitHub Actions for CI/CD automation on every push.

---

## Phase 2 Roadmap

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite (PWA) |
| Styling | Tailwind CSS |
| State | Zustand + React Query |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| AI | Claude API / OpenAI |
| SMS | Africa's Talking |
| Payments | M-Pesa Daraja API |
| Weather | OpenWeatherMap API |
| Hosting | Vercel (frontend) + Supabase Cloud |

### Build Order
1. Set up React + Vite project structure
2. Connect Supabase — run SCHEMA.sql
3. Build real authentication (sign up / sign in / session)
4. Migrate Dashboard with live data
5. Migrate all modules (Crops, Livestock, Sales, Tasks)
6. Connect OpenWeatherMap API
7. Connect real market price data source
8. Connect Claude API for real Shamba Bot
9. Build Admin Dashboard (vet approvals, ad management)
10. M-Pesa Daraja integration
11. SMS alerts via Africa's Talking
12. PWA Service Worker (offline mode)
13. Deploy to Vercel with custom domain

---

## Live Links

| Resource | URL |
|----------|-----|
| Live App | https://agrimateke.netlify.app |
| GitHub Repository | https://github.com/morginessau2-max/agrimateke |

---

## About AgriMateKE

**Mission:** To empower farmers in Kenya and beyond with accessible digital tools that simplify daily tasks, improve productivity, and connect them to vital information.

**Vision:** To become Africa's leading farmer companion platform, driving sustainable agriculture through technology, innovation, and community.

**Tagline:** *Your trusted digital companion for smarter, sustainable farming.*

---

*Documentation written by the AgriMateKE development team. Phase 1 completed May 2026.*
