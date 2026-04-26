# ERA v3 components

Staging components for the `/v3` route at eracx.com.
Palette: Architectural Light (Parchment, Deep Steel, Sky Blue).
Tokens at `src/styles/v3-tokens.css`, component styles at `src/styles/v3-components.css` —
both scoped under `.v3-root` so they never bleed into other routes.
Do not reuse these components outside `/v3`.

## Render order in V3.tsx
Nav → Hero → Thesis → FrvrdSection → HowItWorks → SignalRiver → Loop → Evidence → PointOfView → WhatToExpect → Team → StartHere → Footer → Fixer

## Components

- **Nav.tsx** — Sticky top navigation with brand logo (/images/era-logo.svg), section anchor links, and the "Get Started" CTA.
- **Hero.tsx** — Full-width hero. "Revenue Through Subtraction" eyebrow, "Cold outbound is done. Warmth is the asset." headline, signal-driven ABM lede, "Get Started →" / "Evaluate your GTM" CTA pair, two meta tiles ("Outcome — Reduces 80% of wasted growth actions" + "Current customers"), and three Nightingale-style figure markers.
- **Thesis.tsx** — §01. Single-column vertical stack: small mono eyebrow, smaller setup line ("Forget vanity metrics."), giant italic-serif conclusion ("Build warmer pipeline."), two-sentence body. "Real pipeline" bold-accented; "eighteen months" italic-serif-accented.
- **FrvrdSection.tsx** — §02. Pinned 4×100vh framework section. `scrollProgress` (0..1) is computed on a rAF-throttled scroll listener and drives the canvas, the static headline's color shift, the right-edge dimension panel, the axis labels, and the bottom progress bar. Headline ("Five signals turn noise into pipeline.") and subtitle are now static (slot-machine variants removed in commit 11). Below 820px the pin disables.
  - **BuildingFrvrdRadar.tsx** — Canvas centerpiece. ~220 (80 mobile) background "noise" dots drift constantly. Five highlighted FRVRD dots migrate one at a time to fixed pentagon vertices (each owns a 0.10-wide window between 0.25 and 0.75). Pentagon stroke segments fade in as both endpoints settle. FRVRD layer color shifts cold→warm. Background dots stay neutral. Honors `prefers-reduced-motion: reduce`.
  - **FrvrdDimensionPanel.tsx** — Right-edge slot-machine card panel that walks through the five dimension definitions, one per FRVRD dot migration window. Hidden below 820px.
- **HowItWorks.tsx** — §03. Renders the three horizontal figures (InteractionSequence / InteractionChain / WarmthRadars). The dev toggle and the vertical scrollytelling alternative were unrendered in commit 11; the vertical files (HowItWorksVertical, mocks/, mocks/signals/, FrvrdRadar) stay on disk in case they come back.
  - **InteractionSequence.tsx** — Figure 01. Horizontal 5-touchpoint SVG (Post → Comment → Landing page → Email → Meeting).
  - **InteractionChain.tsx** — Figure 02. Five signal cards (source → captured → dimensions → fired next) with warmth-stage color stripes.
  - **WarmthRadars.tsx** — Figure 03. Pentagon radars at W1/W3/W6 in a 5-column grid aligned with the sequence above. Pure inline SVG.
  - _Unrendered (kept on disk):_ HowItWorksVertical.tsx, FrvrdRadar.tsx, mocks/LinkedInPostMock.tsx, mocks/LinkedInCommentMock.tsx, mocks/BrowserMock.tsx, mocks/EmailMock.tsx, mocks/CalendarMock.tsx, mocks/signals/{Like,Comment,Visit,Email,Meeting}SignalTile.tsx
- **SignalRiver.tsx** — §04. Static 24-chip grid of named signals (no animation). Responsive: 6 cols desktop / 4 tablet / 2 mobile. Each chip has a left-edge color stripe matching the warmth stage most likely to fire.
- **Loop.tsx** — §05. Renamed from LoopHalo in commit 11; the outer Halo ring, the Halo annotation, and the channel list are gone. Two-column layout at 1100px+ (stacks below): left is a single 9-stage ring SVG, right is the interactive stage detail card (CONNECT/TRUST/LOYALTY overlines). Clicking a node, clicking a dot, or pressing ← / → cycles the selected stage. No auto-advance.
- **Evidence.tsx** — §06. Four big-number tiles (Warmth lift +40 pts / First outreach Week 3 / First results Months 3–4 / End-to-end 9 stages) plus two named customer quote blocks side-by-side (Nate Houghton at Lorikeet, Lara Vandenberg at Publicist), each with company logo and inline-SVG five-star rating.
- **PointOfView.tsx** — §07. Five principles, each with a bespoke inline SVG: dot grid, org chart, 70/30 split bar, warmth-threshold scatter, revenue decile bars.
- **WhatToExpect.tsx** — §08. Renamed from Operators in commit 11. Three-phase ongoing program structure (Design+Install / First Results / Infrastructure Compounds) with a horizontal three-stop timeline above the cards. Portrait strip with three placeholder operators. Headline: "What the first year looks like."
- **Team.tsx** — §09. NEW in commit 11. Three TeamMemberCards in a row (3-col desktop / 2-col tablet with third centered / 1-col mobile). Headline: "Three operators. One playbook." Stub data with TODOs — needs real photos + names + roles + bios from Justin.
  - **TeamMemberCard.tsx** — Square photo (grayscale, lifts on hover), name, role mono-uppercase, brief bio.
- **StartHere.tsx** — §10. Renamed from Contact in commit 11. Dark ink section with form posting to `/api/contact`. Same headline / sub / meta tiles / form / submit button as before. Eyebrow now reads "10 Start here" (was "09").
- **Footer.tsx** — 4-column grid (brand + tagline, Work, Company, Elsewhere) + bottom legal bar. Tagline: "Signal-driven ABM programs." Bottom bar: "© 2026" (no location).
- **Fixer.tsx** — Dev-only UI Fixer panel. Writes CSS custom properties on the `.v3-root` wrapper. Build-time gated via `import.meta.env.DEV`.
- **VisualInspector.tsx** — Dev-only click-to-edit inspector, wired in via `src/components/StagingLayout.tsx`.
