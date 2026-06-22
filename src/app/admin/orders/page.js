"use client";

import { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderActions } from "@/store/slices/orderSlice";
import { ChevronDown, ChevronUp, Package, Clock, X, Info, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminOrdersPage() {
  const orders = useSelector((state) => state.orders.orders);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  // State to track expanded order IDs for details accordion
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  // State for product detail inspection modal
  const [inspectedProduct, setInspectedProduct] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(orderActions.updateOrderStatus({ orderId, status: newStatus }))
      .unwrap()
      .then(() => {
        alert(`Order status updated to ${newStatus} and customer notification email triggered!`);
      })
      .catch((err) => {
        console.error("Failed to update status:", err);
        alert(err || "Failed to update order status. Please verify permissions.");
      });
  };


  const handleProductClick = (item) => {
    // Find product in catalog by ID or Name
    const foundProduct = products.find(
      (p) => p.id === item.productId || p.name.toLowerCase() === item.name.toLowerCase()
    );
    if (foundProduct) {
      setInspectedProduct(foundProduct);
    } else {
      // Fallback custom temp object if not found in current list
      setInspectedProduct({
        name: item.name,
        price: item.price,
        category: "Garments",
        description: "Standard item details. This item might have been customized or modified.",
        colors: [item.color],
        colorNames: [item.color],
        sizes: [item.size],
        images: ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600"],
        stock: "N/A",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-serif font-light uppercase tracking-wider text-black">
          Order Operations
        </h1>
        <p className="text-xs text-gray-500 tracking-wider">
          Track customer shipments, process incoming purchases, or modify order status. Click product names to view specs.
        </p>
      </div>

      {/* Mobile Responsive Grid List (Hidden on Desktop) */}
      <div className="block md:hidden space-y-4">
        {paginatedOrders.map((ord) => {
          const isExpanded = expandedOrderId === ord.id;
          const totalItemsCount = ord.items.reduce((sum, item) => sum + item.quantity, 0);

          return (
            <div key={ord.id} className="bg-white border border-gray-200 p-5 shadow-xs space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-black text-sm">{ord.id}</p>
                  <p className="text-[10px] text-gray-400">
                    {new Date(ord.createdAt).toLocaleDateString()} at{" "}
                    {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <select
                  value={ord.status}
                  onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                  className={`text-[10px] font-bold px-2 py-1 rounded-sm border focus:outline-none bg-white ${
                    ord.status === "Delivered"
                      ? "text-emerald-700 border-emerald-200 bg-emerald-50"
                      : ord.status === "Pending"
                      ? "text-amber-700 border-amber-200 bg-amber-50"
                      : ord.status === "Cancelled"
                      ? "text-rose-700 border-rose-200 bg-rose-50"
                      : "text-blue-700 border-blue-200 bg-blue-50"
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[10px] tracking-wide text-gray-600 pt-3 border-t border-gray-100 bg-gray-50/50 p-2.5">
                <div>
                  <span className="font-bold uppercase text-[8px] block tracking-widest text-gray-400">Customer</span>
                  <span className="font-semibold text-gray-800">{ord.customer.name}</span>
                </div>
                <div>
                  <span className="font-bold uppercase text-[8px] block tracking-widest text-gray-400">Charged Amount</span>
                  <span className="font-bold text-black">Rs. {ord.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[10px] text-gray-500 font-semibold">{totalItemsCount} items ordered</span>
                <button
                  onClick={() => toggleExpand(ord.id)}
                  className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-[#C5A880] hover:text-black transition-colors"
                >
                  {isExpanded ? "Hide Details" : "Show Details"}
                </button>
              </div>

              {/* Mobile Expanded Details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-dashed border-gray-200 space-y-4 text-xs">
                  {/* Address info */}
                  <div className="space-y-1 text-gray-600 bg-gray-50 p-3 border border-gray-100 tracking-wide">
                    <p><span className="font-bold text-gray-800">Address:</span> {ord.customer.address}</p>
                    <p><span className="font-bold text-gray-800">City:</span> {ord.customer.city}, {ord.customer.postalCode}</p>
                    <p><span className="font-bold text-gray-800">Phone:</span> {ord.customer.phone}</p>
                  </div>

                  {/* Items list */}
                  <div className="space-y-2">
                    <span className="font-bold uppercase text-[9px] block tracking-widest text-gray-400">Purchased Items</span>
                    <div className="divide-y divide-gray-105">
                      {ord.items.map((item, idx) => {
                        const productObj = products.find(
                          (p) => p.id === item.productId || p.name.toLowerCase() === item.name.toLowerCase()
                        );
                        const itemImage = item.image || (productObj && productObj.images && productObj.images[0] ? productObj.images[0] : "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600");

                        return (
                          <div key={idx} className="py-2.5 flex justify-between items-center text-gray-600 tracking-wider">
                            <div className="flex items-center space-x-2">
                              <div className="h-10 w-8 border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 relative shadow-3xs">
                                {itemImage ? (
                                  <img
                                    src={itemImage}
                                    alt={item.name}
                                    className="absolute inset-0 h-full w-full object-cover object-center"
                                  />
                                ) : (
                                  <span className="text-[9px] uppercase font-bold text-gray-400">{item.size}</span>
                                )}
                              </div>
                              <div>
                                <button
                                  onClick={() => handleProductClick(item)}
                                  className="font-bold text-left text-black font-serif hover:text-[#C5A880] transition-colors underline decoration-dotted decoration-gray-400"
                                >
                                  {item.name}
                                </button>
                                <p className="text-[9px] text-gray-400">Size: {item.size} | Color: {item.color}</p>
                              </div>
                            </div>
                            <div className="text-right text-[10px]">
                              <p className="font-bold text-black">Rs. {item.price.toLocaleString()} x {item.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Orders Table Layout (Hidden on Mobile) */}
      <div className="hidden md:block bg-white border border-gray-200 shadow-xs overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-left text-xs">
          <thead className="bg-gray-50">
            <tr className="text-gray-400 uppercase tracking-widest text-[9px] font-bold">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer Name</th>
              <th className="px-6 py-4">Purchase Date</th>
              <th className="px-6 py-4 text-center">Items Qty</th>
              <th className="px-6 py-4 text-right">Charged Amount</th>
              <th className="px-6 py-4 text-center">Order Status</th>
              <th className="px-6 py-4 text-center">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
            {paginatedOrders.map((ord) => {
              const isExpanded = expandedOrderId === ord.id;
              const totalItemsCount = ord.items.reduce((sum, item) => sum + item.quantity, 0);

              return (
                <Fragment key={ord.id}>
                  {/* Summary Row */}
                  <tr className="hover:bg-gray-50/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-black">{ord.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-black">{ord.customer.name}</p>
                        <p className="text-[10px] text-gray-400">{ord.customer.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(ord.createdAt).toLocaleDateString()} at{" "}
                      {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-600">
                      {totalItemsCount}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-black">Rs. {ord.totalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-sm border focus:outline-none bg-white ${
                          ord.status === "Delivered"
                            ? "text-emerald-700 border-emerald-200 bg-emerald-50"
                            : ord.status === "Pending"
                            ? "text-amber-700 border-amber-200 bg-amber-50"
                            : ord.status === "Cancelled"
                            ? "text-rose-700 border-rose-200 bg-rose-50"
                            : "text-blue-700 border-blue-200 bg-blue-50"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleExpand(ord.id)}
                        className="text-gray-400 hover:text-black p-1 transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Items Details Accordion Row */}
                  {isExpanded && (
                    <tr className="bg-gray-50/50">
                      <td colSpan="7" className="px-8 py-6 border-b border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                          {/* Shipping Details */}
                          <div className="space-y-3">
                            <h4 className="font-bold uppercase tracking-widest text-[#111111] flex items-center">
                              <Package className="h-3.5 w-3.5 mr-1 text-[#C5A880]" /> Shipping & Contact Info
                            </h4>
                            <div className="space-y-1.5 text-gray-600 tracking-wider">
                              <p><span className="font-bold text-gray-800">Address:</span> {ord.customer.address}</p>
                              <p><span className="font-bold text-gray-800">City:</span> {ord.customer.city}, {ord.customer.postalCode}</p>
                              <p><span className="font-bold text-gray-800">Phone:</span> {ord.customer.phone}</p>
                            </div>
                          </div>

                          {/* Items Details List */}
                          <div className="space-y-3">
                            <h4 className="font-bold uppercase tracking-widest text-[#111111] flex items-center">
                              <Package className="h-3.5 w-3.5 mr-1 text-[#C5A880]" /> Garments Purchased (Click name to view details)
                            </h4>
                            <div className="divide-y divide-gray-200">
                              {ord.items.map((item, idx) => {
                                const productObj = products.find(
                                  (p) => p.id === item.productId || p.name.toLowerCase() === item.name.toLowerCase()
                                );
                                const itemImage = item.image || (productObj && productObj.images && productObj.images[0] ? productObj.images[0] : "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600");
                                
                                return (
                                  <div key={idx} className="py-2.5 flex justify-between items-center text-gray-600 tracking-wider gap-4">
                                    <div className="flex items-center space-x-3">
                                      {/* Order row thumbnail */}
                                      <div className="h-10 w-8 border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 relative shadow-2xs">
                                        {itemImage ? (
                                          <img
                                            src={itemImage}
                                            alt={item.name}
                                            className="absolute inset-0 h-full w-full object-cover object-center"
                                          />
                                        ) : (
                                          <span className="text-[9px] uppercase font-bold text-gray-400">{item.size}</span>
                                        )}
                                      </div>
                                      <div>
                                        <button
                                          onClick={() => handleProductClick(item)}
                                          className="font-bold text-left text-black font-serif hover:text-[#C5A880] transition-colors underline decoration-dotted decoration-gray-400"
                                          title="Inspect product"
                                        >
                                          {item.name}
                                        </button>
                                        <p className="text-[10px] text-gray-400 mt-0.5">
                                          Size: {item.size} | Color: {item.color || "Default"}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold text-black">Rs. {item.price.toLocaleString()} x {item.quantity}</p>
                                      <p className="text-[10px] text-gray-400">Subtotal: Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="relative ml-3 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-gray-700">
                Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-semibold">{Math.min(currentPage * itemsPerPage, orders.length)}</span> of{" "}
                <span className="font-semibold">{orders.length}</span> orders logged
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px bg-white" aria-label="Pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 text-xs font-semibold ${
                        isActive
                          ? "z-10 bg-black text-white"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Product Inspection Popup Modal */}
      <AnimatePresence>
        {inspectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectedProduct(null)}
              className="absolute inset-0 bg-black cursor-pointer"
            />

            {/* Content box - wider grid layout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative bg-white max-w-2xl w-full p-6 shadow-2xl flex flex-col border border-gray-200 z-10"
            >
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#C5A880]">
                    {inspectedProduct.category} Catalog Inspection
                  </span>
                  <h3 className="font-serif text-lg font-bold uppercase tracking-wide text-black mt-0.5">
                    {inspectedProduct.name}
                  </h3>
                </div>
                <button
                  onClick={() => setInspectedProduct(null)}
                  className="p-1 text-gray-400 hover:text-black rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body details with image split grid */}
              <div className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-6">
                {/* Left: Product Image */}
                <div className="sm:col-span-5 bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden aspect-[3/4] relative shadow-2xs">
                  {inspectedProduct.images && inspectedProduct.images[0] ? (
                    <img
                      src={inspectedProduct.images[0]}
                      alt={inspectedProduct.name}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">No Image</span>
                  )}
                </div>

                {/* Right: Product specs */}
                <div className="sm:col-span-7 space-y-4 text-xs">
                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 border border-gray-100">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold">Catalog Price</span>
                      <p className="font-bold text-black text-sm">Rs. {inspectedProduct.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold">Stock Level</span>
                      <p className="font-bold text-black text-sm">{inspectedProduct.stock}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Description</span>
                    <p className="text-gray-600 leading-relaxed tracking-wider">{inspectedProduct.description}</p>
                  </div>

                  {/* Sizes available */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Catalog Sizes</span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {inspectedProduct.sizes.map((sz) => (
                        <span key={sz} className="bg-gray-100 px-2 py-0.5 font-semibold text-gray-600 rounded-sm">
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Colors available */}
                  {inspectedProduct.colors && inspectedProduct.colors.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 uppercase font-semibold">Catalog Colors</span>
                      <div className="flex flex-wrap gap-2 items-center pt-0.5">
                        {inspectedProduct.colors.map((color, index) => (
                          <div key={color} className="flex items-center space-x-1 border border-gray-100 p-1 bg-gray-50/50 rounded-sm">
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-gray-200 block shadow-xs"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-[9px] text-gray-500 font-bold uppercase">
                              {inspectedProduct.colorNames ? inspectedProduct.colorNames[index] : "Default"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setInspectedProduct(null)}
                  className="px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#C5A880] hover:text-black transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
