"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Video } from "@/types";
import { CheckCircle2, ThumbsUp, Eye, Sparkles } from "lucide-react";
import { formatRelativeTime, formatViews, getApprovalRating } from "@/lib/formatters";

interface VideoCardProps {
  video: Video;
  priority?: boolean;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [imgSrc, setImgSrc] = useState(
    video.thumbnailUrl || `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
  );
  const [isHovered, setIsHovered] = useState(false);
  const rating = getApprovalRating(video.likes, video.dislikes);

  return (
    <div
      className="group flex flex-col bg-[#141417] hover:bg-[#1b1b20] border border-[#24242c] hover:border-[#ff9900]/60 rounded-md overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Wrapper */}
      <Link href={`/watch/${video.id}`} className="relative block aspect-video w-full overflow-hidden bg-black/60">
        <img
          src={imgSrc}
          alt={video.title}
          onError={() => setImgSrc(`https://i.ytimg.com/vi/${video.youtubeId}/mqdefault.jpg`)}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-105 opacity-90" : "scale-100 opacity-95"
          }`}
          loading="lazy"
        />

        {/* HD & Featured Badges */}
        <div className="absolute top-2 left-2 flex items-center space-x-1.5 pointer-events-none">
          <span className="bg-black/80 backdrop-blur-sm text-[#ff9900] text-[10px] font-black px-1.5 py-0.5 rounded border border-[#ff9900]/40 tracking-wider">
            HD
          </span>
          {video.featured && (
            <span className="bg-[#ff9900] text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center tracking-tight shadow">
              <Sparkles size={10} className="mr-0.5" />
              HOT
            </span>
          )}
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 pointer-events-none">
          <span className="bg-black/90 text-white font-mono text-xs font-bold px-1.5 py-0.5 rounded border border-white/10 shadow-sm">
            {video.duration}
          </span>
        </div>

        {/* Subtle orange hover progress bar effect */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff9900] transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </Link>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between flex-1 space-y-2">
        <div className="space-y-1">
          <Link href={`/watch/${video.id}`} className="block">
            <h3
              className="text-sm font-bold text-gray-100 line-clamp-2 leading-snug group-hover:text-[#ff9900] transition-colors"
              title={video.title}
            >
              {video.title}
            </h3>
          </Link>

          {/* Instructor & Verification */}
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <span className="font-medium truncate max-w-[170px] hover:text-white transition-colors">
              {video.instructor.name}
            </span>
            {video.instructor.verified && (
              <span title="Verified Educator">
                <CheckCircle2 size={13} className="text-[#ff9900] shrink-0" />
              </span>
            )}
          </div>
        </div>

        {/* Video Stats & Engagement */}
        <div className="pt-1 border-t border-[#22222a] flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-gray-300 font-medium">
              <Eye size={12} className="mr-1 text-gray-500" />
              {formatViews(video.views)}
            </span>
            <span className="text-gray-600">•</span>
            <span>{formatRelativeTime(video.publishedAt)}</span>
          </div>

          <div className="flex items-center space-x-1 text-[#ff9900] font-semibold bg-[#222228] px-1.5 py-0.5 rounded text-[10px]">
            <ThumbsUp size={10} className="fill-[#ff9900] stroke-none" />
            <span>{rating}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
