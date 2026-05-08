# Changelog

All notable changes to this project. Newest entries first.
Format: `[YYYY-MM-DD] — Summary of what changed`

---

## [2026-05-08] — v4 promoted to /, pre-launch fixes

V4 is now the default eracx.com homepage. The legacy `App` is preserved at `/legacy` so revert is one commit away; `/v4` stays as an alias so existing inbound links still resolve.

- **Route promotion** (`src/main.tsx`): `/` now renders `V4`. `/legacy` renders the previous `App`. `/v4` keeps the old binding.
- **▸02 APPROACH TO GROWTH restructure**: replaced the alternating WHAT/HOW/WHY blocks with one "Don't pitch strangers. Get to know them." headline plus three full-width parchment cards (FIG.01 campaign vs. loop, FIG.02 FRVRD warmth pentagon, FIG.03 90-day account timeline). Pentagon and timeline color-shifted from magenta/multi-channel to ink-only on parchment.
- **Pre-launch additions**: ICP qualifier line in ▸01 ("FOR B2B COMPANIES WITH 50 ACCOUNTS THAT MATTER AND NO RELIABLE WAY IN."); new V4PullQuote band between ▸01 and ▸02 surfacing the Lorikeet quote ("Justin builds the thing most consultants just talk about."); new V4WhatYouGet parchment band ▸02b ("Not a project. An operating layer.") with WEEK 01-02 / 03-04 / 05-08 / ONGOING rows; operating-model opener at the top of ▸03 ("We don't build and leave. We run the loop with your team.").
- **Symbol replacement**: every § used as a section marker on rendered surfaces replaced with ▸ (U+25B8). 55 instances across V4 phase labels, the navalent-enrichment audit page, the Halo landing page (`era-linkedinbuilder` repo), Design/ HTML mockups, INDEX.md docs, CHANGELOG, ROADMAP. Code/CSS comments left alone per spec.
- **Lara Vandenberg quote removed** from ▸04 EVIDENCE (preserved for the dpmt.co move; Assemble logo stays in the marquee).
- **Cleaned up**: deleted `V4Interstitial.tsx`, `V4Warmth.tsx` (superseded by `V4System` and the new ▸02 structure); added `V4PullQuote.tsx`, `V4System.tsx`, `V4WhatYouGet.tsx`.

---

## [2026-04-29] — v3 staging restructure: hero, section collapse, POV horizontal scroll

Substantial restructure of `/staging/v3`. Shipped as four sequential commits so any change can be reverted independently. Six top-level sections after the restructure (was nine).

- **Hero rewrite** ([0fcc7bd](#)): replaced two-column ABM-pitch hero with a single-column typographic moment. New italic-serif two-line headline ("Clicks don't close. / Relationships do."), sans-serif subhead, two CTAs (Get Started, Evaluate your GTM). No animation, no callout boxes, no FIG 1.0/2.0/3.0 row. Pruned `.hero-grid`, `.hero-side`, `.hero-meta`, `.hero-corner(s)`, `.hero-title .slab/.accent` styles.
- **Thesis section deleted** ([d1ae42e](#)): the ▸01 "Forget vanity metrics / Build warmer pipeline" band was redundant with the new hero. Removed component, removed Thesis nav link, deleted dead `.thesis*` CSS.
- **Sections 02–05 collapsed into one** ([cfdc7b0](#)): Framework, How It Works, Signal Catalog, and Loop now live under a single ▸02 "How it works" umbrella with a new section opener (`HowItWorksHeader`). Subsection labels: 02.A Why warmth (FrvrdSection) → 02.B What we listen for (SignalRiver) → 02.C How the loop runs (Loop) → 02.D One account, six weeks (HowItWorks). New `.subsection` class suppresses inner section borders so 02.A–C flow seamlessly; 02.D keeps its native border to separate ▸02 from ▸03. The id="how" anchor moves from HowItWorks to HowItWorksHeader. Renumbered rest: 06→03 Evidence · 07→04 Point of view · 08→05 What to expect · 10→06 Request your audit. ▸02.A swapped its centered Phase 0 statement (which duplicated the new hero) for the new "Why warmth" two-paragraph copy block.
- **▸04 Point of view → horizontal pinned scroll** ([85afe0a](#)): five principles now pin and convert vertical scroll input to horizontal panel advancement. Implemented with framer-motion (already in deps) — `useScroll`/`useTransform` on a 5×100vh outer with 100vh sticky inner, 500vw flex track translating 0% → -80%. Progress indicator: "01 / 05" mono counter + 5 dots (active dot tracked via `useMotionValueEvent`). Mobile (≤767px) collapses to vertical stacking via CSS only; framer's inline transform is overridden with `transform: none !important`. No JS UA detection. Section header stays in normal flow above the scroller.
- **DECISION:** Section 02 headline shortened from spec's 16 words to 10 to fit `.section-h2` typography without wrapping past two lines. User chose the trim (option A) when offered alternatives.
- **DECISION:** WHY WARMTH copy in ▸02.A rendered as a center-aligned overlay (left-aligned text inside a centered max-width block) rather than the spec's "upper-left third of the viewport," because the FrvrdSection's pinned scroll-driven canvas centers the pentagon and an upper-left overlay would have fought it. User pre-approved this fallback.
- Verified `npx tsc -b --noEmit` clean and `npx vite build` clean across all four commits.

---

## [2026-04-13] — BetterUp Revenue Signal Audit Initialized

- Added design spec at `docs/betterup-audit-design-spec.md` (8 sections, light/dark theme system, stepper nav)
- Added Pinwheel brand health assessment at `docs/BetterUp Brand Health_Feb_ 2026.pdf`
- Added Moodlight audience intelligence report at `docs/betterup-moodlight-audience.md`
- Created `docs/reference/` for visual prototype .jsx files (brand-conviction-cascade, linkedin-leadership-audit, content-to-pipeline-signal-map)
- Appended BetterUp section to CLAUDE.md (routes, password, theme palettes, brand guidelines, architecture)
- Routing decision: follow Navalent pattern (Vite + React Router), not Next.js as spec suggests

---

## [2026-03-23] — How It Works Radial Section

- Added interactive radial diagram showing all three loops (Connection, Trust, Loyalty) with three stages each
- Auto-rotating animation cycles through stages with 3-second intervals, triggered by IntersectionObserver
- Desktop: two-column layout with SVG diagram + detail panel
- Mobile: stacked card layout with loop sections and stage cards
- Tool tags toggle (show/hide third-party tool names)
- Progress dots for direct navigation to any stage
- Play/Pause control for auto-rotation
- CTA: "Operational in 2 to 4 weeks" + "See pricing →" button
- Updated "See how each loop works →" CTA to smooth-scroll to this section
- **DECISION:** Used prompt-specified colors (Teal `#1FA7A2`, Oxide `#B85C4A`, Magenta `#D43D8D`) rather than existing loop colors for visual differentiation

---

## [2026-03-23] — Hero revert & codebase cleanup

- Reverted hero background from video (`hero-bg-video.mp4`) back to canvas dot-sweep animation for better cross-browser compatibility (Safari autoplay issues)
- Removed ~40 leftover Next.js files (`src/app/`, `postcss.config.mjs`, `next-env.d.ts`, old lowercase components) that were merged in from an older branch and broke the Vercel build
- Removed unused files: `contact-form.tsx`, `faq-section.tsx`, `metadata.ts`, `footer.tsx`, `nav.tsx`, `horizontal-programs.tsx`, `loop-diagram.tsx`, `scroll-hero.tsx`, `service-card.tsx`, `service-detail-page.tsx`, `cta-section.tsx`, `results-grid.tsx`, `cost-comparison.tsx`, `scroll-loop-diagram.tsx`, `era-experience/`, `src/lib/content.ts`
- **DECISION:** Canvas dot animation hero preferred over video background due to Safari autoplay restrictions
- Verified `tsc -b && vite build` passes cleanly before deploy

---

## [2026-03-17] — GTM Investment Planner v4 (complete rewrite)

- Rewrote `src/lib/gtmEngine.ts`: benchmark staffing model by vertical and revenue stage, replacing v3 pipeline math
- Rewrote `src/pages/GtmPlanner.tsx`: 4 CEO-level inputs, stacked bar chart, milestone cards with hire/buy/outsource tradeoffs
- **DECISION:** Shifted from diverging-lines chart to stacked headcount bars by revenue milestone
- **DECISION:** 3-4 CEO-level inputs replace 9 operational sliders (Brad test reframe)
- **DECISION:** Era appears as one outsource option, not the prescribed answer
- v3 code fully replaced

---

## [2026-03-17] — Added GTM Investment Planner

- Built standalone GTM Investment Planner tool at `/gtm-planner`
- Calculation engine in `src/lib/gtmEngine.ts`: compound growth model, five inflection detectors, risk severity, adaptive nudge copy
- Full page in `src/pages/GtmPlanner.tsx`: two-panel layout, SVG diverging-lines chart with danger zone, inflection roadmap cards, Era nudge card
- **DECISION:** Raw SVG for chart (not Recharts) for fine-grained danger zone control
- **DECISION:** Compound quarterly growth rate (not linear) for realistic accelerating demand curves
- Mobile responsive below 768px
- Route added at `/gtm-planner`

---

## [2026-03-13] — Project initialized

- Created project structure and initial scaffold
- Added CLAUDE.md, CHANGELOG.md, README.md, ROADMAP.md
- Established coding conventions and operational rules

---

<!-- 
INSTRUCTIONS FOR CLAUDE CODE:
- Add a new entry at the TOP of this file (below the header, above the most recent entry)
- Use the date format [YYYY-MM-DD]
- Group related changes under a single date heading
- Include: what was built, what was fixed, what was decided
- If a breaking change was made, prefix with **BREAKING:**
- If a decision was made that affects future work, prefix with **DECISION:**

Example entry:

## [2026-03-15] — Added FRVRD scoring engine

- Built scoring engine in `/lib/scoring.ts` with all 5 signal calculations
- Added time decay function (30-day half-life)
- Added role multiplier lookup (C-suite: 3x, VP: 2x, Director: 1.5x, Manager: 1x)
- **DECISION:** Using 30-day window for velocity calculation, not 14-day
- Unit tests passing for all warmth stage thresholds
- Known issue: density calculation assumes buying committee size of 5 (hardcoded)
-->
