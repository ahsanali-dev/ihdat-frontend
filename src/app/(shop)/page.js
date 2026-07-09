"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ArrowRight, Sparkles, Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import ReviewsSection from "@/components/ReviewsSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function HomePage() {
  const { products, loading } = useSelector((state) => state.products);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fade-in variants for Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="space-y-28 pb-24 overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative h-[92vh] flex items-center justify-center bg-[#111111] text-white overflow-hidden">
        {/* Full-bleed Luxury Ethnic Koti Visual featuring female model in embroidered jacket */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1600"
            alt="ihdat Women & Kids Ethnic Kotis Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-45 contrast-[1.05] scale-102 transition-transform duration-1000"
          />
          {/* Ambient gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-[#FAF6F0]/10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white/10 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10 space-y-8 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-5"
          >
            <p className="text-[10px] uppercase tracking-[0.45em] text-[#C5A880] font-bold">
              Women & Kids Festive Kotis 2026
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-extralight tracking-[0.2em] leading-none uppercase text-white drop-shadow-xs">
              ihdat
            </h1>
            <p className="text-xs md:text-sm max-w-xl mx-auto font-light text-gray-200/90 tracking-[0.15em] leading-relaxed">
              Bespoke handcrafted Kotis, Waistcoats & Ethnic Overlay Jackets for Women & Children. Designed to layer gracefully over any formal suit or kurti.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/products?category=Women%27s%20Kotis"
              className="px-10 py-4 border border-transparent text-[10px] font-bold uppercase tracking-widest text-black bg-[#C5A880] hover:bg-white hover:text-black transition-colors w-full sm:w-auto shadow-md rounded-lg"
            >
              Explore Women's Kotis
            </Link>
            <Link
              href="/products?category=Kids%27%20Waistcoats"
              className="px-10 py-4 border border-white/80 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all w-full sm:w-auto rounded-lg"
            >
              Kids Waistcoats
            </Link>
          </motion.div>
        </div>
        
      </section>

      {/* 2. Collection Category Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C5A880]">
            specialized focus
          </span>
          <h2 className="font-serif text-3xl font-light tracking-widest uppercase text-black">
            Curated Collections
          </h2>
          <div className="h-[1px] w-20 bg-[#C5A880] mx-auto" />
          <p className="text-xs text-[#71717A] tracking-wider">
            Explore handcrafted ethnic kotis, kids waistcoats, and custom outerwear
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Category 1: Women's Kotis */}
          <motion.div
            variants={fadeInUp}
            className="group relative h-96 bg-gray-900 text-white flex flex-col justify-end p-8 overflow-hidden cursor-pointer shadow-sm border border-gray-100 rounded-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600"
              alt="Women's Ethnic Kotis Collection"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-50 z-0"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/45 to-transparent z-10" />
            
            <div className="absolute top-8 left-8 flex space-x-2 z-20">
              <span className="h-6 w-6 rounded-full bg-[#0B3C49] border border-white/20 shadow-xs" />
              <span className="h-6 w-6 rounded-full bg-[#D4AF37] border border-white/20 shadow-xs" />
            </div>

            <div className="relative z-20 space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                Her Collection
              </span>
              <h3 className="font-serif text-2xl font-light tracking-wide uppercase">
                Women's Kotis
              </h3>
              <p className="text-xs text-[#A1A1AA] font-light max-w-xs leading-relaxed">
                Zari embroidered velvet, Banarsi brocade, and mirror-work waistcoats for suits & kurtis.
              </p>
              <Link
                href="/products?category=Women%27s%20Kotis"
                className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white hover:text-[#C5A880] pt-2"
              >
                Browse Collection <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Category 2: Kids' Waistcoats */}
          <motion.div
            variants={fadeInUp}
            className="group relative h-96 bg-gray-900 text-white flex flex-col justify-end p-8 overflow-hidden cursor-pointer shadow-sm border border-gray-100 rounded-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600"
              alt="Kids' Ethnic Waistcoats Category"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-50 z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />

            <div className="absolute top-8 left-8 flex space-x-2 z-20">
              <span className="h-6 w-6 rounded-full bg-[#E8B4B8] border border-white/20 shadow-xs" />
              <span className="h-6 w-6 rounded-full bg-[#1B263B] border border-white/20 shadow-xs" />
            </div>

            <div className="relative z-20 space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                Junior Edition
              </span>
              <h3 className="font-serif text-2xl font-light tracking-wide uppercase">
                Kids' Waistcoats
              </h3>
              <p className="text-xs text-[#A1A1AA] font-light max-w-xs leading-relaxed">
                Festive jacquard silk kotis and soft velvet waistcoats designed for children.
              </p>
              <Link
                href="/products?category=Kids%27%20Waistcoats"
                className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white hover:text-[#C5A880] pt-2"
              >
                Browse Kids <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Category 3: Custom Jackets */}
          <motion.div
            variants={fadeInUp}
            className="group relative h-96 bg-gray-900 text-white flex flex-col justify-end p-8 overflow-hidden cursor-pointer shadow-sm border border-gray-100 rounded-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600"
              alt="Custom Jackets Category"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-50 z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />

            <div className="absolute top-8 left-8 flex space-x-2 z-20">
              <span className="h-6 w-6 rounded-full bg-[#D4AF37] border border-white/20 shadow-xs" />
              <span className="h-6 w-6 rounded-full bg-[#1E1E24] border border-white/20 shadow-xs" />
            </div>

            <div className="relative z-20 space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                Bespoke Order
              </span>
              <h3 className="font-serif text-2xl font-light tracking-wide uppercase">
                Custom Jackets
              </h3>
              <p className="text-xs text-[#A1A1AA] font-light max-w-xs leading-relaxed">
                Hand-embroidered capes and custom-fitted waistcoats tailored to your exact fit.
              </p>
              <Link
                href="/products?category=Custom%20Jackets"
                className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white hover:text-[#C5A880] pt-2"
              >
                Custom Orders <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. Editorial Story / Lookbook Collage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Asymmetric Image Block featuring female model and kids waistcoat */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">
            <div className="col-span-8 relative aspect-[3/4] overflow-hidden group shadow-md border border-gray-100 rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600"
                alt="ihdat female model in velvet koti"
                fill
                sizes="(max-width: 1024px) 60vw, 40vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-103"
              />
            </div>
            <div className="col-span-4 relative aspect-3/4 mt-12 overflow-hidden group shadow-sm border border-gray-100 rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600"
                alt="Kids ethnic waistcoat design"
                fill
                sizes="(max-width: 1024px) 30vw, 20vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-103"
              />
            </div>
          </div>

          {/* Right: Text Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A880]">
              editorial journal
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide uppercase text-black leading-tight">
              The Art of <br /> Layered Elegance
            </h2>
            <div className="h-[1px] w-20 bg-[#C5A880]" />
            <p className="text-xs text-[#71717A] leading-relaxed tracking-wider">
              Our designs capture the silent luxury of traditional layering. Crafted with hand-embroidered Zari, mirror-work, and fine velvet, each koti and waistcoat is styled to elevate formal kurtas & suits.
            </p>
            <p className="text-xs text-[#71717A] leading-relaxed tracking-wider">
              Focused primarily on custom waistcoats & Kotis for Women and Children, ihdat builds timeless wardrobe overlays — with ready architectural expansion for full festive Pret & unstitched apparel.
            </p>
            <div className="pt-4">
              <Link
                href="/products"
                className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-black hover:text-[#C5A880] transition-colors border-b border-black pb-1.5 hover:border-[#C5A880]"
              >
                Discover the Lookbook <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A880]">
              artisan selection
            </span>
            <h2 className="font-serif text-3xl font-light tracking-widest uppercase text-black">
              Featured Kotis & Waistcoats
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#111111] hover:text-[#C5A880] pt-4 sm:pt-0 transition-colors border-b border-[#111111] pb-1 hover:border-[#C5A880]"
          >
            View All Collections
          </Link>
        </div>

        {mounted && loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-4 text-left">
                <div className="aspect-[3/4] w-full bg-zinc-100 animate-pulse border border-zinc-200/50 rounded-xs">
                  <Skeleton height="100%" borderRadius={0} />
                </div>
                <div className="space-y-2">
                  <Skeleton width="70%" height={16} />
                  <Skeleton width="40%" height={12} />
                  <Skeleton width="30%" height={12} />
                </div>
              </div>
            ))}
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#E4E4E7]/40 p-8 shadow-xs space-y-3">
            <p className="text-sm font-medium text-gray-500 tracking-wider">No featured products available at the moment.</p>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              We are updating our handcrafted catalog. Please check back soon or visit the catalog to view options.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Spotlight Fabric & Detail Swatches Grid */}
      <section className="bg-[#FAF6F0] py-20 border-y border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#C5A880]">
              artisanal craft
            </span>
            <h2 className="font-serif text-2xl font-light tracking-widest uppercase text-black">
              Spotlight Details
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600",
                title: "Zari & Dori Ties",
                desc: "Gold thread & tassel closures"
              },
              {
                url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600",
                title: "Plush Velvet & Brocade",
                desc: "Rich luxury woven fabrics"
              },
              {
                url: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600",
                title: "Kids Festive Fit",
                desc: "Soft lining for children"
              },
              {
                url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600",
                title: "Bespoke Tailoring",
                desc: "Custom sizing for suits"
              }
            ].map((spot, idx) => (
              <div key={idx} className="group relative aspect-[4/5] bg-gray-150 overflow-hidden shadow-xs border border-gray-200/40 rounded-2xl">
                <Image
                  src={spot.url}
                  alt={spot.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">{spot.title}</h4>
                  <p className="text-[8px] text-gray-300 tracking-wider mt-0.5">{spot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brand Philosophy / Values */}
      <section className="bg-[#111111] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4 flex flex-col items-center">
              <div className="p-4 bg-[#C5A880]/10 rounded-full text-[#C5A880]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-base font-serif uppercase tracking-widest text-[#FAF6F0]">
                Artisanal Embroidery
              </h3>
              <p className="text-xs text-[#71717A] max-w-xs leading-relaxed tracking-wider">
                Hand-stitched Zari, tilla, mirror-work, and gota trims crafted by master artisans in Pakistan.
              </p>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="p-4 bg-[#C5A880]/10 rounded-full text-[#C5A880]">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-base font-serif uppercase tracking-widest text-[#FAF6F0]">
                Versatile Layering
              </h3>
              <p className="text-xs text-[#71717A] max-w-xs leading-relaxed tracking-wider">
                Engineered to pair effortlessly over any Eastern kurta, dress, or formal suit for instant festive flair.
              </p>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="p-4 bg-[#C5A880]/10 rounded-full text-[#C5A880]">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-base font-serif uppercase tracking-widest text-[#FAF6F0]">
                Custom Made
              </h3>
              <p className="text-xs text-[#71717A] max-w-xs leading-relaxed tracking-wider">
                We offer bespoke tailor-made sizing options for both Women and Children to ensure a flawless fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Testimonials Section */}
      <ReviewsSection />

      {/* 7. Pret & Suits Atelier Preview Showcase (Expansion Vision) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#FAF6F0] p-8 md:p-16 border border-gray-200/60 shadow-xs rounded-3xl">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A880]">
              future pret atelier
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light uppercase tracking-widest text-black leading-tight">
              Pret & Suits <br /> Expansion Preview
            </h2>
            <div className="h-[1px] w-20 bg-[#C5A880]" />
            <p className="text-xs text-[#71717A] leading-relaxed tracking-wider">
              While specialized in Kotis & Waistcoats today, ihdat is expanding into bespoke 2-piece and 3-piece silk suit sets designed as complete festive Pret collections.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/custom-order"
                className="px-8 py-3.5 bg-black hover:bg-[#C5A880] hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-sm rounded-lg"
              >
                Bespoke Custom Order Request
              </Link>
              <Link
                href="/products"
                className="px-8 py-3.5 border border-black hover:bg-black hover:text-white text-black text-xs font-bold uppercase tracking-widest transition-colors rounded-lg"
              >
                Explore Current Catalog
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-4/3 bg-gray-200 overflow-hidden shadow-md border border-gray-200 rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800"
              alt="ihdat Pret Suit & Koti Set preview"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 border border-white/20">
              Pret Collection 2026
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
