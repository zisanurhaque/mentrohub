export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnailUrl: string;
  instructor: {
    name: string;
    avatar?: string;
    channel?: string;
    verified: boolean;
  };
  category: string;
  tags: string[];
  duration: string; // e.g. "14:28" or "1:45:00"
  durationSeconds: number;
  difficulty: DifficultyLevel;
  views: number;
  likes: number;
  dislikes: number;
  publishedAt: string;
  featured?: boolean;
  visibility: "public" | "unlisted" | "private";
  learningObjectives?: string[];
  prerequisites?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  videoCount: number;
  bannerImage?: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  difficulty: DifficultyLevel;
  thumbnailUrl: string;
  videoIds: string[];
  totalDuration: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "admin";
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: number;
  createdAt: string;
  parentId?: string; // For replies
}

export interface WatchHistoryItem {
  id: string;
  userId: string;
  videoId: string;
  progressSeconds: number;
  completed: boolean;
  lastWatchedAt: string;
  video?: Video;
}

export interface BookmarkItem {
  id: string;
  userId: string;
  videoId: string;
  savedAt: string;
  video?: Video;
}

export interface StudyNote {
  id: string;
  userId: string;
  videoId: string;
  timestampSeconds?: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformAnalytics {
  totalVideos: number;
  totalUsers: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalBookmarks: number;
  categoryDistribution: { category: string; count: number }[];
  mostViewedVideos: Video[];
  recentUploads: Video[];
}
