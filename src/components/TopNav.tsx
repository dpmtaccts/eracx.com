import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePostHog } from "@posthog/react";

const LOOP_SECTIONS = [
  { id: "loop-connection", color: "#C8A96E" },
  { id: "loop-trust", color: "#2BBFAA" },
  { id: "loop-loyalty", color: "#D4367A" },
];

// IDs of sections with light (cream) backgrounds
const LIGHT_SECTIONS = ["why-era", "the-system", "loop-trust", "gtm-hero"];

// Routes that have a white/light background by default
const LIGHT_ROUTES = ["/linkedin"];

export default function TopNav() {
  const posthog = usePostHog();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [overLight, setOverLight] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashClick = useCallback((e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${hash}`);
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const navBottom = 80;
      let currentSection: string | null = null;
      let currentColor: string | null = null;
      let isOverLight = false;

      // Check loop sections for color
      for (const loop of LOOP_SECTIONS) {
        const el = document.getElementById(loop.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < navBottom && rect.bottom > 0) {
            currentColor = loop.color;
            break;
          }
        }
      }

      // Check all anchored sections for active nav link
      const sections = ["why-era", "the-system", "how-it-works"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < navBottom + 100 && rect.bottom > navBottom) {
            currentSection = id;
          }
        }
      }

      // Loop detail sections map to "the-system"
      for (const loop of LOOP_SECTIONS) {
        const el = document.getElementById(loop.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < navBottom + 100 && rect.bottom > navBottom) {
            currentSection = "the-system";
          }
        }
      }

      // Detect if nav is over a light section
      for (const id of LIGHT_SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < navBottom && rect.bottom > 0) {
            isOverLight = true;
            break;
          }
        }
      }

      // Route-based active states
      if (location.pathname === "/our-story") currentSection = "our-story";
      if (location.pathname === "/gtm-design") currentSection = "gtm-design";
      // Light-background routes default to overLight
      if (LIGHT_ROUTES.includes(location.pathname)) {
        isOverLight = true;
      }

      setActiveSection(currentSection);
      setActiveColor(currentColor);
      setOverLight(isOverLight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  const navLinks: { label: string; href: string; id: string; hash?: string }[] = [
    { label: "Why Era", href: isHome ? "#why-era" : "/#why-era", id: "why-era", hash: "why-era" },
    { label: "The System", href: isHome ? "#the-system" : "/#the-system", id: "the-system", hash: "the-system" },
    { label: "GTM Design", href: "/gtm-design", id: "gtm-design" },
    { label: "How It Works", href: isHome ? "#how-it-works" : "/#how-it-works", id: "how-it-works", hash: "how-it-works" },
    { label: "Our Story", href: "/our-story", id: "our-story" },
  ];

  const isLinkedIn = location.pathname === "/linkedin";

  const logoFilter = overLight
    ? "brightness(0)"
    : "brightness(0) invert(1) sepia(1) saturate(0.1) brightness(0.93)";

  const textColor = overLight ? (isLinkedIn ? "#1D1D1B" : "#111111") : "#F5F0E8";
  const textMuted = overLight ? (isLinkedIn ? "#888888" : "rgba(17,17,17,0.5)") : "rgba(245,240,232,0.5)";
  const hamburgerBg = overLight ? "bg-[#111111]" : "bg-[#F5F0E8]";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? overLight
            ? isLinkedIn
              ? "bg-white/90 backdrop-blur-sm"
              : "bg-[#F5F0E8]/90"
            : "bg-[#111111]/90"
          : "bg-transparent"
      }`}
      style={scrolled && isLinkedIn ? { borderBottom: "1px solid #F0F0EE" } : undefined}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="/" className="flex-shrink-0">
          <img
            ref={logoRef}
            src="/assets/era_final.png"
            alt="Era"
            className="mt-1 h-5 w-auto transition-[filter] duration-500"
            style={{ filter: logoFilter }}
          />
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={link.hash && !isHome ? (e) => handleHashClick(e, link.hash!) : undefined}
              className="relative pb-1 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300"
              style={{
                color: activeSection === link.id
                  ? (activeColor || textColor)
                  : textMuted,
              }}
            >
              {link.label}
              {activeSection === link.id && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] transition-colors duration-300"
                  style={{ backgroundColor: activeColor || textColor }}
                />
              )}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { handleHashClick(e, "contact"); posthog?.capture('nav_contact_clicked', { source: 'desktop_nav' }); }}
            className="text-[11px] uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: textMuted }}
          >
            Contact
          </a>
        </div>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-5 ${hamburgerBg} transition-all duration-300 ${
              mobileOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 ${hamburgerBg} transition-all duration-300 ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-px w-5 ${hamburgerBg} transition-all duration-300 ${
              mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          mobileOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-6 bg-[#111111] px-6 pb-8 pt-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] text-[#F5F0E8]/50 transition-colors hover:text-[#F5F0E8]"
              onClick={(e) => {
                if (link.hash && !isHome) handleHashClick(e, link.hash);
                setMobileOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { handleHashClick(e, "contact"); setMobileOpen(false); posthog?.capture('nav_contact_clicked', { source: 'mobile_nav' }); }}
            className="text-[11px] uppercase tracking-[0.2em] text-[#F5F0E8]/50 transition-colors hover:text-[#F5F0E8]"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
