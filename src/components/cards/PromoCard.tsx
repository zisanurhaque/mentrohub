"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Zap } from "lucide-react";

export default function PromoCard() {
  return (
    <div className="relative group flex flex-col bg-gradient-to-br from-[#1c1508] via-[#241a05] to-[#140f03] border border-[#ff9900]/40 rounded-sm overflow-hidden p-3 justify-between aspect-video shadow-md">
      {/* Top Bar with AD badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-[#ff9900] text-[10px] font-black tracking-widest uppercase">
          <GraduationCap size={14} />
          <span>OPENCOURSEWARE</span>
        </div>
        <span className="bg-[#38bdf8] text-black text-[9px] font-black px-1.5 py-0.2 rounded-sm uppercase tracking-wider">
          Ad
        </span>
      </div>

      {/* Main Provocative Promo Text */}
      <div className="space-y-0.5 text-center my-auto">
        <h4 className="text-xl sm:text-2xl font-black text-white tracking-tighter drop-shadow leading-none">
          UNLIMITED <span className="text-[#ff9900]">CALCULUS</span>
        </h4>
        <p className="text-2xl sm:text-3xl font-black text-[#ff9900] tracking-tight leading-none drop-shadow">
          $0.00 FOR LIFE
        </p>
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
          Hot Single Algorithms In Your Local Host
        </p>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between pt-1 border-t border-[#ff9900]/20 text-[10px]">
        <Link
          href="/collections/mathematics-made-simple"
          className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-black px-2.5 py-1 rounded-sm transition-colors uppercase flex items-center shadow-sm"
        >
          <Zap size={11} className="mr-1 fill-black" /> Claim Knowledge
        </Link>
        <span className="text-[#888888] hover:text-gray-300 cursor-pointer text-[10px]">
          Remove Ads
        </span>
      </div>
    </div>
  );
}
