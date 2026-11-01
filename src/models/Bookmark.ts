import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBookmarkDocument extends Document {
  userId: string;
  videoId: string;
  savedAt: Date;
}

const BookmarkSchema = new Schema<IBookmarkDocument>(
  {
    userId: { type: String, required: true, index: true },
    videoId: { type: String, required: true, index: true },
    savedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

BookmarkSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export const BookmarkModel: Model<IBookmarkDocument> =
  mongoose.models.Bookmark || mongoose.model<IBookmarkDocument>("Bookmark", BookmarkSchema);
