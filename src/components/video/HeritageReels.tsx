"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Sparkles, Film, ShoppingBag, Eye, Award } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { VideoModal } from "./VideoModal";

interface ReelItem {
  id: string;
  title: string;
  marathiTitle: string;
  region: string;
  duration: string;
  views: string;
  videoUrl: string;
  thumbnail: string;
  description: string;
  marathiDesc: string;
  productSlug: string;
  productName: string;
  productPrice: number;
}

const REELS: ReelItem[] = [
  {
    id: "reel-sauji",
    title: "The Art of Stone-Grinding 32 Sauji Spices",
    marathiTitle: "३२ मसाल्यांचा अस्सल विदर्भ सावजी मसाला",
    region: "Vidarbha",
    duration: "1:24",
    views: "18.4K",
    videoUrl: "https://www.youtube-nocookie.com/embed/j4_e6k9f8uA",
    thumbnail: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80",
    description: "Watch how black stone-flower, nagkeshar, and dagadphool are gently hand-roasted in small batches.",
    marathiDesc: "दगडी खलबत्त्यात कुटलेल्या दगडफूल आणि नागकेशराचा पारंपरिक सुवास.",
    productSlug: "vidarbha-sauji-masala",
    productName: "Vidarbha Sauji Masala (32-Spice)",
    productPrice: 180,
  },
  {
    id: "reel-ambadi",
    title: "Curing Tangy Ambadi Leaves in Clay Barnis",
    marathiTitle: "मातीच्या बरणीतील पारंपरिक अंबाडी लोणचे",
    region: "Vidarbha / Pusad",
    duration: "1:42",
    views: "24.1K",
    videoUrl: "https://www.youtube-nocookie.com/embed/5kQ_s_X56F4",
    thumbnail: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80",
    description: "Wild sorrel leaves sun-dried and tempered in cold-pressed mustard oil using Aaji's 1938 ratio.",
    marathiDesc: "१९३८ पासून आजच्या घडीलाही अस्सल लाकडी घाण्याच्या मोहरीच्या तेलात मुरलेले लोणचे.",
    productSlug: "ambadi-bhajiche-lonche",
    productName: "Ambadi Bhajiche Lonche",
    productPrice: 190,
  },
  {
    id: "reel-misal",
    title: "Brewing The Fiery Red Tarri / Kat for Pune Misal",
    marathiTitle: "पुणेरी मिसळीचा तर्रीदार आणि झणझणीत कट",
    region: "Pune",
    duration: "2:05",
    views: "36.8K",
    videoUrl: "https://www.youtube-nocookie.com/embed/1vRzT4mK_E0",
    thumbnail: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80",
    description: "The secret to the aromatic red glistening oil (tarri) lies in Naik Foods dark-roasted Goda Masala.",
    marathiDesc: "गोडा मसाल्याची खमंग फोडणी आणि उसळीचा मंद आचेवर उकळणारा कट.",
    productSlug: "maharashtrian-goda-masala",
    productName: "Maharashtrian Goda Masala",
    productPrice: 165,
  },
  {
    id: "reel-thecha",
    title: "Pounding Fiery Kolhapuri Lavangi Thecha",
    marathiTitle: "खलबत्त्यातील अस्सल कोल्हापुरी लवंगी ठेचा",
    region: "Kolhapur",
    duration: "1:15",
    views: "42.5K",
    videoUrl: "https://www.youtube-nocookie.com/embed/4z_j3k6f70A",
    thumbnail: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
    description: "Fresh green lavangi chillies, charred garlic pods, rock salt, and cumin pounded coarsely.",
    marathiDesc: "तव्यावर भाजलेली लवंगी मिरची, लसूण आणि जिऱ्याचा झणझणीत ठेचा.",
    productSlug: "kolhapuri-lavangi-mirchi-thecha",
    productName: "Kolhapuri Lavangi Mirchi Thecha",
    productPrice: 160,
  },
];

export function HeritageReels() {
  const { locale, addToCart, products } = useApp();
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  return (
    <section className="py-16 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-700/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-saffron-600/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-brand-800/80 text-brand-300 px-3.5 py-1.5 rounded-full text-xs font-bold border border-brand-700/60 shadow-xs">
              <Film className="w-3.5 h-3.5 text-saffron-400" />
              <span>{locale === "mr" ? "चित्रफीत अनुभव • प्रत्यक्ष पाककृती" : "Culinary Video Stories • 1938 Heritage"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {locale === "mr" ? "हस्तनिर्मित चवीची प्रत्यक्ष झलक" : "Behind The Craft: Heritage In Action"}
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {locale === "mr"
                ? "पाहा कसे पारंपरिक दगडी खलबत्त्यात कुटले जातात आपले मसाले आणि मातीच्या बरण्यांमध्ये नैसर्गिकरित्या मुरतात लोणची."
                : "Watch our master spice pounders and heirloom pickle curators uphold 87-year-old family traditions."}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 bg-stone-800/80 px-4 py-2 rounded-xl border border-stone-700/70 shrink-0">
            <Sparkles className="w-4 h-4 text-saffron-400" />
            <span>Shoppable Video Reels</span>
          </div>
        </div>

        {/* Video Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REELS.map((reel) => {
            const product = products.find((p) => p.slug === reel.productSlug);

            return (
              <div
                key={reel.id}
                className="group relative bg-stone-800/90 rounded-3xl overflow-hidden border border-stone-700/80 hover:border-brand-500 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-brand-900/20"
              >
                {/* Thumbnail Card with Play Overlay */}
                <div
                  onClick={() => setActiveReel(reel)}
                  className="relative aspect-4/5 w-full overflow-hidden bg-stone-950 cursor-pointer"
                >
                  <Image
                    src={reel.thumbnail}
                    alt={reel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="bg-stone-900/90 backdrop-blur-md text-saffron-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-stone-700/80">
                      {reel.region}
                    </span>
                    <span className="bg-black/80 backdrop-blur-md text-stone-300 text-[10px] font-bold px-2 py-0.5 rounded">
                      {reel.duration}
                    </span>
                  </div>

                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-brand-600/90 group-hover:bg-brand-500 text-white flex items-center justify-center shadow-xl shadow-black/60 group-hover:scale-110 transition-all duration-300 border-2 border-white/40">
                      <Play className="w-6 h-6 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Video Info */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mb-1">
                      <Eye className="w-3.5 h-3.5 text-stone-500" />
                      <span>{reel.views} views</span>
                    </div>
                    <h3 className="font-bold text-white text-sm sm:text-base leading-snug group-hover:text-saffron-300 transition-colors line-clamp-2">
                      {locale === "mr" ? reel.marathiTitle : reel.title}
                    </h3>
                  </div>
                </div>

                {/* Shoppable Product Bar inside Card */}
                <div className="p-4 bg-stone-850 border-t border-stone-750 flex items-center justify-between gap-3">
                  <div className="truncate">
                    <div className="text-[11px] font-semibold text-stone-400 truncate">Featured Item:</div>
                    <div className="text-xs font-bold text-stone-200 truncate">
                      {locale === "mr" && product?.marathiName ? product.marathiName : reel.productName}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (product) {
                        addToCart(product);
                      }
                    }}
                    className="shrink-0 p-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-1 shadow transition-all active:scale-95"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>₹{reel.productPrice}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {activeReel && (
        <VideoModal
          isOpen={Boolean(activeReel)}
          onClose={() => setActiveReel(null)}
          title={activeReel.title}
          marathiTitle={activeReel.marathiTitle}
          videoUrl={activeReel.videoUrl}
          description={locale === "mr" ? activeReel.marathiDesc : activeReel.description}
          linkedProduct={{
            id: activeReel.productSlug,
            slug: activeReel.productSlug,
            name: activeReel.productName,
            price: activeReel.productPrice,
          }}
        />
      )}
    </section>
  );
}
