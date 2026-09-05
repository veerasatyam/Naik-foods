"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/utils";
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  Lock, 
  MessageCircle, 
  Tag
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal, freeShippingThreshold, clearCart, locale } = useApp();

  const [step, setStep] = useState<"details" | "success">("details");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411002",
    paymentMethod: "upi",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const shippingCost = cartTotal >= freeShippingThreshold ? 0 : 50;
  const finalTotal = Math.max(0, cartTotal - appliedDiscount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "AAJI10") {
      const discount = Math.round(cartTotal * 0.1);
      setAppliedDiscount(discount);
      setCouponMessage("Coupon 'AAJI10' applied! 10% discount deducted.");
    } else {
      setCouponMessage("Invalid coupon code. Try 'AAJI10' for 10% off!");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    clearCart();
  };

  if (cart.length === 0 && step !== "success") {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-black text-stone-900">Your Bag is Empty</h1>
        <p className="text-xs text-stone-500">
          Add some authentic Maharashtrian delicacies to proceed to checkout.
        </p>
        <Link
          href="/store"
          className="inline-block bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow transition-colors"
        >
          Explore Delicacies
        </Link>
      </div>
    );
  }

  if (step === "success") {
    const orderId = `NF-${Math.floor(100000 + Math.random() * 900000)}`;
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
            Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
            Dhanyavad for Ordering with Naik Foods!
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Your order <strong>#{orderId}</strong> has been received and is being hand-packed fresh. A confirmation SMS will be sent to your phone.
          </p>
        </div>

        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-stone-500">Delivery To:</span>
            <span className="font-bold text-stone-900">{formData.name} ({formData.pincode})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Estimated Delivery:</span>
            <span className="font-bold text-emerald-700">Within 48-72 Hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Payment Mode:</span>
            <span className="font-bold text-stone-900 uppercase">{formData.paymentMethod}</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/919730046247?text=Hi%20Naik%20Foods!%20My%20order%20is%20%23${orderId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 shadow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Track Order on WhatsApp</span>
          </a>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-2 text-xs font-bold text-stone-500">
        <Link href="/store" className="hover:text-stone-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Store</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form: Delivery & Payment Details */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center">1</span>
              <h2 className="font-black text-base text-stone-900">Contact Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rohini Deshmukh"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Mobile Number (For Delivery Updates) *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9822012345"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-stone-600 block mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center">2</span>
              <h2 className="font-black text-base text-stone-900">Delivery Address</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Flat / House No. / Street Address *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Building name, street, nearby landmark..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Pincode *</label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center">3</span>
              <h2 className="font-black text-base text-stone-900">Payment Option</h2>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { id: "upi", label: "Instant UPI (Google Pay, PhonePe, Paytm, BHIM)", desc: "Zero convenience fee, fastest dispatch" },
                { id: "card", label: "Credit / Debit Cards (RuPay, Visa, Mastercard)", desc: "100% secure 256-bit encrypted checkout" },
                { id: "cod", label: "Cash on Delivery (COD)", desc: "Pay at your doorstep upon receiving package" },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === m.id
                      ? "border-brand-600 bg-brand-50/50 shadow-2xs"
                      : "border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m.id}
                    checked={formData.paymentMethod === m.id}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="mt-0.5 text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <div className="font-bold text-stone-900">{m.label}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">{m.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
            >
              <Lock className="w-4 h-4" />
              <span>Place Secure Order • {formatPrice(finalTotal)}</span>
            </button>
          </div>
        </form>

        {/* Right Summary Box */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-5">
            <h3 className="font-black text-base text-stone-900 pb-3 border-b border-stone-100">
              Order Summary ({cart.length} items)
            </h3>

            {/* Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded bg-stone-100 text-stone-700 font-bold flex items-center justify-center shrink-0">
                      {item.quantity}x
                    </span>
                    <span className="font-semibold text-stone-800 line-clamp-1">
                      {item.product.name}
                    </span>
                  </div>
                  <span className="font-bold text-stone-900 shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Box */}
            <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-stone-100 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon (try AAJI10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-brand-600"
                />
                <button
                  type="submit"
                  className="bg-stone-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-stone-800"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <div className="text-[11px] font-semibold text-brand-700">
                  {couponMessage}
                </div>
              )}
            </form>

            {/* Price Calculations */}
            <div className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-stone-900">{formatPrice(cartTotal)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-brand-700 font-semibold">
                  <span>Special Heritage Discount</span>
                  <span>-{formatPrice(appliedDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Express Shipping</span>
                <span className="font-bold text-stone-900">
                  {shippingCost === 0 ? "FREE" : formatPrice(50)}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-stone-900 pt-3 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="text-brand-700">{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
