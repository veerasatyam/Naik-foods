export interface Recipe {
  id: string;
  slug: string;
  title: string;
  marathiTitle: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Expert";
  region: "Vidarbha" | "Konkan" | "Pune" | "Marathwada";
  summary: string;
  marathiSummary: string;
  image: string;
  ingredients: string[];
  productIds: string[]; // Linked store products for 1-click buy
  instructions: string[];
}

export const RECIPES: Recipe[] = [
  {
    id: "authentic-pune-misal",
    slug: "authentic-pune-misal",
    title: "Authentic Pune Spiced Misal Pav with Fiery Kat",
    marathiTitle: "झणझणीत पुणेरी मिसळ आणि कट",
    prepTime: "20 mins",
    cookTime: "30 mins",
    servings: 4,
    difficulty: "Medium",
    region: "Pune",
    summary: "The crown jewel of Maharashtra breakfast. Sprouted matki cooked in an aromatic, fiery red curry (Kat) topped with crunchy farsan and chopped onions.",
    marathiSummary: "पुण्याची प्रसिद्ध झणझणीत मिसळ, तर्रीदार कट आणि खमंग फरसाण.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80",
    ingredients: [
      "2 cups sprouted Matki (moth beans)",
      "2 tbsp Naik Foods Goda Masala",
      "1 tbsp Naik Foods Kolhapuri Thecha (for kick)",
      "2 chopped onions and 2 pureed tomatoes",
      "1 cup crunchy farsan / chiwda",
      "Fresh coriander, lemon wedges, and soft Pav"
    ],
    productIds: ["maharashtrian-goda-masala", "sawai-kolhapuri-thecha"],
    instructions: [
      "Boil sprouted matki in salted water with turmeric until tender but firm.",
      "In a heavy kadai, heat 3 tbsp oil. Sauté onions, ginger-garlic paste, and tomato puree until oil separates.",
      "Add 2 tbsp Naik Foods Goda Masala and 1 tsp red chilli powder. Pour 3 cups water and simmer for 15 mins until the glistening red oil (tarri/kat) rises to the surface.",
      "Assemble by placing boiled matki in bowls, ladling the piping hot spicy Kat over it, and topping generously with crunchy farsan, raw onions, and coriander. Serve with warm Pav."
    ]
  },
  {
    id: "crispy-hurda-thalipith",
    slug: "crispy-hurda-thalipith",
    title: "Crispy Hurda Thalipith with Fresh White Butter & Thecha",
    marathiTitle: "खमंग हुरडा थालीपीठ आणि हिरवी मिरची ठेचा",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 3,
    difficulty: "Easy",
    region: "Marathwada",
    summary: "Rustic multi-grain flatbread made with winter tender green jowar (Hurda) flour, pressed thin and roasted with ghee on iron tawa.",
    marathiSummary: "कोवळ्या हुरड्याचे पौष्टिक थालीपीठ, पांढरे लोणी आणि अस्सल ठेचा.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
    ingredients: [
      "2 cups Naik Foods Hurda Thalipith Bhajni",
      "1 finely chopped onion",
      "1 tbsp Naik Foods Kolhapuri Thecha",
      "Fresh chopped coriander leaves",
      "Warm water for kneading",
      "Pure desi ghee for shallow frying"
    ],
    productIds: ["hurda-thalipith-bhajni", "sawai-kolhapuri-thecha"],
    instructions: [
      "In a mixing bowl, combine Hurda Thalipith Bhajni, chopped onions, coriander, and salt.",
      "Gradually add warm water to knead into a soft, pliable dough.",
      "Take a lemon-sized ball of dough and pat it evenly on a damp cloth or butter paper into a round disc. Make 3 small holes in the center.",
      "Transfer gently onto a hot greased iron tawa. Drizzle ghee in the holes and around the edges. Cover and cook on medium flame for 3 minutes per side until golden and crispy.",
      "Serve hot with a dollop of fresh white butter (loni) and Naik Foods Thecha."
    ]
  },
  {
    id: "nagpur-sauji-curry",
    slug: "nagpur-sauji-curry",
    title: "Nagpur Sauji Paneer / Mushroom Dark Gravy",
    marathiTitle: "नागपूर सावजी पनीर / मशरूम रस्सा",
    prepTime: "15 mins",
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Medium",
    region: "Vidarbha",
    summary: "The legendary dark, intense curry of the Halba Koshti community in Nagpur. Intensely aromatic without burning sourness.",
    marathiSummary: "नागपूरची प्रसिद्ध सावजी ग्रेव्ही. ३२ मसाल्यांच्या सुगंधाने परिपूर्ण.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80",
    ingredients: [
      "250g Paneer cubes or Button Mushrooms",
      "2.5 tbsp Naik Foods Vidarbha Sauji Masala",
      "2 large roasted onions blended into paste",
      "1 tbsp ginger-garlic paste",
      "3 tbsp mustard or groundnut oil",
      "Hot water for rich gravy"
    ],
    productIds: ["vidarbha-sauji-masala", "ambadi-bhajiche-lonche"],
    instructions: [
      "Roast sliced onions in oil until deep dark brown. Grind into a fine paste with ginger and garlic.",
      "Heat 3 tbsp oil in a pan, add onion paste, and fry until oil glistens.",
      "Lower the flame and add 2.5 tbsp Naik Foods Sauji Masala. Sauté gently for 60 seconds until the stone-flower aroma blooms.",
      "Add paneer cubes, coat in spices, pour 2 cups warm water, and simmer for 12 minutes on low heat until a rich dark oil layer surfaces.",
      "Serve with piping hot Jowar Bhakri and Naik Foods Ambadi Pickle on the side."
    ]
  },
  {
    id: "konkan-solkadhi",
    slug: "konkan-solkadhi",
    title: "Refreshing Konkani Digestive Solkadhi",
    marathiTitle: "पाचक आणि चविष्ट कोकणी सोलकढी",
    prepTime: "10 mins",
    cookTime: "0 mins",
    servings: 4,
    difficulty: "Easy",
    region: "Konkan",
    summary: "The iconic cooling coastal elixir made with pure unsweetened Kokum Agal, fresh coconut milk, green chillies, garlic, and sea salt.",
    marathiSummary: "कोकम आगळ आणि ओल्या नारळाच्या दुधापासून बनवलेली ताजी सोलकढी.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80",
    ingredients: [
      "3 tbsp Naik Foods Pure Kokum Agal",
      "2 cups freshly extracted thick Coconut Milk",
      "1 small garlic clove and half a green chilli, crushed",
      "Pinch of rock salt and fresh chopped coriander"
    ],
    productIds: ["konkan-kokum-agal", "kolambi-lonche"],
    instructions: [
      "Pour freshly squeezed coconut milk into a jug.",
      "Add 3 tbsp of Naik Foods Pure Kokum Agal and watch the soothing pastel pink hue develop.",
      "Add crushed garlic, chilli, and rock salt. Stir well and refrigerate for 20 minutes to allow the flavors to infuse.",
      "Garnish with chopped coriander and serve chilled after a hearty meal."
    ]
  }
];
