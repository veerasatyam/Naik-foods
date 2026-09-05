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
  Utensils,
  Play
} from "lucide-react";
import { VideoModal } from "@/components/video/VideoModal";

interface Props {
  recipe: Recipe;
  linkedProducts: Product[];
}

const RECIPE_VIDEOS: Record<string, string> = {
  "authentic-pune-misal": "https://www.youtube-nocookie.com/embed/1vRzT4mK_E0",
  "crispy-hurda-thalipith": "https://www.youtube-nocookie.com/embed/B_4k8rT8Q1U",
  "nagpur-sauji-curry": "https://www.youtube-nocookie.com/embed/j4_e6k9f8uA",
  "konkan-solkadhi": "https://www.youtube-nocookie.com/embed/5kQ_s_X56F4",
};

export function RecipeClient({ recipe, linkedProducts }: Props) {
  const { addToCart, locale } = useApp();
  const [allAdded, setAllAdded] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleAddAllToCart = () => {
    linkedProducts.forEach((prod) => {
      addToCart(prod, 1);
    });
    setAllAdded(true);
    setTimeout(() => setAllAdded(false), 2000);
  };

  const totalBundlePrice = linkedProducts.reduce((sum, p) => sum + p.price, 0);
  const videoEmbed = RECIPE_VIDEOS[recipe.slug] || "https://www.youtube-nocookie.com/embed/5kQ_s_X56F4";

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

      {/* Featured Recipe Hero Image with Video Launcher */}
      <div
        onClick={() => setIsVideoOpen(true)}
        className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-xl bg-stone-900 group cursor-pointer border border-stone-200"
      >
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />

        {/* Video Scrim & Play Button */}
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-600 group-hover:bg-brand-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 border-4 border-white/50">
            <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-stone-900/90 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 border border-white/20 shadow-lg">
          <Play className="w-3.5 h-3.5 fill-saffron-400 text-saffron-400" />
          <span>{locale === "mr" ? "पाककृतीची चित्रफीत पाहा" : "Watch Step-by-Step Cooking Video"}</span>
        </div>
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

      {/* Recipe Cooking Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={recipe.title}
        marathiTitle={recipe.marathiTitle}
        videoUrl={videoEmbed}
        description={`Step-by-step masterclass: Cooking authentic ${recipe.title}`}
        linkedProduct={
          linkedProducts[0]
            ? {
                id: linkedProducts[0].id,
                slug: linkedProducts[0].slug,
                name: linkedProducts[0].name,
                price: linkedProducts[0].price,
              }
            : undefined
        }
      />
    </div>
  );
}
