"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiFilter,
  FiMenu,
  FiMoon,
  FiSearch,
  FiShoppingBag,
  FiSun,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import CartBadge from "./CartBadge";
import SearchBar from "./SearchBar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/", label: "Shop" },
  { href: "/", label: "Categories" },
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
    user,
    logout,
  } = useApp();

  useEffect(() => {
    setMobileNavOpen(false);
    setSidebarOpen(false);
  }, [pathname, setMobileNavOpen, setSidebarOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMobileNavOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg p-2 text-ink hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary lg:hidden dark:text-gray-100 dark:hover:bg-gray-800"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open filters"
          >
            <FiFilter className="h-5 w-5" />
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
              C
            </span>
            <span className="text-lg font-bold tracking-tight text-ink dark:text-white">
              Casa
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-gray-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-lg p-2 text-ink hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary dark:text-gray-100 dark:hover:bg-gray-800"
            aria-label="Open search"
          >
            <FiSearch className="h-5 w-5" />
          </button>
          <Link
            href="/cart"
            className="relative rounded-lg p-2 text-ink hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary dark:text-gray-100 dark:hover:bg-gray-800"
            aria-label="Shopping cart"
          >
            <FiShoppingBag className="h-5 w-5" />
            <CartBadge />
          </Link>
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-lg p-2 text-ink hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary dark:text-gray-100 dark:hover:bg-gray-800"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
          </button>
          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="max-w-[120px] truncate text-sm text-gray-600 dark:text-gray-300">
                {user.name}
              </span>
              <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={logout}>
                Log out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg p-2 text-ink hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary dark:text-gray-100 dark:hover:bg-gray-800"
              aria-label="Account"
            >
              <FiUser className="h-5 w-5" />
            </Link>
          )}
          <button
            type="button"
            className="rounded-lg p-2 text-ink hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary md:hidden dark:text-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMobileNavOpen((open) => !open)}
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gray-200 md:hidden dark:border-gray-800"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <button
                  type="button"
                  className="rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={logout}
                >
                  Log out
                </button>
              ) : (
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <SearchBar />
    </header>
  );
}
