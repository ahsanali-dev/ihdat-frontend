"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { quickViewActions } from "@/store/slices/quickViewSlice";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const defaultImage = product.images?.[0] || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600";
  const hoverImage = product.images?.[1] || defaultImage;

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(quickViewActions.openQuickView(product));
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block space-y-4">
      {/* Visual Container */}
      <div className="relative aspect-[3/4] bg-[#FAF6F0] overflow-hidden border border-[#E4E4E7]/40 shadow-xs">
        
        {/* Images with Fade Swap Transition */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none w-full h-full">
          {/* Base/Default image */}
          <Image
            src={defaultImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-105 z-10"
          />

          {/* Hover image (alternative angle) */}
          <Image
            src={hoverImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Top Badges / Buttons */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2 z-20">
          {/* Color Indicators */}
          <div className="flex space-x-1">
            {product.colors.map((col, idx) => (
              <span
                key={col}
                className="h-3 w-3 rounded-full border border-white/60 shadow-2xs"
                title={product.colorNames[idx]}
                style={{ backgroundColor: col }}
              />
            ))}
          </div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col items-end space-y-2 z-20">
          {/* Stock Badges */}
          {product.stock === 0 ? (
            <span className="bg-[#1E1E24] text-[#FAF6F0] text-[8px] font-bold uppercase tracking-widest px-2.5 py-1">
              Sold Out
            </span>
          ) : product.stock <= 15 ? (
            <span className="bg-[#7D1D2B] text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-1">
              Low Stock
            </span>
          ) : null}

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="p-2 rounded-full bg-[#FAF6F0]/80 backdrop-blur-xs border border-[#E4E4E7]/30 text-[#1E1E24] hover:bg-[#FAF6F0] transition-colors shadow-2xs group/btn"
          >
            <Heart
              className={`h-3.5 w-3.5 transition-colors ${
                isWishlisted
                  ? "fill-[#7D1D2B] text-[#7D1D2B]"
                  : "text-[#1E1E24] group-hover/btn:text-[#7D1D2B]"
              }`}
            />
          </button>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-end justify-center pb-6 z-25">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleQuickView}
            className="bg-[#FAF6F0] text-[#1E1E24] hover:bg-[#1E1E24] hover:text-[#FAF6F0] text-[10px] font-bold uppercase tracking-widest px-6 py-3 border border-[#1E1E24]/10 shadow-lg flex items-center space-x-2 transition-all duration-300"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Quick View</span>
          </motion.button>
        </div>

      </div>

      {/* Info details */}
      <div className="flex justify-between items-start pt-1.5 px-1">
        <div className="space-y-1">
          <h3 className="text-sm font-medium tracking-wide text-[#1E1E24] font-serif group-hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          <p className="text-[10px] text-[#71717A] tracking-widest uppercase font-sans">
            {product.category}
          </p>
        </div>
        <p className="text-sm font-semibold text-[#1E1E24] font-sans">
          Rs. {product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
