"use client";

import { User, Comment, StudyNote, WatchHistoryItem, BookmarkItem } from "@/types";
import { SEED_COMMENTS, SEED_USERS } from "./seed-data";

const USER_KEY = "mentrohub_user";
const BOOKMARKS_KEY = "mentrohub_bookmarks";
const HISTORY_KEY = "mentrohub_history";
const NOTES_KEY = "mentrohub_notes";
const COMMENTS_KEY = "mentrohub_comments";
const LIKES_KEY = "mentrohub_likes";

// Helper to safely get from localStorage
function getLocal<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Helper to safely set to localStorage
function setLocal<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("localStorage error:", err);
  }
}

// Auth Store
export function getStoredUser(): User | null {
  return getLocal<User | null>(USER_KEY, null);
}

export function setStoredUser(user: User | null): void {
  setLocal(USER_KEY, user);
}

export function demoLogin(role: "student" | "admin"): User {
  const user = SEED_USERS.find((u) => u.role === role) || SEED_USERS[0];
  setStoredUser(user);
  return user;
}

export function customLogin(email: string): User {
  const existing = SEED_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    setStoredUser(existing);
    return existing;
  }
  const newUser: User = {
    id: `usr-${Date.now()}`,
    email,
    name: email.split("@")[0],
    role: "student",
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
    bio: "Passionate learner on MentroHub.",
    createdAt: new Date().toISOString(),
  };
  setStoredUser(newUser);
  return newUser;
}

// Likes Store
export function getLikedVideos(): string[] {
  return getLocal<string[]>(LIKES_KEY, ["vid-math-01", "vid-prog-01"]);
}

export function toggleVideoLike(videoId: string): { isLiked: boolean } {
  const likes = getLikedVideos();
  const exists = likes.includes(videoId);
  const updated = exists ? likes.filter((id) => id !== videoId) : [...likes, videoId];
  setLocal(LIKES_KEY, updated);
  return { isLiked: !exists };
}

// Bookmarks Store
export function getStoredBookmarks(): BookmarkItem[] {
  return getLocal<BookmarkItem[]>(BOOKMARKS_KEY, [
    {
      id: "bm-01",
      userId: "usr-student-01",
      videoId: "vid-prog-01",
      savedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    },
    {
      id: "bm-02",
      userId: "usr-student-01",
      videoId: "vid-ai-02",
      savedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    },
  ]);
}

export function toggleStoredBookmark(videoId: string, userId: string): { saved: boolean } {
  const bms = getStoredBookmarks();
  const index = bms.findIndex((b) => b.videoId === videoId);
  if (index !== -1) {
    bms.splice(index, 1);
    setLocal(BOOKMARKS_KEY, bms);
    return { saved: false };
  } else {
    bms.unshift({
      id: `bm-${Date.now()}`,
      userId,
      videoId,
      savedAt: new Date().toISOString(),
    });
    setLocal(BOOKMARKS_KEY, bms);
    return { saved: true };
  }
}

// History Store
export function getStoredHistory(): WatchHistoryItem[] {
  return getLocal<WatchHistoryItem[]>(HISTORY_KEY, [
    {
      id: "wh-01",
      userId: "usr-student-01",
      videoId: "vid-math-01",
      progressSeconds: 420,
      completed: false,
      lastWatchedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
  ]);
}

export function saveStoredHistory(
  videoId: string,
  userId: string,
  completed: boolean,
  progressSeconds: number = 0
): void {
  const history = getStoredHistory();
  const index = history.findIndex((h) => h.videoId === videoId);
  if (index !== -1) {
    history[index].completed = completed || history[index].completed;
    history[index].progressSeconds = progressSeconds;
    history[index].lastWatchedAt = new Date().toISOString();
  } else {
    history.unshift({
      id: `wh-${Date.now()}`,
      userId,
      videoId,
      progressSeconds,
      completed,
      lastWatchedAt: new Date().toISOString(),
    });
  }
  setLocal(HISTORY_KEY, history);
}

export function clearStoredHistory(): void {
  setLocal(HISTORY_KEY, []);
}

// Notes Store
export function getStoredNotes(videoId?: string): StudyNote[] {
  const allNotes = getLocal<StudyNote[]>(NOTES_KEY, [
    {
      id: "note-01",
      userId: "usr-student-01",
      videoId: "vid-math-01",
      timestampSeconds: 145,
      content: "Basis vectors i-hat and j-hat determine where all other vectors land after transformation!",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
  ]);
  if (videoId) {
    return allNotes.filter((n) => n.videoId === videoId);
  }
  return allNotes;
}

export function addStoredNote(videoId: string, userId: string, content: string): StudyNote {
  const notes = getStoredNotes();
  const newNote: StudyNote = {
    id: `note-${Date.now()}`,
    userId,
    videoId,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  notes.unshift(newNote);
  setLocal(NOTES_KEY, notes);
  return newNote;
}

export function deleteStoredNote(noteId: string): void {
  const notes = getStoredNotes().filter((n) => n.id !== noteId);
  setLocal(NOTES_KEY, notes);
}

// Comments Store
export function getStoredComments(videoId?: string): Comment[] {
  const comments = getLocal<Comment[]>(COMMENTS_KEY, SEED_COMMENTS);
  if (videoId) {
    return comments.filter((c) => c.videoId === videoId);
  }
  return comments;
}

export function addStoredComment(
  videoId: string,
  userId: string,
  userName: string,
  userAvatar: string | undefined,
  content: string,
  parentId?: string
): Comment {
  const comments = getStoredComments();
  const newComment: Comment = {
    id: `cmt-${Date.now()}`,
    videoId,
    userId,
    userName,
    userAvatar,
    content,
    likes: 0,
    parentId,
    createdAt: new Date().toISOString(),
  };
  comments.unshift(newComment);
  setLocal(COMMENTS_KEY, comments);
  return newComment;
}

export function deleteStoredComment(commentId: string): void {
  const comments = getStoredComments().filter(
    (c) => c.id !== commentId && c.parentId !== commentId
  );
  setLocal(COMMENTS_KEY, comments);
}
