"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { CATEGORIES, REGIONS } from "@/data/products";
import { 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Upload, 
  ShieldCheck, 
  Image as ImageIcon,
  CheckCircle2
} from "lucide-react";

const IMAGE_PRESETS = [
  { label: "Spices & Masala", url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80" },
  { label: "Artisanal Pickle Jar", url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80" },
  { label: "Bhakarwadi / Snacks", url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80" },
  { label: "Bakery / Shrewsbury", url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop&q=80" },
  { label: "Mango / Aamras", url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80" },
  { label: "Flour / Hurda Bhajni", url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80" },
];

export default function AddProductPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();
  const { refreshProducts, showToast } = useApp();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    marathiName: "",
    region: "Vidarbha",
    category: "Pickles & Chutneys",
    price: "",
    originalPrice: "",
    weight: "250g",
    shelfLife: "6 Months",
    fssaiLicense: "11521036000428",
    isVeg: true,
    isBestSeller: false,
    isFastFriendly: false,
    inStock: true,
    imageUrl: IMAGE_PRESETS[0].url,
    shortDescription: "",
    marathiShortDesc: "",
    description: "",
    ingredients: "Roasted Peanuts, Dry Red Chilli, Garlic, Cumin, Sea Salt",
    calories: "380 kcal",
    protein: "12g",
    carbs: "45g",
    fat: "14g",
    allergens: "",
  });

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-xl font-bold text-stone-900">Admin Sign In Required</h1>
        <Link href="/login" className="inline-block bg-brand-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl">
          Sign In
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        marathiName: formData.marathiName || formData.name,
        region: formData.region,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice || formData.price),
        weight: formData.weight,
        shelfLife: formData.shelfLife,
        fssaiLicense: formData.fssaiLicense,
        isVeg: formData.isVeg,
        isBestSeller: formData.isBestSeller,
        isFastFriendly: formData.isFastFriendly,
        inStock: formData.inStock,
        images: [formData.imageUrl],
        shortDescription: formData.shortDescription || `${formData.name} - handcrafted authentic Maharashtrian specialty.`,
        marathiShortDesc: formData.marathiShortDesc || formData.shortDescription,
        description: formData.description || formData.shortDescription,
        ingredients: formData.ingredients.split(",").map((s) => s.trim()).filter(Boolean),
        nutrition: {
          Calories: formData.calories,
          Protein: formData.protein,
          Carbohydrates: formData.carbs,
          Fat: formData.fat,
        },
        allergens: formData.allergens.split(",").map((s) => s.trim()).filter(Boolean),
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to create product");
      }

      await refreshProducts();
      showToast(`"${formData.name}" published to storefront!`);
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Failed to publish product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5">
        <Link href="/admin/products" className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 font-semibold mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Add New Maharashtrian Delicacy
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Fill out this form to publish an authentic item immediately to the live storefront without code commits.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 font-medium">
          {error}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-base font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center">1</span>
            <span>Product Identity & Heritage</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                English Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Solapuri Roasted Shengdana Chutney"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Marathi Name (मराठी नाव)
              </label>
              <input
                type="text"
                value={formData.marathiName}
                onChange={(e) => setFormData({ ...formData, marathiName: e.target.value })}
                placeholder="उदा. सोलापूरी खमंग शेंगदाणा चटणी"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Region of Origin *
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-600"
              >
                {REGIONS.filter((r) => r !== "All").map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-600"
              >
                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Pricing, Weight & Food Safety */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-base font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center">2</span>
            <span>Pricing, Packaging & Food Safety</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Selling Price (₹) *</label>
              <input
                type="number"
                required
                min={1}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="140"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">MRP / Strikethrough (₹)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="160"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Net Weight</label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="250g / 500g"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Shelf Life</label>
              <input
                type="text"
                value={formData.shelfLife}
                onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                placeholder="6 Months"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Veg vs Non-Veg */}
            <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isVeg}
                onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
              />
              <div className="text-xs">
                <div className="font-bold text-stone-900">{formData.isVeg ? "100% Vegetarian (Green Dot)" : "Contains Seafood (Red Dot)"}</div>
                <div className="text-[11px] text-stone-500">Official Indian food safety label</div>
              </div>
            </label>

            {/* Bestseller */}
            <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBestSeller}
                onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
              />
              <div className="text-xs">
                <div className="font-bold text-stone-900">Featured Bestseller</div>
                <div className="text-[11px] text-stone-500">Showcase on Homepage hero</div>
              </div>
            </label>

            {/* Fasting Friendly */}
            <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFastFriendly}
                onChange={(e) => setFormData({ ...formData, isFastFriendly: e.target.checked })}
                className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
              />
              <div className="text-xs">
                <div className="font-bold text-stone-900">Fasting (उपवास) Friendly</div>
                <div className="text-[11px] text-stone-500">Filter under Upwas snacks</div>
              </div>
            </label>
          </div>
        </div>

        {/* Section 3: Product Imagery */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-base font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center">3</span>
            <span>Product Photography</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Image URL (WebP, JPG, PNG)</label>
              <input
                type="url"
                required
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>

            {/* One-Click Presets */}
            <div>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2">
                Or Select from Culinary Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                {IMAGE_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: p.url })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      formData.imageUrl === p.url
                        ? "bg-brand-600 text-white border-brand-600 shadow-2xs"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Image Preview */}
            <div className="pt-2">
              <span className="text-xs font-bold text-stone-500 block mb-1">Live Card Preview:</span>
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
                {formData.imageUrl && (
                  <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Descriptions & Ingredients */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-base font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center">4</span>
            <span>Descriptions & Ingredients</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Short Tagline Description</label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Crisp roasted peanuts pounded with Byadgi chillies and native garlic."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Marathi Tagline (मराठी थोडक्यात माहिती)</label>
              <input
                type="text"
                value={formData.marathiShortDesc}
                onChange={(e) => setFormData({ ...formData, marathiShortDesc: e.target.value })}
                placeholder="सोलापूरची प्रसिद्ध खमंग शेंगदाणा चटणी. गरम भाकरीसोबत अप्रतिम."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Ingredients (Comma Separated)</label>
              <input
                type="text"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                placeholder="Roasted Peanuts, Garlic, Byadgi Chilli, Cumin, Sea Salt"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Full Product Story & Backstory</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Crafted following traditional recipes handed down through generations..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{loading ? "Publishing Product..." : "Publish Product to Store"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
