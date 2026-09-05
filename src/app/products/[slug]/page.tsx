import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUCTS, Product } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  // Clean 160-char meta description without markdown leakage
  const cleanDescription = product.shortDescription.replace(/[#*`_]/g, "").slice(0, 160);

  return {
    title: `${product.name} (${product.weight})`,
    description: cleanDescription,
    openGraph: {
      title: `${product.name} | Authentic Maharashtrian Delicacies`,
      description: cleanDescription,
      images: [product.images[0]],
      type: "article",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same region or category
  const relatedProducts = PRODUCTS.filter(
    (p) => (p.region === product.region || p.category === product.category) && p.id !== product.id
  ).slice(0, 4);

  // Generate structured schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.shortDescription,
    brand: {
      "@type": "Brand",
      name: "Naik Foods",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.naikfoods.co.in/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
