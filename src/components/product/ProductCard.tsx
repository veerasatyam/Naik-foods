"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/utils";
import { VegBadge } from "./VegBadge";
import { Star, ShoppingBag, Heart, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, locale } = useApp();
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const displayName = locale === "mr" && product.marathiName ? product.marathiName : product.name;
  const displayShortDesc = locale === "mr" && product.marathiShortDesc ? product.marathiShortDesc : product.shortDescription;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/80 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/5 transition-all duration-300 overflow-hidden">
      {/* Product Image Area */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full bg-stone-100 overflow-hidden block">
        <Image
          src={product.images[0]}
          alt={displayName}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="bg-white/95 backdrop-blur-md p-1 rounded-md shadow-sm pointer-events-auto">
              <VegBadge isVeg={product.isVeg} size="sm" />
            </span>
            <span className="bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
              {product.region}
            </span>
          </div>

          <button
            onClick={handleWishlist}
            aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-center text-stone-700 hover:text-red-500 transition-colors pointer-events-auto"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>

        {/* Discount Tag */}
        {discountPercent > 0 && (
          <div className="absolute bottom-3 left-3 bg-saffron-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow">
            {discountPercent}% OFF
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-1">
            <span className="truncate">{product.category}</span>
            <div className="flex items-center gap-1 shrink-0 font-medium text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors mb-1.5">
            <Link href={`/products/${product.slug}`}>
              {displayName}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
            {displayShortDesc}
          </p>
        </div>

        {/* Price & Action Button */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-black text-stone-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
              {product.weight}
            </span>
          </div>

          {/* Clean Add to Cart Button (No label concatenation bug) */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-95 ${
              isAdded
                ? "bg-stone-900 text-white"
                : "bg-brand-600 hover:bg-brand-700 text-white"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-brand-300" />
                <span>{locale === "mr" ? "पिशवीत टाकले!" : "Added to Bag!"}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>{locale === "mr" ? "पिशवीत टाका" : "Add to Bag"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
