"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import FilterSection from "./FilterSection";
import { useApp } from "@/context/AppContext";
import {
  categories,
  genderOptions,
  priceRangeOptions,
} from "@/data/mockData";

function CheckboxRow({ id, label, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      {label}
    </label>
  );
}

function FilterBody() {
  const {
    selectedCategories,
    selectedPriceRanges,
    selectedGenders,
    toggleCategory,
    togglePriceRange,
    toggleGender,
    clearFilters,
    filtersActive,
  } = useApp();
  const [open, setOpen] = useState({
    categories: true,
    price: true,
    gender: true,
  });

  const toggle = (key) => setOpen((current) => ({ ...current, [key]: !current[key] }));

  return (
    <>
      {filtersActive && (
        <button type="button" className="btn-ghost mb-3 w-full text-xs" onClick={clearFilters}>
          Clear all filters
        </button>
      )}
      <FilterSection
        title="Categories"
        open={open.categories}
        onToggle={() => toggle("categories")}
      >
        {categories.map((category) => (
          <CheckboxRow
            key={category}
            id={`cat-${category}`}
            label={category}
            checked={selectedCategories.includes(category)}
            onChange={() => toggleCategory(category)}
          />
        ))}
      </FilterSection>
      <FilterSection
        title="Price Range"
        open={open.price}
        onToggle={() => toggle("price")}
      >
        {priceRangeOptions.map((range) => (
          <CheckboxRow
            key={range.id}
            id={`price-${range.id}`}
            label={range.label}
            checked={selectedPriceRanges.includes(range.id)}
            onChange={() => togglePriceRange(range.id)}
          />
        ))}
      </FilterSection>
      <FilterSection
        title="Gender"
        open={open.gender}
        onToggle={() => toggle("gender")}
      >
        {genderOptions.map((option) => (
          <CheckboxRow
            key={option.id}
            id={`gender-${option.id}`}
            label={option.label}
            checked={selectedGenders.includes(option.id)}
            onChange={() => toggleGender(option.id)}
          />
        ))}
      </FilterSection>
    </>
  );
}

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useApp();

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="card sticky top-24 p-4">
          <h2 className="mb-2 text-base font-bold">Filters</h2>
          <FilterBody />
        </div>
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close filters"
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-white p-5 shadow-lg lg:hidden dark:bg-gray-950"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold">Filters</h2>
                <button
                  type="button"
                  className="rounded-lg p-2 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-gray-800"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close filters"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              <FilterBody />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
