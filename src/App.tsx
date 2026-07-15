import { ReactLenis } from "lenis/react"
import { motion, useScroll, useSpring } from "framer-motion"
import { AuthProvider } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Story } from "@/components/story"
import { Themes } from "@/components/themes"
import { Download } from "@/components/download"
import { Footer } from "@/components/footer"

function AppContent() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.2, smoothWheel: true }}>
      <div className="bg-background min-h-screen">
        {/* Premium Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-foreground origin-left z-[9999] pointer-events-none"
          style={{ scaleX }}
        />
        <Navbar />
        <Hero />
        <Story />
        <Themes />
        <Download />
        <Footer />
      </div>
    </ReactLenis>
  )
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
