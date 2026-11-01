"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlayCircle, Flame, Sparkles, Search, Compass, ShieldCheck } from "lucide-react";

export default function Banner() {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`);
  };

  return (
    <div className="relative border-b border-[#1c1c22] bg-[#0c0c0e] py-10 md:py-14 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[240px] bg-[#ff9900]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          {/* Parody badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-[#16161b] border border-[#262632] text-[#ff9900] text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
            <Sparkles size={12} />
            <span>THE INTERNET&apos;S MOST EDUCATIONAL DESTINATION</span>
          </div>

          {/* Provocative but innocent headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Come For The <span className="text-[#ff9900]">Curiosity</span>.
            <br />
            Stay For The <span className="underline decoration-[#ff9900] decoration-4 underline-offset-4">Knowledge</span>.
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Feed your curiosity with thousands of verified lectures, explainers, and courses in mathematics, coding, AI, and science.
            <span className="text-[#ff9900] font-semibold"> Unlimited Knowledge. Zero Regrets.</span>
          </p>

          {/* Quick Hero Search Input */}
          <form
            onSubmit={handleSearch}
            className="max-w-xl mx-auto flex items-center bg-[#141418] border border-[#2a2a36] focus-within:border-[#ff9900] rounded-full p-1.5 shadow-2xl transition-all"
          >
            <Search className="w-4 h-4 text-gray-400 ml-3 mr-2 shrink-0" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search Python, Linear Algebra, GPT from Scratch, Calculus..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none min-w-0"
            />
            <button
              type="submit"
              className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-xs px-5 py-2.5 rounded-full transition-all shrink-0 uppercase tracking-wider"
            >
              Explore
            </button>
          </form>

          {/* Quick Hot Tags */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 text-xs pt-1">
            <span className="text-gray-400 font-semibold flex items-center mr-1 text-[11px]">
              <Flame size={12} className="text-[#ff9900] mr-1" /> Trending:
            </span>
            {[
              { label: "Python from scratch", q: "Python" },
              { label: "Unfiltered calculus", q: "Calculus" },
              { label: "Neural networks exposed", q: "Neural Networks" },
              { label: "Bare metal C", q: "C" },
              { label: "Docker containers", q: "Docker" },
              { label: "Spreadsheets gone wild", q: "Excel" },
            ].map((tag) => (
              <Link
                key={tag.label}
                href={`/search?q=${encodeURIComponent(tag.q)}`}
                className="bg-[#141418] hover:bg-[#1f1f26] text-gray-300 hover:text-[#ff9900] text-[11px] font-medium px-2.5 py-1 rounded-sm border border-[#22222a] transition-colors"
              >
                {tag.label}
              </Link>
            ))}
          </div>

          {/* Hero CTAs */}
          <div className="flex items-center justify-center space-x-3 pt-2">
            <Link
              href="/watch/vid-prog-03"
              className="inline-flex items-center bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-sm transition-colors shadow-lg uppercase tracking-wider"
            >
              <PlayCircle className="mr-2 w-4 h-4 fill-black" />
              Watch Speedrun Lesson
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center bg-[#17171d] hover:bg-[#202028] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-sm border border-[#282834] transition-colors"
            >
              <Compass className="mr-2 w-4 h-4 text-[#ff9900]" />
              Curated Tracks
            </Link>
          </div>

          {/* Trust Banner */}
          <div className="pt-2 flex items-center justify-center space-x-3 text-[11px] text-gray-400 font-medium">
            <span className="flex items-center text-gray-300">
              <ShieldCheck size={13} className="text-[#ff9900] mr-1" />
              100% Free Knowledge
            </span>
            <span>•</span>
            <span>Verified Educators (3Blue1Brown, CS50, freeCodeCamp)</span>
            <span>•</span>
            <span className="text-gray-400">Zero Regrets</span>
          </div>
        </div>
      </div>
    </div>
  );
}
