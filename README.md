# Naik Foods (नाईक फूड्स) — Next-Gen Maharashtrian Heritage Platform

🌐 **Live Production Deploy URL**: [https://naik-foods.vercel.app/](https://naik-foods.vercel.app/)  
📦 **GitHub Repository**: [https://github.com/veerasatyam/Naik-foods](https://github.com/veerasatyam/Naik-foods)  
⚡ **Admin Portal**: [https://naik-foods.vercel.app/admin](https://naik-foods.vercel.app/admin) (Sign in with `satyamsvs788@gmail.com`)

A modern, accessible, high-performance e-commerce platform for **Naik Foods**, celebrating authentic regional delicacies from **Vidarbha, Konkan, Pune, and Marathwada** since 1938.

---

## What Was Improved & Fixed (Overcoming Prior Cons)

1. **Eliminated Critical Bugs**:
   - Fixed broken Google Tag Manager / Analytics script preload (`id=undefined`).
   - Eliminated Unicode character corruption (``) with UTF-8 normalization.
   - Fixed Add-to-Cart button label concatenation bug (`Select variantAdded`).
   - Fixed `/search` 404 errors with debounced live search dialog and URL query persistence.

2. **SEO & Semantic Architecture**:
   - Dynamic, semantic `<h1>` on every product page (Product Title) and recipe page (Recipe Title).
   - Eliminated duplicate title suffixes (`Naik Foods | ... | Naik Foods`).
   - Clean, 160-character plain-text meta descriptions (removed raw markdown leakage).
   - Rich `schema.org/Product` and `FoodEstablishment` JSON-LD structured data.

3. **Food Compliance & Trust Signals**:
   - Mandatory **FSSAI License** (`11521036000428`) displayed in footer and on all product pages.
   - **Veg (Green) / Non-Veg (Red)** food safety dots (essential for separating seafood pickles like Kolambi Lonche from vegetarian masalas).
   - Clean ingredients list, allergen disclosures, and 100g nutritional facts table.
   - Reconciled conflicting policies: replaced the contradictory "30-day return" on food items with an honest **48-Hour Free Replacement Transit Guarantee**.

4. **Curated Heritage Brand Positioning**:
   - Delisted generic industrial commodities (Maggi, Knorr, Yippee) to restore authentic culinary credibility.
   - Curated 100% regional delicacies: *Vidarbha Sauji Masala, Ambadi Bhajiche Lonche, Konkan Kolambi Lonche, Ratnagiri Alphonso Aamras, Pune Jowar Bhakarwadi, Shrewsbury Butter Cookies, Hurda Thalipith Bhajni, Sprouted Chik*.
   - Replaced generic placeholder reviews with genuine verified buyer testimonials.

5. **High-Converting Innovative Features**:
   - **Bilingual English / मराठी (Marathi)** language toggle.
   - **Interactive Maharashtra Regional Explorer** (Vidarbha, Konkan, Pune, Marathwada).
   - **1-Click Shoppable Recipes** (Pune Misal Pav, Hurda Thalipith, Sauji Paneer, Solkadhi).
   - **Dynamic Free Delivery Progress Bar** (lowered barrier from ₹999 to ₹499).
   - **Instant Pincode Delivery Estimator** for 6-digit Indian postal codes.
   - **1-Click WhatsApp Direct Ordering** with pre-filled cart payload.

6. **Non-Technical Admin Dashboard & Product Catalog Manager**:
   - **No-Code Product Creation** (`/admin/products/new`): Store managers can add new authentic delicacies with English & Marathi titles, region, category, price, discount, weight, shelf life, Veg/Non-Veg indicator, and nutritional values.
   - **Live Stock Management** (`/admin/products`): Instant 1-click toggle for In-Stock / Out-of-Stock and item deletion.
   - **Dynamic Routes & SEO**: Every newly added product immediately gets its own SEO-optimized landing page at `/products/[slug]` with structured schema.org JSON-LD.

7. **Customer & Admin Authentication**:
   - **Customer Portal** (`/login`, `/register`, `/account`): Sign in, manage profile, track simulated past orders, and view saved shipping addresses.
   - **Admin Access**: Log in with `satyamsvs788@gmail.com` to unlock the Admin Dashboard button and catalog management privileges.

---

## Tech Stack
* **Framework**: Next.js 15 (App Router, React 19, TypeScript)
* **Styling**: Tailwind CSS (custom brand palette with WCAG AA compliance)
* **Icons**: Lucide React
* **Data Storage**: File-backed JSON database with Next.js dynamic Route Handlers (`/api/products`, `/api/auth`)
* **Hosting / Runtime**: Node.js v20+ / v24+

---

## Admin Credentials & How to Add New Products

1. Navigate to `/login` or click **Sign In** in the top navigation bar.
2. Click the **"⚡ Fill Admin Demo Credentials"** button (or enter `satyamsvs788@gmail.com`).
3. Click **"Sign In"**. You are now logged in as an Administrator!
4. An amber **"Admin"** button will appear in the navigation bar. Click it or visit `/admin`.
5. Click **"Add New Product"** (`/admin/products/new`), fill out the product details (e.g. Solapuri Shenga Chutney), select an image preset, and click **"Publish Product to Store"**.
6. The item is immediately live across the store, search dialog, and on its dedicated URL!

---

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```
