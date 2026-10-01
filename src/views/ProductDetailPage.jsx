"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiCheck,
  FiClock,
  FiEye,
  FiHeart,
  FiHelpCircle,
  FiInfo,
  FiMinus,
  FiPackage,
  FiPlus,
  FiRefreshCw,
  FiShare2,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTruck,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/marketplace/ProductCard";
import QuickViewModal from "@/components/marketplace/QuickViewModal";
import RecentlyViewed from "@/components/marketplace/RecentlyViewed";
import Toast from "@/components/common/Toast";
import ScrollToTop from "@/components/common/ScrollToTop";
import { useApp } from "@/context/AppContext";
import { getProductById, getRelatedProducts } from "@/data/mockData";

export default function ProductDetailPage({ id }) {
  const router = useRouter();
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    addRecentlyViewed,
    addToast,
  } = useApp();

  const product = getProductById(id);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [justAdded, setJustAdded] = useState(false);

  // Set default variants and record recently viewed
  useEffect(() => {
    if (product) {
      setActiveImageIdx(0);
      setSelectedColor(product.variants?.colors?.[0] || "");
      setSelectedSize(product.variants?.sizes?.[0] || "");
      setQuantity(1);
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#0B0F19]">
        <Header />
        <main className="mx-auto max-w-3xl flex-1 px-4 py-20 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-2xl font-black">Product Not Found</h1>
          <p className="mt-2 text-sm text-gray-500">
            The item you are looking for might have been moved or removed.
          </p>
          <Link href="/" className="btn-primary mt-6 inline-flex !px-6 !py-3">
            Back to Marketplace
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const gallery = product.images?.length ? product.images : [product.image];
  const related = getRelatedProducts(product, 4);
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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        title: "Product Link Copied! 🔗",
        message: "Share link has been copied to your clipboard.",
        type: "success",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#0B0F19] text-[#1F2937] dark:text-[#F3F4F6] transition-colors duration-200">
      <Header />

      <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition"
          >
            <FiArrowLeft className="h-4 w-4" />
            <span>Back to Marketplace</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
          >
            <FiShare2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Image Gallery (5 cols) */}
          <section className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md dark:border-gray-800 dark:bg-gray-900">
              <Image
                src={gallery[activeImageIdx]}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-all duration-300"
              />

              {/* Badges Overlay */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {product.isBestSeller && (
                  <span className="rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-3 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md">
                    🔥 Best Seller
                  </span>
                )}
                {discountPercent && (
                  <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-black text-white shadow-md">
                    -{discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg backdrop-blur-xs transition hover:scale-110 active:scale-95 dark:bg-gray-900/90 dark:text-white"
                aria-label="Save to wishlist"
              >
                <FiHeart
                  className={`h-5 w-5 ${
                    favorited ? "fill-rose-500 text-rose-500 scale-110" : ""
                  }`}
                />
              </button>
            </div>

            {/* Thumbnails row */}
            {gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {gallery.map((src, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImageIdx(index)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-white shadow-xs transition-all ${
                      activeImageIdx === index
                        ? "border-purple-600 ring-2 ring-purple-600/30 dark:bg-gray-800"
                        : "border-gray-200 opacity-60 hover:opacity-100 dark:border-gray-700 dark:bg-gray-800"
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}

            {/* Seller Info Box */}
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-2xl ring-2 ring-purple-500/20">
                    <Image
                      src={product.sellerAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                      alt={product.sellerName}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">
                        {product.sellerName}
                      </h4>
                      <span className="rounded-md bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      <span className="flex items-center text-amber-500 font-bold">
                        <FiStar className="h-3 w-3 fill-amber-400" />
                        {product.sellerRating || 4.9}
                      </span>
                      <span>•</span>
                      <span>{(product.sellerSales || 5000).toLocaleString()} Sales</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 hover:border-purple-500 hover:text-purple-600 dark:border-gray-700 dark:text-gray-300"
                >
                  Visit Store
                </button>
              </div>
            </div>
          </section>

          {/* Right Column: Product Info & Actions (7 cols) */}
          <section className="lg:col-span-6 space-y-6">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                  {product.category}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <FiCheck className="h-3.5 w-3.5" />
                  In Stock ({product.stock} units available)
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                {product.title}
              </h1>

              {/* Rating & Social Proof */}
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : i < product.rating
                            ? "fill-amber-400/50 text-amber-400"
                            : "text-gray-300 dark:text-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-black text-gray-900 dark:text-white">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({product.reviewCount} customer reviews)
                  </span>
                </div>

                {product.salesToday && (
                  <span className="flex items-center gap-1 rounded-md bg-orange-50 px-2 py-0.5 text-xs font-bold text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                    <FaFire className="h-3.5 w-3.5 text-orange-500" />
                    <span>{product.salesToday} bought today</span>
                  </span>
                )}
              </div>
            </div>

            {/* Price & Savings Box */}
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg font-semibold text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {discountPercent && (
                  <span className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-3 py-1 text-xs font-extrabold text-white shadow-xs">
                    Save ${(product.originalPrice - product.price).toFixed(2)} ({discountPercent}% OFF)
                  </span>
                )}
              </div>

              {/* Free Shipping Meter */}
              <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <FiTruck className="h-4 w-4 text-purple-600 shrink-0" />
                <span>
                  {product.price >= 50
                    ? "✨ Eligible for Free 2-Day Express Shipping"
                    : "Add " + (50 - product.price).toFixed(2) + " more for FREE Shipping"}
                </span>
              </div>
            </div>

            {/* Variants Picker */}
            {product.variants?.colors && product.variants.colors.length > 0 && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Select Color:{" "}
                  <span className="text-gray-900 dark:text-white font-extrabold">{selectedColor}</span>
                </label>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-2xl border px-4 py-2 text-xs font-bold transition-all ${
                        selectedColor === color
                          ? "border-purple-600 bg-purple-50 text-purple-700 shadow-xs dark:bg-purple-950/60 dark:text-purple-300"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.variants?.sizes && product.variants.sizes.length > 0 && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Select Size / Specification:{" "}
                  <span className="text-gray-900 dark:text-white font-extrabold">{selectedSize}</span>
                </label>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-2xl border px-4 py-2 text-xs font-bold transition-all ${
                        selectedSize === size
                          ? "border-purple-600 bg-purple-600 text-white shadow-xs"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart Action Row */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Quantity Stepper */}
                <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-900">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 hover:bg-white hover:shadow-xs dark:text-gray-300 dark:hover:bg-gray-800"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-extrabold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 hover:bg-white hover:shadow-xs dark:text-gray-300 dark:hover:bg-gray-800"
                    aria-label="Increase quantity"
                  >
                    <FiPlus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`btn-secondary flex-1 py-3.5 text-sm sm:text-base font-bold !rounded-2xl shadow-lg transition-all ${
                    justAdded ? "!bg-emerald-600" : ""
                  }`}
                >
                  {justAdded ? (
                    <>
                      <FiCheck className="h-5 w-5" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <FiShoppingBag className="h-5 w-5" />
                      <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Buy Now / Quick Checkout */}
              <button
                type="button"
                onClick={() => {
                  handleAddToCart();
                  router.push("/cart");
                }}
                className="btn-primary w-full py-3.5 text-sm sm:text-base font-bold !rounded-2xl shadow-lg shadow-purple-500/20"
              >
                Buy Now with Instant Checkout
              </button>
            </div>

            {/* Guarantee / Value Badges */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 text-center dark:border-gray-800 dark:bg-gray-900/50">
              <div className="flex flex-col items-center gap-1">
                <FiTruck className="h-4 w-4 text-purple-600" />
                <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200">
                  Fast Express
                </span>
                <span className="text-[10px] text-gray-400">2-4 business days</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FiRefreshCw className="h-4 w-4 text-emerald-600" />
                <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200">
                  30-Day Returns
                </span>
                <span className="text-[10px] text-gray-400">100% money back</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FiShield className="h-4 w-4 text-blue-600" />
                <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200">
                  Secure Guarantee
                </span>
                <span className="text-[10px] text-gray-400">Buyer protection</span>
              </div>
            </div>
          </section>
        </div>

        {/* ================= TABS SECTION ================= */}
        <section className="mt-16 rounded-3xl border border-gray-100 bg-white p-6 sm:p-10 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-4 dark:border-gray-800">
            {[
              { id: "description", label: "Product Overview", icon: "📝" },
              { id: "specs", label: "Technical Specifications", icon: "⚙️" },
              { id: "reviews", label: `Customer Reviews (${product.reviewCount})`, icon: "⭐" },
              { id: "shipping", label: "Shipping & Returns", icon: "🚚" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-extrabold transition-all ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {activeTab === "description" && (
              <div className="space-y-4 max-w-4xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  About this item
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-200">
                  {product.description}
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-purple-50/60 p-4 dark:bg-purple-950/30">
                    <h5 className="font-bold text-purple-900 dark:text-purple-200">
                      ✨ Craftsmanship & Authenticity
                    </h5>
                    <p className="mt-1 text-xs text-purple-800 dark:text-purple-300">
                      Directly sourced and inspected by {product.sellerName} to ensure verified genuine quality and warranty compliance.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-blue-50/60 p-4 dark:bg-blue-950/30">
                    <h5 className="font-bold text-blue-900 dark:text-blue-200">
                      📦 Fast & Protected Packaging
                    </h5>
                    <p className="mt-1 text-xs text-blue-800 dark:text-blue-300">
                      Shipped in reinforced eco-friendly packaging with real-time tracking from dispatch to delivery.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-3xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Detailed Specifications
                </h3>
                <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 overflow-hidden dark:divide-gray-800 dark:border-gray-800">
                  {product.specs ? (
                    Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 p-3.5 text-xs sm:text-sm">
                        <span className="font-bold text-gray-900 dark:text-white">{key}</span>
                        <span className="col-span-2 text-gray-600 dark:text-gray-300">{value}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-xs">Standard specifications apply for this item.</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center gap-6 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800">
                  <div className="text-center">
                    <p className="text-4xl font-black text-gray-900 dark:text-white">
                      {product.rating.toFixed(1)}
                    </p>
                    <div className="flex text-amber-400 justify-center my-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">Based on {product.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5 text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <span>5 Star</span>
                      <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div className="h-full bg-amber-400 w-[88%]" />
                      </div>
                      <span>88%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>4 Star</span>
                      <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div className="h-full bg-amber-400 w-[10%]" />
                      </div>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                {/* Sample Review */}
                <div className="space-y-4 pt-2">
                  <div className="rounded-2xl border border-gray-100 p-4 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-purple-100 font-bold flex items-center justify-center text-purple-700 text-xs">
                          JD
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white">
                            Jessica Davis
                          </p>
                          <span className="text-[10px] text-emerald-600 font-semibold">
                            ✓ Verified Buyer
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">2 days ago</span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      Absolutely exceeded my expectations! The build quality is top-notch, exactly as described by the seller. Shipping arrived a day earlier than projected.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Shipping & Return Guidelines
                </h3>
                <p>
                  Orders are dispatched within 24 business hours from the verified vendor hub. Free shipping automatically applies on orders with total checkout value over $50.
                </p>
                <p>
                  Enjoy 30 days hassle-free return window. If the product does not match your expectations, you may return it in its original packaging for an immediate full refund.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ================= RELATED PRODUCTS ================= */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  Customers Also Viewed
                </h2>
                <p className="text-xs text-gray-400">
                  Similar products in {product.category}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}

        <RecentlyViewed />
      </main>

      <QuickViewModal />
      <Toast />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
