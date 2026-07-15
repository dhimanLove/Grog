import { useRef, useState } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { ArrowRight, Download, Sparkle } from "@phosphor-icons/react"
import { OriginButton } from "./origin-button"

const ease = [0.16, 1, 0.3, 1] as const

const mockups = [
    { src: "/assets/grog_green-portrait.png", alt: "Grog drawing interface — freeform sketching canvas", delay: 0.3, x: -300, rotate: -18, parallax: 0.7, glow: "rgba(16,185,129,0.15)", z: 10 },
    { src: "/assets/Screenshot_2026-06-18-18-09-52-21_8a914f91e737d89b585e74d13e25cfcc-portrait.png", alt: "Grog writing interface — distraction-free note taking", delay: 0.5, x: 0, rotate: 0, parallax: 1, glow: "rgba(99,102,241,0.15)", z: 30 },
    { src: "/assets/Screenshot_2026-06-18-18-06-00-24_8a914f91e737d89b585e74d13e25cfcc-portrait.png", alt: "Grog mindmap interface — visual idea connections", delay: 0.7, x: 300, rotate: 18, parallax: 0.5, glow: "rgba(168,85,247,0.15)", z: 20 },
]

function MockupStack() {
    const ref = useRef<HTMLDivElement>(null)
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const smoothX = useSpring(mouseX, { stiffness: 80, damping: 25 })
    const smoothY = useSpring(mouseY, { stiffness: 80, damping: 25 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
        mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
        setHoveredIdx(null)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[700px] lg:max-w-[1000px] h-[360px] sm:h-[420px] lg:h-[520px] flex items-center justify-center"
        >
            {mockups.map((m, idx) => {
                const px = useTransform(smoothX, [-1, 1], [-70 * m.parallax, 70 * m.parallax])
                const py = useTransform(smoothY, [-1, 1], [-50 * m.parallax, 50 * m.parallax])
                const pr = useTransform(smoothX, (v) => m.rotate + v * 12 * m.parallax)

                const isHovered = hoveredIdx === idx
                const isDimmed = hoveredIdx !== null && hoveredIdx !== idx

                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease, delay: m.delay }}
                        className="absolute w-[160px] sm:w-[200px] lg:w-[250px]"
                        onMouseEnter={() => setHoveredIdx(idx)}
                        style={{
                            x: px,
                            y: py,
                            rotate: pr,
                            zIndex: isHovered ? 50 : m.z,
                        }}
                    >
                        {/* Float */}
                        <motion.div
                            animate={{ y: [0, -14 - idx * 3, 0] }}
                            transition={{ duration: 5 + idx * 0.7, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, delay: idx * 0.4 }}
                        >
                            {/* Hover glow */}
                            <motion.div
                                className="absolute -inset-8 rounded-[40px] pointer-events-none"
                                animate={{
                                    opacity: isHovered ? 1 : 0,
                                    scale: isHovered ? 1 : 0.8,
                                }}
                                transition={{ duration: 0.5 }}
                                style={{ background: `radial-gradient(circle, ${m.glow} 0%, transparent 70%)` }}
                            />

                            {/* Image */}
                            <motion.img
                                src={m.src}
                                alt={m.alt}
                                loading="lazy"
                                className="w-full h-auto block rounded-[22px] cursor-pointer select-none"
                                animate={{
                                    scale: isHovered ? 1.12 : isDimmed ? 0.92 : 1,
                                    filter: isDimmed ? "brightness(0.4) saturate(0.3)" : "brightness(1) saturate(1)",
                                }}
                                transition={{ duration: 0.45, ease }}
                                draggable={false}
                            />
                        </motion.div>
                    </motion.div>
                )
            })}
        </motion.div>
    )
}

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen bg-background overflow-hidden">
            {/* === VISIBLE GRID BACKGROUND === */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(255, 255, 255, 0.14) 1.5px, transparent 1.5px)",
                    backgroundSize: "25px 25px",
                    opacity: 0.35,
                }}
            />

            <div className="relative z-10">
                {/* === HERO === */}
                <div className="pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-28">
                    <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* LEFT — Content */}
                            <div className="space-y-6 sm:space-y-8">

                                {/* H1 */}
                                <div className="overflow-show">
                                    <motion.h1
                                        initial={{ y: "110%" }}
                                        animate={{ y: "0%" }}
                                        transition={{ duration: 1, ease, delay: 0.08 }}
                                        className="text-[5rem] sm:text-[7.5rem] lg:text-[10rem] text-foreground leading-[0.85]"
                                        style={{ fontFamily: 'Caveat', fontWeight: 400 }}
                                    >
                                        Grog.
                                    </motion.h1>
                                </div>

                                {/* H2 */}
                                <div className="overflow-show">
                                    <motion.h2
                                        initial={{ y: "110%" }}
                                        animate={{ y: "0%" }}
                                        transition={{ duration: 0.9, ease, delay: 0.18 }}
                                        className="text-xl sm:text-2xl lg:text-5xl text-foreground/75 max-w-lg leading-snug"
                                        style={{ fontFamily: 'Caveat', fontWeight: 400 }}
                                    >
                                        Thy faithful scribe for drawing, writing, and mapping every thought.
                                    </motion.h2>
                                </div>

                                {/* Body */}
                                <motion.p
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease, delay: 0.28 }}
                                    className="text-base sm:text-lg text-muted-foreground/75 leading-relaxed max-w-lg"
                                    style={{ fontFamily: 'Caveat', fontWeight: 400, lineHeight: '1.7' }}
                                >
                                    Capture ideas instantly, create mind maps, organize notes, and think clearly with Grog. Designed for creative thinkers, students, founders, and builders who need a fast, private, offline-first workspace for brainstorming, journaling, knowledge management, and productivity.
                                </motion.p>

                                {/* CTAs */}
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, ease, delay: 0.42 }}
                                    className="flex flex-col sm:flex-row gap-3 pt-2"
                                >
                                    {/* Download Button */}
                                    <OriginButton
                                        onClick={(e) => {
                                            e.preventDefault()
                                            const target = document.getElementById("download")
                                            if (target) {
                                                target.scrollIntoView({ behavior: "smooth", block: "start" })
                                            }
                                        }}
                                        className="group bg-foreground text-background h-12 sm:h-14 px-6 sm:px-8 rounded-2xl border border-transparent"
                                        style={{
                                            fontFamily: "Caveat",
                                            fontWeight: 400,
                                            fontSize: "19px",
                                        }}
                                    >
                                        <Download weight="bold" className="w-5 h-5" />
                                        Summon Grog Free
                                        <ArrowRight
                                            weight="bold"
                                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                                        />
                                    </OriginButton>

                                    {/* Story Button */}
                                    <OriginButton
                                        onClick={(e) => {
                                            e.preventDefault()
                                            const target = document.getElementById("story")
                                            if (target) {
                                                target.scrollIntoView({ behavior: "smooth", block: "start" })
                                            }
                                        }}
                                        className="h-12 sm:h-14 px-6 sm:px-8 rounded-2xl border border-foreground/15 text-foreground/75"
                                        style={{
                                            fontFamily: "Caveat",
                                            fontWeight: 400,
                                            fontSize: "19px"
                                        }}
                                    >
                                        Know Grog better
                                        <Sparkle weight="fill" className="w-4 h-4 text-foreground/40" />
                                    </OriginButton>
                                </motion.div>

                                {/* Trust line */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="text-[11px] sm:text-xs text-muted-foreground/40 font-mono tracking-wide pt-2"
                                >
                                    Free forever · No account · No ads · Offline-first
                                </motion.p>
                            </div>

                            {/* RIGHT — Mockups */}
                            <div className="flex justify-start items-start lg:justify-end overflow-visible">
                                <MockupStack />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}