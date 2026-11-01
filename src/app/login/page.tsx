"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import BrandLogo from "@/components/common/BrandLogo";
import { LogIn, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await login(email, password);
    setSubmitting(false);

    if (res.success) {
      router.push("/dashboard");
    } else {
      setError(res.error || "Invalid credentials");
    }
  };

  const handleQuickDemo = async (role: "student" | "admin") => {
    setError(null);
    setSubmitting(true);
    const demoEmail = role === "admin" ? "admin@mentrohub.com" : "student@mentrohub.com";
    const demoPass = role === "admin" ? "admin123456" : "student123456";
    setEmail(demoEmail);
    setPassword(demoPass);

    const res = await login(demoEmail, demoPass);
    setSubmitting(false);

    if (res.success) {
      router.push(role === "admin" ? "/admin" : "/dashboard");
    } else {
      setError(res.error || "Demo login failed");
    }
  };

  return (
    <HomepageLayout>
      <Container className="py-12 sm:py-16">
        <div className="max-w-md mx-auto bg-[#141418] border border-[#252530] rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Logo Brand Header */}
          <div className="text-center space-y-3">
            <BrandLogo size="lg" />
            <h1 className="text-xl font-semibold text-white">
              Log In to MentroHub
            </h1>
            <p className="text-xs text-gray-400">
              Resume your watch history, saved lists, and study notes
            </p>
          </div>

          {/* Quick Demo Login One-Click Buttons */}
          <div className="p-3 bg-[#191922] border border-[#262634] rounded-lg space-y-2">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#ff9900] uppercase tracking-wider">
              <Sparkles size={12} />
              <span>Instant One-Click Demo Access</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("student")}
                disabled={submitting}
                className="py-1.5 px-2 bg-[#22222c] hover:bg-[#2c2c38] text-white text-xs font-semibold rounded border border-[#333342] transition-colors"
              >
                Demo Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("admin")}
                disabled={submitting}
                className="py-1.5 px-2 bg-[#ff9900]/10 hover:bg-[#ff9900]/20 text-[#ff9900] text-xs font-bold rounded border border-[#ff9900]/30 transition-colors"
              >
                Demo Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-md text-red-300 text-xs flex items-center space-x-2">
              <AlertCircle size={15} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-300 block">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#1b1b24] text-sm text-white px-3 py-2 rounded-md border border-[#2b2b36] focus:outline-none focus:border-[#ff9900]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-300 block">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1b1b24] text-sm text-white px-3 py-2 rounded-md border border-[#2b2b36] focus:outline-none focus:border-[#ff9900]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-[#ff9900] hover:bg-[#e68a00] disabled:opacity-50 text-black font-extrabold text-xs rounded-md transition-colors flex items-center justify-center space-x-2 shadow"
            >
              <LogIn size={14} />
              <span>{submitting ? "Signing In..." : "Log In"}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-[#22222a] text-center text-xs text-gray-400 space-y-1">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#ff9900] font-bold hover:underline">
                Sign up free
              </Link>
            </p>
            <div className="flex items-center justify-center space-x-1 text-[11px] text-gray-400 pt-2">
              <ShieldCheck size={12} />
              <span>100% Free & Open Source Education</span>
            </div>
          </div>
        </div>
      </Container>
    </HomepageLayout>
  );
}
