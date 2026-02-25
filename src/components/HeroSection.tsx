export default function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .hero-headline {
          animation: heroFadeUp 0.6s ease-out both;
        }
        .hero-punchline {
          animation: heroFadeUp 0.6s ease-out 0.4s both;
        }
        .hero-subhead {
          animation: heroFadeIn 0.5s ease-out 0.6s both;
        }
        .hero-cta {
          animation: heroFadeIn 0.5s ease-out 0.8s both;
        }
        .hero-loops {
          animation: heroFadeIn 0.8s ease-out 1.2s both;
        }
        .hero-cta-btn {
          background-color: #C4522A;
          transition: background-color 0.2s ease;
        }
        .hero-cta-btn:hover {
          background-color: #d4623a;
        }
      `}</style>

      <section
        style={{
          minHeight: "100vh",
          backgroundColor: "#111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            width: "100%",
            textAlign: "center",
          }}
        >
          {/* Lines 1–2 */}
          <h1
            className="hero-headline"
            style={{
              fontSize: "clamp(40px, 6vw, 88px)",
              fontWeight: 700,
              color: "#F5F0EB",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Most companies don't have
            <br />
            a sales problem.
          </h1>

          {/* Line 3 — after a pause */}
          <p
            className="hero-punchline"
            style={{
              fontSize: "clamp(40px, 6vw, 88px)",
              fontWeight: 700,
              color: "#C4522A",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              marginTop: 40,
              marginBottom: 0,
            }}
          >
            They have a system problem.
          </p>

          {/* Subhead */}
          <p
            className="hero-subhead"
            style={{
              fontSize: "clamp(16px, 1.4vw, 19px)",
              fontWeight: 400,
              color: "#999999",
              lineHeight: 1.6,
              marginTop: 32,
              marginBottom: 0,
            }}
          >
            ERA builds the growth system that makes selling repeatable.
          </p>

          {/* CTA */}
          <div className="hero-cta" style={{ marginTop: 24 }}>
            <a
              href="#the-system"
              className="hero-cta-btn"
              style={{
                display: "inline-block",
                fontSize: 16,
                fontWeight: 600,
                color: "#FFFFFF",
                padding: "16px 40px",
                borderRadius: 6,
                textDecoration: "none",
                border: "none",
              }}
            >
              See the system
            </a>
          </div>

          {/* Loop words */}
          <p
            className="hero-loops"
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#666666",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginTop: 80,
              marginBottom: 0,
            }}
          >
            Connection&ensp;·&ensp;Trust&ensp;·&ensp;Loyalty
          </p>
        </div>
      </section>
    </>
  );
}
