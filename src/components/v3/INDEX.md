# ERA v3 components

Staging components for the `/v3` route at eracx.com.
Palette: Architectural Light (Parchment, Deep Steel, Sky Blue).
Tokens live at `src/styles/v3-tokens.css`, component styles at `src/styles/v3-components.css`,
both scoped under `.v3-root` so they never bleed into other routes.
Do not reuse these components outside `/v3`.

## Components (Commit 1)

- Nav.tsx — Sticky top navigation with brand wordmark, section anchor links, and the "Start a sprint" CTA.
- Hero.tsx — Full-width hero with the "Cold outbound is done. Warmth is the asset." headline, lede, two CTAs, meta tiles, and three Nightingale-style figure markers.
- Thesis.tsx — Chalk-background band with the 95/5 thesis question and three-paragraph body.

## Commit 2 (not yet built)

HowItWorks, InteractionSequence, InteractionChain, WarmthRadars, Evidence,
PointOfView, Operators, Contact, Footer, Fixer.
