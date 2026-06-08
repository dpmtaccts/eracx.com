/* Centralized section-label prefix for visible UI.
   The arrow glyph (U+25B8) lives here and only here. Every section eyebrow
   renders through one of these helpers so the prefix cannot drift across
   pages. A project-wide guard (npm run check:no-section-sign) fails the
   build if the legacy SECTION SIGN character (U+00A7) is reintroduced
   anywhere in src.

   Format: "▸ NN · LABEL", e.g. "▸ 03 · WHERE THE DECISION ACTUALLY HAPPENS". */

export const SECTION_GLYPH = '▸' // U+25B8 BLACK RIGHT-POINTING SMALL TRIANGLE

export function formatSectionLabel(num: string | number, label: string): string {
  const padded = typeof num === 'number' ? String(num).padStart(2, '0') : num
  return `${SECTION_GLYPH} ${padded} · ${label}`
}
