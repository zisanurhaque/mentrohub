import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import {
  Video,
  Category,
  Collection,
  User,
  Comment,
  WatchHistoryItem,
  BookmarkItem,
  StudyNote,
  PlatformAnalytics,
  DifficultyLevel,
} from "@/types";
import { SEED_CATEGORIES, SEED_COLLECTIONS, SEED_VIDEOS } from "./seed-data";
import { connectToDatabase } from "./mongodb";
import { VideoModel } from "@/models/Video";
import { CategoryModel } from "@/models/Category";
import { CollectionModel } from "@/models/Collection";
import { UserModel } from "@/models/User";
import { CommentModel } from "@/models/Comment";

interface StoredUser extends User {
  passwordHash: string;
}

interface LocalDatabase {
  videos: Video[];
  categories: Category[];
  collections: Collection[];
  users: StoredUser[];
  comments: Comment[];
  watchHistory: WatchHistoryItem[];
  bookmarks: BookmarkItem[];
  notes: StudyNote[];
  likedVideoIdsByUser: Record<string, string[]>;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");

function getInitialLocalDatabase(): LocalDatabase {
  const salt = bcrypt.genSaltSync(10);
  const adminPasswordHash = bcrypt.hashSync("admin123456", salt);
  const studentPasswordHash = bcrypt.hashSync("student123456", salt);

  const defaultUsers: StoredUser[] = [
    {
      id: "usr-admin-01",
      email: "admin@mentrohub.com",
      passwordHash: adminPasswordHash,
      name: "Professor Mentro (Admin)",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: "Chief Knowledge Curator at MentroHub. Taking education dangerously seriously.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "usr-student-01",
      email: "student@mentrohub.com",
      passwordHash: studentPasswordHash,
      name: "Curious Learner",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      bio: "Learning CS, calculus, and finance without regrets.",
      createdAt: new Date().toISOString(),
    },
  ];

  const defaultComments: Comment[] = [
    {
      id: "cmt-01",
      videoId: "vid-math-01",
      userId: "usr-student-01",
      userName: "MatrixFanatic",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      content: "Never thought I'd see vector transformations look this seductive. Grant Sanderson is a national treasure.",
      likes: 42,
      createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    },
    {
      id: "cmt-02",
      videoId: "vid-math-01",
      userId: "usr-admin-01",
      userName: "Professor Mentro",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content: "Wait until you see Chapter 3 on matrix multiplication. Pure geometrical ecstasy.",
      likes: 19,
      parentId: "cmt-01",
      createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    },
    {
      id: "cmt-03",
      videoId: "vid-prog-03",
      userId: "usr-student-01",
      userName: "AlgorithmAddict",
      userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
      content: "My browser history has never looked this wholesome. 100 CS concepts in 13 minutes is my new pre-workout.",
      likes: 88,
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    },
    {
      id: "cmt-04",
      videoId: "vid-ai-01",
      userId: "usr-student-01",
      userName: "WeightsOptimizer",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      content: "I clicked because of the provocative title, I stayed for gradient descent backpropagation. No regrets.",
      likes: 67,
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
  ];

  return {
    videos: [...SEED_VIDEOS],
    categories: [...SEED_CATEGORIES],
    collections: [...SEED_COLLECTIONS],
    users: defaultUsers,
    comments: defaultComments,
    watchHistory: [
      {
        id: "hist-01",
        userId: "usr-student-01",
        videoId: "vid-math-01",
        progressSeconds: 420,
        completed: false,
        lastWatchedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
    ],
    bookmarks: [
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
    ],
    notes: [
      {
        id: "note-01",
        userId: "usr-student-01",
        videoId: "vid-math-01",
        timestampSeconds: 145,
        content: "Remember: Basis vectors i-hat and j-hat determine where all other vectors land after transformation!",
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
    ],
    likedVideoIdsByUser: {
      "usr-student-01": ["vid-math-01", "vid-prog-01"],
    },
  };
}

function readLocalDb(): LocalDatabase {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialLocalDatabase();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const content = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading local db file, returning initial fallback:", err);
    return getInitialLocalDatabase();
  }
}

function writeLocalDb(data: LocalDatabase): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to local db file:", err);
  }
}

export interface VideoQueryOptions {
  q?: string;
  category?: string;
  difficulty?: string;
  duration?: "short" | "medium" | "long" | "all"; // <10m, 10-30m, >30m
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

  const mongooseConn = await connectToDatabase();
  if (mongooseConn) {
    try {
      const filter: Record<string, unknown> = { visibility: "public" };
      if (category && category !== "all") {
        filter.category = { $regex: new RegExp(`^${category}$`, "i") };
      }
      if (difficulty && difficulty !== "All Levels") {
        filter.difficulty = difficulty;
      }
      if (featuredOnly) {
        filter.featured = true;
      }
      if (duration === "short") {
        filter.durationSeconds = { $lt: 600 };
      } else if (duration === "medium") {
        filter.durationSeconds = { $gte: 600, $lte: 1800 };
      } else if (duration === "long") {
        filter.durationSeconds = { $gt: 1800 };
      }
      if (q && q.trim()) {
        const queryRegex = new RegExp(q.trim(), "i");
        filter.$or = [
          { title: queryRegex },
          { description: queryRegex },
          { tags: queryRegex },
          { "instructor.name": queryRegex },
        ];
      }

      let sortObj: Record<string, 1 | -1> = { views: -1 };
      if (sortBy === "newest") {
        sortObj = { publishedAt: -1 };
      } else if (sortBy === "likes") {
        sortObj = { likes: -1 };
      } else if (sortBy === "views") {
        sortObj = { views: -1 };
      }

      const total = await VideoModel.countDocuments(filter);
      const docs = await VideoModel.find(filter)
        .sort(sortObj)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      if (docs.length > 0 || total > 0) {
        const formatted: Video[] = docs.map((d) => ({
          id: (d as unknown as { _id: string })._id.toString(),
          title: d.title,
          description: d.description,
          youtubeId: d.youtubeId,
          thumbnailUrl: d.thumbnailUrl,
          instructor: d.instructor,
          category: d.category,
          tags: d.tags || [],
          duration: d.duration,
          durationSeconds: d.durationSeconds,
          difficulty: d.difficulty as DifficultyLevel,
          views: d.views,
          likes: d.likes,
          dislikes: d.dislikes,
          publishedAt: d.publishedAt.toISOString(),
          featured: d.featured,
          visibility: d.visibility,
          learningObjectives: d.learningObjectives,
          prerequisites: d.prerequisites,
        }));
        return {
          videos: formatted,
          total,
          page,
          totalPages: Math.ceil(total / limit) || 1,
        };
      }
    } catch (e) {
      console.warn("MongoDB getVideos error, falling back to local store:", e);
    }
  }

  // Local file storage query
  const db = readLocalDb();
  let results = [...db.videos].filter((v) => v.visibility === "public");

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
    // Relevant: views + likes
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
  const mongooseConn = await connectToDatabase();
  if (mongooseConn) {
    try {
      const doc = await VideoModel.findById(id).lean();
      if (doc) {
        return {
          id: (doc as unknown as { _id: string })._id.toString(),
          title: doc.title,
          description: doc.description,
          youtubeId: doc.youtubeId,
          thumbnailUrl: doc.thumbnailUrl,
          instructor: doc.instructor,
          category: doc.category,
          tags: doc.tags || [],
          duration: doc.duration,
          durationSeconds: doc.durationSeconds,
          difficulty: doc.difficulty as DifficultyLevel,
          views: doc.views,
          likes: doc.likes,
          dislikes: doc.dislikes,
          publishedAt: doc.publishedAt.toISOString(),
          featured: doc.featured,
          visibility: doc.visibility,
          learningObjectives: doc.learningObjectives,
          prerequisites: doc.prerequisites,
        };
      }
    } catch {
      // Fallback
    }
  }

  const db = readLocalDb();
  return db.videos.find((v) => v.id === id) || null;
}

export async function incrementVideoViews(id: string): Promise<void> {
  const mongooseConn = await connectToDatabase();
  if (mongooseConn) {
    try {
      await VideoModel.findByIdAndUpdate(id, { $inc: { views: 1 } });
      return;
    } catch {
      // Fallback
    }
  }

  const db = readLocalDb();
  const vid = db.videos.find((v) => v.id === id);
  if (vid) {
    vid.views += 1;
    writeLocalDb(db);
  }
}

export async function toggleLikeVideo(
  videoId: string,
  userId: string
): Promise<{ likes: number; isLiked: boolean }> {
  const db = readLocalDb();
  const vid = db.videos.find((v) => v.id === videoId);
  if (!vid) {
    return { likes: 0, isLiked: false };
  }

  if (!db.likedVideoIdsByUser[userId]) {
    db.likedVideoIdsByUser[userId] = [];
  }

  const alreadyLiked = db.likedVideoIdsByUser[userId].includes(videoId);
  if (alreadyLiked) {
    db.likedVideoIdsByUser[userId] = db.likedVideoIdsByUser[userId].filter(
      (id) => id !== videoId
    );
    vid.likes = Math.max(0, vid.likes - 1);
  } else {
    db.likedVideoIdsByUser[userId].push(videoId);
    vid.likes += 1;
  }

  writeLocalDb(db);
  return { likes: vid.likes, isLiked: !alreadyLiked };
}

export async function createVideo(videoData: Omit<Video, "id" | "views" | "likes" | "dislikes" | "publishedAt">): Promise<Video> {
  const newVideo: Video = {
    ...videoData,
    id: `vid-${Date.now()}`,
    views: 0,
    likes: 0,
    dislikes: 0,
    publishedAt: new Date().toISOString(),
  };

  const mongooseConn = await connectToDatabase();
  if (mongooseConn) {
    try {
      const created = await VideoModel.create({
        ...newVideo,
        publishedAt: new Date(),
      });
      newVideo.id = (created as unknown as { _id: string })._id.toString();
    } catch (e) {
      console.warn("MongoDB createVideo failed, saving locally:", e);
    }
  }

  const db = readLocalDb();
  db.videos.unshift(newVideo);
  writeLocalDb(db);
  return newVideo;
}

export async function updateVideo(id: string, updates: Partial<Video>): Promise<Video | null> {
  const mongooseConn = await connectToDatabase();
  if (mongooseConn) {
    try {
      await VideoModel.findByIdAndUpdate(id, updates);
    } catch {
      // Fallback
    }
  }

  const db = readLocalDb();
  const index = db.videos.findIndex((v) => v.id === id);
  if (index === -1) return null;

  db.videos[index] = { ...db.videos[index], ...updates };
  writeLocalDb(db);
  return db.videos[index];
}

export async function deleteVideo(id: string): Promise<boolean> {
  const mongooseConn = await connectToDatabase();
  if (mongooseConn) {
    try {
      await VideoModel.findByIdAndDelete(id);
    } catch {
      // Fallback
    }
  }

  const db = readLocalDb();
  const initialLen = db.videos.length;
  db.videos = db.videos.filter((v) => v.id !== id);
  writeLocalDb(db);
  return db.videos.length < initialLen;
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const mongooseConn = await connectToDatabase();
  if (mongooseConn) {
    try {
      const docs = await CategoryModel.find().lean();
      if (docs.length > 0) {
        return docs.map((d) => ({
          id: (d as unknown as { _id: string })._id.toString(),
          slug: d.slug,
          name: d.name,
          description: d.description,
          iconName: d.iconName,
          videoCount: d.videoCount,
          bannerImage: d.bannerImage,
        }));
      }
    } catch {
      // Fallback
    }
  }

  const db = readLocalDb();
  // Recalculate live video count per category
  return db.categories.map((c) => ({
    ...c,
    videoCount: db.videos.filter(
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
      (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.name.toLowerCase() === slug.toLowerCase()
    ) || null
  );
}

export async function createCategory(cat: Omit<Category, "id" | "videoCount">): Promise<Category> {
  const newCat: Category = {
    ...cat,
    id: `cat-${Date.now()}`,
    videoCount: 0,
  };
  const db = readLocalDb();
  db.categories.push(newCat);
  writeLocalDb(db);
  return newCat;
}

// Collections
export async function getCollections(): Promise<Collection[]> {
  const mongooseConn = await connectToDatabase();
  if (mongooseConn) {
    try {
      const docs = await CollectionModel.find().lean();
      if (docs.length > 0) {
        return docs.map((d) => ({
          id: (d as unknown as { _id: string })._id.toString(),
          slug: d.slug,
          title: d.title,
          tagline: d.tagline,
          description: d.description,
          category: d.category,
          difficulty: d.difficulty as DifficultyLevel,
          thumbnailUrl: d.thumbnailUrl,
          videoIds: d.videoIds,
          totalDuration: d.totalDuration,
        }));
      }
    } catch {
      // Fallback
    }
  }

  const db = readLocalDb();
  return db.collections;
}

export async function getCollectionBySlug(slug: string): Promise<(Collection & { videos: Video[] }) | null> {
  const collections = await getCollections();
  const col = collections.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
  if (!col) return null;

  const db = readLocalDb();
  const resolvedVideos = col.videoIds
    .map((vidId) => db.videos.find((v) => v.id === vidId))
    .filter((v): v is Video => !!v);

  return { ...col, videos: resolvedVideos };
}

// Comments
export async function getComments(videoId: string): Promise<Comment[]> {
  const mongooseConn = await connectToDatabase();
  if (mongooseConn) {
    try {
      const docs = await CommentModel.find({ videoId }).sort({ createdAt: -1 }).lean();
      if (docs.length > 0) {
        return docs.map((d) => ({
          id: (d as unknown as { _id: string })._id.toString(),
          videoId: d.videoId,
          userId: d.userId,
          userName: d.userName,
          userAvatar: d.userAvatar,
          content: d.content,
          likes: d.likes,
          parentId: d.parentId,
          createdAt: d.createdAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
  }

  const db = readLocalDb();
  return db.comments
    .filter((c) => c.videoId === videoId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addComment(comment: {
  videoId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  parentId?: string;
}): Promise<Comment> {
  const newComment: Comment = {
    ...comment,
    id: `cmt-${Date.now()}`,
    likes: 0,
    createdAt: new Date().toISOString(),
  };

  const db = readLocalDb();
  db.comments.unshift(newComment);
  writeLocalDb(db);
  return newComment;
}

export async function deleteComment(id: string, userId: string, isAdmin = false): Promise<boolean> {
  const db = readLocalDb();
  const comment = db.comments.find((c) => c.id === id);
  if (!comment) return false;
  if (!isAdmin && comment.userId !== userId) {
    return false;
  }

  db.comments = db.comments.filter((c) => c.id !== id && c.parentId !== id);
  writeLocalDb(db);
  return true;
}

// Users & Auth
export async function getUserByEmail(email: string): Promise<StoredUser | null> {
  const mongooseConn = await connectToDatabase();
  if (mongooseConn) {
    try {
      const doc = await UserModel.findOne({ email: email.toLowerCase() }).lean();
      if (doc) {
        return {
          id: (doc as unknown as { _id: string })._id.toString(),
          email: doc.email,
          passwordHash: doc.passwordHash,
          name: doc.name,
          role: doc.role,
          avatar: doc.avatar,
          bio: doc.bio,
          createdAt: doc.createdAt.toISOString(),
        };
      }
    } catch {
      // Fallback
    }
  }

  const db = readLocalDb();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const mongooseConn = await connectToDatabase();
  if (mongooseConn) {
    try {
      const doc = await UserModel.findById(id).lean();
      if (doc) {
        return {
          id: (doc as unknown as { _id: string })._id.toString(),
          email: doc.email,
          name: doc.name,
          role: doc.role,
          avatar: doc.avatar,
          bio: doc.bio,
          createdAt: doc.createdAt.toISOString(),
        };
      }
    } catch {
      // Fallback
    }
  }

  const db = readLocalDb();
  const u = db.users.find((usr) => usr.id === id);
  if (!u) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...safeUser } = u;
  return safeUser;
}

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  role?: "student" | "admin";
}): Promise<User> {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(data.password, salt);

  const newUser: StoredUser = {
    id: `usr-${Date.now()}`,
    email: data.email.toLowerCase().trim(),
    passwordHash,
    name: data.name.trim(),
    role: data.role || "student",
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.name)}`,
    bio: "Passionate learner on MentroHub.",
    createdAt: new Date().toISOString(),
  };

  const mongooseConn = await connectToDatabase();
  if (mongooseConn) {
    try {
      const created = await UserModel.create({
        email: newUser.email,
        passwordHash: newUser.passwordHash,
        name: newUser.name,
        role: newUser.role,
        avatar: newUser.avatar,
        bio: newUser.bio,
      });
      newUser.id = (created as unknown as { _id: string })._id.toString();
    } catch (e) {
      console.warn("MongoDB createUser failed, writing locally:", e);
    }
  }

  const db = readLocalDb();
  db.users.push(newUser);
  writeLocalDb(db);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _, ...safeUser } = newUser;
  return safeUser;
}

export async function updateUser(
  id: string,
  updates: { name?: string; bio?: string; avatar?: string }
): Promise<User | null> {
  const db = readLocalDb();
  const user = db.users.find((u) => u.id === id);
  if (!user) return null;

  if (updates.name) user.name = updates.name;
  if (updates.bio !== undefined) user.bio = updates.bio;
  if (updates.avatar) user.avatar = updates.avatar;

  writeLocalDb(db);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

// Watch History
export async function saveWatchProgress(
  userId: string,
  videoId: string,
  progressSeconds: number,
  completed = false
): Promise<WatchHistoryItem> {
  const db = readLocalDb();
  let item = db.watchHistory.find((w) => w.userId === userId && w.videoId === videoId);

  if (item) {
    item.progressSeconds = progressSeconds;
    item.completed = completed || item.completed;
    item.lastWatchedAt = new Date().toISOString();
  } else {
    item = {
      id: `wh-${Date.now()}`,
      userId,
      videoId,
      progressSeconds,
      completed,
      lastWatchedAt: new Date().toISOString(),
    };
    db.watchHistory.unshift(item);
  }

  writeLocalDb(db);
  return item;
}

export async function getUserWatchHistory(userId: string): Promise<WatchHistoryItem[]> {
  const db = readLocalDb();
  const history = db.watchHistory.filter((w) => w.userId === userId);
  return history
    .map((h) => ({
      ...h,
      video: db.videos.find((v) => v.id === h.videoId),
    }))
    .filter((h) => !!h.video)
    .sort((a, b) => new Date(b.lastWatchedAt).getTime() - new Date(a.lastWatchedAt).getTime());
}

export async function clearWatchHistory(userId: string): Promise<void> {
  const db = readLocalDb();
  db.watchHistory = db.watchHistory.filter((w) => w.userId !== userId);
  writeLocalDb(db);
}

// Bookmarks / Saved
export async function toggleBookmark(
  userId: string,
  videoId: string
): Promise<{ saved: boolean }> {
  const db = readLocalDb();
  const index = db.bookmarks.findIndex(
    (b) => b.userId === userId && b.videoId === videoId
  );

  if (index !== -1) {
    db.bookmarks.splice(index, 1);
    writeLocalDb(db);
    return { saved: false };
  } else {
    db.bookmarks.unshift({
      id: `bm-${Date.now()}`,
      userId,
      videoId,
      savedAt: new Date().toISOString(),
    });
    writeLocalDb(db);
    return { saved: true };
  }
}

export async function getUserBookmarks(userId: string): Promise<BookmarkItem[]> {
  const db = readLocalDb();
  const bms = db.bookmarks.filter((b) => b.userId === userId);
  return bms
    .map((b) => ({
      ...b,
      video: db.videos.find((v) => v.id === b.videoId),
    }))
    .filter((b) => !!b.video)
    .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
}

// Study Notes
export async function getUserNotes(userId: string, videoId?: string): Promise<StudyNote[]> {
  const db = readLocalDb();
  let notes = db.notes.filter((n) => n.userId === userId);
  if (videoId) {
    notes = notes.filter((n) => n.videoId === videoId);
  }
  return notes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function saveStudyNote(
  userId: string,
  videoId: string,
  content: string,
  timestampSeconds?: number
): Promise<StudyNote> {
  const db = readLocalDb();
  const note: StudyNote = {
    id: `note-${Date.now()}`,
    userId,
    videoId,
    timestampSeconds: timestampSeconds || 0,
    content: content.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.notes.unshift(note);
  writeLocalDb(db);
  return note;
}

export async function deleteStudyNote(userId: string, noteId: string): Promise<boolean> {
  const db = readLocalDb();
  const init = db.notes.length;
  db.notes = db.notes.filter((n) => !(n.id === noteId && n.userId === userId));
  writeLocalDb(db);
  return db.notes.length < init;
}

// Platform Analytics (Real calculated metrics from stored records)
export async function getPlatformAnalytics(): Promise<PlatformAnalytics> {
  const db = readLocalDb();
  const totalVideos = db.videos.length;
  const totalUsers = db.users.length;
  const totalViews = db.videos.reduce((acc, v) => acc + (v.views || 0), 0);
  const totalLikes = db.videos.reduce((acc, v) => acc + (v.likes || 0), 0);
  const totalComments = db.comments.length;
  const totalBookmarks = db.bookmarks.length;

  const categoryMap: Record<string, number> = {};
  db.videos.forEach((v) => {
    categoryMap[v.category] = (categoryMap[v.category] || 0) + 1;
  });

  const categoryDistribution = Object.entries(categoryMap).map(([category, count]) => ({
    category,
    count,
  }));

  const mostViewedVideos = [...db.videos]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const recentUploads = [...db.videos]
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
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
