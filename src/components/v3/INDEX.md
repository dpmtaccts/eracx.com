# ERA v3 components

Staging components for the `/v3` route at eracx.com.
Palette: Architectural Light (Parchment, Deep Steel, Sky Blue).
Tokens at `src/styles/v3-tokens.css`, component styles at `src/styles/v3-components.css` —
both scoped under `.v3-root` so they never bleed into other routes.
Do not reuse these components outside `/v3`.

## Render order in V3.tsx
Nav → Hero → Thesis → LoopHalo → HowItWorks → SignalRiver → Evidence → PointOfView → Operators → Contact → Footer → Fixer

## Components

- **Nav.tsx** — Sticky top navigation with brand logo (/images/era-logo.svg), section anchor links, and the "Get Started" CTA.
- **Hero.tsx** — Full-width hero. "Revenue Through Subtraction" eyebrow, "Cold outbound is done. Warmth is the asset." headline, signal-driven ABM lede, "Get Started →" / "Evaluate your GTM" CTA pair, two meta tiles ("Outcome — Reduces 80% of wasted growth actions" + "Current clients"), and three Nightingale-style figure markers.
- **Thesis.tsx** — Chalk-background band with the 95/5 question on the left and a two-paragraph compressed body on the right (no em dashes).
- **LoopHalo.tsx** — §02. Centerpiece concentric-ring SVG: outer Halo layer (LinkedIn · AEO · PR · events), middle Loop ring with 9 evenly-spaced stage nodes (Detect, Enrich, Score, Reach, Respond, Nurture, Close, Expand, Retain), inner negative space. Single-weight 2-unit-stroke line icons in each node. Pure inline SVG, no client-side JS.
- **HowItWorks.tsx** — §03. Wraps the three "How it works" figures below.
  - **InteractionSequence.tsx** — Figure 01. Horizontal 5-touchpoint SVG (Post → Comment → Landing page → Email → Meeting).
  - **InteractionChain.tsx** — Figure 02. Five signal cards (source → captured → dimensions → fired next) with warmth-stage color stripes.
  - **WarmthRadars.tsx** — Figure 03. Pentagon radars at W1/W3/W6 in a 5-column grid aligned with the sequence above. Empty slots at positions 2 and 4. Pure inline SVG (no client-side JS).
- **SignalRiver.tsx** — §04. Static 24-chip grid of named signals (no animation). Responsive: 6 cols desktop / 4 tablet / 2 mobile. Each chip has a left-edge color stripe matching the warmth stage most likely to fire.
- **Evidence.tsx** — §05. Four big-number tiles plus a two-card testimonial layout (Nate Houghton / Lara Vandenberg).
- **PointOfView.tsx** — §07. Five principles, each with a bespoke inline SVG: dot grid, org chart, 70/30 split bar, warmth-threshold scatter, revenue decile bars.
- **Operators.tsx** — §06. Three-phase ongoing program structure (Design+Install / First Results / Infrastructure Compounds) with a horizontal three-stop timeline above the cards. Portrait strip with three placeholder operators ("Three operators. Zero account managers."). Pricing tile is intentionally absent — pricing lives in Contact only.
- **Contact.tsx** — §08. Dark ink section with form posting to `/api/contact` (the existing Vercel handler). Meta tiles: Engagement (From $15K/mo) / Time to first results (4 weeks) / Outcome (Reduces 80% of wasted growth actions). Submit button: "Get Started →". 48 hour response note.
- **Footer.tsx** — 4-column grid (brand + tagline, Work, Company, Elsewhere) + bottom legal bar. Tagline: "Signal-driven ABM programs." Bottom bar: "© 2026" (no location).
- **Fixer.tsx** — Dev-only UI Fixer panel (theme toggle, type sliders, layout sliders, accent picker, reset). Writes CSS custom properties on the `.v3-root` wrapper — not on document.documentElement — so other routes are unaffected. Keyboard shortcut: `⌘ .` / `Ctrl+.` Build-time gated via `import.meta.env.DEV`; Vite strips the body from production bundles.
- **VisualInspector.tsx** — Dev-only click-to-edit inspector, wired in via `src/components/StagingLayout.tsx`. `⌘⇧I` / `Ctrl+Shift+I` to toggle. Edit font, color, spacing on any element; overrides persist in localStorage keyed by stagingId. "Copy CSS" to paste changes into source.

## Section numbering

Sections renumbered to match the new render order: §02 LoopHalo, §03 HowItWorks, §04 SignalRiver, §05 Evidence, §06 Operators, §07 Point of view, §08 Contact. The spec was explicit about §02/§03/§04/§06; §05/§07/§08 were assigned to keep the badges sequential through the new order.
