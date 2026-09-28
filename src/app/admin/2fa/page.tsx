"use client"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useI18n } from "@/i18n/LanguageProvider"

export default function Admin2FA() {
  const { t } = useI18n()
  const [code, setCode] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", code }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErr(data.error || t("twoFactor.err"))
        setLoading(false)
        return
      }
      router.push("/admin")
      router.refresh()
    } catch {
      setErr(t("adminLogin.errConn"))
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <form onSubmit={handle} className="bg-white border-2 border-[#E50914]/30 rounded-2xl p-8 w-full max-w-md shadow-lg">
        <div className="text-center">
          <Image src="/zwolf-logo.jpg" alt="ZWOLF Nutrition" width={80} height={80} className="h-20 w-20 mx-auto rounded-2xl border-2 border-[#E50914] object-cover shadow" />
          <h1 className="text-2xl font-black mt-4">{t("twoFactor.title")}</h1>
          <p className="text-xs text-zinc-500 mt-1">{t("twoFactor.needApp")}</p>
        </div>
        <div className="mt-6 space-y-3">
          <input
            placeholder={t("twoFactor.codePh")}
            value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            dir="ltr"
            className="w-full border-2 border-[#D1D5DB]/30 rounded-xl px-4 py-3 text-sm text-center font-mono tracking-[0.5em] focus:outline-none focus:border-[#E50914]"
            required
          />
          {err && <p className="text-sm text-red-600 font-bold bg-red-50 border border-red-200 rounded-xl p-3">{err}</p>}
          <button type="submit" disabled={loading} className="w-full bg-[#E50914] text-white py-3.5 rounded-xl font-black hover:bg-[#D1D5DB] text-base disabled:opacity-60">
            {loading ? "..." : t("twoFactor.verify")}
          </button>
        </div>
      </form>
    </div>
  )
}
