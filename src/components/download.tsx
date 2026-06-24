import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { OriginButton } from "./origin-button";
import type { User } from "@supabase/supabase-js"
import {
  Envelope,
  Lock,
  UserIcon,
  SignOut,
  CheckCircle,
  ArrowRight,
  DownloadIcon,
} from "@phosphor-icons/react"

const APK_URL = "https://github.com/dhimanLove/Grog/releases/download/v1.0.0/app-release.apk"

// Regex patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MIN_LENGTH = 6
const NAME_MIN_LENGTH = 2

type AuthError = {
  field?: "email" | "password" | "name" | "general"
  message: string
}

function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email is required"
  if (!EMAIL_REGEX.test(email)) return "Enter a valid email (e.g. you@example.com)"
  if (email.length > 254) return "Email is too long"
  return null
}

function validatePassword(password: string): string | null {
  if (!password) return "Password is required"
  if (password.length < PASSWORD_MIN_LENGTH) return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
  if (password.length > 128) return "Password is too long"
  return null
}

function validateName(name: string): string | null {
  if (!name.trim()) return "Name is required"
  if (name.trim().length < NAME_MIN_LENGTH) return "Name is too short"
  if (name.length > 50) return "Name is too long"
  return null
}

export function Download() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<AuthError | null>(null)
  const [success, setSuccess] = useState("")
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [downloadStarted, setDownloadStarted] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setCheckingAuth(false)
      return
    }

    supabase?.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setCheckingAuth(false)
    })
    const listener = supabase?.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener?.data?.subscription.unsubscribe()
  }, [])

  function clearErrors() {
    setError(null)
    setSuccess("")
  }

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault()
    clearErrors()

    // Validate
    const emailErr = validateEmail(email)
    if (emailErr) {
      setError({ field: "email", message: emailErr })
      return
    }

    const passwordErr = validatePassword(password)
    if (passwordErr) {
      setError({ field: "password", message: passwordErr })
      return
    }

    if (authMode === "signup") {
      const nameErr = validateName(name)
      if (nameErr) {
        setError({ field: "name", message: nameErr })
        return
      }
    }

    if (!isSupabaseConfigured) {
      setError({ field: "general", message: "Authentication is unavailable because Supabase is not configured." })
      return
    }

    setLoading(true)
    try {
      if (authMode === "signup") {
        const { error } = await supabase!.auth.signUp({
          email,
          password,
          options: { data: { full_name: name.trim() } },
        })
        if (error) {
          if (error.message.includes("already registered")) {
            setError({ field: "email", message: "This email is already registered. Try signing in." })
          } else if (error.message.includes("weak")) {
            setError({ field: "password", message: "Password is too weak. Use at least 6 characters." })
          } else {
            setError({ field: "general", message: error.message })
          }
        } else {
          setSuccess("Check your email to confirm your account.")
          setPassword("")
        }
      } else {
        const { error } = await supabase!.auth.signInWithPassword({ email, password })
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setError({ field: "general", message: "Invalid email or password." })
          } else if (error.message.includes("Email not confirmed")) {
            setError({ field: "email", message: "Please confirm your email first." })
          } else {
            setError({ field: "general", message: error.message })
          }
        }
      }
    } catch {
      setError({ field: "general", message: "Network error. Please check your connection." })
    } finally {
      setLoading(false)
    }
  }

  async function handleDownload() {
    if (!user) return
    if (!isSupabaseConfigured) {
      setError({ field: "general", message: "Download tracking is unavailable because Supabase is not configured." })
      return
    }

    setDownloadStarted(true)
    try {
      await supabase!.from("downloads").insert({ user_id: user.id })
    } catch {
      // Non-critical — still allow download
    }
    setTimeout(() => {
      window.location.href = APK_URL
    }, 800)
  }

  async function handleSignOut() {
    if (!isSupabaseConfigured) {
      setError({ field: "general", message: "Authentication is unavailable because Supabase is not configured." })
      return
    }

    try {
      await supabase!.auth.signOut()
    } catch {
      setError({ field: "general", message: "Failed to sign out." })
    }
    setDownloadStarted(false)
  }

  function switchAuthMode() {
    setAuthMode(authMode === "signup" ? "login" : "signup")
    clearErrors()
    setPassword("")
  }

  return (
    <section id="download" className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden bg-[#000000]">


      <div className="relative w-full max-w-md mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">v1.0 Early Access</span>
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-2">
            Get <span className="text-5xl font-normal text-white" style={{ fontFamily: "Caveat, regular" }}>Grog</span>
          </h2>
          <p className="text-sm text-white/40" style={{ fontFamily: "Caveat, regular" }}>Sign in to download the APK.</p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-5xl p-8"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          <div className="relative">
            <AnimatePresence mode="wait">
              {checkingAuth ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 gap-4"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-white/10 border-t-white animate-spin" />
                </motion.div>
              ) : user ? (
                <motion.div
                  key="authenticated"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                    <UserIcon
                      weight="bold" className="w-6 h-6 text-white" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-white/40 font-medium uppercase tracking-wider "style={{ fontFamily: "Caveat, regular",fontSize: "12px" }}>Signed in as</p>
                    <p className="text-sm text-white font-large truncate max-w-[250px]"style={{ fontFamily: "Caveat, regular",fontSize: "22px" }}>{user.email}</p>
                  </div>

                  <OriginButton
                    onClick={handleDownload}
                    disabled={downloadStarted}
                    className="w-60 h-12"
                  >
                    {downloadStarted ? (
                      <>
                        <CheckCircle weight="bold" className="w-5 h-5" />
                        Preparing...
                      </>
                    ) : (
                      <>
                        <DownloadIcon weight="bold" className="w-5 h-5" />
                        Download APK
                      </>
                    )}
                  </OriginButton>

                  <OriginButton
                    onClick={handleSignOut}
                    className="h-10 px-4 text-sm"
                  >
                    <SignOut weight="regular" className="w-4 h-4" />
                    Sign Out
                  </OriginButton>
                </motion.div>
              ) : (
                <motion.div
                  key="unauthenticated"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {/* Form */}
                  <form onSubmit={handleEmailAuth} className="space-y-3" noValidate>
                    <AnimatePresence>
                      {authMode === "signup" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                          animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative">
                            <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <input
                              type="text"
                              placeholder="Full name"
                              value={name}
                              onChange={(e) => { setName(e.target.value); if (error?.field === "name") setError(null) }}
                              className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-white/5 text-white text-sm placeholder:text-white/30 outline-none transition-all ${error?.field === "name" ? "border-red-500/50 focus:border-red-500/70" : "border-white/10 focus:border-white/20"
                                } focus:bg-white/[0.07]`}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="relative">
                      <Envelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (error?.field === "email") setError(null) }}
                        required
                        className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-white/5 text-white text-sm placeholder:text-white/30 outline-none transition-all ${error?.field === "email" ? "border-red-500/50 focus:border-red-500/70" : "border-white/10 focus:border-white/20"
                          } focus:bg-white/[0.07]`}
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); if (error?.field === "password") setError(null) }}
                        required
                        minLength={PASSWORD_MIN_LENGTH}
                        className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-white/5 text-white text-sm placeholder:text-white/30 outline-none transition-all ${error?.field === "password" ? "border-red-500/50 focus:border-red-500/70" : "border-white/10 focus:border-white/20"
                          } focus:bg-white/[0.07]`}
                      />
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                        >
                          {error.message}
                        </motion.p>
                      )}
                      {success && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2"
                        >
                          {success}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full h-11 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-colors disabled:opacity-50 mt-2"
                      style={{ fontFamily: "Caveat, regular", fontSize: "18px" }}
                    >
                      {loading ? (
                        <div className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                      ) : (
                        <>
                          {authMode === "signup" ? "Create Account" : "Sign In"}
                          <ArrowRight weight="bold" className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  <div className="text-center pt-2">
                    <p className="text-md text-white/30">
                      {authMode === "signup" ? "Already have an account?" : "Need an account?"}{" "}
                      <OriginButton
                        onClick={switchAuthMode}
                        className="text-white/50 hover:text-black font-xs transition-colors ml-2"
                      >
                        {authMode === "signup" ? "Sign in" : "Sign up"}
                      </OriginButton>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-[15px] text-white/30 mt-8 tracking-wide font-mono"
        >
          Free forever • No ads • Works offline
        </motion.p>
      </div>
    </section>
  )
}