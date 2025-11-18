"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, AlertCircle, Github } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check for unauthorized error in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("error") === "unauthorized") {
      setError(
        "Access denied. Your account is not authorized to access this admin panel."
      );
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        // Session is stored in localStorage automatically
        console.log("Login successful, session stored in localStorage");
        console.log("Session:", data.session);

        // Navigate to dashboard
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(
        err.message || "Failed to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // Use environment variable or fall back to window.location.origin
      const redirectUrl =
        process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${redirectUrl}/admin/dashboard`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Failed to login with GitHub. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Lock className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-text mb-2">Admin Login</h1>
          <p className="text-text-secondary">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-bg-light rounded-xl shadow-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-text mb-2 font-medium"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                  size={20}
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="admin@example.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-text mb-2 font-medium"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                  size={20}
                />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-bg-lighter"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-bg-light text-text-secondary">
                Or continue with
              </span>
            </div>
          </div>

          {/* GitHub Login */}
          <button
            type="button"
            onClick={handleGitHubLogin}
            disabled={loading}
            className="w-full bg-bg-dark hover:bg-bg-lighter border border-bg-lighter text-text font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            <Github size={20} />
            {loading ? "Connecting..." : "Sign in with GitHub"}
          </button>
        </div>

        <p className="text-center text-text-secondary text-sm mt-6">
          Protected area - Authorized access only
        </p>
      </div>
    </div>
  );
}
