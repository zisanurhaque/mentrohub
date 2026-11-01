"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { ThumbsUp, ThumbsDown, Bookmark, CheckCircle, Share2, Check } from "lucide-react";
import { getApprovalRating } from "@/lib/formatters";
import {
  getLikedVideos,
  toggleVideoLike,
  getStoredBookmarks,
  toggleStoredBookmark,
  saveStoredHistory,
  getStoredHistory,
} from "@/lib/client-store";

interface WatchActionsProps {
  videoId: string;
  initialLikes: number;
  initialDislikes: number;
}

export default function WatchActions({
  videoId,
  initialLikes,
  initialDislikes,
}: WatchActionsProps) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const liked = getLikedVideos().includes(videoId);
    setIsLiked(liked);
    if (liked) {
      setLikes(initialLikes + 1);
    }

    const saved = getStoredBookmarks().some((b) => b.videoId === videoId);
    setIsSaved(saved);

    const hist = getStoredHistory().find((h) => h.videoId === videoId);
    setIsCompleted(!!hist?.completed);
  }, [videoId, initialLikes]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleLike = () => {
    if (!user) {
      showToast("Please log in to like this lesson");
      return;
    }

    const result = toggleVideoLike(videoId);
    setIsLiked(result.isLiked);
    setLikes((prev) => (result.isLiked ? prev + 1 : prev - 1));
    showToast(result.isLiked ? "Added to liked lessons!" : "Removed like");
  };

  const handleBookmark = () => {
    if (!user) {
      showToast("Please log in to save this lesson");
      return;
    }

    const result = toggleStoredBookmark(videoId, user.id);
    setIsSaved(result.saved);
    showToast(result.saved ? "Saved to your learning list!" : "Removed from saved lessons");
  };

  const handleComplete = () => {
    if (!user) {
      showToast("Please log in to mark lessons complete");
      return;
    }

    const nextState = !isCompleted;
    saveStoredHistory(videoId, user.id, nextState);
    setIsCompleted(nextState);
    showToast(nextState ? "Lesson marked as completed! 🎓" : "Completion status removed");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast("URL copied to clipboard! Share the knowledge.");
    setTimeout(() => setCopied(false), 2500);
  };

  const rating = getApprovalRating(likes, initialDislikes);

  return (
    <div className="relative">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#ff9900] text-black font-bold text-xs px-4 py-1.5 rounded-full shadow-lg z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
          {toastMsg}
        </div>
      )}

      <div className="flex items-center flex-wrap gap-2 text-xs">
        {/* Like / Rating Pill */}
        <div className="flex items-center bg-[#1a1a22] border border-[#262632] rounded-md overflow-hidden">
          <button
            type="button"
            onClick={handleLike}
            className={`flex items-center px-3 py-2 space-x-1.5 transition-colors ${
              isLiked ? "bg-[#ff9900] text-black font-bold" : "text-gray-200 hover:bg-[#252530]"
            }`}
          >
            <ThumbsUp size={14} className={isLiked ? "fill-black" : "text-gray-400"} />
            <span>{likes.toLocaleString()}</span>
          </button>

          <div className="px-2 py-2 bg-[#21212c] text-[#ff9900] font-black text-[11px] border-l border-[#2e2e3c]">
            {rating}%
          </div>

          <button
            type="button"
            onClick={() => showToast("Nobody dislikes quality educational content!")}
            className="px-2.5 py-2 text-gray-400 hover:text-white hover:bg-[#252530] transition-colors border-l border-[#2e2e3c]"
            title="Dislike"
          >
            <ThumbsDown size={14} />
          </button>
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={handleBookmark}
          className={`flex items-center px-3 py-2 rounded-md border text-xs font-semibold transition-colors ${
            isSaved
              ? "bg-[#ff9900] text-black border-[#ff9900] font-bold"
              : "bg-[#1a1a22] hover:bg-[#252530] text-gray-200 border-[#262632]"
          }`}
        >
          <Bookmark size={14} className={`mr-1.5 ${isSaved ? "fill-black" : "text-gray-400"}`} />
          <span>{isSaved ? "Saved" : "Save Lesson"}</span>
        </button>

        {/* Mark as Completed */}
        <button
          type="button"
          onClick={handleComplete}
          className={`flex items-center px-3 py-2 rounded-md border text-xs font-semibold transition-colors ${
            isCompleted
              ? "bg-emerald-600 text-white border-emerald-500 font-bold"
              : "bg-[#1a1a22] hover:bg-[#252530] text-gray-200 border-[#262632]"
          }`}
        >
          <CheckCircle size={14} className={`mr-1.5 ${isCompleted ? "fill-white text-emerald-600" : "text-gray-400"}`} />
          <span>{isCompleted ? "Completed" : "Mark Complete"}</span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center px-3 py-2 bg-[#1a1a22] hover:bg-[#252530] text-gray-200 rounded-md border border-[#262632] text-xs font-semibold transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} className="mr-1.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Share2 size={14} className="mr-1.5 text-gray-400" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
