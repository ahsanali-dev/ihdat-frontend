"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { ArrowRight, Sparkles, Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const products = useSelector((state) => state.products.products);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 3);

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
        {/* Full-bleed Luxury Unsplash Visual */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600"
            alt="ihdat Summer Collection Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-45 contrast-[1.05] scale-102 transition-transform duration-1000"
          />
          {/* Ambient gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-[#FAF6F0]/5" />
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
              summer journal 2026
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-extralight tracking-[0.2em] leading-none uppercase text-white drop-shadow-xs">
              ihdat
            </h1>
            <p className="text-xs md:text-sm max-w-lg mx-auto font-light text-gray-200/90 tracking-[0.15em] leading-relaxed">
              An expression of pure visual form and minimal aesthetics, tailoring organic fibers into timeless silhouettes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/products"
              className="px-10 py-4 border border-transparent text-[10px] font-bold uppercase tracking-widest text-black bg-[#C5A880] hover:bg-white hover:text-black transition-colors w-full sm:w-auto shadow-md"
            >
              Explore Collection
            </Link>
            <Link
              href="/products?category=Outerwear"
              className="px-10 py-4 border border-white/80 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all w-full sm:w-auto"
            >
              View Outerwear
            </Link>
          </motion.div>
        </div>
        
      </section>

      {/* 2. Collection Category Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C5A880]">
            curated focus
          </span>
          <h2 className="font-serif text-3xl font-light tracking-widest uppercase text-black">
            Curated Categories
          </h2>
          <div className="h-[1px] w-20 bg-[#C5A880] mx-auto" />
          <p className="text-xs text-[#71717A] tracking-wider">
            Explore our thoughtfully compiled capsule collections
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Category 1 */}
          <motion.div
            variants={fadeInUp}
            className="group relative h-96 bg-gray-900 text-white flex flex-col justify-end p-8 overflow-hidden cursor-pointer shadow-sm border border-gray-100"
          >
            <Image
              src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600"
              alt="Shirts & Polo Category"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-50 z-0"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/45 to-transparent z-10" />
            
            <div className="absolute top-8 left-8 flex space-x-2 z-20">
              <span className="h-6 w-6 rounded-full bg-[#FAF6F0] border border-white/20 shadow-xs" />
              <span className="h-6 w-6 rounded-full bg-[#7097A8] border border-white/20 shadow-xs" />
            </div>

            <div className="relative z-20 space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                Essentials
              </span>
              <h3 className="font-serif text-2xl font-light tracking-wide uppercase">
                Shirts & Polo
              </h3>
              <p className="text-xs text-[#A1A1AA] font-light max-w-xs leading-relaxed">
                Lightweight fabrics, clean cuts, and fine-knit organic cotton styles.
              </p>
              <Link
                href="/products?category=Shirts"
                className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white hover:text-[#C5A880] pt-2"
              >
                Browse Now <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Category 2 */}
          <motion.div
            variants={fadeInUp}
            className="group relative h-96 bg-gray-900 text-white flex flex-col justify-end p-8 overflow-hidden cursor-pointer shadow-sm border border-gray-100"
          >
            <Image
              src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600"
              alt="Outerwear Category"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-50 z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />

            <div className="absolute top-8 left-8 flex space-x-2 z-20">
              <span className="h-6 w-6 rounded-full bg-[#1E1E24] border border-white/20 shadow-xs" />
              <span className="h-6 w-6 rounded-full bg-[#3D5A50] border border-white/20 shadow-xs" />
            </div>

            <div className="relative z-20 space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                Tailored
              </span>
              <h3 className="font-serif text-2xl font-light tracking-wide uppercase">
                Outerwear
              </h3>
              <p className="text-xs text-[#A1A1AA] font-light max-w-xs leading-relaxed">
                Structured blazers, jackets, and protective mid-layers designed for durability.
              </p>
              <Link
                href="/products?category=Outerwear"
                className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white hover:text-[#C5A880] pt-2"
              >
                Browse Now <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Category 3 */}
          <motion.div
            variants={fadeInUp}
            className="group relative h-96 bg-gray-900 text-white flex flex-col justify-end p-8 overflow-hidden cursor-pointer shadow-sm border border-gray-100"
          >
            <Image
              src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600"
              alt="Accessories Category"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-50 z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />

            <div className="absolute top-8 left-8 flex space-x-2 z-20">
              <span className="h-6 w-6 rounded-full bg-[#D4AF37] border border-white/20 shadow-xs" />
              <span className="h-6 w-6 rounded-full bg-[#7D1D2B] border border-white/20 shadow-xs" />
            </div>

            <div className="relative z-20 space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                Finishing
              </span>
              <h3 className="font-serif text-2xl font-light tracking-wide uppercase">
                Accessories
              </h3>
              <p className="text-xs text-[#A1A1AA] font-light max-w-xs leading-relaxed">
                Handcrafted mulberry silk scarves and elements to refine your aesthetic.
              </p>
              <Link
                href="/products?category=Accessories"
                className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white hover:text-[#C5A880] pt-2"
              >
                Browse Now <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. Editorial Story / Lookbook Collage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Asymmetric Image Block */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">
            <div className="col-span-8 relative aspect-[3/4] overflow-hidden group shadow-md border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600"
                alt="ihdat editorial portrait"
                fill
                sizes="(max-width: 1024px) 60vw, 40vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-103"
              />
            </div>
            <div className="col-span-4 relative aspect-3/4 mt-12 overflow-hidden group shadow-sm border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=600"
                alt="Fabric and texture closeup"
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
              The Art of <br /> Slow Silhouettes
            </h2>
            <div className="h-[1px] w-20 bg-[#C5A880]" />
            <p className="text-xs text-[#71717A] leading-relaxed tracking-wider">
              Our designs capture the silent luxury of simplicity. Crafted in Pakistan, each piece in the Summer 2026 Collection utilizes organic cotton, bespoke linen, and fine artisan blends designed to breathe under the regional heat.
            </p>
            <p className="text-xs text-[#71717A] leading-relaxed tracking-wider">
              From our signature knit polos to tailored pleated trousers, the selection focuses on versatility, neutral color tones, and structures that outlast seasonal trends.
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
              editor&apos;s choice
            </span>
            <h2 className="font-serif text-3xl font-light tracking-widest uppercase text-black">
              Featured Items
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#111111] hover:text-[#C5A880] pt-4 sm:pt-0 transition-colors border-b border-[#111111] pb-1 hover:border-[#C5A880]"
          >
            View All Products
          </Link>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#E4E4E7]/40 p-8 shadow-xs space-y-3">
            <p className="text-sm font-medium text-gray-500 tracking-wider">No featured products available at the moment.</p>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              We are updating our catalog. Please check back soon or visit the catalog to view other options.
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
              closet foundations
            </span>
            <h2 className="font-serif text-2xl font-light tracking-widest uppercase text-black">
              Spotlight Details
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                url: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?q=80&w=600",
                title: "Premium Knits",
                desc: "100% fine organic cotton yarn"
              },
              {
                url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600",
                title: "Structured Layers",
                desc: "Custom weight blends"
              },
              {
                url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600",
                title: "Neutral Hues",
                desc: "Classic natural dyes"
              },
              {
                url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600",
                title: "Bespoke Silk",
                desc: "Hand-finished scarves"
              }
            ].map((spot, idx) => (
              <div key={idx} className="group relative aspect-[4/5] bg-gray-150 overflow-hidden shadow-xs border border-gray-200/40">
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
                Artisanal Quality
              </h3>
              <p className="text-xs text-[#71717A] max-w-xs leading-relaxed tracking-wider">
                Every line, fold, and button is carefully designed. We use organic wools and custom linens of the highest caliber.
              </p>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="p-4 bg-[#C5A880]/10 rounded-full text-[#C5A880]">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-base font-serif uppercase tracking-widest text-[#FAF6F0]">
                Made to Outlast
              </h3>
              <p className="text-xs text-[#71717A] max-w-xs leading-relaxed tracking-wider">
                We believe in slow fashion. Our apparel is engineered to maintain its shape, texture, and elegant look for years.
              </p>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="p-4 bg-[#C5A880]/10 rounded-full text-[#C5A880]">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-base font-serif uppercase tracking-widest text-[#FAF6F0]">
                Conscious Sourcing
              </h3>
              <p className="text-xs text-[#71717A] max-w-xs leading-relaxed tracking-wider">
                ihdat maintains transparency in materials. We manufacture ethically in certified mills committed to conservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Members Club / Newsletter Invitation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#FAF6F0] border border-gray-200/50 p-12 md:p-20 text-center space-y-8 overflow-hidden shadow-2xs">
          {/* Subtle background overlay icons */}
          <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none select-none">
            <Sparkles className="h-96 w-96 text-[#C5A880]" />
          </div>

          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A880]">
              ihdat members club
            </span>
            <h2 className="font-serif text-3xl font-light tracking-widest uppercase text-black">
              Elevate Your Wardrobe
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed tracking-wider max-w-md mx-auto">
              Subscribe to receive private invitations to seasonal pre-sales, lookbooks, and exclusive product releases.
            </p>
          </div>

          <div className="max-w-md mx-auto relative z-10">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 mt-4">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-grow border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-black bg-white text-black rounded-none shadow-3xs"
              />
              <button
                type="submit"
                className="bg-black hover:bg-[#C5A880] hover:text-black text-[#FAF6F0] px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors rounded-none shadow-sm"
              >
                Join Club
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
