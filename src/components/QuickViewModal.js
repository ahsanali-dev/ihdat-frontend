"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quickViewActions } from "@/store/slices/quickViewSlice";
import { cartActions } from "@/store/slices/cartSlice";
import { X, ShoppingBag, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function QuickViewModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.quickView.isOpen);
  const product = useSelector((state) => state.quickView.product);
  const modalRef = useRef(null);

  // Form selections
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorName, setSelectedColorName] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  // Sync state variables when product loads
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedColorName(product.colorNames[0]);
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setAddedNotice(false);
      setActiveImage(product.images?.[0] || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600");
    }
  }, [product]);

  // Click outside to close modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(quickViewActions.closeQuickView());
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  const handleClose = () => {
    dispatch(quickViewActions.closeQuickView());
  };

  const handleColorChange = (color, name, idx) => {
    setSelectedColor(color);
    setSelectedColorName(name);
    // Swap image dynamically if there's a corresponding image, or just keep active
    if (product.images?.[idx]) {
      setActiveImage(product.images[idx]);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      cartActions.addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        color: selectedColor,
        colorName: selectedColorName,
        size: selectedSize,
        quantity: quantity,
        image: activeImage,
      })
    );

    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      dispatch(quickViewActions.closeQuickView());
      dispatch(cartActions.openCart());
    }, 850);
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.1 }}
              className="bg-[#FAF6F0] w-full max-w-4xl shadow-2xl relative grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-[#E4E4E7]/30 rounded-none text-[#1E1E24]"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 z-30 text-[#71717A] hover:text-[#1E1E24] transition-colors rounded-full hover:bg-black/5"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left Column: Visual Gallery */}
              <div className="relative aspect-3/4 md:aspect-auto bg-[#E4E4E7]/40 flex items-center justify-center overflow-hidden border-r border-[#E4E4E7]/20">
                {activeImage ? (
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="animate-pulse bg-gray-200 w-full h-full" />
                )}

                {/* Subtitle tag */}
                <span className="absolute bottom-4 left-4 bg-[#FAF6F0]/90 backdrop-blur-xs text-[9px] font-bold uppercase tracking-widest px-3 py-1 border border-[#1E1E24]/10 shadow-2xs">
                  {product.category}
                </span>
              </div>

              {/* Right Column: Garment Specs Form */}
              <div className="p-8 md:p-10 flex flex-col justify-between space-y-6 max-h-[90vh] overflow-y-auto">
                <div className="space-y-4">
                  {/* Category & Title */}
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                      {product.category}
                    </p>
                    <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wider leading-tight">
                      {product.name}
                    </h2>
                  </div>

                  {/* Price */}
                  <p className="text-xl font-semibold">
                    Rs. {product.price.toLocaleString()}
                  </p>

                  <div className="h-[1px] w-full bg-[#E4E4E7]/60" />

                  {/* Description */}
                  <p className="text-xs text-[#71717A] leading-relaxed tracking-wider">
                    {product.description}
                  </p>
                </div>

                {/* Configuration Options */}
                <div className="space-y-6">
                  {/* Color picker */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider block">
                      Color: <span className="text-[#71717A] font-medium">{selectedColorName}</span>
                    </span>
                    <div className="flex space-x-2">
                      {product.colors.map((color, index) => (
                        <button
                          key={color}
                          onClick={() => handleColorChange(color, product.colorNames[index], index)}
                          className={`h-7 w-7 rounded-full border flex items-center justify-center transition-all ${
                            selectedColor === color
                              ? "border-[#1E1E24] scale-110 shadow-sm"
                              : "border-[#E4E4E7] hover:border-black"
                          }`}
                        >
                          <span className="h-5.5 w-5.5 rounded-full" style={{ backgroundColor: color }} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size selector */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider block">
                      Size:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-10 h-8 px-2 flex items-center justify-center text-xs font-semibold tracking-wider transition-colors ${
                            selectedSize === size
                              ? "bg-[#1E1E24] text-[#FAF6F0] border border-[#1E1E24]"
                              : "bg-white text-[#71717A] border border-[#E4E4E7] hover:border-black hover:text-black"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & CTA add to bag */}
                  <div className="flex gap-4 pt-2">
                    {/* Quantity selectors */}
                    <div className="flex items-center border border-[#E4E4E7] bg-white h-11 shrink-0">
                      <button
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        className="px-3.5 text-[#71717A] hover:text-[#1E1E24] transition-colors font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold w-6 text-center select-none">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="px-3.5 text-[#71717A] hover:text-[#1E1E24] transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Submit CTA */}
                    <button
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      className="flex-grow h-11 bg-[#1E1E24] hover:bg-[#D4AF37] hover:text-black text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>
                        {product.stock === 0
                          ? "Out of Stock"
                          : addedNotice
                          ? "Added!"
                          : "Add to Bag"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-[#E4E4E7]/60" />

                {/* Direct Link to full page details */}
                <div className="text-center">
                  <Link
                    href={`/products/${product.id}`}
                    onClick={handleClose}
                    className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-[#71717A] hover:text-[#D4AF37] transition-colors"
                  >
                    <Info className="h-3.5 w-3.5 mr-1.5" />
                    <span>View Full Garment details</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
