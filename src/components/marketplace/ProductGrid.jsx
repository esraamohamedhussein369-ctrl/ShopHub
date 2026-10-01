"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCheck,
  FiFilter,
  FiGrid,
  FiList,
  FiRotateCcw,
  FiSliders,
  FiX,
} from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

// Skeleton card for loading state
function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-gray-900">
      <div className="relative aspect-square w-full rounded-2xl animate-shimmer" />
      <div className="mt-4 space-y-2.5">
        <div className="h-3 w-1/3 rounded-md animate-shimmer" />
        <div className="h-4 w-5/6 rounded-md animate-shimmer" />
        <div className="h-4 w-4/6 rounded-md animate-shimmer" />
        <div className="mt-4 flex items-center justify-between pt-2">
          <div className="h-6 w-1/4 rounded-md animate-shimmer" />
          <div className="h-8 w-1/3 rounded-full animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const {
    filteredProducts,
    products,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    selectedCategories,
    selectedPriceRanges,
    selectedGenders,
    selectedRating,
    onlyBestSellers,
    inStockOnly,
    searchQuery,
    toggleCategory,
    togglePriceRange,
    toggleGender,
    setSelectedRating,
    setOnlyBestSellers,
    setInStockOnly,
    clearFilters,
    filtersActive,
    setSidebarOpen,
  } = useApp();

  const [loading, setLoading] = useState(true);

  // Simulate smooth loading transition on filter change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [
    selectedCategories,
    selectedPriceRanges,
    selectedGenders,
    selectedRating,
    onlyBestSellers,
    inStockOnly,
    sortBy,
    searchQuery,
  ]);

  return (
    <div className="w-full">
      {/* Top Toolbar: Search info, Active filter chips, Sort & View controls */}
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-4 sm:p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Product count & Mobile filter trigger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-bold text-gray-800 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 lg:hidden dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-purple-950/40"
            >
              <FiFilter className="h-4 w-4 text-purple-600" />
              <span>Filters</span>
              {filtersActive && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] text-white">
                  !
                </span>
              )}
            </button>

            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Showing{" "}
                <span className="text-purple-600 dark:text-purple-400 font-extrabold">
                  {filteredProducts.length}
                </span>{" "}
                of {products.length} Products
              </p>
              {searchQuery && (
                <p className="text-xs text-gray-400">
                  Search results for &ldquo;{searchQuery}&rdquo;
                </p>
              )}
            </div>
          </div>

          {/* Right: Sort Select & View Mode Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 ml-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="hidden sm:inline text-xs font-semibold text-gray-500 dark:text-gray-400">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-800 outline-none transition focus:border-purple-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="featured">✨ Featured Items</option>
                <option value="price-low">💵 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="popularity">🔥 Most Popular</option>
                <option value="newest">🆕 Newest Arrivals</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center rounded-xl border border-gray-200 bg-gray-50 p-0.5 dark:border-gray-700 dark:bg-gray-800">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                  viewMode === "grid"
                    ? "bg-white text-purple-600 shadow-xs dark:bg-gray-900 dark:text-purple-400"
                    : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
                aria-label="Grid View"
              >
                <FiGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                  viewMode === "list"
                    ? "bg-white text-purple-600 shadow-xs dark:bg-gray-900 dark:text-purple-400"
                    : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
                aria-label="List View"
              >
                <FiList className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {filtersActive && (
          <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Active Filters:
            </span>

            {/* Category chips */}
            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1 rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
              >
                <span>{cat}</span>
                <button
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className="hover:text-rose-500"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            ))}

            {/* Price chips */}
            {selectedPriceRanges.map((range) => (
              <span
                key={range}
                className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
              >
                <span>${range}</span>
                <button
                  type="button"
                  onClick={() => togglePriceRange(range)}
                  className="hover:text-rose-500"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            ))}

            {/* Gender chips */}
            {selectedGenders.map((gender) => (
              <span
                key={gender}
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
              >
                <span>{gender}</span>
                <button
                  type="button"
                  onClick={() => toggleGender(gender)}
                  className="hover:text-rose-500"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            ))}

            {/* Rating chip */}
            {selectedRating && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                <span>{selectedRating}+ Stars</span>
                <button
                  type="button"
                  onClick={() => setSelectedRating(null)}
                  className="hover:text-rose-500"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            )}

            {/* Best seller chip */}
            {onlyBestSellers && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                <span>🔥 Best Sellers Only</span>
                <button
                  type="button"
                  onClick={() => setOnlyBestSellers(false)}
                  className="hover:text-rose-500"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            )}

            {/* In stock chip */}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
                <span>📦 In Stock Only</span>
                <button
                  type="button"
                  onClick={() => setInStockOnly(false)}
                  className="hover:text-rose-500"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            )}

            {/* Clear all button */}
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-bold text-rose-600 hover:underline dark:text-rose-400 ml-1"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Products Grid Content */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={`grid gap-6 ${
            viewMode === "list"
              ? "grid-cols-1"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
