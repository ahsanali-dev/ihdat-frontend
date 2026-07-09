"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { DollarSign, ShoppingBag, Shirt, Users, ArrowUpRight, TrendingUp, AlertTriangle } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AdminDashboardOverview() {
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders);
  const { products, loading: productsLoading } = useSelector((state) => state.products);
  const loading = ordersLoading || productsLoading;

  // 1. Calculate metrics
  const totalRevenue = orders
    .filter((ord) => ord.status !== "Cancelled")
    .reduce((sum, ord) => sum + ord.totalAmount, 0);

  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock <= 15);

  const stats = [
    {
      name: "Total Revenue",
      value: `Rs. ${totalRevenue.toLocaleString()}`,
      change: "+12.5% from last month",
      icon: DollarSign,
      color: "bg-emerald-500",
    },
    {
      name: "Total Orders",
      value: totalOrders,
      change: "+4.3% from last week",
      icon: ShoppingBag,
      color: "bg-[#C5A880]",
    },
    {
      name: "Total Products",
      value: totalProducts,
      change: "Active catalog size",
      icon: Shirt,
      color: "bg-blue-500",
    },
    {
      name: "Total Customers",
      value: "4", // Mock users registered
      change: "Stable conversions",
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-10 text-left">
        {/* Title */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-light uppercase tracking-wider text-black">
              Dashboard Overview
            </h1>
            <div className="w-48"><Skeleton height={12} /></div>
          </div>
        </div>

        {/* Grid Stats Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 border border-gray-200 shadow-xs space-y-4 rounded-2xl">
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-2/3">
                  <div className="w-1/2"><Skeleton height={10} /></div>
                  <div className="w-3/4"><Skeleton height={24} /></div>
                </div>
                <Skeleton circle width={40} height={40} />
              </div>
              <div className="h-[1px] bg-gray-100" />
              <div className="w-1/2"><Skeleton height={10} /></div>
            </div>
          ))}
        </div>

        {/* Dashboard Sub-grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders Skeleton - 8 cols */}
          <div className="lg:col-span-8 bg-white border border-gray-200 p-6 space-y-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
                Recent Orders
              </h3>
              <div className="w-20"><Skeleton height={12} /></div>
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
                  <div className="w-1/6"><Skeleton height={12} /></div>
                  <div className="space-y-1 w-1/4">
                    <Skeleton height={12} width="80%" />
                    <Skeleton height={9} width="60%" />
                  </div>
                  <div className="w-1/6"><Skeleton height={10} /></div>
                  <div className="w-1/6"><Skeleton height={12} /></div>
                  <div className="w-16"><Skeleton height={20} borderRadius={10} /></div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts Skeleton - 4 cols */}
          <div className="lg:col-span-4 bg-white border border-gray-200 p-6 space-y-6 rounded-2xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 flex items-center">
              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" /> Stock Warnings
            </h3>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <div className="space-y-1 w-2/3">
                    <Skeleton height={12} width="70%" />
                    <Skeleton height={10} width="40%" />
                  </div>
                  <div className="w-12"><Skeleton height={20} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-light uppercase tracking-wider text-black">
            Dashboard Overview
          </h1>
          <p className="text-xs text-gray-500 tracking-wider">
            Real-time shop metrics and operations dashboard
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-semibold">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Live Operations Mode</span>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="bg-white p-6 border border-gray-200 shadow-xs flex flex-col justify-between rounded-2xl">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {item.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                </div>
                <div className={`p-2.5 rounded-lg text-white ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-[10px] text-gray-500 font-semibold tracking-wider pt-4">
                {item.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Dashboard Sub-grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders - 8 cols */}
        <div className="lg:col-span-8 bg-white border border-gray-200 p-6 space-y-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
              Recent Orders
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs font-bold uppercase tracking-wider text-[#C5A880] hover:underline flex items-center"
            >
              Manage Orders <ArrowUpRight className="h-3 w-3 ml-1" />
            </Link>
          </div>

          {/* Mobile-only Recent Orders Cards List */}
          <div className="block md:hidden divide-y divide-gray-100 border border-gray-200">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="p-4 bg-white space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-black text-xs">{order.id}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                      order.status === "Delivered"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : order.status === "Pending"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : order.status === "Cancelled"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-[10px]">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 block font-semibold">Customer</span>
                    <span className="font-semibold text-gray-800">{order.customer.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 block font-semibold">Total Amount</span>
                    <span className="font-bold text-black">Rs. {order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop-only Recent Orders Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-xs">
              <thead>
                <tr className="text-gray-400 uppercase tracking-widest text-[9px] font-bold">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4 text-right">Total</th>
                  <th className="pb-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/55 transition-colors">
                    <td className="py-4 font-bold text-black">{order.id}</td>
                    <td className="py-4">
                      <div>
                        <p className="font-semibold text-black">{order.customer.name}</p>
                        <p className="text-[10px] text-gray-400">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-right font-bold text-black">Rs. {order.totalAmount.toLocaleString()}</td>
                    <td className="py-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          order.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : order.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : order.status === "Cancelled"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts - 4 cols */}
        <div className="lg:col-span-4 bg-white border border-gray-200 p-6 space-y-6 rounded-2xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 flex items-center">
            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" /> Stock Warnings
          </h3>

          <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto pr-1">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-gray-400 italic text-center py-10">
                All inventory quantities healthy
              </p>
            ) : (
              lowStockProducts.map((prod) => (
                <div key={prod.id} className="py-4 flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-black font-serif">{prod.name}</p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider">
                      Category: {prod.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 text-[10px]">
                      {prod.stock} left
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
