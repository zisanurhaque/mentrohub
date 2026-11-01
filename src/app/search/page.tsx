import React from "react";
import Link from "next/link";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import VideoCard from "@/components/cards/VideoCard";
import Pagination from "@/components/layout/Pagination";
import { getCategories, getVideos } from "@/lib/db";
import { Search, Filter, SlidersHorizontal, Sparkles, Frown } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    difficulty?: string;
    duration?: "short" | "medium" | "long" | "all";
    sortBy?: "views" | "newest" | "likes" | "relevant";
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const q = params.q || "";
  const category = params.category || "all";
  const difficulty = params.difficulty || "All Levels";
  const duration = params.duration || "all";
  const sortBy = params.sortBy || "relevant";
  const page = params.page ? parseInt(params.page, 10) : 1;

  const [categories, result] = await Promise.all([
    getCategories(),
    getVideos({
      q,
      category,
      difficulty,
      duration,
      sortBy,
      page,
      limit: 16,
    }),
  ]);

  return (
    <HomepageLayout>
      <Container className="py-6 sm:py-8 space-y-6">
        {/* Header & Search Bar */}
        <div className="space-y-4 border-b border-[#1f1f26] pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center">
                <Search className="mr-2 text-[#ff9900]" />
                {q ? `Results for "${q}"` : "Discover Knowledge"}
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Found {result.total} educational {result.total === 1 ? "lesson" : "lessons"} matching your intellectual appetite
              </p>
            </div>

            {/* Quick Sort Options */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-400 font-semibold flex items-center">
                <SlidersHorizontal size={13} className="mr-1 text-[#ff9900]" /> Sort:
              </span>
              <div className="flex items-center bg-[#121216] p-1 rounded-sm border border-[#22222a]">
                {[
                  { label: "Relevant", val: "relevant" },
                  { label: "Most Viewed", val: "views" },
                  { label: "Newest", val: "newest" },
                  { label: "Top Rated", val: "likes" },
                ].map((s) => (
                  <Link
                    key={s.val}
                    href={`/search?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty)}&duration=${duration}&sortBy=${s.val}`}
                    className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-colors ${
                      sortBy === s.val
                        ? "bg-[#ff9900] text-black font-bold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Pills Bar */}
          <div className="flex items-center flex-wrap gap-2 pt-2 text-xs">
            <span className="text-gray-400 font-semibold flex items-center mr-1">
              <Filter size={12} className="mr-1" /> Category:
            </span>
            <Link
              href={`/search?q=${encodeURIComponent(q)}&category=all&difficulty=${encodeURIComponent(difficulty)}&duration=${duration}&sortBy=${sortBy}`}
              className={`px-2.5 py-1 rounded-sm text-xs transition-colors ${
                category === "all"
                  ? "bg-[#ff9900] text-black font-bold"
                  : "bg-[#141418] text-gray-300 hover:bg-[#1f1f26]"
              }`}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/search?q=${encodeURIComponent(q)}&category=${encodeURIComponent(c.name)}&difficulty=${encodeURIComponent(difficulty)}&duration=${duration}&sortBy=${sortBy}`}
                className={`px-2.5 py-1 rounded-sm text-xs transition-colors ${
                  category.toLowerCase() === c.name.toLowerCase()
                    ? "bg-[#ff9900] text-black font-bold"
                    : "bg-[#141418] text-gray-300 hover:bg-[#1f1f26]"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          {/* Difficulty & Duration Filter Pills */}
          <div className="flex items-center flex-wrap gap-3 pt-1 text-xs text-gray-400">
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold">Difficulty:</span>
              {["All Levels", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
                <Link
                  key={lvl}
                  href={`/search?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(lvl)}&duration=${duration}&sortBy=${sortBy}`}
                  className={`px-2 py-0.5 rounded-sm text-[11px] ${
                    difficulty === lvl
                      ? "bg-white text-black font-bold"
                      : "bg-[#141418] text-gray-400 hover:text-white"
                  }`}
                >
                  {lvl}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="font-semibold">Duration:</span>
              {[
                { label: "All", val: "all" },
                { label: "< 10 min", val: "short" },
                { label: "10-30 min", val: "medium" },
                { label: "> 30 min", val: "long" },
              ].map((dur) => (
                <Link
                  key={dur.val}
                  href={`/search?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty)}&duration=${dur.val}&sortBy=${sortBy}`}
                  className={`px-2 py-0.5 rounded-sm text-[11px] ${
                    duration === dur.val
                      ? "bg-white text-black font-bold"
                      : "bg-[#141418] text-gray-400 hover:text-white"
                  }`}
                >
                  {dur.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Video Results Grid */}
        {result.videos.length === 0 ? (
          <div className="p-12 text-center bg-[#121216] border border-[#1f1f26] rounded-sm space-y-4 my-8">
            <Frown className="w-12 h-12 text-[#ff9900] mx-auto" />
            <h3 className="text-xl font-bold text-white">
              No results. Even our smartest people couldn&apos;t find that one.
            </h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Your search history is looking suspiciously productive.
              Try searching for popular topics like <span className="text-[#ff9900]">Python</span>,{" "}
              <span className="text-[#ff9900]">Calculus</span>, or{" "}
              <span className="text-[#ff9900]">Linear Algebra</span>.
            </p>
            <div className="pt-2">
              <Link
                href="/search"
                className="inline-flex items-center px-4 py-2 bg-[#ff9900] text-black font-bold text-xs rounded-sm hover:bg-[#e68a00] transition-colors uppercase tracking-wider"
              >
                <Sparkles size={13} className="mr-1.5" />
                Reset Search Filters
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {result.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}

        {/* Centered Pagination bar matching Screenshot 3 */}
        {result.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={result.totalPages}
            buildPageUrl={(p) =>
              `/search?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty)}&duration=${duration}&sortBy=${sortBy}&page=${p}`
            }
          />
        )}
      </Container>
    </HomepageLayout>
  );
}
