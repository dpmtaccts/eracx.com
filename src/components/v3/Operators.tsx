// Operators.tsx — §04 section for the /v3 staging homepage.
// Gantt-style 5-row sprint timeline (Audit+map, Signal catalog, Loops+campaigns,
// Handoff, Aux dashboard, Weekly standup) with a LIVE marker at week 4,
// plus a 3-card portrait strip (Founder + 2 operators). Placeholders kept
// verbatim from the source — swap portrait names when ready.

export default function Operators() {
  return (
    <section id="operators">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">§04 &nbsp; Operators</div>
            <h2 className="section-h2">
              Four weeks.<br />
              <span className="slab">Three people.</span>
            </h2>
          </div>
          <p className="section-lede">
            A <strong>GTM Design Sprint</strong> is fixed scope, named
            deliverables, and an operator handoff at week four. You work with
            operators, not layers.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-head">
            <div className="timeline-title">
              <b>Sprint timeline.</b> &nbsp;Kickoff to handoff.
            </div>
            <div className="timeline-meta">28 days · Fixed scope</div>
          </div>
          <div className="timeline-svg-wrap">
            <svg className="timeline-svg" viewBox="0 0 1000 320" xmlns="http://www.w3.org/2000/svg">
              <g fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" fill="var(--text)" letterSpacing="0.1em">
                <text x="150" y="26" textAnchor="middle">WEEK 01</text>
                <text x="350" y="26" textAnchor="middle">WEEK 02</text>
                <text x="550" y="26" textAnchor="middle">WEEK 03</text>
                <text x="750" y="26" textAnchor="middle">WEEK 04</text>
                <text x="920" y="26" textAnchor="middle" fill="var(--accent)">LIVE</text>
              </g>
              <g stroke="var(--rule)" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.6">
                <line x1="50" y1="40" x2="950" y2="40" />
                <line x1="50" y1="280" x2="950" y2="280" />
              </g>
              <g stroke="var(--rule-soft)" strokeWidth="0.8">
                <line x1="250" y1="40" x2="250" y2="280" />
                <line x1="450" y1="40" x2="450" y2="280" />
                <line x1="650" y1="40" x2="650" y2="280" />
                <line x1="850" y1="40" x2="850" y2="280" />
              </g>

              {/* Row 1 — Audit + map */}
              <g>
                <text x="40" y="74" textAnchor="end" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Audit + map</text>
                <rect x="55" y="58" width="190" height="28" fill="var(--cold)" />
                <text x="150" y="77" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--text)">Current motion · warmth distribution</text>
              </g>

              {/* Row 2 — Signal catalog */}
              <g>
                <text x="40" y="114" textAnchor="end" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Signal catalog</text>
                <rect x="255" y="98" width="190" height="28" fill="var(--warming)" />
                <text x="350" y="117" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--bg)">Capture layer wired to tools</text>
              </g>

              {/* Row 3 — Loops + campaigns */}
              <g>
                <text x="40" y="154" textAnchor="end" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Loops + campaigns</text>
                <rect x="455" y="138" width="190" height="28" fill="var(--warm)" />
                <text x="550" y="157" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--bg)">Thresholds set, first campaigns live</text>
              </g>

              {/* Row 4 — Handoff */}
              <g>
                <text x="40" y="194" textAnchor="end" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Handoff</text>
                <rect x="655" y="178" width="190" height="28" fill="var(--hot)" />
                <text x="750" y="197" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--bg)">Operator playbook · your team owns it</text>
              </g>

              {/* Row 5 — Aux dashboard (spans w2–w4) */}
              <g>
                <text x="40" y="234" textAnchor="end" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Aux dashboard</text>
                <rect x="255" y="218" width="690" height="28" fill="var(--text)" />
                <text x="600" y="237" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--bg)">Live from Week 02 onward · updates daily</text>
              </g>

              {/* Row 6 — Weekly standup (dashed span) */}
              <g>
                <text x="40" y="274" textAnchor="end" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="600" fill="var(--text)">Weekly standup</text>
                <rect x="55" y="258" width="790" height="28" fill="none" stroke="var(--text)" strokeWidth="1.4" strokeDasharray="6 4" />
                <text x="450" y="277" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--text)">30 min · shared doc · async by default</text>
              </g>

              {/* LIVE marker */}
              <line x1="850" y1="40" x2="850" y2="290" stroke="var(--accent)" strokeWidth="2" />
              <circle cx="850" cy="40" r="5" fill="var(--accent)" />

              <text x="500" y="310" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontStyle="italic" fontSize="13" fill="var(--text-muted)">Working in public. Every artifact visible as it is built.</text>
            </svg>
          </div>
        </div>

        <div className="portraits-head">
          <div className="portraits-title">
            <b>The team.</b> &nbsp;No layers.
          </div>
          <div className="portraits-count">
            3 operators · 0 account managers
          </div>
        </div>
        <div className="portraits">
          <div className="portrait">
            <div className="portrait-avatar">—</div>
            <div className="portrait-meta">
              <div className="portrait-name">[ Founder name ]</div>
              <div className="portrait-role">Founder · Strategy</div>
              <div className="portrait-bio">
                Runs the sprint end to end. Designs the warmth system, owns
                the client relationship, writes the playbook.
              </div>
            </div>
          </div>
          <div className="portrait">
            <div className="portrait-avatar">—</div>
            <div className="portrait-meta">
              <div className="portrait-name">[ Operator name ]</div>
              <div className="portrait-role">Ops · Data</div>
              <div className="portrait-bio">
                Builds the capture layer. ICP enrichment, signal wiring, Clay
                and Apollo plumbing, the dashboards that go live in Week 02.
              </div>
            </div>
          </div>
          <div className="portrait">
            <div className="portrait-avatar">—</div>
            <div className="portrait-meta">
              <div className="portrait-name">[ Operator name ]</div>
              <div className="portrait-role">Loops · Campaigns</div>
              <div className="portrait-bio">
                Designs the Connection, Trust, and Loyalty loops. Writes the
                campaign copy, configures the triggers, owns the handoff doc.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
