import React from "react";
import Link from "next/link";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import Banner from "@/components/pages/Home/Banner";
import VideoCard from "@/components/cards/VideoCard";
import PromoCard from "@/components/cards/PromoCard";
import CategoryCard from "@/components/cards/CategoryCard";
import CollectionCard from "@/components/cards/CollectionCard";
import Pagination from "@/components/layout/Pagination";
import EducationalAd from "@/components/ads/EducationalAd";
import { getCategories, getCollections, getVideos } from "@/lib/db";
import {
  Flame,
  Eye,
  Sparkles,
  Layers,
  ArrowRight,
  FolderTree,
} from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [trendingData, mostWatchedData, recentData, categories, collections] =
    await Promise.all([
      getVideos({ sortBy: "relevant", limit: 8 }),
      getVideos({ sortBy: "views", limit: 8 }),
      getVideos({ sortBy: "newest", limit: 4 }),
      getCategories(),
      getCollections(),
    ]);

  return (
    <HomepageLayout>
      {/* Hero Exploration Banner */}
      <Banner />

      <Container className="py-8 space-y-12">
        {/* Section 1: Main Video Discovery Grid (Exact Match to Screenshot 2 & 3) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3">
            <div className="flex items-center space-x-2.5">
              <span className="p-1.5 rounded-sm bg-[#ff9900]/10 text-[#ff9900]">
                <Flame size={18} className="fill-[#ff9900]" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center">
                  Trending Lessons
                </h2>
                <p className="text-xs text-gray-400">
                  What consenting learners are passionately binging right now
                </p>
              </div>
            </div>

            <Link
              href="/search?sortBy=views"
              className="text-xs font-bold text-[#ff9900] hover:text-[#e68a00] flex items-center group"
            >
              View all <ArrowRight size={13} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Grid matching Screenshot 2 & 3: 3 videos + 1 Promo Card, then 4 videos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trendingData.videos.slice(0, 3).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
            {/* Parody Educational Promo Card in 4th slot */}
            <PromoCard />

            {/* Next 4 videos */}
            {trendingData.videos.slice(3, 7).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* Centered Pagination bar matching Screenshot 3 */}
          <Pagination
            currentPage={1}
            totalPages={4}
            buildPageUrl={(page) => `/search?page=${page}`}
          />
        </section>

        {/* Mid-Page Promotional Banner Placement */}
        <EducationalAd variant="banner" />

        {/* Section 2: Popular Categories */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3">
            <div className="flex items-center space-x-2.5">
              <span className="p-1.5 rounded-sm bg-[#1c1c24] text-[#ff9900]">
                <FolderTree size={18} />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Popular Categories
                </h2>
                <p className="text-xs text-gray-400">
                  Select your intellectual discipline: code, calculus, deep learning, or finance
                </p>
              </div>
            </div>

            <Link
              href="/categories"
              className="text-xs font-bold text-[#ff9900] hover:text-[#e68a00] flex items-center group"
            >
              All disciplines <ArrowRight size={13} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} data={cat} />
            ))}
          </div>
        </section>

        {/* Section 3: Most Watched Knowledge */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3">
            <div className="flex items-center space-x-2.5">
              <span className="p-1.5 rounded-sm bg-[#ff9900]/10 text-[#ff9900]">
                <Eye size={18} />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Most Watched Knowledge
                </h2>
                <p className="text-xs text-gray-400">
                  The internet&apos;s most viewed educational breakdowns of all time • Warning: May cause excessive learning
                </p>
              </div>
            </div>

            <Link
              href="/search?sortBy=views"
              className="text-xs font-bold text-[#ff9900] hover:text-[#e68a00] flex items-center group"
            >
              See leaderboard <ArrowRight size={13} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mostWatchedData.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        {/* Section 4: Curated Series / Collections */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3">
            <div className="flex items-center space-x-2.5">
              <span className="p-1.5 rounded-sm bg-[#1c1c24] text-[#ff9900]">
                <Layers size={18} />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Curated Collections
                </h2>
                <p className="text-xs text-gray-400">
                  Multi-part learning sequences designed for complete subject mastery from scratch
                </p>
              </div>
            </div>

            <Link
              href="/collections"
              className="text-xs font-bold text-[#ff9900] hover:text-[#e68a00] flex items-center group"
            >
              All tracks <ArrowRight size={13} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collections.slice(0, 3).map((col) => (
              <CollectionCard key={col.id} collection={col} />
            ))}
          </div>
        </section>

        {/* Section 5: Freshly Uploaded Brain Food */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3">
            <div className="flex items-center space-x-2.5">
              <span className="p-1.5 rounded-sm bg-[#ff9900]/10 text-[#ff9900]">
                <Sparkles size={18} />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Freshly Uploaded Brain Food
                </h2>
                <p className="text-xs text-gray-400">
                  Straight out of the lecture halls and straight into your hippocampus
                </p>
              </div>
            </div>

            <Link
              href="/search?sortBy=newest"
              className="text-xs font-bold text-[#ff9900] hover:text-[#e68a00] flex items-center group"
            >
              Latest uploads <ArrowRight size={13} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentData.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      </Container>
    </HomepageLayout>
  );
}
