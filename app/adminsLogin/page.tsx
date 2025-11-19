"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EXPECTED_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN || "";

export default function AdminLoginPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to /admin
  useEffect(() => {
    const stored = typeof window !== "undefined"
      ? window.localStorage.getItem("adminToken")
      : null;

    if (stored && EXPECTED_TOKEN && stored === EXPECTED_TOKEN) {
      router.replace("/admins");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      toast.error("Please enter your access token.");
      return;
    }

    if (!EXPECTED_TOKEN) {
      toast.error("Admin token not configured in env.");
      return;
    }

    setLoading(true);
    try {
      if (token.trim() !== EXPECTED_TOKEN) {
        toast.error("Invalid token.");
        return;
      }

      // Save token locally
      window.localStorage.setItem("adminToken", EXPECTED_TOKEN);
      toast.success("Logged in as admin");
      router.replace("/admins");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#111] text-gray-100 px-6 md:px-12 py-20">
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-3xl border border-gray-800 bg-[#171717] px-6 py-8 shadow-xl sm:px-10 sm:py-10 relative overflow-hidden">
          {/* subtle top gradient */}
          <div className="pointer-events-none absolute inset-x-0 -top-32 h-48 bg-gradient-to-b from-white/10 via-transparent to-transparent" />

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Plexdi Studio • Internal
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
              Admin Access
            </h1>
            <p className="mt-2 text-sm text-gray-400 max-w-md">
              This area is for managing commissions and shop products.
              Enter your admin token to continue.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Access token
                </label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-[#111] px-4 py-2 text-sm text-white outline-none focus:border-gray-400"
                  placeholder="••••••••••••"
                  autoComplete="off"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Token is stored locally in your browser only.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-200 disabled:opacity-60"
              >
                {loading ? "Checking..." : "Enter dashboard"}
              </button>
            </form>

            <p className="mt-6 text-xs text-gray-500">
              If you ever need to revoke access, just change{" "}
              <span className="font-medium text-gray-300">
                NEXT_PUBLIC_ADMIN_TOKEN
              </span>{" "}
              and redeploy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
