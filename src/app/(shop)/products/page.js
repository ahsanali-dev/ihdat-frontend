"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { SlidersHorizontal, Search, RotateCcw } from "lucide-react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products: allProducts, loading } = useSelector((state) => state.products);
  const [mounted, setMounted] = useState(false);

  // States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Categories list extracted from mock products
  const categories = ["All", ...Array.from(new Set(allProducts.map((p) => p.category)))];

  // Pre-load category from URL query parameters
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      setSelectedCategory(catParam);
    } else {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  // Handle Filter & Sort Updates
  useEffect(() => {
    let result = [...allProducts];

    // Search query filter
    if (searchQuery.trim() !== "") {
      result = result.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((prod) => prod.category === selectedCategory);
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
    setVisibleCount(9); // Reset visible items to 9 when filters/sorting change
  }, [selectedCategory, sortBy, searchQuery, allProducts]);

  // Change category helper
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Update URL query parameters
    const params = new URLSearchParams(searchParams);
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSortBy("default");
    handleCategoryChange("All");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header and Title */}
      <div className="border-b border-[#E4E4E7]/50 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-serif text-4xl font-light uppercase tracking-wider text-[#111111]">
            Our Catalog
          </h1>
          <p className="text-xs text-[#71717A] tracking-wider uppercase">
            Showing {filteredProducts.length} premium products
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-md w-full border border-[#E4E4E7] bg-white px-3 py-2 flex items-center shadow-xs">
          <Search className="h-4 w-4 text-[#71717A] mr-2" />
          <input
            type="text"
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs text-[#111111] placeholder-[#71717A] bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-[#71717A] hover:text-black font-semibold ml-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter and Sort Panel */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-white border border-[#E4E4E7]/40 p-6 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mr-2 flex items-center">
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1" /> Filters:
          </span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors ${
                selectedCategory === category
                  ? "bg-[#111111] text-[#FAF6F0]"
                  : "bg-[#FAF6F0] text-[#71717A] hover:bg-[#E4E4E7]/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sorting & Reset */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              Sort By:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-[#E4E4E7] bg-white px-3 py-1.5 text-xs font-medium text-[#111111] focus:outline-none"
            >
              <option value="default">Release Date</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {(selectedCategory !== "All" || sortBy !== "default" || searchQuery !== "") && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center text-xs font-medium text-[#7D1D2B] hover:underline"
            >
              <RotateCcw className="h-3 w-3 mr-1" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {mounted && loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-4 text-left">
              <div className="aspect-[3/4] w-full">
                <Skeleton height="100%" className="aspect-[3/4]" borderRadius={0} />
              </div>
              <div className="space-y-2">
                <Skeleton width="70%" height={16} />
                <Skeleton width="40%" height={12} />
                <Skeleton width="30%" height={12} />
              </div>
            </div>
          ))}
        </div>
      ) : allProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 bg-white border border-[#E4E4E7]/40 p-8 shadow-xs">
          <p className="text-sm text-[#71717A] uppercase tracking-wider font-semibold">
            Our catalog is currently empty
          </p>
          <p className="text-xs text-gray-400 max-w-md leading-relaxed mx-auto">
            We are currently curating a new collection of fine organic apparel. Please visit us again soon.
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <p className="text-sm text-[#71717A] uppercase tracking-wider">
            No products found matching your filters
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2 border border-[#111111] text-xs font-semibold uppercase tracking-widest text-white bg-[#111111] hover:bg-transparent hover:text-[#111111] transition-all"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length > visibleCount && (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="px-8 py-3.5 border border-[#111111] bg-[#111111] text-[#FAF6F0] hover:bg-transparent hover:text-black transition-all text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center text-xs tracking-wider uppercase text-[#71717A]">
          Loading catalog collections...
        </div>
      }
    >
      <ProductListingContent />
    </Suspense>
  );
}
