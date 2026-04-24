# ERA v8 · staging feedback delta

**Context:** this document captures the first staging review of v8. Apply these changes on top of the existing v8 build. No structural rebuild, no brand changes. Surgical patches only.

**Before starting:** items flagged with `⚠ CONFIRM` need Justin's clarification in chat before engineering executes.

---

## Copy changes

### 1. Hide the Old Playbook / New Playbook section

Remove section 3.5 from the render entirely. Content stays in the repo as a hidden component for potential future use, but does not ship.

### 2. Rewrite the Loops section header

In section 3.6 (Loops), replace current copy:

- **Eyebrow:** `The New Playbook` (drop the "03 ·" section number prefix — see note below on global numbering)
- **Headline:** `Run loops, not campaigns.`
- **Subhead:** `Every play is designed to generate a new signal.`

### 11. Rewrite fragmented copy everywhere

Justin does not write in staccato sentence fragments. Audit the entire site for fragmented copy and rewrite as complete, flowing sentences.

**Specific example flagged** (from the Engage / cadence copy):

- **Current:** "Weekly output. Monthly scoring. Quarterly review. You approve, we ship. No training programs, no 'best practices' decks."
- **Rewrite:** "Output ships weekly, the system gets scored monthly, and strategy gets reviewed every quarter. You approve each delivery and we run the play. We don't sell training programs or 'best practices' decks."

**Global pass required.** Check every eyebrow, stat caption, CTA, section subhead, and body paragraph for noun-phrase fragments used as sentences. Rewrite any found. Common offenders: sub-heads, engage tier descriptions, stats captions, what-to-expect phase descriptions.

### 12. Change the past-career logo strip label

In the Founder section, change the label above the Fortune 500 logo strip:

- **From:** `PREVIOUSLY BUILT GROWTH FOR`
- **To:** `Building Enterprise Go-to-Market Success with:`

Note the capitalization change and the trailing colon. This reframes the strip from past-tense credential to active ongoing credential.

### 13. Remove footer copyright line

In the footer, remove `© 2026 Department of Loyalty LLC · Bainbridge Island, WA` entirely. No replacement text.

---

## Structural changes

### 5. Merge Signal Map into AUX

The Signal Map is no longer a standalone section. Its content folds into the AUX card.

**Delete:** section 3.8 Signal Map entirely. Remove the `05 · Inside the Signal Map` eyebrow and headline from render.

**Add to AUX card:** the Signal / Outcome / Priority table moves inside the AUX card, positioned below the FRVRD radar on the left side of the card body. Card structure becomes:

- Header: account name, composite, tier chips (unchanged)
- Body left column: FRVRD radar on top, Signal/Outcome/Priority table below
- Body right column: Engagement log (unchanged)
- Bottom strip: **removed entirely** (see below)

**Remove from AUX:** the Fit / Wallet / Readiness score strip at the bottom of the card. Delete the three-column score display entirely. Those scores do not ship.

Renumber remaining sections after this merge. What was section 06 becomes 05, etc. Confirm the new sequence with Justin before applying section numbers (which may not be used at all — see global numbering note).

⚠ CONFIRM: This is a meaningful restructure of the canonical AUX card. Justin approved the layout previously with radar + activity + F/W/R strip. Confirm the replacement layout (radar + plays table stacked on left, activity on right, no bottom strip) before execution.

### 8. Merge AI & Automation with Integrations

Combine section 3.12 Integrations with the "Built to maximize outcomes" treatment into one section.

- Remove the separate "AI & Automation" framing
- Single section showing the platforms ERA operates
- Use logos from `/public/images/apps/`
- Since logos are different sizes, render them in a clean grid:
  - Set a consistent visual weight target (e.g., ~40px of vertical weight per logo)
  - Use an optical-sizing approach: for each logo, calculate the bounding box of actual ink (ignore transparent padding) and scale to target height based on that, not on image dimensions
  - Align all logos to a shared baseline within each row
  - Use flexbox wrap with equal gap spacing
- Add a visual element that evokes automation: a subtle connector pattern (thin rust lines between logos, or a pulsing dot that travels between them on load), or a looping animation hint. Keep it restrained — one ambient motion, not a busy visualization.

---

## Visual and component changes

### 3. Loop nodes — use icons instead of numbers

Current loop ring has small numbered circles (01, 02, ...) that are illegible. Two options:

- **Recommended: replace numbers with icons.** Use Lucide icons, one per stage. Suggested mapping:
  - Detect: `radar`
  - Enrich: `database`
  - Score: `gauge`
  - Reach: `send`
  - Respond: `message-circle`
  - Nurture: `sprout`
  - Close: `circle-check`
  - Retain: `refresh-cw`
  - Expand: `trending-up`
- Icon container: 40–44px circle, rust outline at 1.5px, cream fill. Icon inside at 20px, rust color.

Fallback option if icons don't render cleanly: larger circles (40px+) with numbers at 14px weight 600.

### 4. Loops interaction

Three changes to the loops interaction model:

1. **Change the hint label:** `Tap any stage to explore it` becomes `Explore each stage`.
2. **Switch from auto-cycle to hover-reveal.** Remove the auto-advance timer and the pause button. The detail panel updates on hover over a node (or tap on mobile). Default state: no stage selected, detail panel shows a neutral empty state or the first stage as default.
3. **Detail panel eyebrow rewrites.** Replace the `STAGE 05` style eyebrow with the loop name the stage belongs to:
   - Stages 1–3 (Detect, Enrich, Reach): eyebrow reads `Connect`
   - Stages 4–6 (Respond, Nurture, Close): eyebrow reads `Build Trust`
   - Stages 7–9 (Retain, Expand, plus whatever the ninth is): eyebrow reads `Grow`

⚠ CONFIRM: the original nine-stage list was Detect · Enrich · Score · Reach · Respond · Nurture · Close · Retain · Expand. Justin's loop-name mapping groups them as Connect / Build Trust / Grow — confirm which stages belong to which group so engineering can hardcode the eyebrow mapping. My guess: 1-3 Connect (Detect, Enrich, Score), 4-6 Build Trust (Reach, Respond, Nurture), 7-9 Grow (Close, Retain, Expand). But worth confirming.

### 6. AI Mirror — add chat input and source visual

The AI Mirror currently shows a static "buyer query" paragraph. Restructure:

- **Left column** becomes a chat-window interface: add a real text input field at the bottom with a Send button (rust). The current buyer query displays as a prior message in the chat. The AI response renders as a second message. Visual: rounded input, placeholder text `Ask a buyer question...`, send button styled to match primary CTA.
- **Right column** becomes clearly framed as "behind the scenes / sources." Add a visual separator (a thin vertical rule or a small label header like `SOURCES` in mono). Consider an illustrative cue: a small diagram icon, a "source routing" indicator, or an illustration suggesting signal flow from the left to the right.

### 7. AI Mirror — source icons

In the "What fed this answer" source list, use real visual icons:

- **Company website:** add a placeholder logo for `helixops.com` (make a simple lockup or use a globe icon) — use a globe Lucide icon as fallback if helixops logo isn't in the repo
- **Press & analyst:** use a newspaper Lucide icon
- **G2, Glassdoor, Gong, Clari, Aviso:** use the real logos from `/public/images/apps/`

Alignment: same optical-sizing approach as item 8 (align by ink weight, not image dimensions).

### 9. Halo section — add LinkedIn logo

Add the LinkedIn logo (from `/public/images/apps/`) to the Halo section. Position appropriately — likely near the Halo product name or as part of the product surface visualization since Halo is the LinkedIn operating layer.

### 10. Halo bento box layout

Restructure the Halo bento:

- Main image becomes larger: 2/3 of the row width
- Two secondary images stack vertically on the right, each at 1/3 width and half the height of the main image
- Total: 2/3 + (1/3 top, 1/3 bottom). Single row, asymmetric split.
- Maintain subtle inset shadow on all three images to preserve the elevated-product feel

### 14. Close section — add form

Replace the current minimal close section. New structure matches the existing eracx.com close section:

- **Two-column layout**
- **Left column:**
  - Headline: `The pipeline doesn't build itself.` (keep)
  - Subhead: `ERA builds the system that does.` (keep)
  - Start-a-conversation link with email: `Start a conversation | hello@eracx.com`
- **Right column:** contact form with fields:
  - Your name (text input)
  - Company (text input)
  - Work email (email input)
  - What are you trying to solve? (textarea)
  - `Send` button in rust, right-aligned

Form fields use underline-only style (no boxed inputs): 1px bottom border in cream-line color, placeholder text in muted gray, focus state shifts border to ink.

### 15. Add footer nav

Build a proper footer navigation band. Replace the current minimal footer (`era | hello@eracx.com`).

Structure (three rows, all on dark-ground footer):

1. **Row 1 — nav columns.** Four columns, each with a mono label and a list of links:
   - `NAVIGATE`: Why ERA · The System · GTM Design · How it Works · Our Story · Contact
   - `PRODUCTS`: AUX · AI Mirror · Signal Map · Halo
   - `ENGAGE`: Revenue Signal Audit · The System · Signal Only · Halo
   - `COMPANY`: About · Contact · hello@eracx.com
2. **Row 2 — wordmark + tagline.** Left-aligned ERA wordmark at large scale. Right side: one-line positioning statement in mono.
3. **Row 3 — thin rule + minimal meta.** Just the ERA diamond logo on the left, `Bainbridge Island, WA` on the right (replaces the copyright line from item 13 in a subtler form — but do not include the © 2026 Department of Loyalty LLC text).

### 16. Top nav — solid dark nav, not transparent with hairline

Replace the current approach (nav transparent on hero, gains hairline on scroll).

New approach matches the existing eracx.com:

- Nav is a **solid dark band** (`#0A0A0A` background, cream text) that sits at the very top of the page
- Nav does not match the hero ground — it contrasts with it deliberately
- No hairline stroke needed; the color contrast is the boundary
- Nav stays the same color throughout scroll (no scroll-state change)
- In dark theme, the nav can invert to cream-with-dark-text, but in light theme the nav stays dark

This replaces section 3.1 of the v8 prompt's transparent-nav specification.

⚠ CONFIRM: the staging screenshots show the current nav as cream-matched-to-hero. The two attached eracx.com screenshots show the dark nav. Confirming interpretation: you want to revert to the existing site's solid dark nav approach, not a hybrid.

---

## Global changes

### Section numbering — remove or reduce

Items 2, 4, and 5 all drop the `XX ·` section number prefix from eyebrows. This suggests a pattern: remove section numbers from eyebrows globally.

**Proposed:** remove the `XX · ` numeric prefix from every section eyebrow across the site. Keep the descriptive labels (e.g., `The New Playbook`, `Inside AUX`, `Start here`). Do not renumber — just remove.

If any eyebrow becomes redundant with its headline after the number is removed, delete the eyebrow entirely for that section.

⚠ CONFIRM: should section numbers be removed globally, or just from the sections flagged in items 2/4/5?

---

## Ambiguities to resolve before execution

Three items need Justin's confirmation in chat:

1. **AUX restructure (item 5).** Confirm the replacement layout: radar + plays table stacked on left of card body, activity log on right, no bottom F/W/R strip. This is a meaningful change to the previously-canonical AUX card.

2. **Loop stage-to-group mapping (item 4).** Confirm which of the nine stages belong to each of the three groups (Connect / Build Trust / Grow). My working assumption: 1–3 Connect (Detect, Enrich, Score), 4–6 Build Trust (Reach, Respond, Nurture), 7–9 Grow (Close, Retain, Expand). Confirm or correct.

3. **Global section number removal.** Items 2, 4, and 5 all drop the `XX ·` numeric prefix. Confirm whether to remove section numbers globally or only in the flagged sections.

---

## Execution order recommendation

These changes can ship in a single staging push. Suggested order:

1. Copy patches (items 1, 2, 11, 12, 13) — fastest, low risk
2. Nav rebuild (item 16) — affects every page, do early
3. Hero motion layer (item 17) — drop-in replacement, reference file provided
4. Structural merges (items 5, 8) — largest ripple
5. Loops changes (items 3, 4) — significant interaction rewrite
6. AI Mirror rebuild (items 6, 7) — component work
7. Halo updates (items 9, 10) — visual only
8. Footer (items 14, 15) — new components, low dependency
9. Global polish (section numbers, fragment audit) — final pass

Total estimated engineering time: 1.5–2 days of focused work assuming the three ambiguities are resolved up front.

---

## 17. Replace hero "splatter" dots with playbook-maze flow

The current hero motion layer uses a scattered field of dots that float in place. Replace this with a playbook-route motion system: dots flow along invisible routes that turn through the hero space, with fading trails behind each leading dot. This is the brand metaphor rendered as motion — ERA runs plays, plays have routes, routes turn.

**Reference file:** `era-v8-hero-maze-reference.html` (new). Engineering should inspect this file, verify the SVG motion works in all target browsers, and port the `<svg class="hero-maze">` element plus its CSS rules into the hero component.

**Key specs:**
- Seven invisible routes defined as `<path>` elements in SVG `<defs>`
- Each route is a polyline with 2–4 turns (horizontal and vertical segments)
- Two routes enter from the top, one from the bottom, four from the left
- All routes exit off the right edge
- Per route: one group of five flowing `<circle>` elements, each animated via `<animateMotion>` with `<mpath>` referencing the route
- Staggered `begin` times (0s, -0.3s, -0.6s, -0.9s, -1.2s approx) create the comet-tail effect
- Durations vary by route (14s, 15s, 16s, 18s, 20s, 22s, 24s) so plays run at different tempos
- Faint route traces (`stroke: rgba(200, 90, 58, 0.08)`) are drawn as static `<use>` elements so the "board" reads even when motion is paused
- Small waypoint markers at key turns, same low-opacity rust

**Reduced motion:** hide all `<animateMotion>` elements, leaving only the static route traces and waypoint dots. The hero still reads as a diagrammed playbook board, just without the motion.

**Implementation note:** this is pure SVG with SMIL animations. No JavaScript required for the motion itself. Browser support is excellent (Chrome/Safari/Firefox/Edge all support `animateMotion` and `mpath`). If engineering hits any browser-specific issues, fall back to a GreenSock or Framer Motion implementation of the same path animations.

**Do not simplify to horizontal-only scroll.** The turns are the point. A dot going in a straight line is a metronome. A dot turning at waypoints is a play being run through a system. That's what ERA sells.

---

# Round 2 staging feedback

These items are additions after round 1 staging. Apply on top of items 1–17.

## 18. Dial back the hero maze motion

The maze dots and trails are too visible and read as distracting rather than ambient. The updated `era-v8-hero-maze-reference.html` reference file has the new values baked in. Summary of the changes:

- Leading dot opacity dropped from 0.95 to 0.5
- Trail opacities dropped from 0.65 / 0.4 / 0.22 / 0.1 to 0.3 / 0.18 / 0.1 / 0.04
- Route trace opacity dropped from 0.08 to 0.03
- All durations slowed by ~60 percent (14s becomes 24s, 24s becomes 42s)
- Dot radii reduced (0.55 to 0.4 for leading dots, proportional drop for trails)
- Route count reduced from 7 to 5 (routes 6 and 7 removed, though paths remain in `<defs>` for future use)

The new tuning should read as ambient texture rather than kinetic motion. If it still feels too loud in staging, the next move is to drop the leading dot opacity another 20 percent (0.5 to 0.4) before cutting more routes.

## 19. Adaptive nav behavior

Replaces item 16 from round 1.

The nav should not be a fixed dark band. It should inherit from the section currently behind it, adapting as the page scrolls.

**Behavior:**

- Default state (over a light section like cream or white): nav background is transparent, text is ink-dark, CTA remains rust
- Over a dark section (any section with `#0A0A0A` or equivalent ground): nav background goes to 90 percent dark with backdrop blur (`background: rgba(10, 10, 10, 0.9); backdrop-filter: blur(12px)`), text inverts to cream, CTA remains rust
- Transitions between states use 250ms ease-out on background-color, color, and backdrop-filter

**Implementation:**

- Use `IntersectionObserver` watching each major section
- When a section with `data-ground="dark"` (or equivalent class) crosses the top of the viewport, apply a `.nav--over-dark` class to the nav element
- When a light section crosses back, remove the class
- Each section component accepts a `ground` prop (`light` | `dark`) that sets its `data-ground` attribute

**Why this is better than item 16's solid dark nav:**

- Hero flows into nav seamlessly on first load (no visual break between nav and hero)
- Dark case-study sections get proper nav contrast when they come into view
- Matches the existing eracx.com adaptive pattern

## 20. Move the Signal to Outcome table to full card width

Round 1's item 5 specified the plays table should sit "under the spider graph," which engineering implemented as left-column-only, tucked under the radar on the left side of the AUX card body. This reads as cramped and leaves the right side of the card empty below the activity log.

**Correction:** the Signal to Outcome plays table spans the **full width** of the AUX card, below the body (which contains the radar on the left and the activity log on the right).

New AUX card structure:

1. Header (full width): account name, domain, composite score, chips
2. Body (2-column): FRVRD radar on left, Engagement Log on right
3. Plays table (full width): Signal to Outcome rows with priority scores

The plays table becomes a proper section of the card rather than a footnote to the radar. Increase the padding around it to give it weight.

## 21. AI Mirror — chat input and source logos, re-specced

Round 1 items 6 and 7 were not built to the intended visual. Respecifying them with more concrete direction.

**Left column — the chat window:**

Render this as a proper chat UI, not a static text block.

- At top: a pre-populated buyer query rendered as a chat bubble aligned right, styled as a user-sent message (e.g., light gray fill, rounded corners, 14px body text)
- Below it: the AI response as a chat bubble aligned left, styled as an assistant message (cream fill with slight border, longer paragraph text, including the `UNLIKELY SOURCE` tags called out in the v8 prompt)
- At the bottom: a text input field with placeholder text `Ask a buyer question...` and a rust Send button to its right. The input has a 1px bottom border in cream line color, no boxed background. The Send button matches the primary CTA style at smaller scale (10px padding, 13px text)

The input is non-functional in the demo. It exists as a visual cue that this is a chat interface, not a marketing graphic. On hover or focus, the input cursor appears and the border animates to ink. Clicking Send triggers a no-op or a subtle "demo mode" tooltip.

**Right column — the sources panel:**

Clear visual separation from the chat window. Use a vertical rule between the two columns.

- Header: `What fed this answer` in display sans, 20px weight 600
- Subheader: `SOURCES` in mono, 10px, 0.4em tracking, muted
- List of source rows, each with a visual icon or logo on the left and source info on the right:
  1. Globe icon (Lucide `globe`) — `helixops.com` — `Company website`
  2. Newspaper icon (Lucide `newspaper`) — `Press & analyst coverage` — `TechCrunch, Forrester, Business Insider`
  3. G2 logo (from `/public/images/apps/g2.svg` or equivalent) — `G2` — `127 reviews, 4.3 avg rating`
  4. Glassdoor logo — `Glassdoor` — `Employee sentiment, 3.9 rating` — flag with `UNLIKELY SOURCE` mono tag in magenta
  5. Gong logo — `Gong` — `Sales intelligence`
  6. Clari logo — `Clari` — `Revenue intelligence`
  7. Aviso logo — `Aviso` — `Forecasting intelligence`
- Icons align to a shared 24px box. Logos from `/public/images/apps/` use the optical-sizing approach from item 8 (align by ink weight, not image dimensions)
- Each source row has 12px vertical padding, separated by a 1px cream line divider

## 22. Halo images — shapes and layout

The current Halo bento-box images are three visualizations of different proportions and are hard to lay out cleanly. Here is the recommended shape spec.

**Three-tile layout (main 2/3 + two stacked 1/3 tiles):**

- **Main tile** — 2/3 width, full height of the row (call this height `H`). Aspect ratio 16:10. Content: a LinkedIn feed-style product screenshot with ERA's scoring overlays visible. LinkedIn brand mark appears as a small logo lockup in the top-left corner of this tile, inside the image, not as a separate label above it.
- **Top-right tile** — 1/3 width, `H/2` height. Aspect ratio 4:3. Content: a chart showing a specific Halo metric (suggest: engagement-per-post over time, or ICP-match-rate over weeks).
- **Bottom-right tile** — 1/3 width, `H/2` height. Aspect ratio 4:3. Content: a second chart showing a different Halo metric (suggest: composite score breakdown, or content funnel visualization).

All three tiles render as white cards on cream ground with the layered shadow stack per the depth rules in the v8 prompt section 1.6.

**If the existing image assets don't fit these proportions:**

- Crop to the target aspect ratios
- If cropping loses critical content, regenerate the images. The main tile is the priority — it should be wide and show product surface. The two side tiles can be tighter crops on specific metrics
- If only one good image exists, use it as the main tile and build the two side tiles from procedurally-generated dashboard widgets (bar charts, rings, stat callouts)

**Gap between tiles:** 16–24px (the same gap between main and secondary column, and between top-right and bottom-right tiles)

**Responsive:** below 900px breakpoint, stack all three tiles vertically at full width, main tile first.

## 23. Founder section on dark ground

Flip the Founder section from cream to dark ground.

**Specific changes:**

- Section background: `#0A0A0A` (matches other dark sections)
- Body text color: `#F0F0F0`
- Muted text color: `#B8B8B8` (the lifted-for-dark muted value from the color palette)
- Headline "Decades of growth" stays with "growth" in rust — the rust color works on both cream and dark, verified in the loops and AUX specs
- Headshot already renders in B&W; works unchanged on dark ground
- Mono byline "JUSTIN MARSHALL / FOUNDER" stays, using the lifted muted value
- `Let's chat →` CTA: adjust to the dark-theme accent color (`#D66A3E`) or keep rust with adequate contrast ratio checked

**Past-career logo strip:**

The current logos are dark greyscale designed to sit on cream. On dark, they will render as near-invisible dark shapes.

Two options:

1. **Quick fix:** apply `filter: invert(1) brightness(0.85)` to the logo images. This inverts dark greyscale to light greyscale without needing new image assets. Works well for monochrome logos like Microsoft, Chase, P&G, IHG, Amazon, Intel, T-Mobile.
2. **Clean fix:** source or create light greyscale versions of each logo. More work, better result for logos with fine details.

Recommend option 1 for staging, option 2 for production polish.

**Why this works for the narrative:**

The Founder section is the most personal moment on the site. Putting it on dark ground gives it gravity and intimacy — this is the "meet the person behind the system" moment, and the dark ground isolates it from the surrounding cream sections. It also establishes another cream/dark rhythm beat on the page.

**Section rhythm check:**

- Hero: cream
- Proof strip: cream
- Meet the new growth playbook: cream
- Loops: cream (with the colored loop arcs)
- Signal River: dark (if kept from v5)
- AUX: cream
- AI Mirror: dark (if the AI Mirror is specced dark)
- Audit section: cream
- Integrations: cream
- Halo: cream
- What to Expect: cream
- Clients: cream
- Engage: cream
- **Founder: dark (new)**
- Close: dark (per v5 pattern)
- Footer: dark

This gives three dark moments (Signal River, Founder, Close) interspersed across the page, creating visual rhythm and keeping the reader's eye engaged.

---

## 24. Replace Founder section with leader-bench credibility block

**Supersedes item 23.** Item 23 specified flipping the Founder section to dark ground. We're no longer keeping a Founder section on the homepage. This item replaces it. Item 25 below covers the new dedicated /our-story page where deeper founder and team content lives.

**What goes on the homepage:**

A compact credibility block in the existing Founder slot. No headshot. No bio paragraph. No face on the homepage at all. The section reads as "who runs ERA" at the institutional level, not the individual level.

**Structure (cream ground, not dark):**

1. **Eyebrow:** `Who runs it`
2. **Headline:** `Decades of growth, now built into one system.` (keep "growth" in rust emphasis per the existing pattern)
3. **Lede paragraph** (max 3 sentences):
   > "ERA is built by GTM executives, business leaders, and founders with decades of experience across Fortune 500 enterprises. We've led the data-driven growth programs at some of the largest B2B companies in the world. Now we operate that experience as a system inside yours."
4. **Logo strip** (the existing past-career strip, repurposed):
   - Label above: `Led growth at:` (replaces earlier working titles like "Previously built growth for" and "Building Enterprise Go-to-Market Success with" — this frames the logos as the leadership bench's track record)
   - Logos: Microsoft, Chase, P&G, IHG, Amazon, Intel, T-Mobile — same logos already in the repo
5. **CTA link below the logos:** `Read our approach →` linking to `/our-story`

**Specifically removed from the homepage:**

- Headshot image
- First-person bio paragraphs
- "Justin Marshall / Founder" byline
- "Let's chat →" CTA

These move to the /our-story page per item 25.

**Why this works:**

The homepage version says "ERA is backed by leaders who've done this at scale" without naming anyone. It signals Fortune 500 credibility through logos you already own. Prospects who want to know who actually leads ERA click through to /our-story. Prospects who just need to know ERA has real leadership depth get the signal and keep scrolling.

**Important terminology:**

ERA **operates**. The clients' businesses are where the system runs. The homepage credibility block refers to **leaders** — GTM executives, business leaders, founders, and high-growth leaders — not "operators." "Operators" is what ERA does; "leaders" is who ERA is. Keep this distinction consistent across all copy on the homepage and /our-story page.

**Spec note on logo alignment:** Use the same optical-sizing approach from item 8 — align by ink weight, not image dimensions. Target ~40px of visual weight per logo. Greyscale at ~60% opacity to prevent the strip from competing with the headline.

---

## 25. Create /our-story page

New page at `/our-story`, accessible from the top nav (replacing or keeping "Our Story" as it currently exists — confirm with Justin whether it's already in nav) and from the "Read our approach →" link in the homepage leader-bench block.

**Page structure (top to bottom):**

### Section A — The manifesto

Full "On Focus" essay rendered as a typographic feature. This is the longer piece Justin wrote that argues focus as discipline, the "No" philosophy, and how ERA protects executive focus.

**Editorial treatment:**

- Cream ground
- Narrow column (max 680px) centered on the page
- Serif display eyebrow: `On Focus` in Fraunces italic at ~32px, rust color
- Drop-cap on the opening sentence (optional, editorial touch)
- Body copy at 18–19px line-height 1.6 for readability
- Pull quotes optional at 3–4 breakaway moments. Suggested pulls: `"We built Era to work alongside those people."` and `"Focus isn't a strategy. It's a discipline."`
- At the bottom of the essay: signature block — `Justin Marshall, Founder` in mono, right-aligned, followed by a thin rust rule

**Copy note:**

Justin provided two versions. The long essay ("On Focus") is the manifesto. The shorter "Hey there" piece is a founder voice intro. **Both go on this page.** The short piece becomes a preamble to the long essay. Structure:

- The "Hey there" note runs first, as a short signed intro in an italic-serif treatment
- A thin rule separator
- The full "On Focus" essay runs below in sans body type

This gives the page a "short note, then the full argument" rhythm. Readers who just want the founder voice get it in 30 seconds. Readers who want the manifesto get it in 3 minutes.

### Section B — Who runs it

Below the essay, a quieter "Who runs it" block. Dark ground for contrast against the cream essay above.

**Structure:**

Two-column or three-column grid depending on how many profiles are in at time of build.

**Profile 1 — Justin Marshall (confirmed):**
- B&W headshot, rounded square
- Name: `Justin Marshall`
- Role: `Founder`
- Credential line (mono): `Built growth programs across Microsoft, Chase, P&G, IHG, Amazon, Intel, T-Mobile`
- One-sentence bio: `Built ERA to turn decades of enterprise growth experience into a system that runs inside B2B companies.`

**Profile 2 — Jen Anderson (tentative — placeholder slot):**

Build the component so a second profile slot exists and can be populated when Jen confirms her name for public listing. Until she confirms, render this slot with a placeholder treatment or hide it entirely via a feature flag.

When populated (draft content, confirm with Jen before publishing):
- B&W headshot (when available)
- Name: `Jen Anderson`
- Role: `Customer Intelligence` or similar — confirm title with Jen
- Credential line (mono): `Ran Customer Intelligence at T-Mobile. [Other credentials TBD based on her CV]`
- One-sentence bio: TBD from her CV

**Profile component spec:**

- Headshot aspect ratio 1:1, rendered at ~200px
- Name in bold sans at 20px
- Role in mono below the name at 11px, 0.3em tracking, muted
- Credential line in mono at 11px, rust color, 0.25em tracking
- Bio paragraph in sans at 15px, line-height 1.5
- Vertical stack, left-aligned within the column

**Section closer:** one-line statement below the profile grid:

> "Supported by a bench of GTM leaders and advisors across the US and EU."

No names. This is the nod Justin wanted to the broader leadership network without committing to specific people.

### Section C — CTA

At the bottom of the page:

- Headline: `Ready to focus?` (pulled directly from the manifesto's closing)
- CTA link: `Start a conversation →` routing to the contact form or triggering the close section's form modal

Cream ground for this section.

---

## Nav update

**Add** `Our Story` to the top nav if not already present. Confirm placement with Justin — suggested order:
`System · Signal Map · AUX · AI Mirror · Halo · Our Story · Timeline`

Alternatively, move it to the right side of the nav between Timeline and the Request an audit CTA.

---

## Copy decisions captured

Three copy shifts land in this round:

1. The homepage logo strip label has been updated three times across the session. Final decision: `Led growth at:` — frames the logos as the leadership bench's track record, fits both "just Justin" and "Justin + Jen + the network" interpretations
2. The homepage Founder section is replaced with the leader-bench credibility block. No face, no bio, no personal voice on the homepage
3. The /our-story page holds all personal content: Justin's "Hey there" intro, the full "On Focus" manifesto, the Who-runs-it profile block, and the Ready-to-focus CTA

---

## 26. Replace Clients section with two testimonial cards

**Supersedes prior Clients 2x2 grid.** The old layout included pending slots for Stephen Roesler (Miniac), Ron Carucci (Navalent), Brian Gonsalves (Netrush), and placeholder treatments for clients without final quotes. Remove all of that. The section now ships with two testimonials only.

**Reference file:** `era-v8-clients-reference.html`

**Structure:**

- **Eyebrow:** `Clients` (mono, rust, 0.3em tracking)
- **Headline:** `Leaders talking about the work.` (bold condensed sans, same scale as other section headlines)
- **Subhead:** `Two leaders who've seen the system run inside their companies.`
- **Two testimonial cards, side by side on desktop, stacked below 900px**

**Testimonial card anatomy:**

Each card is a white card on cream ground, 12px border radius, layered shadow per v8 section 1.6 depth rules. Cards hover-lift at `translateY(-2px)` with slightly strengthened shadow.

Top to bottom inside each card:

1. **Five-star rating** in rust color, 18px stars, 4px gap between them
2. **Quote block** with a faint oversized opening quote mark (64px rust at 12% opacity, absolutely positioned top-left as a visual anchor) and the quote text in 22px body sans at line-height 1.5
3. **Attribution bar** at the bottom, separated by a thin top border: profile photo (56px circle), name + role in the middle column, company logo on the right

**Content:**

### Card 1 — Nate Houghton

- **Stars:** 5/5
- **Quote:** "Justin builds the thing most consultants just talk about. Actual operational systems. Scoring, enrichment, sequencing, CRM. When he hands it off, your team can run it."
- **Profile photo:** from `/public/images/` — Nate Houghton headshot
- **Name:** Nate Houghton
- **Role:** Head of Sales, Americas
- **Company logo:** Lorikeet logo from `/public/images/`

### Card 2 — Lara Vandenberg

- **Stars:** 5/5
- **Quote (ERA-adapted):** "Era is an asset to any high-growth company, impacting every aspect of revenue, marketing, customer success, and account management."
- **Profile photo:** from `/public/images/` — Lara Vandenberg headshot
- **Name:** Lara Vandenberg
- **Role:** Founder, Publicist *(confirm current title with Justin — Lara has since founded Assemble)*
- **Company logo:** Publicist logo from `/public/images/` *(or Assemble logo if Justin prefers the current affiliation)*

**Asset alignment:**

- Profile photos render at 56px circle, object-fit: cover. Subtle inset border at `rgba(0,0,0,0.08)` to avoid washout on cream.
- Company logos use optical-sizing per item 8 (align by ink weight, not bounding box). Target ~28px visual height. Monochrome or brand-color versions accepted depending on what's in the repo.

**Responsive:**

Below 900px, cards stack vertically at full width. Card padding reduces from 40px to 28px. Attribution row reflows: avatar + info on row 1, company logo on row 2 left-aligned.

**What gets removed:**

- The old 2x2 Clients grid from v5
- Any placeholder slots for Stephen Roesler, Ron Carucci, Brian Gonsalves
- The "OPERATORS IN RESIDENCE" client strip (already flagged in v8 original, reconfirmed here)
- The existing hero trusted-by strip (`Netrush · POP · Miniac · Navalent · Seismic`) **stays** in the hero — this item only affects the Clients section deeper in the scroll, not the hero credibility strip.

---

## Flag for Justin

**The Lara quote needs confirmation.** The original quote on dpmt.co reads: "dpmt team is an asset to any high-growth company, impacting every aspect of revenue, marketing, customer success, and account management."

I've drafted the ERA version as: "Era is an asset to any high-growth company, impacting every aspect of revenue, marketing, customer success, and account management."

Two things to verify before this ships:

1. **Did Lara agree to the quote being used for ERA specifically**, or was it originally given for dpmt / Department of Loyalty and now being repurposed? If the latter, best practice is to ask her to refresh or explicitly approve the new attribution.
2. **Company affiliation at the time of the quote.** She was Founder at Publicist when this quote was given (the dpmt.co attribution confirms it). She's now CEO & Founder at Assemble. Two options:
   - Keep the historical attribution: `Founder, Publicist` with the Publicist logo. More honest, ties the quote to when the work happened.
   - Update to current: `CEO & Founder, Assemble` with the Assemble logo. Reflects her current reality but misattributes the quote's context.

Recommend option 1 (Publicist) for authenticity. Confirm with Justin before ship.

---

## 27. Palette swap — Architectural Light

**Supersedes all prior palette guidance across delta items 1–26.** Any item that references rust, Connection gold as a loop color, Trust teal as a loop color, or Loyalty magenta as a loop color is updated in place by this item. Follow the rules below, not the prior item descriptions.

The v8 prompt section 1.2 has been fully rewritten to the Architectural Light palette. Engineering implements against the updated section 1.2, not the original.

**The swap at a glance:**

- Parchment `#F4F1EA` replaces the old cream `#F5F0EB` as ground
- Chalk `#E8E2D8` replaces the old `--color-bg-alt` `#EBE4D6` for alt bands
- Deep Steel `#35505F` replaces rust `#C85A3A` everywhere as primary action
- Mineral Blue `#4E6E81` is introduced as the structural secondary
- Mist Blue `#A9BAC4` is introduced for muted data and UI borders
- Midcentury Magenta `#C44A7A` is introduced as a 5%-maximum surprise accent
- Gold `#C89B3C` is retained for the AUX Wallet bar only
- The three-loop color taxonomy (Connection gold / Trust teal / Loyalty magenta) is retired entirely

**Global token replacement, section by section:**

### Hero (items 2, 17, 18)

- Nav CTA button background: Deep Steel
- Logo slash: Deep Steel
- Eyebrow text color: Deep Steel
- Headline emphasis span on "Run for you": Deep Steel
- Primary CTA button: Deep Steel, hover Mineral Blue
- Secondary CTA button border: Ink, hover state border Deep Steel
- Hero maze flow dots: Deep Steel (replaces rust `#C85A3A` across all dot groups and trail opacities)
- Hero maze route trace lines: `rgba(53, 80, 95, 0.03)` (Deep Steel at 3% opacity, replaces the rust trace)
- Hero maze waypoint markers: `rgba(53, 80, 95, 0.04)` (same family, slightly higher opacity)
- Outlined PLAYBOOK watermark: `rgba(18, 20, 23, 0.06)` ink stroke (unchanged — this is a neutral, not a brand color)

### Nav (item 19)

- Default state over Parchment section: transparent background, Ink text, Deep Steel CTA
- Over Ink dark section: `rgba(18, 20, 23, 0.9)` background, Parchment text, Deep Steel CTA (hover Mineral Blue)

### Proof strip (item 17 region)

- Outcome numbers ($2M, etc.): Deep Steel
- Descriptor labels: mono, muted
- Context text: Ink

### New growth playbook section (item 2)

- Eyebrow: Deep Steel
- Headline emphasis: Deep Steel
- Stat numbers (95% / 94% / 22): Deep Steel
- Transition line emphasis: Deep Steel

### Old playbook / New playbook (if kept per any future reversal — currently hidden per item 1)

- Slash divider: Deep Steel
- New column emphasis: Ink (no accent wash)

### Loops section (items 3, 4)

- All nine stage nodes: Deep Steel outline, Parchment fill, 40-44px circle
- Active node: Deep Steel fill, Parchment icon
- Hover state: Mist Blue background tint on the hit target
- Detail panel eyebrow (Connect / Build Trust / Grow): Deep Steel
- Detail panel headline: Ink
- Stage icon color inside node: Deep Steel
- Route traces between nodes (if rendered): `rgba(53, 80, 95, 0.15)` Deep Steel at low opacity

**Loop color taxonomy retired.** Connect, Build Trust, Grow are labels only. They carry no distinct color. The prior spec language about "1–3 Connection gold, 4–6 Trust teal, 7–9 Loyalty magenta" is void.

### Signal River (if retained from v5)

- Dark ground (Ink `#121417`)
- Tile backgrounds: slight variance on Graphite
- Tile accent lines: Mineral Blue
- Pulsing moments: Deep Steel at higher opacity

### AUX card (items 5, 20)

- Composite score "79" at 64px: Deep Steel (replaces rust)
- Tier badge "T1 · Active" border and text: Deep Steel
- Tier badge pulsing dot: Deep Steel
- Composite trend arrow and text: Deep Steel
- FRVRD radar polygon fill: `rgba(53, 80, 95, 0.22)` (slightly higher than rust was at 0.18 — compensates for cooler hue reading less saturated)
- FRVRD radar polygon stroke: Deep Steel at 2px (keep stroke width — do NOT drop to 1px, see "too polite" guard)
- FRVRD axis values: Deep Steel
- Activity feed deltas (+10, +12, +8, +15): Deep Steel
- Activity row dots (neutral): Mist Blue
- Activity row dots (warm/emphasis): Gold (reserved for Wallet-score emphasis moments only) OR Mineral Blue (preferred for activity context)
- Signal-to-Outcome plays table priority score bars: Deep Steel fills, Mist Blue track
- Wallet bar in component scores: Gold (unchanged)
- Fit and Readiness bars: Deep Steel (replaces rust)

### AI Mirror (items 6, 7, 21)

- Chat UI send button: Deep Steel
- Chat UI user message bubble: Chalk background
- Chat UI assistant message bubble: White card background
- "UNLIKELY SOURCE" tag on Glassdoor and Reddit citations: Midcentury Magenta (this is one of the approved 5% surprise uses)
- Source panel header label: Deep Steel
- Source list icons and logos: neutral (grayscale)

### Audit section (items 5, 8 original)

- Section eyebrow "08 · Start here" (or without prefix per global numbering decision): Deep Steel
- Headline emphasis on "noise": Midcentury Magenta (approved surprise use — the "must not miss" warning moment)
- Audit card headers: Deep Steel for diagnostic type badge
- Audit card loop tags: retired. Do NOT tag audit cards with Connection/Trust/Loyalty colors. Use a neutral mono label instead (e.g., "Diagnostic · 14 days")
- CTA "Get your audit →": Deep Steel

### Integrations / AI & Automation (item 8)

- Section connector lines between logos: Mist Blue, 1px
- Logo treatment: grayscale at 60-70% opacity
- Pulsing/traveling dot in the automation visualization: Deep Steel

### Halo (items 9, 10, 22)

- LinkedIn logo treatment: brand-appropriate (LinkedIn blue stays as is — this is a third-party mark, not an ERA accent)
- Halo data tile chart fills: Deep Steel primary, Mineral Blue secondary
- Halo metric callouts: Deep Steel

### What to Expect

- Phase number emphasis: Deep Steel
- Compounding curve: Deep Steel with Mist Blue gradient tail

### Clients / testimonials (item 26)

- Five-star rating: Deep Steel (replaces rust)
- Quote mark ornament: Deep Steel at 12% opacity
- Attribution name: Ink
- Role: Muted
- Company logo: brand-appropriate

### Engage (tier cards)

- Tier name / label color: Deep Steel
- Price emphasis: Ink
- CTA: Deep Steel

### Leader-bench block (item 24) — cream ground, not dark

- Eyebrow "Who runs it": Deep Steel
- Headline emphasis "growth": Deep Steel (replaces rust — verify contrast on Parchment, ~7:1, passes WCAG AA)
- Logo strip label "Led growth at:": mono, muted
- Past-career logos: grayscale 60% opacity

### /our-story page (item 25)

- All manifesto emphasis (pull quotes, section ornaments): Deep Steel
- Signature block rule: Deep Steel at 1.5px
- Who-runs-it section: dark ground (Ink), Parchment text, Deep Steel accents on credentials and hover states

### Close section (item 14)

- Form Send button: Deep Steel
- Form field focus state border: Deep Steel
- "Start a conversation" link underline: Deep Steel
- Email address: Muted

### Footer (item 15)

- Row 3 ERA diamond logo slash: Deep Steel
- All footer links: Ink, hover Deep Steel

**The two-color rule enforcement:**

Engineering should never ship a section that contains Deep Steel + Mineral Blue + Magenta + Gold all at once. Each section uses at most two non-neutral accents. Check each section against this rule before commit.

**"Too polite" QA pass:**

After the global swap, QA against the anti-pattern guard in the v8 prompt section 1.2:

- Are headlines still Instrument Sans 700 at full scale?
- Are FRVRD radar strokes still 2px (not thinned to 1px)?
- Is body text still Ink on Parchment (not Graphite on Parchment)?
- Is Mist Blue used only for structural elements (not for headlines, CTAs, or section backgrounds)?
- Is Magenta used in no more than three places per rendered page?

If any of those fail, the palette has drifted toward too-polite and needs correction.

**Reference file regeneration:**

All reference files need their palette updated:

- `era-v8-hero-maze-reference.html` — flow dots and route traces to Deep Steel
- `era-v8-aux-reference.html` — composite, tier badge, FRVRD, activity deltas, Fit and Readiness bars to Deep Steel; Wallet stays Gold
- `era-v8-new-playbook.html` — all rust to Deep Steel
- `era-v8-loops.html` — accent ring to Deep Steel, no loop-color tints
- `era-v8-clients-reference.html` — stars and quote mark to Deep Steel
- `era-style-guide.md` — token updates and the Architectural Light principles

Engineering should update all six files in a single token-replacement pass, then QA against the "too polite" checklist above.

**Shadow tokens:**

Update the shadow-card variable to use `rgba(18, 20, 23, ...)` instead of `rgba(0, 0, 0, ...)` so shadows pick up the slight blue of Ink rather than pure black. Subtle but keeps the palette coherent.

```css
--shadow-card: 0 2px 8px rgba(18, 20, 23, 0.06);
--shadow-card-layered:
  0 1px 2px rgba(18, 20, 23, 0.04),
  0 8px 24px rgba(18, 20, 23, 0.06),
  0 24px 48px rgba(18, 20, 23, 0.04);
```
