import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWatchHistoryDocument extends Document {
  userId: string;
  videoId: string;
  progressSeconds: number;
  completed: boolean;
  lastWatchedAt: Date;
}

const WatchHistorySchema = new Schema<IWatchHistoryDocument>(
  {
    userId: { type: String, required: true, index: true },
    videoId: { type: String, required: true, index: true },
    progressSeconds: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    lastWatchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

WatchHistorySchema.index({ userId: 1, videoId: 1 }, { unique: true });

export const WatchHistoryModel: Model<IWatchHistoryDocument> =
  mongoose.models.WatchHistory || mongoose.model<IWatchHistoryDocument>("WatchHistory", WatchHistorySchema);
