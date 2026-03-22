# ERA Website

> The main ERA website at eracx.com. Built with Next.js and Tailwind CSS, deployed on Vercel. This is the public-facing site for ERA's B2B revenue operations consultancy.

**Status:** In Development
**Last Updated:** 2026-03-17
**Deployed At:** [URL or "not yet deployed"]

---

## What This Is

The main ERA website at eracx.com. Built with Next.js and Tailwind CSS, deployed on Vercel. This is the public-facing site for ERA's B2B revenue operations consultancy.

---

## Tech Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- react-router-dom for SPA routing
- Deployed on Vercel

---

## How to Run Locally

```bash
# Clone and install
git clone [repo-url]
cd era-website
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in values (see Environment Variables section below)

# Run development server
npm run dev
# Open http://localhost:5173
```

---

## Environment Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `EXAMPLE_API_KEY` | Description | Source |

---

## Project Structure

```
/src/pages        — SPA page components (App, Benchmark, GtmPlanner, etc.)
/src/components   — Shared UI components
/src/lib          — Utilities, calculation engines, helpers
/public           — Static assets (logos, images)
```

---

## Current State

- [x] Main marketing site with Loop detail sections, case studies, FAQ
- [x] Mid-Market Pipeline Benchmark tool (`/benchmark`)
- [x] GTM Investment Planner tool (`/gtm-planner`)
- [x] GTM Design sprint page (`/gtm-design`)
- [x] Our Story page (`/our-story`)
- [x] Client review pages (`/review/:slug`)

---

## Key Decisions

[Document any architectural or strategic decisions that affect how this project works. These are the things someone would need to know to not break something.]

1. **[Date] — [Decision]:** [Why and what it means]

---

<!-- 
INSTRUCTIONS FOR CLAUDE CODE:
- Update "Last Updated" date whenever you modify this file
- Keep "Current State" accurate with checkboxes
- Add new Key Decisions when architectural choices are made
- Update "How to Run Locally" if setup steps change
- Update Environment Variables table when new env vars are added
- Keep the description current if the project scope changes
-->
