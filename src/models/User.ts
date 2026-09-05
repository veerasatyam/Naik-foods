import mongoose, { Schema, Document } from "mongoose";

export interface IUserDoc extends Document {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "customer";
  passwordHash?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUserDoc>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, default: "" },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    passwordHash: { type: String },
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User || mongoose.model<IUserDoc>("User", UserSchema);
