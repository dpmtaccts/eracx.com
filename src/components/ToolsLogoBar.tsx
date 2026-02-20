import { motion } from "framer-motion";

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
    <section
      style={{
        padding: "100px 24px",
        backgroundColor: "#111111",
        borderTop: "1px solid rgba(245,240,232,0.06)",
        borderBottom: "1px solid rgba(245,240,232,0.06)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.p
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#C4522A",
            textAlign: "center",
            marginBottom: 16,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Built On
        </motion.p>

        <motion.h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#F5F0E8",
            textAlign: "center",
            lineHeight: 1.3,
            marginBottom: 48,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Using the best in AI &amp; Automation
        </motion.h2>

        <motion.div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "28px 48px",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {logos.map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              style={{
                maxHeight: 28,
                maxWidth: 100,
                width: "auto",
                filter: "brightness(0) invert(1)",
                opacity: 0.45,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.45";
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
