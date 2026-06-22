"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { User, Shield, Calendar, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const orders = useSelector((state) => state.orders.orders);

  // Extract unique customers based on email
  const customersMap = {};
  orders.forEach((order) => {
    if (order.customer && order.customer.email) {
      const email = order.customer.email.toLowerCase().trim();
      if (!customersMap[email]) {
        customersMap[email] = {
          id: order.id || order._id || "USR-TEMP",
          name: order.customer.name,
          email: order.customer.email,
          phone: order.customer.phone || "N/A",
          address: order.customer.address,
          city: order.customer.city,
          postalCode: order.customer.postalCode,
          role: "customer",
          registeredAt: order.createdAt || new Date()
        };
      }
    }
  });

  const customersList = Object.values(customersMap);

  const adminUser = {
    id: "ADM-01",
    name: "Admin Ihdat",
    email: "admin@ihdat.com",
    phone: "+92 300 1234567",
    address: "ihdat Main Head Office",
    city: "Islamabad",
    postalCode: "44000",
    role: "admin",
    registeredAt: "2026-01-01T00:00:00.000Z"
  };

  const allUsers = [adminUser, ...customersList];
  
  const totalPages = Math.ceil(allUsers.length / itemsPerPage);
  const paginatedUsers = allUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-serif font-light uppercase tracking-wider text-black">
          User Directory
        </h1>
        <p className="text-xs text-gray-500 tracking-wider">
          View registered customer accounts and administrator profiles derived from store orders
        </p>
      </div>

      {/* Mobile Responsive Grid List (Hidden on Desktop) */}
      <div className="block md:hidden space-y-4">
        {paginatedUsers.map((user) => (
          <div key={user.id} className="bg-white border border-gray-200 p-5 shadow-xs space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 border border-gray-100 rounded-full text-gray-600">
                  <User className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="font-semibold text-black text-sm">{user.name}</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider">{user.id}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                  user.role === "admin"
                    ? "bg-[#C5A880]/15 text-black border border-[#C5A880]/40"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}
              >
                {user.role}
              </span>
            </div>
            
            <div className="text-xs space-y-2 text-gray-600 pt-3 border-t border-gray-100 tracking-wide">
              <p className="flex items-center">
                <Mail className="h-3.5 w-3.5 text-gray-400 mr-2 shrink-0" /> 
                <span className="truncate">{user.email}</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-3.5 w-3.5 text-gray-400 mr-2 shrink-0" /> 
                <span>{user.phone}</span>
              </p>
              <p className="flex items-center">
                <MapPin className="h-3.5 w-3.5 text-gray-400 mr-2 shrink-0" /> 
                <span className="truncate">{user.address}, {user.city}</span>
              </p>
              <p className="flex items-center">
                <Calendar className="h-3.5 w-3.5 text-gray-400 mr-2 shrink-0" /> 
                <span>Active Since: {new Date(user.registeredAt).toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Users Table (Hidden on Mobile) */}
      <div className="hidden md:block bg-white border border-gray-200 shadow-xs overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-left text-xs">
          <thead className="bg-gray-50">
            <tr className="text-gray-400 uppercase tracking-widest text-[9px] font-bold">
              <th className="px-6 py-4">User Details</th>
              <th className="px-6 py-4">Email Address</th>
              <th className="px-6 py-4">Phone Number</th>
              <th className="px-6 py-4">Location / City</th>
              <th className="px-6 py-4 text-center">System Role</th>
              <th className="px-6 py-4 text-center">Active Since</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                {/* Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-600 flex-shrink-0">
                      <User className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-black text-sm">{user.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">{user.id}</p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1.5 font-medium text-gray-700">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    <span>{user.email}</span>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1.5 font-medium text-gray-700">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                </td>

                {/* Location */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1.5 text-gray-700">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    <span className="truncate max-w-[200px]">{user.address ? `${user.address}, ${user.city}` : "N/A"}</span>
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      user.role === "admin"
                        ? "bg-[#C5A880]/15 text-black border border-[#C5A880]/40"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {user.role === "admin" && <Shield className="h-3 w-3 text-black" />}
                    {user.role}
                  </span>
                </td>

                {/* Registered Date */}
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-1.5 text-gray-500">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    <span>{new Date(user.registeredAt).toLocaleDateString("en-US", {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>
                </td>
              </tr>
            ))}
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
                <span className="font-semibold">{Math.min(currentPage * itemsPerPage, allUsers.length)}</span> of{" "}
                <span className="font-semibold">{allUsers.length}</span> profiles
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px bg-white animate-fade-in" aria-label="Pagination">
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
    </div>
  );
}
