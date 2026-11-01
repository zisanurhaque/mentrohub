import React from "react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildPageUrl: (page: number) => string;
}

export default function Pagination({
  currentPage,
  totalPages,
  buildPageUrl,
}: PaginationProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center space-x-1.5 py-8 text-sm">
      {/* Prev Button */}
      {hasPrev ? (
        <Link
          href={buildPageUrl(currentPage - 1)}
          className="bg-[#18181a] hover:bg-[#242428] text-white font-black px-4 py-2 rounded-sm transition-colors"
        >
          Prev
        </Link>
      ) : (
        <span className="bg-[#18181a] text-[#4d4d4d] font-black px-4 py-2 rounded-sm cursor-not-allowed select-none">
          Prev
        </span>
      )}

      {/* Page Numbers */}
      {[1, 2, 3, 4, 5].map((pageNum) => {
        if (pageNum > totalPages && totalPages > 1) return null;
        const isActive = pageNum === currentPage;
        return (
          <Link
            key={pageNum}
            href={buildPageUrl(pageNum)}
            className={`font-black px-3.5 py-2 rounded-sm transition-colors ${
              isActive
                ? "bg-[#ff9900] text-black shadow-sm"
                : "bg-[#18181a] hover:bg-[#242428] text-gray-200"
            }`}
          >
            {pageNum}
          </Link>
        );
      })}

      {totalPages > 5 && (
        <>
          <span className="text-gray-500 px-1 font-bold">...</span>
          <Link
            href={buildPageUrl(totalPages)}
            className={`font-black px-3.5 py-2 rounded-sm transition-colors ${
              totalPages === currentPage
                ? "bg-[#ff9900] text-black"
                : "bg-[#18181a] hover:bg-[#242428] text-gray-200"
            }`}
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next Button (Identical to Screenshot 3: Bold Orange Rectangular Button) */}
      {hasNext ? (
        <Link
          href={buildPageUrl(currentPage + 1)}
          className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-black px-6 py-2 rounded-sm transition-colors uppercase tracking-wider shadow"
        >
          Next
        </Link>
      ) : (
        <span className="bg-[#ff9900]/40 text-black/50 font-black px-6 py-2 rounded-sm cursor-not-allowed uppercase tracking-wider select-none">
          Next
        </span>
      )}
    </div>
  );
}
