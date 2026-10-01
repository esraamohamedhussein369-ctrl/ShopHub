"use client";

import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function CartBadge() {
  const { cartCount, cartPulse } = useApp();

  if (cartCount === 0) return null;

  return (
    <motion.span
      key={cartPulse}
      initial={{ scale: 0.6, y: -2 }}
      animate={{ scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 25,
      }}
      className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-extrabold text-white shadow-md shadow-blue-500/40 ring-2 ring-white dark:ring-gray-900"
    >
      {cartCount > 99 ? "99+" : cartCount}
    </motion.span>
  );
}
