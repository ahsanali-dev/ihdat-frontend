"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "@/store/slices/authSlice";
import { orderActions } from "@/store/slices/orderSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  Users,
  ArrowLeft,
  Menu,
  X,
  Sparkles,
  LogOut,
  AlertCircle
} from "lucide-react";

// Admin Login Portal Component
function AdminLogin() {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLoginSubmit = (values, { setSubmitting }) => {
    dispatch(authActions.loginAdmin({ email: values.email, password: values.password }))
      .unwrap()
      .then(() => {
        setErrorMsg("");
      })
      .catch((err) => {
        setErrorMsg(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };


  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#FAF6F0] p-8 border border-white/5 shadow-2xl space-y-6 flex flex-col items-center"
      >
        <div className="flex flex-col items-center space-y-2">
          <Sparkles className="h-10 w-10 text-[#C5A880]" />
          <h2 className="font-serif text-3xl font-light tracking-[0.2em] uppercase text-black">
            ihdat
          </h2>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#C5A880] border border-[#C5A880]/30 px-2 py-0.5 rounded-sm">
            Control Portal
          </span>
        </div>

        <div className="h-[1px] w-full bg-gray-200" />

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLoginSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 w-full">
              {errorMsg && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 text-[10px] p-3 flex items-start space-x-2 font-medium tracking-wide">
                  <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                  Admin Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="admin@ihdat.com"
                  className="w-full border border-gray-200 px-3 py-2.5 text-xs focus:outline-none focus:border-black bg-white text-black"
                />
                <div className="text-[10px] font-bold text-rose-700 mt-0.5">
                  <ErrorMessage name="email" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-200 px-3 py-2.5 text-xs focus:outline-none focus:border-black bg-white text-black"
                />
                <div className="text-[10px] font-bold text-rose-700 mt-0.5">
                  <ErrorMessage name="password" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-black hover:bg-[#C5A880] hover:text-black text-[#FAF6F0] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center mt-2"
              >
                {isSubmitting ? "Authenticating..." : "Sign In to Portal"}
              </button>
            </Form>
          )}
        </Formik>

      </motion.div>
    </div>
  );
}

// Protected layout wrapper
export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.auth.isAdminLoggedIn);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    dispatch(authActions.checkAdminAuth());
    setIsClient(true);
  }, [dispatch]);

  useEffect(() => {
    if (isAdminLoggedIn) {
      dispatch(orderActions.fetchOrders());
    }
  }, [isAdminLoggedIn, dispatch]);

  // If not mounted on client, render a simple dark background shell to match AdminLogin SSR
  if (!isClient) {
    return <div className="min-h-screen bg-[#111111]" />;
  }

  // If not logged in, intercept and show the login form
  if (!isAdminLoggedIn) {
    return <AdminLogin />;
  }

  const menuItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Shirt },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/admin/users", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-[#111111] text-white">
          {/* Brand Logo Header */}
          <div className="flex items-center h-20 px-6 border-b border-white/10">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-[#C5A880]" />
              <span className="font-serif text-2xl font-light tracking-[0.2em] text-[#FAF6F0]">
                ihdat
              </span>
            </Link>
            <span className="ml-2 text-[9px] font-bold uppercase tracking-widest text-[#C5A880] border border-[#C5A880]/30 px-1 rounded-sm">
              Admin
            </span>
          </div>

          {/* Sidebar Menu */}
          <div className="flex-1 flex flex-col justify-between pt-6 pb-4 overflow-y-auto">
            <nav className="px-4 space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors ${
                      isActive
                        ? "bg-[#C5A880] text-black"
                        : "text-[#A1A1AA] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`mr-3 h-4 w-4 flex-shrink-0 ${isActive ? "text-black" : "text-[#71717A] group-hover:text-white"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Back to main shop shortcut & Logout */}
            <div className="px-4 pt-4 border-t border-white/10 space-y-1">
              <Link
                href="/"
                className="group flex items-center px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#71717A] hover:text-[#FAF6F0] transition-colors"
              >
                <ArrowLeft className="mr-3 h-4 w-4 text-[#71717A] group-hover:text-[#FAF6F0]" />
                Exit Admin
              </Link>
              <button
                type="button"
                onClick={() => dispatch(authActions.logoutAdmin())}
                className="w-full text-left group flex items-center px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#71717A] hover:text-rose-400 transition-colors"
              >
                <LogOut className="mr-3 h-4 w-4 text-[#71717A] group-hover:text-rose-400" />
                Logout Portal
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          {/* Overlay */}
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 cursor-pointer"
          />

          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#111111] text-white">
            {/* Close button */}
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-[#111111]/80 text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Header logo */}
            <div className="flex items-center h-20 px-6 border-b border-white/10">
              <Sparkles className="h-5 w-5 text-[#C5A880] mr-2" />
              <span className="font-serif text-2xl font-light tracking-[0.2em]">ihdat</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 text-xs font-semibold tracking-wider uppercase rounded-none transition-colors ${
                      isActive
                        ? "bg-[#C5A880] text-black"
                        : "text-[#A1A1AA] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`mr-3 h-4 w-4 ${isActive ? "text-black" : "text-[#71717A]"}`} />
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
                <Link
                  href="/"
                  className="flex items-center px-4 py-3 text-xs font-semibold tracking-wider uppercase text-[#71717A] hover:text-[#FAF6F0]"
                >
                  <ArrowLeft className="mr-3 h-4 w-4" />
                  Exit Admin
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSidebarOpen(false);
                    dispatch(authActions.logoutAdmin());
                  }}
                  className="w-full flex items-center px-4 py-3 text-xs font-semibold tracking-wider uppercase text-[#71717A] hover:text-rose-400"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout Portal
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Page Area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Mobile Header Bar */}
        <header className="md:hidden flex items-center justify-between h-20 px-6 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-[#111111] hover:bg-gray-100 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="font-serif text-xl font-light tracking-wider ml-4 text-black">
              ihdat
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] border border-[#C5A880] px-2 py-0.5">
            Admin
          </span>
        </header>

        {/* Dynamic page content wrapper */}
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
