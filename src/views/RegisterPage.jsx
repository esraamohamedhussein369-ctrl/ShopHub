"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLock, FiMail, FiPhone, FiShoppingBag, FiUser } from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/common/Toast";
import { useApp } from "@/context/AppContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useApp();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.fullName) return;
    register(formData);
    router.push("/");
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
              Join ShopHub Today
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Unlock exclusive deals, track orders, or sell your own products
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative mt-1">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Sarah Jenkins"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 outline-none transition focus:border-purple-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative mt-1">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="sarah@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 outline-none transition focus:border-purple-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <div className="relative mt-1">
                <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1 555 123 4567"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 outline-none transition focus:border-purple-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Create Password
              </label>
              <div className="relative mt-1">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 outline-none transition focus:border-purple-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 text-sm font-bold !rounded-xl shadow-md shadow-purple-500/30"
            >
              Create My Free Account
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-purple-600 hover:underline dark:text-purple-400">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}
