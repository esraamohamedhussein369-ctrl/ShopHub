"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

export default function SearchBar() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery } = useApp();
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-24 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="card w-full max-w-xl p-3"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <FiSearch className="ml-2 h-5 w-5 text-gray-400" aria-hidden />
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products by title..."
                className="w-full bg-transparent py-3 text-sm outline-none"
                aria-label="Search products by title"
              />
              <button
                type="button"
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-gray-800"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
