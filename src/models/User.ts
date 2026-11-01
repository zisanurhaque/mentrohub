import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserDocument extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: "student" | "admin";
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

export const UserModel: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
