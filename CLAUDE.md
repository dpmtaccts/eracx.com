# CLAUDE.md — ERA Project Configuration

> Drop this file into the root of every ERA project folder in Antigravity.
> Claude Code reads it automatically at session start.

---

## Identity

You are building tools and applications for **ERA** (eracx.com), a B2B revenue operations consultancy operated by Justin Marshall under Department of Loyalty LLC. ERA's methodology is called **Revenue Through Subtraction**: fewer tools, fewer motions, better targeting, compounding engagement.

ERA serves B2B companies with signal-driven growth systems built around three loops: Connection (unknown to known), Trust (known to closed), and Loyalty (closed to retained/expanded).

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS (utility-first, no custom CSS unless necessary)
- **Charts:** Recharts
- **Deployment:** Vercel (team ID: team_jjmde8H3Mq9C53LGsAnOYv5G)
- **Domain:** eracx.com
- **Language:** TypeScript (strict mode preferred, JavaScript acceptable for quick prototypes)
- **Package manager:** npm
- **Node version:** 18+

---

## Brand Tokens

Use these consistently across all ERA projects:

```
Colors:
  Background:    #0A0A0A (near-black)
  Surface:       #1A1A1A
  Border:        #2A2A2A
  Text Primary:  #FFFFFF
  Text Secondary:#A0A0A0
  Accent:        #E8FF47 (electric lime)
  Accent Hover:  #D4EB3A

Typography:
  Headings:  Instrument Sans (fallback: system sans-serif)
  Body:      Instrument Sans
  Mono/Code: JetBrains Mono (fallback: monospace)

Warmth Stage Colors:
  Cold:        #6B7280 (gray-500)
  Aware:       #3B82F6 (blue-500)
  Engaged:     #F59E0B (amber-500)
  Considering: #F97316 (orange-500)
  Committing:  #EF4444 (red-500)
  HOT badge:   #EF4444 with flame icon
  AT RISK:     #EAB308 with warning icon
```

---

## Scoring Model: FRVRD

ERA's core scoring framework. Every client dashboard uses this.

| Signal | What It Measures | Example Events |
|--------|-----------------|----------------|
| Frequency | How often engagement happens | Email opens, clicks, meetings, site visits |
| Recency | How recently engagement happened | Days since last touch (lower = better) |
| Value | Quality/depth of engagement | Meeting set > click > open. Role weight: C-suite > manager |
| Responsiveness | Do they reply/act? | Reply rate, RSVP, form fills, direct messages |
| Density | How many people in the org engage? | Unique contacts touched / total buying committee |

Scoring includes time decay, role multipliers, and warmth stage thresholds.
Stages: Cold < 20, Aware 20-39, Engaged 40-59, Considering 60-79, Committing 80+.
HOT badge: score >= 80 AND positive velocity (30d).
AT RISK badge: score dropped >= 15 points in 30d OR no activity in 21+ days with prior score >= 40.

---

## Coding Conventions

### Structure
- Use the App Router (`/app` directory, not `/pages`)
- Group related components in feature folders: `/app/dashboard/components/`
- Shared utilities go in `/lib`
- Types go in `/types`
- Static data / seed files go in `/data`

### Style
- Prefer named exports for components
- Use `"use client"` directive only when hooks or browser APIs are needed
- Server components by default
- Keep components under 150 lines. Extract subcomponents when they grow.
- No `any` types unless prototyping. Add a `// TODO: type this` comment if you must.

### Naming
- Components: PascalCase (`AccountCard.tsx`)
- Utilities/hooks: camelCase (`useWarmthScore.ts`)
- Constants: SCREAMING_SNAKE (`MAX_ACCOUNTS_PER_PAGE`)
- File names match export names

### Error Handling
- Wrap async data fetches in try/catch
- Show user-friendly error states, not raw errors
- Log errors to console in development

---

## Operational Rules (Critical)

### Three Living Documents
Every project MUST maintain these three files in the project root. Update them at the end of every session.

1. **CHANGELOG.md** — What changed and when. Newest entries at top.
2. **README.md** — What this project is, how to run it, current status.
3. **ROADMAP.md** — What needs to be built next, prioritized.

When I say "update docs" or "wrap up," update all three.

### Session Discipline
- At session start: read CHANGELOG.md, README.md, and ROADMAP.md to understand current state
- At session end: update all three with what was accomplished
- If a bug is found but not fixed, add it to ROADMAP.md under "Known Issues"
- If a decision is made that affects architecture, note it in CHANGELOG.md

### Build Approach
- Plan before building. Write a brief implementation plan for anything that touches 3+ files.
- Build incrementally. Get one thing working before starting the next.
- Test as you go. Run `npm run dev` and verify in browser after each meaningful change.
- Commit messages should be descriptive: "Add FRVRD radar chart to account detail panel" not "update"

### What NOT To Do
- Do not install auth libraries (next-auth, clerk, etc.) unless explicitly asked
- Do not add analytics or tracking scripts
- Do not refactor working code unless asked
- Do not change the Vercel deployment config without asking
- Do not create separate CSS files. Use Tailwind.
- Do not add loading spinners or skeleton screens unless asked. Ship fast.

---

## Current Clients (for seed data and testing)

| Client | Slug | Industry Context |
|--------|------|-----------------|
| Netrush | netrush | Amazon marketplace acceleration |
| POP | pop | Creative agency |
| Miniac | miniac | Video production |
| Navalent | navalent | Leadership advisory |
| Seismic | seismic | Sales enablement platform |
| ERA Demo | era-demo | Internal testing |

---

## Vercel Deployment

- All ERA projects deploy to Vercel under team `team_jjmde8H3Mq9C53LGsAnOYv5G`
- Primary domain: eracx.com
- Subdomain pattern for apps: `app.eracx.com`, `hub.eracx.com`
- Environment variables are set in Vercel dashboard, not committed to repo
- Always include a `.env.example` with variable names (no values)

---

## When In Doubt

- Ship something that works over something that's perfect
- Ask me before making architectural decisions
- Default to the simplest solution that handles the current use case
- If you hit a wall, document what you tried and what failed in the CHANGELOG
