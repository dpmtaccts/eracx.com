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
          gridTemplateColumns: "95fr 5fr",
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
            We design, install, and operate signal-based, automated growth systems for B2B companies.
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

      
      </div>
    </section>
  );
}
