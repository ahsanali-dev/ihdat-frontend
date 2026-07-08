"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Scissors,
  Mail,
  Phone,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  FileText
} from "lucide-react";
import { customOrderActions } from "@/store/slices/customOrderSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AdminCustomOrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.customOrders);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    dispatch(customOrderActions.fetchCustomOrders());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(customOrderActions.updateCustomOrderStatus({ id, status: newStatus }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this custom order request?")) {
      dispatch(customOrderActions.deleteCustomOrder(id));
    }
  };

  // Pagination
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-light uppercase tracking-wider text-black">
          Bespoke Custom Requests
        </h1>
        <p className="text-xs text-gray-500 tracking-wider">
          Manage handcrafted sizing configurations, view fabric and tilla embroidery requests, and contact clients
        </p>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-gray-200">
        {loading && orders.length === 0 ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-3.5 border-b border-gray-100 last:border-0">
                <div className="space-y-2 w-1/4">
                  <Skeleton height={14} width="80%" />
                  <Skeleton height={10} width="60%" />
                </div>
                <div className="space-y-2 w-1/4">
                  <Skeleton height={12} width="70%" />
                  <Skeleton height={10} width="40%" />
                </div>
                <div className="w-1/4">
                  <Skeleton height={32} width="90%" borderRadius={0} />
                </div>
                <div className="space-y-1 w-1/6">
                  <Skeleton height={10} width="80%" />
                  <Skeleton height={10} width="50%" />
                </div>
                <div className="w-20">
                  <Skeleton height={24} width="100%" borderRadius={0} />
                </div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <Scissors className="h-10 w-10 text-gray-300 mx-auto stroke-[1]" />
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">No bespoke orders found</p>
            <p className="text-xs text-gray-400">Custom orders placed from the tailoring studio will show up here.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {/* Desktop Table View */}
            <div className="hidden xl:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-left text-xs">
                <thead className="bg-gray-50/50">
                  <tr className="text-gray-400 uppercase tracking-widest text-[9px] font-bold border-b border-gray-200/50">
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Design & Fabric</th>
                    <th className="px-6 py-4">Measurements (Inches)</th>
                    <th className="px-6 py-4">Special Instructions</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
                  {paginatedOrders.map((ord) => (
                    <tr key={ord.id || ord._id} className="hover:bg-gray-50/40 transition-colors">
                      {/* Client Info */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-black">{ord.name}</p>
                          <p className="text-[10px] text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" /> {ord.email}
                          </p>
                          <p className="text-[10px] text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1" /> {ord.phone}
                          </p>
                        </div>
                      </td>

                      {/* Selection details */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase tracking-wider bg-[#C5A880]/15 text-black border border-[#C5A880]/30">
                            {ord.targetAudience}
                          </span>
                          <p className="font-medium text-black">Fabric: {ord.fabric}</p>
                          <p className="text-[10px] text-gray-500">Work: {ord.embroidery}</p>
                        </div>
                      </td>

                      {/* Measurements details */}
                      <td className="px-6 py-4">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[10px] bg-zinc-50 p-2.5 border border-zinc-200/50">
                          <div>Chest: <span className="font-bold text-black">{ord.chest}"</span></div>
                          <div>Shoulder: <span className="font-bold text-black">{ord.shoulder}"</span></div>
                          <div>Length: <span className="font-bold text-black">{ord.length}"</span></div>
                          <div>Waist: <span className="font-bold text-black">{ord.waist ? `${ord.waist}"` : "N/A"}</span></div>
                        </div>
                      </td>

                      {/* Photo & instructions */}
                      <td className="px-6 py-4">
                        <div className="space-y-2 max-w-xs">
                          {ord.referencePhoto && (
                            <button
                              onClick={() => setActivePhoto(ord.referencePhoto)}
                              className="inline-flex items-center text-[9px] text-[#C5A880] uppercase tracking-wider font-semibold hover:underline"
                            >
                              <ImageIcon className="h-3.5 w-3.5 mr-1" /> View Suit Reference Photo
                            </button>
                          )}
                          <p className="text-[10px] text-gray-600 line-clamp-2 italic">
                            {ord.specialInstructions ? `"${ord.specialInstructions}"` : "No special instructions provided"}
                          </p>
                        </div>
                      </td>

                      {/* Status select */}
                      <td className="px-6 py-4 text-center">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id || ord._id, e.target.value)}
                          className={`px-3 py-1.5 border text-[9px] font-bold uppercase tracking-wider focus:outline-none rounded-none transition-colors ${
                            ord.status === "Pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : ord.status === "In Discussion"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : ord.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-gray-100 text-gray-500 border-gray-200"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Discussion">In Discussion</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(ord.id || ord._id)}
                          className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                          title="Delete request"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards / Compact Tablet View */}
            <div className="block xl:hidden divide-y divide-gray-100">
              {paginatedOrders.map((ord) => (
                <div key={ord.id || ord._id} className="p-5 space-y-4 bg-white text-left">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-black text-sm">{ord.name}</p>
                      <span className="inline-block px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-[#C5A880]/10 text-[#C5A880]">
                        {ord.targetAudience}
                      </span>
                    </div>
                    
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id || ord._id, e.target.value)}
                      className={`px-2 py-1 border text-[8px] font-bold uppercase tracking-wider focus:outline-none rounded-none ${
                        ord.status === "Pending"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : ord.status === "In Discussion"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : ord.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-gray-100 text-gray-500 border-gray-200"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Body configurations info */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Garment Config</p>
                      <p className="text-black">Fabric: {ord.fabric}</p>
                      <p className="text-gray-500">Work: {ord.embroidery}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Contact Info</p>
                      <p className="text-gray-600 truncate">{ord.email}</p>
                      <p className="text-gray-600 font-semibold">{ord.phone}</p>
                    </div>
                  </div>

                  {/* Measurements grid */}
                  <div className="bg-zinc-50 border border-zinc-200/50 p-3 grid grid-cols-4 gap-2 font-mono text-[10px] text-center">
                    <div>
                      <p className="text-gray-400 uppercase text-[8px]">Chest</p>
                      <p className="font-bold text-black">{ord.chest}"</p>
                    </div>
                    <div>
                      <p className="text-gray-400 uppercase text-[8px]">Shldr</p>
                      <p className="font-bold text-black">{ord.shoulder}"</p>
                    </div>
                    <div>
                      <p className="text-gray-400 uppercase text-[8px]">Length</p>
                      <p className="font-bold text-black">{ord.length}"</p>
                    </div>
                    <div>
                      <p className="text-gray-400 uppercase text-[8px]">Waist</p>
                      <p className="font-bold text-black">{ord.waist ? `${ord.waist}"` : "N/A"}</p>
                    </div>
                  </div>

                  {/* Custom image URL and Notes */}
                  {ord.referencePhoto && (
                    <button
                      onClick={() => setActivePhoto(ord.referencePhoto)}
                      className="inline-flex items-center text-[9px] text-[#C5A880] uppercase tracking-wider font-semibold hover:underline"
                    >
                      <ImageIcon className="h-3.5 w-3.5 mr-1" /> View Reference Photo
                    </button>
                  )}

                  {ord.specialInstructions && (
                    <div className="bg-[#FAF6F0] p-3 border border-[#C5A880]/15 rounded-xs text-[11px] text-zinc-700 italic">
                      "{ord.specialInstructions}"
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDelete(ord.id || ord._id)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50/50 hover:bg-rose-50 border border-rose-200/50 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete Request</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-xs text-gray-500 tracking-wider">
              Showing page <span className="font-semibold text-black">{currentPage}</span> of <span className="font-semibold text-black">{totalPages}</span>
            </span>
            <div className="flex items-center space-x-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-2 border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors flex items-center"
              >
                <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Prev
              </button>
              
              {/* Individual Page Numbers */}
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1.5 border text-[10px] font-bold tracking-wider transition-all ${
                      currentPage === pageNum
                        ? "bg-[#C5A880] text-black border-[#C5A880]"
                        : "border-gray-200 text-black hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors flex items-center"
              >
                Next <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Image Reference Modal Dialog */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setActivePhoto(null)}
            className="absolute inset-0 bg-black/75 backdrop-blur-xs"
          />
          <div className="relative bg-white p-3 shadow-2xl border border-gray-100 max-w-lg w-full z-10 flex flex-col items-center">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#C5A880] transition-colors font-bold uppercase tracking-widest text-xs flex items-center"
            >
              Close <X className="h-5 w-5 ml-1" />
            </button>
            <div className="relative aspect-square w-full bg-zinc-100 overflow-hidden border border-gray-200">
              <img
                src={activePhoto}
                alt="Suit Design Reference Uploaded"
                className="object-contain h-full w-full"
              />
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-3 font-semibold">
              Bespoke Reference Image
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
