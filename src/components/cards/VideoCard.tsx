"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Video } from "@/types";
import { CheckCircle2, MoreVertical, Eye, Sparkles } from "lucide-react";
import { formatViews } from "@/lib/formatters";

interface VideoCardProps {
  video: Video;
  priority?: boolean;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [imgSrc, setImgSrc] = useState(
    video.thumbnailUrl || `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
  );
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group flex flex-col bg-[#0e0e10] hover:bg-[#161619] transition-colors rounded-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 16:9 Thumbnail Wrapper */}
      <Link
        href={`/watch/${video.id}`}
        className="relative block aspect-video w-full overflow-hidden bg-black/80"
      >
        <img
          src={imgSrc}
          alt={video.title}
          onError={() => setImgSrc(`https://i.ytimg.com/vi/${video.youtubeId}/mqdefault.jpg`)}
          className={`w-full h-full object-cover transition-transform duration-200 ${
            isHovered ? "scale-105 opacity-90" : "scale-100 opacity-95"
          }`}
          loading="lazy"
        />

        {/* Top Badges: HD & Featured */}
        <div className="absolute top-1.5 left-1.5 flex items-center space-x-1 pointer-events-none">
          <span className="bg-black/90 text-[#ff9900] text-[9px] font-black px-1 py-0.5 rounded-sm border border-[#ff9900]/40 tracking-wider">
            HD
          </span>
          {video.featured && (
            <span className="bg-[#ff9900] text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm flex items-center shadow">
              <Sparkles size={9} className="mr-0.5" />
              HOT
            </span>
          )}
        </div>

        {/* Duration Badge in Bottom Right (Exact Match to Reference Screenshot) */}
        <div className="absolute bottom-1.5 right-1.5 pointer-events-none">
          <span className="bg-black/95 text-white font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-sm border border-white/10 shadow-sm">
            {video.duration}
          </span>
        </div>

        {/* Hover orange indicator bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ff9900] transition-opacity duration-150 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </Link>

      {/* Meta Area: Layout strictly mirrors reference screenshot */}
      <div className="pt-2 pb-1.5 px-0.5 flex flex-col space-y-1">
        {/* Line 1: Creator Name + Verified Check on Left | View Count on Right */}
        <div className="flex items-center justify-between text-xs text-[#8a8a8a] leading-none">
          <div className="flex items-center space-x-1 min-w-0 pr-2">
            <span className="font-medium text-gray-300 hover:text-white truncate max-w-[140px] sm:max-w-[160px]">
              {video.instructor.name}
            </span>
            {video.instructor.verified && (
              <span title="Verified Educator" className="shrink-0">
                <CheckCircle2 size={12} className="text-[#38bdf8] fill-[#38bdf8]/10" />
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1 shrink-0 text-[#8a8a8a] font-normal text-[11px]">
            <Eye size={11} className="text-[#666666]" />
            <span>{formatViews(video.views)}</span>
          </div>
        </div>

        {/* Line 2: Video Title on Left | Three Dots Menu on Right */}
        <div className="flex items-start justify-between gap-1">
          <Link href={`/watch/${video.id}`} className="block flex-1 min-w-0">
            <h3
              className="text-xs sm:text-[13px] font-bold text-[#e2e2e8] group-hover:text-[#ff9900] line-clamp-2 leading-tight transition-colors"
              title={video.title}
            >
              {video.title}
            </h3>
          </Link>

          <button
            type="button"
            className="text-[#666666] hover:text-white p-0.5 shrink-0 transition-colors"
            title="More Options"
          >
            <MoreVertical size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
