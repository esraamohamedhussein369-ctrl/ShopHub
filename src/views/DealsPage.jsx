"use client";

import Link from "next/link";
import { FiArrowLeft, FiZap } from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/marketplace/ProductCard";
import DealsCountdown from "@/components/marketplace/DealsCountdown";
import QuickViewModal from "@/components/marketplace/QuickViewModal";
import Toast from "@/components/common/Toast";
import ScrollToTop from "@/components/common/ScrollToTop";
import { useApp } from "@/context/AppContext";
import { getSaleProducts } from "@/data/mockData";

export default function DealsPage() {
  const { products } = useApp();
  const saleProducts = products.filter((p) => p.isOnSale || p.originalPrice > p.price);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#0B0F19] text-[#1F2937] dark:text-[#F3F4F6] transition-colors duration-200">
      <Header />

      <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
          >
            <FiArrowLeft className="h-4 w-4" />
            <span>Back to Marketplace</span>
          </Link>
        </div>

        {/* Flash Sale Top Banner */}
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600 p-6 sm:p-10 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-wider backdrop-blur-md">
                <FiZap className="h-3.5 w-3.5 text-yellow-300" />
                <span>Limited Time Deals</span>
              </span>
              <h1 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                ShopHub Mega Flash Sale 🔥
              </h1>
              <p className="mt-1 text-sm sm:text-base text-purple-100 max-w-xl">
                Save up to 40% off top electronics, designer apparel, handcrafted home décor, and beauty essentials from certified sellers.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20">
              <DealsCountdown initialHours={12} initialMinutes={24} initialSeconds={10} />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <QuickViewModal />
      <Toast />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
