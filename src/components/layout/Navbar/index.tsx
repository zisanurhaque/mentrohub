"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import {
  Menu,
  X,
  Search,
  Video,
  Layers,
  ChevronDown,
  Info,
  LogOut,
  User as UserIcon,
  BookOpen,
  Bookmark,
  ShieldAlert,
  GraduationCap,
  Flame,
  Sparkles,
  Bot,
  Zap,
} from "lucide-react";

const SUGGESTIONS = [
  "Python from scratch",
  "Nasty linear algebra",
  "Dirty fast react hooks",
  "Bare metal C programming",
  "Unfiltered calculus",
  "Deep neural networks exposed",
  "Hardcore SQL queries",
  "Spreadsheets gone wild",
  "Git branching speedrun",
  "Docker in 100 seconds",
];

const TOPIC_PILLS = [
  { label: "python from scratch", query: "Python" },
  { label: "nasty linear algebra", query: "Linear Algebra" },
  { label: "dirty fast react", query: "React" },
  { label: "bare metal c", query: "C" },
  { label: "unfiltered calculus", query: "Calculus" },
  { label: "deep neural nets", query: "Neural Networks" },
  { label: "hardcore sql queries", query: "SQL" },
  { label: "spreadsheets gone wild", query: "Excel" },
  { label: "git branching speedrun", query: "Git" },
  { label: "docker containers", query: "Docker" },
  { label: "existential science", query: "Science" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [searchVal, setSearchVal] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiThinking, setAiThinking] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    setSearchFocused(false);
    setMobileMenuOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`);
  };

  const handleAiAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setAiThinking(true);
    setAiResponse(null);

    setTimeout(() => {
      setAiThinking(false);
      setAiResponse(
        `Based on MentroHub's verified syllabus, here is the breakdown for "${aiQuery}": Dive straight into our featured lecture series from 3Blue1Brown and Harvard CS50. Remember: True intelligence comes from active problem solving, not passive scrolling!`
      );
    }, 800);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#000000] border-b border-[#1c1c22] shadow-md select-none">
        {/* 1. Top Mini Utility Bar (Exact Match to Screenshot 2 Top Row) */}
        <div className="hidden md:block bg-[#08080a] border-b border-[#141418] py-1 text-[11px] text-[#787880]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center space-x-6 uppercase font-bold tracking-wider">
            <Link href="/about" className="hover:text-gray-300 flex items-center">
              EDUCATOR HUB <Info size={11} className="ml-0.5 text-gray-500" />
            </Link>
            <Link href="/collections" className="hover:text-gray-300">
              STUDENT CENTRO
            </Link>
            <Link href="/wellness" className="hover:text-gray-300">
              KNOWLEDGE WELLNESS
            </Link>
            <Link href="/blog" className="hover:text-gray-300">
              INSIGHTS
            </Link>
            <Link href="/categories" className="hover:text-gray-300">
              DISCIPLINES
            </Link>
            <Link href="/store" className="hover:text-gray-300 flex items-center">
              MERCH <Info size={11} className="ml-0.5 text-gray-500" />
            </Link>
            <Link href="/trust-safety" className="hover:text-gray-300">
              TRUST & SAFETY
            </Link>
            <span className="text-gray-500 hover:text-gray-300 cursor-pointer">
              EN
            </span>
          </div>
        </div>

        {/* 2. Main Navigation Bar (Exact Match to Screenshot 2) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            {/* Left: Hamburger, Filter Icon, Logo */}
            <div className="flex items-center space-x-3 shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white p-1 rounded-sm focus-visible:ring-1"
                title="Menu"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X size={22} className="text-[#e2e2e8]" />
                ) : (
                  <Menu size={22} className="text-[#e2e2e8]" />
                )}
              </button>

              {/* Filter symbol button (Parody of gender filter in reference) */}
              <Link
                href="/categories"
                className="hidden sm:flex items-center space-x-1 text-gray-400 hover:text-white px-1.5 py-1 rounded hover:bg-[#16161b] transition-colors text-xs font-semibold"
                title="Filter by Discipline"
              >
                <GraduationCap size={17} className="text-[#ff9900]" />
                <ChevronDown size={12} className="text-gray-400" />
              </Link>

              {/* Iconic Logo: White Text + Warm Orange Box Badge */}
              <Link href="/" className="flex items-center group">
                <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white">
                  Mentro
                </span>
                <span className="bg-[#ff9900] text-black font-black text-sm sm:text-base px-2 py-0.5 rounded-sm ml-1 tracking-tight uppercase shadow-sm">
                  HUB
                </span>
              </Link>
            </div>

            {/* Center: Wide Dark Pill Search Bar */}
            <div ref={searchRef} className="relative flex-1 max-w-xl mx-2 hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-[#777777] pointer-events-none" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search MentroHub..."
                  className="w-full bg-[#18181c] hover:bg-[#1f1f24] focus:bg-[#202026] text-sm text-gray-100 placeholder-[#757575] rounded-full pl-10 pr-10 py-2 border border-[#24242e] focus:border-[#ff9900]/70 focus:outline-none transition-colors"
                />
              </form>

              {/* Autocomplete Dropdown */}
              {searchFocused && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#141418] border border-[#282834] rounded-sm shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3.5 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center">
                    <Flame size={12} className="text-[#ff9900] mr-1" />
                    Trending Educational Searches
                  </div>
                  {SUGGESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSearchVal(item);
                        setSearchFocused(false);
                        router.push(`/search?q=${encodeURIComponent(item)}`);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-gray-300 hover:bg-[#1e1e26] hover:text-[#ff9900] flex items-center space-x-2 transition-colors"
                    >
                      <Search size={13} className="text-gray-500" />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: AI Pill Button, Video Upload Icon, Library Icon, Profile Icon */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              {/* AI TUTOR Orange Pill Button (Opens Interactive AI Tutor) */}
              <button
                type="button"
                onClick={() => setAiModalOpen(true)}
                className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-black text-xs px-3 sm:px-3.5 py-1.5 rounded-full flex items-center space-x-1 shadow transition-colors"
                title="Open AI Tutor"
              >
                <span>AI TUTOR</span>
                <Info size={11} className="stroke-[2.5]" />
              </button>

              {/* Upload Video Icon */}
              <Link
                href="/admin"
                className="p-1.5 text-[#b0b0b0] hover:text-white rounded hover:bg-[#1a1a20] transition-colors"
                title="Add Lecture / Admin"
              >
                <Video size={19} />
              </Link>

              {/* Collections / Playlists Icon */}
              <Link
                href="/collections"
                className="p-1.5 text-[#b0b0b0] hover:text-white rounded hover:bg-[#1a1a20] transition-colors"
                title="Curated Tracks"
              >
                <Layers size={19} />
              </Link>

              {/* User Profile Avatar / Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-[#1e1e24] hover:bg-[#282830] border border-[#2e2e38] flex items-center justify-center text-gray-300 hover:text-white transition-all overflow-hidden"
                  aria-label="User account"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <UserIcon size={16} />
                  )}
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#141418] border border-[#282834] rounded-sm shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-[#202028]">
                          <p className="text-xs font-bold text-white truncate">{user.name}</p>
                          <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                          <span className="inline-block mt-1 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-sm bg-[#22222a] text-[#ff9900]">
                            {user.role}
                          </span>
                        </div>
                        <Link
                          href="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-xs text-gray-300 hover:bg-[#1e1e26] hover:text-[#ff9900]"
                        >
                          <BookOpen size={14} className="mr-2" />
                          Learning Hub
                        </Link>
                        <Link
                          href="/dashboard?tab=saved"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-xs text-gray-300 hover:bg-[#1e1e26] hover:text-[#ff9900]"
                        >
                          <Bookmark size={14} className="mr-2" />
                          Saved Lessons
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-xs text-gray-300 hover:bg-[#1e1e26] hover:text-[#ff9900]"
                        >
                          <UserIcon size={14} className="mr-2" />
                          Profile Settings
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-xs text-[#ff9900] hover:bg-[#1e1e26]"
                          >
                            <ShieldAlert size={14} className="mr-2" />
                            Admin Console
                          </Link>
                        )}
                        <div className="border-t border-[#202028] pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setUserDropdownOpen(false);
                              logout();
                            }}
                            className="w-full text-left flex items-center px-4 py-2 text-xs text-red-400 hover:bg-[#1e1e26]"
                          >
                            <LogOut size={14} className="mr-2" />
                            Log Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-3 space-y-2">
                        <p className="text-xs font-bold text-white">Join MentroHub</p>
                        <p className="text-[11px] text-gray-400">Save lessons and track watch progress</p>
                        <div className="pt-1 flex flex-col space-y-2">
                          <Link
                            href="/login"
                            onClick={() => setUserDropdownOpen(false)}
                            className="w-full py-1.5 text-center bg-[#202028] hover:bg-[#282834] text-white text-xs font-bold rounded-sm transition-colors"
                          >
                            Log In
                          </Link>
                          <Link
                            href="/register"
                            onClick={() => setUserDropdownOpen(false)}
                            className="w-full py-1.5 text-center bg-[#ff9900] hover:bg-[#e68a00] text-black text-xs font-extrabold rounded-sm transition-colors"
                          >
                            Sign Up Free
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Secondary Category Navigation Bar (Exact Match to Screenshot 2 Under Header) */}
        <div className="bg-[#08080a] border-t border-[#18181f] border-b border-[#141418] overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-5 text-xs font-bold tracking-tight uppercase whitespace-nowrap">
              {/* HOME TAB with orange bottom line */}
              <Link
                href="/"
                className={`py-2.5 flex items-center transition-colors ${
                  pathname === "/"
                    ? "text-white border-b-2 border-[#ff9900]"
                    : "text-[#a0a0aa] hover:text-white"
                }`}
              >
                HOME
              </Link>

              <Link
                href="/search"
                className={`py-2.5 flex items-center transition-colors ${
                  pathname === "/search"
                    ? "text-white border-b-2 border-[#ff9900]"
                    : "text-[#a0a0aa] hover:text-white"
                }`}
              >
                <span>LESSONS</span>
                <ChevronDown size={12} className="ml-0.5 text-gray-500" />
              </Link>

              <Link
                href="/categories"
                className={`py-2.5 flex items-center transition-colors ${
                  pathname.startsWith("/categories")
                    ? "text-white border-b-2 border-[#ff9900]"
                    : "text-[#a0a0aa] hover:text-white"
                }`}
              >
                <span>CATEGORIES</span>
                <ChevronDown size={12} className="ml-0.5 text-gray-500" />
              </Link>

              <Link
                href="/search?q=Lecture"
                className="py-2.5 flex items-center text-[#a0a0aa] hover:text-white transition-colors"
              >
                <span>LIVE LECTURES</span>
                <ChevronDown size={12} className="ml-0.5 text-gray-500" />
                <Info size={10} className="ml-1 text-gray-600" />
              </Link>

              <Link
                href="/search?q=Grant+Sanderson"
                className="py-2.5 flex items-center text-[#a0a0aa] hover:text-white transition-colors"
              >
                <span>TOP PROFESSORS</span>
                <ChevronDown size={12} className="ml-0.5 text-gray-500" />
              </Link>

              {/* Parody Humorous Tab from Screenshot 2: 'BOOTCAMPS 18+ ⓘ' */}
              <Link
                href="/collections"
                className={`py-2.5 flex items-center text-[#ff9900] hover:text-[#ffa31a] transition-colors ${
                  pathname.startsWith("/collections")
                    ? "border-b-2 border-[#ff9900]"
                    : ""
                }`}
              >
                <span>BOOTCAMPS 18+</span>
                <ChevronDown size={12} className="ml-0.5 text-[#ff9900]/70" />
                <Info size={10} className="ml-1 text-[#ff9900]/70" />
              </Link>

              <Link
                href="/dashboard"
                className={`py-2.5 flex items-center transition-colors ${
                  pathname === "/dashboard"
                    ? "text-white border-b-2 border-[#ff9900]"
                    : "text-[#a0a0aa] hover:text-white"
                }`}
              >
                <span>COMMUNITY</span>
                <ChevronDown size={12} className="ml-0.5 text-gray-500" />
              </Link>

              <Link
                href="/dashboard?tab=saved"
                className="py-2.5 flex items-center text-[#a0a0aa] hover:text-white transition-colors"
              >
                <span>CHEATSHEETS & NOTES</span>
                <ChevronDown size={12} className="ml-0.5 text-gray-500" />
              </Link>
            </nav>
          </div>
        </div>

        {/* 4. Topic Pills Bar (Exact Match to Screenshot 2: 'Hot Educational Videos 🌐') */}
        <div className="bg-[#0b0b0e] border-b border-[#18181e] py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3 overflow-hidden">
              {/* Title with Globe Icon */}
              <div className="flex items-center space-x-1.5 text-white font-black text-xs sm:text-sm shrink-0 tracking-tight">
                <span>Hot Educational Videos</span>
                <span className="text-[#38bdf8] text-xs">🌐</span>
              </div>

              {/* Scrollable Pill Chips */}
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5 flex-1 min-w-0">
                {TOPIC_PILLS.map((pill, i) => (
                  <Link
                    key={i}
                    href={`/search?q=${encodeURIComponent(pill.query)}`}
                    className="bg-[#18181e] hover:bg-[#22222a] text-[#b8b8c0] hover:text-white text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap transition-colors border border-transparent hover:border-[#2e2e38]"
                  >
                    {pill.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#101014] border-b border-[#202028] px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search Python, Linear Algebra, AI..."
                className="w-full bg-[#181820] text-sm text-white placeholder-gray-500 rounded-full pl-9 pr-4 py-2 border border-[#2a2a36] focus:border-[#ff9900] focus:outline-none"
              />
            </form>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-sm bg-[#16161b] text-gray-200 hover:text-[#ff9900]"
              >
                Home
              </Link>
              <Link
                href="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-sm bg-[#16161b] text-gray-200 hover:text-[#ff9900]"
              >
                All Lessons
              </Link>
              <Link
                href="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-sm bg-[#16161b] text-gray-200 hover:text-[#ff9900]"
              >
                Categories
              </Link>
              <Link
                href="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-sm bg-[#16161b] text-gray-200 hover:text-[#ff9900]"
              >
                Collections
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-sm bg-[#16161b] text-gray-200 hover:text-[#ff9900]"
              >
                Learning Hub
              </Link>
              <Link
                href="/dashboard?tab=saved"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-sm bg-[#16161b] text-gray-200 hover:text-[#ff9900]"
              >
                Saved Lessons
              </Link>
              <Link
                href="/dashboard?tab=history"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-sm bg-[#16161b] text-gray-200 hover:text-[#ff9900]"
              >
                Watch History
              </Link>
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="col-span-2 p-2.5 rounded-sm bg-[#ff9900]/10 border border-[#ff9900]/30 text-[#ff9900] text-center"
                >
                  Admin Console
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* AI TUTOR Interactive Modal */}
      {aiModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#141418] border border-[#2b2b38] rounded-md max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setAiModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
            >
              <X size={18} />
            </button>

            <div className="flex items-center space-x-2 text-[#ff9900] text-xs font-black uppercase tracking-wider">
              <Bot size={16} />
              <span>MentroHub AI Curriculum Assistant</span>
            </div>

            <div>
              <h3 className="text-xl font-black text-white">Ask Your AI Tutor</h3>
              <p className="text-xs text-gray-400 mt-1">
                Warning: Explanations may be aggressively clear, highly educational, and consensual.
              </p>
            </div>

            <form onSubmit={handleAiAsk} className="space-y-3">
              <textarea
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="e.g., Explain backpropagation simply, or recommend a Python sequence..."
                rows={3}
                className="w-full bg-[#1c1c24] border border-[#2c2c3a] focus:border-[#ff9900] rounded-sm p-3 text-xs text-white placeholder-gray-500 focus:outline-none"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500">
                  Powered by MentroHub Neural Curriculum Engine
                </span>
                <button
                  type="submit"
                  disabled={aiThinking}
                  className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-black text-xs px-4 py-2 rounded-sm transition-colors uppercase tracking-wider flex items-center disabled:opacity-50"
                >
                  <Zap size={13} className="mr-1.5 fill-black" />
                  {aiThinking ? "Synthesizing..." : "Consult Tutor"}
                </button>
              </div>
            </form>

            {aiResponse && (
              <div className="p-3.5 bg-[#1a1a24] border border-[#28283a] rounded-sm text-xs text-gray-200 leading-relaxed space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center space-x-1.5 text-[#ff9900] font-bold text-[11px] uppercase tracking-wider">
                  <Sparkles size={12} />
                  <span>AI Tutor Assessment</span>
                </div>
                <p>{aiResponse}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
