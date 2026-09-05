"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  LogOut, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { wishlist } = useApp();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-500">
          <User className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-black text-stone-900">Please Sign In</h1>
        <p className="text-xs text-stone-500">
          Sign in to view your profile, active orders, and saved favorites.
        </p>
        <Link
          href="/login"
          className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow"
        >
          Sign In / Register
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Spotlight Banner if user has admin privileges */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-brand-950 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-stone-700">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Super Admin Privileges Active</span>
            </div>
            <h2 className="text-xl font-black">Naik Foods Store Management</h2>
            <p className="text-xs text-stone-300">
              You have access to add products, adjust stock, and edit prices without code commits.
            </p>
          </div>
          <Link
            href="/admin"
            className="px-5 py-3 bg-brand-600 hover:bg-brand-500 text-white text-xs font-black rounded-xl shadow flex items-center justify-center gap-2 shrink-0 transition-colors"
          >
            <span>Open Admin Dashboard</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Profile Overview */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-700 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900">{user?.name}</h1>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                isAdmin ? "bg-amber-100 text-amber-800" : "bg-stone-100 text-stone-700"
              }`}>
                {user?.role}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {user?.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                {user?.phone}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-stone-600 text-xs font-bold flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Saved Address */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <MapPin className="w-4 h-4 text-brand-700" />
            <span>Default Delivery Address</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Flat 402, Shivshanti Heights, Deccan Gymkhana, Pune, Maharashtra - 411004
          </p>
          <span className="text-[11px] text-brand-700 font-semibold cursor-pointer hover:underline block pt-1">
            Edit Address
          </span>
        </div>

        {/* Card 2: Wishlist Count */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Heart className="w-4 h-4 text-red-600" />
            <span>Saved Favorites</span>
          </div>
          <div className="text-2xl font-black text-stone-900">{wishlist.length} Items</div>
          <Link href="/store?filter=wishlist" className="text-[11px] text-brand-700 font-semibold hover:underline block">
            View saved delicacies →
          </Link>
        </div>

        {/* Card 3: Support Quick Connect */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-brand-700" />
            <span>Need Help?</span>
          </div>
          <p className="text-xs text-stone-600">
            Have questions about an ongoing order or product shelf life?
          </p>
          <a
            href="https://wa.me/919730046247"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-brand-700 font-semibold hover:underline block"
          >
            Chat with Customer Care on WhatsApp →
          </a>
        </div>
      </div>

      {/* Simulated Order History */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-6">
        <h3 className="text-base font-black text-stone-900">Recent Orders</h3>
        <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100 text-xs">
          <div className="p-4 bg-stone-50 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-bold text-stone-900">Order #NF-842910</span>
              <span className="text-stone-400 mx-2">•</span>
              <span className="text-stone-500">Placed on 2 days ago</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              Delivered Successfully
            </span>
          </div>
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-stone-800 text-sm">Vidarbha Ambadi Bhajiche Lonche (300g) + Baked Jowar Bhakarwadi (250g)</div>
              <div className="text-stone-500 text-[11px] mt-0.5">Paid via UPI • Pune Express Dispatch</div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-black text-stone-900 text-sm">₹330</div>
              <span className="text-[11px] text-brand-700 font-semibold hover:underline cursor-pointer">
                View Invoice
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
