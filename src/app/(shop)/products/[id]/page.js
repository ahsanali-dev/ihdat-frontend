"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";
import { ArrowLeft, ShoppingBag, Truck, RotateCcw, AlertTriangle, Play } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Swiper slider imports
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/free-mode";
import ReviewsSection from "@/components/ReviewsSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const dispatch = useDispatch();

  // Find the active product from Redux
  const { products, loading } = useSelector((state) => state.products);
  const product = products.find((p) => p.id === productId);

  // States
  const [selectedColor, setSelectedColor] = useState(product ? product.colors[0] : "");
  const [selectedColorName, setSelectedColorName] = useState(product ? product.colorNames[0] : "");
  const [selectedSize, setSelectedSize] = useState(product ? product.sizes[0] : "");
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeImage, setActiveImage] = useState(
    product && product.images && product.images[0]
      ? product.images[0]
      : "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600"
  );
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (product && product.images && product.images[0]) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  if (!isMounted || loading || !product) {
    if (isMounted && !loading && !product) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-[#7D1D2B] mx-auto" />
          <h2 className="text-xl font-semibold uppercase tracking-wider">Product Not Found</h2>
          <p className="text-xs text-[#71717A]">The garment you are looking for does not exist or has been removed.</p>
          <Link
            href="/products"
            className="inline-block px-6 py-2 border border-[#111111] text-xs font-semibold uppercase tracking-widest text-white bg-[#111111] hover:bg-transparent hover:text-[#111111] transition-all"
          >
            Return to Catalog
          </Link>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12 text-left">
        <div>
          <div className="w-32"><Skeleton height={14} /></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side: Images Skeleton */}
          <div className="space-y-4">
            <div className="aspect-[3/4] w-full bg-zinc-100 animate-pulse border border-zinc-200/50 rounded-xs">
              <Skeleton height="100%" borderRadius={0} />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-zinc-100 animate-pulse border border-zinc-200/50 rounded-xs">
                  <Skeleton height="100%" borderRadius={0} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Details Skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="w-1/4"><Skeleton height={12} /></div>
              <div className="w-3/4"><Skeleton height={24} /></div>
              <div className="w-1/3"><Skeleton height={18} /></div>
            </div>
            <div className="h-[1px] bg-gray-200" />
            <div className="space-y-3">
              <Skeleton count={4} height={12} />
            </div>
            <div className="space-y-2 pt-4">
              <div className="w-1/4"><Skeleton height={10} /></div>
              <div className="flex space-x-2">
                <Skeleton circle width={32} height={32} />
                <Skeleton circle width={32} height={32} />
              </div>
            </div>
            <div className="space-y-2 pt-4">
              <div className="w-1/4"><Skeleton height={10} /></div>
              <div className="flex space-x-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} width={40} height={32} />
                ))}
              </div>
            </div>
            <div className="pt-6">
              <Skeleton width="50%" height={40} borderRadius={0} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleColorChange = (color, name) => {
    setSelectedColor(color);
    setSelectedColorName(name);
  };

  const handleAddToCart = () => {
    // Dispatch add to cart
    dispatch(
      cartActions.addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        color: selectedColor,
        colorName: selectedColorName,
        size: selectedSize,
        quantity: quantity,
        image: product.images?.[0] || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600"
      })
    );

    // Show temporary notice and auto open slide cart drawer
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      dispatch(cartActions.openCart());
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Back Button */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#71717A] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Catalog
        </Link>
      </div>

      {/* Main product view grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Product Gallery Visual with Hover Zoom & Swiper Slider */}
        <div className="space-y-6">
          {/* Main Visual Box with Zoom-on-Hover */}
          <div
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
            className="relative aspect-[3/4] bg-[#E4E4E7]/40 flex items-center justify-center border border-[#E4E4E7]/50 shadow-xs overflow-hidden cursor-zoom-in z-0"
          >
            {activeImage === product.video ? (
              <video
                key={activeImage}
                src={activeImage}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ) : (
              <Image
                src={activeImage}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZooming ? "scale(2.2)" : "scale(1)",
                }}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-100 ease-out"
              />
            )}

            {/* Decorative layout swatches */}
            <div className="absolute bottom-6 right-6 flex items-center space-x-2 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-black/5 shadow-xs z-10">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: selectedColor }} />
              <span className="text-[9px] uppercase font-bold tracking-wider text-black">{selectedColorName}</span>
            </div>
          </div>

          {/* Swiper Slider thumbnails */}
          {(() => {
            const mediaList = product.images ? [...product.images] : [];
            if (product.video && !mediaList.includes(product.video)) {
              mediaList.push(product.video);
            }

            if (mediaList.length <= 1) return null;

            return (
              <div className="w-full overflow-hidden">
                {isMounted ? (
                  <Swiper
                    spaceBetween={8}
                    slidesPerView={4}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="mySwiper select-none"
                  >
                    {mediaList.map((mediaUrl, index) => {
                      const isVideo = mediaUrl === product.video;
                      return (
                        <SwiperSlide key={index}>
                          <button
                            type="button"
                            onClick={() => setActiveImage(mediaUrl)}
                            className={`relative aspect-3/4 w-full overflow-hidden border bg-white flex items-center justify-center transition-all ${
                              activeImage === mediaUrl
                                ? "border-[#1E1E24] shadow-xs ring-1 ring-[#1E1E24]"
                                : "border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            {isVideo ? (
                              <div className="relative w-full h-full flex items-center justify-center bg-black">
                                <Image
                                  src={product.images?.[0] || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600"}
                                  alt="Video Thumbnail"
                                  fill
                                  sizes="(max-width: 768px) 25vw, 15vw"
                                  className="object-cover object-center brightness-70"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Play className="h-6 w-6 text-white fill-white opacity-85" />
                                </div>
                              </div>
                            ) : (
                              <Image
                                src={mediaUrl}
                                alt={`${product.name} preview ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 25vw, 15vw"
                                className="object-cover object-center"
                              />
                            )}
                          </button>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                ) : (
                  /* Static SSR fallback row */
                  <div className="flex gap-2 overflow-x-auto pb-1 select-none">
                    {mediaList.map((mediaUrl, index) => {
                      const isVideo = mediaUrl === product.video;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setActiveImage(mediaUrl)}
                          className={`relative aspect-3/4 w-20 shrink-0 overflow-hidden border bg-white flex items-center justify-center transition-all ${
                            activeImage === mediaUrl
                              ? "border-[#1E1E24] shadow-xs ring-1 ring-[#1E1E24]"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {isVideo ? (
                            <div className="relative w-full h-full flex items-center justify-center bg-black">
                              <Image
                                src={product.images?.[0] || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600"}
                                alt="Video Thumbnail"
                                fill
                                sizes="80px"
                                className="object-cover object-center brightness-70"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="h-4 w-4 text-white fill-white opacity-85" />
                              </div>
                            </div>
                          ) : (
                            <Image
                              src={mediaUrl}
                              alt={`${product.name} preview ${index + 1}`}
                              fill
                              sizes="80px"
                              className="object-cover object-center"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Right Side: Product Details & Purchase Setup */}
        <div className="flex flex-col justify-between space-y-8">
          {/* Header Info */}
          <div className="space-y-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C5A880]">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-light uppercase tracking-wider text-[#111111]">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-[#111111]">Rs. {product.price.toLocaleString()}</p>
            <div className="h-px w-full bg-[#E4E4E7]/50" />
            <p className="text-xs text-[#71717A] tracking-wider leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Configuration form */}
          <div className="space-y-6">
            {/* Color Swatch Selectors */}
            <div className="space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#111111] block">
                Select Color: <span className="text-[#71717A] font-medium">{selectedColorName}</span>
              </span>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color, product.colorNames[index])}
                    className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all ${
                      selectedColor === color
                        ? "border-[#111111] scale-110 shadow-md"
                        : "border-[#E4E4E7] hover:border-black"
                    }`}
                  >
                    <span className="h-6.5 w-6.5 rounded-full shadow-inner" style={{ backgroundColor: color }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selectors */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center max-w-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                  Select Size:
                </span>
                <Link href="/size-guide" className="text-[10px] uppercase font-bold text-[#C5A880] tracking-wider hover:underline">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 h-10 px-3 flex items-center justify-center text-xs font-semibold tracking-wider transition-colors ${
                      selectedSize === size
                        ? "bg-[#111111] text-[#FAF6F0] border border-[#111111]"
                        : "bg-white text-[#71717A] border border-[#E4E4E7] hover:border-black hover:text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add Button */}
            <div className="flex items-center space-x-4 max-w-sm pt-2">
              <div className="flex items-center border border-[#E4E4E7] bg-white h-12">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 text-[#71717A] hover:text-[#111111] transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-xs font-semibold text-[#111111] w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-4 py-2 text-[#71717A] hover:text-[#111111] transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 h-12 bg-[#111111] hover:bg-[#C5A880] hover:text-black text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>{product.stock === 0 ? "Out of Stock" : addedNotice ? "Added!" : "Add to Cart"}</span>
              </button>
            </div>
          </div>

          <div className="h-px w-full bg-[#E4E4E7]/50" />

          {/* Delivery Benefits highlights */}
          <div className="space-y-4 text-xs tracking-wider text-[#71717A]">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-[#C5A880] stroke-[1.5]" />
              <p>Free Standard Delivery on orders over Rs. 10,000. Dispatch in 24-48 hours.</p>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-5 w-5 text-[#C5A880] stroke-[1.5]" />
              <p>Complimentary returns within 14 days of purchase. Size exchanges free.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewsSection productId={product.id} productName={product.name} />

      {/* Sticky Mobile Add to Cart Drawer */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF6F0] border-t border-[#E4E4E7] p-4 shadow-xl flex items-center justify-between md:hidden text-[#1E1E24]"
          >
            <div className="flex items-center space-x-3">
              <div className="relative h-12 w-9 bg-gray-100 overflow-hidden shrink-0 border border-[#E4E4E7]">
                <Image
                  src={product.images?.[0] || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="max-w-[120px]">
                <h4 className="text-[11px] font-serif font-bold truncate">{product.name}</h4>
                <p className="text-[10px] font-semibold text-[#D4AF37]">Rs. {product.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Sizing dropdown */}
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-white border border-[#E4E4E7] px-2 py-1.5 text-[10px] font-semibold focus:outline-none"
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="bg-[#1E1E24] hover:bg-[#D4AF37] hover:text-black text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-2.5 transition-colors flex items-center space-x-1"
              >
                <ShoppingBag className="h-3 w-3" />
                <span>{product.stock === 0 ? "Out" : addedNotice ? "Added!" : "Add"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
