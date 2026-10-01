"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCheck,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiX,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import { useApp } from "@/context/AppContext";

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useApp();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIdx(0);
      setSelectedColor(quickViewProduct.variants?.colors?.[0] || "");
      setSelectedSize(quickViewProduct.variants?.sizes?.[0] || "");
      setQuantity(1);
      setJustAdded(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const gallery = product.images?.length ? product.images : [product.image];
  const favorited = isWishlisted(product.id);
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      color: selectedColor,
      size: selectedSize,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setQuickViewProduct(null)}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-md backdrop-blur-xs transition hover:bg-white hover:text-gray-900 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Close modal"
          >
            <FiX className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
            {/* Gallery Column */}
            <div className="p-6 sm:p-8 bg-gray-50/70 dark:bg-gray-800/40 flex flex-col justify-between">
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
                  <Image
                    src={gallery[activeImageIdx]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                  {discountPercent && (
                    <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-bold text-white shadow-md">
                      -{discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Thumbnail selector */}
                {gallery.length > 1 && (
                  <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1">
                    {gallery.map((src, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImageIdx(index)}
                        className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                          activeImageIdx === index
                            ? "border-purple-600 ring-2 ring-purple-600/30"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Trust Badge Bar */}
              <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200/80 bg-white p-3 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <FiTruck className="h-4 w-4 text-purple-600" />
                  Free 2-Day Shipping
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <FiShield className="h-4 w-4 text-emerald-500" />
                  Verified Guarantee
                </span>
              </div>
            </div>

            {/* Product Details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Seller */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    {product.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiShield className="h-3 w-3 text-emerald-500" />
                    <span>Sold by {product.sellerName}</span>
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-2 text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight dark:text-white">
                  {product.title}
                </h2>

                {/* Rating & Social Proof */}
                <div className="mt-2.5 flex items-center gap-3">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300 dark:text-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({product.reviewCount} customer reviews)
                  </span>
                </div>

                {product.salesToday && (
                  <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <FaFire className="h-4 w-4 text-orange-500" />
                    <span>{product.salesToday} people purchased this item today</span>
                  </div>
                )}

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm font-semibold text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description snippet */}
                <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Variants Selection */}
                {product.variants?.colors && product.variants.colors.length > 0 && (
                  <div className="mt-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Color / Option: <span className="text-gray-900 dark:text-white font-semibold">{selectedColor}</span>
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.variants.colors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                            selectedColor === color
                              ? "border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.variants?.sizes && product.variants.sizes.length > 0 && (
                  <div className="mt-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Size / Spec: <span className="text-gray-900 dark:text-white font-semibold">{selectedSize}</span>
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.variants.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                            selectedSize === size
                              ? "border-purple-600 bg-purple-600 text-white"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons & Quantity Row */}
              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-600 hover:bg-white hover:shadow-xs dark:text-gray-300 dark:hover:bg-gray-700"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-600 hover:bg-white hover:shadow-xs dark:text-gray-300 dark:hover:bg-gray-700"
                      aria-label="Increase quantity"
                    >
                      <FiPlus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`btn-secondary flex-1 py-3 text-sm font-bold !rounded-2xl transition-all ${
                      justAdded ? "!bg-emerald-600" : ""
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <FiCheck className="h-4 w-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <FiShoppingBag className="h-4 w-4" />
                        <span>Add ${(product.price * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    aria-label="Toggle wishlist"
                  >
                    <FiHeart
                      className={`h-5 w-5 ${
                        favorited ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    href={`/product/${product.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="text-xs font-bold text-purple-600 hover:text-purple-700 underline dark:text-purple-400"
                  >
                    View Full Product Specifications & Reviews &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
