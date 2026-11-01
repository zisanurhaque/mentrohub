import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import VideoCard from "@/components/cards/VideoCard";
import { getCollectionBySlug } from "@/lib/db";
import { ArrowLeft, Clock, Layers, PlayCircle } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const firstVideoId = collection.videos[0]?.id;

  return (
    <HomepageLayout>
      <Container className="py-8 space-y-8">
        <div>
          <Link
            href="/collections"
            className="inline-flex items-center text-xs font-bold text-gray-400 hover:text-[#ff9900] transition-colors"
          >
            <ArrowLeft size={13} className="mr-1.5" /> Back to Collections
          </Link>
        </div>

        {/* Collection Header Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 bg-gradient-to-r from-[#171720] via-[#1a1a24] to-[#14141a] border border-[#262634] rounded-xl">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2 text-[11px] font-black uppercase text-[#ff9900] tracking-wider">
              <Layers size={13} />
              <span>
                {collection.category} • {collection.difficulty}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {collection.title}
            </h1>
            <p className="text-sm font-semibold text-gray-200">
              {collection.tagline}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {collection.description}
            </p>

            <div className="pt-2 flex items-center space-x-4 text-xs text-gray-300">
              <span className="flex items-center">
                <Layers size={14} className="text-[#ff9900] mr-1.5" />
                {collection.videos.length} Episodes
              </span>
              <span>•</span>
              <span className="flex items-center font-mono">
                <Clock size={14} className="text-[#ff9900] mr-1.5" />
                {collection.totalDuration}
              </span>
            </div>

            {firstVideoId && (
              <div className="pt-3">
                <Link
                  href={`/watch/${firstVideoId}`}
                  className="inline-flex items-center bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-xs px-5 py-2.5 rounded-md transition-colors shadow"
                >
                  <PlayCircle size={15} className="mr-2" />
                  Start from Episode 1
                </Link>
              </div>
            )}
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden border border-[#2b2b38] hidden md:block">
            <img
              src={collection.thumbnailUrl}
              alt={collection.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Sequenced Episodes Grid */}
        <div className="space-y-4">
          <div className="border-b border-[#22222a] pb-2">
            <h2 className="text-base font-bold text-white flex items-center">
              Curriculum Sequence ({collection.videos.length} Lessons)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {collection.videos.map((video, idx) => (
              <div key={video.id} className="relative">
                <div className="absolute top-2 right-2 z-20 bg-black/80 text-[#ff9900] font-black text-[10px] px-2 py-0.5 rounded border border-white/10">
                  Part {idx + 1}
                </div>
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </HomepageLayout>
  );
}
