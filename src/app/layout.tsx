import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/navbar/Navbar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/footer/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // allows pinch-to-zoom for accessibility!
  themeColor: "#325c27",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.naikfoods.co.in"),
  title: {
    default: "Naik Foods | Authentic Maharashtrian Delicacies & Heritage Masalas",
    template: "%s | Naik Foods",
  },
  description:
    "Order authentic Maharashtrian pickles, stone-ground masalas, and wholesome snacks from Vidarbha, Konkan & Pune. Handcrafted with traditional recipes since 1938.",
  keywords: [
    "Naik Foods",
    "Maharashtrian food",
    "Vidarbha sauji masala",
    "Ambadi lonche",
    "Kolambi prawn pickle",
    "Pune shrewsbury cookies",
    "baked bhakarwadi",
    "goda masala",
    "thalipith bhajni",
    "hurda",
  ],
  authors: [{ name: "Naik Foods" }],
  openGraph: {
    title: "Naik Foods | Authentic Maharashtrian Delicacies",
    description:
      "Handcrafted stone-ground masalas, heirloom pickles, and regional snacks from Vidarbha, Konkan, and Pune.",
    url: "https://www.naikfoods.co.in",
    siteName: "Naik Foods",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Structured Data: Organization & SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              name: "Naik Foods",
              url: "https://www.naikfoods.co.in",
              logo: "https://www.naikfoods.co.in/logo.png",
              telephone: "+91-97300-46247",
              email: "care@naikfoods.co.in",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Seva Mitra Mandal Chowk, Near Fadgate Police Chowki, Shukrawar Peth",
                addressLocality: "Pune",
                addressRegion: "Maharashtra",
                postalCode: "411002",
                addressCountry: "IN",
              },
              foundingDate: "1938",
            }),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <AppProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
