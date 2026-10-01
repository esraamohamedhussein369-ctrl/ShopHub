"use client";

import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { useApp } from "@/context/AppContext";

export default function ProductGrid() {
  const { filteredProducts, filtersActive, clearFilters, searchQuery } = useApp();

  if (filteredProducts.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-lg font-semibold">No products match your filters</p>
        <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
          Try a different search{searchQuery ? ` than “${searchQuery}”` : ""} or clear the
          current filters.
        </p>
        {filtersActive && (
          <button type="button" className="btn-primary mt-6" onClick={clearFilters}>
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence>
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
