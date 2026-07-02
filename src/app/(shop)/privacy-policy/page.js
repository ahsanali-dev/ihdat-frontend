"use client";

import Link from "next/link";
import { Shield, Sparkles, Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A880] flex items-center justify-center gap-1.5">
            <Lock className="h-4 w-4 text-[#C5A880]" /> Client Confidentiality
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light uppercase tracking-widest text-[#1E1E24]">
            Privacy Policy
          </h1>
          <div className="h-[1px] w-24 bg-[#C5A880] mx-auto mt-2" />
          <p className="text-xs text-[#71717A] leading-relaxed tracking-wider max-w-lg mx-auto">
            Last Updated: July 2026 — At ihdat, we safeguard your personal details, custom measurements, and order history with utmost security.
          </p>
        </div>

        {/* Policy Content Card */}
        <div className="bg-white p-8 sm:p-12 border border-[#E4E4E7] shadow-xs space-y-8 text-xs text-[#1E1E24] leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#C5A880]" /> 1. Information We Collect
            </h2>
            <p className="text-gray-600">
              When you place an order, request custom tailoring, or contact our master tailor concierge, we collect necessary personal information to process your request:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
              <li>Contact details (Full Name, Email Address, Phone/WhatsApp Number).</li>
              <li>Delivery Address and Billing details for order fulfillment.</li>
              <li>Bespoke Measurements (Chest, Shoulder, Koti Length, Waist) and reference suit images uploaded.</li>
              <li>Technical device & browsing information to improve site navigation.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
              2. How We Use Your Data
            </h2>
            <p className="text-gray-600">
              Your information is strictly utilized to provide an exceptional custom tailoring and shopping experience:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
              <li>Custom tailoring and accurate stitching according to your submitted measurements.</li>
              <li>Order dispatch, tracking updates, and delivery confirmations via SMS/WhatsApp.</li>
              <li>Customer service assistance and bespoke tailor consultations.</li>
              <li>Secure payment processing (we do not store full credit card numbers on our servers).</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
              3. Data Security & Confidentiality
            </h2>
            <p className="text-gray-600">
              We employ industry-standard SSL encryption and secure database infrastructure to ensure your personal details and custom suit reference images remain private. We NEVER sell, rent, or trade client information to third-party marketing agencies.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
              4. Cookies & Analytics
            </h2>
            <p className="text-gray-600">
              Our website uses essential session cookies to preserve your shopping bag items, quick view modal preferences, and seamless navigation across pages.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
              5. Contacting Our Privacy Officer
            </h2>
            <p className="text-gray-600">
              If you have questions regarding your stored measurements or wish to update your details, please reach out to us at:
            </p>
            <div className="p-4 bg-[#FAF6F0] border border-gray-200 text-xs space-y-1 font-medium">
              <p>Email: <span className="text-[#C5A880]">concierge@ihdat.com</span></p>
              <p>WhatsApp: <span className="text-[#C5A880]">+92 300 1234567</span></p>
            </div>
          </div>

        </div>

        {/* Navigation Link */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#1E1E24] hover:bg-[#C5A880] hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-xs"
          >
            <span>Back to Main Store</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
