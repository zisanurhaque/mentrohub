import {
  Video,
  Category,
  Collection,
  User,
  PlatformAnalytics,
} from "@/types";
import {
  SEED_CATEGORIES,
  SEED_COLLECTIONS,
  SEED_VIDEOS,
  SEED_USERS,
  SEED_COMMENTS,
} from "./seed-data";

// In-memory demo store
const memoryStore = {
  videos: [...SEED_VIDEOS],
  categories: [...SEED_CATEGORIES],
  collections: [...SEED_COLLECTIONS],
  users: [...SEED_USERS],
  comments: [...SEED_COMMENTS],
};

export interface VideoQueryOptions {
  q?: string;
  category?: string;
  difficulty?: string;
  duration?: "short" | "medium" | "long" | "all";
  sortBy?: "views" | "newest" | "likes" | "relevant";
  limit?: number;
  page?: number;
  featuredOnly?: boolean;
}

export async function getVideos(options: VideoQueryOptions = {}): Promise<{
  videos: Video[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const {
    q,
    category,
    difficulty,
    duration,
    sortBy = "relevant",
    limit = 24,
    page = 1,
    featuredOnly = false,
  } = options;

  let results = [...memoryStore.videos].filter((v) => v.visibility === "public");

  if (category && category !== "all") {
    results = results.filter(
      (v) =>
        v.category.toLowerCase().includes(category.toLowerCase()) ||
        category.toLowerCase().includes(v.category.toLowerCase())
    );
  }

  if (difficulty && difficulty !== "All Levels") {
    results = results.filter((v) => v.difficulty === difficulty);
  }

  if (featuredOnly) {
    results = results.filter((v) => v.featured);
  }

  if (duration === "short") {
    results = results.filter((v) => v.durationSeconds < 600);
  } else if (duration === "medium") {
    results = results.filter(
      (v) => v.durationSeconds >= 600 && v.durationSeconds <= 1800
    );
  } else if (duration === "long") {
    results = results.filter((v) => v.durationSeconds > 1800);
  }

  if (q && q.trim()) {
    const term = q.trim().toLowerCase();
    results = results.filter(
      (v) =>
        v.title.toLowerCase().includes(term) ||
        v.description.toLowerCase().includes(term) ||
        v.instructor.name.toLowerCase().includes(term) ||
        v.category.toLowerCase().includes(term) ||
        v.tags.some((t) => t.toLowerCase().includes(term))
    );
  }

  if (sortBy === "newest") {
    results.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } else if (sortBy === "likes") {
    results.sort((a, b) => b.likes - a.likes);
  } else if (sortBy === "views") {
    results.sort((a, b) => b.views - a.views);
  } else {
    results.sort((a, b) => b.views + b.likes * 10 - (a.views + a.likes * 10));
  }

  const total = results.length;
  const paginated = results.slice((page - 1) * limit, page * limit);

  return {
    videos: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

export async function getVideoById(id: string): Promise<Video | null> {
  return memoryStore.videos.find((v) => v.id === id) || null;
}

export async function createVideo(
  videoData: Omit<Video, "id" | "views" | "likes" | "dislikes" | "publishedAt">
): Promise<Video> {
  const newVideo: Video = {
    ...videoData,
    id: `vid-${Date.now()}`,
    views: 0,
    likes: 0,
    dislikes: 0,
    publishedAt: new Date().toISOString(),
  };

  memoryStore.videos.unshift(newVideo);
  return newVideo;
}

export async function deleteVideo(id: string): Promise<boolean> {
  const initialLen = memoryStore.videos.length;
  memoryStore.videos = memoryStore.videos.filter((v) => v.id !== id);
  return memoryStore.videos.length < initialLen;
}

// Categories
export async function getCategories(): Promise<Category[]> {
  return memoryStore.categories.map((c) => ({
    ...c,
    videoCount: memoryStore.videos.filter(
      (v) =>
        v.category.toLowerCase() === c.name.toLowerCase() ||
        v.category.toLowerCase().includes(c.slug.replace("-", " "))
    ).length,
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cats = await getCategories();
  return (
    cats.find(
      (c) =>
        c.slug.toLowerCase() === slug.toLowerCase() ||
        c.name.toLowerCase() === slug.toLowerCase()
    ) || null
  );
}

export async function createCategory(
  cat: Omit<Category, "id" | "videoCount">
): Promise<Category> {
  const newCat: Category = {
    ...cat,
    id: `cat-${Date.now()}`,
    videoCount: 0,
  };
  memoryStore.categories.push(newCat);
  return newCat;
}

// Collections
export async function getCollections(): Promise<Collection[]> {
  return memoryStore.collections;
}

export async function getCollectionBySlug(
  slug: string
): Promise<(Collection & { videos: Video[] }) | null> {
  const col = memoryStore.collections.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );
  if (!col) return null;

  const resolvedVideos = col.videoIds
    .map((vidId) => memoryStore.videos.find((v) => v.id === vidId))
    .filter((v): v is Video => !!v);

  return { ...col, videos: resolvedVideos };
}

// Users
export async function getUserByEmail(email: string): Promise<User | null> {
  return (
    memoryStore.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    ) || null
  );
}

export async function getUserById(id: string): Promise<User | null> {
  return memoryStore.users.find((u) => u.id === id) || null;
}

// Analytics computed directly from demo data
export async function getPlatformAnalytics(): Promise<PlatformAnalytics> {
  const totalVideos = memoryStore.videos.length;
  const totalUsers = memoryStore.users.length;
  const totalViews = memoryStore.videos.reduce((acc, v) => acc + (v.views || 0), 0);
  const totalLikes = memoryStore.videos.reduce((acc, v) => acc + (v.likes || 0), 0);
  const totalComments = memoryStore.comments.length;
  const totalBookmarks = 8; // Demo count

  const categoryMap: Record<string, number> = {};
  memoryStore.videos.forEach((v) => {
    categoryMap[v.category] = (categoryMap[v.category] || 0) + 1;
  });

  const categoryDistribution = Object.entries(categoryMap).map(
    ([category, count]) => ({
      category,
      count,
    })
  );

  const mostViewedVideos = [...memoryStore.videos]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const recentUploads = [...memoryStore.videos]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 5);

  return {
    totalVideos,
    totalUsers,
    totalViews,
    totalLikes,
    totalComments,
    totalBookmarks,
    categoryDistribution,
    mostViewedVideos,
    recentUploads,
  };
}
