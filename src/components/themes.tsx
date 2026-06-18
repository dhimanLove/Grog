import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
const themes = [
  {
    name: "Blood Moon",
    bg: "#0A0A0A",
    canvas: "#141414",
    accent: "#FF3B30",
    text: "#FFFFFF",
    muted: "#6B6B6B",
    input: "#1E1E1E",
  },

  {
    name: "Royal Gold",
    bg: "#0D0D0D",
    canvas: "#171717",
    accent: "#F5C451",
    text: "#FFF8E6",
    muted: "#8B7A52",
    input: "#202020",
  },

  {
    name: "Electric Blue",
    bg: "#050B14",
    canvas: "#0B1524",
    accent: "#00A6FF",
    text: "#F5FAFF",
    muted: "#6C8BA8",
    input: "#122033",
  },

  {
    name: "Neon Lime",
    bg: "#080A08",
    canvas: "#121512",
    accent: "#B8FF2C",
    text: "#F8FFF0",
    muted: "#75805A",
    input: "#1A1F1A",
  },

  {
    name: "Crimson",
    bg: "#120608",
    canvas: "#1A0D10",
    accent: "#FF1744",
    text: "#FFF2F4",
    muted: "#9B6A72",
    input: "#261317",
  },

  {
    name: "Deep Purple",
    bg: "#0E0818",
    canvas: "#161024",
    accent: "#9D4EDD",
    text: "#F8F2FF",
    muted: "#8B78A6",
    input: "#1F1730",
  },

  {
    name: "Arctic",
    bg: "#F8FBFF",
    canvas: "#FFFFFF",
    accent: "#007AFF",
    text: "#0F172A",
    muted: "#94A3B8",
    input: "#F1F5F9",
  },

  {
    name: "Cream Paper",
    bg: "#FDF6E3",
    canvas: "#FFFDF7",
    accent: "#D97706",
    text: "#2C241B",
    muted: "#A08B73",
    input: "#FAF3E6",
  },

  {
    name: "Matrix",
    bg: "#050805",
    canvas: "#0B120B",
    accent: "#00FF66",
    text: "#E8FFE8",
    muted: "#4F7A5C",
    input: "#101810",
  },

  {
    name: "Ferrari",
    bg: "#0B0B0B",
    canvas: "#151515",
    accent: "#FF2800",
    text: "#FFFFFF",
    muted: "#777777",
    input: "#1E1E1E",
  },
]
interface Theme {
  name: string
  bg: string
  canvas: string
  accent: string
  text: string
  muted: string
  input: string
}

function AppPreview({ theme }: { theme: Theme }) {
  return (
    <motion.div
      layout
      className="relative w-full max-w-[280px] sm:max-w-[300px] mx-auto aspect-[9/19] overflow-hidden"
      style={{
        backgroundColor: theme.canvas,
        borderRadius: "2.25rem",
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-8 pb-4">
        <span
          className="text-xl"
          style={{ fontFamily: "Caveat, cursive", color: theme.text }}
        >
          grog.
        </span>
        <div className="flex items-center gap-3">
          {/* Circle icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.muted} strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
          </svg>
          {/* Hand pointer icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </svg>
          {/* Trash icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </div>
      </div>

      {/* Canvas area - handwritten squiggles */}
      <div className="flex-1 px-8 py-16 flex flex-col justify-center items-center">
        <svg viewBox="0 0 160 80" className="w-full h-auto max-h-[120px]">
          {/* Top squiggle */}
          <motion.path
            d="M 20 25 C 30 10, 40 40, 50 25 C 60 10, 70 35, 80 20 C 90 5, 100 30, 110 20"
            stroke={theme.text}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          {/* Bottom squiggle */}
          <motion.path
            d="M 25 55 C 35 45, 45 65, 55 50 C 65 35, 75 60, 85 48 C 95 36, 105 58, 115 48"
            stroke={theme.text}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ backgroundColor: theme.muted }} />

      {/* Input field */}
      <div className="px-5 py-3">
        <div className="flex items-center gap-1">
          <span
            className="text-xl"
            style={{ fontFamily: "Caveat, cursive", color: theme.text }}
          >
            love
          </span>
          <motion.div
            className="w-0.5 h-5"
            style={{ backgroundColor: theme.text }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-5 pb-8 flex items-center justify-between">
        <span
          className="text-base"
          style={{ fontFamily: "Caveat, cursive", color: theme.muted }}
        >
          18.6
        </span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            <span
              className="text-base"
              style={{ fontFamily: "Caveat, cursive", color: theme.muted }}
            >
              share
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span
              className="text-base font-medium"
              style={{ fontFamily: "Caveat, cursive", color: theme.accent }}
            >
              save
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Themes() {
  const [activeTheme, setActiveTheme] = useState<Theme>(themes[0])

  return (
    <section id="themes" className="relative py-24 sm:py-32 overflow-hidden" style={{ backgroundColor: "#000000" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/40 mb-4 sm:mb-6">
            Themes
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 leading-[0.9]"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 400 }}
          >
            One space.
            <br />
            <span className="text-white/35">Many moods.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/35 max-w-sm mx-auto" style={{ fontFamily: "Caveat, cursive", fontWeight: 400 }}>
            Tap a mood. Watch Grog transform.
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* App Preview - Centered on mobile, left on desktop */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTheme.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <AppPreview theme={activeTheme} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Theme Selector */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3 max-w-md mx-auto lg:max-w-none">
              {themes.map((theme) => {
                const isActive = activeTheme.name === theme.name
                return (
                  <motion.button
                    key={theme.name}
                    onClick={() => setActiveTheme(theme)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300"
                    style={{
                      borderColor: isActive ? theme.accent : "rgba(255,255,255,0.06)",
                      backgroundColor: isActive ? theme.bg : "rgba(255,255,255,0.02)",
                    }}
                  >
                    {/* Color dot */}
                    <div
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0 border-2 transition-all duration-300"
                      style={{
                        backgroundColor: theme.canvas,
                        borderColor: isActive ? theme.accent : "rgba(255,255,255,0.1)",
                      }}
                    />

                    {/* Name */}
                    <span
                      className="text-base sm:text-lg leading-none truncate"
                      style={{
                        fontFamily: "Caveat, cursive",
                        color: isActive ? theme.text : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {theme.name}
                    </span>

                    {/* Active checkmark */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="ml-auto"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}