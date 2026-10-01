"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiCompass,
  FiGift,
  FiPercent,
  FiShield,
  FiShoppingBag,
  FiSparkles,
  FiStar,
  FiTrendingUp,
  FiTruck,
  FiZap,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/marketplace/Sidebar";
import ProductGrid from "@/components/marketplace/ProductGrid";
import QuickViewModal from "@/components/marketplace/QuickViewModal";
import RecentlyViewed from "@/components/marketplace/RecentlyViewed";
import DealsCountdown from "@/components/marketplace/DealsCountdown";
import Toast from "@/components/common/Toast";
import ScrollToTop from "@/components/common/ScrollToTop";
import { useApp } from "@/context/AppContext";
import { categories, getBestSellers, getSaleProducts } from "@/data/mockData";

export default function HomePage() {
  const { toggleCategory, selectedCategories } = useApp();
  const bestSellers = getBestSellers(4);
  const flashSaleItems = getSaleProducts(4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#0B0F19] text-[#1F2937] dark:text-[#F3F4F6] transition-colors duration-200">
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-900 via-indigo-950 to-[#0B0F19] text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          {/* Subtle Background Glow Elements */}
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Hero Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7 space-y-6 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-purple-300 backdrop-blur-md">
                  <span className="flex h-2 w-2 rounded-full bg-pink-400 animate-ping" />
                  <span>✨ Multi-Vendor Marketplace Platform</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                  Discover Amazing Deals from{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                    Sellers Near You
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-purple-100/80 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                  Shop over 10,000+ curated products from independent artisans, top brands, and local vendors with verified guarantees and fast delivery.
                </p>

                {/* Hero CTA & Flash Deal Tag */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <a
                    href="#products-section"
                    className="btn-primary !px-7 !py-3.5 !text-base !font-bold !rounded-full shadow-lg shadow-purple-500/30"
                  >
                    <FiShoppingBag className="h-5 w-5" />
                    <span>Explore Products</span>
                  </a>

                  <Link
                    href="/deals"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 active:scale-95"
                  >
                    <FaFire className="h-4 w-4 text-amber-400" />
                    <span>Flash Deals & 20% Off</span>
                  </Link>
                </div>

                {/* Trust Badges in Hero */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-purple-200/70">
                  <span className="flex items-center gap-1.5">
                    <FiTruck className="h-4 w-4 text-pink-400" />
                    Free shipping over $50
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiShield className="h-4 w-4 text-emerald-400" />
                    100% Verified Sellers
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiStar className="h-4 w-4 text-amber-400 fill-amber-400" />
                    4.9/5 Average Rating
                  </span>
                </div>
              </motion.div>

              {/* Right Hero Featured Product Spotlight */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-5"
              >
                <div className="relative rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl">
                  {/* Floating Sale Tag */}
                  <div className="absolute -right-3 -top-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 p-3 text-center text-white shadow-xl rotate-3">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider">Save Up To</p>
                    <p className="text-xl font-black">40% OFF</p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-purple-500/30 px-3 py-1 text-xs font-bold text-purple-200">
                      ⚡ Deal of the Day
                    </span>
                    <DealsCountdown initialHours={8} initialMinutes={45} initialSeconds={12} />
                  </div>

                  {/* Hero Showcase Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-900/40">
                    <Image
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
                      alt="Sony WH-1000XM5 Headphones"
                      fill
                      priority
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 450px"
                    />
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-purple-300">
                        Electronics • TechStore Pro
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-300">
                        <FiStar className="h-3.5 w-3.5 fill-amber-300" />
                        <span className="font-bold">4.9</span>
                        <span className="text-white/60">(428)</span>
                      </div>
                    </div>

                    <h3 className="mt-1 text-base sm:text-lg font-bold text-white line-clamp-1">
                      Sony WH-1000XM5 Wireless Noise-Canceling Headphones
                    </h3>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10">
                      <div>
                        <span className="text-xl font-black text-white">$349.99</span>
                        <span className="ml-2 text-xs text-white/50 line-through">$399.99</span>
                      </div>

                      <Link
                        href="/product/p1"
                        className="btn-secondary !px-4 !py-2 !text-xs !rounded-xl"
                      >
                        <span>View Deal</span>
                        <FiArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= CATEGORIES QUICK BAR ================= */}
        <section id="categories-section" className="border-b border-gray-200/60 bg-white py-8 dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
                  Browse by Popular Categories
                </h2>
                <p className="text-xs text-gray-400">
                  Select a category to filter the marketplace catalog
                </p>
              </div>
            </div>

            {/* Category Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {categories.map((cat) => {
                const isSelected = selectedCategories.includes(cat.name);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      toggleCategory(cat.name);
                      const el = document.getElementById("products-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`group flex flex-col items-center justify-center rounded-2xl border p-3.5 text-center transition-all ${
                      isSelected
                        ? "border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 shadow-sm"
                        : "border-gray-100 bg-gray-50/70 text-gray-700 hover:border-purple-200 hover:bg-white hover:shadow-md dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-200 dark:hover:border-purple-800"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl transition-transform group-hover:scale-125">
                      {cat.icon}
                    </span>
                    <span className="mt-2 text-xs font-bold truncate max-w-full">
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= MAIN MARKETPLACE SECTION ================= */}
        <section id="products-section" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-purple-600" />
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                  Marketplace Products
                </h2>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Filter by category, price, gender, rating, and trending popularity.
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-start">
            {/* Left Filter Sidebar */}
            <Sidebar />

            {/* Right Product Grid */}
            <div className="min-w-0 flex-1">
              <ProductGrid />
            </div>
          </div>

          {/* ================= RECENTLY VIEWED CAROUSEL ================= */}
          <RecentlyViewed />
        </section>
      </main>

      {/* Global Quick View Modal */}
      <QuickViewModal />

      {/* Global Toast System */}
      <Toast />

      {/* Floating Scroll to Top */}
      <ScrollToTop />

      <Footer />
    </div>
  );
}
