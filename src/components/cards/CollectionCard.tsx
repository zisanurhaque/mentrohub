"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Collection } from "@/types";
import { Layers, Clock, ArrowRight } from "lucide-react";

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const [imgSrc, setImgSrc] = useState(
    collection.thumbnailUrl ||
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80"
  );

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative flex flex-col bg-[#121216] hover:bg-[#1a1a20] border border-[#1f1f26] hover:border-[#ff9900]/70 rounded-sm overflow-hidden transition-all shadow-sm"
    >
      {/* Thumbnail Stack Effect */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/60">
        <img
          src={imgSrc}
          alt={collection.title}
          onError={() =>
            setImgSrc(
              "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80"
            )
          }
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Video Count Tag */}
        <div className="absolute bottom-2 left-2 flex items-center space-x-1.5 bg-black/90 backdrop-blur-sm text-white px-2 py-0.5 rounded-sm text-[11px] font-bold border border-white/10">
          <Layers size={12} className="text-[#ff9900]" />
          <span>{collection.videoIds.length} Part Series</span>
        </div>

        {/* Total Duration */}
        <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/90 text-gray-200 px-2 py-0.5 rounded-sm text-[11px] font-mono font-semibold border border-white/10">
          <Clock size={11} className="text-[#ff9900]" />
          <span>{collection.totalDuration}</span>
        </div>
      </div>

      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-2">
        <div>
          <span className="text-[10px] font-black uppercase text-[#ff9900] tracking-wider">
            {collection.category} • {collection.difficulty}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#ff9900] transition-colors line-clamp-1 mt-1">
            {collection.title}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
            {collection.description}
          </p>
        </div>

        <div className="pt-2 border-t border-[#1a1a22] flex items-center justify-between text-xs text-gray-400 group-hover:text-[#ff9900] transition-colors font-semibold">
          <span>Start Curriculum</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
