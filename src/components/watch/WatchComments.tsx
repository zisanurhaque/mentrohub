"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { Comment } from "@/types";
import { MessageSquare, Send, Trash2, CornerDownRight, Heart } from "lucide-react";
import { formatRelativeTime } from "@/lib/formatters";
import { getStoredComments, addStoredComment, deleteStoredComment } from "@/lib/client-store";

interface WatchCommentsProps {
  videoId: string;
}

export default function WatchComments({ videoId }: WatchCommentsProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newText, setNewText] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const list = getStoredComments(videoId);
    setComments(list);
  }, [videoId]);

  const handleSubmit = (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    const content = parentId ? replyText : newText;
    if (!content.trim() || !user) return;

    const newComment = addStoredComment(
      videoId,
      user.id,
      user.name,
      user.avatar,
      content.trim(),
      parentId
    );

    setComments([newComment, ...comments]);
    if (parentId) {
      setReplyToId(null);
      setReplyText("");
    } else {
      setNewText("");
    }
  };

  const handleDelete = (commentId: string) => {
    deleteStoredComment(commentId);
    setComments(comments.filter((c) => c.id !== commentId && c.parentId !== commentId));
  };

  // Group top-level comments and replies
  const topLevel = comments.filter((c) => !c.parentId);
  const repliesByParent: Record<string, Comment[]> = {};
  comments.forEach((c) => {
    if (c.parentId) {
      repliesByParent[c.parentId] = repliesByParent[c.parentId] || [];
      repliesByParent[c.parentId].push(c);
    }
  });

  return (
    <div className="bg-[#141418] border border-[#23232c] rounded-lg p-5 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#22222a] pb-3">
        <h3 className="text-base font-bold text-white flex items-center">
          <MessageSquare size={18} className="text-[#ff9900] mr-2" />
          Intellectual Discussion ({comments.length})
        </h3>
        <span className="text-xs text-gray-400">Keep it civil and educational</span>
      </div>

      {/* New Comment Box */}
      {user ? (
        <form onSubmit={(e) => handleSubmit(e)} className="flex items-start space-x-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 border border-[#333340]"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#ff9900] text-black font-bold text-xs flex items-center justify-center shrink-0 mt-1">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1 space-y-2">
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Drop your educational hypothesis, critique, or reaction..."
              rows={2}
              className="w-full bg-[#1b1b22] text-xs text-white placeholder-gray-500 p-3 rounded-md border border-[#2c2c38] focus:outline-none focus:border-[#ff9900] resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newText.trim()}
                className="inline-flex items-center bg-[#ff9900] hover:bg-[#e68a00] disabled:opacity-50 text-black text-xs font-bold px-4 py-2 rounded-md transition-colors shadow"
              >
                <Send size={12} className="mr-1.5" />
                Comment
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="p-3 bg-[#181820] rounded border border-[#262632] text-center text-xs text-gray-400">
          <span>Please </span>
          <a href="/login" className="text-[#ff9900] font-bold underline">
            log in
          </a>
          <span> to leave comments and engage with other students.</span>
        </div>
      )}

      {/* Comment List */}
      <div className="space-y-4 pt-2">
        {topLevel.length === 0 ? (
          <div className="text-xs text-gray-400 text-center py-6">
            No comments yet. Be the first consenting intellectual to discuss this lesson!
          </div>
        ) : (
          topLevel.map((comment) => (
            <div key={comment.id} className="space-y-2.5 pb-3 border-b border-[#1c1c24] last:border-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  {comment.userAvatar ? (
                    <img
                      src={comment.userAvatar}
                      alt={comment.userName}
                      className="w-7 h-7 rounded-full object-cover border border-[#2c2c36]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#2a2a36] text-gray-300 font-bold text-xs flex items-center justify-center">
                      {comment.userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-gray-200 mr-2">
                      {comment.userName}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>
                </div>

                {user && (user.id === comment.userId || user.role === "admin") && (
                  <button
                    type="button"
                    onClick={() => handleDelete(comment.id)}
                    className="text-gray-400 hover:text-red-400 p-1 transition-colors"
                    title="Delete comment"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-300 pl-9 leading-relaxed">
                {comment.content}
              </p>

              {/* Engagement line & Reply Button */}
              <div className="pl-9 flex items-center space-x-4 text-[11px] text-gray-400">
                <button
                  type="button"
                  className="flex items-center space-x-1 hover:text-[#ff9900] transition-colors"
                  onClick={() => {
                    setComments((prev) =>
                      prev.map((c) => (c.id === comment.id ? { ...c, likes: c.likes + 1 } : c))
                    );
                  }}
                >
                  <Heart size={11} className="fill-[#ff9900]/20 text-[#ff9900]" />
                  <span>{comment.likes}</span>
                </button>

                {user && (
                  <button
                    type="button"
                    onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                    className="hover:text-white transition-colors"
                  >
                    Reply
                  </button>
                )}
              </div>

              {/* Inline Reply Form */}
              {replyToId === comment.id && (
                <form
                  onSubmit={(e) => handleSubmit(e, comment.id)}
                  className="pl-9 pt-2 flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${comment.userName}...`}
                    className="flex-1 bg-[#1c1c24] text-xs text-white p-2 rounded border border-[#2d2d38] focus:outline-none focus:border-[#ff9900]"
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="bg-[#ff9900] text-black font-bold text-xs px-3 py-2 rounded hover:bg-[#e68a00]"
                  >
                    Send
                  </button>
                </form>
              )}

              {/* Nested Replies */}
              {repliesByParent[comment.id]?.map((reply) => (
                <div key={reply.id} className="pl-10 pt-2 flex items-start space-x-2">
                  <CornerDownRight size={14} className="text-gray-400 mt-1 shrink-0" />
                  <div className="flex-1 bg-[#1a1a22] p-2.5 rounded border border-[#252530] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{reply.userName}</span>
                      <span className="text-[10px] text-gray-400">
                        {formatRelativeTime(reply.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
