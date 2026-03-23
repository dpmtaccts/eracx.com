# Changelog

All notable changes to this project. Newest entries first.
Format: `[YYYY-MM-DD] — Summary of what changed`

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
