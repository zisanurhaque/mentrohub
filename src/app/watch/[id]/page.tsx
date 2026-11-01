import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import VideoCard from "@/components/cards/VideoCard";
import WatchPlayer from "@/components/watch/WatchPlayer";
import WatchActions from "@/components/watch/WatchActions";
import StudyNotes from "@/components/watch/StudyNotes";
import WatchComments from "@/components/watch/WatchComments";
import { getVideoById, getVideos } from "@/lib/db";
import { formatViews, formatRelativeTime } from "@/lib/formatters";
import { CheckCircle2, Eye, Calendar, Sparkles, CheckSquare, Tag } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const video = await getVideoById(id);

  if (!video) {
    return {
      title: "Lesson Not Found — MentroHub",
    };
  }

  return {
    title: `${video.title} — MentroHub`,
    description: video.description.slice(0, 160),
    openGraph: {
      title: video.title,
      description: video.description,
      images: [{ url: video.thumbnailUrl }],
      type: "video.other",
    },
  };
}

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  const video = await getVideoById(id);

  if (!video) {
    notFound();
  }

  // Related videos
  const relatedData = await getVideos({
    category: video.category,
    limit: 8,
  });
  const relatedVideos = relatedData.videos.filter((v) => v.id !== video.id);

  return (
    <HomepageLayout>
      <Container className="py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Watch Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Player */}
            <WatchPlayer youtubeId={video.youtubeId} title={video.title} />

            {/* Video Meta & Actions */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#ff9900]/10 text-[#ff9900] text-[10px] font-black uppercase px-2 py-0.5 rounded border border-[#ff9900]/30 tracking-wider">
                    {video.category}
                  </span>
                  <span className="bg-[#1f1f28] text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded border border-[#2b2b36]">
                    {video.difficulty}
                  </span>
                  {video.featured && (
                    <span className="bg-[#ff9900] text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center shadow-sm">
                      <Sparkles size={10} className="mr-0.5" />
                      FEATURED LESSON
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                  {video.title}
                </h1>
              </div>

              {/* Stats Bar & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-b border-[#202028] py-3">
                <div className="flex items-center space-x-3 text-xs text-gray-400">
                  <span className="flex items-center text-gray-200 font-semibold">
                    <Eye size={14} className="mr-1.5 text-[#ff9900]" />
                    {formatViews(video.views)} views
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Calendar size={13} className="mr-1.5 text-gray-400" />
                    {formatRelativeTime(video.publishedAt)}
                  </span>
                </div>

                <WatchActions
                  videoId={video.id}
                  initialLikes={video.likes}
                  initialDislikes={video.dislikes}
                />
              </div>

              {/* Educator / Instructor Card */}
              <div className="flex items-center justify-between p-3.5 bg-[#141418] border border-[#22222a] rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#202028] border border-[#2f2f3d] flex items-center justify-center text-white font-black text-sm">
                    {video.instructor.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-bold text-white">
                        {video.instructor.name}
                      </span>
                      {video.instructor.verified && (
                        <CheckCircle2 size={14} className="text-[#ff9900]" />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Channel: {video.instructor.channel || "Verified Creator"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-3.5 py-1.5 bg-[#ff9900] hover:bg-[#e68a00] text-black text-xs font-black rounded-md transition-colors shadow"
                >
                  Follow Channel
                </button>
              </div>

              {/* Description & Learning Objectives */}
              <div className="p-4 bg-[#141418] border border-[#22222a] rounded-lg space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Lesson Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                    {video.description}
                  </p>
                </div>

                {video.learningObjectives && video.learningObjectives.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#1f1f26]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#ff9900]">
                      Key Learning Objectives
                    </h4>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {video.learningObjectives.map((obj, i) => (
                        <li key={i} className="flex items-start">
                          <CheckSquare size={14} className="text-[#ff9900] mr-2 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {video.tags && video.tags.length > 0 && (
                  <div className="pt-2 border-t border-[#1f1f26] flex items-center flex-wrap gap-1.5">
                    <span className="text-[11px] text-gray-400 font-semibold mr-1 flex items-center">
                      <Tag size={12} className="mr-1" /> Tags:
                    </span>
                    {video.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/search?q=${encodeURIComponent(tag)}`}
                        className="text-[11px] text-gray-400 hover:text-[#ff9900] bg-[#1a1a20] hover:bg-[#252530] px-2 py-0.5 rounded border border-[#272732] transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Study Notes Interactive Section */}
              <StudyNotes videoId={video.id} />

              {/* Comments & Discussion */}
              <WatchComments videoId={video.id} />
            </div>
          </div>

          {/* Right Sidebar: Related Videos */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#22222a] pb-2">
                <h3 className="text-sm font-bold text-white flex items-center">
                  <Sparkles size={15} className="text-[#ff9900] mr-1.5" />
                  Recommended Next
                </h3>
                <span className="text-xs text-gray-400 font-semibold">
                  {relatedVideos.length} lessons
                </span>
              </div>

              <div className="space-y-3">
                {relatedVideos.map((item) => (
                  <VideoCard key={item.id} video={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </HomepageLayout>
  );
}
