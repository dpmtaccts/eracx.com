// VisualInspector.tsx
// Dev-only click-to-edit inspector for the /v3 staging homepage.
// Click any element on the page to edit its font, color, and spacing live.
// Overrides persist in localStorage. "Copy CSS" exports the changes.
// Keyboard shortcut: Cmd+Shift+I (or Ctrl+Shift+I on Windows)

import { useEffect, useRef, useState, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface Override {
  selector: string;          // unique DOM path for this element
  styles: Record<string, string>;  // { fontSize: '18px', color: '#35505F', ... }
  label: string;             // human-readable element description
}

interface OverrideMap {
  [selector: string]: Override;
}

// ============================================================================
// PROPERTIES THE INSPECTOR CAN EDIT
// ============================================================================

type PropSpec = {
  key: string;                 // CSS property name (camelCase for inline, kebab for export)
  label: string;
  type: 'size' | 'number' | 'color' | 'text' | 'select';
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  unit?: string;
};

const EDITABLE_PROPS: PropSpec[] = [
  // Type
  { key: 'fontSize',       label: 'Font size',       type: 'size',   min: 8,   max: 140, step: 1,    unit: 'px' },
  { key: 'fontWeight',     label: 'Font weight',     type: 'select', options: ['300','400','500','600','700','800'] },
  { key: 'lineHeight',     label: 'Line height',     type: 'number', min: 0.8, max: 2.2, step: 0.05 },
  { key: 'letterSpacing',  label: 'Letter spacing',  type: 'size',   min: -0.05, max: 0.2, step: 0.005, unit: 'em' },
  // Color
  { key: 'color',          label: 'Text color',      type: 'color' },
  { key: 'backgroundColor',label: 'Background',      type: 'color' },
  // Spacing
  { key: 'paddingTop',     label: 'Padding top',     type: 'size', min: 0, max: 200, step: 2, unit: 'px' },
  { key: 'paddingRight',   label: 'Padding right',   type: 'size', min: 0, max: 200, step: 2, unit: 'px' },
  { key: 'paddingBottom',  label: 'Padding bottom',  type: 'size', min: 0, max: 200, step: 2, unit: 'px' },
  { key: 'paddingLeft',    label: 'Padding left',    type: 'size', min: 0, max: 200, step: 2, unit: 'px' },
  { key: 'marginTop',      label: 'Margin top',      type: 'size', min: -100, max: 200, step: 2, unit: 'px' },
  { key: 'marginBottom',   label: 'Margin bottom',   type: 'size', min: -100, max: 200, step: 2, unit: 'px' },
];

// ============================================================================
// STORAGE
// ============================================================================

const STORAGE_KEY = 'era-v3-inspector-overrides';

function loadOverrides(): OverrideMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveOverrides(map: OverrideMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    console.warn('[VisualInspector] Failed to save overrides:', e);
  }
}

// ============================================================================
// UNIQUE SELECTOR GENERATION
// ============================================================================
// We generate a stable, unique path for each element so overrides map
// correctly even across renders. Strategy:
//   1. Walk up from the element to a known root
//   2. At each level, use tag + nth-child index
//   3. Prefix with a data-inspector-root="v3" anchor

function getSelectorPath(el: Element): string {
  const parts: string[] = [];
  let current: Element | null = el;
  while (current && current !== document.body) {
    const tag = current.tagName.toLowerCase();
    const parent = current.parentElement;
    if (!parent) break;
    // Find index among siblings of same tag
    const siblings = Array.from(parent.children).filter(c => c.tagName === current!.tagName);
    const index = siblings.indexOf(current);
    parts.unshift(`${tag}:nth-of-type(${index + 1})`);
    current = parent;
    if (current.getAttribute && current.getAttribute('data-inspector-root') === 'v3') {
      parts.unshift('[data-inspector-root="v3"]');
      break;
    }
  }
  return parts.join(' > ');
}

function describeElement(el: Element): string {
  const tag = el.tagName.toLowerCase();
  const text = el.textContent?.trim().slice(0, 40) || '';
  const truncated = text.length === 40 ? text + '…' : text;
  return truncated ? `<${tag}> ${truncated}` : `<${tag}>`;
}

// ============================================================================
// APPLY OVERRIDES TO DOM
// ============================================================================
// We inject a single <style> tag with all overrides as CSS rules.
// This survives React re-renders because it's a global stylesheet.

function applyOverridesToDom(map: OverrideMap) {
  let styleTag = document.getElementById('era-v3-inspector-styles') as HTMLStyleElement | null;
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'era-v3-inspector-styles';
    document.head.appendChild(styleTag);
  }

  const rules: string[] = [];
  for (const selector in map) {
    const override = map[selector];
    const declarations = Object.entries(override.styles)
      .map(([k, v]) => `  ${camelToKebab(k)}: ${v} !important;`)
      .join('\n');
    rules.push(`${selector} {\n${declarations}\n}`);
  }

  styleTag.textContent = rules.join('\n\n');
}

function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

// ============================================================================
// EXPORT CSS
// ============================================================================

function exportCSS(map: OverrideMap): string {
  const header = [
    '/* ========================================================',
    '   ERA v3 — Visual Inspector overrides',
    `   Generated: ${new Date().toISOString()}`,
    `   Count: ${Object.keys(map).length} element(s)`,
    '   Paste into v3-tokens.css or a component-level style,',
    '   then clear via the Inspector "Clear all" button.',
    '   ======================================================== */',
    '',
  ].join('\n');

  const rules = Object.values(map).map(override => {
    const comment = `/* ${override.label} */`;
    const declarations = Object.entries(override.styles)
      .map(([k, v]) => `  ${camelToKebab(k)}: ${v};`)
      .join('\n');
    return `${comment}\n${override.selector} {\n${declarations}\n}`;
  });

  return header + '\n' + rules.join('\n\n') + '\n';
}

// ============================================================================
// COMPONENT
// ============================================================================

export function VisualInspector() {
  // Gate to dev only
  if (!import.meta.env.DEV) return null;

  const [isActive, setIsActive] = useState(false);
  const [selectedEl, setSelectedEl] = useState<Element | null>(null);
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [overrides, setOverrides] = useState<OverrideMap>(() => loadOverrides());
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Apply overrides to DOM whenever they change
  useEffect(() => {
    applyOverridesToDom(overrides);
    saveOverrides(overrides);
  }, [overrides]);

  // Keyboard shortcut: Cmd/Ctrl + Shift + I
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        setIsActive(v => !v);
      }
      if (e.key === 'Escape') {
        setSelectedEl(null);
        if (isActive) setIsActive(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isActive]);

  // Click handler when inspector is active
  const onDocumentClick = useCallback((e: MouseEvent) => {
    if (!isActive) return;

    const target = e.target as Element;
    // Don't select the inspector panel itself or its controls
    if (panelRef.current?.contains(target)) return;
    if (target.closest('[data-inspector-ui]')) return;

    e.preventDefault();
    e.stopPropagation();

    setSelectedEl(target);
    setSelectedPath(getSelectorPath(target));
    setSelectedLabel(describeElement(target));
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    document.addEventListener('click', onDocumentClick, true);
    return () => document.removeEventListener('click', onDocumentClick, true);
  }, [isActive, onDocumentClick]);

  // Compute current value for a given property on the selected element
  const getCurrentValue = useCallback((prop: PropSpec): string => {
    if (!selectedEl) return '';
    const override = overrides[selectedPath];
    if (override?.styles[prop.key]) return override.styles[prop.key];
    const computed = window.getComputedStyle(selectedEl);
    return computed.getPropertyValue(camelToKebab(prop.key)).trim();
  }, [selectedEl, selectedPath, overrides]);

  const updateStyle = useCallback((propKey: string, value: string) => {
    if (!selectedPath || !selectedLabel) return;
    setOverrides(prev => {
      const existing = prev[selectedPath] || {
        selector: selectedPath,
        styles: {},
        label: selectedLabel,
      };
      const nextStyles = { ...existing.styles };
      if (value === '' || value === null) {
        delete nextStyles[propKey];
      } else {
        nextStyles[propKey] = value;
      }
      if (Object.keys(nextStyles).length === 0) {
        const { [selectedPath]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [selectedPath]: { ...existing, styles: nextStyles },
      };
    });
  }, [selectedPath, selectedLabel]);

  const clearSelectedOverrides = () => {
    if (!selectedPath) return;
    setOverrides(prev => {
      const { [selectedPath]: _, ...rest } = prev;
      return rest;
    });
  };

  const clearAllOverrides = () => {
    if (!confirm('Clear all visual inspector overrides? This cannot be undone.')) return;
    setOverrides({});
  };

  const handleCopyCSS = async () => {
    const css = exportCSS(overrides);
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: open in a textarea modal
      console.log(css);
      alert('CSS logged to console (clipboard not available).');
    }
  };

  const overrideCount = Object.keys(overrides).length;
  const selectedOverride = selectedPath ? overrides[selectedPath] : null;

  return (
    <>
      {/* Chip toggle (always visible in dev) */}
      <button
        data-inspector-ui
        onClick={() => setIsActive(v => !v)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: isActive ? 420 : 20,
          zIndex: 10000,
          background: isActive ? '#C44A7A' : '#121417',
          color: '#F4F1EA',
          border: 'none',
          padding: '10px 14px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          transition: 'all 150ms',
        }}
      >
        {isActive ? '● Inspecting' : 'Inspect'}
        <span style={{ marginLeft: 8, padding: '2px 6px', background: 'rgba(244,241,234,0.2)', fontSize: 9 }}>
          ⌘⇧I
        </span>
      </button>

      {/* Highlight overlay on selected element */}
      {selectedEl && (
        <SelectionOverlay el={selectedEl} />
      )}

      {/* Edit panel */}
      {isActive && (
        <div
          data-inspector-ui
          ref={panelRef}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: 400,
            height: '100vh',
            background: '#FFFFFF',
            borderLeft: '1px solid #CFC8BA',
            zIndex: 9999,
            boxShadow: '-8px 0 24px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Instrument Sans, sans-serif',
            color: '#121417',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #CFC8BA',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontFamily: 'Instrument Serif, serif',
                fontStyle: 'italic',
                fontSize: 22,
                lineHeight: 1,
              }}>Visual Inspector</div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color: '#6B6E72',
                marginTop: 4,
                letterSpacing: '0.08em',
              }}>
                {overrideCount} OVERRIDE{overrideCount === 1 ? '' : 'S'} · {isActive ? 'CLICK TO SELECT' : 'PAUSED'}
              </div>
            </div>
            <button
              data-inspector-ui
              onClick={() => setIsActive(false)}
              style={{
                background: 'transparent',
                border: '1px solid #CFC8BA',
                width: 32,
                height: 32,
                fontSize: 18,
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >×</button>
          </div>

          {/* Selection info */}
          {selectedEl ? (
            <div style={{
              padding: '12px 20px',
              background: '#F4F1EA',
              borderBottom: '1px solid #DFD9CC',
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color: '#35505F',
                letterSpacing: '0.12em',
                fontWeight: 700,
                marginBottom: 6,
              }}>SELECTED</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{selectedLabel}</div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color: '#6B6E72',
                wordBreak: 'break-all',
                lineHeight: 1.4,
              }}>{selectedPath}</div>
            </div>
          ) : (
            <div style={{
              padding: '20px',
              textAlign: 'center',
              color: '#6B6E72',
              fontSize: 13,
              fontStyle: 'italic',
            }}>
              Click any element on the page to edit it.
            </div>
          )}

          {/* Editable properties */}
          {selectedEl && (
            <div style={{ overflowY: 'auto', flex: 1, padding: '16px 20px' }}>
              {EDITABLE_PROPS.map(prop => (
                <PropertyRow
                  key={prop.key}
                  prop={prop}
                  value={getCurrentValue(prop)}
                  hasOverride={!!selectedOverride?.styles[prop.key]}
                  onChange={(v) => updateStyle(prop.key, v)}
                  onClear={() => updateStyle(prop.key, '')}
                />
              ))}
              <button
                data-inspector-ui
                onClick={clearSelectedOverrides}
                disabled={!selectedOverride}
                style={{
                  marginTop: 16,
                  padding: '8px 12px',
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid #CFC8BA',
                  cursor: selectedOverride ? 'pointer' : 'not-allowed',
                  opacity: selectedOverride ? 1 : 0.4,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Clear overrides on this element
              </button>
            </div>
          )}

          {/* Footer actions */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid #CFC8BA',
            display: 'grid',
            gap: 10,
            background: '#F4F1EA',
          }}>
            <button
              data-inspector-ui
              onClick={handleCopyCSS}
              disabled={overrideCount === 0}
              style={{
                padding: '12px 16px',
                background: overrideCount === 0 ? '#CFC8BA' : '#35505F',
                color: '#F4F1EA',
                border: 'none',
                cursor: overrideCount === 0 ? 'not-allowed' : 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              {copied ? '✓ Copied to clipboard' : `Copy CSS (${overrideCount} rule${overrideCount === 1 ? '' : 's'})`}
            </button>
            <button
              data-inspector-ui
              onClick={clearAllOverrides}
              disabled={overrideCount === 0}
              style={{
                padding: '8px 12px',
                background: 'transparent',
                color: '#C44A7A',
                border: '1px solid #CFC8BA',
                cursor: overrideCount === 0 ? 'not-allowed' : 'pointer',
                opacity: overrideCount === 0 ? 0.4 : 1,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Clear all overrides
            </button>
            <div style={{
              fontSize: 11,
              color: '#6B6E72',
              lineHeight: 1.4,
              fontFamily: 'Instrument Sans, sans-serif',
              marginTop: 4,
            }}>
              <b>Note:</b> Edits save to localStorage and survive refreshes. Copy CSS when you want to paste changes into the source.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================================
// PROPERTY ROW
// ============================================================================

function PropertyRow({
  prop,
  value,
  hasOverride,
  onChange,
  onClear,
}: {
  prop: PropSpec;
  value: string;
  hasOverride: boolean;
  onChange: (v: string) => void;
  onClear: () => void;
}) {
  // Parse numeric value from "18px" or "1.2" etc.
  const numericMatch = value.match(/^(-?\d*\.?\d+)/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : NaN;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 8,
      marginBottom: 14,
      paddingBottom: 10,
      borderBottom: '1px solid #DFD9CC',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gridColumn: '1 / -1',
      }}>
        <label style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: hasOverride ? '#35505F' : '#121417',
        }}>
          {prop.label}
          {hasOverride && <span style={{ color: '#C44A7A', marginLeft: 6 }}>●</span>}
        </label>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: '#6B6E72',
        }}>{value || '—'}</span>
      </div>

      {prop.type === 'size' && !isNaN(numericValue) && (
        <>
          <input
            type="range"
            min={prop.min}
            max={prop.max}
            step={prop.step}
            value={numericValue}
            onChange={(e) => onChange(`${e.target.value}${prop.unit || ''}`)}
            style={{ gridColumn: '1 / -1', width: '100%', accentColor: '#35505F' }}
          />
        </>
      )}

      {prop.type === 'number' && (
        <input
          type="number"
          min={prop.min}
          max={prop.max}
          step={prop.step}
          value={isNaN(numericValue) ? '' : numericValue}
          onChange={(e) => onChange(e.target.value)}
          style={{
            gridColumn: '1 / -1',
            padding: '6px 8px',
            border: '1px solid #CFC8BA',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12,
          }}
        />
      )}

      {prop.type === 'select' && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            gridColumn: '1 / -1',
            padding: '6px 8px',
            border: '1px solid #CFC8BA',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12,
          }}
        >
          <option value="">—</option>
          {prop.options?.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}

      {prop.type === 'color' && (
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 6 }}>
          <input
            type="color"
            value={normalizeColor(value)}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: 40, height: 32, border: '1px solid #CFC8BA', cursor: 'pointer' }}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="hex / rgb / named"
            style={{
              flex: 1,
              padding: '6px 8px',
              border: '1px solid #CFC8BA',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
            }}
          />
        </div>
      )}

      {hasOverride && (
        <button
          data-inspector-ui
          onClick={onClear}
          style={{
            gridColumn: '1 / -1',
            marginTop: 4,
            padding: '4px 8px',
            background: 'transparent',
            border: '1px solid #DFD9CC',
            fontSize: 10,
            color: '#6B6E72',
            cursor: 'pointer',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.08em',
          }}
        >Reset to default</button>
      )}
    </div>
  );
}

// Color normalization: convert any CSS color to hex for the color input
function normalizeColor(value: string): string {
  if (!value) return '#000000';
  if (value.startsWith('#') && (value.length === 7 || value.length === 4)) return value;
  // Try rendering through a canvas to get hex (browser will convert rgb/named)
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return '#000000';
    ctx.fillStyle = value;
    const parsed = ctx.fillStyle;
    if (parsed.startsWith('#')) return parsed;
    return '#000000';
  } catch {
    return '#000000';
  }
}

// ============================================================================
// SELECTION OVERLAY
// ============================================================================
// A translucent box that follows the selected element. Not interactive.

function SelectionOverlay({ el }: { el: Element }) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const update = () => setRect(el.getBoundingClientRect());
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    const observer = new MutationObserver(update);
    observer.observe(el, { attributes: true, subtree: true, childList: true });
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, [el]);

  if (!rect) return null;

  return (
    <div
      data-inspector-ui
      style={{
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        border: '2px solid #C44A7A',
        background: 'rgba(196, 74, 122, 0.08)',
        pointerEvents: 'none',
        zIndex: 9998,
        transition: 'all 120ms',
      }}
    />
  );
}
