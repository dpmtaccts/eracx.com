const logos = [
  { name: "Clay", src: "/logos/clay.png" },
  { name: "Apollo", src: "/logos/apollo.svg" },
  { name: "Zapier", src: "/logos/zapier.png" },
  { name: "HockeyStack", src: "/logos/hockeystack.png" },
  { name: "RB2B", src: "/logos/rb2b.svg" },
  { name: "Anthropic", src: "/logos/anthropic.svg" },
  { name: "Salesforge", src: "/logos/salesforge.svg" },
  { name: "Cursor", src: "/logos/cursor.svg" },
  { name: "Dripify", src: "/logos/dripify.svg" },
  { name: "HubSpot", src: "/logos/hubspot.png" },
  { name: "Copper", src: "/logos/copper.png" },
];

export default function ToolsLogoBar() {
  return (
    <div
      style={{
        padding: "60px 0",
        borderTop: "1px solid rgba(245,240,232,0.06)",
        borderBottom: "1px solid rgba(245,240,232,0.06)",
      }}
    >
      <p
        style={{
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "rgba(245,240,232,0.4)",
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        Built On
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "24px 40px",
          padding: "0 24px",
        }}
      >
        {logos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="tools-logo"
            style={{
              maxHeight: 24,
              maxWidth: 80,
              width: "auto",
              filter: "brightness(0) invert(1)",
              opacity: 0.35,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.7"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.35"; }}
          />
        ))}
      </div>
    </div>
  );
}
