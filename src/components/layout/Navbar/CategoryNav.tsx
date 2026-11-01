"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Flame, Code2, BrainCircuit, Binary, TrendingUp, Atom, FileSpreadsheet, LayoutGrid } from "lucide-react";

const NAV_ITEMS = [
  { label: "All Lessons", href: "/", icon: LayoutGrid },
  { label: "Trending", href: "/search?sortBy=views", icon: Flame },
  { label: "Coding", href: "/categories/programming", icon: Code2 },
  { label: "AI & ML", href: "/categories/artificial-intelligence", icon: BrainCircuit },
  { label: "Mathematics", href: "/categories/mathematics", icon: Binary },
  { label: "High Finance", href: "/categories/finance", icon: TrendingUp },
  { label: "Pure Science", href: "/categories/science", icon: Atom },
  { label: "Productivity", href: "/categories/productivity", icon: FileSpreadsheet },
];

export default function CategoryNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isCurrent = (href: string) => {
    if (href === "/") {
      return pathname === "/" && !searchParams.get("sortBy");
    }
    if (href.includes("?")) {
      const [path, query] = href.split("?");
      const [paramKey, paramVal] = query.split("=");
      return pathname === path && searchParams.get(paramKey) === paramVal;
    }
    return pathname === href;
  };

  return (
    <div className="bg-[#121215] border-b border-[#202026] overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1.5 py-2 whitespace-nowrap">
          {NAV_ITEMS.map((item) => {
            const active = isCurrent(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  active
                    ? "bg-[#ff9900] text-black shadow-sm font-bold"
                    : "text-gray-300 hover:text-white hover:bg-[#202027]"
                }`}
              >
                <Icon size={13} className={`mr-1.5 ${active ? "text-black" : "text-[#ff9900]"}`} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
