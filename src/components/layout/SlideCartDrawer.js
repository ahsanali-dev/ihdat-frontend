"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SlideCartDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.cart.isOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const products = useSelector((state) => state.products.products);
  const drawerRef = useRef(null);

  // Close cart drawer when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        dispatch(cartActions.closeCart());
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  const handleClose = () => dispatch(cartActions.closeCart());
  const handleRemove = (id, color, size) => dispatch(cartActions.removeFromCart({ id, color, size }));
  const handleQtyChange = (id, color, size, currentQty, amount) => {
    const newQty = currentQty + amount;
    if (newQty <= 0) {
      dispatch(cartActions.removeFromCart({ id, color, size }));
    } else {
      dispatch(cartActions.updateQuantity({ id, color, size, quantity: newQty }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black cursor-pointer"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 z-50 flex max-w-full pl-10">
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
              className="w-screen max-w-md bg-[#FAF6F0] shadow-2xl flex flex-col h-full border-l border-[#E4E4E7]/30"
            >
              {/* Header */}
              <div className="px-6 py-6 border-b border-[#E4E4E7]/50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-[#111111]" />
                  <h2 className="text-lg font-serif font-light uppercase tracking-widest text-[#111111]">
                    Your Cart
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-[#71717A] hover:text-[#111111] transition-colors rounded-full hover:bg-[#E4E4E7]/30"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <ShoppingBag className="h-12 w-12 text-[#71717A]/40 stroke-1" />
                    <p className="text-sm text-[#71717A] uppercase tracking-wider font-medium">
                      Your cart is empty
                    </p>
                    <Link
                      href="/products"
                      onClick={handleClose}
                      className="px-6 py-2 border border-[#111111] text-xs font-semibold uppercase tracking-widest text-white bg-[#111111] hover:bg-transparent hover:text-[#111111] transition-all inline-block"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const productObj = products.find((p) => p.id === item.id);
                    const itemImage = item.image || (productObj && productObj.images && productObj.images[0] ? productObj.images[0] : "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600");
                    
                    return (
                      <div
                        key={`${item.id}-${item.color}-${item.size}`}
                        className="flex space-x-4 border-b border-[#E4E4E7]/30 pb-6"
                      >
                        {/* Product Visual Representative */}
                        <div className="h-24 w-18 shrink-0 bg-[#E4E4E7]/50 relative flex items-center justify-center border border-[#E4E4E7] overflow-hidden">
                          {itemImage ? (
                            <Image
                              src={itemImage}
                              alt={item.name}
                              fill
                              sizes="72px"
                              className="object-cover object-center"
                            />
                          ) : (
                            <div
                              className="h-10 w-10 rounded-full shadow-inner border border-white/20"
                              style={{
                                backgroundColor:
                                  item.color.startsWith("#") ? item.color : "#111",
                              }}
                            />
                          )}
                          <span className="absolute bottom-1 right-1 text-[8px] bg-white px-1 font-bold text-[#111111] rounded shadow-xs uppercase z-10">
                            {item.size}
                          </span>
                        </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-[#111111]">
                            <h3 className="font-serif tracking-wide">{item.name}</h3>
                            <p className="font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                          <p className="mt-1 text-xs text-[#71717A] tracking-wider uppercase">
                            Color: {item.colorName || "Selected"}
                          </p>
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center justify-between">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-[#E4E4E7] rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() => handleQtyChange(item.id, item.color, item.size, item.quantity, -1)}
                              className="px-2 py-1 text-[#71717A] hover:text-[#111111] transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-[#111111]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQtyChange(item.id, item.color, item.size, item.quantity, 1)}
                              className="px-2 py-1 text-[#71717A] hover:text-[#111111] transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleRemove(item.id, item.color, item.size)}
                            className="text-[#71717A] hover:text-[#7D1D2B] transition-colors p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    );
                  })
                )}
              </div>

              {/* Footer Summary */}
              {cartItems.length > 0 && (
                <div className="border-t border-[#E4E4E7]/50 px-6 py-6 bg-[#FAF6F0] space-y-4">
                  <div className="flex justify-between text-sm font-medium text-[#111111]">
                    <span className="uppercase tracking-widest">Subtotal</span>
                    <span className="text-lg font-bold">Rs. {totalAmount.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-[#71717A] tracking-wider leading-relaxed">
                    Shipping, taxes, and discounts calculated at checkout. Free shipping on orders over Rs. 10,000.
                  </p>
                  <div className="space-y-2">
                    <Link
                      href="/checkout"
                      onClick={handleClose}
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-xs font-semibold uppercase tracking-widest text-white bg-[#111111] hover:bg-[#C5A880] hover:text-black transition-colors rounded-lg"
                    >
                      Checkout
                    </Link>
                    <Link
                      href="/products"
                      onClick={handleClose}
                      className="w-full flex items-center justify-center px-6 py-2 border border-[#E4E4E7] text-xs font-semibold uppercase tracking-widest text-[#111111] bg-white hover:bg-[#E4E4E7]/30 transition-colors rounded-lg"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
