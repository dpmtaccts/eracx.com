# ERA v3 components

Staging components for the `/v3` route at eracx.com.
Palette: Architectural Light (Parchment, Deep Steel, Sky Blue).
Tokens at `src/styles/v3-tokens.css`, component styles at `src/styles/v3-components.css` —
both scoped under `.v3-root` so they never bleed into other routes.
Do not reuse these components outside `/v3`.

## Render order in V3.tsx
Nav → Hero → Thesis → HowItWorks → Evidence → PointOfView → Operators → Contact → Footer → Fixer

## Components

- **Nav.tsx** — Sticky top navigation with brand logo (/images/era-logo.svg), section anchor links, and the "Start a sprint" CTA.
- **Hero.tsx** — Full-width hero with the "Cold outbound is done. Warmth is the asset." headline, lede, two CTAs, meta tiles, and three Nightingale-style figure markers.
- **Thesis.tsx** — Chalk-background band with the 95/5 thesis question and three-paragraph body.
- **HowItWorks.tsx** — §01. Wraps the three "How it works" figures below.
  - **InteractionSequence.tsx** — Figure 01. Horizontal 5-touchpoint SVG (Post → Comment → Landing page → Email → Meeting).
  - **InteractionChain.tsx** — Figure 02. Five signal cards (source → captured → dimensions → fired next) with warmth-stage color stripes.
  - **WarmthRadars.tsx** — Figure 03. Pentagon radars at W1/W3/W6 in a 5-column grid aligned with the sequence above. Empty slots at positions 2 and 4. Pure inline SVG (no client-side JS).
- **Evidence.tsx** — §02. Four big-number tiles, a client logo wall (wordmarks for now), and a single pull quote.
- **PointOfView.tsx** — §03. Five principles, each with a bespoke inline SVG: dot grid, org chart, 70/30 split bar, warmth-threshold scatter, revenue decile bars.
- **Operators.tsx** — §04. Gantt-style 5-row sprint timeline with LIVE marker at week 4, plus a 3-card portrait strip (Founder + 2 operators).
- **Contact.tsx** — §05. Dark ink section with form posting to `/api/contact` (the existing Vercel handler). Field `note` renamed to `message` to match the handler's expected keys; `role` passes through and is ignored server-side.
- **Footer.tsx** — 4-column grid (brand + tagline, Work, Company, Elsewhere) + bottom legal bar. Brand uses the same /images/era-logo.svg at 40px height.
- **Fixer.tsx** — Dev-only UI Fixer panel (theme toggle, type sliders, layout sliders, accent picker, reset). Writes CSS custom properties on the `.v3-root` wrapper — not on document.documentElement — so other routes are unaffected. Keyboard shortcut: `⌘ .` / `Ctrl+.` Build-time gated via `import.meta.env.DEV`; Vite strips the body from production bundles.
- **VisualInspector.tsx** — Dev-only click-to-edit inspector, wired in via `src/components/StagingLayout.tsx`. `⌘⇧I` / `Ctrl+Shift+I` to toggle. Edit font, color, spacing on any element; overrides persist in localStorage keyed by stagingId. "Copy CSS" to paste changes into source.
