import React from "react";
import Link from "next/link";
import { Category } from "@/types";
import {
  Code2,
  BrainCircuit,
  Binary,
  TrendingUp,
  Atom,
  FileSpreadsheet,
  Folder,
} from "lucide-react";

interface PropsType {
  data: Category;
}

const iconMap: Record<string, React.ElementType> = {
  Code2,
  BrainCircuit,
  Binary,
  TrendingUp,
  Atom,
  FileSpreadsheet,
};

export default function CategoryCard({ data }: PropsType) {
  const Icon = iconMap[data.iconName] || Folder;

  return (
    <Link
      href={`/categories/${data.slug}`}
      className="group block p-3.5 sm:p-4 bg-[#121216] hover:bg-[#1a1a20] border border-[#1f1f26] hover:border-[#ff9900]/70 rounded-sm transition-all shadow-sm"
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 sm:p-2.5 rounded-sm bg-[#1a1a22] group-hover:bg-[#ff9900] text-[#ff9900] group-hover:text-black transition-colors shrink-0">
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#ff9900] truncate transition-colors">
            {data.name}
          </h4>
          <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400">
            {data.videoCount} {data.videoCount === 1 ? "lesson" : "lessons"}
          </span>
        </div>
      </div>
      <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
        {data.description}
      </p>
    </Link>
  );
}
