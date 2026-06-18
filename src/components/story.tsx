import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Lottie from "lottie-react"

import brownBear from "../assets/lottie/Brown Bear.json"
import catTyping from "../assets/lottie/Cat typing.json"
import catMove from "../assets/lottie/Cat Movement.json"
import bearDance from "../assets/lottie/Cute bear dancing.json"
import danceCat from "../assets/lottie/Dance cat.json"

const steps = [
  { label: "01", headline: "Idea start small.", sub: "Like spark in dark.", body: "Fragment. Half-thought. Grog ready before idea form.", lottie: brownBear },
  { label: "02", headline: "Word become picture.", sub: "Finger draw what mind see.", body: "Pencil to glass. Everything same canvas.", lottie: catTyping },
  { label: "03", headline: "Picture become map.", sub: "See how thing connect.", body: "Connect dot. See structure rise from mess.", lottie: catMove },
  { label: "04", headline: "Map become path.", sub: "Know where go next.", body: "Mark done. Move forward. One place.", lottie: bearDance },
  { label: "05", headline: "Path become thing.", sub: "You build it.", body: "Space that think way you do. You make thing.", lottie: danceCat },
]
function LottieStage({ animationData }: { animationData: any }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%", maxWidth: "340px", maxHeight: "340px" }}
      />
    </div>
  )
}

function InteractiveCard({ lottieSrc, scrollYProgress, i, total }: {
  lottieSrc: any
  scrollYProgress: any
  i: number
  total: number
}) {
  const start = i / total
  const end = (i + 1) / total
  const scale = useTransform(
    scrollYProgress,
    [start - 0.05, start, end - 0.05, end],
    [0, 1, 1, 0]
  )

  return (
    <motion.div style={{ opacity: scale, position: "absolute", inset: 0 }}>
      <div /* ... keep your mouse handlers ... */ >
        <div className="relative w-full h-full rounded-[2rem] overflow-visible">

          {/* Change src={lottieSrc} to animationData={lottieSrc} */}
          <LottieStage animationData={lottieSrc} />

          <motion.div /* ... keep glow effect ... */ />
        </div>
      </div>
    </motion.div>
  )
}

export function Story() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section id="story" ref={ref} className="relative" style={{ height: `${steps.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center bg-background overflow-hidden">
        {/* Grid Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <div className="relative h-[400px] sm:h-[450px] lg:h-[500px]">
              {steps.map((step, i) => {
                const start = i / steps.length
                const end = (i + 1) / steps.length
                const opacity = useTransform(smooth, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0])
                const y = useTransform(smooth, [start, start + 0.08, end - 0.08, end], [50, 0, 0, -50])

                return (
                  <motion.div
                    key={i}
                    style={{ opacity, y }}
                    className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6"
                  >
                    <span className="text-xs sm:text-sm font-mono text-foreground/40 mb-4 sm:mb-6 tracking-[0.3em] uppercase">
                      Step {step.label}
                    </span>

                    <h2
                      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-3 sm:mb-4 leading-[0.9]"
                      style={{ fontFamily: 'Caveat, cursive', fontWeight: 400 }}
                    >
                      {step.headline}
                    </h2>

                    <p
                      className="text-lg sm:text-xl lg:text-2xl text-foreground/70 mb-4 sm:mb-6"
                      style={{ fontFamily: 'Caveat, cursive', fontWeight: 400 }}
                    >
                      {step.sub}
                    </p>

                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/70 max-w-md leading-relaxed" style={{ fontFamily: 'Caveat, cursive', fontWeight: 400, lineHeight: '1.5' }}>
                      {step.body}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            {/* Right - Lottie Cards */}
            <div className="relative h-[300px] sm:h-[350px] lg:h-[400px]">
              {steps.map((step, i) => (
                <InteractiveCard
                  key={i}
                  lottieSrc={step.lottie}
                  scrollYProgress={smooth}
                  i={i}
                  total={steps.length}
                />
              ))}
            </div>
          </div>

          {/* Progress Bars */}
          <div className="mt-8 lg:mt-12 px-4 sm:px-6">
            <div className="flex items-center gap-3 sm:gap-4">
              {steps.map((_, i) => {
                const start = i / steps.length
                const end = (i + 1) / steps.length
                const progress = useTransform(
                  smooth,
                  [start, start + 0.06, end - 0.06, end],
                  [0, 1, 1, 0]
                )

                return (
                  <div key={i} className="flex-1 h-1 sm:h-1.5 bg-foreground/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-foreground/60 to-foreground rounded-full"
                      style={{ width: useTransform(progress, (v) => `${v * 100}%`) }}
                    />
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between mt-3 sm:mt-4 text-[10px] sm:text-xs font-mono text-foreground/30">
              <span>START</span>
              <span>FINISH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}