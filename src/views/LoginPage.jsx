"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiLock, FiMail, FiShoppingBag } from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/common/Toast";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();
  const [email, setEmail] = useState("alex.morgan@shophub.com");
  const [password, setPassword] = useState("password123");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    login(email, password);
    router.push("/");
  };

  const handleDemoFill = () => {
    setEmail("alex.morgan@shophub.com");
    setPassword("ShopHubVIP2024!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#0B0F19] text-[#1F2937] dark:text-[#F3F4F6] transition-colors duration-200">
      <Header />

      <main className="mx-auto max-w-md flex-1 px-4 py-12 sm:px-6 w-full flex items-center justify-center">
        <div className="w-full rounded-3xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
          <div className="text-center space-y-2 mb-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/30">
              <FiShoppingBag className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Welcome to ShopHub
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sign in to manage your orders, wishlist, and seller tools
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative mt-1">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 outline-none transition focus:border-purple-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="#forgot" className="text-[11px] font-bold text-purple-600 hover:underline dark:text-purple-400">
                  Forgot Password?
                </a>
              </div>
              <div className="relative mt-1">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 outline-none transition focus:border-purple-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 text-sm font-bold !rounded-xl shadow-md shadow-purple-500/30"
            >
              Sign In to Account
            </button>

            <button
              type="button"
              onClick={handleDemoFill}
              className="btn-ghost w-full !py-2.5 !text-xs !rounded-xl border-dashed"
            >
              ✨ Auto-fill Demo Account (Alex Morgan)
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="font-bold text-purple-600 hover:underline dark:text-purple-400">
              Create Account
            </Link>
          </div>
        </div>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}
