"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";
import { ShoppingBag, Menu, X, UserCheck } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
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

  const navLinks = [
    { name: "Shop All", href: "/products" },
    { name: "Women's Kotis", href: "/products?category=Women%27s%20Kotis" },
    { name: "Kids' Waistcoats", href: "/products?category=Kids%27%20Waistcoats" },
    { name: "Custom Order", href: "/custom-order" },
    { name: "Track Order", href: "/track" },
    { name: "About Us", href: "/about" },
  ];

  const handleCartOpen = () => {
    dispatch(cartActions.openCart());
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#E4E4E7]/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left Side: Logo & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <div className="flex sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#1E1E24] hover:bg-[#E4E4E7]/30 transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Logo */}
            <div className="shrink-0">
              <Link href="/" className="group flex items-center">
                <span className="font-serif text-3xl font-extralight tracking-[0.25em] text-[#1E1E24] transition-all duration-300 group-hover:tracking-[0.3em]">
                  ihdat
                </span>
              </Link>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden sm:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-[#C5A880] ${
                  pathname === link.href ? "text-[#C5A880]" : "text-[#1E1E24]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Utility Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">

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
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="sm:hidden bg-[#FAF6F0] border-b border-[#E4E4E7]/50 shadow-lg animate-fadeIn duration-200">
          <div className="space-y-1 px-4 pt-2 pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 text-base font-medium tracking-wider uppercase border-b border-[#E4E4E7]/20 hover:text-[#C5A880] transition-colors ${
                  pathname === link.href ? "text-[#C5A880]" : "text-[#111111]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
