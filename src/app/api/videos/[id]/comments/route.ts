import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { addComment, getComments } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comments = await getComments(id);
    return NextResponse.json({ comments });
  } catch (error) {
    console.error("GET comments error:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Please log in to leave an educational comment" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { content, parentId } = await req.json();

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Comment text cannot be empty" }, { status: 400 });
    }

    const comment = await addComment({
      videoId: id,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: content.trim(),
      parentId,
    });

    return NextResponse.json({ success: true, comment }, { status: 201 });
  } catch (error) {
    console.error("POST comment error:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
