"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Product } from "@/data/products";
import { 
  Package, 
  PlusCircle, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Layers
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Protect Admin Route
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-stone-900">Access Restricted</h1>
        <p className="text-xs text-stone-500">
          This portal is reserved for Naik Foods administrators. Please sign in with an authorized admin account.
        </p>
        <Link
          href="/login"
          className="inline-block bg-stone-900 text-white font-bold text-xs px-6 py-3 rounded-xl shadow"
        >
          Sign In as Admin
        </Link>
      </div>
    );
  }

  const inStockCount = products.filter((p) => p.inStock).length;
  const bestSellerCount = products.filter((p) => p.isBestSeller).length;

  const regionCounts = products.reduce((acc, p) => {
    acc[p.region] = (acc[p.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-stone-900 to-stone-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-stone-700">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-brand-800/80 text-brand-300 text-xs font-bold px-3 py-1 rounded-full border border-brand-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Storefront Management Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome, {user?.name || "Admin"}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
            Add new authentic Maharashtrian delicacies, adjust retail pricing, manage live stock, and review customer feedback without touching code.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Link
            href="/admin/products/new"
            className="px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow transition-colors active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/admin/products"
            className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center justify-center gap-2 border border-stone-600 transition-colors"
          >
            <Package className="w-4 h-4" />
            <span>Manage Inventory</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
            <span>Total Catalog</span>
            <Package className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-3xl font-black text-stone-900">{products.length} Items</div>
          <div className="text-[11px] text-stone-400">Heirloom specialties listed</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
            <span>In Stock</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700">{inStockCount} Active</div>
          <div className="text-[11px] text-stone-400">Available for immediate delivery</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
            <span>Bestsellers</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-stone-900">{bestSellerCount} Featured</div>
          <div className="text-[11px] text-stone-400">Highlighted on homepage</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
            <span>FSSAI Central Status</span>
            <ShieldCheck className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-base font-black text-stone-900">Active Lic.</div>
          <div className="text-[11px] font-mono text-stone-400">11521036000428</div>
        </div>
      </div>

      {/* Regional Inventory Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
          <h2 className="font-black text-base text-stone-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-700" />
            <span>Regional Catalog Breakdown</span>
          </h2>
          <div className="space-y-3 text-xs">
            {Object.entries(regionCounts).map(([region, count]) => {
              const percent = Math.round((count / (products.length || 1)) * 100);
              return (
                <div key={region} className="space-y-1">
                  <div className="flex justify-between font-bold text-stone-800">
                    <span>{region}</span>
                    <span>{count} products ({percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-600 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Launchpad */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-black text-base text-stone-900">Admin Actions</h2>
          <div className="space-y-3 text-xs">
            <Link
              href="/admin/products/new"
              className="p-3.5 bg-brand-50 hover:bg-brand-100 text-brand-900 rounded-2xl border border-brand-200 flex items-center justify-between transition-colors group"
            >
              <div>
                <div className="font-bold text-sm">Add New Product to Store</div>
                <div className="text-[11px] text-stone-600">Visual form with Marathi translation and food safety options</div>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-700 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/admin/products"
              className="p-3.5 bg-stone-50 hover:bg-stone-100 text-stone-900 rounded-2xl border border-stone-200 flex items-center justify-between transition-colors group"
            >
              <div>
                <div className="font-bold text-sm">Update Stock & Prices</div>
                <div className="text-[11px] text-stone-600">1-click in-stock / sold out toggles</div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/store"
              className="p-3.5 bg-stone-50 hover:bg-stone-100 text-stone-900 rounded-2xl border border-stone-200 flex items-center justify-between transition-colors group"
            >
              <div>
                <div className="font-bold text-sm">View Customer Storefront</div>
                <div className="text-[11px] text-stone-600">Inspect live products as shoppers see them</div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
