"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiBox,
  FiChevronDown,
  FiCompass,
  FiGrid,
  FiHeart,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSettings,
  FiShoppingBag,
  FiSun,
  FiTag,
  FiUser,
  FiX,
  FiZap,
} from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import AnnouncementBar from "./AnnouncementBar";
import CartBadge from "../cart/CartBadge";
import SearchOverlay from "../marketplace/SearchOverlay";

const navLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/#products-section", label: "Shop", icon: "🛍️" },
  { href: "/#categories-section", label: "Categories", icon: "📊" },
  { href: "/deals", label: "Deals", icon: "🔥", badge: "HOT" },
];

export default function Header() {
  const pathname = usePathname();
  const {
    setSearchOpen,
    mobileNavOpen,
    setMobileNavOpen,
    setSidebarOpen,
    darkMode,
    setDarkMode,
    wishlistCount,
    user,
    logout,
  } = useApp();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileNavOpen(false);
    setUserDropdownOpen(false);
  }, [pathname, setMobileNavOpen]);

  return (
    <>
      <AnnouncementBar />

      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-xs dark:border-gray-800/80 dark:bg-gray-900/90 transition-colors duration-200">
        <div className="mx-auto flex h-18 sm:h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          {/* Left: Mobile Filters Trigger & Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2.5 rounded-xl py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/30 group-hover:scale-105 transition-transform">
                <FiShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent">
                  ShopHub
                </span>
                <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 -mt-1">
                  Marketplace
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40"
                      : "text-gray-700 hover:text-purple-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-purple-300 dark:hover:bg-gray-800/60"
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-1.5 py-0.2 text-[9px] font-black text-white shadow-xs">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Search, Wishlist, Cart, Theme, User Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="group relative flex items-center gap-2 rounded-full border border-gray-200/80 bg-gray-50/80 px-2.5 sm:px-3.5 py-2 text-sm font-medium text-gray-600 transition hover:border-purple-300 hover:bg-white hover:text-purple-600 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:border-purple-500/50 dark:hover:bg-gray-800"
              aria-label="Search ShopHub"
            >
              <FiSearch className="h-4.5 w-4.5 group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline text-xs text-gray-400 dark:text-gray-500">
                Search products...
              </span>
              <kbd className="hidden lg:inline-flex items-center justify-center rounded-md bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold text-gray-500 shadow-2xs border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                /
              </kbd>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-rose-50 hover:text-rose-500 hover:scale-105 active:scale-95 dark:text-gray-200 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
              aria-label="Wishlist"
            >
              <FiHeart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Icon with animated bouncy badge */}
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-purple-50 hover:text-purple-600 hover:scale-105 active:scale-95 dark:text-gray-200 dark:hover:bg-purple-950/30 dark:hover:text-purple-400"
              aria-label="Shopping Cart"
            >
              <FiShoppingBag className="h-5 w-5" />
              <CartBadge />
            </Link>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-amber-50 hover:text-amber-500 hover:scale-105 active:scale-95 dark:text-gray-200 dark:hover:bg-amber-950/30 dark:hover:text-amber-400"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiSun className="h-5 w-5 text-amber-400" /> : <FiMoon className="h-5 w-5" />}
            </button>

            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 rounded-full p-1 border border-transparent hover:border-purple-200 hover:bg-purple-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:hover:border-purple-800 dark:hover:bg-purple-950/40 transition-all"
                  aria-expanded={userDropdownOpen}
                  aria-label="User profile menu"
                >
                  <div className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-full ring-2 ring-purple-500/40">
                    <Image
                      src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                      alt={user.name}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <FiChevronDown className={`hidden sm:block h-4 w-4 text-gray-500 transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  href="/login"
                  className="btn-primary !px-4 !py-2 text-xs sm:text-sm !shadow-xs"
                >
                  <FiUser className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Dropdown Content */}
              <AnimatePresence>
                {userDropdownOpen && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-xl backdrop-blur-md dark:border-gray-800 dark:bg-gray-900"
                  >
                    {/* User Card */}
                    <div className="border-b border-gray-100 p-3 dark:border-gray-800">
                      <p className="font-bold text-gray-900 truncate dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-2.5 py-0.5 text-[10px] font-extrabold text-purple-700 dark:from-purple-950/60 dark:to-pink-950/50 dark:text-purple-300">
                        👑 {user.tier || "ShopHub Member"}
                      </span>
                    </div>

                    {/* Menu items */}
                    <div className="py-1 space-y-0.5 text-sm font-medium">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-950/40 dark:hover:text-purple-400"
                      >
                        <FiUser className="h-4 w-4 text-purple-500" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/dashboard?tab=orders"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-950/40 dark:hover:text-purple-400"
                      >
                        <FiBox className="h-4 w-4 text-blue-500" />
                        <span>My Orders</span>
                      </Link>
                      <Link
                        href="/dashboard?tab=seller"
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-950/40 dark:hover:text-purple-400"
                      >
                        <span className="flex items-center gap-2.5">
                          <FiZap className="h-4 w-4 text-amber-500" />
                          <span>Seller Dashboard</span>
                        </span>
                        <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                          PRO
                        </span>
                      </Link>
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-950/40 dark:hover:text-purple-400"
                      >
                        <FiHeart className="h-4 w-4 text-rose-500" />
                        <span>Saved Wishlist</span>
                      </Link>
                      <Link
                        href="/dashboard?tab=settings"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-950/40 dark:hover:text-purple-400"
                      >
                        <FiSettings className="h-4 w-4 text-gray-400" />
                        <span>Account Settings</span>
                      </Link>
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-gray-100 pt-1 dark:border-gray-800">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                      >
                        <FiLogOut className="h-4 w-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 md:hidden dark:text-gray-200 dark:hover:bg-gray-800"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-label="Open mobile navigation"
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-in Drawer */}
        <AnimatePresence>
          {mobileNavOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-18 z-40 bg-gray-900/50 backdrop-blur-xs md:hidden"
                onClick={() => setMobileNavOpen(false)}
              />
              <motion.nav
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="fixed inset-y-0 right-0 top-18 z-50 w-72 sm:w-80 bg-white p-6 shadow-2xl md:hidden overflow-y-auto dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800"
                aria-label="Mobile Navigation Drawer"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                    Navigation
                  </p>
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-950/40 dark:hover:text-purple-400"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-lg">{link.icon}</span>
                        <span>{link.label}</span>
                      </span>
                      {link.badge && (
                        <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  ))}

                  <div className="my-3 border-t border-gray-100 dark:border-gray-800 pt-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                      Customer Hub
                    </p>
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-950/40"
                    >
                      <FiHeart className="h-4 w-4 text-rose-500" />
                      <span>Saved Wishlist ({wishlistCount})</span>
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-950/40"
                    >
                      <FiShoppingBag className="h-4 w-4 text-purple-500" />
                      <span>Shopping Cart</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-950/40"
                    >
                      <FiUser className="h-4 w-4 text-blue-500" />
                      <span>Account Dashboard</span>
                    </Link>
                  </div>

                  {user ? (
                    <button
                      type="button"
                      onClick={logout}
                      className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-sm font-bold text-rose-600 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400"
                    >
                      <FiLogOut className="h-4 w-4" />
                      <span>Log Out</span>
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="btn-primary mt-4 w-full py-2.5 text-sm text-center"
                    >
                      Sign In / Register
                    </Link>
                  )}
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Search Modal Overlay */}
      <SearchOverlay />
    </>
  );
}
