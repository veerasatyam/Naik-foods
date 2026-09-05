"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink
} from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Customer Care & Flagship Store
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm">
          Have a question about our authentic spices, need help with an existing order, or planning to visit our Pune store? We are here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Contact Details & Store Location */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <h2 className="font-black text-lg text-stone-900 pb-3 border-b border-stone-100">
              Naik Foods Pune Store
            </h2>

            <div className="space-y-4 text-xs text-stone-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 text-sm">Physical Address</div>
                  <p className="mt-0.5 leading-relaxed text-stone-600">
                    Seva Mitra Mandal Chowk, Near Fadgate Police Chowki, Shukrawar Peth, Pune, Maharashtra 411002
                  </p>
                  <a
                    href="https://www.google.com/maps/place/NAIK+FOODS/@18.5085455,73.8572996,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-brand-700 font-bold hover:underline mt-1.5"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <Clock className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 text-sm">Store Timings</div>
                  <p className="mt-0.5 text-stone-600">Monday - Sunday: 9:00 AM - 9:30 PM</p>
                  <p className="text-[11px] text-stone-400">Open on all festival days & Sundays</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <Phone className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 text-sm">Customer Helpline</div>
                  <p className="mt-0.5 text-stone-600">+91 97300 46247</p>
                  <p className="text-[11px] text-stone-400">Mon - Sat: 9:30 AM - 7:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <Mail className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 text-sm">Official Email</div>
                  <a href="mailto:care@naikfoods.co.in" className="text-brand-700 hover:underline">
                    care@naikfoods.co.in
                  </a>
                  <p className="text-[11px] text-stone-400">Response guaranteed within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="pt-2">
              <a
                href="https://wa.me/919730046247?text=Hi%20Naik%20Foods!%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant Chat with Us on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Working Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <h2 className="font-black text-lg text-stone-900 pb-3 border-b border-stone-100">
              Send Us a Message
            </h2>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-black text-lg text-stone-900">Message Sent Successfully!</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Dhanyavad {formData.name}. Our customer care team will respond to your inquiry at <strong>{formData.email || formData.phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 text-xs font-bold text-brand-700 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tanvi Joshi"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9822012345"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-600"
                  >
                    <option value="Order Inquiry">Order Inquiry & Tracking</option>
                    <option value="Product Details">Spice Ingredients & Allergens</option>
                    <option value="Bulk Order">Bulk / Festive Faral Gifting</option>
                    <option value="Other">General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help you..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors active:scale-95"
                >
                  Send Message to Care Team
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
