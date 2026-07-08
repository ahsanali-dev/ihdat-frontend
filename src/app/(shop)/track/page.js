"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Search, Package, MapPin, Truck, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import api from "@/utils/api";
import { API_ENDPOINTS } from "@/utils/apiEndpoints";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [foundOrder, setFoundOrder] = useState(null);

  // Retrieve products list from Redux
  const products = useSelector((state) => state.products.products);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setSearchQuery(orderId);
    setSearched(true);
    setLoading(true);
    setError(null);
    setFoundOrder(null);

    try {
      const response = await api.get(`${API_ENDPOINTS.TRACK_ORDER}/${orderId.trim()}`);
      setFoundOrder(response.data.data);
    } catch (err) {
      console.error("Order tracking failed:", err);
      setError(err.response?.data?.message || err.message || "Failed to locate order.");
    } finally {
      setLoading(false);
    }
  };

  // Status mapping to pipeline steps
  const statusSteps = ["Pending", "Processing", "Shipped", "Delivered"];
  const getStepIndex = (status) => statusSteps.indexOf(status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C5A880]">
          Operations Portal
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-light uppercase tracking-wider text-[#111111]">
          Track Your Order
        </h1>
        <div className="h-px w-20 bg-[#C5A880] mx-auto" />
        <p className="text-xs text-[#71717A] tracking-wider max-w-sm mx-auto leading-relaxed">
          Input your Order ID (e.g. ORD-9481) to view live fulfillment updates.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="max-w-md mx-auto bg-white border border-[#E4E4E7]/60 p-6 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="flex gap-x-2">
          <div className="relative flex-1 border border-[#E4E4E7] bg-[#FAF6F0]/20 px-3 py-2.5 flex items-center">
            <Search className="h-4 w-4 text-[#71717A] mr-2" />
            <input
              type="text"
              required
              placeholder="e.g. ORD-9481"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full text-xs text-[#111111] placeholder-[#71717A] bg-transparent focus:outline-none uppercase font-bold"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-[#FAF6F0] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A880] hover:text-black transition-colors"
          >
            Track
          </button>
        </form>
      </div>

      {/* Search results container */}
      <AnimatePresence mode="wait">
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            {loading ? (
              <div className="bg-white border border-[#E4E4E7]/60 p-8 shadow-md space-y-10 text-left">
                {/* Header Skeleton */}
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div className="space-y-2 w-1/3">
                    <Skeleton height={10} width="60%" />
                    <Skeleton height={18} width="80%" />
                  </div>
                  <div className="space-y-1 w-1/4">
                    <Skeleton height={10} />
                    <Skeleton height={10} />
                  </div>
                </div>

                {/* Pipeline Steps Skeletons */}
                <div className="space-y-4 pt-4">
                  <div className="w-1/4"><Skeleton height={12} /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 pt-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex sm:flex-col items-center sm:text-center space-y-2">
                        <Skeleton circle width={36} height={36} />
                        <div className="space-y-1 w-2/3 sm:mx-auto">
                          <Skeleton height={10} />
                          <Skeleton height={8} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items & Shipping skeleton */}
                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <Skeleton height={12} width="20%" />
                  <div className="space-y-2">
                    <Skeleton height={35} count={2} />
                  </div>
                </div>
              </div>
            ) : error || !foundOrder ? (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 flex items-start space-x-3 text-xs leading-relaxed">
                <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold uppercase tracking-wider">No Order Found</h4>
                  <p>
                    {error || `We couldn't find any order matching the ID "${searchQuery}". Please check your receipt spelling and try again.`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#E4E4E7]/60 p-8 shadow-md space-y-10">
                {/* Order Summary Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-[#C5A880] uppercase tracking-wider">Receipt Overview</span>
                    <h3 className="font-serif text-lg font-bold text-black uppercase tracking-wider">
                      {foundOrder.id}
                    </h3>
                  </div>
                  <div className="text-left sm:text-right text-[10px] text-gray-500 tracking-wider">
                    <p>Order Placed: {new Date(foundOrder.createdAt).toLocaleDateString()}</p>
                    <p>Fulfillment Mode: Cash On Delivery</p>
                  </div>
                </div>

                {/* Progress Pipeline */}
                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-black"> Fulfill Status</h4>
                  {foundOrder.status === "Cancelled" ? (
                    <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-sm text-xs flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-rose-600" />
                      <span>This order has been **Cancelled** and will not be shipped.</span>
                    </div>
                  ) : (
                    <div className="relative pt-6 pb-2">
                      {/* Line connector background */}
                      <div className="absolute top-[42px] left-4 right-4 h-1 bg-gray-200 -translate-y-1/2 z-0 hidden sm:block" />
                      
                      {/* Active step loader bar */}
                      <div
                        className="absolute top-[42px] left-4 h-1 bg-[#C5A880] -translate-y-1/2 z-0 transition-all duration-500 hidden sm:block"
                        style={{
                          width: `${(getStepIndex(foundOrder.status) / 3) * 100}%`,
                        }}
                      />

                      {/* Pipeline steps details */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
                        {statusSteps.map((step, idx) => {
                          const stepIdx = getStepIndex(foundOrder.status);
                          const isCompleted = idx <= stepIdx;
                          const isActive = idx === stepIdx;

                          return (
                            <div key={step} className="flex sm:flex-col items-center sm:text-center space-x-3 sm:space-x-0 gap-2">
                              {/* Circle icon indicator */}
                              <div
                                className={`h-9 w-9 rounded-full flex items-center justify-center border transition-all ${
                                  isCompleted
                                    ? "bg-[#C5A880] border-[#C5A880] text-black shadow-md scale-105"
                                    : "bg-white border-gray-200 text-gray-400"
                                }`}
                              >
                                {step === "Pending" && <Clock className="h-4 w-4" />}
                                {step === "Processing" && <Package className="h-4 w-4" />}
                                {step === "Shipped" && <Truck className="h-4 w-4" />}
                                {step === "Delivered" && <CheckCircle2 className="h-4 w-4" />}
                              </div>
                              
                              <div className="space-y-0.5 text-left sm:text-center">
                                <p className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-[#C5A880]" : isCompleted ? "text-black" : "text-gray-400"}`}>
                                  {step}
                                </p>
                                <p className="text-[9px] text-gray-400 font-medium">
                                  {step === "Pending" && "Order Logged"}
                                  {step === "Processing" && "Packing items"}
                                  {step === "Shipped" && "With courier"}
                                  {step === "Delivered" && "Signed details"}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Shipping info grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-6 text-xs leading-relaxed text-[#71717A] tracking-wider">
                  {/* Address */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#111111] uppercase tracking-widest flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-[#C5A880]" /> Shipping Coordinates
                    </h4>
                    <div className="space-y-1">
                      <p className="font-semibold text-black">{foundOrder.customer.name}</p>
                      <p>{foundOrder.customer.address}</p>
                      <p>{foundOrder.customer.city}, {foundOrder.customer.postalCode}</p>
                      <p>Contact: {foundOrder.customer.phone}</p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#111111] uppercase tracking-widest flex items-center">
                      <Package className="h-3.5 w-3.5 mr-1 text-[#C5A880]" /> Cart Summary
                    </h4>
                    <div className="divide-y divide-gray-100">
                      {foundOrder.items.map((item, idx) => {
                        const productObj = products.find(
                          (p) => p.id === item.productId || p.name.toLowerCase() === item.name.toLowerCase()
                        );
                        const itemImage = item.image || (productObj && productObj.images && productObj.images[0] ? productObj.images[0] : "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600");
                        return (
                          <div key={idx} className="py-2.5 flex justify-between items-center gap-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-8 border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 relative">
                                {itemImage ? (
                                  <Image
                                    src={itemImage}
                                    alt={item.name}
                                    fill
                                    sizes="32px"
                                    className="object-cover object-center"
                                  />
                                ) : (
                                  <span className="text-[9px] uppercase font-bold text-gray-400">{item.size}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-black font-serif">{item.name}</p>
                                <p className="text-[10px] text-gray-400">
                                  Qty: {item.quantity} | Size: {item.size} | Color: {item.color}
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-black">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        );
                      })}
                      <div className="pt-2 flex justify-between font-bold text-black border-t border-dashed">
                        <span>Total Due (COD)</span>
                        <span>Rs. {foundOrder.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
