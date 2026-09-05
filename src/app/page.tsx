"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { PRODUCTS } from "@/data/products";
import { RECIPES } from "@/data/recipes";
import { ProductCard } from "@/components/product/ProductCard";
import { RegionalExplorer } from "@/components/regional/RegionalExplorer";
import { formatPrice } from "@/lib/utils";
import { 
  ArrowRight, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Truck, 
  Flame, 
  Utensils, 
  BookOpen, 
  Star, 
  CheckCircle2,
  HeartHandshake
} from "lucide-react";

export default function HomePage() {
  const { t, locale, addToCart } = useApp();

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);
  const featuredRecipes = RECIPES.slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-stone-50 to-white pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-900 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-700" />
                <span>{t.hero.tagline}</span>
              </div>

              {/* Single Primary H1 for SEO */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-stone-900 tracking-tight leading-[1.15]">
                {t.hero.title}
              </h1>

              <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.hero.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/store"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm sm:text-base shadow-md transition-all duration-200 text-center flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/recipes"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-sm sm:text-base border border-stone-300 shadow-xs transition-colors text-center flex items-center justify-center gap-2"
                >
                  <Utensils className="w-4 h-4 text-brand-700" />
                  <span>{t.hero.recipesBtn}</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-3 text-center lg:text-left">
                <div className="space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-bold text-stone-900">
                    <Award className="w-4 h-4 text-brand-600" />
                    <span className="truncate">{t.hero.trust1}</span>
                  </div>
                  <div className="text-[11px] text-stone-500">Central Food Lic.</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-bold text-stone-900">
                    <ShieldCheck className="w-4 h-4 text-brand-600" />
                    <span className="truncate">{t.hero.trust2}</span>
                  </div>
                  <div className="text-[11px] text-stone-500">Heirloom Recipes</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-bold text-stone-900">
                    <Truck className="w-4 h-4 text-brand-600" />
                    <span className="truncate">{t.hero.trust3}</span>
                  </div>
                  <div className="text-[11px] text-stone-500">Hassle-Free Transit</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                <Image
                  src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1000&auto=format&fit=crop&q=80"
                  alt="Authentic Maharashtrian Delicacies"
                  fill
                  priority
                  className="object-cover"
                />
                {/* Floating Heritage Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-stone-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-saffron-100 text-saffron-800 flex items-center justify-center font-black text-sm shrink-0">
                      1938
                    </div>
                    <div>
                      <div className="text-xs font-black text-stone-900">Aaji&apos;s Authentic Recipes</div>
                      <div className="text-[11px] text-stone-500">From Pusad, Vidarbha to Pune</div>
                    </div>
                  </div>
                  <Link
                    href="/about"
                    className="text-xs font-bold text-brand-700 hover:text-brand-800 underline shrink-0"
                  >
                    Our Story
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Regional Explorer Section */}
      <RegionalExplorer />

      {/* 3. Bestsellers & Heritage Specialties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-saffron-700 uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5 text-saffron-500" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {locale === "mr" ? "सर्वाधिक पसंतीची उत्पादने" : "Bestselling Maharashtrian Delicacies"}
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              {locale === "mr" 
                ? "घरोघरी आवडीने खाल्ली जाणारी अस्सल लोणची, मसाले आणि स्नॅक्स."
                : "Handcrafted in small batches using traditional stone-ground techniques."}
            </p>
          </div>

          <Link
            href="/store"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-800 transition-colors shrink-0 group"
          >
            <span>{locale === "mr" ? "सर्व उत्पादने पहा" : "View Full Catalog"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Shoppable Recipe Hub Spotlight */}
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-900/80 text-brand-300 text-xs font-bold px-3 py-1 rounded-full mb-2 border border-brand-700">
              <Utensils className="w-3.5 h-3.5" />
              <span>1-Click Shoppable Recipes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Cook Iconic Maharashtrian Dishes at Home
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-2">
              Browse authentic step-by-step recipes and instantly add all exact required stone-ground masalas and premixes directly to your cart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-stone-800/80 rounded-2xl overflow-hidden border border-stone-700 flex flex-col justify-between group hover:border-brand-500 transition-colors"
              >
                <div className="relative aspect-video w-full bg-stone-700">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {recipe.region}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs text-brand-400 font-semibold mb-1">
                      Prep: {recipe.prepTime} • Cook: {recipe.cookTime}
                    </div>
                    <h3 className="font-bold text-white text-base leading-snug">
                      {locale === "mr" ? recipe.marathiTitle : recipe.title}
                    </h3>
                    <p className="text-xs text-stone-400 mt-2 line-clamp-2">
                      {locale === "mr" ? recipe.marathiSummary : recipe.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-700/80 flex items-center justify-between">
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                    >
                      <span>Read Recipe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Quick Add Recipe Ingredients CTA */}
                    <button
                      onClick={() => {
                        recipe.productIds.forEach((pid) => {
                          const p = PRODUCTS.find((prod) => prod.id === pid);
                          if (p) addToCart(p, 1);
                        });
                      }}
                      className="text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Shop Ingredients
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-bold px-6 py-3 rounded-xl border border-stone-700 transition-colors"
            >
              <span>Explore All Traditional Recipes</span>
              <BookOpen className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Aaji's Heritage Story (Pusad to Pune, 1938) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-brand-800 text-brand-200 text-xs font-bold px-3 py-1 rounded-full border border-brand-700">
                <HeartHandshake className="w-3.5 h-3.5 text-brand-400" />
                <span>Our Roots • Pusad to Shukrawar Peth, Pune</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                Preserving Aaji&apos;s Hand-Pounded Tradition Since 1938
              </h2>
              <p className="text-brand-100/90 text-xs sm:text-sm leading-relaxed">
                In 1938, in the agrarian town of Pusad in Vidarbha, our grandmother (Aaji) began hand-pounding spices using stone mortars and sun-curing seasonal wild Ambadi leaves. No commercial additives, no artificial vinegar, and no shortcuts.
              </p>
              <p className="text-brand-100/90 text-xs sm:text-sm leading-relaxed">
                Today, from our flagship store at <strong>Seva Mitra Mandal Chowk, Shukrawar Peth, Pune</strong>, we continue that exact craft. Every bottle of Ambadi Lonche, every packet of Vidarbha Sauji Masala, and every batch of Pune Jowar Bhakarwadi is produced adhering to her original time-honored standards.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="bg-white text-brand-900 hover:bg-brand-50 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow transition-colors inline-block"
                >
                  Read Our Full Story
                </Link>
                <Link
                  href="/contact"
                  className="bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl border border-brand-600 transition-colors inline-block"
                >
                  Visit Pune Flagship Store
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 relative aspect-square rounded-2xl overflow-hidden border-2 border-brand-700/60 shadow-inner bg-brand-950">
              <Image
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80"
                alt="Traditional Stone Spices"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Verified Customer Reviews (Replaces template cooked-meals text) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-4 h-4 text-brand-600" />
            <span>Real Customer Experiences</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Loved by Maharashtrians Across India
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Genuine verified reviews for our authentic pickles, stone-ground masalas, and snacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
              &quot;Being from Nagpur, I missed genuine Vidarbha Sauji masala in Bangalore. Naik Foods Sauji masala delivered the exact 32-spice authentic heat and aroma. Outstanding quality!&quot;
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-stone-900">Dr. Nilesh Gawande</div>
                <div className="text-stone-400">Bengaluru • Verified Buyer</div>
              </div>
              <span className="text-brand-700 bg-brand-50 px-2 py-0.5 rounded font-semibold text-[10px]">
                Sauji Masala
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
              &quot;Their Ambadi Bhajiche Lonche is irreplaceable. Tangy, natural, and no vinegar aftertaste. Tastes exactly like what my grandmother in Akola used to pack for us.&quot;
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-stone-900">Sunita Deshmukh</div>
                <div className="text-stone-400">Pune • Verified Buyer</div>
              </div>
              <span className="text-brand-700 bg-brand-50 px-2 py-0.5 rounded font-semibold text-[10px]">
                Ambadi Lonche
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
              &quot;The Shrewsbury butter cookies and Jowar Bhakarwadi arrived fresh in airtight packaging. Crispy, buttery, and not oily. Will order again every month!&quot;
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-stone-900">Mandar Joshi</div>
                <div className="text-stone-400">Mumbai • Verified Buyer</div>
              </div>
              <span className="text-brand-700 bg-brand-50 px-2 py-0.5 rounded font-semibold text-[10px]">
                Shrewsbury & Bhakarwadi
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
