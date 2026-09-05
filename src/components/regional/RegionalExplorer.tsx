"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { REGIONS_DATA } from "@/data/regions";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { useApp } from "@/context/AppContext";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";

export function RegionalExplorer() {
  const { locale, t } = useApp();
  const [selectedRegion, setSelectedRegion] = useState<string>("Vidarbha");

  const regionInfo = REGIONS_DATA[selectedRegion];
  const regionProducts = PRODUCTS.filter((p) => p.region === selectedRegion).slice(0, 4);

  return (
    <section className="py-16 bg-cream-50/60 border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-100/70 text-brand-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>{locale === "mr" ? "प्रादेशिक खाद्यवारसा" : "Culinary Geography"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {t.regionalExplorer.title}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            {t.regionalExplorer.subtitle}
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {Object.keys(REGIONS_DATA).map((regKey) => {
            const r = REGIONS_DATA[regKey];
            const isSelected = selectedRegion === regKey;
            return (
              <button
                key={regKey}
                onClick={() => setSelectedRegion(regKey)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 shadow-xs ${
                  isSelected
                    ? "bg-brand-700 text-white shadow-md scale-105"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-brand-600"}`} />
                <span>{locale === "mr" ? r.marathiName : r.name}</span>
              </button>
            );
          })}
        </div>

        {/* Region Spotlight Banner Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-lg shadow-stone-900/5 mb-10 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block bg-saffron-100 text-saffron-800 text-[11px] font-bold px-3 py-0.5 rounded-full">
                {regionInfo.badge}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                {locale === "mr" ? regionInfo.marathiTagline : regionInfo.tagline}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {regionInfo.description}
              </p>

              {/* Specialties Tag Cloud */}
              <div className="pt-2">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  {locale === "mr" ? "प्रमुख वैशिष्ट्ये:" : "Heirloom Specialties:"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {regionInfo.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="bg-brand-50 text-brand-800 text-xs font-semibold px-3 py-1 rounded-lg border border-brand-200/60"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative aspect-video sm:aspect-4/3 rounded-2xl overflow-hidden shadow-inner bg-stone-100">
              <Image
                src={regionInfo.bannerImage}
                alt={regionInfo.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                <span className="text-white font-black text-lg drop-shadow">
                  {locale === "mr" ? regionInfo.marathiName : regionInfo.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products from Selected Region */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {regionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Regional CTA */}
        <div className="text-center mt-10">
          <Link
            href={`/store?region=${selectedRegion}`}
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow transition-colors"
          >
            <span>{t.regionalExplorer.allProducts} ({regionInfo.name})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
