import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { deleteStudyNote, getUserNotes, saveStudyNote } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ notes: [] });
  }

  try {
    const { id } = await params;
    const notes = await getUserNotes(user.id, id);
    return NextResponse.json({ notes });
  } catch (error) {
    console.error("GET notes error:", error);
    return NextResponse.json({ error: "Failed to fetch study notes" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Please log in to save study notes" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { content, timestampSeconds } = await req.json();

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Note content cannot be empty" }, { status: 400 });
    }

    const note = await saveStudyNote(
      user.id,
      id,
      content.trim(),
      timestampSeconds || 0
    );

    return NextResponse.json({ success: true, note }, { status: 201 });
  } catch (error) {
    console.error("POST note error:", error);
    return NextResponse.json({ error: "Failed to save study note" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("noteId");

    if (!noteId) {
      return NextResponse.json({ error: "noteId parameter is required" }, { status: 400 });
    }

    const success = await deleteStudyNote(user.id, noteId);
    return NextResponse.json({ success });
  } catch (error) {
    console.error("DELETE note error:", error);
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
  }
}
