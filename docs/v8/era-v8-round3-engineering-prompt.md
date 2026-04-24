# ERA v8 — Round 3 engineering prompt

You are Claude Code. Your task is to build round 3 of the ERA website.

## Read these files before you write any code

Located at `eracx.com/docs/v8/`:

1. **`claude-code-prompt.md`** — master v8 prompt. Read this first. It contains the full design philosophy, component system, section-by-section specs, and the Architectural Light palette in Part 1 §1.2.

2. **`staging-feedback-delta.md`** — 32-item feedback document that supersedes the master prompt wherever they conflict. Items 1–17 are round 1 feedback. Items 18–23 are round 2. Items 24–32 are round 3 (the work you are doing now). Item 27 supersedes all color guidance in both the master prompt and earlier items.

3. **Reference files** in `eracx.com/docs/v8/references/`:
   - `hero-drift-reference.html` — canonical hero build (item 28, replaces the earlier maze spec in items 17–18)
   - `aux-reference.html` — canonical AUX card build
   - `clients-reference.html` — two-testimonial layout (item 26)
   - `new-playbook.html` — combined playbook intro section
   - `loops.html` — nine-stage loops interim reference
   - `prototype-v5.html` — layout reference for unchanged sections

**Priority order when sources conflict:** item 32 > item 31 > ... > item 1 > master prompt.

## Scope of this round

You are executing delta items 24 through 32. Earlier items (1–23) should already be in the build from round 2 — verify they are, flag anything missing, but do not redo them.

### Build these in order

**1. Palette swap to Architectural Light (item 27, extended by items 29, 31, 32)**

Global token replacement. The master palette in `claude-code-prompt.md` §1.2 is now Architectural Light. Propagate the tokens to every CSS file and reference.

Key tokens:
- Parchment `#F4F1EA` (ground)
- Chalk `#E8E2D8` (alt bands)
- Ink `#121417` (display type, dark-ground backgrounds)
- Graphite `#2A3138` (secondary display)
- Deep Steel `#35505F` (primary action, CTAs, data) — light ground only
- Mineral Blue `#4E6E81` (hover states, secondary data)
- Sky Blue `#C4D5DE` (primary accent on dark-ground sections — see item 29; renamed from Mist Blue per item 31b)
- Midcentury Magenta `#C44A7A` (surprise accent, 5% max)
- Gold `#C89B3C` (AUX Wallet score only)

Rust `#C85A3A` is retired entirely. The three-loop color taxonomy (Connection gold / Trust teal / Loyalty magenta) is retired — loop sections are color-neutral.

Dark-ground accent rule (item 29): any section with `data-ground="dark"` uses Sky Blue as its primary accent, not Deep Steel. Apply via scoped CSS override:

```css
.section[data-ground="dark"] {
  --color-accent: var(--color-accent-on-dark);
  --color-accent-hover: var(--color-accent-on-dark-hover);
}
```

Magenta is approved in exactly six places across the homepage. Do not use it anywhere else:
- Hero "Run for you" headline accent (item 31a)
- Loops section eyebrow dot (item 32a)
- AUX section eyebrow dot (item 32b)
- AI Mirror UNLIKELY SOURCE tags on Glassdoor and Reddit citations
- Audit section "noise" emphasis in "AI and automation without strategy is noise"
- Rare chart callouts, maximum one per chart

Shadow tokens use Ink-tinted shadows (`rgba(18, 20, 23, ...)`), not pure black.

**2. Homepage hero with atmospheric drift (item 28)**

Port the hero motion pattern from `hero-drift-reference.html`. Three large blurred radial-gradient fields drift slowly in the background (24s, 28s, 30s ease-in-out). CSS only, no SVG, no JavaScript. Respect `prefers-reduced-motion`.

The earlier playbook-maze pattern (items 17–18) is retired. The old hero maze reference file can stay archived but is no longer canonical.

**3. Homepage nav (item 30)**

Replace the existing nav with:

```
Why Era · GTM Design · Halo · Free Tools · Our Story · Contact
```

Plus the `Request an audit` CTA on the right. All nav items route to standalone pages, not homepage scroll anchors. Nav behavior is adaptive (item 19) — transparent over light-ground sections, 90% dark with backdrop blur over dark-ground sections, 250ms transition via IntersectionObserver.

Mobile: hamburger below 768px, drawer slides from the right, six items stacked vertically at 18px with 24px vertical padding, CTA at bottom of drawer at full width.

**4. Homepage leader-bench credibility block (item 24)**

Replaces the prior Founder section. Cream ground, no face, no bio.

- Eyebrow: `Who runs it` (mono, Deep Steel)
- Headline: `Decades of growth, now built into one system.` ("growth" in Deep Steel)
- Lede paragraph (three sentences): "ERA is built by GTM executives, business leaders, and founders with decades of experience across Fortune 500 enterprises. We've led the data-driven growth programs at some of the largest B2B companies in the world. Now we operate that experience as a system inside yours."
- Logo strip label: `Led growth at:` (mono, muted)
- Logos: Microsoft, Chase, P&G, IHG, Amazon, Intel, T-Mobile from `/public/images/`, optical-sized to ~40px visual weight, greyscale at 60% opacity
- CTA link: `Read our approach →` routing to `/our-story`

Critical terminology: ERA **operates**. The credibility block refers to **leaders** (GTM executives, business leaders, founders, high-growth leaders) — never "operators." Do not use "operators" in any copy on the homepage or /our-story page.

**5. Homepage Clients section (item 26)**

Replace the old 2x2 clients grid with two testimonial cards. Build from `clients-reference.html`.

- Eyebrow: `Clients`
- Headline: `Leaders talking about the work.`
- Subhead: `Two leaders who've seen the system run inside their companies.`

Card 1 — Nate Houghton:
- Five stars in Deep Steel
- Quote: "Justin builds the thing most consultants just talk about. Actual operational systems. Scoring, enrichment, sequencing, CRM. When he hands it off, your team can run it."
- Profile photo from `/public/images/`
- Name: Nate Houghton
- Role: Head of Sales, Americas
- Company logo: Lorikeet (from `/public/images/`)

Card 2 — Lara Vandenberg:
- Five stars in Deep Steel
- Quote: "Era is an asset to any high-growth company, impacting every aspect of revenue, marketing, customer success, and account management."
- Profile photo from `/public/images/`
- Name: Lara Vandenberg
- Role: Founder, Publicist
- Company logo: Publicist (from `/public/images/`)

Each card: white surface on Parchment ground, 12px border radius, layered shadow (Ink-tinted). Hover lift at translateY(-2px). Below 900px stack vertically, reduce padding to 28px.

**6. New standalone pages**

Build these three pages in round 3. Other nav items (Why Era, Free Tools, Contact) defer to round 4 pending copy.

**6a. `/our-story` (item 25)**

Three sections top to bottom:

**Section A — manifesto.** Cream ground, narrow column max 680px centered.

Preamble (italic serif treatment, the short note):

> Hey there,
>
> Thanks for being here.
>
> I want to set expectations early.
>
> Era exists for one reason: the relationships that matter most to your growth are the ones you keep meaning to follow up on.
>
> Between the meetings you didn't plan, the priorities that shift by Wednesday, and the conversations that pile up in a founder's week, something always gives. Usually it's the follow-up.
>
> Most GTM tools assume you'll stop what you're doing, open a dashboard, and run the play. That rarely happens.
>
> Era is built to work when you're busy.
>
> We run the system. You keep the focus.
>
> It's more than a tool, not another platform to babysit, and just a reliable way to make sure the right people keep hearing from you, even when you're not thinking about them.
>
> If Era does its job, you'll notice one thing first: you're back to doing the work only you can do.
>
> That's the goal.
>
> — Justin

Thin rule separator.

Full essay below (18–19px sans, line-height 1.6):

**On Focus**

The best leaders I've ever worked with share one trait: ruthless about what they don't do.

It's infuriating how they say "No," to the meeting that could be an email. "No," to the introduction that goes nowhere. "No," to the conference, the panel, the offsite that everyone else wants an invite to, unless it serves one thing: the objective. They say "No," because they've raised their floor. And because they say no to almost everything, when they say, "Yes," it means something.

We built Era to work alongside those people. Leaders who know exactly what they're building and who they're building it for. Executives who wake up thinking about their product, their team, their customers.

They are missional. And that focus is what makes them great.

Our job is to protect it.

If you have a good product and a strong sales team, you don't need to spend your time evaluating GTM tools, interviewing BDR candidates, managing CRM workflows, or managing agencies who report on vanity metrics. You need a system that builds and maintains the relationships that matter. One that runs without pulling you into it.

That's what Era is.

We are built on focus. Our playbook is built to connect with real people, in real companies, with real problems that your product actually solves. We build toward that relationship deliberately: from unknown to known, from known to trusted, from trusted to the kind of relationship that generates referrals, expansions, and renewals without anyone having to remember to follow up.

We also believe the best companies know exactly who they serve. Every system we build is designed around that principle. Who are we trying to reach? Who are we building trust with? Who do we want to still be talking to in three years?

Focus isn't a strategy. It's a discipline. And it's the hardest thing to maintain when growth feels urgent.

We use the best in AI and automation to make that discipline scalable. Growth is hard enough. We're not here to make it harder. We're here to make sure the hard work you've already done compounds into something that keeps working.

That's why we built Era.

Signature block: `Justin Marshall, Founder` in mono, right-aligned, followed by a thin Deep Steel rule.

Pull quotes at two moments in the essay (choose paragraph breaks):
- "We built Era to work alongside those people."
- "Focus isn't a strategy. It's a discipline."

**Section B — Who runs it.** Dark ground (`data-ground="dark"`).

Build a profile grid component that can hold 1–2 profiles with a feature flag on the second slot.

Profile 1 (always visible):
- B&W headshot rounded square, 200×200px
- Name: Justin Marshall
- Role: Founder
- Credential line (mono, Sky Blue): "Built growth programs across Microsoft, Chase, P&G, IHG, Amazon, Intel, T-Mobile"
- One-sentence bio: "Built ERA to turn decades of enterprise growth experience into a system that runs inside B2B companies."

Profile 2 (feature-flagged, hidden by default):
- Placeholder until Jen Anderson confirms her name for public listing. When populated: B&W headshot, "Jen Anderson," role TBD, credential line "Ran Customer Intelligence at T-Mobile..."
- Build the component so populating this slot is a single config change, not a code change.

Section closer line below the profile grid:

> Supported by a bench of GTM leaders and advisors across the US and EU.

**Section C — CTA.** Cream ground.

- Headline: `Ready to focus?`
- CTA: `Start a conversation →` routing to `/contact` or triggering the close-section form modal

**6b. `/gtm-design`**

Build from the content in `Era___GTM_Systems_for_B2B_Companies.pdf` attached to this session. The PDF contains full copy, structure, and deliverables list.

Page structure:
1. Hero: "Your pipeline shouldn't depend on who the founder knows." / "Fixed-scope GTM sprint · 3 weeks · 4 deliverables" with "Start the conversation" CTA
2. Problem framing: "Most B2B companies don't have a GTM problem. They have a clarity problem." with three gap sections (Signal-Based Pipeline, Defined ICP + Scored List, Campaign Architecture), each with its own stat citation
3. Four deliverables with the visual treatments shown in the PDF:
   - 01 Pipeline Map
   - 02 ICP Definition and Scored Prospect List
   - 03 Campaign Architecture
   - 04 GTM Blueprint Document
4. How the engagement works: three-phase timeline (Diagnostic Week 1 → Build Weeks 1-2 → Handoff Week 3)
5. Fit criteria: "Built for B2B companies that have traction but not a system / $2M–$50M / You're a fit if..."
6. Close: "Ready to build the system?" with "Start the Conversation" CTA
7. Footer close block: "The pipeline doesn't build itself. Era builds the system that does." with the form

Use Architectural Light palette throughout. All accents Deep Steel. No magenta on this page (it's reserved for homepage moments).

**6c. `/halo`**

Build from existing Halo specs in the v8 prompt plus item 22 for the bento-tile layout.

Main tile: 2/3 width, 16:10 aspect ratio, LinkedIn feed-style dashboard screenshot with ERA scoring overlays, LinkedIn logo top-left inside the image.

Two side tiles: 1/3 width each, 4:3 aspect ratio, stacked. Content: specific Halo metric charts (engagement-per-post over time, ICP-match-rate over weeks).

Three principles below the dashboard:
- 01 Voice-tuned, not ghostwritten.
- 02 Plugged into the Signal River.
- 03 Operated, not advised.

Pricing: `From $999/mo · ongoing` · "Scope varies by team size."

CTA: `See if Halo fits`

Below 900px: stack all three tiles vertically, main tile first.

### 7. All 32 delta items verified in build

Before you commit, walk the full delta document and verify each item 1–32 is reflected in the build. Items you may find missing from round 2:

- Item 5: plays table must span the full width of the AUX card (not left-column only)
- Item 21: AI Mirror must render as an actual chat UI with text input and Send button, not a static card
- Item 22: Halo bento must use 2/3 + 1/3 + 1/3 proportions, LinkedIn logo inside main tile
- Item 23 is superseded by item 24 — do not flip the Founder section to dark ground, replace it entirely with the leader-bench block

### 8. "Too polite" QA checklist

After the global palette swap, QA against the anti-pattern guard in v8 prompt §1.2:

- Headlines still Instrument Sans 700 at full scale (do not thin to match softer palette)
- FRVRD radar strokes still 2px, fill 18–22% opacity (do not drop to 1px and 8%)
- Body text is Ink on Parchment, not Graphite on Parchment
- Mist/Sky Blue is used only for structural elements on dark ground — never for headlines, CTAs, or section backgrounds on light ground
- Magenta appears in no more than six places per rendered page
- No section contains Deep Steel + Mineral Blue + Magenta + Gold all at once (two-color rule per section)

If any check fails, the palette has drifted toward too-polite and needs correction.

### 9. Page structure engineering needs

```
/                          ← homepage (items 1–32 all applied)
/our-story                 ← item 25
/gtm-design                ← from PDF content
/halo                      ← from Halo specs
/why-era                   ← round 4, skip for now
/free-tools                ← round 4, skip for now
/contact                   ← round 4, skip for now (close-section form handles conversion meanwhile)
```

Footer nav (three-row per item 15) links to all seven pages.

### 10. Asset blocker checklist before merge

Confirm with Justin before ship:

- Past-career logos for leader-bench strip (Microsoft, Chase, P&G, IHG, Amazon, Intel, T-Mobile) in greyscale at ~40px visual weight
- Nate Houghton headshot in `/public/images/`
- Lara Vandenberg headshot in `/public/images/`
- Lorikeet logo in `/public/images/`
- Publicist logo in `/public/images/`
- Justin Marshall headshot for `/our-story` "Who runs it" block (B&W, rounded square, 200×200px minimum)
- Proof strip columns 2 and 3 need quantified client outcomes (columns 1 live: $2M pipeline in under 4 months; 2 and 3 currently placeholder)
- Audit section screenshots in `/public/images/audit_screenshots/` (Navalent confirmed, BetterUp pending anonymization — redaction must be baked into PNG before merge)

## Style guidance when copy is ambiguous

Write in Justin's voice: professional, direct, peer-to-peer, no buzzwords, no em dashes, no exclamation marks, no emoji. Gladwell-adjacent — narrative but not chatty, confident but not boastful. Short paragraphs, varied sentence length. Never three short declaratives in a row (staccato is an AI tell).

Copy rules encoded in the master prompt still apply. Where any copy on a new page is ambiguous or missing, use Justin's provided content verbatim from the PDFs, or use placeholder content clearly marked `[TBD: confirm with Justin]` rather than generating replacement copy.

## Hand-off note

Hit staging at `staging.eracx.com` when round 3 is ready for review. Flag any blockers in the PR description. Include a screenshot of each new page and each major changed section (hero, leader-bench, clients, nav) so Justin can review without clicking through every path.

End of prompt.
