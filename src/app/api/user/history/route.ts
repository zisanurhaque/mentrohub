import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { clearWatchHistory, getUserWatchHistory } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ history: [] });
  }

  try {
    const history = await getUserWatchHistory(user.id);
    return NextResponse.json({ history });
  } catch (error) {
    console.error("GET history error:", error);
    return NextResponse.json({ error: "Failed to fetch watch history" }, { status: 500 });
  }
}

export async function DELETE() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await clearWatchHistory(user.id);
    return NextResponse.json({ success: true, message: "Watch history cleared" });
  } catch (error) {
    console.error("DELETE history error:", error);
    return NextResponse.json({ error: "Failed to clear watch history" }, { status: 500 });
  }
}
