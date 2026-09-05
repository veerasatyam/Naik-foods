import mongoose, { Schema, Document } from "mongoose";

export interface IProductDoc extends Document {
  slug: string;
  name: string;
  marathiName: string;
  region: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  weight: string;
  shelfLife: string;
  fssaiLicense: string;
  isVeg: boolean;
  isBestSeller: boolean;
  isFastFriendly: boolean;
  inStock: boolean;
  images: string[];
  shortDescription: string;
  marathiShortDesc: string;
  description: string;
  ingredients: string[];
  nutrition: Record<string, string>;
  allergens: string[];
  reviews: any[];
}

const ReviewSchema = new Schema(
  {
    id: { type: String },
    author: { type: String },
    rating: { type: Number },
    date: { type: String },
    comment: { type: String },
    verified: { type: Boolean },
    location: { type: String },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProductDoc>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    marathiName: { type: String, default: "" },
    region: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    rating: { type: Number, default: 5.0 },
    reviewCount: { type: Number, default: 1 },
    weight: { type: String, default: "250g" },
    shelfLife: { type: String, default: "6 Months" },
    fssaiLicense: { type: String, default: "11521036000428" },
    isVeg: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false },
    isFastFriendly: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    images: { type: [String], default: [] },
    shortDescription: { type: String, default: "" },
    marathiShortDesc: { type: String, default: "" },
    description: { type: String, default: "" },
    ingredients: { type: [String], default: [] },
    nutrition: { type: Map, of: String, default: {} },
    allergens: { type: [String], default: [] },
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

export const ProductModel =
  mongoose.models.Product || mongoose.model<IProductDoc>("Product", ProductSchema);
