import fs from "fs";
import path from "path";
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from "@/data/products";
import { connectToDatabase } from "./mongodb";
import { ProductModel } from "@/models/Product";
import { UserModel } from "@/models/User";

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "dynamic_products.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "customer";
  passwordHash?: string;
  createdAt: string;
}

const DEFAULT_USERS: User[] = [
  {
    id: "usr_admin_1",
    name: "Satyam (Admin)",
    email: "satyamsvs788@gmail.com",
    phone: "9730046247",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "usr_demo_customer",
    name: "Aparna Kulkarni",
    email: "customer@naikfoods.co.in",
    phone: "9822012345",
    role: "customer",
    createdAt: new Date().toISOString(),
  }
];

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Synchronous local file read (fallback & build time)
export function getStoredProducts(): Product[] {
  ensureDir();
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(DEFAULT_PRODUCTS, null, 2), "utf-8");
    return DEFAULT_PRODUCTS;
  }
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading products file, falling back to defaults", err);
    return DEFAULT_PRODUCTS;
  }
}

export function saveProducts(products: Product[]) {
  ensureDir();
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
}

// Async MongoDB-powered Product Fetch
export async function getProductsFromDb(): Promise<Product[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const docs = await ProductModel.find({}).lean();
      if (docs && docs.length > 0) {
        const mapped: Product[] = docs.map((d: any) => ({
          id: d._id ? d._id.toString() : d.id,
          slug: d.slug,
          name: d.name,
          marathiName: d.marathiName || d.name,
          region: d.region,
          category: d.category,
          price: d.price,
          originalPrice: d.originalPrice,
          rating: d.rating,
          reviewCount: d.reviewCount,
          weight: d.weight,
          shelfLife: d.shelfLife,
          fssaiLicense: d.fssaiLicense,
          isVeg: d.isVeg,
          isBestSeller: d.isBestSeller,
          isFastFriendly: d.isFastFriendly,
          inStock: d.inStock,
          images: d.images,
          shortDescription: d.shortDescription,
          marathiShortDesc: d.marathiShortDesc,
          description: d.description,
          ingredients: d.ingredients,
          nutrition: d.nutrition instanceof Map ? Object.fromEntries(d.nutrition) : (d.nutrition || {}),
          allergens: d.allergens,
          reviews: d.reviews || [],
        }));
        // Update local cache
        saveProducts(mapped);
        return mapped;
      }
    }
  } catch (err) {
    console.warn("MongoDB fetch failed, using local cache:", (err as any).message);
  }
  return getStoredProducts();
}

// Add Product to MongoDB and Local Cache
export async function addProductAsync(newProduct: Product): Promise<Product[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await ProductModel.findOneAndUpdate(
        { slug: newProduct.slug },
        { ...newProduct },
        { upsert: true, new: true }
      );
    }
  } catch (err) {
    console.warn("MongoDB insert error, saving locally:", (err as any).message);
  }

  // Also maintain local cache
  const products = getStoredProducts();
  const exists = products.find((p) => p.slug === newProduct.slug || p.id === newProduct.id);
  let updated = products;
  if (!exists) {
    updated = [newProduct, ...products];
    saveProducts(updated);
  }
  return updated;
}

// Update Product in MongoDB and Local Cache
export async function updateProductAsync(id: string, updates: Partial<Product>): Promise<Product[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await ProductModel.updateOne({ $or: [{ _id: id }, { id }, { slug: id }] }, { $set: updates });
    }
  } catch (err) {
    console.warn("MongoDB update error:", (err as any).message);
  }

  const products = getStoredProducts();
  const index = products.findIndex((p) => p.id === id || p.slug === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
  }
  return products;
}

// Delete Product in MongoDB and Local Cache
export async function deleteProductAsync(id: string): Promise<Product[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await ProductModel.deleteOne({ $or: [{ _id: id }, { id }, { slug: id }] });
    }
  } catch (err) {
    console.warn("MongoDB delete error:", (err as any).message);
  }

  const products = getStoredProducts();
  const updated = products.filter((p) => p.id !== id && p.slug !== id);
  saveProducts(updated);
  return updated;
}

// User Helpers
export async function getUsersFromDb(): Promise<User[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const docs = await UserModel.find({}).lean();
      if (docs && docs.length > 0) {
        return docs.map((u: any) => ({
          id: u.id || u._id.toString(),
          name: u.name,
          email: u.email,
          phone: u.phone || "",
          role: u.role || "customer",
          createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : new Date().toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn("MongoDB user fetch failed, using local store:", (err as any).message);
  }

  ensureDir();
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(DEFAULT_USERS, null, 2), "utf-8");
    return DEFAULT_USERS;
  }
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  } catch {
    return DEFAULT_USERS;
  }
}

export async function addUserAsync(user: User): Promise<User[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await UserModel.findOneAndUpdate(
        { email: user.email.toLowerCase() },
        { ...user, email: user.email.toLowerCase() },
        { upsert: true, new: true }
      );
    }
  } catch (err) {
    console.warn("MongoDB user create error:", (err as any).message);
  }

  const users = await getUsersFromDb();
  ensureDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  return users;
}
