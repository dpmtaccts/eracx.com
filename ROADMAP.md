# Roadmap

Prioritized list of what needs to be built, fixed, or decided.
Updated at the end of every Claude Code session.

---

## Now (Current Sprint)

> What I'm actively working on or needs to ship this week.

### BetterUp Revenue Signal Audit (`/audit/betterup`)

**Phase 1 — Foundation**
- Scaffold `src/pages/BetterUpAudit.tsx` and `src/pages/betterup/components.tsx`
- Register routes in `src/main.tsx` (`/audit/betterup`, `/audit/betterup/summary`)
- Password gate (`dontswe@tthejrouney`, sessionStorage)
- Theme system: CSS custom properties, light default with dark toggle, localStorage persistence
- Load fonts: Instrument Serif, DM Sans, JetBrains Mono
- Stepper nav component (8 nodes, scroll-tracked, fills with rust)

**Phase 2 — Hero Sections**
- Section 1: Executive Summary (company profile, 3 hero gauges, core finding, strengths/vulnerabilities)
- Section 6: The AI Mirror (two-column simulated AI chat, score, action box)

**Phase 3 — Core Framework**
- Section 2: Brand Conviction Cascade (6 layers, expandable cards, cascade break callout)
- Section 3: LinkedIn Leadership Signals (CEO + Company Page tabs, 5 dimensions each)
- Section 4: Content-to-Pipeline Signal Map (8 signal cards, alignment bars)

**Phase 4 — Intelligence & Strategy**
- Section 5: Audience Reality (Moodlight data, tensions, dead zones, 4-stage buyer journey)
- Section 7: Investment vs. Return (current vs. projected metric cards)
- Section 8: What We'd Build Together (3-phase plan, CTA card)

**Phase 5 — Summary Page**
- Build `/audit/betterup/summary` (condensed: profile, gauges, finding, cascade, top 5 gaps, AI mirror, investment, CTA)

**Phase 6 — Polish & Deploy**
- Scroll-triggered reveals (IntersectionObserver), animated counters, gauge fills
- Responsive QA (desktop + tablet)
- Brand guideline pass: no em dashes, no exclamations, no staccato, no emoticons
- Deploy to Vercel


- [ ] Audit deployed site for broken links and image references
- [ ] Update pricing and service tier information to reflect current offerings

---

## Next (Queued)

> Ready to build once "Now" is cleared. Already scoped.

- [ ] Add GTM Design sprint product page
- [ ] Connect signal hub demo as a subdomain or embedded section

---

## Later (Backlog)

> Good ideas that need more scoping or aren't urgent.

- [ ] [Task description]
- [ ] [Task description]

---

## Known Issues

> Bugs or problems discovered but not yet fixed. Include date found.

- ~~[2026-03-23] Vercel build failing due to leftover Next.js files merged from old branch~~ — **FIXED**
- [2026-04-29] `/staging/v3` §02.A WHY WARMTH copy block placement and §02 headline length need a real-browser eye on desktop and 375px mobile. The trim from spec's 16-word headline to 10 words was confirmed via question, but full-page visual flow has not been reviewed in-browser by Justin yet. Likely fine; flagging so it gets a sanity check before the v3 page is promoted.

---

## Decisions Needed

> Open questions that block progress or affect architecture.

- [ ] [Question that needs answering before work can proceed]

---

## Done (Recently Completed)

> Moved here from "Now" when shipped. Keeps a record of momentum.

- [x] [2026-04-29] `/staging/v3` restructure shipped in four commits: minimal typographic hero replaces the ABM-pitch hero; Thesis section deleted; §02–§05 collapsed into a single "How it works" section with subsections 02.A–D; §04 Point of view converted to a horizontal pinned scroll (framer-motion, 5×100vh sticky pin, mobile vertical fallback). Sections 06/07/08/10 renumbered to 03/04/05/06. See CHANGELOG entry.
- [x] [2026-03-23] "How It Works" radial section — interactive loop-stage diagram with auto-rotation (desktop) and stacked cards (mobile)
- [x] [2026-03-23] Reverted hero from video background to canvas dot-sweep animation (Safari autoplay issues)
- [x] [2026-03-23] Cleaned up ~40 leftover Next.js files breaking Vercel build (`src/app/`, old components, `postcss.config.mjs`, `metadata.ts`, etc.)
- [x] [2026-03-17] GTM Investment Planner at `/gtm-planner`: compound growth model, diverging chart, inflection roadmap, Era nudge card
- [x] [2026-03-13] Project initialized with scaffold and templates

---

<!-- 
INSTRUCTIONS FOR CLAUDE CODE:
- Move tasks UP through the sections as they become priorities (Later -> Next -> Now)
- Move completed tasks to "Done" with the completion date
- Add newly discovered bugs to "Known Issues" with the date
- If a task is blocked by a decision, add the question to "Decisions Needed"
- Be specific: "Fix broken image links on landing page" not "Fix bugs"
- If I ask "what's next?" or "where did we leave off?", read this file first
- At session end, reorganize priorities based on what we accomplished
-->
