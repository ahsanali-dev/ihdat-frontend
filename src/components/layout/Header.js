"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";
import { fetchProducts } from "@/store/slices/productSlice";
import { ShoppingBag, Menu, X, UserCheck, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dispatch = useDispatch();
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const products = useSelector((state) => state.products.products);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const suggestions = searchQuery.trim() === ""
    ? []
    : products.filter(
        (prod) =>
          prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (prod.description && prod.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5);

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const navLinks = [
    { name: "Shop All", href: "/products" },
    { name: "Women's Kotis", href: "/products?category=Women%27s%20Kotis" },
    { name: "Kids' Waistcoats", href: "/products?category=Kids%27%20Waistcoats" },
    { name: "Custom Order", href: "/custom-order" },
    { name: "Track Order", href: "/track" },
    { name: "About Us", href: "/about" },
  ];

  const leftLinks = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3);

  const handleCartOpen = () => {
    dispatch(cartActions.openCart());
  };

  const isHome = pathname === "/";

  return (
    <header
      className={`${
        isHome ? "fixed" : "sticky"
      } top-4 left-0 right-0 z-40 w-full transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        !isHome ? "mb-6" : ""
      }`}
    >
      <div
        className={`mx-auto max-w-7xl transition-all duration-300 border relative ${
          isOpen ? "rounded-xl" : "rounded-2xl"
        } ${
          scrolled
            ? "bg-[#FAF6F0]/95 backdrop-blur-md border-[#E4E4E7]/60 shadow-md py-1"
            : "bg-[#FAF6F0]/75 backdrop-blur-md border-[#C5A880]/20 shadow-sm py-2"
        }`}
      >
        <div className="relative flex h-14 sm:h-15 items-center justify-between px-4 sm:px-6 lg:px-8">
          {isSearchOpen ? (
            <div className="flex-1 flex items-center justify-between h-full bg-[#FAF6F0]/50 rounded-xl px-2">
              <div className="flex items-center space-x-3 w-full">
                <Search className="h-5 w-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search garments (e.g. Zaman, Koti, Waistcoat)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 text-sm text-[#1E1E24] placeholder-gray-400 focus:outline-none py-1"
                />
              </div>
              <button
                onClick={handleCloseSearch}
                className="p-2 rounded-full text-[#1E1E24] hover:bg-[#E4E4E7]/30 transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <>
              {/* Left Side: Mobile Menu Button & Left Nav Links */}
              <div className="flex items-center space-x-6">
                {/* Mobile Menu Button */}
                <div className="flex lg:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-[#1E1E24] hover:bg-[#E4E4E7]/30 transition-colors"
                  >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>

                {/* Navigation Links (Left Group - Desktop) */}
                <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                  {leftLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-xs xl:text-sm font-medium tracking-wide uppercase transition-colors hover:text-[#8E7045] ${
                        pathname === link.href ? "text-[#8E7045] font-semibold" : "text-[#1E1E24]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Center: Logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Link href="/" className="group flex items-center">
                  <span className="font-serif text-2xl sm:text-3xl font-extralight tracking-[0.25em] text-[#1E1E24] transition-all duration-300 group-hover:tracking-[0.3em]">
                    ihdat
                  </span>
                </Link>
              </div>

              {/* Right Side: Right Nav Links & Utility Icons */}
              <div className="flex items-center space-x-6">
                {/* Navigation Links (Right Group - Desktop) */}
                <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                  {rightLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-xs xl:text-sm font-medium tracking-wide uppercase transition-colors hover:text-[#8E7045] ${
                        pathname === link.href ? "text-[#8E7045] font-semibold" : "text-[#1E1E24]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                {/* Utility Icons */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {/* Search Icon Button */}
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 rounded-full text-[#1E1E24] hover:bg-[#E4E4E7]/30 transition-colors"
                    aria-label="Search"
                  >
                    <Search className="h-5.5 w-5.5" />
                  </button>

                  {/* Shopping Bag Button */}
                  <button
                    onClick={handleCartOpen}
                    className="relative p-2 rounded-full text-[#1E1E24] hover:bg-[#E4E4E7]/30 transition-colors"
                    aria-label="Shopping Cart"
                  >
                    <ShoppingBag className="h-6 w-6" />
                    {cartTotalQty > 0 && (
                      <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#1E1E24] text-[10px] font-bold text-white shadow-md border border-[#FAF6F0]">
                        {cartTotalQty}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Search Suggestions Panel */}
        <AnimatePresence>
          {isSearchOpen && searchQuery.trim() !== "" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-[#FAF6F0] border border-[#C5A880]/20 rounded-2xl shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto px-4 py-3 text-left"
            >
              {suggestions.length === 0 ? (
                <div className="py-6 text-center text-xs text-gray-500 font-medium tracking-wide">
                  No matching garments found. Try searching for something else.
                </div>
              ) : (
                <div className="divide-y divide-gray-150/50">
                  {suggestions.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/products/${prod.id}`}
                      onClick={handleCloseSearch}
                      className="flex items-center py-2.5 hover:bg-[#E4E4E7]/25 transition-colors px-2 rounded-lg gap-4 text-left group"
                    >
                      <div className="h-12 w-9 border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 relative rounded-lg shadow-2xs">
                        {prod.images && prod.images[0] ? (
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <span className="h-full w-full block animate-pulse" style={{ backgroundColor: prod.colors[0] }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-black group-hover:text-[#8E7045] transition-colors truncate">
                          {prod.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5 font-medium">
                          {prod.category}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-xs text-black">
                          Rs. {prod.price.toLocaleString()}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="lg:hidden px-4 pt-2 pb-6 border-t border-[#E4E4E7]/20 rounded-b-2xl bg-[#FAF6F0]/95 backdrop-blur-md">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium tracking-wider uppercase border-b border-[#E4E4E7]/10 hover:text-[#8E7045] transition-colors text-black"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
