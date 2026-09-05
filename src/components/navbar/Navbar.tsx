"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { PRODUCTS, Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Languages, 
  MapPin, 
  Phone,
  Sparkles,
  ArrowRight
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { 
    locale, 
    setLocale, 
    t, 
    cartItemCount, 
    setIsCartOpen, 
    wishlist 
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults: Product[] = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.marathiName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(q))
        );
      }).slice(0, 6)
    : [];

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.store, href: "/store" },
    { label: t.nav.recipes, href: "/recipes" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <>
      {/* Top Announcement & Trust Bar */}
      <div className="bg-brand-900 text-stone-100 text-xs py-2 px-4 border-b border-brand-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-saffron-400 animate-pulse"></span>
            <span>{t.nav.freeDeliveryAlert}</span>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <span className="hidden sm:inline-flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-brand-300" />
              <span>{t.nav.helpline}</span>
            </span>

            {/* Marathi / English Language Toggle */}
            <div className="flex items-center gap-1 bg-brand-800/80 rounded-full px-2 py-0.5 border border-brand-700">
              <Languages className="w-3 h-3 text-brand-300" />
              <button
                onClick={() => setLocale("en")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  locale === "en" ? "bg-brand-600 text-white" : "text-stone-300 hover:text-white"
                }`}
              >
                EN
              </button>
              <span className="text-brand-600">|</span>
              <button
                onClick={() => setLocale("mr")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  locale === "mr" ? "bg-brand-600 text-white" : "text-stone-300 hover:text-white"
                }`}
              >
                मराठी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-700 flex items-center justify-center text-white font-black text-xl shadow-md border border-brand-600">
              NF
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black tracking-tight text-stone-900 leading-none">
                NAIK FOODS
              </div>
              <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-brand-700 uppercase mt-0.5">
                {locale === "mr" ? "अस्सल महाराष्ट्रीयन खाद्यसंस्कृती" : "Authentic Maharashtra • Est. 1938"}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors py-1 ${
                    isActive
                      ? "text-brand-700 border-b-2 border-brand-600"
                      : "text-stone-700 hover:text-brand-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search dialog"
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-stone-700 hover:bg-stone-100 flex items-center gap-2 transition-colors border border-transparent hover:border-stone-200"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline text-xs text-stone-500 font-medium">
                {t.nav.searchPlaceholder}
              </span>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/store?filter=wishlist"
              aria-label="View Saved Items"
              className="relative p-2.5 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-saffron-600 text-white text-[11px] font-bold flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping cart"
              className="relative bg-brand-600 hover:bg-brand-700 text-white px-3.5 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.cart}</span>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-brand-800 text-xs font-black flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-stone-800" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-4 space-y-3 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-semibold text-stone-800 hover:text-brand-600 py-2 border-b border-stone-100 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex items-center justify-between text-xs text-stone-600">
              <span>{t.nav.helpline}</span>
            </div>
          </div>
        )}
      </header>

      {/* Live Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-stone-200">
            {/* Search Input */}
            <div className="p-4 border-b border-stone-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder={t.nav.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-stone-900 placeholder:text-stone-400 text-base focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-stone-400 hover:text-stone-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-bold text-stone-500 hover:text-stone-900 px-2 py-1 rounded bg-stone-100"
              >
                ESC
              </button>
            </div>

            {/* Results or Quick Suggestions */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {searchQuery.trim() ? (
                searchResults.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                      Products Matching ({searchResults.length})
                    </div>
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                          <div>
                            <div className="font-bold text-sm text-stone-900 group-hover:text-brand-700">
                              {locale === "mr" && product.marathiName ? product.marathiName : product.name}
                            </div>
                            <div className="text-xs text-stone-500">
                              {product.region} • {product.category}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-stone-900">
                            {formatPrice(product.price)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-stone-500">
                    <p className="font-semibold text-stone-700">No items found for &quot;{searchQuery}&quot;</p>
                    <p className="text-xs mt-1 text-stone-400">
                      Try searching for &quot;Ambadi&quot;, &quot;Sauji&quot;, &quot;Bhakarwadi&quot;, or &quot;Goda Masala&quot;.
                    </p>
                  </div>
                )
              ) : (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Popular Maharashtrian Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Ambadi Lonche",
                      "Vidarbha Sauji",
                      "Pune Bhakarwadi",
                      "Kolambi Lonche",
                      "Thalipith Bhajni",
                      "Goda Masala",
                      "Shrewsbury Cookies",
                      "Alphonso Aamras",
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
