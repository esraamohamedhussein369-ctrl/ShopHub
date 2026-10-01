"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiCheckCircle,
  FiHeadphones,
  FiHeart,
  FiLock,
  FiMail,
  FiRefreshCw,
  FiSend,
  FiShield,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import { categories } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast({
        title: "Invalid Email",
        message: "Please enter a valid email address.",
        type: "error",
      });
      return;
    }

    setSubscribed(true);
    addToast({
      title: "Subscribed to ShopHub VIP! 🎁",
      message: "Check your inbox for a special $15 welcome coupon!",
      type: "success",
    });
    setEmail("");
  };

  return (
    <footer className="mt-20 border-t border-gray-200/80 bg-white dark:border-gray-800 dark:bg-gray-950">
      {/* Value Proposition Highlights */}
      <div className="border-b border-gray-100 dark:border-gray-800/80">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                <FiTruck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Free Express Delivery
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  On all orders over $50
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <FiShield className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Secure Checkout
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  256-bit SSL encrypted
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <FiRefreshCw className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  30-Day Free Returns
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Hassle-free money back
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400">
                <FiHeadphones className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  24/7 Live Support
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Dedicated customer care
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/30">
                <FiShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent">
                ShopHub
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
              Discover amazing deals from independent artisans, boutique brands, and local sellers all across the globe. Built for delightful shopping experiences.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                Subscribe for Exclusive Flash Deals
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <div className="relative flex-1">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 py-2.5 text-xs sm:text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary !px-4 !py-2.5 !text-xs whitespace-nowrap !rounded-xl"
                >
                  <span>Subscribe</span>
                  <FiSend className="h-3.5 w-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <FiCheckCircle className="h-3.5 w-3.5" />
                  You are now on our VIP priority list!
                </p>
              )}
            </div>
          </div>

          {/* Explore Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Explore Categories
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/?category=${cat.id}#products-section`}
                    className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketplace & Sellers */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Sellers & Partners
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/dashboard?tab=seller" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Sell on ShopHub
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=seller" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Seller Portal & Analytics
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Flash Deals & Offers
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Support & Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#help" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Help Center & FAQs
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} ShopHub Marketplace Inc. All rights reserved. Crafted with care.
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <FiLock className="h-3.5 w-3.5 text-emerald-500" />
              Verified SSL Safe
            </span>
            <span>•</span>
            <span>USD ($)</span>
            <span>•</span>
            <span>English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
