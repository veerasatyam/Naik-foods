import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { RECIPES } from "@/data/recipes";
import { Utensils, Clock, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Shoppable Maharashtrian Recipes | Cook Authentic Dishes at Home",
  description: "Browse step-by-step traditional Maharashtrian recipes—from Pune Misal Pav to Nagpur Sauji Paneer—and purchase all stone-ground spices in 1 click.",
};

export default function RecipesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-800 text-xs font-bold px-3 py-1 rounded-full">
          <Utensils className="w-3.5 h-3.5" />
          <span>Heirloom Culinary Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Shoppable Maharashtrian Recipes
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm">
          Experience the authentic taste of Vidarbha, Konkan, and Pune. Follow our traditional cooking steps and get the exact required spices delivered fresh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {RECIPES.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all"
          >
            <div className="relative aspect-4/3 w-full bg-stone-100">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {recipe.region}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-3 text-[11px] text-stone-500 mb-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {recipe.cookTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {recipe.servings} Servings
                  </span>
                </div>

                <h2 className="font-bold text-sm text-stone-900 line-clamp-2 leading-snug group-hover:text-brand-700 transition-colors">
                  {recipe.title}
                </h2>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                  {recipe.summary}
                </p>
              </div>

              <Link
                href={`/recipes/${recipe.slug}`}
                className="w-full py-2 bg-stone-50 hover:bg-brand-50 text-stone-700 hover:text-brand-700 text-xs font-bold rounded-xl border border-stone-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Full Recipe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
