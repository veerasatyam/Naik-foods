"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/utils";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Truck
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    cartTotal,
    removeFromCart,
    updateQuantity,
    freeShippingThreshold,
    locale,
    t,
  } = useApp();

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto text-brand-600">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-stone-900">{t.cart.empty}</h1>
        <p className="text-xs text-stone-500 max-w-xs mx-auto">{t.cart.emptySub}</p>
        <Link
          href="/store"
          className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-colors"
        >
          {t.cart.startShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
        {t.cart.title} ({cart.length} items)
      </h1>

      {/* Free Shipping Tracker */}
      <div className="bg-brand-50 p-4 sm:p-5 rounded-2xl border border-brand-200/80">
        <div className="flex justify-between text-xs sm:text-sm font-bold text-brand-900 mb-2">
          <span>
            {remainingForFreeShipping > 0
              ? t.cart.freeDeliveryProgress(remainingForFreeShipping)
              : t.cart.freeDeliveryUnlocked}
          </span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-brand-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const displayName =
              locale === "mr" && item.product.marathiName
                ? item.product.marathiName
                : item.product.name;

            return (
              <div
                key={item.product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={displayName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">{displayName}</h3>
                    <div className="text-xs text-stone-500 mt-0.5">
                      {item.product.region} • {item.product.weight}
                    </div>
                    <div className="font-bold text-sm text-stone-900 mt-1 sm:hidden">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6">
                  {/* Stepper */}
                  <div className="flex items-center gap-3 border border-stone-200 rounded-lg px-2.5 py-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="text-stone-500 hover:text-stone-900"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="text-stone-500 hover:text-stone-900"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="hidden sm:inline font-bold text-sm text-stone-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-stone-400 hover:text-red-500 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary & Checkout */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-black text-base text-stone-900 pb-3 border-b border-stone-100">
            Order Summary
          </h2>

          <div className="space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>{t.cart.subtotal}</span>
              <span className="font-bold text-stone-900">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.cart.delivery}</span>
              <span className="font-bold text-brand-700">
                {cartTotal >= freeShippingThreshold ? t.cart.free : formatPrice(50)}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-stone-900 pt-3 border-t border-stone-100">
              <span>{t.cart.total}</span>
              <span>{formatPrice(cartTotal + (cartTotal >= freeShippingThreshold ? 0 : 50))}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-black text-sm rounded-xl text-center flex items-center justify-center gap-2 shadow transition-colors active:scale-95"
          >
            <span>{t.cart.checkoutBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
