import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  showTagline?: boolean;
}

export default function BrandLogo({
  size = "md",
  href = "/",
  className = "",
  showTagline = false,
}: BrandLogoProps) {
  const sizeClasses = {
    sm: {
      text: "text-xl",
      badge: "text-xs px-1.5 py-0.5",
      gap: "gap-1",
    },
    md: {
      text: "text-2xl sm:text-[26px]",
      badge: "text-xs sm:text-sm px-2 py-0.5",
      gap: "gap-1",
    },
    lg: {
      text: "text-3xl sm:text-4xl",
      badge: "text-sm sm:text-base px-2.5 py-1",
      gap: "gap-1.5",
    },
  }[size];

  const content = (
    <div className={`inline-flex items-center select-none group ${className}`}>
      <span
        className={`font-bold tracking-tight text-white transition-colors group-hover:text-gray-100 ${sizeClasses.text}`}
      >
        Mentro
      </span>
      <span
        className={`bg-[#ff9900] text-black font-bold uppercase rounded-md tracking-tight leading-none transition-all group-hover:bg-[#e68a00] shadow-sm ml-1 ${sizeClasses.badge}`}
      >
        HUB
      </span>
      {showTagline && (
        <span className="hidden sm:inline-block text-[10px] font-medium text-gray-400 ml-2.5 tracking-wider uppercase border-l border-gray-700 pl-2.5">
          Educational Entertainment
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm">
        {content}
      </Link>
    );
  }

  return content;
}
