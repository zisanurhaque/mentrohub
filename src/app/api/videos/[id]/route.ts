import { NextRequest, NextResponse } from "next/server";
import { deleteVideo, getVideoById, incrementVideoViews, updateVideo } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const video = await getVideoById(id);

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Increment view count asynchronously
    incrementVideoViews(id).catch(console.error);

    return NextResponse.json({ video });
  } catch (error) {
    console.error("GET /api/videos/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const updates = await req.json();
    const updated = await updateVideo(id, updates);

    if (!updated) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, video: updated });
  } catch (error) {
    console.error("PUT /api/videos/[id] error:", error);
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const deleted = await deleteVideo(id);

    if (!deleted) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/videos/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
  }
}
