"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { StudyNote } from "@/types";
import { BookOpen, Plus, Trash2, Clock } from "lucide-react";
import { formatRelativeTime } from "@/lib/formatters";

interface StudyNotesProps {
  videoId: string;
}

export default function StudyNotes({ videoId }: StudyNotesProps) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      setNotes([]);
      return;
    }

    async function loadNotes() {
      setLoading(true);
      try {
        const res = await fetch(`/api/videos/${videoId}/notes`);
        if (res.ok) {
          const data = await res.json();
          setNotes(data.notes || []);
        }
      } catch (e) {
        console.error("Failed to load notes", e);
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, [videoId, user]);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/videos/${videoId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setNotes([data.note, ...notes]);
        setContent("");
      }
    } catch (e) {
      console.error("Failed to add note", e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const res = await fetch(`/api/videos/${videoId}/notes?noteId=${noteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotes(notes.filter((n) => n.id !== noteId));
      }
    } catch (e) {
      console.error("Failed to delete note", e);
    }
  };

  return (
    <div className="bg-[#141418] border border-[#23232c] rounded-lg p-4 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#22222a] pb-2">
        <h4 className="text-sm font-bold text-white flex items-center">
          <BookOpen size={16} className="text-[#ff9900] mr-2" />
          My Personal Study Notes ({notes.length})
        </h4>
        <span className="text-[11px] text-gray-400">
          Private to your account
        </span>
      </div>

      {!user ? (
        <div className="p-3 bg-[#181820] rounded border border-[#282834] text-xs text-gray-400 text-center">
          <span>Please </span>
          <a href="/login" className="text-[#ff9900] font-bold underline">
            log in
          </a>
          <span> to save personal timestamps and study notes.</span>
        </div>
      ) : (
        <>
          <form onSubmit={handleAddNote} className="space-y-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Take a quick note or record a key formula..."
              rows={2}
              className="w-full bg-[#1b1b22] text-xs text-white placeholder-gray-500 p-2.5 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900] resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || !content.trim()}
                className="inline-flex items-center bg-[#ff9900] hover:bg-[#e68a00] disabled:opacity-50 text-black text-xs font-bold px-3 py-1.5 rounded transition-colors"
              >
                <Plus size={14} className="mr-1" />
                {submitting ? "Saving..." : "Save Note"}
              </button>
            </div>
          </form>

          {loading ? (
            <div className="text-xs text-gray-500 py-2">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="text-xs text-gray-500 text-center py-3">
              No notes taken yet. Use this section to capture insights!
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-2.5 rounded bg-[#191922] border border-[#252530] text-xs space-y-1.5 group flex items-start justify-between"
                >
                  <div className="space-y-1 flex-1 pr-2">
                    <p className="text-gray-200 whitespace-pre-wrap">{note.content}</p>
                    <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                      <span className="flex items-center">
                        <Clock size={10} className="mr-1 text-gray-400" />
                        {formatRelativeTime(note.createdAt)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-gray-400 hover:text-red-400 p-1 opacity-80 group-hover:opacity-100 transition-opacity"
                    title="Delete note"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
