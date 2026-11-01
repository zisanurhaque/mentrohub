import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { saveWatchProgress } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    // If not logged in, ignore silently or return 200 without saving
    return NextResponse.json({ saved: false });
  }

  try {
    const { id } = await params;
    const { progressSeconds, completed } = await req.json();
    const result = await saveWatchProgress(
      user.id,
      id,
      progressSeconds || 0,
      !!completed
    );
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Progress save error:", error);
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
  }
}
