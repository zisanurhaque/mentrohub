"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import VideoCard from "@/components/cards/VideoCard";
import { WatchHistoryItem, BookmarkItem } from "@/types";
import {
  History,
  Bookmark,
  BookOpen,
  Award,
  Trash2,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

function DashboardContent() {
  const { user, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";

  const [activeTab, setActiveTab] = useState<"overview" | "history" | "saved">(
    (initialTab === "history" || initialTab === "saved") ? initialTab : "overview"
  );
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["overview", "history", "saved"].includes(tabParam)) {
      setActiveTab(tabParam as "overview" | "history" | "saved");
    }
  }, [searchParams]);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      try {
        const [histRes, bmRes] = await Promise.all([
          fetch("/api/user/history"),
          fetch("/api/user/saved"),
        ]);

        if (histRes.ok) {
          const d = await histRes.json();
          setHistory(d.history || []);
        }
        if (bmRes.ok) {
          const d = await bmRes.json();
          setBookmarks(d.bookmarks || []);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    }

    fetchData();
  }, [user]);

  const handleClearHistory = async () => {
    if (!confirm("Are you sure you want to clear your entire watch history?")) return;
    try {
      const res = await fetch("/api/user/history", { method: "DELETE" });
      if (res.ok) {
        setHistory([]);
      }
    } catch (err) {
      console.error("Clear history error:", err);
    }
  };

  if (authLoading) {
    return (
      <HomepageLayout>
        <Container className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-[#ff9900] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-gray-400">Loading your Learning Hub...</p>
        </Container>
      </HomepageLayout>
    );
  }

  if (!user) {
    return (
      <HomepageLayout>
        <Container className="py-16 text-center">
          <div className="max-w-md mx-auto p-8 bg-[#141418] border border-[#252530] rounded-xl space-y-4">
            <BookOpen className="w-12 h-12 text-[#ff9900] mx-auto" />
            <h2 className="text-xl font-bold text-white">
              Log in to view your Learning Hub
            </h2>
            <p className="text-xs text-gray-400">
              Your personalized watch history, saved lessons, and study progress are waiting.
            </p>
            <div className="pt-2 flex justify-center space-x-3">
              <Link
                href="/login"
                className="px-5 py-2 bg-[#ff9900] text-black font-extrabold text-xs rounded hover:bg-[#e68a00]"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 bg-[#22222c] text-white font-bold text-xs rounded hover:bg-[#2c2c36]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </Container>
      </HomepageLayout>
    );
  }

  const completedCount = history.filter((h) => h.completed).length;

  return (
    <HomepageLayout>
      <Container className="py-8 space-y-8">
        {/* User Hero Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#171720] via-[#1b1b24] to-[#14141a] border border-[#252530] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#ff9900]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#ff9900] text-black font-black text-2xl flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-white">{user.name}</h1>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#2a2a36] text-[#ff9900]">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
              <p className="text-xs text-gray-300 italic mt-1">&quot;{user.bio}&quot;</p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-center border-t md:border-t-0 md:border-l border-[#242430] pt-4 md:pt-0 md:pl-6">
            <div>
              <p className="text-xl sm:text-2xl font-black text-[#ff9900]">
                {history.length}
              </p>
              <p className="text-[10px] uppercase font-bold text-gray-400">Watched</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">
                {bookmarks.length}
              </p>
              <p className="text-[10px] uppercase font-bold text-gray-400">Saved</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-emerald-400">
                {completedCount}
              </p>
              <p className="text-[10px] uppercase font-bold text-gray-400">Completed</p>
            </div>
            <div className="hidden sm:block">
              <div className="inline-flex items-center px-2 py-1 rounded bg-[#ff9900]/10 text-[#ff9900] text-[10px] font-bold border border-[#ff9900]/30">
                <Award size={12} className="mr-1" /> Brain Level: 42
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-[#22222a] text-xs">
          {[
            { id: "overview", label: "Overview", icon: Sparkles },
            { id: "history", label: `Watch History (${history.length})`, icon: History },
            { id: "saved", label: `Saved Lessons (${bookmarks.length})`, icon: Bookmark },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center px-4 py-3 font-bold border-b-2 transition-colors ${
                  active
                    ? "border-[#ff9900] text-[#ff9900]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={14} className="mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Continue Watching Section */}
            {history.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center">
                    <Clock size={16} className="text-[#ff9900] mr-2" />
                    Continue Learning
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab("history")}
                    className="text-xs text-[#ff9900] hover:underline"
                  >
                    View all history
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {history.slice(0, 4).map((item) =>
                    item.video ? <VideoCard key={item.id} video={item.video} /> : null
                  )}
                </div>
              </div>
            )}

            {/* Saved Lessons */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center">
                  <Bookmark size={16} className="text-[#ff9900] mr-2" />
                  Saved For Later
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab("saved")}
                  className="text-xs text-[#ff9900] hover:underline"
                >
                  View all saved ({bookmarks.length})
                </button>
              </div>

              {bookmarks.length === 0 ? (
                <div className="p-8 text-center bg-[#141418] border border-[#22222a] rounded-lg text-xs text-gray-400">
                  No saved lessons yet. Browse topics and click &quot;Save Lesson&quot; to build your study queue!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {bookmarks.slice(0, 4).map((b) =>
                    b.video ? <VideoCard key={b.id} video={b.video} /> : null
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Watch History */}
        {activeTab === "history" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center">
                <History size={16} className="text-[#ff9900] mr-2" />
                All Watch History ({history.length})
              </h2>

              {history.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="flex items-center text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={13} className="mr-1" />
                  Clear Watch History
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="p-12 text-center bg-[#141418] border border-[#22222a] rounded-xl space-y-3">
                <p className="text-sm font-bold text-white">
                  Your watch history is cleaner than your browser history.
                </p>
                <p className="text-xs text-gray-400">
                  Go watch some linear algebra or Python speedruns to populate it!
                </p>
                <Link
                  href="/"
                  className="inline-block px-4 py-2 bg-[#ff9900] text-black font-bold text-xs rounded hover:bg-[#e68a00]"
                >
                  Explore Lessons
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {history.map((h) =>
                  h.video ? (
                    <div key={h.id} className="relative">
                      {h.completed && (
                        <div className="absolute top-2 left-2 z-20 bg-emerald-600/90 text-white font-bold text-[10px] px-2 py-0.5 rounded flex items-center shadow">
                          <CheckCircle2 size={11} className="mr-1" />
                          COMPLETED
                        </div>
                      )}
                      <VideoCard video={h.video} />
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Lessons */}
        {activeTab === "saved" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center">
                <Bookmark size={16} className="text-[#ff9900] mr-2" />
                Saved Lessons ({bookmarks.length})
              </h2>
            </div>

            {bookmarks.length === 0 ? (
              <div className="p-12 text-center bg-[#141418] border border-[#22222a] rounded-xl space-y-3">
                <p className="text-sm font-bold text-white">
                  Nothing saved to your learning list yet.
                </p>
                <p className="text-xs text-gray-400">
                  Click the &quot;Save Lesson&quot; bookmark button on any lecture to queue it here.
                </p>
                <Link
                  href="/search"
                  className="inline-block px-4 py-2 bg-[#ff9900] text-black font-bold text-xs rounded hover:bg-[#e68a00]"
                >
                  Discover Content
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {bookmarks.map((b) =>
                  b.video ? <VideoCard key={b.id} video={b.video} /> : null
                )}
              </div>
            )}
          </div>
        )}
      </Container>
    </HomepageLayout>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0e0e11] flex items-center justify-center text-xs text-gray-400">
          Loading dashboard...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
