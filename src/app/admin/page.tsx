"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthContext";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import { Video, Category, PlatformAnalytics, DifficultyLevel } from "@/types";
import {
  getPlatformAnalytics,
  getVideos,
  getCategories,
  createVideo,
  deleteVideo,
  createCategory,
} from "@/lib/db";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import {
  ShieldAlert,
  Video as VideoIcon,
  PlusCircle,
  Trash2,
  Eye,
  ThumbsUp,
  MessageSquare,
  Users,
  CheckCircle2,
  FolderTree,
  Sparkles,
  ExternalLink,
  Layers,
} from "lucide-react";
import { formatViews } from "@/lib/formatters";

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"analytics" | "videos" | "add-video" | "categories">("analytics");
  const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // New Video Form state
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newInstructor, setNewInstructor] = useState("");
  const [newInstructorChannel, setNewInstructorChannel] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("Beginner");
  const [newDuration, setNewDuration] = useState("12:00");
  const [newTags, setNewTags] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFeatured, setNewFeatured] = useState(false);
  const [formMsg, setFormMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // New Category Form state
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catDesc, setCatDesc] = useState("");

  const loadAllAdminData = useCallback(async () => {
    try {
      const [anData, vidData, catData] = await Promise.all([
        getPlatformAnalytics(),
        getVideos({ limit: 100 }),
        getCategories(),
      ]);

      setAnalytics(anData);
      setVideos(vidData.videos || []);
      setCategories(catData || []);
      if (catData?.[0] && !newCategory) {
        setNewCategory(catData[0].name);
      }
    } catch (e) {
      console.error("Admin data load error:", e);
    }
  }, [newCategory]);

  useEffect(() => {
    if (user && user.role === "admin") {
      loadAllAdminData();
    }
  }, [user, loadAllAdminData]);

  const handleCreateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMsg(null);
    setSubmitting(true);

    try {
      const youtubeId = extractYouTubeId(newUrl);
      if (!youtubeId) {
        setFormMsg({ type: "error", text: "Invalid YouTube URL or ID" });
        setSubmitting(false);
        return;
      }

      await createVideo({
        title: newTitle,
        description: newDescription,
        youtubeId,
        thumbnailUrl: getYouTubeThumbnail(youtubeId),
        instructor: {
          name: newInstructor,
          channel: newInstructorChannel || newInstructor,
          verified: true,
        },
        category: newCategory,
        difficulty: newDifficulty as DifficultyLevel,
        duration: newDuration,
        durationSeconds: 600,
        tags: newTags.split(",").map((t) => t.trim()).filter(Boolean),
        featured: newFeatured,
        visibility: "public",
        learningObjectives: [],
        prerequisites: [],
      });

      setFormMsg({ type: "success", text: "Educational video added successfully to library!" });
      setNewTitle("");
      setNewUrl("");
      setNewDescription("");
      setNewTags("");
      await loadAllAdminData();
    } catch {
      setFormMsg({ type: "error", text: "Failed creating video" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteVideo = async (videoId: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    try {
      await deleteVideo(videoId);
      setVideos(videos.filter((v) => v.id !== videoId));
      if (analytics) {
        setAnalytics({ ...analytics, totalVideos: analytics.totalVideos - 1 });
      }
    } catch (e) {
      console.error("Delete video error:", e);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    try {
      await createCategory({
        name: catName.trim(),
        slug: catSlug.trim() || catName.trim().toLowerCase().replace(/\s+/g, "-"),
        description: catDesc.trim(),
        iconName: "Folder",
      });

      setCatName("");
      setCatSlug("");
      setCatDesc("");
      await loadAllAdminData();
    } catch (e) {
      console.error("Add category error", e);
    }
  };

  if (authLoading) {
    return (
      <HomepageLayout>
        <Container className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-[#ff9900] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-gray-400">Verifying administrator credentials...</p>
        </Container>
      </HomepageLayout>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <HomepageLayout>
        <Container className="py-20 text-center">
          <div className="max-w-md mx-auto p-8 bg-[#141418] border border-red-900/40 rounded-xl space-y-4">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="text-xl font-bold text-white">Access Denied</h2>
            <p className="text-xs text-gray-400">
              This area is restricted to MentroHub administrators.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="px-4 py-2 bg-[#ff9900] text-black font-bold text-xs rounded hover:bg-[#e68a00]"
              >
                Log In As Admin
              </Link>
            </div>
          </div>
        </Container>
      </HomepageLayout>
    );
  }

  return (
    <HomepageLayout>
      <Container className="py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22222a] pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-black text-[#ff9900] uppercase tracking-wider">
              <ShieldAlert size={14} />
              <span>Admin Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Platform Management
            </h1>
            <p className="text-xs text-gray-400">
              Manage video catalog, extract YouTube metadata, and monitor platform engagement.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setActiveTab("add-video")}
              className="inline-flex items-center bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-xs px-4 py-2 rounded-md shadow transition-colors"
            >
              <PlusCircle size={14} className="mr-1.5" />
              Add New Video
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-[#22222a] text-xs">
          {[
            { id: "analytics", label: "Analytics Overview", icon: Sparkles },
            { id: "videos", label: `Manage Videos (${videos.length})`, icon: VideoIcon },
            { id: "add-video", label: "Add Video Embed", icon: PlusCircle },
            { id: "categories", label: `Categories (${categories.length})`, icon: FolderTree },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center px-4 py-2.5 font-bold border-b-2 transition-colors ${
                  active
                    ? "border-[#ff9900] text-[#ff9900]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={14} className="mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: Analytics */}
        {activeTab === "analytics" && analytics && (
          <div className="space-y-8">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 bg-[#141418] border border-[#24242c] rounded-lg">
                <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                  <span>Videos</span>
                  <VideoIcon size={14} className="text-[#ff9900]" />
                </div>
                <p className="text-2xl font-black text-white">{analytics.totalVideos}</p>
                <span className="text-[10px] text-gray-400 font-medium">In public library</span>
              </div>

              <div className="p-4 bg-[#141418] border border-[#24242c] rounded-lg">
                <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                  <span>Total Views</span>
                  <Eye size={14} className="text-[#ff9900]" />
                </div>
                <p className="text-2xl font-black text-white">{formatViews(analytics.totalViews)}</p>
                <span className="text-[10px] text-gray-400 font-medium">Aggregated views</span>
              </div>

              <div className="p-4 bg-[#141418] border border-[#24242c] rounded-lg">
                <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                  <span>Active Users</span>
                  <Users size={14} className="text-[#ff9900]" />
                </div>
                <p className="text-2xl font-black text-white">{analytics.totalUsers}</p>
                <span className="text-[10px] text-gray-400 font-medium">Registered accounts</span>
              </div>

              <div className="p-4 bg-[#141418] border border-[#24242c] rounded-lg">
                <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                  <span>Likes</span>
                  <ThumbsUp size={14} className="text-[#ff9900]" />
                </div>
                <p className="text-2xl font-black text-white">{formatViews(analytics.totalLikes)}</p>
                <span className="text-[10px] text-gray-400 font-medium">Community likes</span>
              </div>

              <div className="p-4 bg-[#141418] border border-[#24242c] rounded-lg">
                <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                  <span>Comments</span>
                  <MessageSquare size={14} className="text-[#ff9900]" />
                </div>
                <p className="text-2xl font-black text-white">{analytics.totalComments}</p>
                <span className="text-[10px] text-gray-400 font-medium">Discussions posted</span>
              </div>

              <div className="p-4 bg-[#141418] border border-[#24242c] rounded-lg">
                <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                  <span>Saved</span>
                  <Layers size={14} className="text-[#ff9900]" />
                </div>
                <p className="text-2xl font-black text-white">{analytics.totalBookmarks}</p>
                <span className="text-[10px] text-gray-400 font-medium">User bookmarks</span>
              </div>
            </div>

            {/* Category Distribution Table */}
            <div className="p-6 bg-[#141418] border border-[#24242c] rounded-lg space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center">
                <FolderTree size={16} className="text-[#ff9900] mr-2" />
                Category Distribution (Actual Records)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {analytics.categoryDistribution.map((item) => (
                  <div
                    key={item.category}
                    className="p-3 rounded bg-[#1b1b22] border border-[#282834] flex items-center justify-between"
                  >
                    <span className="text-xs font-bold text-gray-200">{item.category}</span>
                    <span className="bg-[#ff9900]/10 text-[#ff9900] text-xs font-black px-2 py-0.5 rounded">
                      {item.count} {item.count === 1 ? "video" : "videos"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Manage Videos */}
        {activeTab === "videos" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                Live Video Catalog ({videos.length} items)
              </h3>
            </div>

            <div className="overflow-x-auto bg-[#141418] border border-[#24242c] rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1b1b22] border-b border-[#282834] text-gray-400 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Video</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Instructor</th>
                    <th className="p-3">Views</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e28]">
                  {videos.map((vid) => (
                    <tr key={vid.id} className="hover:bg-[#191920] transition-colors">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={vid.thumbnailUrl}
                            alt={vid.title}
                            className="w-16 h-9 object-cover rounded shrink-0 border border-[#2d2d38]"
                          />
                          <div className="max-w-xs">
                            <Link
                              href={`/watch/${vid.id}`}
                              className="font-bold text-gray-200 hover:text-[#ff9900] line-clamp-1"
                            >
                              {vid.title}
                            </Link>
                            <span className="text-[10px] text-gray-400 font-mono">
                              ID: {vid.youtubeId}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-gray-300 font-medium">{vid.category}</td>
                      <td className="p-3 text-gray-300">{vid.instructor.name}</td>
                      <td className="p-3 text-gray-300 font-mono">{formatViews(vid.views)}</td>
                      <td className="p-3 text-gray-300 font-mono">{vid.duration}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/watch/${vid.id}`}
                            className="p-1.5 text-gray-400 hover:text-[#ff9900]"
                            title="Preview Video"
                          >
                            <ExternalLink size={13} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteVideo(vid.id, vid.title)}
                            className="p-1.5 text-gray-400 hover:text-red-400"
                            title="Delete Video"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Add Video Embed */}
        {activeTab === "add-video" && (
          <div className="max-w-2xl bg-[#141418] border border-[#24242c] rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center">
                <PlusCircle size={18} className="text-[#ff9900] mr-2" />
                Add Educational Video
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Paste any YouTube URL (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...).
                The YouTube ID and high-res thumbnail will be extracted automatically.
              </p>
            </div>

            {formMsg && (
              <div
                className={`p-3 rounded text-xs flex items-center ${
                  formMsg.type === "success"
                    ? "bg-emerald-950/40 text-emerald-300 border border-emerald-800/60"
                    : "bg-red-950/40 text-red-300 border border-red-800/60"
                }`}
              >
                {formMsg.type === "success" && <CheckCircle2 size={14} className="mr-2" />}
                <span>{formMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleCreateVideo} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300 block">
                  YouTube URL or ID *
                </label>
                <input
                  type="text"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=fNk_zzaMoEs"
                  className="w-full bg-[#1b1b24] text-xs text-white p-2.5 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300 block">
                  Provocative Educational Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Bare Metal Rust: Memory Safety Uncensored"
                  className="w-full bg-[#1b1b24] text-xs text-white p-2.5 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 block">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#1b1b24] text-xs text-white p-2.5 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 block">
                    Difficulty Level
                  </label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full bg-[#1b1b24] text-xs text-white p-2.5 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900]"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 block">
                    Instructor / Educator Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newInstructor}
                    onChange={(e) => setNewInstructor(e.target.value)}
                    placeholder="e.g. Grant Sanderson"
                    className="w-full bg-[#1b1b24] text-xs text-white p-2.5 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 block">
                    Channel / Handle (Optional)
                  </label>
                  <input
                    type="text"
                    value={newInstructorChannel}
                    onChange={(e) => setNewInstructorChannel(e.target.value)}
                    placeholder="e.g. 3Blue1Brown"
                    className="w-full bg-[#1b1b24] text-xs text-white p-2.5 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 block">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="Rust, Systems, Memory, Compiler"
                    className="w-full bg-[#1b1b24] text-xs text-white p-2.5 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 block">
                    Duration (e.g. 14:26)
                  </label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="14:26"
                    className="w-full bg-[#1b1b24] text-xs text-white p-2.5 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300 block">
                  Description & Key Concepts
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  placeholder="Explain what the learner will gain from this video..."
                  className="w-full bg-[#1b1b24] text-xs text-white p-2.5 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900] resize-none"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={newFeatured}
                  onChange={(e) => setNewFeatured(e.target.checked)}
                  className="rounded border-[#2c2c38] text-[#ff9900] focus:ring-[#ff9900]"
                />
                <label htmlFor="featuredCheck" className="text-xs text-gray-300 font-semibold cursor-pointer">
                  Feature this lesson prominently on the homepage (HOT badge)
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center bg-[#ff9900] hover:bg-[#e68a00] disabled:opacity-50 text-black font-extrabold text-xs px-6 py-2.5 rounded-md transition-colors shadow"
              >
                <PlusCircle size={14} className="mr-1.5" />
                {submitting ? "Adding..." : "Add to Library"}
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: Manage Categories */}
        {activeTab === "categories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Existing Categories</h3>
              <div className="space-y-2">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded bg-[#141418] border border-[#24242c] flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{c.name}</p>
                      <p className="text-[11px] text-gray-400">{c.description}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#ff9900]">
                      {c.videoCount} lessons
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-[#141418] border border-[#24242c] rounded-xl space-y-4">
              <h3 className="text-sm font-bold text-white">Add New Category</h3>
              <form onSubmit={handleCreateCategory} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 block">Name *</label>
                  <input
                    type="text"
                    required
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    placeholder="e.g. Quantum Computing"
                    className="w-full bg-[#1b1b24] text-xs text-white p-2 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 block">Slug</label>
                  <input
                    type="text"
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    placeholder="quantum-computing"
                    className="w-full bg-[#1b1b24] text-xs text-white p-2 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 block">Description</label>
                  <textarea
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    rows={2}
                    placeholder="Qubits, superposition, and quantum entanglement..."
                    className="w-full bg-[#1b1b24] text-xs text-white p-2 rounded border border-[#2c2c38] focus:outline-none focus:border-[#ff9900] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-bold text-xs px-4 py-2 rounded"
                >
                  Create Category
                </button>
              </form>
            </div>
          </div>
        )}
      </Container>
    </HomepageLayout>
  );
}
