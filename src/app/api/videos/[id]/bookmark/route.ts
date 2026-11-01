import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { toggleBookmark } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Please log in to save lessons to your list" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const result = await toggleBookmark(user.id, id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Bookmark video error:", error);
    return NextResponse.json({ error: "Failed to save bookmark" }, { status: 500 });
  }
}
