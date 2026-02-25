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
  { name: "HubSpot", src: "/logos/hubspot.png" },
];

export default function ToolsLogoBar() {
  return (
    <div>
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

      <motion.h3
        style={{
          fontSize: 24,
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
      </motion.h3>

      <motion.div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px 24px",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {logos.map((logo) => (
          <div
            key={logo.name}
            style={{
              height: 17,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={logo.src}
              alt={logo.name}
              style={{
                height: 17,
                width: "auto",
                maxWidth: 85,
                objectFit: "contain",
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
          </div>
        ))}
      </motion.div>
    </div>
  );
}
