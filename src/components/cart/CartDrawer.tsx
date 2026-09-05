"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartTotal,
    removeFromCart,
    updateQuantity,
    freeShippingThreshold,
    locale,
    t,
  } = useApp();

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  // WhatsApp Order payload generator
  const generateWhatsAppMessage = () => {
    let msg = `*Namaskar Naik Foods!* I would like to place an order:%0A%0A`;
    cart.forEach((item, index) => {
      msg += `${index + 1}. ${item.product.name} (Qty: ${item.quantity}) - ₹${item.product.price * item.quantity}%0A`;
    });
    msg += `%0A*Total Amount:* ₹${cartTotal}%0A`;
    msg += `*Delivery Pincode:* Please calculate delivery & confirm availability.`;
    return `https://wa.me/919730046247?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-700" />
              <h2 className="font-bold text-lg text-stone-900">{t.cart.title}</h2>
              <span className="text-xs bg-stone-100 text-stone-600 font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Free Shipping Progress Bar */}
          <div className="bg-brand-50/80 p-4 border-b border-brand-100">
            <div className="flex justify-between text-xs font-bold text-brand-900 mb-1.5">
              <span>
                {remainingForFreeShipping > 0
                  ? t.cart.freeDeliveryProgress(remainingForFreeShipping)
                  : t.cart.freeDeliveryUnlocked}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-brand-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">{t.cart.empty}</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">{t.cart.emptySub}</p>
                </div>
                <Link
                  href="/store"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-colors"
                >
                  {t.cart.startShopping}
                </Link>
              </div>
            ) : (
              cart.map((item) => {
                const displayName =
                  locale === "mr" && item.product.marathiName
                    ? item.product.marathiName
                    : item.product.name;

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200/80"
                  >
                    <div className="relative w-20 h-20 bg-stone-200 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={displayName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-bold text-xs text-stone-900 line-clamp-1 leading-snug">
                            {displayName}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-stone-400 hover:text-red-500 p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] text-stone-500 font-medium">
                          {item.product.weight}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        {/* Stepper */}
                        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="text-stone-500 hover:text-stone-900"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="text-stone-500 hover:text-stone-900"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-bold text-sm text-stone-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
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
                <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-100">
                  <span>{t.cart.total}</span>
                  <span>
                    {formatPrice(
                      cartTotal + (cartTotal >= freeShippingThreshold ? 0 : 50)
                    )}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-center flex items-center justify-center gap-2 shadow-md transition-all duration-200 text-sm active:scale-95"
              >
                <span>{t.cart.checkoutBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Instant WhatsApp Order CTA */}
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl text-center flex items-center justify-center gap-2 shadow-sm transition-all duration-200 text-xs active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.cart.whatsappCheckout}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
