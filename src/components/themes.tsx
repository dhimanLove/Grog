import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const themes = [
  {
    name: "Blood Moon",
    bg: "#070708",
    canvas: "#111113",
    accent: "#FF453A",
    text: "#FFFFFF",
    muted: "#545456",
    input: "#1C1C1E",
  },
  {
    name: "Royal Gold",
    bg: "#0A0905",
    canvas: "#14130E",
    accent: "#D4AF37",
    text: "#FBF7ED",
    muted: "#6E6652",
    input: "#1E1C16",
  },
  {
    name: "Electric Blue",
    bg: "#030812",
    canvas: "#0A1120",
    accent: "#2F80ED",
    text: "#E0ECFC",
    muted: "#566B85",
    input: "#131D31",
  },
  {
    name: "Neon Lime",
    bg: "#050705",
    canvas: "#0F130F",
    accent: "#A3E635",
    text: "#F4FCE3",
    muted: "#525E42",
    input: "#171E17",
  },
  {
    name: "Crimson",
    bg: "#0C0406",
    canvas: "#180C0F",
    accent: "#E63946",
    text: "#FDF0F2",
    muted: "#7A5057",
    input: "#241418",
  },
  {
    name: "Deep Purple",
    bg: "#06030B",
    canvas: "#120B20",
    accent: "#9B5DE5",
    text: "#F5EEFD",
    muted: "#665280",
    input: "#1B122C",
  },
  {
    name: "Arctic",
    bg: "#F4F7FA",
    canvas: "#FFFFFF",
    accent: "#007AFF",
    text: "#1C1C1E",
    muted: "#8E8E93",
    input: "#F2F2F7",
  },
  {
    name: "Cream Paper",
    bg: "#FAF6EE",
    canvas: "#FCF9F2",
    accent: "#C67A26",
    text: "#332B24",
    muted: "#948777",
    input: "#F5EDE0",
  },
  {
    name: "Matrix",
    bg: "#020402",
    canvas: "#081008",
    accent: "#00FF66",
    text: "#E5FFE5",
    muted: "#3B6645",
    input: "#0E1C0E",
  },
  {
    name: "Ferrari",
    bg: "#050505",
    canvas: "#121212",
    accent: "#E00000",
    text: "#FFFFFF",
    muted: "#555555",
    input: "#1A1A1A",
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
      className="relative w-full max-w-[290px] sm:max-w-[310px] mx-auto aspect-[9/19] overflow-hidden flex flex-col justify-between transition-shadow duration-500"
      style={{
        backgroundColor: theme.canvas,
        borderRadius: "2.75rem",
        boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px -10px ${theme.accent}20`,
        border: `1px solid ${theme.muted}15`
      }}
    >
      {/* Top bar (approx 10% height) */}
      <div className="flex items-center justify-between px-6 pt-8 pb-2">
        <span
          className="text-2xl font-bold tracking-tight select-none"
          style={{ fontFamily: "Caveat, cursive", color: theme.text }}
        >
          grog.
        </span>
        <div className="flex items-center gap-3.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.muted} strokeWidth="1.75" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.text} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.muted} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </div>
      </div>

      {/* Canvas area (approx 75% total vertical height) */}
      <div className="flex-1 w-full px-6 flex flex-col justify-center items-center overflow-hidden">
        <svg viewBox="0 0 160 280" className="w-full h-full opacity-95">
          {/* Decorative Background Grid/Dots for app feel */}
          <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill={theme.muted} opacity="0.15" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />

          {/* Random Abstract Fig 1: Continuous fluid loop */}
          <motion.path
            d="M 30 60 C 70 30, 130 40, 120 90 C 110 130, 20 80, 40 140 C 60 190, 140 150, 110 210"
            stroke={theme.text}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* Random Abstract Fig 2: Rough hand-drawn geometric accent */}
          <motion.path
            d="M 110 70 L 135 95 L 105 110 Z"
            stroke={theme.accent}
            strokeWidth="2"
            fill={`${theme.accent}08`}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "linear" }}
          />

          {/* Random Abstract Fig 3: Star/sparkle burst element */}
          <motion.path
            d="M 35 210 L 35 224 M 28 217 L 42 217"
            stroke={theme.accent}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            style={{ transformOrigin: "35px 217px" }}
          />
        </svg>
      </div>

      {/* Divider */}
      <div className="h-px w-full opacity-10" style={{ backgroundColor: theme.muted }} />

      {/* Bottom utility & input section (approx 15% height) */}
      <div className="flex flex-col justify-end">
        {/* Input field */}
        <div className="px-6 py-2">
          <div className="flex items-center gap-1.5">
            <span
              className="text-xl"
              style={{ fontFamily: "Caveat, cursive", color: theme.text }}
            >
              love
            </span>
            <motion.div
              className="w-0.5 h-5 rounded-full"
              style={{ backgroundColor: theme.accent }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Bottom actions bar */}
        <div className="px-6 pb-8 pt-1 flex items-center justify-between select-none">
          <span
            className="text-base"
            style={{ fontFamily: "Caveat, cursive", color: theme.muted }}
          >
            18.6
          </span>
          <div className="flex items-center gap-4.5">
            <div className="flex items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.muted} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
            <div className="flex items-center gap-1.5 cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/40 mb-5">
            Themes
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-[0.9]"
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
        <div className="flex flex-col lg:flex-row items-center justify-center gap-14 lg:gap-20">
          {/* App Preview Container */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTheme.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <AppPreview theme={activeTheme} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Theme Selector */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2.5 sm:gap-3.5 max-w-md mx-auto lg:max-w-none">
              {themes.map((theme) => {
                const isActive = activeTheme.name === theme.name
                return (
                  <motion.button
                    key={theme.name}
                    onClick={() => setActiveTheme(theme)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all duration-300"
                    style={{
                      borderColor: isActive ? theme.accent : "rgba(255,255,255,0.06)",
                      backgroundColor: isActive ? `${theme.bg}B3` : "rgba(255,255,255,0.02)",
                      boxShadow: isActive ? `0 10px 30px -10px ${theme.accent}30` : "none"
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
                      className="text-base sm:text-lg font-medium leading-none truncate"
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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