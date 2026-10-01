"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function CartBadge() {
  const { cartCount, cartPulse } = useApp();

  if (cartCount < 1) return null;

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={cartPulse}
        initial={{ scale: 0.4 }}
        animate={{ scale: [0.4, 1.25, 1] }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[11px] font-bold text-white"
        aria-label={`${cartCount} items in cart`}
      >
        {cartCount}
      </motion.span>
    </AnimatePresence>
  );
}
