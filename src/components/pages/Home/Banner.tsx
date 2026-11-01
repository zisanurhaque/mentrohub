"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlayCircle, Flame, Sparkles, Search, Compass, ShieldCheck } from "lucide-react";
import HeroIllustration from "./HeroIllustration";

export default function Banner() {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`);
  };

  return (
    <div className="relative border-b border-[#1c1c24] bg-gradient-to-b from-[#0e0e12] via-[#0a0a0c] to-[#0a0a0c] py-8 sm:py-12 lg:py-16 overflow-hidden">
      {/* Subtle cinematic background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#ff9900]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[200px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Search, Tags, CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Parody badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#16161c] border border-[#262632] text-[#ff9900] text-[11px] font-semibold tracking-wider uppercase shadow-sm">
              <Sparkles size={12} className="text-[#ff9900]" />
              <span>THE INTERNET&apos;S MOST EDUCATIONAL DESTINATION</span>
            </div>

            {/* Headline with 700-750 font-bold and balanced contrast */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-tight leading-[1.15]">
              Come for the <span className="text-[#ff9900]">Curiosity</span>.
              <br />
              Stay for the <span className="text-white">Knowledge</span>.
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Feed your curiosity with thousands of verified lectures, explainers, and courses in mathematics, coding, AI, and science.
              <span className="text-[#ff9900] font-medium"> Unlimited Knowledge. Zero Regrets.</span>
            </p>

            {/* Quick Hero Search Input */}
            <form
              onSubmit={handleSearch}
              className="max-w-xl mx-auto lg:mx-0 flex items-center bg-[#131317] border border-[#2a2a36] focus-within:border-[#ff9900] focus-within:ring-1 focus-within:ring-[#ff9900] rounded-full p-1.5 shadow-xl transition-all"
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
                className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-semibold text-xs px-5 py-2.5 rounded-full transition-all shrink-0 uppercase tracking-wider shadow"
              >
                Explore
              </button>
            </form>

            {/* Quick Hot Topics */}
            <div className="flex items-center justify-center lg:justify-start flex-wrap gap-1.5 text-xs pt-1">
              <span className="text-gray-400 font-medium flex items-center mr-1 text-[11px]">
                <Flame size={12} className="text-[#ff9900] mr-1" /> Trending:
              </span>
              {[
                { label: "Python from scratch", q: "Python" },
                { label: "Unfiltered calculus", q: "Calculus" },
                { label: "Neural networks", q: "Neural Networks" },
                { label: "Bare metal C", q: "C" },
                { label: "Docker containers", q: "Docker" },
                { label: "Spreadsheets gone wild", q: "Excel" },
              ].map((tag) => (
                <Link
                  key={tag.label}
                  href={`/search?q=${encodeURIComponent(tag.q)}`}
                  className="bg-[#141418] hover:bg-[#1f1f26] text-gray-300 hover:text-[#ff9900] text-[11px] font-normal px-2.5 py-1 rounded-sm border border-[#22222a] transition-colors"
                >
                  {tag.label}
                </Link>
              ))}
            </div>

            {/* Hero Action CTAs */}
            <div className="flex items-center justify-center lg:justify-start space-x-3 pt-2">
              <Link
                href="/watch/vid-prog-03"
                className="inline-flex items-center bg-[#ff9900] hover:bg-[#e68a00] text-black font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-sm transition-colors shadow uppercase tracking-wider"
              >
                <PlayCircle className="mr-2 w-4 h-4 fill-black" />
                Watch Speedrun Lesson
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center bg-[#17171d] hover:bg-[#202028] text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-sm border border-[#262632] transition-colors"
              >
                <Compass className="mr-2 w-4 h-4 text-[#ff9900]" />
                Curated Tracks
              </Link>
            </div>

            {/* Trust Reassurance Notes */}
            <div className="pt-2 flex items-center justify-center lg:justify-start space-x-3 text-[11px] text-gray-400 font-normal">
              <span className="flex items-center text-gray-300 font-medium">
                <ShieldCheck size={13} className="text-[#ff9900] mr-1" />
                100% Free Knowledge
              </span>
              <span>•</span>
              <span>Verified Ivy League & Open Educators</span>
              <span>•</span>
              <span className="text-gray-400">Zero Regrets</span>
            </div>
          </div>

          {/* Right Column: Educational Illustration (5 cols on lg, stacked on mobile) */}
          <div className="lg:col-span-5 flex items-center justify-center pt-4 lg:pt-0">
            <HeroIllustration className="max-w-[340px] sm:max-w-[400px] lg:max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
