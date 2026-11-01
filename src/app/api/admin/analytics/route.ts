import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getPlatformAnalytics } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
  }

  try {
    const analytics = await getPlatformAnalytics();
    return NextResponse.json({ analytics });
  } catch (error) {
    console.error("GET analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
