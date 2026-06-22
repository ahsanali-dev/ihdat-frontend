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
              Born from a pursuit of pure visual form and minimal aesthetics, ihdat is a contemporary fashion house tailoring timeless silhouettes from organic textiles.
            </p>
            <p>
              Founded in Pakistan, our name represents unity, clarity, and structural harmony. We reject the fast-fashion cycle in favor of slow, deliberate production. Every garment is carefully engineered to maintain its shape, texture, and visual relevance for years to come.
            </p>
            <p>
              We collaborate exclusively with ethical mills committed to resource conservation and fair labor. By using premium linen, organic knit cotton, and pure mulberry silk, we craft capsule foundations that elevate daily dressing with ease.
            </p>
          </div>
          
          <div className="md:col-span-5 relative aspect-3/4 bg-[#E4E4E7]/45 overflow-hidden shadow-md border border-gray-200/50">
            <Image
              src="https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=600"
              alt="ihdat textile process"
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Artisanal Tailoring</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Every detail is meticulously refined, from custom button fittings to high-density loopback stitching.
            </p>
          </div>
          <div className="space-y-3 flex flex-col items-center">
            <Shield className="h-5 w-5 text-[#C5A880]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Sustainable Longevity</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              We design for longevity. Our apparel holds its texture and premium fit, reducing garment waste.
            </p>
          </div>
          <div className="space-y-3 flex flex-col items-center">
            <Heart className="h-5 w-5 text-[#C5A880]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Ethical Sourcing</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Transparency in sourcing raw natural fibers, ensuring environmental accountability at every step.
            </p>
          </div>
        </div>

        {/* CTA Block */}
        <div className="text-center pt-8 border-t border-gray-200/60">
          <Link
            href="/products"
            className="inline-block px-10 py-4 bg-black hover:bg-[#C5A880] hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md animate-pulse"
          >
            Explore the Collection
          </Link>
        </div>

      </div>
    </div>
  );
}
