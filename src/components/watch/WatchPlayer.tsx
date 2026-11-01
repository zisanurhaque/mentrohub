"use client";

import React, { useState } from "react";
import { AlertCircle, ExternalLink } from "lucide-react";

interface WatchPlayerProps {
  youtubeId: string;
  title: string;
}

export default function WatchPlayer({ youtubeId, title }: WatchPlayerProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-[#24242c] shadow-2xl">
      {!hasError ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onError={() => setHasError(true)}
          className="w-full h-full border-0"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#121216]">
          <AlertCircle className="w-12 h-12 text-[#ff9900]" />
          <h3 className="text-lg font-bold text-white">Embed Restricted by Provider</h3>
          <p className="text-xs text-gray-400 max-w-md">
            This YouTube video has restricted direct iframe playback in your browser environment.
            You can watch it directly on YouTube.
          </p>
          <a
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-[#ff9900] text-black text-xs font-bold rounded-md hover:bg-[#e68a00] transition-colors"
          >
            Watch directly on YouTube <ExternalLink size={14} className="ml-1.5" />
          </a>
        </div>
      )}
    </div>
  );
}
