# ERA v4 components

Components for the `/v4` route at eracx.com.
Aesthetic: Bloomberg / Turley brutalist — Anton display, Archivo Black blocks,
IBM Plex Sans body, JetBrains Mono labels. Section grounds in white, magenta
(--v4-hot), yellow, cobalt, and ink.
Tokens at `src/styles/v4-tokens.css`, component styles at `src/styles/v4-components.css` —
both scoped under `.v4-root` so they never bleed into other routes.
Do not reuse these components outside `/v4`.

## Render order in V4.tsx

V4Statement (only section in this commit. Warmth / Evidence / How it works /
Tech land in subsequent commits.)

## Components

- **V4Header.tsx** — Bloomberg-style issue bar at the top of every section. Takes a `phase` string (left side, dot-separated) and a `meta` array (right side). Mono uppercase, 0.14em letter-spaced, color inherits from the section.
- **V4Nav.tsx** — Main navigation. Archivo Black "ERA" logo on the left, mono-uppercase links in the middle (Warmth, Evidence, How it works, Engagement, Tech), solid currentColor CTA on the right. Border-bottom of 1px currentColor.
- **V4Statement.tsx** — §01 hero / statement section. Two-column layout: massive Anton headline ("Cold / outbound / is over.") left, ink-bordered sidebar (eyebrow, lede, "Evaluate your GTM →" CTA) right. Below that, a 4-cell meta band (5 / 9 / 24 / 80%) with top and bottom 1px ink rules.
