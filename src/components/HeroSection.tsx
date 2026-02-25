export default function HeroSection() {
  return (
    <section
      className="relative bg-[#111111]"
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        padding: "0 80px",
      }}
    >
      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, transparent 80%, #F5F0E8 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* Two-column grid inside the flex container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "55fr 45fr",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* LEFT COLUMN */}
        <div>
          <h1
            style={{
              fontSize: "clamp(64px, 8vw, 120px)",
              fontWeight: 800,
              color: "#F5F0E8",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              marginBottom: 32,
            }}
          >
            Relationship systems for growth teams.
          </h1>

          <p
            style={{
              fontSize: 17,
              fontWeight: 400,
              color: "rgba(245, 240, 232, 0.55)",
              lineHeight: 1.7,
              maxWidth: 440,
              marginBottom: 48,
            }}
          >
            The companies that win don't just sell better. They build the system that makes selling repeatable.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a
              href="#the-system"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(245, 240, 232, 0.9)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = ""; }}
            >
              See the system
            </a>
            <a
              href="#contact"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(245, 240, 232, 0.4)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = ""; }}
            >
              Talk to us
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div
          style={{
            paddingLeft: 48,
            borderLeft: "1px solid rgba(245, 240, 232, 0.1)",
          }}
        >
          <p
            style={{
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#C4522A",
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            What We Do
          </p>

          <p
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "rgba(245, 240, 232, 0.9)",
              lineHeight: 1.35,
              marginBottom: 16,
            }}
          >
            We design, install, and operate growth systems for B2B companies.
          </p>

          <p
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "rgba(245, 240, 232, 0.5)",
              lineHeight: 1.65,
            }}
          >
            Signal-based pipeline, buying committee engagement, and expansion: built and run for you.
          </p>
        </div>
      </div>
    </section>
  );
}
