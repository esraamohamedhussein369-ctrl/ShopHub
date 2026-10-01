"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiEye,
  FiHeart,
  FiShield,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import { useApp } from "@/context/AppContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const favorited = isWishlisted(product.id);
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    setTimeout(() => {
      addToCart(product, 1);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }, 300);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xs transition-all duration-300 hover:border-purple-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-purple-900/40"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-gray-800/60">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top-Left Badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5 pointer-events-none z-10">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md shadow-rose-500/20">
              <span>🔥</span>
              <span>Best Seller</span>
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md shadow-emerald-500/20">
              <span>✨</span>
              <span>New</span>
            </span>
          )}
          {discountPercent && (
            <span className="inline-flex items-center rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-extrabold text-white shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Top-Right Favorite Heart */}
        <motion.button
          type="button"
          onClick={handleFavoriteClick}
          whileTap={{ scale: 0.85 }}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-xs transition hover:bg-white hover:scale-110 active:scale-95 dark:bg-gray-900/90"
          aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart
            className={`h-4.5 w-4.5 transition-colors ${
              favorited
                ? "fill-rose-500 text-rose-500 scale-110"
                : "text-gray-400 hover:text-rose-500"
            }`}
          />
        </motion.button>

        {/* Quick View Hover Button */}
        <button
          type="button"
          onClick={handleQuickView}
          className="absolute inset-x-4 bottom-3 hidden md:flex items-center justify-center gap-2 rounded-xl bg-white/95 py-2 text-xs font-bold text-gray-900 shadow-lg backdrop-blur-md opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-purple-600 hover:text-white dark:bg-gray-900/95 dark:text-white dark:hover:bg-purple-600 z-10"
        >
          <FiEye className="h-3.5 w-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Category & Seller Row */}
        <div className="flex items-center justify-between gap-2 text-xs text-gray-400 dark:text-gray-500">
          <span className="font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            {product.category}
          </span>
          <span className="flex items-center gap-1 truncate" title={product.sellerName}>
            <FiShield className="h-3 w-3 text-emerald-500 shrink-0" />
            <span className="truncate">{product.sellerName}</span>
          </span>
        </div>

        {/* Product Title */}
        <h3 className="mt-2 text-sm sm:text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-purple-600 transition-colors dark:text-white dark:group-hover:text-purple-400">
          <Link href={`/product/${product.id}`} className="focus-visible:outline-none focus-visible:underline">
            {product.title}
          </Link>
        </h3>

        {/* Star Ratings */}
        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex items-center text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : i < product.rating
                    ? "fill-amber-400/50 text-amber-400"
                    : "text-gray-300 dark:text-gray-700"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            ({product.reviewCount})
          </span>
        </div>

        {/* Social Proof Tag */}
        {product.salesToday && (
          <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <FaFire className="h-3.5 w-3.5 text-orange-500" />
            <span>{product.salesToday} bought today</span>
          </div>
        )}

        {/* Price Row */}
        <div className="mt-3.5 flex items-baseline gap-2">
          <span className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs font-medium text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4 pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`btn-secondary w-full py-2.5 text-xs sm:text-sm font-bold tracking-wide !rounded-full transition-all duration-200 ${
              justAdded
                ? "!bg-emerald-600 hover:!bg-emerald-700 !shadow-emerald-500/30"
                : ""
            }`}
          >
            {isAdding ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : justAdded ? (
              <>
                <FiCheck className="h-4 w-4" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <FiShoppingBag className="h-4 w-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
