import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LOOP_SECTIONS = [
  { id: "loop-connection", color: "#C8A96E" },
  { id: "loop-trust", color: "#2BBFAA" },
  { id: "loop-loyalty", color: "#D4367A" },
];

// IDs of sections with light (cream) backgrounds
const LIGHT_SECTIONS = ["why-era", "the-system", "loop-trust"];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [overLight, setOverLight] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleContactClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#contact");
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

      setActiveSection(currentSection);
      setActiveColor(currentColor);
      setOverLight(isOverLight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  const navLinks = [
    { label: "Why Era", href: isHome ? "#why-era" : "/#why-era", id: "why-era" },
    { label: "The System", href: isHome ? "#the-system" : "/#the-system", id: "the-system" },
    { label: "How It Works", href: isHome ? "#how-it-works" : "/#how-it-works", id: "how-it-works" },
  ];

  const logoFilter = overLight
    ? "brightness(0)"
    : "brightness(0) invert(1) sepia(1) saturate(0.1) brightness(0.93)";

  const textColor = overLight ? "#111111" : "#F5F0E8";
  const textMuted = overLight ? "rgba(17,17,17,0.5)" : "rgba(245,240,232,0.5)";
  const hamburgerBg = overLight ? "bg-[#111111]" : "bg-[#F5F0E8]";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? overLight
            ? "bg-[#F5F0E8]/90"
            : "bg-[#111111]/90"
          : "bg-transparent"
      }`}
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
            href="/our-story"
            className="text-[11px] uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: textMuted }}
          >
            Our Story
          </a>
          <a
            href="#contact"
            onClick={handleContactClick}
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
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/our-story"
            className="text-[11px] uppercase tracking-[0.2em] text-[#F5F0E8]/50 transition-colors hover:text-[#F5F0E8]"
            onClick={() => setMobileOpen(false)}
          >
            Our Story
          </a>
          <a
            href="#contact"
            onClick={(e) => { handleContactClick(e); setMobileOpen(false); }}
            className="text-[11px] uppercase tracking-[0.2em] text-[#F5F0E8]/50 transition-colors hover:text-[#F5F0E8]"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
