import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getUserBookmarks } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ bookmarks: [] });
  }

  try {
    const bookmarks = await getUserBookmarks(user.id);
    return NextResponse.json({ bookmarks });
  } catch (error) {
    console.error("GET bookmarks error:", error);
    return NextResponse.json({ error: "Failed to fetch bookmarks" }, { status: 500 });
  }
}
