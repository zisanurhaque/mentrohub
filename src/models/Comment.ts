import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICommentDocument extends Document {
  videoId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: number;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<ICommentDocument>(
  {
    videoId: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userAvatar: { type: String, default: "" },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    parentId: { type: String, default: null },
  },
  { timestamps: true }
);

export const CommentModel: Model<ICommentDocument> =
  mongoose.models.Comment || mongoose.model<ICommentDocument>("Comment", CommentSchema);
