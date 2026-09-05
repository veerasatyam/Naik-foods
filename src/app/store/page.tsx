"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES, REGIONS, Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { useApp } from "@/context/AppContext";
import { Filter, SlidersHorizontal, Search, X, Sparkles } from "lucide-react";

function StoreContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || searchParams.get("query") || "";
  const initialCategory = searchParams.get("category") || "All";
  const initialRegion = searchParams.get("region") || "All";
  const initialFilter = searchParams.get("filter") || "";

  const { wishlist, locale } = useApp();

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion);
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "upwas">(
    initialFilter === "upwas" ? "upwas" : "all"
  );
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">(
    "featured"
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Wishlist filter
      if (initialFilter === "wishlist" && !wishlist.includes(product.id)) {
        return false;
      }

      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          product.name.toLowerCase().includes(q) ||
          product.marathiName.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.region.toLowerCase().includes(q) ||
          product.ingredients.some((ing) => ing.toLowerCase().includes(q));
        if (!match) return false;
      }

      // Category
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      // Region
      if (selectedRegion !== "All" && product.region !== selectedRegion) {
        return false;
      }

      // Diet
      if (dietFilter === "veg" && !product.isVeg) return false;
      if (dietFilter === "upwas" && !product.isFastFriendly) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [search, selectedCategory, selectedRegion, dietFilter, sortBy, initialFilter, wishlist]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedRegion("All");
    setDietFilter("all");
    setSortBy("featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {locale === "mr" ? "सर्व अस्सल महाराष्ट्रीयन उत्पादने" : "Authentic Maharashtrian Store"}
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              {locale === "mr"
                ? "विदर्भ, कोकण, पुणे व मराठवाड्यातील अस्सल लोणची, मसाले आणि पारंपरिक पदार्थ."
                : "Handcrafted stone-ground masalas, heirloom pickles, and wholesome regional snacks."}
            </p>
          </div>

          {/* Search bar inside store */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products or ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
                selectedCategory === cat
                  ? "bg-brand-700 text-white shadow-xs"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Catalog Grid & Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-700" />
                <span>Filters</span>
              </span>
              {(selectedCategory !== "All" || selectedRegion !== "All" || dietFilter !== "all" || search) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-brand-700 hover:underline font-semibold"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Region Filter */}
            <div>
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2">
                Region of Origin
              </label>
              <div className="space-y-1.5">
                {REGIONS.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegion(reg)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedRegion === reg
                        ? "bg-brand-50 text-brand-800 font-bold"
                        : "text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <span>{reg}</span>
                    {selectedRegion === reg && <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Filter */}
            <div>
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2">
                Dietary Preference
              </label>
              <div className="space-y-1.5">
                {[
                  { id: "all", label: "All Items" },
                  { id: "veg", label: "100% Vegetarian" },
                  { id: "upwas", label: "Fasting / Upwas Special" },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDietFilter(d.id as any)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      dietFilter === d.id
                        ? "bg-brand-50 text-brand-800 font-bold"
                        : "text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <span>{d.label}</span>
                    {dietFilter === d.id && <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* Active Filter Bar & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 pb-2">
            <div>
              Showing <span className="font-bold text-stone-900">{filteredProducts.length}</span> authentic delicacies
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="font-medium">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="featured">Featured / Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base">No matching products found</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your search or clearing selected region/dietary filters.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="bg-brand-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:bg-brand-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm font-semibold text-stone-500">Loading authentic catalog...</div>}>
      <StoreContent />
    </Suspense>
  );
}
