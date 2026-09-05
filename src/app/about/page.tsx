import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Award, HeartHandshake, ShieldCheck, Sparkles, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Heritage (Since 1938) | From Pusad to Shukrawar Peth, Pune",
  description: "Discover the journey of Naik Foods: from hand-pounding spices in Pusad (Vidarbha) in 1938 to establishing our flagship store in Pune. Authentic Maharashtrian heritage.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-900 text-xs font-bold px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Journey Across 8 Decades</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
          From Seeds to Sustenance: Aaji&apos;s Culinary Heritage
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto">
          How a small family kitchen in Pusad, Vidarbha became a beacon of uncompromised Maharashtrian flavors.
        </p>
      </div>

      {/* Hero Visual */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-lg bg-stone-100">
        <Image
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&auto=format&fit=crop&q=80"
          alt="Traditional Spices Heritage"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Timeline Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider">
            1938 • Pusad, Vidarbha
          </span>
          <h2 className="text-2xl font-black text-stone-900">
            The Stone Mortar & The Wild Ambadi
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            In 1938, in the rustic town of Pusad (Yavatmal district), our grandmother (Aaji) began preparing seasonal pickles using freshly foraged Ambadi leaves, mustard oil, and hand-roasted spices. Neighbors would gather just to smell the fragrance of her stone-ground Sauji masalas.
          </p>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            She believed that true nutrition comes from patience—soaking indigenous wheat for three days to make pure chik, sun-drying spices on cotton sheets, and grinding without modern high-speed blades that scorch aromatic essential oils.
          </p>
        </div>

        <div className="bg-cream-100/70 p-6 sm:p-8 rounded-3xl border border-cream-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-700 text-white font-black text-base flex items-center justify-center">
              NF
            </div>
            <div>
              <div className="font-bold text-stone-900 text-sm">Naik Foods Philosophy</div>
              <div className="text-xs text-stone-500">Uncompromised Quality Since 1938</div>
            </div>
          </div>
          <ul className="space-y-3 text-xs text-stone-700 pt-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-1.5 shrink-0" />
              <span><strong>Stone-Ground Integrity:</strong> Preserving volatile aroma compounds without heating.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-1.5 shrink-0" />
              <span><strong>Zero Preservatives:</strong> We rely exclusively on traditional oil, salt, and sun curing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-1.5 shrink-0" />
              <span><strong>Direct Sourcing:</strong> Ratnagiri mangoes, Vidarbha chillies, and Pune jowar directly from trusted cultivators.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Flagship Store Spotlight */}
      <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-4 h-4" />
          <span>Our Pune Flagship Store</span>
        </div>
        <h2 className="text-2xl font-black text-stone-900">
          Shukrawar Peth, Pune • Serving Thousands Every Week
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          Located at <strong>Seva Mitra Mandal Chowk, near Fadgate Police Chowki, Shukrawar Peth, Pune</strong>, our physical store is a beloved local destination for traditional Maharashtrian households seeking fresh bhakarwadi, Shrewsbury cookies, and authentic regional masalas.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-colors"
          >
            <span>Visit Us in Pune</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
