"use client";

import React, { useEffect } from "react";
import { X, ShoppingBag, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  marathiTitle?: string;
  videoUrl: string; // YouTube embed or MP4 URL
  description?: string;
  linkedProduct?: {
    id: string;
    slug: string;
    name: string;
    price: number;
  };
}

export function VideoModal({
  isOpen,
  onClose,
  title,
  marathiTitle,
  videoUrl,
  description,
  linkedProduct,
}: VideoModalProps) {
  const { locale, addToCart, products } = useApp();

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEmbed = videoUrl.includes("youtube") || videoUrl.includes("vimeo") || videoUrl.includes("embed");
  const productObj = linkedProduct ? products.find((p) => p.slug === linkedProduct.slug || p.id === linkedProduct.id) : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:px-6 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-saffron-500 animate-pulse"></span>
            <div>
              <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
                {locale === "mr" && marathiTitle ? marathiTitle : title}
              </h3>
              {description && (
                <p className="text-stone-400 text-xs mt-0.5 line-clamp-1">{description}</p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close video"
            className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {isEmbed ? (
            <iframe
              src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <video
              src={videoUrl}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Optional Shoppable Product Footer */}
        {productObj && (
          <div className="p-3 sm:px-6 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-800 shrink-0 border border-stone-700">
                <img
                  src={productObj.images[0]}
                  alt={productObj.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">
                  {locale === "mr" && productObj.marathiName ? productObj.marathiName : productObj.name}
                </div>
                <div className="text-xs text-saffron-400 font-bold mt-0.5">
                  ₹{productObj.price}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/products/${productObj.slug}`}
                onClick={onClose}
                className="text-xs font-semibold text-stone-300 hover:text-white px-3 py-1.5 rounded-lg border border-stone-700 hover:bg-stone-800 transition-colors flex items-center gap-1"
              >
                <span>View Product</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={() => {
                  addToCart(productObj);
                  onClose();
                }}
                className="text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white px-4 py-1.5 rounded-lg shadow flex items-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
