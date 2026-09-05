import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const POLICIES: Record<string, { title: string; subtitle: string; content: React.ReactNode }> = {
  shipping: {
    title: "Shipping & Delivery Policy",
    subtitle: "Pan-India delivery guidelines, dispatch schedules, and packaging safety.",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <p>
          At <strong>Naik Foods</strong>, we dispatch all orders within 24 business hours from our central facility in Pune. Because our masalas, flours, and pickles are made without artificial chemical preservatives, they are vacuum-sealed and packed with multi-layered shock-absorbing protection.
        </p>
        <h3 className="font-bold text-stone-900 text-base pt-2">1. Delivery Timelines</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Pune & Pimpri-Chinchwad:</strong> Same-day or next-day delivery (1-2 days).</li>
          <li><strong>Mumbai & Rest of Maharashtra:</strong> 2 to 3 business days.</li>
          <li><strong>Metro Cities (Bengaluru, Delhi, Hyderabad, etc.):</strong> 3 to 4 business days.</li>
          <li><strong>Rest of India:</strong> 4 to 6 business days.</li>
        </ul>
        <h3 className="font-bold text-stone-900 text-base pt-2">2. Shipping Charges</h3>
        <p>
          We offer <strong>FREE Shipping on all orders above ₹499</strong> across India. For orders below ₹499, a nominal flat express shipping charge of ₹50 is applied at checkout.
        </p>
        <h3 className="font-bold text-stone-900 text-base pt-2">3. Tracking Your Order</h3>
        <p>
          Once your package is dispatched, an automated tracking link will be sent via SMS and WhatsApp. You can also contact our customer care helpline at <strong>+91 97300 46247</strong> for instant updates.
        </p>
      </div>
    ),
  },
  refund: {
    title: "Replacement & Refund Policy",
    subtitle: "Our food safety commitment and transit damage guarantee.",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <p>
          Because we produce perishable food items, traditional spices, and oil-cured pickles without industrial preservatives, we maintain strict health & hygiene protocols compliant with FSSAI regulations.
        </p>
        <h3 className="font-bold text-stone-900 text-base pt-2">1. 48-Hour Free Replacement Guarantee</h3>
        <p>
          If your package arrives in any of the following conditions:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Damaged container or broken jar seal during transit</li>
          <li>Tampered outer packaging</li>
          <li>Incorrect item delivered</li>
        </ul>
        <p>
          Please take a photo of the package and WhatsApp our care team at <strong>+91 97300 46247</strong> or email <strong>care@naikfoods.co.in</strong> within <strong>48 hours of delivery</strong>. We will immediately dispatch a fresh replacement at zero cost or process a full refund to your original payment method.
        </p>
        <h3 className="font-bold text-stone-900 text-base pt-2">2. Cancellation Policy</h3>
        <p>
          Orders can be cancelled free of charge prior to dispatch (within 4 hours of placing the order). Once an order has been picked up by our courier partner, it cannot be recalled.
        </p>
      </div>
    ),
  },
  terms: {
    title: "Terms & Conditions",
    subtitle: "Legal agreement governing use of the Naik Foods online store.",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <p>
          Welcome to <strong>Naik Foods</strong>. By browsing, purchasing, or using our website, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <h3 className="font-bold text-stone-900 text-base pt-2">1. Product Information & Pricing</h3>
        <p>
          We take meticulous care to ensure that weights, ingredient lists, and nutritional facts are accurately represented. Prices displayed are in Indian Rupees (INR) and are inclusive of applicable GST.
        </p>
        <h3 className="font-bold text-stone-900 text-base pt-2">2. FSSAI & Quality Assurance</h3>
        <p>
          All products are manufactured and packed under FSSAI Central License <strong>11521036000428</strong>. We guarantee 100% genuine ingredients as listed on our product packaging.
        </p>
      </div>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "How we protect and respect your personal information.",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <p>
          Naik Foods respects your privacy. We collect only necessary details (name, delivery address, phone number, and email) solely to process and deliver your food orders safely.
        </p>
        <h3 className="font-bold text-stone-900 text-base pt-2">1. Information Security</h3>
        <p>
          We do not store your credit/debit card numbers or UPI PINs. All payment transactions are processed through 256-bit encrypted bank-grade gateways (Razorpay, UPI). We never sell or share your personal data with third-party advertisers.
        </p>
      </div>
    ),
  },
};

export async function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) return { title: "Policy Not Found" };
  return {
    title: `${policy.title} | Naik Foods`,
    description: policy.subtitle,
  };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = POLICIES[slug];

  if (!policy) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div className="space-y-2 border-b border-stone-100 pb-6">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-800 text-xs font-bold px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Policy Document</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
            {policy.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            {policy.subtitle}
          </p>
        </div>

        <div>{policy.content}</div>
      </div>
    </div>
  );
}
