import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { GoogleSignIn } from "@/components/google-signin"
import { Lock, CheckCircle, DownloadIcon, SignOut } from "@phosphor-icons/react"
import { toast } from "sonner"

const APK_URL =  "https://github.com/dhimanLove/Grog/releases/latest/download/Grog.apk"

export function Download() {
  const { user, loading, logout } = useAuth()
  const [downloadStarted, setDownloadStarted] = useState(false)

  async function handleDownload() {
    if (!user) {
      toast.error("You must be signed in to download")
      return
    }

    setDownloadStarted(true)
    try {
      console.log(`Download started by ${user.email}`)
      toast.success("Download started!")
      
      setTimeout(() => {
        window.location.href = APK_URL
        setDownloadStarted(false)
      }, 800)
    } catch (error) {
      toast.error("Download failed. Please try again.")
      setDownloadStarted(false)
    }
  }

  async function handleLogout() {
    try {
      await logout()
      toast.success("Signed out successfully!")
    } catch (error) {
      toast.error("Failed to sign out")
    }
  }

  return (
    <section id="download" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black py-24">
      <div className="relative z-10 mx-auto w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/70">
              v1.0 Early Access
            </span>
          </div>
          <h2 className="mb-2 text-4xl font-bold tracking-tight text-white">
            Get <span className="text-5xl font-normal text-white" style={{ fontFamily: "Caveat, cursive" }}>Grog</span>
          </h2>
          <p className="text-white/50" style={{ fontFamily: "Caveat, cursive", fontSize: "20px" }}>
            Sign in to access your download.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-4 py-16"
                >
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-emerald-400" />
                  <p className="text-sm text-white/50">Verifying access...</p>
                </motion.div>
              ) : user ? (
                <motion.div
                  key="authenticated"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center space-y-8 text-center"
                >
                  <div className="w-full space-y-5">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-white/10 bg-white/5">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "Profile"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Lock weight="fill" className="h-10 w-10 text-white/40" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                        Welcome back
                      </p>
                      <p className="truncate text-3xl font-semibold text-white" style={{ fontFamily: "Caveat, cursive" }}>
                        {user.displayName || user.email?.split("@")[0]}
                      </p>
                      <p className="text-sm text-white/40">{user.email}</p>
                    </div>
                  </div>

                  <div className="w-full space-y-3">
                    <motion.button
                      onClick={handleDownload}
                      disabled={downloadStarted}
                      whileHover={{ scale: downloadStarted ? 1 : 1.02 }}
                      whileTap={{ scale: downloadStarted ? 1 : 0.98 }}
                      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 py-4 text-lg font-semibold text-white transition-all hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                      style={{ fontFamily: "Caveat, cursive", fontSize: "26px" }}
                    >
                      {downloadStarted ? (
                        <>
                          <CheckCircle weight="bold" className="h-7 w-7 animate-pulse" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <DownloadIcon weight="bold" className="h-7 w-7" />
                          Download APK
                        </>
                      )}
                    </motion.button>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-transparent py-3 text-sm font-medium text-white/50 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white"
                    >
                      <SignOut weight="bold" className="h-4 w-4" />
                      Sign Out now
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="unauthenticated"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center space-y-8 py-4"
                >
                  <div className="flex flex-col items-center justify-center space-y-5 text-center">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5"
                    >
                      <Lock weight="duotone" className="h-10 w-10 text-emerald-400" />
                    </motion.div>
                    
                    <div className="space-y-2">
                      <h3 className="text-3xl font-semibold text-white" style={{ fontFamily: "Caveat, cursive" }}>
                        Ready to install?
                      </h3>
                      <p className="mx-auto max-w-[260px] text-sm leading-relaxed text-white/50">
                        Authenticate securely to access the latest build files.
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full max-w-xs justify-center">
                    <GoogleSignIn />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 text-center text-xs text-white/30"
        >
          Secured by Google Authentication
        </motion.p>
      </div>
    </section>
  )
}