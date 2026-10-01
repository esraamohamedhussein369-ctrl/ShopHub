"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiClock,
  FiCornerDownLeft,
  FiSearch,
  FiTrendingUp,
  FiX,
} from "react-icons/fi";
import { useApp } from "@/context/AppContext";

const trendingSearches = [
  "Noise Canceling Headphones",
  "French Linen Dress",
  "Mechanical Keyboard",
  "Pro Yoga Mat",
  "Ergonomic Chair",
  "Hyaluronic Acid",
  "Leather Biker Jacket",
];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, setSearchQuery, products } = useApp();
  const [term, setTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Bluetooth Headphones",
    "Smart Lamp",
    "Merino Wool Coat",
  ]);
  const inputRef = useRef(null);
  const router = useRouter();

  // Keyboard shortcut listener (/ to open, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  // Live Matching Products
  const matchingProducts = term.trim()
    ? products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(term.toLowerCase()) ||
            p.category.toLowerCase().includes(term.toLowerCase()) ||
            p.sellerName.toLowerCase().includes(term.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (searchTerm) => {
    const query = (searchTerm || term).trim();
    if (!query) return;

    // Add to recent searches
    setRecentSearches((prev) => [query, ...prev.filter((item) => item !== query)].slice(0, 5));
    setSearchQuery(query);
    setSearchOpen(false);
    router.push("/");
  };

  if (!searchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity"
        />

        {/* Search Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
        >
          {/* Search Input Bar */}
          <div className="relative flex items-center border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <FiSearch className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <input
              ref={inputRef}
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchSubmit();
              }}
              placeholder="Search products, brands, categories, electronics, fashion..."
              className="ml-3 flex-1 bg-transparent text-base sm:text-lg font-medium text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
            />
            {term && (
              <button
                type="button"
                onClick={() => setTerm("")}
                className="mr-2 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => handleSearchSubmit()}
              className="hidden sm:inline-flex items-center gap-1 rounded-xl bg-purple-100 px-3 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-200 dark:bg-purple-950/60 dark:text-purple-300"
            >
              <span>Search</span>
              <FiCornerDownLeft className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="ml-2 rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              aria-label="Close search modal"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* Search Content */}
          <div className="max-h-[70vh] overflow-y-auto p-5 space-y-6">
            {/* Live Product Matches */}
            {term.trim() && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Products ({matchingProducts.length})
                </p>
                {matchingProducts.length > 0 ? (
                  <div className="mt-3 divide-y divide-gray-100 dark:divide-gray-800">
                    {matchingProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="group flex items-center gap-3.5 py-2.5 transition hover:bg-purple-50/50 rounded-xl px-2 dark:hover:bg-purple-950/20"
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="56px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 truncate dark:text-gray-100 dark:group-hover:text-purple-400">
                            {product.title}
                          </p>
                          <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-bold text-gray-900 dark:text-white">
                              ${product.price.toFixed(2)}
                            </span>
                            <span>•</span>
                            <span>{product.category}</span>
                            <span>•</span>
                            <span>{product.sellerName}</span>
                          </div>
                        </div>
                        <FiArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="mt-3 w-full rounded-xl bg-purple-50 py-2.5 text-center text-xs font-bold text-purple-600 transition hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300"
                    >
                      View all results for &ldquo;{term}&rdquo; &rarr;
                    </button>
                  </div>
                ) : (
                  <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    No matching products found for &ldquo;{term}&rdquo;
                  </div>
                )}
              </div>
            )}

            {/* Trending & Recent Searches */}
            {!term.trim() && (
              <>
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FiClock className="h-3.5 w-3.5" />
                        Recent Searches
                      </span>
                      <button
                        type="button"
                        onClick={() => setRecentSearches([])}
                        className="text-xs font-medium text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 lowercase"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {recentSearches.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setTerm(item);
                            handleSearchSubmit(item);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-purple-950/40"
                        >
                          <FiClock className="h-3 w-3 text-gray-400" />
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    <FiTrendingUp className="h-3.5 w-3.5 text-pink-500" />
                    Trending Searches
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {trendingSearches.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setTerm(item);
                          handleSearchSubmit(item);
                        }}
                        className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-1.5 text-xs font-semibold text-purple-700 border border-purple-100 transition hover:scale-105 hover:shadow-xs dark:from-purple-950/40 dark:to-pink-950/30 dark:border-purple-900/50 dark:text-purple-300"
                      >
                        <span>🔥</span>
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/80 px-5 py-3 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <kbd className="rounded-md border border-gray-300 bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold dark:border-gray-700 dark:bg-gray-800">
                ESC
              </kbd>
              to close
            </span>
            <span className="flex items-center gap-2">
              <kbd className="rounded-md border border-gray-300 bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold dark:border-gray-700 dark:bg-gray-800">
                /
              </kbd>
              to quickly search anytime
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
