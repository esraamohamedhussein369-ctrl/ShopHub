"use client";

import Image from "next/image";
import Link from "next/link";
import { FiClock, FiEye, FiShoppingBag, FiStar } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

export default function RecentlyViewed() {
  const { recentlyViewed, addToCart, setQuickViewProduct } = useApp();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <section className="mt-16 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xs dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
            <FiClock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white">
              Recently Viewed Products
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Pick up where you left off
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
        {recentlyViewed.slice(0, 4).map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50 p-3 transition-all hover:border-purple-200 hover:bg-white hover:shadow-md dark:border-gray-800 dark:bg-gray-800/40 dark:hover:bg-gray-800"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
              <Link href={`/product/${product.id}`} className="block h-full w-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </Link>
              <button
                type="button"
                onClick={() => setQuickViewProduct(product)}
                className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-gray-700 shadow-md backdrop-blur-xs opacity-0 transition group-hover:opacity-100 hover:bg-purple-600 hover:text-white dark:bg-gray-900/90 dark:text-gray-200"
                aria-label="Quick View"
              >
                <FiEye className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex flex-1 flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  {product.category}
                </span>
                <h4 className="mt-0.5 text-xs sm:text-sm font-bold text-gray-900 line-clamp-1 dark:text-white">
                  <Link href={`/product/${product.id}`} className="hover:underline">
                    {product.title}
                  </Link>
                </h4>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs hover:bg-blue-700 transition"
                  aria-label="Add to Cart"
                >
                  <FiShoppingBag className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
