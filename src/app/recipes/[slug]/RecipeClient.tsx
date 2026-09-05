"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/data/recipes";
import { Product } from "@/data/products";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/utils";
import { 
  Clock, 
  Users, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  ChevronRight,
  Utensils
} from "lucide-react";

interface Props {
  recipe: Recipe;
  linkedProducts: Product[];
}

export function RecipeClient({ recipe, linkedProducts }: Props) {
  const { addToCart, locale } = useApp();
  const [allAdded, setAllAdded] = useState(false);

  const handleAddAllToCart = () => {
    linkedProducts.forEach((prod) => {
      addToCart(prod, 1);
    });
    setAllAdded(true);
    setTimeout(() => setAllAdded(false), 2000);
  };

  const totalBundlePrice = linkedProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-brand-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/recipes" className="hover:text-brand-700">Recipes</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-stone-900 font-bold truncate">{recipe.title}</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-900 text-xs font-bold px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{recipe.region} Heritage Dish</span>
        </div>

        {/* Semantic H1 */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight leading-tight">
          {locale === "mr" ? recipe.marathiTitle : recipe.title}
        </h1>

        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {locale === "mr" ? recipe.marathiSummary : recipe.summary}
        </p>

        {/* Recipe Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-stone-600 pt-2">
          <span className="bg-stone-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-600" />
            Prep: {recipe.prepTime}
          </span>
          <span className="bg-stone-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Utensils className="w-4 h-4 text-brand-600" />
            Cook: {recipe.cookTime}
          </span>
          <span className="bg-stone-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Users className="w-4 h-4 text-brand-600" />
            Serves: {recipe.servings} people
          </span>
        </div>
      </div>

      {/* Featured Recipe Hero Image */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-md bg-stone-100">
        <Image src={recipe.image} alt={recipe.title} fill priority className="object-cover" />
      </div>

      {/* Shoppable Ingredients Bundle Box (High Conversion Feature) */}
      {linkedProducts.length > 0 && (
        <div className="bg-brand-50 border-2 border-brand-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-800 uppercase tracking-wider block mb-1">
                Shop This Recipe Bundle
              </span>
              <h3 className="text-lg sm:text-xl font-black text-stone-900">
                Get All Authentic Spices Delivered to Your Doorstep
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Bundle includes all proprietary stone-ground masalas and authentic pickles needed for this recipe.
              </p>
            </div>

            <div className="text-right sm:text-right shrink-0">
              <div className="text-2xl font-black text-brand-900">
                {formatPrice(totalBundlePrice)}
              </div>
              <span className="text-[11px] text-stone-500">For {linkedProducts.length} items</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {linkedProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl p-3 border border-brand-200/80 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg bg-stone-100 overflow-hidden shrink-0">
                    <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-stone-900 line-clamp-1">{prod.name}</div>
                    <div className="text-[11px] text-stone-500">{prod.weight}</div>
                  </div>
                </div>
                <span className="font-bold text-xs text-stone-900">{formatPrice(prod.price)}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddAllToCart}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
              allAdded ? "bg-stone-900 text-white" : "bg-brand-700 hover:bg-brand-800 text-white"
            }`}
          >
            {allAdded ? (
              <>
                <Check className="w-5 h-5 text-brand-300" />
                <span>All Ingredients Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>Add All {linkedProducts.length} Spices to Bag ({formatPrice(totalBundlePrice)})</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Ingredients List & Step-by-Step Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Ingredients */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
            <h3 className="font-black text-lg text-stone-900">Ingredients Checklist</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 pb-2 border-b border-stone-100 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2 shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Step by Step Cooking Method */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6">
            <h3 className="font-black text-lg text-stone-900">Step-by-Step Cooking Method</h3>
            <div className="space-y-6">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-black text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
