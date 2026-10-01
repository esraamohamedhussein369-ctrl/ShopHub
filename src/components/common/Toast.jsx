"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";
import { useApp } from "@/context/AppContext";

export default function Toast() {
  const { toasts, removeToast } = useApp();

  return (
    <aside aria-label="Notifications" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isCart = toast.type === "cart";
          const isSuccess = toast.type === "success";
          const isError = toast.type === "error";

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-gray-100 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95"
            >
              {/* Icon / Thumbnail */}
              {toast.product ? (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={toast.product.image}
                    alt={toast.product.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              ) : (
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    isSuccess
                      ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                      : isError
                      ? "bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
                      : "bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400"
                  }`}
                >
                  {isSuccess ? (
                    <FiCheckCircle className="h-5 w-5" />
                  ) : isError ? (
                    <FiAlertCircle className="h-5 w-5" />
                  ) : isCart ? (
                    <FiShoppingBag className="h-5 w-5" />
                  ) : (
                    <FiInfo className="h-5 w-5" />
                  )}
                </div>
              )}

              {/* Message Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {toast.title}
                </p>
                {toast.message && (
                  <p className="mt-0.5 text-xs text-gray-500 line-clamp-2 dark:text-gray-400">
                    {toast.message}
                  </p>
                )}
                {isCart && (
                  <div className="mt-2 flex items-center gap-3">
                    <Link
                      href="/cart"
                      className="text-xs font-bold text-purple-600 hover:text-purple-700 underline dark:text-purple-400"
                      onClick={() => removeToast(toast.id)}
                    >
                      View Cart & Checkout &rarr;
                    </Link>
                  </div>
                )}
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                aria-label="Dismiss notification"
              >
                <FiX className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </aside>
  );
}
