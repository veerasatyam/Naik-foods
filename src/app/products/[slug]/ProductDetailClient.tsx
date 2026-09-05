"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/utils";
import { checkPincode, DeliveryEstimate } from "@/lib/pincodes";
import { VegBadge } from "@/components/product/VegBadge";
import { ProductCard } from "@/components/product/ProductCard";
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Check, 
  Truck, 
  ShieldCheck, 
  Award, 
  Calendar, 
  AlertCircle, 
  MessageCircle,
  Plus,
  Minus,
  MapPin,
  ChevronRight,
  UserCheck
} from "lucide-react";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: Props) {
  const { addToCart, toggleWishlist, isInWishlist, locale, t } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Pincode checking state
  const [pincodeInput, setPincodeInput] = useState("411002");
  const [deliveryEstimate, setDeliveryEstimate] = useState<DeliveryEstimate | null>(
    checkPincode("411002", product.price)
  );

  // Write a Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState(product.reviews);

  const isFavorited = isInWishlist(product.id);
  const displayName = locale === "mr" && product.marathiName ? product.marathiName : product.name;
  const displayShortDesc = locale === "mr" && product.marathiShortDesc ? product.marathiShortDesc : product.shortDescription;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkPincode(pincodeInput, product.price * quantity);
    setDeliveryEstimate(result);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newRev = {
      id: `r-${Date.now()}`,
      author: reviewName,
      rating: reviewRating,
      date: "Just now",
      comment: reviewComment,
      verified: true,
      location: "Maharashtra",
    };
    setReviewsList([newRev, ...reviewsList]);
    setIsReviewModalOpen(false);
    setReviewName("");
    setReviewComment("");
  };

  const generateWhatsAppOrderLink = () => {
    const text = `*Namaskar Naik Foods!* I want to order:%0A- *${product.name}*%0A- Weight: ${product.weight}%0A- Quantity: ${quantity}%0A- Total: ₹${product.price * quantity}%0APlease confirm availability.`;
    return `https://wa.me/919730046247?text=${text}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <a href="/" className="hover:text-brand-700">Home</a>
        <ChevronRight className="w-3.5 h-3.5" />
        <a href="/store" className="hover:text-brand-700">Store</a>
        <ChevronRight className="w-3.5 h-3.5" />
        <a href={`/store?region=${product.region}`} className="hover:text-brand-700">{product.region}</a>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-stone-900 font-bold truncate max-w-xs">{displayName}</span>
      </nav>

      {/* Main Product Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={displayName}
              fill
              priority
              className="object-cover"
            />
            {/* Badges on main image */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm">
                <VegBadge isVeg={product.isVeg} size="md" showLabel />
              </span>
              <span className="bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {product.region}
              </span>
            </div>

            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle Wishlist"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-stone-700 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx ? "border-brand-600 scale-95" : "border-stone-200 opacity-70"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Purchase Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">
              {product.region} • {product.category}
            </div>

            {/* Semantic H1: Exact Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight leading-tight">
              {displayName}
            </h1>

            {/* Rating Stars & Verified Reviews Count */}
            <div className="flex items-center gap-3 mt-3 text-xs">
              <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-stone-500 font-medium">
                ({reviewsList.length} Verified Reviews)
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {t.product.inStock}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-stone-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-stone-600 bg-white px-3 py-1 rounded-lg border border-stone-200 shadow-2xs">
              Net Weight: {product.weight}
            </span>
          </div>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Stepper & Add to Bag */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-stone-300 rounded-xl bg-white px-3 py-2 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-stone-500 hover:text-stone-900 p-1"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold text-sm text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-stone-500 hover:text-stone-900 p-1"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Clean Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all duration-200 active:scale-95 ${
                  isAdded
                    ? "bg-stone-900 text-white"
                    : "bg-brand-600 hover:bg-brand-700 text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 text-brand-300" />
                    <span>{t.product.added}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>{t.product.addToCart}</span>
                  </>
                )}
              </button>
            </div>

            {/* 1-Click WhatsApp Order Button */}
            <a
              href={generateWhatsAppOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.product.orderWhatsapp}</span>
            </a>
          </div>

          {/* Pincode Delivery Estimator */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
              <Truck className="w-4 h-4 text-brand-700" />
              <span>{t.product.checkDelivery}</span>
            </div>

            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value)}
                placeholder={t.product.pincodePlaceholder}
                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
              <button
                type="submit"
                className="bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                Check
              </button>
            </form>

            {deliveryEstimate && (
              <div className="text-xs text-stone-600 space-y-1 pt-1">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                  <Check className="w-3.5 h-3.5" />
                  <span>
                    Delivering to {deliveryEstimate.city}, {deliveryEstimate.state} by{" "}
                    <strong>{deliveryEstimate.deliveryDate}</strong>
                  </span>
                </div>
                <div className="text-[11px] text-stone-500">
                  Shipping: {deliveryEstimate.shippingCost === 0 ? "FREE" : "₹50 (Free over ₹499)"}
                </div>
              </div>
            )}
          </div>

          {/* Food Safety, FSSAI & Shelf Life Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-stone-600">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-700" />
                <span>FSSAI License</span>
              </div>
              <div className="text-[11px] font-mono text-stone-600">{product.fssaiLicense}</div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-700" />
                <span>Shelf Life</span>
              </div>
              <div className="text-[11px] text-stone-600">{product.shelfLife} (Airtight Store)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Ingredients, Nutrition & Allergens */}
      <div className="border-t border-stone-200 pt-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Ingredients */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-700" />
              <span>{t.product.ingredients}</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-stone-600">
              {product.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Nutrition Facts */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-700" />
              <span>{t.product.nutrition}</span>
            </h3>
            <div className="space-y-1.5 text-xs">
              {Object.entries(product.nutrition).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1 border-b border-stone-100 last:border-0">
                  <span className="text-stone-500">{key}</span>
                  <span className="font-bold text-stone-800">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Allergens & Storage Advice */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
            <div>
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Allergen Information</span>
              </h3>
              <p className="text-xs text-stone-600">
                {product.allergens.length > 0 ? (
                  <>Contains: <strong>{product.allergens.join(", ")}</strong></>
                ) : (
                  "No common allergens detected. 100% natural spices."
                )}
              </p>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-900 block mb-1">Storage Instructions:</span>
              <p className="text-xs text-stone-500">
                Store in a cool, dry place away from direct sunlight. Use a clean dry spoon for pickles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Reviews Section & Write Review Modal */}
      <section className="border-t border-stone-200 pt-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              {t.product.reviews} ({reviewsList.length})
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Read real feedback from verified customers across Maharashtra.
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0"
          >
            {t.product.writeReview}
          </button>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-stone-900">{rev.author}</span>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                      <UserCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-stone-400">{rev.date}</span>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-xs text-stone-600 leading-relaxed italic">
                &quot;{rev.comment}&quot;
              </p>
              <div className="text-[11px] text-stone-400">{rev.location}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Write Review Modal Simulator */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-stone-900">Write a Verified Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Rohini Deshmukh"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Rating</label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-600"
                >
                  <option value={5}>5 Stars - Outstanding Taste</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Average</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Your Feedback</label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your thoughts on the taste, texture, and packaging..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Related Regional Specialties */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-stone-200 pt-12 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              More Delicacies from {product.region}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Handpicked authentic items paired frequently with {displayName}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
