import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import VideoCard from "@/components/cards/VideoCard";
import { getCategoryBySlug, getVideos } from "@/lib/db";
import { ArrowLeft, BookOpen, Layers } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ difficulty?: string; sortBy?: "views" | "newest" | "likes" | "relevant" }>;
}

export default async function CategoryDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { difficulty, sortBy = "views" } = await searchParams;

  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const { videos, total } = await getVideos({
    category: category.name,
    difficulty,
    sortBy,
    limit: 24,
  });

  return (
    <HomepageLayout>
      <Container className="py-6 sm:py-8 space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/categories"
            className="inline-flex items-center text-xs font-bold text-gray-400 hover:text-[#ff9900] transition-colors"
          >
            <ArrowLeft size={13} className="mr-1.5" /> Back to Categories
          </Link>
        </div>

        {/* Category Header Banner */}
        <div className="p-6 sm:p-8 bg-[#121216] border border-[#1f1f26] rounded-sm space-y-3">
          <div className="flex items-center space-x-2 text-[11px] font-black uppercase text-[#ff9900] tracking-wider">
            <Layers size={13} />
            <span>Category Hub • {total} Available Lessons</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            {category.description}
          </p>

          {/* Quick Filters */}
          <div className="flex items-center flex-wrap gap-2 pt-3 border-t border-[#1b1b22] text-xs">
            <span className="text-gray-400 font-semibold mr-1">Difficulty:</span>
            {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => {
              const active = (!difficulty && lvl === "All") || difficulty === lvl;
              return (
                <Link
                  key={lvl}
                  href={`/categories/${category.slug}${lvl === "All" ? "" : `?difficulty=${lvl}`}`}
                  className={`px-2.5 py-1 rounded-sm text-xs transition-colors ${
                    active
                      ? "bg-[#ff9900] text-black font-bold"
                      : "bg-[#181820] text-gray-300 hover:bg-[#22222a]"
                  }`}
                >
                  {lvl}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Video Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#1f1f26] pb-2">
            <h2 className="text-base font-bold text-white flex items-center">
              <BookOpen size={16} className="text-[#ff9900] mr-2" />
              All {category.name} Lessons ({videos.length})
            </h2>
          </div>

          {videos.length === 0 ? (
            <div className="p-10 text-center bg-[#121216] border border-[#1f1f26] rounded-sm text-gray-400 text-xs">
              No lessons match this difficulty level currently. Try selecting &quot;All&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </HomepageLayout>
  );
}
