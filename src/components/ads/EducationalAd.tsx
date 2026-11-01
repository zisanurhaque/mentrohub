"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  GraduationCap,
  X,
  Zap,
  Brain,
  ShieldCheck,
} from "lucide-react";

export type AdVariant = "banner" | "sidebar" | "footer" | "card";

interface EducationalAdProps {
  variant?: AdVariant;
  className?: string;
}

const AD_PRESETS = [
  {
    id: "brainfuel",
    brand: "BrainFuel™",
    tagline: "Side effects may include knowing things.",
    cta: "Feed Your Neurons",
    url: "/search?q=Neural+Networks",
    badge: "Sponsored",
    category: "COGNITIVE SUPPLEMENTS",
    highlight: "100% ORGANIC INTELLIGENCE",
  },
  {
    id: "procrastination",
    brand: "Procrastination Premium",
    tagline: "Now with 40% more excuses. Or switch to MentroHub today.",
    cta: "Start Learning Now",
    url: "/search?q=Python",
    badge: "Parody Ad",
    category: "EXCUSE DISRUPTION",
    highlight: "0% PROCRASTINATION",
  },
  {
    id: "excel",
    brand: "Ctrl + Z Your Bad Decisions",
    tagline:
      "Master VLOOKUP, INDEX/MATCH, and formulas before your boss notices.",
    cta: "Claim Spreadsheet Mastery",
    url: "/collections/excel-for-professionals",
    badge: "Sponsored",
    category: "CAREER REDEMPTION",
    highlight: "SAVE 12 HRS/WEEK",
  },
  {
    id: "sleep",
    brand: "Sleep Is Temporary",
    tagline:
      "Knowledge is forever. Binge Stanford CS50 and MIT Linear Algebra guilt-free.",
    cta: "Binge Hardcore Knowledge",
    url: "/collections/learn-python-from-scratch",
    badge: "Ad",
    category: "LATE NIGHT ADDICTION",
    highlight: "NO AFTERNOON CRASH",
  },
];

export default function EducationalAd({
  variant = "banner",
  className = "",
}: EducationalAdProps) {
  const [closed, setClosed] = useState(false);
  // Pick preset based on variant
  const ad =
    variant === "sidebar"
      ? AD_PRESETS[3]
      : variant === "footer"
        ? AD_PRESETS[1]
        : variant === "card"
          ? AD_PRESETS[2]
          : AD_PRESETS[0];

  if (closed) return null;

  /* 1. HORIZONTAL BANNER VARIANT (For homepage section dividers) */
  if (variant === "banner") {
    return (
      <div
        className={`relative overflow-hidden rounded-md border border-[#2b2512] bg-gradient-to-r from-[#171206] via-[#211805] to-[#120e05] p-3.5 px-4 sm:px-6 lg:px-8 sm:p-4 text-xs transition-all ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded bg-[#ff9900]/15 border border-[#ff9900]/40 flex items-center justify-center text-[#ff9900] shrink-0">
              <Brain size={18} />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2">
                <span className="font-black text-white text-sm sm:text-base tracking-tight">
                  {ad.brand}
                </span>
                <span className="bg-[#38bdf8] text-black text-[9px] font-black px-1.5 py-0.2 rounded-sm uppercase tracking-wider">
                  {ad.badge}
                </span>
                <span className="hidden md:inline-block text-[#ff9900] text-[10px] font-bold uppercase tracking-wider">
                  • {ad.highlight}
                </span>
              </div>
              <p className="text-gray-300 text-xs sm:text-[13px]">
                {ad.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
            <Link
              href={ad.url}
              className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-xs px-4 py-2 rounded-sm transition-colors uppercase tracking-wider flex items-center shadow-sm"
            >
              <Zap size={13} className="mr-1.5 fill-black" />
              {ad.cta}
            </Link>
            <button
              type="button"
              onClick={() => setClosed(true)}
              className="p-1.5 text-gray-400 hover:text-white transition-colors"
              title="Close Ad"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* 2. SIDEBAR VERTICAL PLACEMENT (For desktop watch page) */
  if (variant === "sidebar") {
    return (
      <div
        className={`relative overflow-hidden rounded-md border border-[#2b2512] bg-gradient-to-b from-[#181307] via-[#211805] to-[#120d04] p-4 text-center space-y-3 shadow-lg ${className}`}
      >
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-[#ff9900] font-black tracking-widest uppercase flex items-center">
            <GraduationCap size={13} className="mr-1" /> {ad.category}
          </span>
          <span className="bg-[#38bdf8] text-black text-[9px] font-black px-1.5 py-0.2 rounded-sm uppercase tracking-wider">
            {ad.badge}
          </span>
        </div>

        <div className="space-y-1 py-1">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#ff9900]/15 border border-[#ff9900]/40 flex items-center justify-center text-[#ff9900]">
            <Sparkles size={20} />
          </div>
          <h4 className="text-base font-black text-white tracking-tight">
            {ad.brand}
          </h4>
          <p className="text-xs text-[#ff9900] font-bold">{ad.highlight}</p>
          <p className="text-xs text-gray-300 leading-relaxed max-w-xs mx-auto">
            {ad.tagline}
          </p>
        </div>

        <div className="pt-1">
          <Link
            href={ad.url}
            className="block w-full py-2 bg-[#ff9900] hover:bg-[#e68a00] text-black font-black text-xs rounded-sm transition-colors uppercase tracking-wider shadow"
          >
            {ad.cta}
          </Link>
          <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2">
            <span className="flex items-center">
              <ShieldCheck size={11} className="mr-0.5 text-[#ff9900]" /> 100%
              Consensual Knowledge
            </span>
            <button
              type="button"
              onClick={() => setClosed(true)}
              className="hover:text-white"
            >
              Hide Ad
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* 3. PRE-FOOTER TICKER VARIANT */
  if (variant === "footer") {
    return (
      <div
        className={`bg-[#0d0d10] border-t border-b border-[#202028] py-2.5 px-4 text-xs ${className}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-gray-300 min-w-0">
            <span className="bg-[#38bdf8] text-black text-[9px] font-black px-1.5 py-0.2 rounded-sm uppercase tracking-wider shrink-0">
              {ad.badge}
            </span>
            <span className="font-bold text-white shrink-0">{ad.brand}:</span>
            <span className="text-gray-400 truncate text-[11px] sm:text-xs">
              {ad.tagline}
            </span>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <Link
              href={ad.url}
              className="text-[#ff9900] hover:underline font-bold text-xs"
            >
              {ad.cta} →
            </Link>
            <button
              type="button"
              onClick={() => setClosed(true)}
              className="text-gray-400 hover:text-white"
              title="Dismiss"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* 4. CARD IN GRID (Alternative to PromoCard) */
  return (
    <div
      className={`relative group flex flex-col bg-gradient-to-br from-[#171206] via-[#211805] to-[#120d04] border border-[#ff9900]/30 rounded-sm overflow-hidden p-3 justify-between aspect-video ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[#ff9900] text-[10px] font-black tracking-widest uppercase flex items-center">
          <GraduationCap size={13} className="mr-1" /> {ad.category}
        </span>
        <span className="bg-[#38bdf8] text-black text-[9px] font-black px-1.5 py-0.2 rounded-sm uppercase tracking-wider">
          {ad.badge}
        </span>
      </div>

      <div className="space-y-0.5 text-center my-auto">
        <h4 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight">
          {ad.brand}
        </h4>
        <p className="text-sm font-bold text-[#ff9900]">{ad.highlight}</p>
        <p className="text-[11px] text-gray-300 line-clamp-2">{ad.tagline}</p>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-[#ff9900]/20 text-[10px]">
        <Link
          href={ad.url}
          className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-black px-2.5 py-1 rounded-sm transition-colors uppercase"
        >
          {ad.cta}
        </Link>
        <button
          type="button"
          onClick={() => setClosed(true)}
          className="text-gray-400 hover:text-white"
        >
          Hide Ad
        </button>
      </div>
    </div>
  );
}
