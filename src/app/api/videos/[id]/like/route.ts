import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { toggleLikeVideo } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Please log in to like lessons" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const result = await toggleLikeVideo(id, user.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Like video error:", error);
    return NextResponse.json({ error: "Failed to like video" }, { status: 500 });
  }
}
