# VisualInspector — integration instructions

A click-to-edit inspector for the ERA v3 staging homepage. Lets Justin edit
font size, weight, letter spacing, line height, colors, padding, and margin
on any element on the page live. Overrides persist in localStorage. A
"Copy CSS" button exports the changes so they can be pasted into the source.

**Dev-only** — the component returns `null` in production via
`import.meta.env.DEV`. Zero bundle cost in prod.

---

## Install

1. Save `VisualInspector.tsx` to `src/components/v3/VisualInspector.tsx`

2. In `src/pages/v3/V3.tsx`, add the import and render it **last** (after
   `<Footer />` and `<Fixer />`):

   ```tsx
   import { VisualInspector } from '@/components/v3/VisualInspector';

   export default function V3() {
     return (
       <div data-inspector-root="v3" data-theme="light">
         <Nav />
         <Hero />
         <Thesis />
         <HowItWorks />
         <Evidence />
         <PointOfView />
         <Operators />
         <Contact />
         <Footer />
         <Fixer />
         <VisualInspector />
       </div>
     );
   }
   ```

3. **Important**: the wrapping `<div>` must have `data-inspector-root="v3"`.
   This is what the inspector uses to generate unique CSS selectors that
   won't collide with other pages. Without this, overrides will not persist
   correctly.

4. Add `src/components/v3/VisualInspector.tsx` to the INDEX.md entries:

   ```
   - VisualInspector.tsx — Dev-only click-to-edit inspector. Cmd+Shift+I to toggle.
     Edit font, color, spacing on any element; overrides persist in localStorage.
     Copy CSS to paste into source.
   ```

---

## How it works (in one paragraph)

The inspector generates a unique CSS selector path for every element by
walking up the DOM from the clicked element to the `[data-inspector-root="v3"]`
anchor, using `tag:nth-of-type(n)` at each level. When you edit a property,
the override is stored keyed by that selector in localStorage and also
written into a single dynamically injected `<style id="era-v3-inspector-styles">`
tag at the end of `<head>`. This means overrides survive React re-renders
(because they're in a global stylesheet, not inline styles) and survive
page refreshes (because they're in localStorage).

---

## How to use

1. Navigate to `/v3` on local dev
2. Click the "Inspect" chip at bottom-right (or press `Cmd+Shift+I`)
3. Click any element on the page — it gets highlighted in magenta, and a
   panel opens on the right with every editable property
4. Adjust sliders, pick colors, type values. Changes apply live.
5. Each override shows a dot (●) indicator when it's active. A "Reset to
   default" button appears for any property that's been overridden.
6. When done, click "Copy CSS" in the footer. The generated CSS has:
   - A header comment with the date and count
   - Each rule labeled with a comment describing the element
   - Valid selectors ready to paste into `v3-tokens.css` or a component file

7. If the overrides are temporary, just refresh to start over (they
   persist, but you can "Clear all overrides" to wipe them).

---

## Known limitations (worth flagging)

1. **Tailwind classes aren't editable.** The inspector reads computed styles
   and applies CSS overrides. If a font size is set by a Tailwind utility
   (`text-2xl`), editing it in the inspector creates a CSS override that
   wins via `!important`. When you copy the CSS and paste back into source,
   you're adding a rule that overrides the Tailwind class — not changing
   the class itself. This is fine for one-offs but not ideal for design
   system changes. For those, edit the Tailwind config directly.

2. **Structural changes are out of scope.** The inspector can't reorder
   elements, edit copy, change HTML structure, or toggle section visibility.
   Those are separate tools.

3. **Selector stability.** If the DOM structure changes (a new sibling
   inserted, a section reordered), old overrides may point to different
   elements or stop applying. This is a real risk during active development.
   If overrides stop working after a structural change, use "Clear all
   overrides" and start fresh.

4. **Dev only.** The component returns `null` in production. If Justin
   wants the inspector on a deployed staging URL, the `if (!import.meta.env.DEV)`
   check needs to be removed or gated differently (e.g., URL query param
   `?inspector=1`).

---

## Gotchas for Claude Code

- The component uses `import.meta.env.DEV` which is a Vite feature. Works
  out of the box in this repo.
- No new dependencies required.
- The component is self-contained: all styling is inline (not Tailwind).
  This is intentional — the inspector's styles should never be affected by
  the page's own CSS.
- If you add a path alias like `@/components`, make sure it's configured
  in `tsconfig.json` and `vite.config.ts`. Otherwise use relative imports.

---

## Keyboard shortcuts

| Shortcut               | Action                         |
|------------------------|--------------------------------|
| `Cmd+Shift+I` / `Ctrl+Shift+I` | Toggle the inspector on/off |
| `Esc`                  | Deselect current element (or close inspector if nothing selected) |
