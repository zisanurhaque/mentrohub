import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICollectionDocument extends Document {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  thumbnailUrl: string;
  videoIds: string[];
  totalDuration: string;
}

const CollectionSchema = new Schema<ICollectionDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    category: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "All Levels"],
      default: "All Levels",
    },
    thumbnailUrl: { type: String, default: "" },
    videoIds: [{ type: String }],
    totalDuration: { type: String, default: "" },
  },
  { timestamps: true }
);

export const CollectionModel: Model<ICollectionDocument> =
  mongoose.models.Collection || mongoose.model<ICollectionDocument>("Collection", CollectionSchema);
