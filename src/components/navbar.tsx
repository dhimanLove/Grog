import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { useLenis } from "lenis/react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>("#home");

  const lenis = useLenis();

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "How it works", href: "#story" },
    { label: "Themes", href: "#themes" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Dynamic Active Section Detection
      const sections = ["home", "story", "themes", "download"];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(href, {
        offset: -80,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.3 },
        staggerChildren: 0.08,
        delayChildren: 0.05,
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.2 },
        staggerChildren: 0.04,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
    exit: { opacity: 0, y: -10, filter: "blur(2px)", transition: { duration: 0.2 } }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`pointer-events-auto flex flex-col overflow-hidden transition-all duration-500 w-full md:w-auto md:min-w-[520px] lg:min-w-[640px] border ${mobileMenuOpen ? "rounded-[2rem]" : "rounded-full"
          } ${isScrolled || mobileMenuOpen
            ? "bg-black/[0.45] border-white/[0.08] backdrop-blur-[24px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] scale-[0.99]"
            : "bg-black/[0.25] border-white/[0.05] backdrop-blur-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.04)]"
          }`}
      >
        <div className="flex items-center justify-between px-5 py-3 w-full gap-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex-shrink-0 hover:opacity-85 transition-opacity"
          >
            <img
              src="public/assets/grog.png"
              alt="Grog Logo"
              className="h-12 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href;
              const isHovered = hoveredIdx === index;

              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative px-4 py-1.5 text-[17px] font-medium transition-colors duration-300 select-none ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  style={{ fontFamily: 'Caveat, cursive' }}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-x-3 bottom-0 h-[2px] bg-foreground rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Hover liquid highlight background */}
                  {isHovered && (
                    <motion.span
                      layoutId="hoverHighlight"
                      className="absolute inset-0 rounded-full bg-white/[0.04] border border-white/[0.05] shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      style={{ originY: 0.5 }}
                    />
                  )}

                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Desktop Download Button */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#download");
              }}
              className="group relative inline-flex items-center justify-center px-5 py-2 rounded-full overflow-hidden text-[15px] font-medium text-foreground transition-all duration-300 border border-white/10 hover:border-white/20 bg-white/[0.05] hover:bg-white/[0.1] active:scale-[0.96] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)]"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-1.5 font-semibold">
                Download
              </span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center ml-auto">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground/80 hover:text-foreground rounded-full hover:bg-white/5 transition-colors focus:outline-none relative w-10 h-10 flex items-center justify-center pointer-events-auto"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="md:hidden border-t border-white/[0.08]"
            >
              <div className="flex flex-col px-5 py-4 space-y-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href;
                  return (
                    <motion.a
                      key={index}
                      variants={itemVariants}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className={`flex items-center gap-3 text-2xl font-medium rounded-xl px-4 py-3 transition-all duration-300 ${isActive
                        ? "text-foreground bg-white/[0.06] border border-white/[0.05] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                        : "text-foreground/80 hover:text-foreground hover:bg-white/[0.02]"
                        }`}
                      style={{ fontFamily: 'Caveat, cursive' }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mobileActiveIndicator"
                          className="w-1.5 h-1.5 rounded-full bg-foreground"
                        />
                      )}
                      {item.label}
                    </motion.a>
                  );
                })}
                <div className="pt-3 mt-1 border-t border-white/[0.08]">
                  <motion.a
                    variants={itemVariants}
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#download");
                    }}
                    className="flex items-center justify-center w-full px-4 py-3.5 rounded-xl bg-foreground text-background font-semibold shadow-lg active:scale-[0.98] transition-transform hover:opacity-90"
                  >
                    <Download size={18} className="mr-2" />
                    Download Grog
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}