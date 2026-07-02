"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Shield, Heart } from "lucide-react";

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto space-y-16 mt-8">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A880]">
            our heritage
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light uppercase tracking-widest text-black">
            About ihdat
          </h1>
          <div className="h-[1px] w-24 bg-[#C5A880] mx-auto mt-2" />
        </div>

        {/* Narrative Section with Split Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-6 text-xs text-gray-700 leading-relaxed tracking-wider">
            <p className="font-serif text-sm font-semibold text-black">
              ihdat is a specialized fashion house dedicated to handcrafted ethnic Kotis, Waistcoats, and Overlay Short Jackets for Women and Children.
            </p>
            <p>
              Founded in Pakistan, our brand elevates traditional Eastern attire. A koti or waistcoat is more than an outerwear piece — it is the crown of a festive suit. We handcraft each piece using plush velvet, Banarsi brocade, pure raw silk, and intricate Zari & mirror embroideries.
            </p>
            <p>
              While our current core focus is on custom waistcoats & kotis for women and kids, our platform architecture and design philosophy are crafted to effortlessly expand into complete festive Pret collections and unstitched suits.
            </p>
          </div>
          
          <div className="md:col-span-5 relative aspect-3/4 bg-[#E4E4E7]/45 overflow-hidden shadow-md border border-gray-200/50">
            <Image
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600"
              alt="ihdat female model in velvet koti"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Pillars Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200/60 text-center">
          <div className="space-y-3 flex flex-col items-center">
            <Sparkles className="h-5 w-5 text-[#C5A880]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Artisanal Embroidery</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Hand-sewn Zari, tilla, mirror-work, and gota trims crafted by expert local artisans.
            </p>
          </div>
          <div className="space-y-3 flex flex-col items-center">
            <Shield className="h-5 w-5 text-[#C5A880]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Bespoke Fit</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Custom measurement option for Women and Children to pair seamlessly over any formal suit.
            </p>
          </div>
          <div className="space-y-3 flex flex-col items-center">
            <Heart className="h-5 w-5 text-[#C5A880]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Future Ready</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              A design ecosystem engineered to expand smoothly from specialist Kotis into full Pret apparel.
            </p>
          </div>
        </div>

        {/* CTA Block */}
        <div className="text-center pt-8 border-t border-gray-200/60">
          <Link
            href="/products"
            className="inline-block px-10 py-4 bg-black hover:bg-[#C5A880] hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md animate-pulse"
          >
            Explore the Kotis Collection
          </Link>
        </div>

      </div>
    </div>
  );
}
