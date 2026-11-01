import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudyNoteDocument extends Document {
  userId: string;
  videoId: string;
  timestampSeconds?: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudyNoteSchema = new Schema<IStudyNoteDocument>(
  {
    userId: { type: String, required: true, index: true },
    videoId: { type: String, required: true, index: true },
    timestampSeconds: { type: Number, default: 0 },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const StudyNoteModel: Model<IStudyNoteDocument> =
  mongoose.models.StudyNote || mongoose.model<IStudyNoteDocument>("StudyNote", StudyNoteSchema);
