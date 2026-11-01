import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVideoDocument extends Document {
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
  duration: string;
  durationSeconds: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  views: number;
  likes: number;
  dislikes: number;
  publishedAt: Date;
  featured: boolean;
  visibility: "public" | "unlisted" | "private";
  learningObjectives: string[];
  prerequisites: string[];
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideoDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    youtubeId: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, required: true },
    instructor: {
      name: { type: String, required: true },
      avatar: { type: String, default: "" },
      channel: { type: String, default: "" },
      verified: { type: Boolean, default: false },
    },
    category: { type: String, required: true, index: true },
    tags: [{ type: String, index: true }],
    duration: { type: String, required: true },
    durationSeconds: { type: Number, default: 0 },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "All Levels"],
      default: "All Levels",
    },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    publishedAt: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
    visibility: {
      type: String,
      enum: ["public", "unlisted", "private"],
      default: "public",
    },
    learningObjectives: [{ type: String }],
    prerequisites: [{ type: String }],
  },
  { timestamps: true }
);

VideoSchema.index({ title: "text", description: "text", tags: "text" });

export const VideoModel: Model<IVideoDocument> =
  mongoose.models.Video || mongoose.model<IVideoDocument>("Video", VideoSchema);
