"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import { UserPlus, AlertCircle, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setSubmitting(true);
    const res = await register(name, email, password);
    setSubmitting(false);

    if (res.success) {
      router.push("/dashboard");
    } else {
      setError(res.error || "Registration failed");
    }
  };

  return (
    <HomepageLayout>
      <Container className="py-12 sm:py-16">
        <div className="max-w-md mx-auto bg-[#141418] border border-[#252530] rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center">
              <span className="text-2xl font-black text-white">Mentro</span>
              <span className="bg-[#ff9900] text-black font-black text-base px-2 py-0.5 rounded ml-1 tracking-wider uppercase">
                HUB
              </span>
            </Link>
            <h1 className="text-xl font-bold text-white">
              Join MentroHub Free
            </h1>
            <p className="text-xs text-gray-400">
              The internet&apos;s most educational entertainment destination
            </p>
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
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="w-full bg-[#1b1b24] text-sm text-white px-3 py-2 rounded-md border border-[#2b2b36] focus:outline-none focus:border-[#ff9900]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-300 block">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ada@example.com"
                className="w-full bg-[#1b1b24] text-sm text-white px-3 py-2 rounded-md border border-[#2b2b36] focus:outline-none focus:border-[#ff9900]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-300 block">
                Password (min 6 characters)
              </label>
              <input
                type="password"
                required
                minLength={6}
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
              <UserPlus size={14} />
              <span>{submitting ? "Creating Account..." : "Create Free Account"}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-[#22222a] text-center text-xs text-gray-400 space-y-1">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-[#ff9900] font-bold hover:underline">
                Log in
              </Link>
            </p>
            <div className="flex items-center justify-center space-x-1 text-[11px] text-gray-400 pt-2">
              <ShieldCheck size={12} />
              <span>Zero spam, zero payment info, 100% learning.</span>
            </div>
          </div>
        </div>
      </Container>
    </HomepageLayout>
  );
}
