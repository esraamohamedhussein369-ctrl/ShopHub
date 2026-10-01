"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export default function FilterSection({ title, open, onToggle, children }) {
  return (
    <section className="border-b border-gray-200 py-3 last:border-b-0 dark:border-gray-800">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-md px-1 py-1 text-left text-sm font-semibold text-ink focus-visible:ring-2 focus-visible:ring-primary dark:text-gray-100"
      >
        {title}
        <FiChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-2 pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
