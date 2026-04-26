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
- **Hero.tsx** — Full-width hero. "Revenue Through Subtraction" eyebrow, "Cold outbound is done. Warmth is the asset." headline, signal-driven ABM lede, "Get Started →" / "Evaluate your GTM" CTA pair, two meta tiles ("Outcome — Reduces 80% of wasted growth actions" + "Current customers"), and three Nightingale-style figure markers.
- **Thesis.tsx** — Chalk-background band with the binary-choice question on the left (vanity metrics vs. relationships) and a two-sentence body on the right. "Real pipeline" is bold-accented; "eighteen months" is italic-serif-accented.
- **LoopHalo.tsx** — §02. Two-column layout at 1100px+ (stacks below): left is the concentric-ring SVG (hairline Halo outer ring + 9-stage Loop ring with labeled nodes), right is an interactive stage detail card. Halo annotation sits outside the outer ring at top-right on desktop, and above the diagram on mobile (Tufte-style, no leader line). Clicking a node, clicking a dot, or pressing ← / → (when the section is in viewport) cycles the selected stage. No auto-advance. Default = Detect.
- **HowItWorks.tsx** — §03. Default renders the three horizontal figures (InteractionSequence / InteractionChain / WarmthRadars). A dev-only `import.meta.env.DEV`-gated toggle in the section header swaps to the vertical scrollytelling alternative (HowItWorksVertical). Selection persists in localStorage under `era-v3-howitworks-layout`. Production builds always render horizontal regardless of stored preference.
  - **InteractionSequence.tsx** — Figure 01. Horizontal 5-touchpoint SVG (Post → Comment → Landing page → Email → Meeting).
  - **InteractionChain.tsx** — Figure 02. Five signal cards (source → captured → dimensions → fired next) with warmth-stage color stripes.
  - **WarmthRadars.tsx** — Figure 03. Pentagon radars at W1/W3/W6 in a 5-column grid aligned with the sequence above. Empty slots at positions 2 and 4. Pure inline SVG (no client-side JS).
  - **HowItWorksVertical.tsx** — Pinned slot-machine alternative for HowItWorks. Outer wrapper is 5×100vh; inner is `position: sticky` so the section freezes in place while the page scrolls past. Scroll progress (0..1) drives the active stage 0..4, the slot-machine animations on the action and chain columns, and the cold→warm progress bar fill. Five progress dots at top-right are clickable to jump stages. Below 820px the pin disables (height: auto), the layout stacks (radar / action / signal), and dot taps become the only stage advance.
  - **FrvrdRadar.tsx** — Pentagon FRVRD radar (Frequency, Recency, Velocity, Density, Responsiveness). Card header reads "Account Warmth"; the FRVRD axis labels render fully without cropping thanks to a wider viewBox (360×280) and quadrant-aware textAnchors. Polygon points and warmth counter interpolate via requestAnimationFrame (800ms ease-in-out). Moved-this-stage axes pulse. Honors `prefers-reduced-motion: reduce`.
  - **mocks/LinkedInPostMock.tsx** — Stylized LinkedIn post card (avatar + name + reaction row + corner "in" mark; ERA palette + typography).
  - **mocks/LinkedInCommentMock.tsx** — Stylized LinkedIn comment thread (truncated parent post + indented reply).
  - **mocks/BrowserMock.tsx** — Stylized browser window with eracx.com URL bar, abstracted typographic hero blocks, magenta heatmap dots, and a "2 visits · 4m dwell" annotation.
  - **mocks/EmailMock.tsx** — Two-row parallel email preview with an "×2" badge.
  - **mocks/CalendarMock.tsx** — Calendar event card with a small "Google Calendar" tab cue, "30 MIN" tagline, and three attendee avatars.
- **SignalRiver.tsx** — §04. Static 24-chip grid of named signals (no animation). Responsive: 6 cols desktop / 4 tablet / 2 mobile. Each chip has a left-edge color stripe matching the warmth stage most likely to fire.
- **Evidence.tsx** — §05. Four big-number tiles (Warmth lift +40 pts / First outreach Week 3 / First results Months 3–4 / End-to-end 9 stages) plus two named customer quote blocks side-by-side (Nate Houghton at Lorikeet, Lara Vandenberg at Publicist), each with company logo and inline-SVG five-star rating.
- **PointOfView.tsx** — §07. Five principles, each with a bespoke inline SVG: dot grid, org chart, 70/30 split bar, warmth-threshold scatter, revenue decile bars.
- **Operators.tsx** — §06. Three-phase ongoing program structure (Design+Install / First Results / Infrastructure Compounds) with a horizontal three-stop timeline above the cards. Portrait strip with three placeholder operators ("Three operators. Zero account managers."). Pricing tile is intentionally absent — pricing lives in Contact only.
- **Contact.tsx** — §08. Dark ink section with form posting to `/api/contact` (the existing Vercel handler). Headline: "Map the signals that can set you apart." Sub: "Install the loop. Run the signals. Compound warmth across your highest-value accounts." Meta tiles: Engagement (From $15K/mo, ongoing) / Time to first results (Months 3–4) / Outcome (Reduces 80% of wasted growth actions). Submit button: "Get Started →". 48 hour response note.
- **Footer.tsx** — 4-column grid (brand + tagline, Work, Company, Elsewhere) + bottom legal bar. Tagline: "Signal-driven ABM programs." Bottom bar: "© 2026" (no location).
- **Fixer.tsx** — Dev-only UI Fixer panel (theme toggle, type sliders, layout sliders, accent picker, reset). Writes CSS custom properties on the `.v3-root` wrapper — not on document.documentElement — so other routes are unaffected. Keyboard shortcut: `⌘ .` / `Ctrl+.` Build-time gated via `import.meta.env.DEV`; Vite strips the body from production bundles.
- **VisualInspector.tsx** — Dev-only click-to-edit inspector, wired in via `src/components/StagingLayout.tsx`. `⌘⇧I` / `Ctrl+Shift+I` to toggle. Edit font, color, spacing on any element; overrides persist in localStorage keyed by stagingId. "Copy CSS" to paste changes into source.

## Section numbering

Sections renumbered to match the new render order: §02 LoopHalo, §03 HowItWorks, §04 SignalRiver, §05 Evidence, §06 Operators, §07 Point of view, §08 Contact. The spec was explicit about §02/§03/§04/§06; §05/§07/§08 were assigned to keep the badges sequential through the new order.
