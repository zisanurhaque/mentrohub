import React from "react";
import Link from "next/link";
import { Collection } from "@/types";
import { Layers, Clock, ArrowRight } from "lucide-react";

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative flex flex-col bg-[#141418] hover:bg-[#1b1b22] border border-[#24242e] hover:border-[#ff9900]/60 rounded-lg overflow-hidden transition-all shadow"
    >
      {/* Thumbnail Stack Effect */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/50">
        <img
          src={collection.thumbnailUrl}
          alt={collection.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Video Count Tag */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center space-x-1.5 bg-black/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold border border-white/10">
          <Layers size={13} className="text-[#ff9900]" />
          <span>{collection.videoIds.length} Part Series</span>
        </div>

        {/* Total Duration */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center space-x-1 bg-black/90 text-gray-200 px-2 py-1 rounded text-xs font-mono font-semibold border border-white/10">
          <Clock size={11} className="text-[#ff9900]" />
          <span>{collection.totalDuration}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
        <div>
          <span className="text-[10px] font-black uppercase text-[#ff9900] tracking-wider">
            {collection.category} • {collection.difficulty}
          </span>
          <h3 className="text-base font-bold text-white group-hover:text-[#ff9900] transition-colors line-clamp-1 mt-1">
            {collection.title}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 mt-1">
            {collection.description}
          </p>
        </div>

        <div className="pt-2 border-t border-[#22222a] flex items-center justify-between text-xs font-bold text-[#ff9900]">
          <span>Start Learning Track</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
