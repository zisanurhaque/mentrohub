import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategoryDocument extends Document {
  slug: string;
  name: string;
  description: string;
  iconName: string;
  videoCount: number;
  bannerImage?: string;
}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    iconName: { type: String, default: "Folder" },
    videoCount: { type: Number, default: 0 },
    bannerImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export const CategoryModel: Model<ICategoryDocument> =
  mongoose.models.Category || mongoose.model<ICategoryDocument>("Category", CategorySchema);
