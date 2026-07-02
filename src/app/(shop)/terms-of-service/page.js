"use client";

import Link from "next/link";
import { FileText, Sparkles, Scissors } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A880] flex items-center justify-center gap-1.5">
            <FileText className="h-4 w-4 text-[#C5A880]" /> Store Guidelines
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light uppercase tracking-widest text-[#1E1E24]">
            Terms of Service
          </h1>
          <div className="h-[1px] w-24 bg-[#C5A880] mx-auto mt-2" />
          <p className="text-xs text-[#71717A] leading-relaxed tracking-wider max-w-lg mx-auto">
            Effective Date: July 2026 — Please review our store terms covering orders, bespoke tailoring, dispatch, and returns.
          </p>
        </div>

        {/* Terms Content Card */}
        <div className="bg-white p-8 sm:p-12 border border-[#E4E4E7] shadow-xs space-y-8 text-xs text-[#1E1E24] leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
              1. Store Overview & Bespoke Scope
            </h2>
            <p className="text-gray-600">
              ihdat specializes in handcrafted ethnic Kotis, Waistcoats, and custom outerwear for Women and Children. By placing an order through our website, you agree to these Terms of Service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2 flex items-center gap-2">
              <Scissors className="h-4 w-4 text-[#C5A880]" /> 2. Bespoke & Custom Orders Policy
            </h2>
            <p className="text-gray-600">
              For custom-tailored orders submitted via our Custom Measurement Studio:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
              <li>Customers are responsible for providing accurate body measurements (Chest, Shoulder, Length).</li>
              <li>Handcrafted embroideries (Zari, Tilla, Mirror-work) may exhibit slight unique artisanal variations.</li>
              <li>Custom orders enter tailoring within 24 hours of confirmation and cannot be cancelled once cutting begins.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
              3. Pricing & Payment Terms
            </h2>
            <p className="text-gray-600">
              All prices are listed in Pakistani Rupees (PKR) inclusive of applicable taxes. We accept Cash on Delivery (COD) and Online Card Payments. We reserve the right to modify pricing or promotional offers at any time without prior notice.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
              4. Shipping & Delivery Timelines
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
              <li>Standard Ready-to-Wear Kotis: Dispatched within 24-48 hours. Delivery takes 3-5 business days across Pakistan.</li>
              <li>Bespoke Custom Orders: Handcrafted and stitched within 7-10 business days.</li>
              <li>Free shipping is automatically applied on orders over Rs. 10,000.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
              5. Returns & Exchange Policy
            </h2>
            <p className="text-gray-600">
              Ready-to-wear items in original unworn condition with tags attached may be exchanged within 7 days of delivery. Custom-tailored items made to unique body measurements are non-refundable unless a manufacturing defect or stitching error occurs on our end.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-light uppercase tracking-wider text-[#1E1E24] border-b border-gray-100 pb-2">
              6. Intellectual Property
            </h2>
            <p className="text-gray-600">
              All branding elements, embroidery patterns, product photography, and visual studio designs are the exclusive property of ihdat.
            </p>
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
