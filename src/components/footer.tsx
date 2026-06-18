import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import {
  GithubLogo,
  LinkedinLogo,
  XIcon,
  Envelope,
  Code,
  SparkleIcon,
} from "@phosphor-icons/react"

function MagneticIcon({
  href,
  icon,
  label,
  delay = 0,
}: {
  href: string
  icon: React.ReactNode
  label: string
  delay?: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = clientX - (left + width / 2)
    const centerY = clientY - (top + height / 2)
    const distance = Math.sqrt(centerX ** 2 + centerY ** 2)
    const strength = Math.max(0, 1 - distance / 50)
    x.set(centerX * strength * 0.3)
    y.set(centerY * strength * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileTap={{ scale: 0.88 }}
      className="group relative w-10 h-10 rounded-xl border border-foreground/10 bg-foreground/[0.02] flex items-center justify-center text-muted-foreground/50 hover:text-foreground transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/[0.05]"
      title={label}
    >
      <motion.div
        animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 4 }}
        animate={isHovered ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 4 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-foreground text-background text-[10px] font-medium rounded-md whitespace-nowrap pointer-events-none"
      >
        {label}
      </motion.div>
    </motion.a>
  )
}

export function Footer() {

  const socialLinks = [
    { href: "https://github.com/dhimanlove", icon: <GithubLogo weight="regular" size={18} />, label: "GitHub" },
    { href: "https://www.linkedin.com/in/love-raj-dhiman-a08142274/", icon: <LinkedinLogo weight="regular" size={18} />, label: "LinkedIn" },
    { href: "https://x.com/LoveRaj_1", icon: <XIcon weight="regular" size={18} />, label: "X" },
    { href: "mailto:[rajdhiman00143@gmail.com]", icon: <Envelope weight="regular" size={18} />, label: "Email" },
  ]

  return (
    <footer className="relative border-t border-foreground/5 py-16 mt-20">
      <div className="relative max-w-6xl mx-auto px-6"> 
        {/* Top section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12"
        >
          {/* Left - Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-foreground font-caveat">
              Grog.
            </h3>
            <div className="flex flex-col gap-1">
              {["Write.", "Draw.", "Think."].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="text-sm text-muted-foreground/60 font-mono tracking-wide"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Center - Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "Privacy", href: "#", icon: <SparkleIcon weight="regular" size={14} /> },
              { label: "Terms", href: "#", icon: <Code weight="regular" size={14} /> },
              { label: "GitHub", href: "#", icon: <GithubLogo weight="regular" size={14} /> },
            
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors duration-300 relative group inline-flex items-center gap-1.5"
              >
                <span className="text-muted-foreground/30 group-hover:text-foreground/50 transition-colors">
                  {link.icon}
                </span>
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground/30 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>


        </motion.div>

        {/* Creator Card - Clean & Professional */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl border border-foreground/8 bg-foreground/[0.02] p-6 sm:p-7"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0"
                >
                  <img
                    src="/assets/caveman.png"
                    alt="Love Dhiman"
                    className="w-14 h-14 rounded-2xl object-cover border border-foreground/10"
                  />
                </motion.div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-lg font-medium text-foreground">
                      Love Dhiman
                    </h3>
                    <span className="text-[11px] px-2 py-1 rounded-full border border-foreground/10 bg-foreground/[0.03] text-muted-foreground">
                      Founder
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground/70 max-w-lg leading-relaxed">
                    Computer Science student and indie developer building Grog — a
                    simple space for notes, sketches, mind maps, and ideas.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {socialLinks.map((link, i) => (
                  <MagneticIcon
                    key={link.label}
                    href={link.href}
                    icon={link.icon}
                    label={link.label}
                    delay={0.3 + i * 0.05}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>


      </div>
    </footer>
  )
}