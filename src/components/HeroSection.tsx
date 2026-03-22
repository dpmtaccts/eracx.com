import { useEffect, useRef, useState } from "react";

const COLUMNS = [
  "AI-driven signals and buying intent data",
  "Automated outreach and follow-up sequences",
  "Real-time sales intelligence and alerts",
  "Proven playbooks, already loaded",
  "A team of operators running all of it",
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Force-play the background video on mount
  // Safari requires the muted DOM *property* to be set (React's JSX attribute alone is not enough)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Explicitly set DOM properties Safari needs
    v.muted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      v.play().catch(() => {
        // Autoplay still blocked — attach a one-time interaction listener as last resort
        const start = () => {
          v.muted = true;
          v.play().catch(() => {});
          document.removeEventListener("touchstart", start);
          document.removeEventListener("click", start);
        };
        document.addEventListener("touchstart", start, { once: true });
        document.addEventListener("click", start, { once: true });
      });
    };

    // Try playing immediately; if not ready, wait for loadeddata event
    if (v.readyState >= 2) {
      tryPlay();
    } else {
      v.addEventListener("loadeddata", tryPlay, { once: true });
    }
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#0d0d0d",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Background video ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <source src="/hero-bg-video.mp4" type="video/mp4" />
      </video>

      {/* ── Gradient overlay — fades to solid black at bottom to hide VEO watermark ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(13,13,13,0.8) 0%, rgba(13,13,13,0.83) 20%, rgba(13,13,13,0.87) 50%, rgba(13,13,13,0.93) 72%, rgba(13,13,13,1) 88%)",
        }}
      />

      {/* ── Centred hero content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 0",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(52px, 7.5vw, 108px)",
            fontWeight: 800,
            color: "#F5F0E8",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: "900px",
            margin: "0 0 28px",
          }}
        >
          The system behind your best quarter.
        </h1>

        <p
          style={{
            fontSize: "17px",
            fontWeight: 400,
            color: "rgba(245, 240, 232, 0.4)",
            lineHeight: 1.75,
            maxWidth: "520px",
            margin: "0 0 40px",
          }}
        >
          We bring the data, automation, playbooks, and operators. You get the
          pipeline.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="#system"
            style={{
              background: "#C4522A",
              color: "#F5F0E8",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "16px 36px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            See the system
          </a>
          <a
            href="/#contact"
            style={{
              fontSize: "13px",
              color: "rgba(245, 240, 232, 0.3)",
              textDecoration: "none",
              background: "none",
              fontWeight: 400,
            }}
          >
            Talk to us
          </a>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          borderTop: "1px solid rgba(245, 240, 232, 0.07)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
        }}
      >
        {COLUMNS.map((label, i) => (
          <div
            key={i}
            style={{
              padding: "36px 28px",
              textAlign: "center",
              borderRight:
                i < COLUMNS.length - 1
                  ? "1px solid rgba(245, 240, 232, 0.07)"
                  : "none",
            }}
          >
            <span
              style={{
                display: "block",
                color: "#C4522A",
                fontSize: "28px",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              +
            </span>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "rgba(245, 240, 232, 0.65)",
                lineHeight: 1.6,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
