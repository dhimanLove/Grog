import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { GoogleSignIn } from "@/components/google-signin"
import { toast } from "sonner"

const APK_URL = "https://github.com/dhimanLove/Grog/releases/latest/download/Grog.apk"

export function Download() {
  const { user, loading, logout } = useAuth()
  const [downloading, setDownloading] = useState(false)
  const [imgError, setImgError] = useState(false)

  function handleDownload() {
    if (!user) return
    setDownloading(true)
    const a = document.createElement("a")
    a.href = APK_URL
    a.download = "Grog.apk"
    a.rel = "noopener noreferrer"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success("Downloading Grog.apk")
    setTimeout(() => setDownloading(false), 2000)
  }

  async function handleLogout() {
    try { await logout() } catch { toast.error("Sign out failed") }
  }

  const initials = (user?.displayName || user?.email || "?")[0].toUpperCase()

  return (
    <section
      id="download"
      className="flex min-h-screen items-center justify-center bg-black px-6 py-24"
    >
      <div className="w-full max-w-[360px]">
        {/* Card */}
        <div
          className="flex flex-col items-center px-8 pb-7 pt-9"
          style={{ background: "#0c0c0c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px" }}
        >
          {/* Title */}
          <h2 className="mb-7 text-center text-[38px] font-bold leading-none tracking-tight text-white">
            Get{" "}
            <span style={{ fontFamily: "Caveat, cursive", fontWeight: 400, fontSize: "48px" }}>
              Grog
            </span>
          </h2>

          <div className="mb-7 h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-emerald-400" />
            </div>
          ) : user ? (
            <>
              {/* Avatar with emerald ring */}
              <div
                className="mb-3.5 flex-shrink-0 p-0.5"
                style={{ width: 72, height: 72, borderRadius: "50%", border: "2px solid #10b981" }}
              >
                <div
                  className="flex h-full w-full items-center justify-center overflow-hidden"
                  style={{ borderRadius: "50%", background: "#1a1a1a" }}
                >
                  {user.photoURL && !imgError ? (
                    <img
                      src={user.photoURL}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <span
                      className="text-white/50"
                      style={{ fontFamily: "Caveat, cursive", fontSize: "28px" }}
                    >
                      {initials}
                    </span>
                  )}
                </div>
              </div>

              {/* Name + email */}
              <p
                className="mb-1 text-white"
                style={{ fontFamily: "Caveat, cursive", fontSize: "32px", fontWeight: 600, lineHeight: 1 }}
              >
                {user.displayName || user.email?.split("@")[0]}
              </p>
              <p className="mb-7 text-[13px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                {user.email}
              </p>

              {/* Download button */}
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="mb-3.5 flex w-full items-center justify-center gap-2.5 py-3.5 text-white transition-colors hover:bg-emerald-400 disabled:opacity-50"
                style={{ background: "#10b981", borderRadius: "12px", border: "none" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v13M6 11l6 6 6-6"/><path d="M3 19h18"/>
                </svg>
                <span style={{ fontFamily: "Caveat, cursive", fontSize: "26px", fontWeight: 600, lineHeight: 1 }}>
                  {downloading ? "Starting…" : "Download APK"}
                </span>
              </button>

              {/* Sign out */}
              <button
                onClick={handleLogout}
                className="text-xs transition-colors hover:text-white/50"
                style={{ color: "rgba(255,255,255,0.25)", background: "none", border: "none" }}
              >
                sign out
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-6 py-4 text-center">
              <p style={{ fontFamily: "Caveat, cursive", fontSize: "22px", color: "rgba(255,255,255,0.4)" }}>
                Sign in to download.
              </p>
              <GoogleSignIn />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}