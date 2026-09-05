import fs from "fs";
import path from "path";
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from "@/data/products";

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

// Initial Admin User
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

// Read Products (combining default products + dynamic products)
export function getStoredProducts(): Product[] {
  ensureDir();
  if (!fs.existsSync(PRODUCTS_FILE)) {
    // Initialize with default products
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

// Save Products
export function saveProducts(products: Product[]) {
  ensureDir();
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
}

// Add a Single Product
export function addProduct(newProduct: Product): Product[] {
  const products = getStoredProducts();
  // Ensure unique ID/slug
  const exists = products.find((p) => p.slug === newProduct.slug || p.id === newProduct.id);
  if (exists) {
    throw new Error(`Product with slug '${newProduct.slug}' already exists.`);
  }
  const updated = [newProduct, ...products];
  saveProducts(updated);
  return updated;
}

// Update a Product
export function updateProduct(id: string, updates: Partial<Product>): Product[] {
  const products = getStoredProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`Product with ID '${id}' not found.`);
  }
  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products;
}

// Delete a Product
export function deleteProduct(id: string): Product[] {
  const products = getStoredProducts();
  const updated = products.filter((p) => p.id !== id);
  saveProducts(updated);
  return updated;
}

// Get Users
export function getStoredUsers(): User[] {
  ensureDir();
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(DEFAULT_USERS, null, 2), "utf-8");
    return DEFAULT_USERS;
  }
  try {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return DEFAULT_USERS;
  }
}

// Add User
export function addUser(user: User): User[] {
  const users = getStoredUsers();
  const exists = users.find((u) => u.email.toLowerCase() === user.email.toLowerCase());
  if (exists) {
    throw new Error("An account with this email already exists.");
  }
  const updated = [...users, user];
  ensureDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}
