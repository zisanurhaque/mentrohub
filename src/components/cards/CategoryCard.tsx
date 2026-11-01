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
      className="group block p-4 bg-[#141418] hover:bg-[#1c1c24] border border-[#23232c] hover:border-[#ff9900]/70 rounded-lg transition-all shadow-sm"
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2.5 rounded-md bg-[#1f1f28] group-hover:bg-[#ff9900] text-[#ff9900] group-hover:text-black transition-colors shrink-0">
          <Icon size={20} />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-white group-hover:text-[#ff9900] truncate transition-colors">
            {data.name}
          </h4>
          <span className="text-[11px] font-semibold text-gray-400">
            {data.videoCount} {data.videoCount === 1 ? "lesson" : "lessons"}
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
        {data.description}
      </p>
    </Link>
  );
}
