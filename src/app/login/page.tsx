"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isAdmin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in
  if (isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <UserCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-stone-900">You are logged in</h1>
        <p className="text-xs text-stone-500">
          {isAdmin ? "Logged in with Admin privileges." : "Logged in as a valued customer."}
        </p>
        <div className="flex justify-center gap-3 pt-2">
          {isAdmin && (
            <Link
              href="/admin"
              className="px-4 py-2.5 bg-stone-900 text-white font-bold text-xs rounded-xl hover:bg-stone-800"
            >
              Admin Dashboard
            </Link>
          )}
          <Link
            href="/account"
            className="px-4 py-2.5 bg-brand-600 text-white font-bold text-xs rounded-xl hover:bg-brand-700"
          >
            My Account
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (email.toLowerCase() === "satyamsvs788@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/account");
      }
    } else {
      setError(res.error || "Invalid credentials");
    }
  };

  const handleAdminQuickLogin = async () => {
    setEmail("satyamsvs788@gmail.com");
    setPassword("satyam@veer788");
    setLoading(true);
    const res = await login("satyamsvs788@gmail.com", "satyam@veer788");
    setLoading(false);
    if (res.success) {
      router.push("/admin");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-900 text-xs font-bold px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Secure Sign In</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Welcome to Naik Foods
        </h1>
        <p className="text-xs text-stone-500">
          Sign in to track orders, manage your wishlist, or access admin inventory.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-600 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-600 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? "Signing In..." : "Sign In to Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Shortcuts */}
        <div className="pt-4 border-t border-stone-100 space-y-3">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block text-center">
            One-Click Quick Login
          </span>
          <button
            type="button"
            onClick={handleAdminQuickLogin}
            className="w-full py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sign In as Satyam (Admin • Full Access)</span>
          </button>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-stone-500">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="font-bold text-brand-700 hover:underline">
              Create Customer Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
