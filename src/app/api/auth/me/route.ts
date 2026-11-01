import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateUser } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user });
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, bio, avatar } = body;
    const updated = await updateUser(user.id, { name, bio, avatar });
    return NextResponse.json({ success: true, user: updated });
  } catch (e: unknown) {
    console.error("Update profile error:", e);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
