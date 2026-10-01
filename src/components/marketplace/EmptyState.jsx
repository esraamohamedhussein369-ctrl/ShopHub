"use client";

import { motion } from "framer-motion";
import { FiRotateCcw, FiSearch } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

export default function EmptyState() {
  const { clearFilters, searchQuery } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-white/50 p-8 sm:p-14 text-center dark:border-gray-800 dark:bg-gray-900/40"
    >
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-100/80 text-4xl shadow-inner dark:bg-purple-950/50">
        <span>🛍️</span>
        <span className="absolute -bottom-1 -right-1 text-2xl">😔</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
        No Products Found
      </h3>

      <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
        {searchQuery
          ? `We couldn't find any products matching “${searchQuery}”. Try checking for typos or broader keywords.`
          : "No products matched your currently selected filter criteria. Try clearing or relaxing some filters."}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={clearFilters}
          className="btn-primary !px-6 !py-2.5 !text-sm"
        >
          <FiRotateCcw className="h-4 w-4" />
          <span>Clear All Filters</span>
        </button>
      </div>
    </motion.div>
  );
}
