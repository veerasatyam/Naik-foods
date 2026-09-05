import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { RECIPES, Recipe } from "@/data/recipes";
import { PRODUCTS } from "@/data/products";
import { RecipeClient } from "./RecipeClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RECIPES.map((r) => ({
    slug: r.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = RECIPES.find((r) => r.slug === slug);

  if (!recipe) {
    return { title: "Recipe Not Found" };
  }

  return {
    title: `${recipe.title} | Recipe & Spices`,
    description: recipe.summary,
    openGraph: {
      title: recipe.title,
      description: recipe.summary,
      images: [recipe.image],
    },
  };
}

export default async function RecipeDetailPage({ params }: Props) {
  const { slug } = await params;
  const recipe = RECIPES.find((r) => r.slug === slug);

  if (!recipe) {
    notFound();
  }

  // Find linked ingredients products
  const linkedProducts = PRODUCTS.filter((p) => recipe.productIds.includes(p.id));

  return <RecipeClient recipe={recipe} linkedProducts={linkedProducts} />;
}
