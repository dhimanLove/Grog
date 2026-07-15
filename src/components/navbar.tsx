import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { useLenis } from "lenis/react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "How it works", href: "#story" },
  { label: "Themes", href: "#themes" },
] as const;

const SECTIONS = ["home", "story", "themes", "download"] as const;

const containerVariants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3 },
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.18 },
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(2px)",
    transition: { duration: 0.18 },
  },
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>("#home");
  const ticking = useRef(false);

  const lenis = useLenis();

  // Throttled scroll handler via rAF
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 160;
      for (const section of SECTIONS) {
        const el = document.getElementById(section);
        if (!el) continue;
        const { offsetTop, offsetHeight } = el;
        if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
          setActiveSection(`#${section}`);
          break;
        }
      }
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const scrollToSection = useCallback(
    (href: string) => {
      setMobileMenuOpen(false);
      if (lenis) {
        lenis.scrollTo(href, {
          offset: -80,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const el = document.querySelector(href);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    },
    [lenis]
  );

  const glassBg = isScrolled || mobileMenuOpen
    ? "bg-black/[0.50] border-white/[0.09] backdrop-blur-[28px] shadow-[0_28px_60px_-14px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.09)]"
    : "bg-black/[0.22] border-white/[0.05] backdrop-blur-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.28),inset_0_1px_0_0_rgba(255,255,255,0.04)]";

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.05 }}
        className={[
          "pointer-events-auto flex flex-col overflow-hidden transition-[background,border-color,box-shadow] duration-500",
          "w-full md:w-auto md:min-w-[680px] lg:min-w-[820px] xl:min-w-[920px]",
          "border",
          mobileMenuOpen ? "rounded-[2rem]" : "rounded-full",
          glassBg,
        ].join(" ")}
      >
        {/* ── Main bar ── */}
        <div className="flex items-center justify-between px-6 py-2.5 w-full gap-10">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
            className="flex-shrink-0 hover:opacity-80 transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm outline-none"
            aria-label="Grog – home"
          >
            <img
              src="/assets/grog.png"
              alt="Grog"
              className="h-9 w-auto"
              draggable={false}
            />
          </a>

          {/* Desktop nav links */}
          <nav
            className="hidden md:flex items-center justify-center gap-0.5 flex-1"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.href;
              const isHovered = hoveredIdx === index;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "relative px-5 py-2 rounded-full text-[17px] font-medium select-none outline-none",
                    "transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white/30",
                    isActive ? "text-white" : "text-white/55 hover:text-white/90",
                  ].join(" ")}
                  style={{ fontFamily: "Caveat, cursive" }}
                >
                  {/* Hover pill */}
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="navHoverPill"
                      className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}

                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveLine"
                      className="absolute inset-x-4 -bottom-px h-[1.5px] bg-white/70 rounded-full"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <a
              href="#download"
              onClick={(e) => { e.preventDefault(); scrollToSection("#download"); }}
              className={[
                "group relative inline-flex items-center gap-2 px-5 py-2 rounded-full overflow-hidden",
                "text-[14px] font-semibold tracking-wide text-white/90",
                "border border-white/10 bg-white/[0.07]",
                "hover:bg-white/[0.12] hover:border-white/20 hover:text-white",
                "active:scale-[0.97] transition-all duration-200",
                "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
                "focus-visible:ring-2 focus-visible:ring-white/30 outline-none",
              ].join(" ")}
            >
              <Download size={14} strokeWidth={2.5} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              Download
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden ml-auto">
            <motion.button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors focus-visible:ring-2 focus-visible:ring-white/30 outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              whileTap={{ scale: 0.88 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="md:hidden border-t border-white/[0.07]"
            >
              <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href;
                  return (
                    <motion.a
                      key={item.href}
                      variants={itemVariants}
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "flex items-center gap-3 text-2xl font-medium rounded-2xl px-4 py-3",
                        "transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white/30 outline-none",
                        isActive
                          ? "text-white bg-white/[0.07] border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                          : "text-white/60 hover:text-white hover:bg-white/[0.03]",
                      ].join(" ")}
                      style={{ fontFamily: "Caveat, cursive" }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mobileActiveDot"
                          className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                      {item.label}
                    </motion.a>
                  );
                })}

                <div className="pt-3 mt-1 border-t border-white/[0.07]">
                  <motion.a
                    variants={itemVariants}
                    href="#download"
                    onClick={(e) => { e.preventDefault(); scrollToSection("#download"); }}
                    className="flex items-center justify-center w-full gap-2 px-4 py-3.5 rounded-2xl bg-white text-black font-semibold text-[15px] shadow-lg active:scale-[0.98] hover:bg-white/90 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/30 outline-none"
                  >
                    <Download size={16} strokeWidth={2.5} />
                    Download Grog
                  </motion.a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}