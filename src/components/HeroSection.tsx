export default function HeroSection() {
  return (
    <section
      style={{
        background: "#111111",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 0,
          alignItems: "center",
          padding: "0 80px 80px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          position: "relative",
        }}
        className="hero-grid"
      >
        {/* LEFT COLUMN */}
        <div>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#C4522A",
              marginBottom: 28,
            }}
          >
            GTM Systems for B2B Companies
          </p>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(52px, 5.5vw, 84px)",
              fontWeight: 800,
              color: "#F5F0E8",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              marginBottom: 28,
              maxWidth: 580,
            }}
          >
            Infrastructure for growth teams.
          </h1>

          {/* Subhead */}
          <p
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: "rgba(245, 240, 232, 0.5)",
              lineHeight: 1.7,
              maxWidth: 440,
              marginBottom: 48,
            }}
          >
            Era designs, installs, and operates the growth system for B2B
            companies. Signal-based pipeline, buying committee engagement, and
            expansion: built and run for you.
          </p>

          {/* Divider */}
          <div
            style={{
              width: 32,
              height: 1,
              background: "#C4522A",
              marginBottom: 48,
            }}
          />

          {/* CTA row */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a
              href="#the-system"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(245, 240, 232, 0.9)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                textDecorationColor: "rgba(245, 240, 232, 0.25)",
              }}
            >
              See the system
            </a>
            <a
              href="/#contact"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(245, 240, 232, 0.35)",
                textDecoration: "none",
              }}
            >
              Talk to us
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN — Value card */}
        <div
          className="hero-card"
          style={{
            width: 380,
            borderTop: "2px solid #C4522A",
            background: "rgba(245, 240, 232, 0.03)",
            borderLeft: "1px solid rgba(245, 240, 232, 0.08)",
            borderRight: "1px solid rgba(245, 240, 232, 0.08)",
            borderBottom: "1px solid rgba(245, 240, 232, 0.08)",
            padding: "32px 36px",
          }}
        >
          {/* Card label */}
          <p
            style={{
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#C4522A",
              marginBottom: 24,
            }}
          >
            Complete Revenue Systems
          </p>

          {/* List */}
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {[
              "The right tools, already integrated",
              "Operators who\u2019ve done this before",
              "A system that runs without you",
            ].map((item, i, arr) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(245, 240, 232, 0.85)",
                  paddingTop: i === 0 ? 0 : 12,
                  paddingBottom: i === arr.length - 1 ? 0 : 12,
                  borderBottom:
                    i === arr.length - 1
                      ? "none"
                      : "1px solid rgba(245, 240, 232, 0.07)",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 300,
                    color: "#C4522A",
                    width: 16,
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile overrides */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 0 24px 64px !important;
            min-height: 100vh;
            justify-content: center;
          }
          .hero-grid h1 {
            font-size: clamp(40px, 8vw, 56px) !important;
          }
          .hero-card {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
