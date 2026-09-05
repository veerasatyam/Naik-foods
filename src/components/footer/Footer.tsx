"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Award,
  CheckCircle2
} from "lucide-react";

export function Footer() {
  const { t, locale } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-stone-800 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-brand-900/60 border border-brand-700 flex items-center justify-center text-brand-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">FSSAI Certified</div>
              <div className="text-xs text-stone-400">Lic. 11521036000428</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-brand-900/60 border border-brand-700 flex items-center justify-center text-brand-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">100% Preservative Free</div>
              <div className="text-xs text-stone-400">Sun-cured & stone-ground</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-brand-900/60 border border-brand-700 flex items-center justify-center text-brand-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Safe Transit Guarantee</div>
              <div className="text-xs text-stone-400">Hassle-free 48h replacement</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-brand-900/60 border border-brand-700 flex items-center justify-center text-brand-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Customer Helpline</div>
              <div className="text-xs text-stone-400">+91 97300 46247</div>
            </div>
          </div>
        </div>

        {/* 4 Columns Footer Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-12 border-b border-stone-800 text-sm">
          {/* Col 1: Brand Story & FSSAI */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white font-black text-lg">
                NF
              </div>
              <span className="text-xl font-black tracking-tight text-white">NAIK FOODS</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {t.footer.story}
            </p>

            {/* FSSAI Badge Card */}
            <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/80 inline-block">
              <div className="flex items-center gap-2">
                <span className="font-black text-brand-400 text-xs tracking-wider">fssai</span>
                <span className="text-[11px] text-stone-300 font-medium">
                  {t.footer.fssaiText}
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/naikfoods_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Naik Foods Instagram"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-brand-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Naik Foods Facebook"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-brand-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919730046247?text=Hi!%20I%20have%20a%20query%20about%20Naik%20Foods"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] flex items-center justify-center text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {t.footer.shopHeading}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/store?category=Pickles+%26+Chutneys" className="hover:text-brand-400 transition-colors">
                  Pickles & Chutneys
                </Link>
              </li>
              <li>
                <Link href="/store?category=Snacks+%26+Namkeen" className="hover:text-brand-400 transition-colors">
                  Snacks & Bhakarwadi
                </Link>
              </li>
              <li>
                <Link href="/store?category=Masalas+%26+Spices" className="hover:text-brand-400 transition-colors">
                  Sauji & Goda Masalas
                </Link>
              </li>
              <li>
                <Link href="/store?category=Flours+%26+Premixes" className="hover:text-brand-400 transition-colors">
                  Hurda Thalipith Bhajni
                </Link>
              </li>
              <li>
                <Link href="/store?category=Sweets+%26+Bakery" className="hover:text-brand-400 transition-colors">
                  Shrewsbury & Sweets
                </Link>
              </li>
              <li>
                <Link href="/store?category=Beverages" className="hover:text-brand-400 transition-colors">
                  Kokum Agal & Aamras
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/about" className="hover:text-brand-400 transition-colors">
                  {locale === "mr" ? "आमचा इतिहास (१९३८)" : "Our Pusad Story (1938)"}
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-brand-400 transition-colors">
                  {locale === "mr" ? "पारंपारिक रेसिपी" : "Shoppable Recipes"}
                </Link>
              </li>
              <li>
                <Link href="/policy/shipping" className="hover:text-brand-400 transition-colors">
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/policy/refund" className="hover:text-brand-400 transition-colors">
                  Replacement & Return Policy
                </Link>
              </li>
              <li>
                <Link href="/policy/terms" className="hover:text-brand-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/policy/privacy" className="hover:text-brand-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Address & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {t.footer.storeHeading}
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{t.footer.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{t.footer.supportHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href={`mailto:${t.footer.supportEmail}`} className="hover:text-white transition-colors">
                  {t.footer.supportEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Payments */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {t.footer.rights}
          </div>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-3 text-stone-400">
            <span className="font-bold text-[11px] text-stone-300">100% SECURE PAYMENTS</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] font-bold">UPI</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] font-bold">RuPay</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] font-bold">Visa</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] font-bold">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] font-bold">COD Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
