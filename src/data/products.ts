export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  location: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  marathiName: string;
  region: "Vidarbha" | "Konkan" | "Pune" | "Marathwada";
  category: "Pickles & Chutneys" | "Snacks & Namkeen" | "Masalas & Spices" | "Flours & Premixes" | "Sweets & Bakery" | "Dairy & Beverages";
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  weight: string;
  isVeg: boolean;
  isBestSeller: boolean;
  isFastFriendly?: boolean;
  inStock: boolean;
  fssaiLicense: string;
  shelfLife: string;
  shortDescription: string;
  marathiShortDesc: string;
  description: string;
  ingredients: string[];
  nutrition: Record<string, string>;
  allergens: string[];
  images: string[];
  reviews: Review[];
}

export const PRODUCTS: Product[] = [
  {
    "id": "ambadi-bhajiche-lonche",
    "slug": "ambadi-bhajiche-lonche",
    "name": "Ambadi Bhajiche Lonche (Gongura / Sorrel Leaf Pickle)",
    "marathiName": "अंबाडी भाजीचे लोणचे",
    "region": "Vidarbha",
    "category": "Pickles & Chutneys",
    "price": 190,
    "originalPrice": 220,
    "rating": 4.9,
    "reviewCount": 78,
    "weight": "300g",
    "isVeg": true,
    "isBestSeller": true,
    "inStock": true,
    "fssaiLicense": "11521036000428",
    "shelfLife": "9 Months",
    "shortDescription": "Traditional Vidarbha-style tangy & spicy sorrel leaf pickle made with cold-pressed mustard oil and hand-ground spices.",
    "description": "A rare culinary gem from the heart of Vidarbha. Prepared using farm-fresh Ambadi leaves (sorrel / gongura), seasoned with roasted fenugreek, mustard seeds, and turmeric. Pairs exquisitely with hot Jowar Bhakri and fresh white butter (loni).",
    "ingredients": [
      "Fresh Ambadi Leaves",
      "Cold-Pressed Mustard Oil",
      "Fenugreek Seeds",
      "Mustard Seeds",
      "Red Chilli Powder",
      "Sea Salt",
      "Turmeric",
      "Hing (Asafoetida)"
    ],
    "nutrition": {
      "Calories": "145 kcal",
      "Carbohydrates": "8g",
      "Protein": "2.1g",
      "Fat": "12g",
      "Fiber": "3.5g"
    },
    "allergens": [
      "Mustard",
      "Asafoetida"
    ],
    "images": [
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80"
    ],
    "marathiShortDesc": "Traditional Vidarbha-style tangy & spicy sorrel leaf pickle made with cold-pressed mustard oil and hand-ground spices.",
    "reviews": [
      {
        "id": "r1",
        "author": "Sunita Deshmukh",
        "rating": 5,
        "date": "2 days ago",
        "comment": "Reminded me of my grandmother's home in Akola. Perfectly tangy with authentic mustard aroma!",
        "verified": true,
        "location": "Pune"
      },
      {
        "id": "r2",
        "author": "Rajesh Kulkarni",
        "rating": 5,
        "date": "1 week ago",
        "comment": "The authentic sourness of Ambadi is preserved so well. Best quality pickle online.",
        "verified": true,
        "location": "Mumbai"
      },
      {
        "id": "r3",
        "author": "Pooja Wankhede",
        "rating": 4,
        "date": "2 weeks ago",
        "comment": "Very tasty, goes wonderfully with dal-chawal and bhakri. Clean hygienic packaging.",
        "verified": true,
        "location": "Nagpur"
      }
    ]
  },
  {
    "id": "kolambi-lonche",
    "slug": "kolambi-lonche",
    "name": "Konkani Kolambi Lonche (Spiced Prawn Pickle)",
    "marathiName": "कोकणी कोळंबी लोणचे",
    "region": "Konkan",
    "category": "Pickles & Chutneys",
    "price": 380,
    "originalPrice": 420,
    "rating": 4.9,
    "reviewCount": 94,
    "weight": "250g",
    "isVeg": false,
    "isBestSeller": true,
    "inStock": true,
    "fssaiLicense": "11521036000428",
    "shelfLife": "6 Months",
    "shortDescription": "Authentic coastal Konkan delicacy made with fresh succulent baby prawns in spicy Malvani spices & natural vinegar.",
    "description": "Crafted following age-old coastal recipes of Sindhudurg and Ratnagiri. Baby prawns are sun-cured, flash-sautéed in spiced oil, and slow-matured in aromatic Konkan spices. Adds an instant gourmet seafood punch to steamed rice and dal.",
    "ingredients": [
      "Cleaned Baby Prawns",
      "Refined Sunflower Oil",
      "Kashmiri & Bedgi Red Chillies",
      "Garlic",
      "Ginger",
      "Natural Coconut Vinegar",
      "Salt",
      "Special Malvani Spices"
    ],
    "nutrition": {
      "Calories": "220 kcal",
      "Carbohydrates": "4g",
      "Protein": "18g",
      "Fat": "14g",
      "Fiber": "1g"
    },
    "allergens": [
      "Crustacean / Shellfish"
    ],
    "images": [
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80"
    ],
    "marathiShortDesc": "Authentic coastal Konkan delicacy made with fresh succulent baby prawns in spicy Malvani spices & natural vinegar.",
    "reviews": [
      {
        "id": "r4",
        "author": "Prasad Sawant",
        "rating": 5,
        "date": "3 days ago",
        "comment": "As a Malvani native living in Bangalore, this pickle felt like home! Prawns are soft and well-spiced.",
        "verified": true,
        "location": "Bengaluru"
      },
      {
        "id": "r5",
        "author": "Tanvi Rane",
        "rating": 5,
        "date": "2 weeks ago",
        "comment": "Tangy, spicy, and generous prawn chunks. Absolutely addictive with varan bhat.",
        "verified": true,
        "location": "Thane"
      }
    ]
  },
  {
    "id": "pune-bhakarwadi",
    "slug": "pune-bhakarwadi",
    "name": "Pune Special Baked Jowar Bhakarwadi",
    "marathiName": "पुणेरी खमंग ज्वारी भाकरवडी",
    "region": "Pune",
    "category": "Snacks & Namkeen",
    "price": 140,
    "originalPrice": 160,
    "rating": 4.8,
    "reviewCount": 142,
    "weight": "250g",
    "isVeg": true,
    "isBestSeller": true,
    "inStock": true,
    "fssaiLicense": "11521036000428",
    "shelfLife": "4 Months",
    "shortDescription": "Pune's signature sweet, spicy & crunchy spiral snack enhanced with fiber-rich Jowar (Sorghum).",
    "description": "Crisp rolls packed with a roasted coconut, poppy seeds (khuskhus), sesame, and secret Maharashtrian spices filling. Crafted with healthy jowar flour to deliver the signature crunch with wholesome digestion benefits.",
    "ingredients": [
      "Jowar Flour",
      "Gram Flour (Besan)",
      "Refined Wheat Flour",
      "Dry Coconut",
      "Sesame Seeds",
      "Poppy Seeds",
      "Fennel",
      "Sugar",
      "Spices",
      "Cold-Pressed Groundnut Oil"
    ],
    "nutrition": {
      "Calories": "480 kcal",
      "Carbohydrates": "58g",
      "Protein": "8.5g",
      "Fat": "24g",
      "Fiber": "6g"
    },
    "allergens": [
      "Sesame",
      "Gluten"
    ],
    "images": [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80"
    ],
    "marathiShortDesc": "Pune's signature sweet, spicy & crunchy spiral snack enhanced with fiber-rich Jowar (Sorghum).",
    "reviews": [
      {
        "id": "r6",
        "author": "Mandar Joshi",
        "rating": 5,
        "date": "Yesterday",
        "comment": "Crunchy without being overly oily! The jowar adds a nice crisp texture.",
        "verified": true,
        "location": "Pune"
      },
      {
        "id": "r7",
        "author": "Shubhada Patwardhan",
        "rating": 5,
        "date": "4 days ago",
        "comment": "Perfect balance of sweet, tang, and spice. Family finished the packet in one evening!",
        "verified": true,
        "location": "Delhi"
      }
    ]
  },
  {
    "id": "shrewsbury-butter-cookies",
    "slug": "shrewsbury-butter-cookies",
    "name": "Camp Pune Shrewsbury Butter Cookies",
    "marathiName": "पुणेरी श्रूजबरी बटर कुकीज",
    "region": "Pune",
    "category": "Sweets & Bakery",
    "price": 160,
    "originalPrice": 180,
    "rating": 4.9,
    "reviewCount": 186,
    "weight": "300g",
    "isVeg": true,
    "isBestSeller": true,
    "inStock": true,
    "fssaiLicense": "11521036000428",
    "shelfLife": "3 Months",
    "shortDescription": "The world-famous melt-in-your-mouth Pune bakery cookies made with pure butter and real vanilla.",
    "description": "An iconic heritage recipe from Pune's century-old bakery culture. Rich, crumbly, and golden-baked with pure creamery butter. The quintessential evening companion to hot cutting chai.",
    "ingredients": [
      "Wheat Flour",
      "Pure Butter",
      "Sugar",
      "Custard Powder",
      "Natural Vanilla Extract",
      "Cardamom Hint"
    ],
    "nutrition": {
      "Calories": "510 kcal",
      "Carbohydrates": "62g",
      "Protein": "5g",
      "Fat": "27g",
      "Fiber": "1.8g"
    },
    "allergens": [
      "Dairy",
      "Gluten"
    ],
    "images": [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80"
    ],
    "marathiShortDesc": "The world-famous melt-in-your-mouth Pune bakery cookies made with pure butter and real vanilla.",
    "reviews": [
      {
        "id": "r8",
        "author": "Nikhil Shinde",
        "rating": 5,
        "date": "5 days ago",
        "comment": "Authentic Pune taste! Rich buttery flavor, not too sweet. Arrived completely fresh and unbroken.",
        "verified": true,
        "location": "Navi Mumbai"
      }
    ]
  },
  {
    "id": "vidarbha-sauji-masala",
    "slug": "vidarbha-sauji-masala",
    "name": "Authentic Vidarbha Sauji Masala (32-Spice Blend)",
    "marathiName": "विदर्भ सावजी मसाला",
    "region": "Vidarbha",
    "category": "Masalas & Spices",
    "price": 180,
    "originalPrice": 210,
    "rating": 5.0,
    "reviewCount": 112,
    "weight": "200g",
    "isVeg": true,
    "isBestSeller": true,
    "inStock": true,
    "fssaiLicense": "11521036000428",
    "shelfLife": "12 Months",
    "shortDescription": "The fiery, aromatic 32-ingredient stone-ground spice secret of Nagpur & Vidarbha Sauji cuisine.",
    "description": "Hand-pounded using black cardamom, dagad phool (stone flower), nagkesar, triphala, and dry-roasted spices. Delivers the legendary dark gravy with profound smoky depth and bold spice warmth without harshness.",
    "ingredients": [
      "Dagad Phool (Stone Flower)",
      "Black Pepper",
      "Cloves",
      "Cinnamon",
      "Star Anise",
      "Nagkesar",
      "Bay Leaf",
      "Coriander Seeds",
      "Cumin",
      "Dry Ginger",
      "Mace",
      "Nutmeg",
      "Stone-ground Spices"
    ],
    "nutrition": {
      "Calories": "310 kcal",
      "Carbohydrates": "42g",
      "Protein": "11g",
      "Fat": "9g",
      "Fiber": "14g"
    },
    "allergens": [],
    "images": [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80"
    ],
    "marathiShortDesc": "The fiery, aromatic 32-ingredient stone-ground spice secret of Nagpur & Vidarbha Sauji cuisine.",
    "reviews": [
      {
        "id": "r9",
        "author": "Gajanan Thakare",
        "rating": 5,
        "date": "1 week ago",
        "comment": "Exact restaurant taste of Nagpur Sauji at home. The aroma fills the entire house!",
        "verified": true,
        "location": "Amravati"
      }
    ]
  },
  {
    "id": "hurda-thalipith-bhajni",
    "slug": "hurda-thalipith-bhajni",
    "name": "Tender Hurda (Fresh Jowar) Thalipith Bhajni",
    "marathiName": "ताज्या हुरड्याची थालीपीठ भाजणी",
    "region": "Marathwada",
    "category": "Flours & Premixes",
    "price": 175,
    "originalPrice": 195,
    "rating": 4.8,
    "reviewCount": 65,
    "weight": "500g",
    "isVeg": true,
    "isBestSeller": true,
    "inStock": true,
    "fssaiLicense": "11521036000428",
    "shelfLife": "6 Months",
    "shortDescription": "Nutrient-dense multi-grain roasted flour mix infused with tender winter Hurda (fresh green jowar).",
    "description": "Slow-roasted grains (Jowar, Bajra, Chana dal, Urad dal, Rice, Wheat) blended with dried tender green sorghum (Hurda) and ajwain. Prepare wholesome, fragrant thalipith in just 10 minutes.",
    "ingredients": [
      "Roasted Tender Green Jowar (Hurda)",
      "Sorghum (Jowar)",
      "Pearl Millet (Bajra)",
      "Chana Dal",
      "Urad Dal",
      "Coriander Seeds",
      "Cumin",
      "Ajwain"
    ],
    "nutrition": {
      "Calories": "360 kcal",
      "Carbohydrates": "68g",
      "Protein": "13g",
      "Fat": "3g",
      "Fiber": "11g"
    },
    "allergens": [
      "Gluten"
    ],
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
    ],
    "marathiShortDesc": "Nutrient-dense multi-grain roasted flour mix infused with tender winter Hurda (fresh green jowar).",
    "reviews": [
      {
        "id": "r10",
        "author": "Anjali Vaidya",
        "rating": 5,
        "date": "3 days ago",
        "comment": "So fragrant when roasted! My kids love having these crispy thalipith with fresh curd.",
        "verified": true,
        "location": "Nashik"
      }
    ]
  },
  {
    "id": "sawai-kolhapuri-thecha",
    "slug": "sawai-kolhapuri-thecha",
    "name": "Hand-Crushed Kolhapuri Green Chilli Thecha",
    "marathiName": "कोल्हापुरी खर्डा / हिरवी मिरची ठेचा",
    "region": "Marathwada",
    "category": "Pickles & Chutneys",
    "price": 130,
    "originalPrice": 150,
    "rating": 4.9,
    "reviewCount": 138,
    "weight": "200g",
    "isVeg": true,
    "isBestSeller": true,
    "inStock": true,
    "fssaiLicense": "11521036000428",
    "shelfLife": "6 Months",
    "shortDescription": "Pungent fire-roasted green chillies, garlic, and peanuts hand-crushed on traditional stone khalbatta.",
    "description": "A must-have accompaniment on any Maharashtrian plate. Fresh green Lavangi chillies are charred on iron tawa with whole garlic and roasted peanuts, then hand-crushed with sea salt and oil.",
    "ingredients": [
      "Green Chillies",
      "Garlic Cloves",
      "Roasted Peanuts",
      "Refined Groundnut Oil",
      "Rock Salt",
      "Cumin Seeds"
    ],
    "nutrition": {
      "Calories": "195 kcal",
      "Carbohydrates": "9g",
      "Protein": "4.5g",
      "Fat": "16g",
      "Fiber": "4g"
    },
    "allergens": [
      "Peanuts"
    ],
    "images": [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80"
    ],
    "marathiShortDesc": "Pungent fire-roasted green chillies, garlic, and peanuts hand-crushed on traditional stone khalbatta.",
    "reviews": [
      {
        "id": "r11",
        "author": "Vikram Jadhav",
        "rating": 5,
        "date": "2 days ago",
        "comment": "Bold heat and perfect garlic flavor. Tastes exactly like roadside Kolhapur dhabas!",
        "verified": true,
        "location": "Kolhapur"
      }
    ]
  },
  {
    "id": "sprouted-wheat-chik",
    "slug": "sprouted-wheat-chik",
    "name": "Natural Sprouted Wheat Flour (Gavhacha Chik)",
    "marathiName": "मोड आलेल्या गव्हाचा चीक",
    "region": "Vidarbha",
    "category": "Flours & Premixes",
    "price": 210,
    "originalPrice": 240,
    "rating": 4.9,
    "reviewCount": 42,
    "weight": "400g",
    "isVeg": true,
    "isBestSeller": false,
    "inStock": true,
    "fssaiLicense": "11521036000428",
    "shelfLife": "9 Months",
    "shortDescription": "Traditional sundried sprouted wheat extract used for authentic Kurdai, Kheer, and Halwa.",
    "description": "Prepared by soaking indigenous whole wheat grains for 3 days, extracting the pure nutrient-rich milk (chik), settling, and sun-drying. Unmatched energy and natural strength booster.",
    "ingredients": [
      "100% Pure Sprouted Wheat Extract (Chik)"
    ],
    "nutrition": {
      "Calories": "345 kcal",
      "Carbohydrates": "72g",
      "Protein": "12g",
      "Fat": "1.2g",
      "Fiber": "8g"
    },
    "allergens": [
      "Gluten"
    ],
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
    ],
    "marathiShortDesc": "Traditional sundried sprouted wheat extract used for authentic Kurdai, Kheer, and Halwa.",
    "reviews": [
      {
        "id": "r12",
        "author": "Rohini Kale",
        "rating": 5,
        "date": "1 week ago",
        "comment": "High quality pure chik. Made pristine white crispy Kurdai this summer!",
        "verified": true,
        "location": "Solapur"
      }
    ]
  },
  {
    "id": "shevaga-lonche",
    "slug": "shevaga-lonche",
    "name": "Artisanal Shevaga (Drumstick) Pickle",
    "marathiName": "पारंपारिक शेवगा शेंगांचे लोणचे",
    "region": "Marathwada",
    "category": "Pickles & Chutneys",
    "price": 160,
    "originalPrice": 180,
    "rating": 4.7,
    "reviewCount": 51,
    "weight": "300g",
    "isVeg": true,
    "isBestSeller": false,
    "inStock": true,
    "fssaiLicense": "11521036000428",
    "shelfLife": "9 Months",
    "shortDescription": "Tender moringa drumsticks steeped in spiced cold-pressed mustard oil and wild raw mango broth.",
    "description": "A rare heirloom pickle bursting with iron, calcium, and digestion benefits. Fresh tender drumsticks absorb the robust pickling spices, providing a savory, lip-smacking crunch.",
    "ingredients": [
      "Tender Drumsticks (Moringa)",
      "Mustard Oil",
      "Raw Mango Extract",
      "Fenugreek",
      "Mustard Dal",
      "Red Chilli",
      "Hing",
      "Turmeric",
      "Salt"
    ],
    "nutrition": {
      "Calories": "135 kcal",
      "Carbohydrates": "11g",
      "Protein": "2.8g",
      "Fat": "9.5g",
      "Fiber": "5g"
    },
    "allergens": [
      "Mustard",
      "Asafoetida"
    ],
    "images": [
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80"
    ],
    "marathiShortDesc": "Tender moringa drumsticks steeped in spiced cold-pressed mustard oil and wild raw mango broth.",
    "reviews": [
      {
        "id": "r-shevaga-lonche",
        "author": "Verified Customer",
        "rating": 5,
        "date": "1 week ago",
        "comment": "Authentic taste and premium packaging. Highly satisfied with Naik Foods.",
        "verified": true,
        "location": "Maharashtra"
      }
    ]
  },
  {
    "id": "konkan-alphonso-mango-pulp",
    "slug": "konkan-alphonso-mango-pulp",
    "name": "Ratnagiri Hapus Pure Alphonso Mango Pulp (Aamras)",
    "marathiName": "रत्नागिरी हापूस अस्सल आंबा रस",
    "region": "Konkan",
    "category": "Dairy & Beverages",
    "price": 280,
    "originalPrice": 320,
    "rating": 5.0,
    "reviewCount": 210,
    "weight": "850g Can",
    "isVeg": true,
    "isBestSeller": true,
    "inStock": true,
    "fssaiLicense": "11521036000428",
    "shelfLife": "18 Months",
    "shortDescription": "100% pure naturally ripened GI-tagged Ratnagiri Hapus mango pulp with zero artificial colors or essence.",
    "description": "Directly from the coastal orchards of Devgad and Ratnagiri. Rich, aromatic, sun-kissed golden pulp that lets you enjoy genuine summer Aamras all year round with hot pooris or modak.",
    "ingredients": [
      "Selected Ratnagiri Alphonso Mangoes",
      "Minimal Cane Sugar (5%)",
      "Citric Acid"
    ],
    "nutrition": {
      "Calories": "115 kcal",
      "Carbohydrates": "26g",
      "Protein": "0.8g",
      "Fat": "0.2g",
      "Fiber": "2.2g"
    },
    "allergens": [],
    "images": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80"
    ],
    "marathiShortDesc": "100% pure naturally ripened GI-tagged Ratnagiri Hapus mango pulp with zero artificial colors or essence.",
    "reviews": [
      {
        "id": "r13",
        "author": "Sneha Gokhale",
        "rating": 5,
        "date": "4 days ago",
        "comment": "Tastes just like fresh hand-squeezed Hapus mangoes. No artificial chemical aftertaste.",
        "verified": true,
        "location": "Pune"
      }
    ]
  },
  {
    "id": "maharashtrian-goda-masala",
    "slug": "maharashtrian-goda-masala",
    "name": "Authentic Pune Goda / Kala Masala",
    "marathiName": "पारंपारिक पुणेरी गोडा / काळा मसाला",
    "region": "Pune",
    "category": "Masalas & Spices",
    "price": 170,
    "originalPrice": 190,
    "rating": 4.9,
    "reviewCount": 164,
    "weight": "250g",
    "isVeg": true,
    "isBestSeller": true,
    "inStock": true,
    "fssaiLicense": "11521036000428",
    "shelfLife": "12 Months",
    "shortDescription": "The soul of Maharashtrian vegetarian cooking: roasted coconut, sesame, and stone flower spiced blend.",
    "description": "Roasted in pure groundnut oil until dark and aromatic. Essential for authentic Amti, Katachi Amti, Bharli Vangi (stuffed brinjal), and Matki Usal. Imparts sweet aromatic undertones without burning heat.",
    "ingredients": [
      "Coriander Seeds",
      "Dry Coconut (Khobare)",
      "Sesame Seeds (Teel)",
      "Dagad Phool",
      "Cinnamon",
      "Cloves",
      "Bay Leaf",
      "Nagkesar",
      "Groundnut Oil"
    ],
    "nutrition": {
      "Calories": "385 kcal",
      "Carbohydrates": "36g",
      "Protein": "9g",
      "Fat": "21g",
      "Fiber": "12g"
    },
    "allergens": [
      "Sesame"
    ],
    "images": [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80"
    ],
    "marathiShortDesc": "The soul of Maharashtrian vegetarian cooking: roasted coconut, sesame, and stone flower spiced blend.",
    "reviews": [
      {
        "id": "r14",
        "author": "Aparna Kulkarni",
        "rating": 5,
        "date": "2 weeks ago",
        "comment": "Gives my Dal and Bharli Vangi that unmistakable authentic Puneri aroma. Excellent quality.",
        "verified": true,
        "location": "Thane"
      }
    ]
  },
  {
    "id": "jowar-palak-khakhra",
    "slug": "jowar-palak-khakhra",
    "name": "Roasted Jowar & Spinach (Palak) Coin Khakhra",
    "marathiName": "ज्वारी व पालक खमंग कॉईन खाकरा",
    "region": "Pune",
    "category": "Snacks & Namkeen",
    "price": 110,
    "originalPrice": 130,
    "rating": 4.8,
    "reviewCount": 89,
    "weight": "200g",
    "isVeg": true,
    "isBestSeller": false,
    "inStock": true,
    "fssaiLicense": "11521036000428",
    "shelfLife": "6 Months",
    "shortDescription": "100% roasted bite-sized crisp disks infused with fresh spinach and wholesome sorghum millet.",
    "description": "A healthy tea-time crunch packed with iron and dietary fiber. Baked to perfection without deep-frying, offering guilt-free snacking for all age groups.",
    "ingredients": [
      "Whole Jowar Flour",
      "Fresh Spinach Paste",
      "Whole Wheat Flour",
      "Sesame Seeds",
      "Rock Salt",
      "Cumin",
      "Refined Sunflower Oil"
    ],
    "nutrition": {
      "Calories": "390 kcal",
      "Carbohydrates": "62g",
      "Protein": "10.5g",
      "Fat": "11g",
      "Fiber": "9.2g"
    },
    "allergens": [
      "Sesame",
      "Gluten"
    ],
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
    ],
    "marathiShortDesc": "100% roasted bite-sized crisp disks infused with fresh spinach and wholesome sorghum millet.",
    "reviews": [
      {
        "id": "r-jowar-palak-khakhra",
        "author": "Verified Customer",
        "rating": 5,
        "date": "1 week ago",
        "comment": "Authentic taste and premium packaging. Highly satisfied with Naik Foods.",
        "verified": true,
        "location": "Maharashtra"
      }
    ]
  }
];

export const CATEGORIES = [
  "All",
  "Pickles & Chutneys",
  "Snacks & Namkeen",
  "Masalas & Spices",
  "Flours & Premixes",
  "Sweets & Bakery",
  "Dairy & Beverages"
] as const;

export const REGIONS = ["All", "Vidarbha", "Konkan", "Pune", "Marathwada"] as const;
