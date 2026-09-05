import { NextResponse } from "next/server";
import { getStoredProducts, addProduct, updateProduct, deleteProduct } from "@/lib/db";
import { Product } from "@/data/products";

export async function GET() {
  try {
    const products = getStoredProducts();
    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Required fields check
    if (!body.name || !body.price || !body.region || !body.category) {
      return NextResponse.json(
        { success: false, error: "Name, Price, Region, and Category are required." },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const id = body.id || `prod_${Date.now()}`;

    const newProduct: Product = {
      id,
      slug,
      name: body.name,
      marathiName: body.marathiName || body.name,
      region: body.region,
      category: body.category,
      price: Number(body.price),
      originalPrice: Number(body.originalPrice || body.price),
      rating: Number(body.rating || 5.0),
      reviewCount: Number(body.reviewCount || 1),
      weight: body.weight || "250g",
      isVeg: body.isVeg !== undefined ? Boolean(body.isVeg) : true,
      isBestSeller: Boolean(body.isBestSeller),
      isFastFriendly: Boolean(body.isFastFriendly),
      inStock: body.inStock !== undefined ? Boolean(body.inStock) : true,
      fssaiLicense: body.fssaiLicense || "11521036000428",
      shelfLife: body.shelfLife || "6 Months",
      shortDescription: body.shortDescription || `${body.name} - authentic Maharashtrian delicacy.`,
      marathiShortDesc: body.marathiShortDesc || body.shortDescription || "",
      description: body.description || body.shortDescription || "",
      ingredients: Array.isArray(body.ingredients) ? body.ingredients : (body.ingredients ? body.ingredients.split(",").map((s: string) => s.trim()) : ["Traditional spices"]),
      nutrition: body.nutrition || { "Calories": "350 kcal", "Protein": "8g", "Carbohydrates": "50g", "Fat": "12g" },
      allergens: Array.isArray(body.allergens) ? body.allergens : (body.allergens ? body.allergens.split(",").map((s: string) => s.trim()) : []),
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80"
      ],
      reviews: body.reviews || [
        {
          id: `rev_${Date.now()}`,
          author: "Verified Customer",
          rating: 5,
          date: "Just now",
          comment: "Freshly added item. Handcrafted quality!",
          verified: true,
          location: "Maharashtra",
        }
      ],
    };

    const updated = addProduct(newProduct);
    return NextResponse.json({ success: true, product: newProduct, products: updated }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "Product ID is required." }, { status: 400 });
    }
    const updated = updateProduct(body.id, body.updates);
    return NextResponse.json({ success: true, products: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID query parameter is required." }, { status: 400 });
    }
    const updated = deleteProduct(id);
    return NextResponse.json({ success: true, products: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
