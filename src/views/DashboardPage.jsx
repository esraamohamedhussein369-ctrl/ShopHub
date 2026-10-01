"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FiArrowRight,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiDollarSign,
  FiLock,
  FiLogOut,
  FiMail,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiSettings,
  FiShoppingBag,
  FiTrendingUp,
  FiTruck,
  FiUser,
  FiZap,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/common/Toast";
import ScrollToTop from "@/components/common/ScrollToTop";
import { useApp } from "@/context/AppContext";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(initialTab);
  const { user, logout, addToast } = useApp();

  const [saving, setSaving] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      addToast({
        title: "Profile Updated! ✅",
        message: "Your account changes have been saved.",
        type: "success",
      });
    }, 600);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#0B0F19]">
        <Header />
        <main className="mx-auto max-w-md flex-1 px-4 py-20 text-center">
          <h1 className="text-2xl font-black">Account Required</h1>
          <p className="mt-2 text-sm text-gray-500">
            Please sign in to access your ShopHub dashboard and orders.
          </p>
          <Link href="/login" className="btn-primary mt-6 inline-flex !px-8 !py-3">
            Sign In Now
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#0B0F19] text-[#1F2937] dark:text-[#F3F4F6] transition-colors duration-200">
      <Header />

      <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Sidebar Tabs Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* User Profile Summary Card */}
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900 text-center">
              <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full ring-4 ring-purple-500/20 mb-3">
                <Image
                  src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white truncate">
                {user.name}
              </h2>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-0.5 text-[10px] font-black text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                👑 {user.tier || "Gold VIP Member"}
              </span>
            </div>

            {/* Tab navigation list */}
            <div className="rounded-3xl border border-gray-100 bg-white p-2 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-1 text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 transition-all ${
                  activeTab === "profile"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <FiUser className="h-4 w-4" />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 transition-all ${
                  activeTab === "orders"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <FiBox className="h-4 w-4" />
                <span>Orders & Tracking</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("seller")}
                className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 transition-all ${
                  activeTab === "seller"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <span className="flex items-center gap-3">
                  <FiZap className="h-4 w-4 text-amber-500" />
                  <span>Seller Dashboard</span>
                </span>
                <span className="rounded-md bg-amber-100 px-1.5 py-0.2 text-[10px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                  PRO
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 transition-all ${
                  activeTab === "settings"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <FiSettings className="h-4 w-4" />
                <span>Account Settings</span>
              </button>

              <div className="border-t border-gray-100 pt-1 dark:border-gray-800">
                <button
                  type="button"
                  onClick={logout}
                  className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                >
                  <FiLogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Panel (9 cols) */}
          <div className="lg:col-span-9">
            {/* Tab: Profile */}
            {activeTab === "profile" && (
              <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-6">
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">
                    Personal Information
                  </h3>
                  <p className="text-xs text-gray-400">
                    Manage your personal details and primary shipping addresses
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 outline-none focus:border-purple-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 outline-none focus:border-purple-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      defaultValue={user.phone || "+1 555 010 8899"}
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 outline-none focus:border-purple-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Primary Delivery Address
                    </label>
                    <input
                      type="text"
                      defaultValue="742 Evergreen Terrace, Springfield, OR 97477, United States"
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 outline-none focus:border-purple-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary !px-6 !py-3 !text-xs !rounded-xl"
                  >
                    {saving ? "Saving Changes..." : "Save Profile Changes"}
                  </button>
                </form>
              </div>
            )}

            {/* Tab: Orders */}
            {activeTab === "orders" && (
              <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-6">
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">
                    Order History & Live Tracking
                  </h3>
                  <p className="text-xs text-gray-400">
                    Track your recent purchases and delivery progress
                  </p>
                </div>

                <div className="space-y-4">
                  {(user.orders || []).map((order) => (
                    <div
                      key={order.id}
                      className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5 dark:border-gray-800 dark:bg-gray-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                            Order {order.id}
                          </span>
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                            order.status === "Delivered"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Placed on {order.date} • {order.itemsCount} {order.itemsCount === 1 ? "Item" : "Items"} • Total:{" "}
                          <span className="font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</span>
                        </p>
                        <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                          📦 {order.estimatedDelivery} (Tracking: {order.trackingNumber})
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          addToast({
                            title: `Tracking ${order.trackingNumber}`,
                            message: "Package is currently with Carrier Express.",
                            type: "info",
                          })
                        }
                        className="btn-ghost !px-4 !py-2 !text-xs !rounded-xl"
                      >
                        Track Package
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Seller Dashboard */}
            {activeTab === "seller" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Total Revenue (30 Days)
                    </p>
                    <p className="mt-2 text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                      $18,420.50
                    </p>
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                      <FiTrendingUp className="h-3 w-3" /> +14.2% from last month
                    </span>
                  </div>

                  <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Orders Fulfilled
                    </p>
                    <p className="mt-2 text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                      342 Orders
                    </p>
                    <span className="text-[11px] font-semibold text-gray-400 mt-1 block">
                      99.8% On-time dispatch
                    </span>
                  </div>

                  <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Seller Rating
                    </p>
                    <p className="mt-2 text-2xl sm:text-3xl font-black text-gray-900 dark:text-white flex items-center gap-1">
                      4.95 <span className="text-amber-400 text-lg">★</span>
                    </p>
                    <span className="text-[11px] font-bold text-emerald-600 mt-1 block">
                      Top Rated Vendor Tier
                    </span>
                  </div>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-extrabold text-gray-900 dark:text-white">
                      Active Listings & Inventory
                    </h4>
                    <button
                      type="button"
                      onClick={() =>
                        addToast({
                          title: "New Listing Modal",
                          message: "Multi-vendor product submission wizard loaded.",
                          type: "info",
                        })
                      }
                      className="btn-primary !px-4 !py-2 !text-xs !rounded-xl"
                    >
                      + Add New Product
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Manage stock, pricing, and promotional deals across all your multi-vendor marketplace channels.
                  </p>
                </div>
              </div>
            )}

            {/* Tab: Settings */}
            {activeTab === "settings" && (
              <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-6">
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">
                    Account Security & Preferences
                  </h3>
                  <p className="text-xs text-gray-400">
                    Control your notifications, password, and two-factor authentication
                  </p>
                </div>

                <div className="space-y-4 max-w-xl">
                  <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 dark:border-gray-800">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        Two-Factor Authentication (2FA)
                      </p>
                      <p className="text-xs text-gray-400">
                        Protect your account with SMS or Authenticator App
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 dark:border-gray-800">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        Promotional Flash Deal Alerts
                      </p>
                      <p className="text-xs text-gray-400">
                        Receive instant notifications on 20%+ discounts
                      </p>
                    </div>
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                      Enabled
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Toast />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
