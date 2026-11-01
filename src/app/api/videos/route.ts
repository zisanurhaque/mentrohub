import { NextRequest, NextResponse } from "next/server";
import { createVideo, getVideos } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import { DifficultyLevel } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || undefined;
    const category = searchParams.get("category") || undefined;
    const difficulty = searchParams.get("difficulty") || undefined;
    const duration = (searchParams.get("duration") as "short" | "medium" | "long" | "all") || undefined;
    const sortBy = (searchParams.get("sortBy") as "views" | "newest" | "likes" | "relevant") || undefined;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 24;
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
    const featuredOnly = searchParams.get("featured") === "true";

    const result = await getVideos({
      q,
      category,
      difficulty,
      duration,
      sortBy,
      limit,
      page,
      featuredOnly,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/videos error:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      title,
      description,
      youtubeUrl,
      category,
      instructorName,
      instructorChannel,
      difficulty,
      duration,
      durationSeconds,
      tags,
      featured,
      learningObjectives,
      prerequisites,
    } = body;

    if (!title || !youtubeUrl || !category || !instructorName) {
      return NextResponse.json(
        { error: "Title, YouTube URL, Category, and Instructor are required" },
        { status: 400 }
      );
    }

    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL or ID format" },
        { status: 400 }
      );
    }

    const video = await createVideo({
      title,
      description: description || "",
      youtubeId,
      thumbnailUrl: getYouTubeThumbnail(youtubeId),
      instructor: {
        name: instructorName,
        channel: instructorChannel || instructorName,
        verified: true,
      },
      category,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map((s: string) => s.trim()) : []),
      duration: duration || "10:00",
      durationSeconds: durationSeconds || 600,
      difficulty: (difficulty as DifficultyLevel) || "All Levels",
      featured: !!featured,
      visibility: "public",
      learningObjectives: Array.isArray(learningObjectives) ? learningObjectives : [],
      prerequisites: Array.isArray(prerequisites) ? prerequisites : [],
    });

    return NextResponse.json({ success: true, video }, { status: 201 });
  } catch (error) {
    console.error("POST /api/videos error:", error);
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
  }
}
