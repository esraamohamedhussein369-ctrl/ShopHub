"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiFilter, FiRotateCcw, FiStar, FiX } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import FilterSection from "./FilterSection";
import {
  categories,
  genderOptions,
  priceRangeOptions,
  ratingOptions,
} from "@/data/mockData";

export function SidebarContent() {
  const {
    products,
    selectedCategories,
    selectedPriceRanges,
    selectedGenders,
    selectedRating,
    onlyBestSellers,
    inStockOnly,
    toggleCategory,
    togglePriceRange,
    toggleGender,
    setSelectedRating,
    setOnlyBestSellers,
    setInStockOnly,
    clearFilters,
    filtersActive,
  } = useApp();

  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    gender: true,
    rating: true,
    special: true,
  });

  const toggle = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Compute category item counts
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat.name] = products.filter((p) => p.category === cat.name).length;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-1">
      {/* Active Filter Clear Header */}
      {filtersActive && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 flex items-center justify-between rounded-xl bg-purple-50 p-2.5 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50"
        >
          <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
            Filters Active
          </span>
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-rose-600 hover:bg-rose-100 dark:text-rose-400 dark:hover:bg-rose-950/50 transition-colors"
          >
            <FiRotateCcw className="h-3 w-3" />
            <span>Reset All</span>
          </button>
        </motion.div>
      )}

      {/* Section 1: Categories with Emojis */}
      <FilterSection
        title="Categories"
        open={openSections.categories}
        onToggle={() => toggle("categories")}
        count={selectedCategories.length}
      >
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat.name);
            const count = categoryCounts[cat.name] || 0;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.name)}
                className={`group flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-purple-100/80 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 shadow-2xs"
                    : "text-gray-700 hover:bg-gray-100/70 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-purple-400"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[11px] text-gray-400 dark:text-gray-500">
                    ({count})
                  </span>
                  {isSelected && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-white">
                      <FiCheck className="h-2.5 w-2.5" />
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Section 2: Price Range */}
      <FilterSection
        title="Price Range"
        open={openSections.price}
        onToggle={() => toggle("price")}
        count={selectedPriceRanges.length}
      >
        <div className="space-y-1">
          {priceRangeOptions.map((range) => {
            const isSelected = selectedPriceRanges.includes(range.id);

            return (
              <label
                key={range.id}
                className={`flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-all ${
                      isSelected
                        ? "border-purple-600 bg-purple-600 text-white"
                        : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
                    }`}
                  >
                    {isSelected && <FiCheck className="h-3 w-3" />}
                  </div>
                  <span>{range.label}</span>
                </div>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => togglePriceRange(range.id)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </FilterSection>

      {/* Section 3: Gender / Target */}
      <FilterSection
        title="Target Audience"
        open={openSections.gender}
        onToggle={() => toggle("gender")}
        count={selectedGenders.length}
      >
        <div className="space-y-1">
          {genderOptions.map((option) => {
            const isSelected = selectedGenders.includes(option.id);

            return (
              <label
                key={option.id}
                className={`flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-all ${
                      isSelected
                        ? "border-purple-600 bg-purple-600 text-white"
                        : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
                    }`}
                  >
                    {isSelected && <FiCheck className="h-3 w-3" />}
                  </div>
                  <span>{option.label}</span>
                </div>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleGender(option.id)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </FilterSection>

      {/* Section 4: Rating Filter */}
      <FilterSection
        title="Customer Rating"
        open={openSections.rating}
        onToggle={() => toggle("rating")}
        count={selectedRating ? 1 : 0}
      >
        <div className="space-y-1">
          {ratingOptions.map((rate) => {
            const isSelected = selectedRating === rate.minRating;

            return (
              <button
                key={rate.stars}
                type="button"
                onClick={() =>
                  setSelectedRating(isSelected ? null : rate.minRating)
                }
                className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < rate.stars
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span>{rate.label}</span>
                </div>
                {isSelected && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-white">
                    <FiCheck className="h-2.5 w-2.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Section 5: Special Toggles (Best Sellers & In Stock) */}
      <FilterSection
        title="Special Highlights"
        open={openSections.special}
        onToggle={() => toggle("special")}
      >
        <div className="space-y-3 pt-1">
          {/* Best Sellers Toggle */}
          <div className="flex items-center justify-between rounded-xl bg-gray-50/80 p-2.5 dark:bg-gray-800/80">
            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-gray-200">
              <span>🔥</span>
              <span>Trending Best Sellers</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={onlyBestSellers}
              onClick={() => setOnlyBestSellers(!onlyBestSellers)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-hidden ${
                onlyBestSellers ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                  onlyBestSellers ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* In Stock Toggle */}
          <div className="flex items-center justify-between rounded-xl bg-gray-50/80 p-2.5 dark:bg-gray-800/80">
            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-gray-200">
              <span>📦</span>
              <span>In Stock Only</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={inStockOnly}
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-hidden ${
                inStockOnly ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                  inStockOnly ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </FilterSection>
    </div>
  );
}

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useApp();

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden w-[280px] shrink-0 lg:block">
        <div className="sticky top-28 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
                <FiFilter className="h-4 w-4" />
              </div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">
                Filter Products
              </h2>
            </div>
          </div>
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-xs lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white p-5 shadow-2xl overflow-y-auto lg:hidden dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800"
            >
              <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <FiFilter className="h-5 w-5 text-purple-600" />
                  <h2 className="text-base font-extrabold text-gray-900 dark:text-white">
                    Filter Products
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
                  aria-label="Close filters"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
