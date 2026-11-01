"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthContext";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import { User as UserIcon, Save, ArrowLeft, CheckCircle2 } from "lucide-react";

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
];

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, avatar }),
      });
      if (res.ok) {
        await refreshUser();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      console.error("Save profile error", e);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <HomepageLayout>
        <Container className="py-16 text-center">
          <p className="text-xs text-gray-400">Please log in to edit your profile.</p>
        </Container>
      </HomepageLayout>
    );
  }

  return (
    <HomepageLayout>
      <Container className="py-10 max-w-2xl">
        <div className="space-y-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-xs font-bold text-gray-400 hover:text-[#ff9900]"
          >
            <ArrowLeft size={13} className="mr-1" /> Back to Dashboard
          </Link>

          <div className="p-6 bg-[#141418] border border-[#24242e] rounded-xl space-y-6 shadow-xl">
            <div className="border-b border-[#22222a] pb-4">
              <h1 className="text-xl font-bold text-white flex items-center">
                <UserIcon className="mr-2 text-[#ff9900]" />
                Profile Settings
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Manage your public learner identity and preferences
              </p>
            </div>

            {saved && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded text-emerald-300 text-xs flex items-center">
                <CheckCircle2 size={15} className="mr-2 text-emerald-400" />
                Profile changes successfully updated!
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              {/* Avatar Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 block">
                  Select Profile Avatar
                </label>
                <div className="flex items-center space-x-3 overflow-x-auto py-1">
                  {AVATAR_PRESETS.map((p, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setAvatar(p)}
                      className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all shrink-0 ${
                        avatar === p
                          ? "border-[#ff9900] scale-105 shadow-md"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={p} alt="avatar" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1b1b24] text-sm text-white px-3 py-2 rounded-md border border-[#2b2b36] focus:outline-none focus:border-[#ff9900]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300 block">
                  Email (Cannot be modified)
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full bg-[#181820] text-sm text-gray-500 px-3 py-2 rounded-md border border-[#22222a] cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300 block">
                  Bio / Learning Philosophy
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="Tell fellow students what topics you enjoy..."
                  className="w-full bg-[#1b1b24] text-sm text-white px-3 py-2 rounded-md border border-[#2b2b36] focus:outline-none focus:border-[#ff9900] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center bg-[#ff9900] hover:bg-[#e68a00] disabled:opacity-50 text-black font-extrabold text-xs px-5 py-2.5 rounded-md transition-colors shadow"
              >
                <Save size={14} className="mr-1.5" />
                {saving ? "Saving Changes..." : "Save Profile"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </HomepageLayout>
  );
}
