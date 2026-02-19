import { useState, useEffect } from "react";

declare global {
  interface Window {
    reb2b?: { loaded: boolean };
  }
}

function loadReb2b() {
  if (window.reb2b) return;
  window.reb2b = { loaded: true };
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/9NMMZHRWK0NW/9NMMZHRWK0NW.js.gz";
  document.getElementsByTagName("script")[0]?.parentNode?.insertBefore(
    s,
    document.getElementsByTagName("script")[0]
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      loadReb2b();
    } else if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    loadReb2b();
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        backgroundColor: "#1A1A1A",
        borderTop: "1px solid rgba(245,240,232,0.1)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <p
        style={{
          color: "rgba(245,240,232,0.6)",
          fontSize: 13,
          margin: 0,
        }}
      >
        This site uses cookies to improve your experience.
      </p>
      <button
        onClick={accept}
        style={{
          backgroundColor: "#C4522A",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "8px 20px",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          letterSpacing: "0.04em",
        }}
      >
        Accept All
      </button>
    </div>
  );
}
