"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiCopy, FiTag, FiX } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const { addToast } = useApp();

  const handleCopyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText("SHOP20");
    setCopied(true);
    addToast({
      title: "Promo Code Copied! 🏷️",
      message: "Code 'SHOP20' copied to clipboard. Apply at checkout for 20% off!",
      type: "success",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative z-50 hidden xs:block bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 text-white shadow-xs"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:text-[13px] font-medium tracking-wide sm:px-6">
          <div className="flex-1 text-center flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-bold">
              <span>🎉</span>
              <span>Free Express Shipping on Orders Over $50!</span>
            </span>
            <span className="hidden sm:inline text-white/60">|</span>
            <span className="inline-flex items-center gap-1.5">
              <span>Use Code:</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="group inline-flex items-center gap-1 rounded-md bg-white/20 px-2 py-0.5 font-mono font-bold text-white backdrop-blur-xs transition hover:bg-white/30 hover:scale-105 active:scale-95"
                title="Click to copy code"
              >
                <FiTag className="h-3 w-3" />
                <span>SHOP20</span>
                {copied ? (
                  <FiCheck className="h-3 w-3 text-emerald-300" />
                ) : (
                  <FiCopy className="h-3 w-3 text-white/70 group-hover:text-white" />
                )}
              </button>
              <span className="font-semibold text-yellow-200">for 20% Off</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="rounded-full p-1 text-white/70 transition hover:bg-white/20 hover:text-white"
            aria-label="Dismiss announcement"
          >
            <FiX className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
