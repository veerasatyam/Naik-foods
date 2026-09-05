export interface RegionInfo {
  id: string;
  name: string;
  marathiName: string;
  tagline: string;
  marathiTagline: string;
  badge: string;
  description: string;
  specialties: string[];
  bannerImage: string;
}

export const REGIONS_DATA: Record<string, RegionInfo> = {
  Vidarbha: {
    id: "Vidarbha",
    name: "Vidarbha",
    marathiName: "विदर्भ",
    tagline: "Bold Spices & Hearty Farm Flavors",
    marathiTagline: "झणझणीत सावजी मसाले आणि गावराण चव",
    badge: "Origin 1938 • Pusad & Nagpur",
    description: "Known for the fierce warmth of black-stone ground Sauji spices, hand-pounded gongura (Ambadi) pickles, and sundried sprouted wheat chik from our ancestral home in Pusad.",
    specialties: ["Sauji 32-Spice Masala", "Ambadi Bhajiche Lonche", "Sprouted Wheat Chik", "Tarri Poha Spices"],
    bannerImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80"
  },
  Konkan: {
    id: "Konkan",
    name: "Konkan Coast",
    marathiName: "कोकण किनारपट्टी",
    tagline: "Wild Kokum, Seafood Lonche & Golden Hapus",
    marathiTagline: "ताजी कोळंबी, आंबट कोकम आणि गोड हापूस",
    badge: "Coastal Culinary Treasures",
    description: "From the coconut groves of Sindhudurg to Ratnagiri orchards. Savor naturally fermented coastal baby prawn pickle (Kolambi Lonche), GI-tagged Alphonso Aamras, and pure digestive Kokum Agal.",
    specialties: ["Kolambi Prawn Lonche", "Pure Kokum Agal", "Ratnagiri Alphonso Aamras", "Malvani Fish Masala"],
    bannerImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"
  },
  Pune: {
    id: "Pune",
    name: "Pune & Western Maharashtra",
    marathiName: "पुणे व पश्चिम महाराष्ट्र",
    tagline: "Heritage Bakeries, Crispy Bhakarwadi & Goda Masala",
    marathiTagline: "खरे पुणेरी चविष्ट स्नॅक्स आणि गोडा मसाला",
    badge: "Flagship Store • Shukrawar Peth",
    description: "The cultural epicenter of Maharashtra's tea-time heritage. Featuring crisp Jowar Bhakarwadi, melt-in-the-mouth Shrewsbury Butter Cookies, and velvety iron-roasted Goda Masala.",
    specialties: ["Baked Jowar Bhakarwadi", "Shrewsbury Butter Cookies", "Iron-Roasted Goda Masala", "Upwas Rajgira Ladoo"],
    bannerImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80"
  },
  Marathwada: {
    id: "Marathwada",
    name: "Marathwada & Khandesh",
    marathiName: "मराठवाडा व खान्देश",
    tagline: "Tender Hurda, Fiery Thecha & Robust Grains",
    marathiTagline: "कोवळा हुरडा आणि झणझणीत मिरचीचा ठेचा",
    badge: "Ancient Grain Culture",
    description: "Celebrated for wholesome multi-millet farming. Featuring winter tender Hurda thalipith bhajni, hand-crushed stone Thecha (Kharda), and spiced Moringa drumstick lonche.",
    specialties: ["Hurda Thalipith Bhajni", "Kolhapuri Green Chilli Thecha", "Shevaga (Drumstick) Lonche", "Shev Bhaji Masala"],
    bannerImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
  }
};
