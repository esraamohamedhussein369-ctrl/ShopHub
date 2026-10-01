"use client";

import Link from "next/link";
import { FiArrowLeft, FiHeart, FiShoppingBag } from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/marketplace/ProductCard";
import QuickViewModal from "@/components/marketplace/QuickViewModal";
import Toast from "@/components/common/Toast";
import ScrollToTop from "@/components/common/ScrollToTop";
import { useApp } from "@/context/AppContext";

export default function WishlistPage() {
  const { wishlist, products } = useApp();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

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

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-950/40">
            <FiHeart className="h-6 w-6 fill-rose-500" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              My Saved Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {wishlistedProducts.length} items saved for later
            </p>
          </div>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-xs dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 text-4xl dark:bg-rose-950/30">
              <span>❤️</span>
            </div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white">
              Your wishlist is empty
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              Tap the heart icon on any product in the marketplace to save it to your wishlist!
            </p>
            <Link href="/" className="btn-primary mt-6 !px-8 !py-3">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <QuickViewModal />
      <Toast />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
