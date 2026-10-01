"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export default function FilterSection({ title, open, onToggle, count, children }) {
  return (
    <div className="border-b border-gray-100 py-3.5 last:border-b-0 dark:border-gray-800">
      <button
        type="button"
        className="flex w-full items-center justify-between py-1 text-left text-sm font-bold text-gray-800 hover:text-purple-600 dark:text-gray-100 dark:hover:text-purple-400 transition-colors"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span>{title}</span>
          {count !== undefined && count > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-[10px] font-extrabold text-purple-700 dark:bg-purple-950/70 dark:text-purple-300">
              {count}
            </span>
          )}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2.5 pb-1 space-y-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
