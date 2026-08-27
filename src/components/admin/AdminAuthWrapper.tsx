"use client";
import { useState, useEffect } from "react";
import { Lock } from "lucide-react";

export default function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: authUsername, password: authPassword })
      });
      if (res.ok) {
        localStorage.setItem("adminAuth", "true");
        setIsAuthenticated(true);
      } else {
        const data = await res.json();
        setAuthError(data.error || "Login failed");
      }
    } catch (error) {
      setAuthError("Server error. Please try again.");
    }
    setSubmitting(false);
  };

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-emerald-900 transition-colors duration-300 relative z-50">
        <div className="bg-white dark:bg-emerald-950 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-emerald-800 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-8">Admin Login</h1>
          {authError && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{authError}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Username</label>
              <input required type="text" value={authUsername} onChange={(e) => setAuthUsername(e.target.value)} className="w-full bg-slate-50 dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input required type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full bg-slate-50 dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white" />
            </div>
            <button type="submit" disabled={submitting} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all">
              {submitting ? "Authenticating..." : "Login to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
