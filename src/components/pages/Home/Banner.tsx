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
    <div className="relative border-b border-[#22222a] bg-gradient-to-b from-[#131318] via-[#0f0f13] to-[#0e0e11] py-12 md:py-16 overflow-hidden">
      {/* Background subtle glowing radial circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#ff9900]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Parody badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1b1b22] border border-[#2b2b36] text-[#ff9900] text-xs font-bold shadow-sm">
            <Sparkles size={13} />
            <span>THE INTERNET&apos;S MOST EDUCATIONAL DESTINATION</span>
          </div>

          {/* Provocative but innocent headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
            Come For The <span className="text-[#ff9900]">Curiosity</span>.
            <br />
            Stay For The <span className="underline decoration-[#ff9900] decoration-4 underline-offset-4">Knowledge</span>.
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Feed your curiosity with thousands of verified lectures, explainers, and courses in mathematics, coding, AI, and science.
            <span className="text-[#ff9900] font-semibold"> Unlimited Knowledge. Zero Regrets.</span>
          </p>

          {/* Quick Hero Search Input */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex items-center bg-[#17171d] border border-[#2d2d38] focus-within:border-[#ff9900] rounded-full p-1.5 shadow-xl transition-all">
            <Search className="w-5 h-5 text-gray-400 ml-3 mr-2" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search Python, Linear Algebra, GPT from Scratch..."
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-xs px-5 py-2.5 rounded-full transition-all shadow"
            >
              Explore
            </button>
          </form>

          {/* Quick Hot Tags */}
          <div className="flex items-center justify-center flex-wrap gap-2 text-xs pt-1">
            <span className="text-gray-400 font-semibold flex items-center">
              <Flame size={12} className="text-[#ff9900] mr-1" /> Hot Topics:
            </span>
            <Link
              href="/search?q=Python"
              className="bg-[#1a1a20] hover:bg-[#252530] text-gray-300 hover:text-[#ff9900] px-2.5 py-1 rounded border border-[#262630] transition-colors"
            >
              Python
            </Link>
            <Link
              href="/search?q=Calculus"
              className="bg-[#1a1a20] hover:bg-[#252530] text-gray-300 hover:text-[#ff9900] px-2.5 py-1 rounded border border-[#262630] transition-colors"
            >
              Calculus
            </Link>
            <Link
              href="/search?q=Neural+Networks"
              className="bg-[#1a1a20] hover:bg-[#252530] text-gray-300 hover:text-[#ff9900] px-2.5 py-1 rounded border border-[#262630] transition-colors"
            >
              Neural Nets
            </Link>
            <Link
              href="/search?q=Docker"
              className="bg-[#1a1a20] hover:bg-[#252530] text-gray-300 hover:text-[#ff9900] px-2.5 py-1 rounded border border-[#262630] transition-colors"
            >
              Docker
            </Link>
            <Link
              href="/search?q=Excel"
              className="bg-[#1a1a20] hover:bg-[#252530] text-gray-300 hover:text-[#ff9900] px-2.5 py-1 rounded border border-[#262630] transition-colors"
            >
              Excel
            </Link>
          </div>

          {/* Hero CTAs */}
          <div className="flex items-center justify-center space-x-3 pt-2">
            <Link
              href="/watch/vid-prog-03"
              className="inline-flex items-center bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-sm px-6 py-2.5 rounded-md transition-colors shadow-lg"
            >
              <PlayCircle className="mr-2 w-4 h-4" />
              Watch Speedrun Lesson
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center bg-[#202028] hover:bg-[#282834] text-white font-bold text-sm px-5 py-2.5 rounded-md border border-[#2d2d38] transition-colors"
            >
              <Compass className="mr-2 w-4 h-4 text-[#ff9900]" />
              Browse Collections
            </Link>
          </div>

          {/* Trust Banner */}
          <div className="pt-2 flex items-center justify-center space-x-4 text-[11px] text-gray-400">
            <span className="flex items-center">
              <ShieldCheck size={13} className="text-[#ff9900] mr-1" />
              100% Free & Open
            </span>
            <span>•</span>
            <span>Real Verified Educators</span>
            <span>•</span>
            <span>Safe For Work (Mostly)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
