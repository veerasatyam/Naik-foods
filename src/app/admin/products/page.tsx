"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { VegBadge } from "@/components/product/VegBadge";
import { 
  Package, 
  PlusCircle, 
  Search, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ExternalLink,
  SlidersHorizontal,
  Sparkles
} from "lucide-react";

export default function AdminProductsPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const { refreshProducts } = useApp();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Toggle Stock Status
  const handleToggleStock = async (product: Product) => {
    setActionLoadingId(product.id);
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          updates: { inStock: !product.inStock },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        await refreshProducts();
      }
    } catch (err) {
      alert("Failed to update stock");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete Product
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the store?`)) {
      return;
    }
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        await refreshProducts();
      }
    } catch (err) {
      alert("Failed to delete product");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-xl font-bold text-stone-900">Admin Sign In Required</h1>
        <Link href="/login" className="inline-block bg-brand-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl">
          Sign In
        </Link>
      </div>
    );
  }

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.marathiName.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <Link href="/admin" className="hover:text-stone-900 flex items-center gap-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Admin Home</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Inventory & Products Manager
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage your {products.length} live Maharashtrian specialties without code commits.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-black flex items-center justify-center gap-2 shadow transition-colors shrink-0 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Search Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, region, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-600 shadow-2xs"
          />
        </div>

        <span className="text-xs text-stone-500 font-medium">
          Showing <strong>{filtered.length}</strong> items
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4">Delicacy / Title</th>
                <th className="py-3.5 px-4">Region</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price / Wt</th>
                <th className="py-3.5 px-4">Diet / Compliance</th>
                <th className="py-3.5 px-4 text-center">Stock Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                  {/* Thumbnail & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                        <Image src={prod.images[0]} alt="" fill className="object-cover" />
                      </div>
                      <div className="max-w-xs">
                        <div className="font-bold text-stone-900 line-clamp-1">{prod.name}</div>
                        <div className="text-[11px] text-stone-500 font-normal line-clamp-1">{prod.marathiName}</div>
                      </div>
                    </div>
                  </td>

                  {/* Region */}
                  <td className="py-3.5 px-4">
                    <span className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded-md text-[11px] font-semibold">
                      {prod.region}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 text-stone-600">{prod.category}</td>

                  {/* Price & Weight */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-stone-900">{formatPrice(prod.price)}</div>
                    <div className="text-[11px] text-stone-400">{prod.weight}</div>
                  </td>

                  {/* Veg dot & FSSAI */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <VegBadge isVeg={prod.isVeg} size="sm" />
                      <span className="text-[11px] text-stone-500 font-mono">
                        {prod.isVeg ? "Veg" : "Seafood"}
                      </span>
                    </div>
                  </td>

                  {/* 1-Click In-Stock Toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      disabled={actionLoadingId === prod.id}
                      onClick={() => handleToggleStock(prod)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-2xs ${
                        prod.inStock
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                          : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                      }`}
                    >
                      {prod.inStock ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-red-600" />
                          <span>Sold Out</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/products/${prod.slug}`}
                        target="_blank"
                        title="View on live storefront"
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        disabled={actionLoadingId === prod.id}
                        onClick={() => handleDelete(prod.id, prod.name)}
                        title="Delete product"
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
