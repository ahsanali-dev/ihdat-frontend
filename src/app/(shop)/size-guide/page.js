"use client";

import Link from "next/link";
import { Scissors, Shield, Sparkles } from "lucide-react";

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A880] flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#C5A880]" /> Sizing & Care Atelier
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light uppercase tracking-widest text-[#1E1E24]">
            Size Guide & Care
          </h1>
          <div className="h-[1px] w-24 bg-[#C5A880] mx-auto mt-2" />
          <p className="text-xs text-[#71717A] leading-relaxed tracking-wider max-w-lg mx-auto">
            Find your exact size across Women's & Children's Kotis, or learn how to measure for bespoke tailoring.
          </p>
        </div>

        {/* 1. Women's Koti Sizing Table */}
        <div className="bg-white p-8 border border-[#E4E4E7] shadow-xs space-y-6 rounded-2xl">
          <h2 className="font-serif text-2xl font-light uppercase tracking-wider text-[#1E1E24]">
            Women's Koti & Waistcoat Sizing (Inches)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF6F0] border-b border-gray-200 text-[#1E1E24] uppercase tracking-widest text-[10px] font-bold">
                  <th className="p-3">Size Tag</th>
                  <th className="p-3">Bust / Chest</th>
                  <th className="p-3">Shoulder Width</th>
                  <th className="p-3">Koti Length</th>
                  <th className="p-3">Waist Fit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                <tr>
                  <td className="p-3 font-bold text-[#1E1E24]">Small (S)</td>
                  <td className="p-3">34 - 36 in</td>
                  <td className="p-3">14.0 in</td>
                  <td className="p-3">17.5 in</td>
                  <td className="p-3">30 - 32 in</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#1E1E24]">Medium (M)</td>
                  <td className="p-3">37 - 39 in</td>
                  <td className="p-3">14.5 in</td>
                  <td className="p-3">18.0 in</td>
                  <td className="p-3">33 - 35 in</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#1E1E24]">Large (L)</td>
                  <td className="p-3">40 - 42 in</td>
                  <td className="p-3">15.0 in</td>
                  <td className="p-3">19.0 in</td>
                  <td className="p-3">36 - 38 in</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#1E1E24]">Extra Large (XL)</td>
                  <td className="p-3">43 - 45 in</td>
                  <td className="p-3">15.5 in</td>
                  <td className="p-3">20.0 in</td>
                  <td className="p-3">39 - 41 in</td>
                </tr>
                <tr className="bg-[#FAF6F0]/50 font-bold text-[#C5A880]">
                  <td className="p-3">Custom Fit</td>
                  <td className="p-3" colSpan="4">Made to your exact measurements via our Custom Order Studio</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Kids' Waistcoat Sizing Table */}
        <div className="bg-white p-8 border border-[#E4E4E7] shadow-xs space-y-6 rounded-2xl">
          <h2 className="font-serif text-2xl font-light uppercase tracking-wider text-[#1E1E24]">
            Kids' Festive Waistcoat Sizing
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF6F0] border-b border-gray-200 text-[#1E1E24] uppercase tracking-widest text-[10px] font-bold">
                  <th className="p-3">Age Bracket</th>
                  <th className="p-3">Chest (in)</th>
                  <th className="p-3">Shoulder (in)</th>
                  <th className="p-3">Length (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                <tr><td className="p-3 font-bold text-[#1E1E24]">2 - 4 Years</td><td className="p-3">23 - 24 in</td><td className="p-3">9.5 in</td><td className="p-3">13.0 in</td></tr>
                <tr><td className="p-3 font-bold text-[#1E1E24]">4 - 6 Years</td><td className="p-3">25 - 26 in</td><td className="p-3">10.5 in</td><td className="p-3">14.5 in</td></tr>
                <tr><td className="p-3 font-bold text-[#1E1E24]">6 - 8 Years</td><td className="p-3">27 - 28 in</td><td className="p-3">11.5 in</td><td className="p-3">16.0 in</td></tr>
                <tr><td className="p-3 font-bold text-[#1E1E24]">8 - 10 Years</td><td className="p-3">29 - 30 in</td><td className="p-3">12.5 in</td><td className="p-3">17.5 in</td></tr>
                <tr><td className="p-3 font-bold text-[#1E1E24]">10 - 12 Years</td><td className="p-3">31 - 32 in</td><td className="p-3">13.5 in</td><td className="p-3">19.0 in</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Garment Care Guidelines */}
        <div className="bg-[#1E1E24] text-white p-8 space-y-6 shadow-md rounded-2xl">
          <div className="flex items-center space-x-2 text-[#C5A880]">
            <Shield className="h-5 w-5" />
            <h3 className="font-serif text-lg font-semibold uppercase tracking-wider">Garment Preservation & Care</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#A1A1AA] leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider">Dry Clean Only</h4>
              <p>All Zari, mirror-work, and velvet Kotis must be professionally dry-cleaned to protect delicate embroideries.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider">Steam Ironing</h4>
              <p>Steam iron from the reverse side using low heat. Avoid direct contact on mirror & metallic thread trims.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider">Storage</h4>
              <p>Store in breathable cotton garment covers away from direct sunlight to preserve silk & velvet sheen.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/custom-order"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-[#1E1E24] hover:bg-[#C5A880] hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-sm rounded-lg"
          >
            <Scissors className="h-4 w-4" />
            <span>Need Custom Fit? Visit Custom Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
