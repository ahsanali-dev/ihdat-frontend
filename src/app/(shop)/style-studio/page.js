"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShoppingBag, Check, Scissors, Eye, RefreshCw } from "lucide-react";

const BASE_SUIT_COLORS = [
  { name: "Midnight Black", hex: "#1E1E24", border: "border-gray-700", text: "text-white" },
  { name: "Antique Ivory", hex: "#FAF6F0", border: "border-[#C5A880]", text: "text-black" },
  { name: "Royal Maroon", hex: "#581825", border: "border-rose-900", text: "text-white" },
  { name: "Peacock Teal", hex: "#0B3C49", border: "border-teal-800", text: "text-white" },
  { name: "Emerald Green", hex: "#1B4D3E", border: "border-emerald-800", text: "text-white" },
  { name: "Mustard Gold", hex: "#D4AF37", border: "border-amber-600", text: "text-black" },
];

export default function StyleStudioPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const kotiProducts = products.filter((p) => p.category === "Women's Kotis" || p.category === "Custom Jackets");

  const [selectedSuit, setSelectedSuit] = useState(BASE_SUIT_COLORS[0]);
  const [selectedKoti, setSelectedKoti] = useState(kotiProducts[0] || products[0]);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState("layered"); // 'layered' or 'kotiOnly'

  const activeKoti = selectedKoti || products[0];

  const handleAddComboToCart = () => {
    if (!activeKoti) return;
    dispatch(
      cartActions.addToCart({
        id: activeKoti.id,
        name: `${activeKoti.name} (Paired with ${selectedSuit.name} Suit)`,
        price: activeKoti.price,
        color: selectedSuit.hex,
        colorName: `${selectedSuit.name} Base`,
        size: activeKoti.sizes?.[0] || "M",
        quantity: 1,
        image: activeKoti.images?.[0] || "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600"
      })
    );

    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      dispatch(cartActions.openCart());
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A880] flex items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" /> Interactive Styling Studio
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light uppercase tracking-widest text-[#1E1E24]">
            Koti Layering Canvas
          </h1>
          <div className="h-[1px] w-24 bg-[#C5A880] mx-auto mt-2" />
          <p className="text-xs text-[#71717A] leading-relaxed tracking-wider">
            Select your inner suit base color and try on handcrafted kotis & waistcoats in real-time to preview your festive ensemble.
          </p>
        </div>

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Canvas Visual */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] bg-white border border-[#E4E4E7] shadow-xl overflow-hidden flex flex-col justify-between">
              
              {/* Suit Base Backdrop Layer with Color Fill & Texture */}
              <motion.div
                key={selectedSuit.hex}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-0 flex flex-col items-center justify-between p-6"
                style={{ backgroundColor: selectedSuit.hex }}
              >
                {/* Subtle Luxury Pattern Lines */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              </motion.div>

              {/* Header Badge Overlay */}
              <div className="relative z-30 flex items-center justify-between p-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C5A880] bg-black/80 backdrop-blur-md px-3 py-1 border border-[#C5A880]/40 w-fit">
                    Base Suit: {selectedSuit.name}
                  </span>
                  <span className="text-[8px] uppercase tracking-widest text-white/80 bg-black/60 px-2 py-0.5 w-fit">
                    Color Hex: {selectedSuit.hex}
                  </span>
                </div>

                {/* View Switcher Tabs */}
                <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-md p-1 border border-white/20">
                  <button
                    onClick={() => setActiveTab("layered")}
                    className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider transition-all ${
                      activeTab === "layered" ? "bg-[#C5A880] text-black" : "text-white/70 hover:text-white"
                    }`}
                  >
                    Layered Canvas
                  </button>
                  <button
                    onClick={() => setActiveTab("kotiOnly")}
                    className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider transition-all ${
                      activeTab === "kotiOnly" ? "bg-[#C5A880] text-black" : "text-white/70 hover:text-white"
                    }`}
                  >
                    Garment Detail
                  </button>
                </div>
              </div>

              {/* Center Koti Garment Showcase Layer */}
              <div className="relative flex-1 z-10 flex items-center justify-center p-6">
                <AnimatePresence mode="wait">
                  {activeKoti && (
                    <motion.div
                      key={`${activeKoti.id}-${selectedSuit.hex}-${activeTab}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`relative w-full h-full flex items-center justify-center ${
                        activeTab === "layered" ? "p-4" : "p-0"
                      }`}
                    >
                      {/* Photo Image Container */}
                      <div className="relative w-full h-full max-w-md max-h-[85%] border border-white/30 shadow-2xl overflow-hidden group">
                        <Image
                          src={activeKoti.images?.[0] || "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800"}
                          alt={activeKoti.name}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-center"
                        />
                        {/* Inner Color Tint Border Frame simulating suit collar layering */}
                        <div
                          className="absolute inset-0 border-[12px] pointer-events-none transition-colors duration-500"
                          style={{ borderColor: selectedSuit.hex }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Live Palette Bar */}
              <div className="relative z-30 bg-black/85 backdrop-blur-md p-4 border-t border-white/15 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div
                    className="h-7 w-7 rounded-none border-2 border-white shadow-xs shrink-0"
                    style={{ backgroundColor: selectedSuit.hex }}
                  />
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#C5A880] font-bold">Base Suit Selected</p>
                    <p className="text-xs font-semibold text-white">{selectedSuit.name}</p>
                  </div>
                </div>

                <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-widest text-gray-400">Layered Koti Garment</p>
                  <p className="text-xs font-serif text-[#FAF6F0] font-semibold">{activeKoti?.name}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-5 bg-white p-8 border border-[#E4E4E7] shadow-sm space-y-8">
            {/* Step 1: Select Inner Suit Base Color */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#1E1E24] flex items-center gap-1.5">
                  <span className="h-4 w-4 rounded-full bg-[#C5A880] text-black flex items-center justify-center text-[8px]">1</span>
                  Select Inner Suit Base Color
                </label>
                <span className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wider border border-[#C5A880]/30 px-2 py-0.5 bg-[#FAF6F0]">
                  {selectedSuit.name}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {BASE_SUIT_COLORS.map((suit) => {
                  const isSelected = selectedSuit.name === suit.name;
                  return (
                    <button
                      key={suit.name}
                      type="button"
                      onClick={() => setSelectedSuit(suit)}
                      title={suit.name}
                      className={`h-12 w-full border transition-all flex flex-col items-center justify-center cursor-pointer relative ${
                        isSelected
                          ? "ring-2 ring-[#C5A880] ring-offset-2 scale-105 shadow-md"
                          : "opacity-85 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: suit.hex }}
                    >
                      {isSelected && (
                        <Check className={`h-5 w-5 ${suit.hex === "#FAF6F0" ? "text-black" : "text-white"}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-[1px] w-full bg-gray-100" />

            {/* Step 2: Select Koti Design */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#1E1E24] flex items-center gap-1.5">
                  <span className="h-4 w-4 rounded-full bg-[#C5A880] text-black flex items-center justify-center text-[8px]">2</span>
                  Select Koti / Waistcoat Design
                </label>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {kotiProducts.map((koti) => (
                  <div
                    key={koti.id}
                    onClick={() => setSelectedKoti(koti)}
                    className={`p-3 border flex items-center space-x-4 cursor-pointer transition-all ${
                      activeKoti?.id === koti.id
                        ? "border-[#1E1E24] bg-[#FAF6F0] ring-1 ring-[#1E1E24]"
                        : "border-gray-200 hover:border-gray-400 bg-white"
                    }`}
                  >
                    <div className="h-14 w-12 relative shrink-0 bg-gray-100 overflow-hidden border">
                      <Image
                        src={koti.images?.[0] || "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600"}
                        alt={koti.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h4 className="font-serif text-sm font-semibold text-[#1E1E24] truncate">{koti.name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">{koti.category}</p>
                      <p className="text-xs font-bold text-[#C5A880]">Rs. {koti.price.toLocaleString()}</p>
                    </div>
                    {activeKoti?.id === koti.id && (
                      <Check className="h-5 w-5 text-[#1E1E24] shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[1px] w-full bg-gray-100" />

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAddComboToCart}
                className="w-full py-4 bg-[#1E1E24] hover:bg-[#C5A880] hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-md"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>{addedNotice ? "Added Layered Combo!" : "Add Layered Combo to Cart"}</span>
              </button>

              <Link
                href={`/custom-order?product=${activeKoti?.id || ""}`}
                className="w-full py-3.5 border border-[#1E1E24] hover:bg-[#1E1E24] hover:text-white text-[#1E1E24] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
              >
                <Scissors className="h-4 w-4" />
                <span>Order Custom Fit For My Suit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
