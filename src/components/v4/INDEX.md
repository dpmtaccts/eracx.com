# ERA v4 components

Components for the `/v4` route at eracx.com.
Aesthetic: Bloomberg / Turley brutalist — Anton display, Archivo Black blocks,
IBM Plex Sans body, JetBrains Mono labels. Section grounds in white, magenta
(--v4-hot), yellow, cobalt, and ink.
Tokens at `src/styles/v4-tokens.css`, component styles at `src/styles/v4-components.css` —
both scoped under `.v4-root` so they never bleed into other routes.
Do not reuse these components outside `/v4`.

## Render order in V4.tsx

V4Statement → V4Warmth → V4WhatEra → V4Evidence (How it works / Tech land in
subsequent commits.)

## Components

- **V4Header.tsx** — Bloomberg-style issue bar at the top of every section. Takes a `phase` string (left side, dot-separated) and a `meta` array (right side). Mono uppercase, 0.14em letter-spaced, color inherits from the section.
- **V4Nav.tsx** — Main navigation. Inline ERA wordmark SVG (paths 2–4 of public/images/era-logo.svg, no symbol, fill="currentColor") on the left, mono-uppercase links in the middle (Warmth, Evidence, How it works, Engagement, Tech), solid currentColor CTA on the right. Border-bottom of 1px currentColor.
- **V4Statement.tsx** — §01 hero / statement section. Two-column layout: massive Anton headline ("Cold / outbound / is over.") left, ink-bordered sidebar (eyebrow, lede, "Evaluate your GTM →" CTA) right. Below that, a 4-cell meta band (5 / 9 / 24 / 80%) with top and bottom 1px ink rules.
- **V4Warmth.tsx** — §02 magenta-ground warmth section. Issue bar + two-column header ("Warmth compounds." Anton mega + IBM Plex lede with ink-highlighted phrase). Two stacked white-card visualizations: (1) Pentagon card — static FRVRD radar for Account 047 (F=92, R=88, V=90, R=84, D=86, composite 88) with five letter-block summary cells below; (2) Timeline card — multi-input chart, 1400×720 viewBox, 14-week trajectory with 10 event markers across Content/Social/Email/Event/Referral channels, quiet stretch shading at W4, signal-cooling event at W7 in muted gray, terminus at W14 reading "DEAL MOVING". 4-cell magenta stat band at the bottom (10 / 14 / 3 / 88). Below 900px the timeline card scrolls horizontally with a "scroll →" mono hint. All data synthetic, clearly tagged.
- **V4WhatEra.tsx** — §03 white-ground "What ERA is / isn't" section. Issue bar + Anton mega headline ("ERA doesn't replace your content." with magenta em on "content") + IBM Plex lede with yellow-highlighted "already producing signals". Three layers: (1) IS/ISN'T two-column grid — white card with magenta marker numbers vs ink-black card with yellow marker numbers, 4 numbered items each, 1px ink rule between, 2px ink outer border; (2) Content stack directory — "Your content is already running." + intro, then 6 rows in a 4-column grid (NUM / source+layer / magenta signal / action) covering white papers, webinars, CEO LinkedIn, conferences, referrals, newsletter; (3) Pull quote — parchment ground (--v4-parchment) with 4px magenta left border, Anton clamp(40px,5vw,72px) "Your content makes the warmth. / We make the warmth visible." (second line magenta), mono "WHAT ERA DOES IN ONE LINE" attribution. Below 900px the IS/ISN'T grid stacks and the directory rows reflow to 2 columns.
- **V4Evidence.tsx** — §04 yellow-ground proof section. Issue bar + two-column header ("Real loops. Real customers." Anton mega ink with muted-ink em on "customers" + IBM Plex lede). Three argument layers: (1) Logo wall — 4 ERA customer marks (Lorikeet, Assemble, Netrush, Navalent) rendered in flat ink via `filter: brightness(0)` opacity 0.85, top + bottom 1px ink rules; (2) Hero quote — Nate Houghton (Lorikeet, Head of Sales) in IBM Plex 700 weight clamp(28px, 3.5vw, 56px) with smart curly quotes via ::before/::after, attribution row with small Lorikeet logo + mono uppercase name/title/company; (3) Bottom row — Lara Vandenberg (Assemble, Founder) supporting quote in a 2px ink-bordered card on the left (1.4fr), Justin Marshall founder portrait on the right (1fr) sized max 220px with grayscale filter and mono caption. White text forbidden on yellow ground; magenta accent rested for this section.
